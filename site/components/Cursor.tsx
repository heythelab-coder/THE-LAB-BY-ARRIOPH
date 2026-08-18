"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "view" | "hidden";

/**
 * Curseur personnalise.
 *
 * Le point suit le pointeur exactement, l'anneau le rattrape avec du retard :
 * c'est ce decalage qui donne l'impression de masse. Un anneau colle au
 * pointeur ne se remarque meme pas.
 *
 * L'etat est pilote par un attribut `data-cursor` pose sur les elements
 * survoles, et non par une liste de selecteurs codee ici — chaque composant
 * declare lui-meme comment le curseur doit reagir, sans que ce fichier ait a
 * connaitre le reste du site.
 *
 * `mix-blend-mode: difference` : le curseur reste visible sur le noir de la
 * page comme sur les visuels clairs, sans avoir a detecter ce qu'il survole.
 *
 * Ses couleurs sont volontairement ecrites en BLANC ET NOIR EN DUR, jamais avec
 * les jetons de theme. Sous ce mode de fusion, la couleur n'est pas une couleur
 * mais une operation : le resultat est |fond - source|. Du blanc donne du noir
 * sur fond clair et du blanc sur fond sombre, ce qui est exactement l'effet
 * recherche. Avec un jeton de theme, l'anneau devenait presque noir en theme
 * clair, donc |250 - 12| = 238 : blanc sur blanc, invisible.
 *
 * Jamais rendu sur ecran tactile : il n'y a pas de pointeur a doubler, et le
 * curseur natif reste seul maitre a la souris si l'utilisateur a demande moins
 * d'animations.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    // Le curseur natif n'est masque qu'une fois le remplacant reellement monte :
    // si ce composant ne s'affiche pas, on ne laisse pas l'utilisateur sans
    // aucun pointeur.
    document.documentElement.dataset.cursor = "custom";

    return () => {
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (el) {
        setState((el.getAttribute("data-cursor") as CursorState) || "default");
        setLabel(el.getAttribute("data-cursor-label") || "");
        return;
      }
      // Tout ce qui est cliquable elargit l'anneau, sans avoir a annoter
      // chaque lien du site un par un.
      const interactive = (event.target as HTMLElement | null)?.closest?.(
        "a, button, input, textarea, select, [role='gridcell'], [role='radio']",
      );
      setState(interactive ? "link" : "default");
      setLabel("");
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    state === "view" ? "h-[88px] w-[88px]" : state === "link" ? "h-[56px] w-[56px]" : "h-[34px] w-[34px]";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/75
                    transition-[width,height,background-color,opacity] duration-300 ease-expo ${ringSize} ${
                      state === "hidden" ? "opacity-0" : "opacity-100"
                    } ${state === "view" ? "border-transparent bg-white" : ""}`}
      >
        {state === "view" && label && (
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-black">
            {label}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-white transition-opacity duration-300 ${
          state === "default" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
