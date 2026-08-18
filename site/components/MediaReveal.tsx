"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";

/**
 * Devoilement d'un media par masque.
 *
 * Le cadre ne bouge pas : un `clip-path` s'ouvre du bas vers le haut pendant
 * que le contenu, legerement sur-dimensionne, revient a l'echelle 1. Les deux
 * mouvements en sens inverse donnent la profondeur.
 *
 * La detection passe par `useInView` : un clip-path bloque a `inset(100%)`
 * rend le media totalement invisible, c'est le composant du site ou une
 * detection ratee coute le plus cher.
 */
export default function MediaReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shown = useInView(ref, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

  return (
    <div
      ref={ref}
      data-reveal-media=""
      style={{
        transitionDelay: `${delay}ms`,
        clipPath: shown ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
      }}
      className={`transition-[clip-path] duration-[1100ms] ease-expo ${className}`}
    >
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`h-full w-full transition-transform duration-[1400ms] ease-expo ${
          shown ? "scale-100" : "scale-[1.12]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
