import Image from "next/image";
import ActionLink from "./ActionLink";
import RevealText from "./RevealText";
import Reveal from "./Reveal";
import { CONTACT } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="top" data-chapter={dict.chapters.opening} className="on-media relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Pas de z-index negatif : un element en `-z-10` est peint DERRIERE
          le fond opaque du body, donc invisible. Le fond reste a z-0 et le
          contenu passe au-dessus en z-10. */}
      <div className="mask-fade-b absolute inset-0 z-0 overflow-hidden grain">
        {/* Le visuel garde le mouvement lent qu'avait le dégradé : un hero
            parfaitement fixe retombe dans le statique qu'on cherche à éviter.
            Le conteneur déborde de 10 % pour que la dérive ne découvre jamais
            de bord. */}
        <div className="absolute -inset-[10%] animate-drift">
          <Image
            src="/brand/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Voile calé sur la photo, pas sur l'ancien dégradé.
            Le visuel a une luminance moyenne de 91/255 : à 55 % de noir il
            tombait à ~41 et la photo disparaissait purement et simplement.
            35 % suffit à tenir les zones claires (les néons de la salle) sous
            le texte blanc, tout en laissant l'image exister.
            Un seul voile plein, et un dégradé uniquement sur le tiers bas pour
            fondre la section dans la page — les trois calques précédents
            s'additionnaient. */}
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div className="container-lab relative z-10 flex h-full flex-col items-center justify-center text-center">
        <RevealText
          as="h1"
          text={`${dict.hero.line1}\n${dict.hero.line2}`}
          className="t-h1 max-w-[16ch] md:max-w-[900px]"
          stagger={55}
          delay={120}
        />

        <Reveal delay={700} className="mt-7">
          <p className="t-lead mx-auto max-w-[46ch] text-paper/90">{dict.hero.subtitle}</p>
        </Reveal>

        <Reveal delay={820} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ActionLink href="#contact" label={dict.hero.primary} withArrow />
          <ActionLink href="#work" label={dict.hero.secondary} variant="ghost" />
        </Reveal>
      </div>

      {/* Bandeau de pied de hero : localise le studio et amorce le scroll.
          Les coins occupes tiennent la composition, un hero centre dans le vide
          flotte toujours un peu. */}
      {/* Ce bandeau est en bas du premier ecran : le declencher au scroll le
          rendrait invisible pile au moment ou il sert. Animation en differe
          fixe plutot qu'a l'intersection. */}
      <div
        style={{ animationDelay: "1s" }}
        className="container-lab pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden animate-fade-up items-end justify-between text-paper [html[data-theme=light]_&]:text-ink md:flex"
      >
        <p className="eyebrow">{dict.hero.tagline}</p>
        <p className="eyebrow">{CONTACT.city}</p>
        <p className="eyebrow flex items-center gap-2">
          {dict.hero.scroll}
          <span aria-hidden className="inline-block animate-bounce">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}
