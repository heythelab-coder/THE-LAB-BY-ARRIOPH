"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { PROJECTS, projectCopy } from "@/content/projects";
import type { Locale } from "@/content/dictionary";

/**
 * Index des projets.
 *
 * La page /work reprenait exactement la grille de l'accueil : aucune raison
 * d'y aller. Elle a maintenant sa propre forme — un index en pleine largeur,
 * ou l'accueil garde la grille de vignettes.
 *
 * Un index se parcourt bien plus vite qu'une grille : le nom, le client, la
 * discipline et l'annee sont alignes en colonnes, donc comparables d'un coup
 * d'oeil. Le visuel n'est pas absent pour autant, il apparait au survol et suit
 * le curseur — l'image devient une recompense a l'exploration au lieu d'occuper
 * la moitie de l'ecran par defaut.
 *
 * Le filtre par discipline se construit a partir des projets eux-memes : aucune
 * liste a maintenir, il suivra l'ajout de nouveaux projets.
 */
export default function WorkIndex({
  locale,
  allLabel,
  viewLabel,
}: {
  locale: Locale;
  allLabel: string;
  viewLabel: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const categories = useMemo(() => {
    const all = PROJECTS.map((p) => projectCopy(p, locale).category);
    return Array.from(new Set(all));
  }, [locale]);

  const visible = useMemo(
    () => PROJECTS.filter((p) => !filter || projectCopy(p, locale).category === filter),
    [filter, locale],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const follower = followerRef.current;
    if (!section || !follower) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const tick = () => {
      // Le visuel rattrape le curseur au lieu de lui coller : ce retard est
      // ce qui donne du poids au mouvement.
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
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
    <div ref={sectionRef} className="relative">
      {/* Visuel flottant, hors flux et non cliquable. */}
      <div
        ref={followerRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <div
          className={`relative h-[320px] w-[250px] overflow-hidden transition-[opacity,transform] duration-700 ease-expo ${
            active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {PROJECTS.map((project, index) => (
            <Image
              key={project.slug}
              src={project.image}
              alt=""
              fill
              sizes="250px"
              className={`object-cover transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <Reveal className="flex flex-wrap items-center gap-2 border-t border-line pt-6">
        <FilterChip active={filter === null} onClick={() => setFilter(null)}>
          {allLabel}
          <span className="nums ml-2 text-paper/40">{PROJECTS.length}</span>
        </FilterChip>

        {categories.map((category) => {
          const count = PROJECTS.filter((p) => projectCopy(p, locale).category === category).length;
          return (
            <FilterChip
              key={category}
              active={filter === category}
              onClick={() => setFilter(filter === category ? null : category)}
            >
              {category}
              <span className="nums ml-2 text-paper/40">{count}</span>
            </FilterChip>
          );
        })}
      </Reveal>

      <ul className="mt-10 border-t border-line">
        {visible.map((project) => {
          const copy = projectCopy(project, locale);
          const index = PROJECTS.indexOf(project);

          return (
            <li key={project.slug} className="border-b border-line">
              <Link
                href={`/${locale}/work/${project.slug}`}
                data-cursor="hidden"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-12 items-center gap-4 py-7 md:gap-8 md:py-9"
              >
                <span className="eyebrow nums col-span-2 text-paper/30 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="col-span-10 font-sans text-[clamp(1.5rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] md:col-span-5">
                  <span className="link-sweep">{copy.title}</span>
                </span>

                {/* Colonnes de comparaison : c'est ce qu'un index apporte
                    qu'une grille de vignettes ne donne pas. */}
                <span className="col-span-6 col-start-3 t-meta text-paper/55 md:col-span-3 md:col-start-auto">
                  {project.client}
                </span>
                <span className="col-span-4 t-meta text-paper/55 md:col-span-2">
                  {copy.category}
                </span>
                <span className="hidden t-meta nums justify-self-end text-paper/40 md:col-span-1 md:block">
                  {project.year || "·"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="sr-only">{viewLabel}</p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`t-meta rounded-full border px-4 py-2 transition-colors duration-300 ${
        active
          ? "border-paper bg-paper text-ink"
          : "border-line text-paper/70 hover:border-paper/40 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}
