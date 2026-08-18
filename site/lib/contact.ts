/**
 * Types et valeurs partages du formulaire de contact.
 *
 * Volontairement HORS du fichier de l'action serveur : un module marque
 * `"use server"` ne peut exporter que des fonctions async. Y laisser un simple
 * objet fait echouer le rendu de la page a l'execution — et le build de
 * production, lui, passe sans rien signaler.
 */

export type FieldName =
  | "name"
  | "email"
  | "company"
  | "projectType"
  | "budget"
  | "message"
  | "date"
  | "slot"
  | "consent";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Code d'erreur par champ, ex. { email: "invalid" }. */
  errors?: Partial<Record<FieldName, string>>;
  /** Code d'erreur global, ex. "delivery" ou "spam". */
  formError?: string;
};

export const initialContactState: ContactState = { status: "idle" };
