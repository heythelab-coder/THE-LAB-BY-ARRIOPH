"use client";

import { useEffect, useRef } from "react";

/**
 * Nappe lumineuse d'ambiance.
 *
 * Passe le hero, le site etait un fond uni du haut en bas. On avance sans que
 * rien autour ne change : c'est ce qui fait vivre une page longue comme une
 * pile de blocs plutot qu'un lieu qu'on traverse.
 *
 * Trois masses colorees derivent lentement, chacune a sa propre vitesse, et
 * l'ensemble change de teinte au fil de la descente. Les couleurs viennent du
 * bleu de laboratoire de la marque.
 *
 * Un point de mise en oeuvre qui a son importance : cet element est en
 * `-z-10`, donc il n'est visible QUE parce que le body a un fond transparent
 * (la couleur est portee par <html>). Un fond opaque sur le body le masquerait
 * entierement — c'est exactement ce qui s'etait produit.
 *
 * Cout : un element fixe, trois transforms composees par le GPU, et une
 * variable CSS mise a jour au scroll. Aucun recalcul de mise en page.
 */

/** Teintes traversees, du haut de page vers le bas. */
const HUES = [228, 202, 254, 214];

export default function Ambient() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      // Interpolation entre les teintes : la position dans le tableau donne le
      // segment courant, la fraction restante donne le melange.
      const scaled = progress * (HUES.length - 1);
      const i = Math.min(HUES.length - 2, Math.floor(scaled));
      const hue = Math.round(HUES[i] + (HUES[i + 1] - HUES[i]) * (scaled - i));

      node.style.setProperty("--ambient-hue", String(hue));
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
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      // L'opacite est plus basse en theme clair : sur fond blanc, la meme
      // intensite vire au delave et salit la page au lieu de l'habiller.
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-[0.42] [html[data-theme=light]_&]:opacity-[0.16]"
      style={{ "--ambient-hue": "228" } as React.CSSProperties}
    >
      <span className="ambient-blob ambient-a" />
      <span className="ambient-blob ambient-b" />
      <span className="ambient-blob ambient-c" />
    </div>
  );
}
