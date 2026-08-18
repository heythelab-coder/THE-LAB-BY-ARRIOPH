import Reveal from "./Reveal";
import RevealText from "./RevealText";

/**
 * En-tete des pages internes.
 *
 * Le padding haut degage la nav fixe (88px) : sans lui, le sur-titre passerait
 * dessous au chargement, la ou l'accueil n'a pas le probleme grace a son hero
 * pleine hauteur.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  count,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  count?: string;
}) {
  return (
    <header className="container-lab pb-16 pt-[136px] md:pb-20 md:pt-[176px]">
      <Reveal className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <p className="eyebrow">{eyebrow}</p>
        {count && (
          <p className="eyebrow nums text-paper/35">
            <span aria-hidden>(</span>
            {count}
            <span aria-hidden>)</span>
          </p>
        )}
      </Reveal>

      <RevealText as="h1" text={title} className="t-display mt-6" stagger={45} />

      {intro && (
        <Reveal delay={200}>
          <p className="t-lead mt-8 max-w-[62ch] text-paper/70">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
