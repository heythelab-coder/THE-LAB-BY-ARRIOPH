"use client";

import { useEffect, useRef, useState } from "react";
import LabMark from "./LabMark";

/**
 * Sequence d'entree.
 *
 * Le rideau precedent etait un ecran noir avec un logo : un ecran de
 * chargement, pas une entree. Il faisait patienter sans rien raconter.
 *
 * Celui-ci pose l'univers avant la premiere image du site — nom, nature,
 * lieu — puis s'ouvre sur le hero. Trois principes :
 *
 * - Le compteur suit le CHARGEMENT REEL des images, pas une minuterie. Un
 *   compteur decoratif fait attendre pour rien ; celui-ci occupe un temps qui
 *   serait de toute facon passe a charger, et le rideau se leve des que la page
 *   est prete.
 * - Une seule fois par session, et interruptible au clic ou a la touche : une
 *   entree qu'on ne peut pas passer devient un peage.
 * - Le contenu de la page est rendu DESSOUS, jamais remplace. Rien n'est bloque
 *   pour l'indexation, la mesure de performance, ni si JavaScript echoue.
 */
const SESSION_KEY = "thelab:entrance";

export default function Entrance({
  name,
  tagline,
  city,
  skipLabel,
}: {
  name: string;
  tagline: string;
  city: string;
  skipLabel: string;
}) {
  const [phase, setPhase] = useState<"idle" | "playing" | "leaving" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return;
    }

    setPhase("playing");
    document.body.classList.add("scroll-locked");

    const leave = () => {
      if (finished.current) return;
      finished.current = true;
      // La cle n'est ecrite qu'a la SORTIE, jamais au demarrage.
      //
      // Le composant peut etre remonte comme une nouvelle instance (StrictMode,
      // Fast Refresh) : les refs repartent alors a zero, et une cle posee au
      // demarrage etait relue par l'instance suivante comme « deja vue ».
      // L'entree s'auto-annulait. Ecrite a la sortie, un remontage rejoue la
      // sequence — sans consequence — et une vraie seconde visite la saute.
      sessionStorage.setItem(SESSION_KEY, "1");
      setProgress(100);
      setPhase("leaving");
      document.body.classList.remove("scroll-locked");
      window.setTimeout(() => setPhase("done"), 1100);
    };

    // Progression reelle : part des images deja demandees par le navigateur.
    const started = Date.now();
    const tick = window.setInterval(() => {
      const images = Array.from(document.images);
      const loaded = images.filter((img) => img.complete).length;
      const ratio = images.length ? loaded / images.length : 1;

      // Plancher temporel : sans lui, un chargement instantane ferait clignoter
      // la sequence sans qu'on ait le temps de lire quoi que ce soit.
      const elapsed = Math.min(1, (Date.now() - started) / 1600);
      setProgress(Math.round(Math.min(ratio, elapsed) * 100));

      if (ratio >= 1 && elapsed >= 1 && document.readyState === "complete") leave();
    }, 90);

    // Garde-fou : une image qui ne repond pas ne doit pas retenir le visiteur.
    // 3s est le pire cas subi ; le cas normal sort bien avant, des que les
    // images sont chargees et le plancher de lisibilite ecoule.
    const cap = window.setTimeout(leave, 3000);

    const skip = () => leave();
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    window.addEventListener("wheel", skip, { passive: true });

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(cap);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      window.removeEventListener("wheel", skip);
      document.body.classList.remove("scroll-locked");
    };
  }, []);

  if (phase === "done" || phase === "idle") return null;

  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[95] bg-ink transition-[clip-path] duration-[1100ms] ease-expo ${
        leaving ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      {/* Le contenu remonte legerement en sortant : le rideau ne se contente
          pas de disparaitre, il emporte son contenu avec lui. */}
      <div
        className={`flex h-full w-full flex-col justify-between p-6 transition-transform duration-[1100ms] ease-expo md:p-8 ${
          leaving ? "-translate-y-6" : "translate-y-0"
        }`}
      >
        <div className="flex items-start justify-between">
          <LabMark className="h-7 w-7 text-paper [animation:fadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]" />
          <p
            className="eyebrow text-paper/40 [animation:fadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_150ms_both]"
          >
            {city}
          </p>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tightest [animation:fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_250ms_both]">
              {name}
            </p>
            <p className="eyebrow mt-4 text-paper/45 [animation:fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_450ms_both]">
              {tagline}
            </p>
          </div>

          <p className="nums font-serif text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tightest text-paper/25">
            {String(progress).padStart(3, "0")}
          </p>
        </div>
      </div>

      {/* Filet de progression au ras du bas : la mesure est deja affichee en
          chiffres, la ligne la rend lisible d'un coup d'oeil. */}
      <div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-paper/40 transition-transform duration-300 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <p className="sr-only">{skipLabel}</p>
    </div>
  );
}
