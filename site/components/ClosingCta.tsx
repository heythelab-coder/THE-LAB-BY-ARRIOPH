import Reveal from "./Reveal";
import RevealText from "./RevealText";
import ActionLink from "./ActionLink";
import NextAvailability from "./NextAvailability";
import { CONTACT } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionary";

/**
 * Bloc de fin de page.
 *
 * Le precedent etait un rectangle a degrade violet, pose au milieu de la page.
 * Le probleme n'etait pas l'idee mais le pave : un bloc opaque coupe la nappe
 * d'ambiance et se lit comme une banniere collee.
 *
 * Ici, aucun fond. Le bloc emprunte le vocabulaire du reste du site — filet,
 * sur-titre, echelle display — et laisse l'ambiance le traverser. Sa presence
 * vient de l'echelle du titre et du vide autour, pas d'un aplat de couleur.
 *
 * Le detail qui compte : la prochaine disponibilite est REELLE, calculee depuis
 * les regles de reservation. Elle cree une urgence honnete, et donne au
 * visiteur une information qu'il cherchait de toute facon.
 */
export default function ClosingCta({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section
      id="contact"
      data-chapter={dict.chapters.contact}
      className="container-lab pb-24 pt-16 md:pb-32 md:pt-24"
    >
      <Reveal className="flex flex-col gap-3 border-t border-line pt-4 md:flex-row md:items-baseline md:justify-between">
        <p className="eyebrow">{dict.cta.eyebrow}</p>
        <NextAvailability label={dict.cta.availability} locale={locale} />
      </Reveal>

      {/* Plus grand que les titres de section : c'est la derniere chose qu'on
          lit, elle doit peser plus lourd que ce qui precede. */}
      <RevealText
        as="h2"
        text={dict.cta.title}
        className="mt-10 font-serif font-normal leading-[0.95] tracking-tightest text-[clamp(2.75rem,7vw,5.5rem)]"
        stagger={55}
      />

      <Reveal delay={250}>
        <p className="t-lead mt-8 max-w-[46ch] text-paper/60">{dict.cta.body}</p>
      </Reveal>

      <Reveal
        delay={350}
        className="mt-12 flex flex-col items-start gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between"
      >
        <ActionLink href={`/${locale}/contact`} label={dict.cta.button} withArrow />

        {/* L'adresse en clair a cote du bouton : certains preferent copier une
            adresse plutot que passer par un formulaire. */}
        <a href={`mailto:${CONTACT.email}`} className="group t-body text-paper/60 hover:text-paper">
          <span className="link-sweep">{CONTACT.email}</span>
        </a>
      </Reveal>
    </section>
  );
}
