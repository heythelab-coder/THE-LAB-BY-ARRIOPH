"use client";

import { useCallback, useEffect, useState } from "react";

type Chapter = { id: string; label: string };

/**
 * Rail de chapitres.
 *
 * Une page longue ne dit jamais ou l'on est ni ce qui reste. On defile sans
 * savoir si l'on est au tiers ou a la fin, et rien n'invite a aller voir plus
 * loin — juste a continuer machinalement.
 *
 * Le rail donne une carte du parcours : ou je suis, combien d'etapes, et
 * lesquelles. Il transforme un defilement en progression, et rend chaque
 * chapitre atteignable directement. C'est la difference entre faire defiler et
 * explorer.
 *
 * Il se construit a partir des elements portant `data-chapter` : aucune liste
 * codee en dur ici, donc ajouter ou retirer une section du site suffit a mettre
 * le rail a jour.
 */
export default function ChapterRail() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const found = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map(
      (el, index) => {
        // Un identifiant est necessaire pour l'ancrage ; on en fabrique un si
        // la section n'en porte pas deja.
        if (!el.id) el.id = `chapter-${index}`;
        return { id: el.id, label: el.dataset.chapter || "" };
      },
    );
    setChapters(found);
  }, []);

  useEffect(() => {
    if (chapters.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      // Le chapitre actif est le dernier dont le haut a franchi le tiers
      // superieur de l'ecran : le meme repere que celui ou l'oeil se pose.
      const line = window.innerHeight * 0.35;
      let current = 0;

      chapters.forEach((chapter, index) => {
        const el = document.getElementById(chapter.id);
        if (el && el.getBoundingClientRect().top <= line) current = index;
      });

      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Le clic sur une ancre est repris par le defilement interpole : on passe
    // par le meme chemin pour que le saut reste dans la meme physique.
    const anchor = document.createElement("a");
    anchor.href = `#${id}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }, []);

  if (chapters.length < 2) return null;

  return (
    <nav
      aria-label="Chapitres"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {chapters.map((chapter, index) => {
          const isActive = index === active;

          return (
            <li key={chapter.id} className="pointer-events-auto">
              <button
                type="button"
                onClick={() => jump(chapter.id)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-3"
              >
                {/* Le libelle reste replie et se deploie a l'approche : le rail
                    ne doit pas concurrencer le contenu en permanence. */}
                <span
                  className={`overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.1em] transition-all duration-500 ease-expo ${
                    isActive ? "text-paper/70" : "text-paper/40"
                  } max-w-0 opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100`}
                >
                  {chapter.label}
                </span>

                <span
                  className={`block h-px transition-all duration-500 ease-expo ${
                    isActive ? "w-8 bg-paper" : "w-4 bg-paper/30 group-hover:w-6 group-hover:bg-paper/60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
