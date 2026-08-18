import ActionLink from "./ActionLink";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import { CONTACT } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";

export default function Cta({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" data-chapter={dict.chapters.contact} className="section container-lab">
      <Reveal className="on-media relative overflow-hidden grain">
        <div className="mesh absolute -inset-[25%] animate-drift" />
        <div className="absolute inset-0 bg-ink/25" />

        <div className="relative flex min-h-[480px] flex-col items-center justify-center px-6 py-24 text-center">
          <RevealText
            as="h2"
            text={dict.cta.title}
            className="t-cta max-w-[18ch]"
            stagger={50}
          />
          <p className="t-lead mt-6 max-w-[46ch] text-paper/90">{dict.cta.body}</p>
          <ActionLink
            href={`mailto:${CONTACT.email}`}
            label={dict.cta.button}
            withArrow
            className="mt-9"
          />

          {/* L'adresse en clair sous le bouton : certains preferent copier une
              adresse plutot que declencher leur client mail. */}
          <p className="eyebrow mt-8 text-paper/70">{CONTACT.email}</p>
        </div>
      </Reveal>
    </section>
  );
}
