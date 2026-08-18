"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { isBookable, isValidSlot } from "@/lib/booking";
import type { ContactState, FieldName } from "@/lib/contact";

/**
 * Traitement d'une demande de contact / prise de rendez-vous.
 *
 * L'action renvoie des CODES d'erreur, pas des phrases : la traduction est
 * faite cote client, qui connait la langue courante. Un message en dur ici
 * obligerait a passer la locale au serveur et a maintenir les textes en double.
 *
 * Toute la validation est rejouee ici. Ce que fait le navigateur ne prouve
 * rien : le formulaire peut etre poste a la main.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Submission = {
  receivedAt: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
  slot: string;
};

/**
 * Envoi par Resend. Choisi plutot qu'un SDK : un seul appel HTTP, aucune
 * dependance a maintenir. Renvoie false plutot que de lever, pour laisser
 * les autres canaux tenter leur chance.
 */
async function sendByEmail(submission: Submission): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return false;

  const lines = [
    `Nom       : ${submission.name}`,
    `Email     : ${submission.email}`,
    `Société   : ${submission.company || "—"}`,
    `Prestation: ${submission.projectType || "—"}`,
    `Budget    : ${submission.budget || "—"}`,
    `Rendez-vous: ${submission.date ? `${submission.date} à ${submission.slot}` : "non demandé"}`,
    "",
    submission.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: `Nouvelle demande — ${submission.name}`,
        text: lines,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/** Canal generique : Slack, Make, n8n, Zapier... tout ce qui accepte un POST JSON. */
async function sendByWebhook(submission: Submission): Promise<boolean> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Filet local. Utile en developpement et en auto-hebergement.
 * Sur un hebergeur au systeme de fichiers ephemere (Vercel, Netlify), l'ecriture
 * echoue ou est perdue au redeploiement : ce canal ne doit jamais etre le seul.
 */
async function saveToDisk(submission: Submission): Promise<boolean> {
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "requests.jsonl"), `${JSON.stringify(submission)}\n`, "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  // Piege a robots : champ invisible qu'un humain ne remplit jamais.
  if (read("website") !== "") {
    return { status: "error", formError: "spam" };
  }

  // Un formulaire rempli en moins de trois secondes n'a pas ete rempli a la main.
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    return { status: "error", formError: "spam" };
  }

  const name = read("name");
  const email = read("email");
  const message = read("message");
  const date = read("date");
  const slot = read("slot");
  const consent = formData.get("consent") === "on";

  const errors: Partial<Record<FieldName, string>> = {};

  if (name.length < 2) errors.name = "required";
  if (!EMAIL.test(email)) errors.email = "invalid";
  if (message.length < 20) errors.message = "tooShort";
  if (!consent) errors.consent = "required";

  // Le rendez-vous est facultatif, mais date et creneau vont par paire.
  if (date && !isBookable(date)) errors.date = "unavailable";
  if (date && !slot) errors.slot = "required";
  if (slot && !isValidSlot(slot)) errors.slot = "invalid";
  if (slot && !date) errors.date = "required";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const submission: Submission = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    company: read("company"),
    projectType: read("projectType"),
    budget: read("budget"),
    message,
    date,
    slot,
  };

  // On tente tous les canaux : un seul suffit pour que la demande soit reellement
  // enregistree quelque part. Sans ca, on afficherait « envoye » a un visiteur
  // dont le message n'existe nulle part.
  const results = await Promise.all([
    sendByEmail(submission),
    sendByWebhook(submission),
    saveToDisk(submission),
  ]);

  if (!results.some(Boolean)) {
    console.error("[contact] aucun canal de livraison disponible", submission);
    return { status: "error", formError: "delivery" };
  }

  return { status: "success" };
}
