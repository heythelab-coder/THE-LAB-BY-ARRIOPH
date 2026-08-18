"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Defilement interpole.
 *
 * C'est le changement qui se sent le plus sans se voir : la molette ne saute
 * plus par crans, la page rattrape la position visee sur quelques frames. Tout
 * ce qui est deja pilote par le scroll (parallaxe, remplissage de la citation,
 * progression de la nav) en herite automatiquement — Lenis fait defiler la page
 * pour de vrai et emet les evenements de scroll natifs.
 *
 * Desactive au doigt : sur mobile, le defilement natif est deja lisse et
 * l'intercepter donne une inertie qui ne correspond a rien de systeme.
 * Desactive aussi sous prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    const lenis = new Lenis({
      // 0.1 : assez pour adoucir, pas assez pour donner l'impression
      // que la page glisse toute seule apres l'arret de la molette.
      lerp: 0.1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Les ancres internes doivent passer par Lenis, sinon le saut natif
    // court-circuite l'interpolation et la page tressaute.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -110 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
