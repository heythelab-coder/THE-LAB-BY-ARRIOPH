"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Apparition d'un bloc a l'entree dans l'ecran.
 *
 * La detection passe par `useInView`, qui garantit que le contenu finit
 * toujours par s'afficher — une animation ne doit jamais pouvoir retenir du
 * contenu en otage.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const visible = useInView(ref);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-expo ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
