import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import MediaReveal from "./MediaReveal";
import { projectCopy, type Project } from "@/content/projects";
import type { Locale } from "@/content/dictionary";

/**
 * Composition de la grille projets.
 *
 * Deux rangees : deux grands projets en tete, trois plus bas. La hierarchie
 * passe par la HAUTEUR des rangees, jamais par un decalage vertical entre
 * cartes voisines — des cartes decalees font atterrir les legendes a des
 * hauteurs differentes, ce qui lit comme un bug et non comme une composition.
 *
 * Les cartes d'une meme rangee partagent une hauteur FIXE, pas un ratio : avec
 * un ratio commun, deux colonnes de largeurs differentes donneraient deux
 * hauteurs differentes et les legendes ne s'aligneraient plus.
 */
export type CardShape = {
  span: string;
  height: string;
  sizes: string;
};

export const CARD_SHAPES: CardShape[] = [
  // Rangee 1 : les deux projets mis en avant, a parts egales.
  { span: "md:col-span-6", height: "md:h-[540px]", sizes: "50vw" },
  { span: "md:col-span-6", height: "md:h-[540px]", sizes: "50vw" },
  // Rangee 2 : les trois autres, plus basses. La difference de hauteur
  // entre les deux rangees suffit a etablir la hierarchie sans annoter
  // quoi que ce soit.
  { span: "md:col-span-4", height: "md:h-[400px]", sizes: "33vw" },
  { span: "md:col-span-4", height: "md:h-[400px]", sizes: "33vw" },
  { span: "md:col-span-4", height: "md:h-[400px]", sizes: "33vw" },
];

export default function ProjectCard({
  project,
  locale,
  index,
  shape,
  viewLabel,
}: {
  project: Project;
  locale: Locale;
  index: number;
  shape: CardShape;
  /** Libelle affiche dans le curseur au survol de la carte. */
  viewLabel: string;
}) {
  const copy = projectCopy(project, locale);

  return (
    <Reveal as="li" delay={(index % 2) * 90} className={shape.span}>
      <Link
        href={`/${locale}/work/${project.slug}`}
        className="group block"
        data-cursor="view"
        data-cursor-label={viewLabel}
      >
        {/* Le devoilement par masque tient le cadre immobile pendant que le
            visuel se revele : une carte qui glisse en fondu se lit comme un
            rectangle qui bouge, pas comme une image qui arrive. */}
        <MediaReveal
          delay={(index % 2) * 90}
          className={`aspect-[4/5] w-full md:aspect-auto ${shape.height}`}
        >
        <Parallax amount={8} className="h-full w-full bg-paper/5">
          <Image
            src={project.image}
            alt={copy.title}
            fill
            priority={index === 0}
            sizes={`(max-width: 768px) 100vw, ${shape.sizes}`}
            // Noir et blanc par defaut, couleur au survol.
            //
            // Les visuels viennent de contextes tres differents — studio gris,
            // ciel bleu sature, degrade bleu nuit. Cote a cote, les
            // temperatures de couleur se cognent et la grille ne lit plus comme
            // une serie. Le passage en niveaux de gris les ramene sur un plan
            // commun ; le leger gain de contraste compense l'aplatissement que
            // produit toujours une desaturation.
            //
            // La couleur revient au survol : la grille reste cohérente au
            // premier regard, et le vrai rendu du projet est a un geste.
            className="object-cover grayscale contrast-[1.08] transition-[transform,filter] duration-[900ms] ease-expo group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:contrast-100"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
        </Parallax>
        </MediaReveal>

        {/* Legende sur un filet : la ligne fixe le bas de l'image et donne aux
            cartes d'une meme rangee une base commune. */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-baseline justify-between gap-6 text-paper/55">
            <div className="flex items-center gap-3">
              {/* L'annee n'est pas connue pour tous les projets : le separateur
                  n'apparait que s'il y a bien deux valeurs. */}
              {project.year && (
                <>
                  <span className="t-meta nums">{project.year}</span>
                  <span className="h-px w-4 bg-paper/30" />
                </>
              )}
              <span className="t-meta">{copy.category}</span>
            </div>

            <span className="eyebrow nums shrink-0 text-paper/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="t-h3 mt-3 md:text-[clamp(1.5rem,2vw,1.75rem)]">
            <span className="link-sweep">{copy.title}</span>
          </h3>
          <p className="t-prose mt-2 max-w-[52ch] text-paper/60">{copy.desc}</p>
        </div>
      </Link>
    </Reveal>
  );
}
