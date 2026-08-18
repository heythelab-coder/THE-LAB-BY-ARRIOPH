"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  firstBookableDate,
  fromDateKey,
  isBookable,
  lastBookableDate,
  monthGrid,
  toDateKey,
} from "@/lib/booking";
import type { PagesCopy } from "@/content/pages";
import type { Locale } from "@/content/dictionary";

type CalendarProps = {
  value: string;
  onChange: (value: string) => void;
  copy: PagesCopy["booking"];
  locale: Locale;
};

/**
 * Calendrier de reservation.
 *
 * Implemente en `role="grid"` avec tabindex mobile : une seule cellule est
 * atteignable par Tab, les fleches deplacent le focus a l'interieur. C'est le
 * comportement attendu d'une grille — sans ca, un mois represente trente et un
 * arrets de tabulation avant d'atteindre le champ suivant.
 */
export default function Calendar({ value, onChange, copy, locale }: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const first = useMemo(() => firstBookableDate(today), [today]);
  const last = useMemo(() => lastBookableDate(today), [today]);

  const initial = fromDateKey(value) ?? first;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const [focusKey, setFocusKey] = useState<string>(value || toDateKey(first));

  const gridRef = useRef<HTMLDivElement | null>(null);
  const shouldFocus = useRef(false);

  const cells = useMemo(() => monthGrid(view.year, view.month), [view]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        month: "long",
        year: "numeric",
      }).format(new Date(view.year, view.month, 1)),
    [view, locale],
  );

  // Bornes de navigation : inutile de proposer des mois entierement fermes.
  const canGoBack =
    new Date(view.year, view.month, 1) > new Date(first.getFullYear(), first.getMonth(), 1);
  const canGoForward =
    new Date(view.year, view.month, 1) < new Date(last.getFullYear(), last.getMonth(), 1);

  // Le focus n'est deplace qu'apres une interaction clavier, jamais au montage :
  // sinon la page sauterait sur le calendrier des son affichage.
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const node = gridRef.current?.querySelector<HTMLButtonElement>(`[data-key="${focusKey}"]`);
    node?.focus();
  }, [focusKey]);

  const moveFocus = (deltaDays: number) => {
    const current = fromDateKey(focusKey);
    if (!current) return;

    const next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + deltaDays);
    if (next < first || next > last) return;

    shouldFocus.current = true;
    setFocusKey(toDateKey(next));
    if (next.getMonth() !== view.month || next.getFullYear() !== view.year) {
      setView({ year: next.getFullYear(), month: next.getMonth() });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      PageUp: -28,
      PageDown: 28,
    };

    const delta = moves[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    moveFocus(delta);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <button
          type="button"
          onClick={() => setView((v) => ({ year: v.month === 0 ? v.year - 1 : v.year, month: (v.month + 11) % 12 }))}
          disabled={!canGoBack}
          aria-label={copy.previousMonth}
          className="rounded-full border border-line px-3 py-1.5 text-[14px] text-paper/70 transition-colors hover:border-paper/40 hover:text-paper disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-line"
        >
          ←
        </button>

        <p className="t-body font-medium capitalize" aria-live="polite">
          {monthLabel}
        </p>

        <button
          type="button"
          onClick={() => setView((v) => ({ year: v.month === 11 ? v.year + 1 : v.year, month: (v.month + 1) % 12 }))}
          disabled={!canGoForward}
          aria-label={copy.nextMonth}
          className="rounded-full border border-line px-3 py-1.5 text-[14px] text-paper/70 transition-colors hover:border-paper/40 hover:text-paper disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-line"
        >
          →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1" aria-hidden>
        {copy.weekdays.map((day, i) => (
          <span key={i} className="py-1 text-center text-[11px] uppercase tracking-[0.1em] text-paper/35">
            {day}
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label={copy.dateLabel}
        onKeyDown={onKeyDown}
        className="mt-1 grid grid-cols-7 gap-1"
      >
        {cells.map((key, index) => {
          if (!key) return <span key={`empty-${index}`} role="presentation" />;

          const enabled = isBookable(key, today);
          const selected = key === value;
          const day = Number(key.slice(-2));

          return (
            <button
              key={key}
              type="button"
              data-key={key}
              role="gridcell"
              aria-selected={selected}
              aria-disabled={!enabled}
              // Une seule cellule dans l'ordre de tabulation : les fleches font le reste.
              tabIndex={key === focusKey ? 0 : -1}
              onClick={() => {
                if (!enabled) return;
                setFocusKey(key);
                onChange(key);
              }}
              className={`nums aspect-square rounded-md text-[14px] transition-colors duration-200 ${
                selected
                  ? "bg-paper font-medium text-ink"
                  : enabled
                    ? "text-paper/80 hover:bg-paper/10"
                    : "cursor-not-allowed text-paper/20"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="t-meta mt-4 text-paper/45">{copy.closedHint}</p>
    </div>
  );
}
