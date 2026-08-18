"use client";

import { useEffect, useRef } from "react";

/**
 * Attraction magnetique.
 *
 * L'element se decale vers le pointeur quand celui-ci approche, et revient a sa
 * place des qu'il s'eloigne. Le deplacement est plafonne a une fraction de la
 * distance : au-dela, le bouton se decolle de sa zone cliquable et devient plus
 * difficile a atteindre — l'effet se retourne contre l'utilisabilite.
 *
 * Ne s'active qu'a la souris. Au doigt il n'y a pas de survol, et sous
 * prefers-reduced-motion l'element reste immobile.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  /** Fraction de la distance curseur-centre reportee sur l'element. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };

    const onLeave = () => {
      node.style.transform = "translate3d(0, 0, 0)";
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-expo will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
