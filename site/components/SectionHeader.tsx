import Reveal from "./Reveal";
import RevealText from "./RevealText";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  /** Compteur affiche a droite du filet, ex. "06". */
  count?: string;
  className?: string;
};

/**
 * En-tete de section editorial : filet pleine largeur, sur-titre a gauche,
 * compteur a droite, puis le titre. Exposer le filet et l'index donne
 * l'impression de grille tenue qui separe un site de studio d'un template.
 */
export default function SectionHeader({
  eyebrow,
  title,
  count,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <Reveal className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <p className="eyebrow">{eyebrow}</p>
        {count && (
          <p className="eyebrow tabular-nums text-paper/35">
            <span aria-hidden>(</span>
            {count}
            <span aria-hidden>)</span>
          </p>
        )}
      </Reveal>

      <RevealText as="h2" text={title} className="t-display mt-6" stagger={40} />
    </div>
  );
}
