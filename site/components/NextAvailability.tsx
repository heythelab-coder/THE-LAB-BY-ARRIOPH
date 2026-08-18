"use client";

import { useEffect, useState } from "react";
import { firstBookableDate, formatDate, toDateKey } from "@/lib/booking";
import type { Locale } from "@/content/dictionary";

/**
 * Prochaine date reservable, calculee cote client.
 *
 * Volontairement pas rendue au build : les pages sont generees en statique, la
 * date serait donc figee au jour du deploiement et deviendrait fausse des le
 * lendemain. Une date d'ouverture erronee est pire que pas de date du tout.
 *
 * Rien n'est affiche avant le montage, ce qui evite aussi tout ecart
 * d'hydratation entre le HTML du serveur et celui du navigateur.
 */
export default function NextAvailability({
  label,
  locale,
}: {
  label: string;
  locale: Locale;
}) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(toDateKey(firstBookableDate()));
  }, []);

  if (!date) return null;

  return (
    <p className="eyebrow flex items-center gap-2 text-paper/45">
      {/* Point vivant : signale une disponibilite reelle, pas un slogan. */}
      <span aria-hidden className="relative flex h-[6px] w-[6px]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-accent" />
      </span>
      {label} <span className="capitalize text-paper/70">{formatDate(date, locale)}</span>
    </p>
  );
}
