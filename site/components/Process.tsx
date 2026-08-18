"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { Dictionary } from "@/content/dictionary";

/**
 * Visuels des etapes. Gardes hors du dictionnaire : ils ne changent pas d'une
 * langue a l'autre, et les dupliquer en FR et EN reintroduirait le risque de
 * desynchronisation qu'on a supprime sur les projets.
 */
const STEP_IMAGES = [
  "/editorial/process-1.avif",
  "/editorial/process-2.avif",
  "/editorial/process-3.jpg",
];

/**
 * Process : liste d'index avec visuel revele au survol.
 *
 * La version precedente donnait une colonne fixe a chaque image. Resultat : une
 * ligne de 700px de haut, un pave photo a gauche, et un grand vide a droite —
 * l'image n'etait pas composee, elle occupait une case. C'est exactement ce qui
 * fait « gabarit rempli ».
 *
 * Ici les lignes sont rendues a leur vraie hauteur (~200px), purement
 * typographiques, et le visuel suit le curseur au survol de la ligne. Il n'y a
 * plus d'espace mort a remplir, et l'image devient une recompense a
 * l'exploration plutot qu'un bloc a caser.
 *
 * Le survol n'existe pas au doigt : sous md, chaque ligne affiche une vignette
 * en ligne. L'information ne depend jamais d'une interaction indisponible.
 */
export default function Process({ dict }: { dict: Dictionary }) {
  const total = String(dict.process.steps.length).padStart(2, "0");

  const sectionRef = useRef<HTMLElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // Position visee (le curseur) et position rendue, rapprochees a chaque frame.
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const follower = followerRef.current;
    if (!section || !follower) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    let frame = 0;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const tick = () => {
      // Interpolation : le visuel rattrape le curseur au lieu de lui coller.
      // Le leger retard est ce qui donne le poids ; a 1 le suivi parait sec.
      const ease = reduced.matches ? 1 : 0.12;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      follower.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} data-chapter={dict.chapters.services} className="section container-lab relative">
      <SectionHeader
        eyebrow={dict.process.eyebrow}
        title={dict.process.title}
        count={total}
        className="mb-14"
      />

      {/* Visuel flottant, hors flux et non cliquable : il ne doit jamais
          intercepter le survol des lignes qui le pilotent. */}
      <div
        ref={followerRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <div
          className={`relative h-[300px] w-[230px] overflow-hidden transition-[opacity,transform] duration-700 ease-expo ${
            active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {/* Indexe sur les etapes, pas sur les visuels : le protocole compte
              quatre etapes pour trois images, donc la derniere reboucle. Mapper
              STEP_IMAGES directement laissait la 4e ligne sans visuel. */}
          {dict.process.steps.map((step, index) => (
            <Image
              key={step.n}
              src={STEP_IMAGES[index % STEP_IMAGES.length]}
              alt=""
              fill
              sizes="230px"
              className={`object-cover grayscale transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <ol>
        {dict.process.steps.map((step, index) => (
          <Reveal as="li" key={step.n} delay={index * 90}>
            <div
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              // Le visuel de la ligne joue deja le role de pointeur :
              // superposer les deux donne deux objets qui suivent la souris.
              data-cursor="hidden"
              className="group grid gap-5 border-t border-line py-9 transition-colors duration-500 hover:border-paper/30 md:grid-cols-12 md:gap-8 md:py-11"
            >
              <div className="flex items-baseline gap-5 md:col-span-5 md:gap-7">
                <span className="nums font-serif text-[clamp(2rem,3vw,2.75rem)] leading-none tracking-tightest text-paper/25 transition-colors duration-500 group-hover:text-accent">
                  {step.n}
                </span>
                <h3 className="t-h3 md:text-[clamp(1.5rem,2.2vw,1.875rem)]">{step.title}</h3>
              </div>

              <div className="md:col-span-7">
                {/* Vignette de repli : au doigt, il n'y a pas de survol. */}
                <div className="relative mb-5 aspect-[3/2] w-full overflow-hidden bg-paper/5 md:hidden">
                  <Image
                    src={STEP_IMAGES[index % STEP_IMAGES.length]}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover grayscale"
                  />
                </div>

                <p className="t-prose max-w-[58ch] text-paper/65">{step.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="t-meta rounded-full border border-line px-[10px] py-[6px] text-paper/75 transition-colors duration-300 group-hover:border-paper/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <li className="border-t border-line" aria-hidden />
      </ol>
    </section>
  );
}
