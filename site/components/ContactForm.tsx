"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Calendar from "./Calendar";
import { BOOKING, formatDate } from "@/lib/booking";
import { submitContact } from "@/app/actions/contact";
import { initialContactState, type FieldName } from "@/lib/contact";
import { CONTACT } from "@/content/site";
import type { PagesCopy } from "@/content/pages";
import type { Locale } from "@/content/dictionary";

type ContactFormProps = {
  copy: PagesCopy["form"];
  booking: PagesCopy["booking"];
  locale: Locale;
};

function SubmitButton({ label, pending }: { label: string; pending: string }) {
  const { pending: isPending } = useFormStatus();

  return (
    <button type="submit" disabled={isPending} className="btn-solid group disabled:opacity-60">
      <span className="relative block overflow-hidden">
        <span className={isPending ? "block" : "block transition-transform duration-500 ease-expo group-hover:-translate-y-full"}>
          {isPending ? pending : label}
        </span>
        {!isPending && (
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0"
          >
            {label}
          </span>
        )}
      </span>
      {!isPending && (
        <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}

export default function ContactForm({ copy, booking, locale }: ContactFormProps) {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  // Horodatage du rendu : sert au controle anti-robot cote serveur.
  const startedAt = useRef(Date.now());

  const errorFor = (field: FieldName): string | null => {
    const code = state.errors?.[field];
    if (!code) return null;
    const group = (copy.errors as Record<string, Record<string, string>>)[field];
    return group?.[code] ?? null;
  };

  const formError = state.formError
    ? (copy.errors.form as Record<string, string>)[state.formError]
    : null;

  if (state.status === "success") {
    return (
      <div className="border border-line bg-surface p-8 md:p-10" role="status">
        <h2 className="t-h3">{copy.successTitle}</h2>
        <p className="t-prose mt-3 max-w-[52ch] text-paper/65">{copy.successBody}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-ghost mt-7"
        >
          {copy.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-12" noValidate>
      <input type="hidden" name="startedAt" value={startedAt.current} />

      {/* Piege a robots : hors flux, hors tabulation, hors arbre d'accessibilite.
          `display:none` serait detecte par les robots un peu sérieux. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="t-prose border-l-2 border-paper/60 pl-4 text-paper/80">
          {formError}{" "}
          <a href={`mailto:${CONTACT.email}`} className="link-sweep font-medium">
            {CONTACT.email}
          </a>
        </p>
      )}

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-6 w-full border-t border-line pt-4">
          {copy.legendProject}
        </legend>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label={copy.name} name="name" required requiredLabel={copy.required} error={errorFor("name")}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              className="input-lab"
            />
          </Field>

          <Field label={copy.email} name="email" required requiredLabel={copy.required} error={errorFor("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              className="input-lab"
            />
          </Field>

          <Field label={copy.company} name="company" hint={copy.optional}>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={copy.companyPlaceholder}
              className="input-lab"
            />
          </Field>

          <Field label={copy.projectType} name="projectType" hint={copy.optional}>
            <select id="projectType" name="projectType" className="input-lab" defaultValue="">
              <option value="">{copy.placeholderSelect}</option>
              {copy.projectTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label={copy.budget} name="budget" hint={copy.optional} className="md:col-span-2">
            <select id="budget" name="budget" className="input-lab" defaultValue="">
              <option value="">{copy.placeholderSelect}</option>
              {copy.budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label={copy.message} name="message" required requiredLabel={copy.required} error={errorFor("message")}>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={copy.messagePlaceholder}
            className="input-lab resize-y"
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-2 w-full border-t border-line pt-4">
          {copy.legendMeeting}
        </legend>
        <p className="t-meta -mt-4 text-paper/45">{copy.legendMeetingHint}</p>

        {/* Les valeurs choisies dans le calendrier voyagent en champs caches :
            le formulaire reste un vrai formulaire, poste par l'action serveur. */}
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="slot" value={slot} />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="t-body mb-4 font-medium">{booking.dateLabel}</p>
            <div className="border border-line p-4">
              <Calendar value={date} onChange={setDate} copy={booking} locale={locale} />
            </div>
            {errorFor("date") && (
              <p role="alert" className="t-meta mt-2 text-paper/80">
                {errorFor("date")}
              </p>
            )}
          </div>

          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <p className="t-body font-medium">{booking.slotLabel}</p>
              <span className="t-meta text-paper/45">{booking.slotHint}</span>
            </div>

            {!date ? (
              <p className="t-prose text-paper/45">{booking.noDate}</p>
            ) : (
              <>
                <p className="t-meta mb-4 capitalize text-paper/60">{formatDate(date, locale)}</p>

                <div role="radiogroup" aria-label={booking.slotLabel} className="grid grid-cols-3 gap-2">
                  {BOOKING.slots.map((option) => {
                    const active = slot === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSlot(active ? "" : option)}
                        className={`nums border px-2 py-2.5 text-[14px] transition-colors duration-200 ${
                          active
                            ? "border-paper bg-paper font-medium text-ink"
                            : "border-line text-paper/75 hover:border-paper/40 hover:text-paper"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDate("");
                    setSlot("");
                  }}
                  className="t-meta mt-4 text-paper/50 underline-offset-4 hover:text-paper hover:underline"
                >
                  {booking.clear}
                </button>
              </>
            )}

            {errorFor("slot") && (
              <p role="alert" className="t-meta mt-2 text-paper/80">
                {errorFor("slot")}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="space-y-6 border-t border-line pt-8">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-paper"
          />
          <span className="t-prose max-w-[60ch] text-paper/65">{copy.consent}</span>
        </label>
        {errorFor("consent") && (
          <p role="alert" className="t-meta text-paper/80">
            {errorFor("consent")}
          </p>
        )}

        <SubmitButton label={copy.submit} pending={copy.submitting} />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  children,
  required,
  requiredLabel,
  hint,
  error,
  className = "",
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  requiredLabel?: string;
  hint?: string;
  error?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3">
        <span className="t-body font-medium">{label}</span>
        <span className="t-meta text-paper/40">{required ? requiredLabel : hint}</span>
      </label>
      {children}
      {error && (
        <p role="alert" className="t-meta mt-2 text-paper/80">
          {error}
        </p>
      )}
    </div>
  );
}
