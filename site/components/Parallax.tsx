"use client";

import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  /** Amplitude du decalage, en % de la hauteur de l'element. */
  amount?: number;
  className?: string;
};

/**
 * Parallaxe interne : le media est surdimensionne et se decale doucement dans
 * son cadre pendant le scroll. Purement transform, donc composee par le GPU,
 * et pilotee par rAF pour ne jamais lire la geometrie pendant un evenement de
 * scroll (ce qui forcerait un reflow a chaque frame).
 */
export default function Parallax({
  children,
  amount = 12,
  className = "",
}: ParallaxProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      // -1 quand l'element sort par le haut, +1 quand il entre par le bas.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const clamped = Math.max(-1, Math.min(1, progress));
      inner.style.transform = `translate3d(0, ${clamped * amount}%, 0)`;
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
  }, [amount]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      {/* Surdimensionne pour que le decalage ne decouvre jamais de vide. */}
      <div
        ref={innerRef}
        className="absolute inset-x-0 -inset-y-[15%] will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
