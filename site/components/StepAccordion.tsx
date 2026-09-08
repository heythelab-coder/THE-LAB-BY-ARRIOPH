"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { Dictionary } from "@/content/dictionary";

/**
 * Visuels des etapes. Hors du dictionnaire : ils ne changent pas d'une langue a
 * l'autre, et les dupliquer en FR et EN rouvrirait le risque de
 * desynchronisation qu'on a supprime sur les projets.
 */
const STEP_IMAGES = [
  "/editorial/process-1.avif",
  "/editorial/process-2.avif",
  "/editorial/process-3.jpg",
  "/editorial/faq.jpg",
];

/**
 * Liste d'etapes en accordeon.
 *
 * Au repos, chaque etape n'est qu'un intitule en tres grand : la section tient
 * sur quelques lignes. L'etape ouverte remplace son titre par un panneau plein
 * en contraste inverse.
 *
 * Le panneau est compose en DEUX COLONNES, texte a gauche et visuel a droite.
 * Une premiere version posait le texte seul sur toute la largeur : le panneau
 * etait vide aux deux tiers, exactement le defaut d'un bloc rempli au hasard.
 * Le visuel n'est pas une decoration, c'est ce qui donne au panneau une raison
 * d'occuper la largeur qu'il prend.
 *
 * Le numero est repris en tres grand derriere le texte, en filigrane : il fixe
 * la position dans la serie une fois que le titre a cede la place.
 *
 * Ouverture au survol sur pointeur fin, au clic partout. Le clic reste
 * indispensable : au doigt il n'y a pas de survol, et au clavier il faut
 * pouvoir ouvrir sans souris.
 */
export default function StepAccordion({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(0);
  const steps = dict.process.steps;

  // Ce bloc decrit la METHODE, pas l'offre : l'ancre et le libelle de chapitre
  // le disent maintenant. Les expertises ont leur propre page.
  return (
    <section id="method" data-chapter={dict.chapters.method} className="section container-lab">
      <SectionHeader
        eyebrow={dict.process.eyebrow}
        title={dict.process.title}
        count={String(steps.length).padStart(2, "0")}
        className="mb-12"
      />

      <ul className="border-t border-line">
        {steps.map((step, index) => {
          const isOpen = open === index;

          return (
            <Reveal as="li" key={step.n} delay={index * 70} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(index)}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                    setOpen(index);
                  }
                }}
                onFocus={() => setOpen(index)}
                className="group block w-full text-left"
              >
                {/* Etat ferme : titre nu. Il glisse vers la droite a l'approche,
                    le seul signe dont on a besoin pour dire « ceci s'ouvre ». */}
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-expo ${
                    isOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="flex items-center justify-between gap-6 py-6">
                      <span className="font-sans text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium uppercase leading-[1.05] tracking-[-0.03em] text-paper/85 transition-[transform,color] duration-500 ease-expo group-hover:translate-x-3 group-hover:text-paper">
                        {step.title}
                      </span>
                      <span className="eyebrow nums shrink-0 text-paper/30">{step.n}</span>
                    </div>
                  </div>
                </div>

                {/* Etat ouvert : panneau plein, deux colonnes. */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-expo ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="relative my-4 grid overflow-hidden bg-paper text-ink md:grid-cols-12">
                      <div className="relative z-10 overflow-hidden px-6 py-8 md:col-span-7 md:px-10 md:py-12">
                        {/* Numero en filigrane : il tient la position dans la
                            serie une fois le grand titre efface. Place DANS la
                            colonne de texte, pas sur le panneau : au niveau du
                            panneau, la colonne image rendue apres le
                            recouvrait entierement. */}
                        <span
                          aria-hidden
                          className="nums pointer-events-none absolute -top-4 right-4 font-serif leading-none tracking-tightest text-ink/[0.07] md:right-8"
                          style={{ fontSize: "clamp(5rem,9vw,9rem)" }}
                        >
                          {step.n}
                        </span>

                        <p className="relative text-[12px] font-medium uppercase tracking-[0.1em] text-ink/50">
                          {step.title}
                        </p>

                        <p className="relative mt-5 max-w-[46ch] font-sans text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.45] tracking-[-0.015em] text-ink">
                          {step.body}
                        </p>

                        <div className="relative mt-7 flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="t-meta rounded-full border border-ink/15 px-[11px] py-[6px] text-ink/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Le visuel remplit la colonne de droite jusqu'aux bords
                          du panneau. Masque en dessous de md : sur mobile la
                          colonne disparait, l'image doublerait la hauteur du
                          panneau sans rien apporter. */}
                      <div className="relative hidden min-h-[260px] md:col-span-5 md:block">
                        <Image
                          src={STEP_IMAGES[index % STEP_IMAGES.length]}
                          alt=""
                          fill
                          sizes="40vw"
                          className={`object-cover grayscale transition-transform duration-[1400ms] ease-expo ${
                            isOpen ? "scale-100" : "scale-110"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
