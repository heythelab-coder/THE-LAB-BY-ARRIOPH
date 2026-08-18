import Reveal from "./Reveal";
import { SERVICES, serviceCopy } from "@/content/services";
import type { Locale } from "@/content/dictionary";

/**
 * Liste des prestations.
 *
 * Deux densites pour un seul composant : la version complete sur la page
 * Services, une version resserree sur l'accueil. Dupliquer le balisage aurait
 * garanti que les deux divergent des la premiere modification de l'offre.
 *
 * La version resserree ne montre que numero et intitule. C'est volontaire :
 * elle doit donner envie d'ouvrir la page, pas la remplacer.
 */
export default function ServiceList({
  locale,
  deliverablesLabel,
  compact = false,
}: {
  locale: Locale;
  deliverablesLabel: string;
  compact?: boolean;
}) {
  return (
    <ol>
      {SERVICES.map((service, index) => {
        const copy = serviceCopy(service, locale);

        return (
          <Reveal as="li" key={service.id} delay={index * 80}>
            <div
              id={service.id}
              className={`group grid gap-5 border-t border-line transition-colors duration-500 hover:border-paper/30 md:grid-cols-12 md:gap-8 ${
                compact ? "py-7" : "py-10 md:py-14"
              }`}
            >
              <div className="flex items-baseline gap-5 md:col-span-5 md:gap-7">
                <span className="nums font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-tightest text-paper/25 transition-colors duration-500 group-hover:text-accent">
                  {service.n}
                </span>
                <h3 className={compact ? "t-h3" : "t-h3 md:text-[clamp(1.5rem,2.2vw,1.875rem)]"}>
                  {copy.title}
                </h3>
              </div>

              {!compact && (
                <div className="md:col-span-4">
                  <p className="t-prose max-w-[46ch] text-paper/65">{copy.summary}</p>
                </div>
              )}

              {!compact && (
                <div className="md:col-span-3">
                  <p className="eyebrow text-paper/35">{deliverablesLabel}</p>
                  <ul className="mt-4 space-y-2">
                    {copy.deliverables.map((item) => (
                      <li key={item} className="t-meta flex gap-3 text-paper/70">
                        <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-paper/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
      <li className="border-t border-line" aria-hidden />
    </ol>
  );
}
