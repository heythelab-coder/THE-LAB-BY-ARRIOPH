import Image from "next/image";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import Parallax from "./Parallax";
import VideoPanel from "./VideoPanel";
import type { Dictionary } from "@/content/dictionary";

export default function Approach({ dict }: { dict: Dictionary }) {
  return (
    <section id="studio" data-chapter={dict.chapters.studio} className="container-lab pt-16">
      {/* Hauteur MINIMALE et non fixe : la colonne de gauche porte desormais
          les trois situations en plus du texte. A hauteur fixe, le depassement
          serait sorti du cadre au lieu de pousser la section. */}
      <div className="grid gap-10 md:min-h-[760px] md:grid-cols-12 md:gap-8">
        <Reveal className="flex flex-col justify-center md:col-span-6 md:pr-10">
          <p className="eyebrow border-t border-line pt-4">{dict.approach.eyebrow}</p>

          <RevealText
            as="h2"
            text={dict.approach.title}
            className="t-display mt-6"
            stagger={40}
          />

          {/* Mesure limitee a ~58 caracteres : au-dela, l'oeil perd la ligne. */}
          <div className="mt-7 max-w-[58ch] text-paper/70">
            <p className="t-prose">{dict.approach.p1}</p>
          </div>

          {/* Les trois situations. Un visiteur ne se reconnait pas dans un
              intitule de prestation, il se reconnait dans un moment : « je
              lance », « j'ouvre une offre », « je change d'echelle ». C'est
              aussi ce qui laisse la porte ouverte aux entreprises installees
              sans avoir a l'ecrire noir sur blanc.
              Filet a gauche plutot que puce : la liste se lit comme une suite
              de cas, pas comme un argumentaire. */}
          <ul className="mt-7 max-w-[58ch] space-y-3 border-l border-line pl-5">
            {dict.approach.situations.map((situation) => (
              <li key={situation.label}>
                <p className="t-body font-medium">{situation.label}</p>
                <p className="t-meta mt-1 text-paper/55">{situation.body}</p>
              </li>
            ))}
          </ul>

          <p className="t-prose mt-7 max-w-[58ch] text-paper/70">{dict.approach.outcome}</p>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-6">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              style={{ width: 40, height: 40 }}
              className="rounded-full object-cover"
            />
            <div>
              <p className="t-body font-medium">{dict.approach.name}</p>
              <p className="t-meta mt-0.5 text-paper/55">{dict.approach.role}</p>
            </div>
          </div>
        </Reveal>

        {/* Le visuel deborde volontairement d'une colonne : une image calee
            pile sur la grille reste sage, un debord signe la composition. */}
        <Reveal
          delay={120}
          className="md:col-span-6 md:col-start-8 md:-mr-8 md:h-full lg:-mr-16 xl:-mr-[calc(50vw-720px)]"
        >
          {/* `mask-fade-inset` decoupe le media sur son bord interieur et vers
              le bas : il se fond dans la page au lieu de s'y poser en
              rectangle. Le fond sombre est masque avec lui — c'est pour ca
              qu'on masque le conteneur et non la video seule. */}
          <Parallax
            amount={8}
            className="mask-fade-inset aspect-[4/5] w-full bg-[#0b1020] on-media md:aspect-auto md:h-full"
          >
            <VideoPanel src="/video/approach.mp4" />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
