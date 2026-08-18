"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import type { Dictionary } from "@/content/dictionary";

/**
 * FAQ en deux colonnes.
 *
 * Le visuel avait un ratio fixe (2/3) dans une colonne dont la voisine etait
 * plus haute : il en resultait un pave photo flottant surmontant un grand vide,
 * la signature meme d'une image posee dans une case.
 *
 * Ici la colonne image s'etire sur toute la hauteur de la rangee — `items-stretch`
 * par defaut en grille, plus `h-full` sur le conteneur — donc sa hauteur est
 * dictee par le contenu d'a cote. Plus de ratio impose, plus de vide, et la
 * section lit comme une division en deux plutot qu'un bloc ajoute.
 *
 * Niveaux de gris, comme la grille projets : les visuels du site restent sur un
 * plan commun.
 */
export default function Faq({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="section container-lab">
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="hidden md:col-span-4 md:block">
          <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-paper/5">
            <Image
              src="/editorial/faq.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 32vw"
              className="object-cover grayscale contrast-[1.08]"
              priority={false}
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <p className="eyebrow nums text-paper/35">
              <span aria-hidden>(</span>
              {String(dict.faq.items.length).padStart(2, "0")}
              <span aria-hidden>)</span>
            </p>
          </Reveal>

          <RevealText as="h2" text={dict.faq.title} className="t-display mt-6" stagger={40} />

          <Reveal delay={120} className="mt-10">
            {dict.faq.items.map((item, index) => {
              const isOpen = open === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <div key={item.q} className="border-b border-line first:border-t">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-paper/80"
                    >
                      <span className="t-body font-medium">{item.q}</span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-[20px] leading-none text-paper/60 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    // `hidden` mettrait display:none et casserait l'animation.
                    // `inert` sort le panneau replie du focus et de l'arbre a11y
                    // tout en laissant la transition de hauteur se jouer.
                    inert={!isOpen}
                    className={`grid transition-all duration-500 ease-expo ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="t-prose max-w-[62ch] pb-6 text-paper/65">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
