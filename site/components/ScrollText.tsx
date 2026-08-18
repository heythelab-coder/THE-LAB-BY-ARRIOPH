"use client";

import { useEffect, useRef, type ElementType } from "react";

type ScrollTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacite des caracteres pas encore atteints. */
  from?: number;
  /** Nombre de caracteres qui restent en degrade entre eteint et allume. */
  feather?: number;
};

/**
 * Remplissage du texte pilote par le scroll : les caracteres passent d'un gris
 * eteint au blanc plein au fur et a mesure que le bloc traverse l'ecran.
 *
 * Decoupage au CARACTERE et non au mot : c'est ce qui permet au front de
 * progression de tomber au milieu d'un mot, la signature visuelle de l'effet.
 * Les spans restent en `display: inline`, donc la coupure des lignes se fait
 * normalement aux espaces.
 *
 * Seule l'opacite est animee — pas de layout, pas de peinture de geometrie —
 * et l'ecriture des styles passe par requestAnimationFrame pour ne jamais
 * lire la geometrie pendant l'evenement de scroll.
 */
export default function ScrollText({
  text,
  as: Tag = "span",
  className = "",
  from = 0.18,
  feather = 6,
}: ScrollTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const node = ref.current;
    const chars = charsRef.current;
    if (!node || chars.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      chars.forEach((c) => c && (c.style.opacity = "1"));
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      // Le remplissage demarre quand le bloc entre dans le tiers bas de
      // l'ecran et se termine avant qu'il ne sorte par le haut.
      const start = viewport * 0.85;
      const end = viewport * 0.3;
      const progress = (start - rect.top) / Math.max(1, start - end + rect.height * 0.4);
      const clamped = Math.max(0, Math.min(1, progress));

      const head = clamped * (chars.length + feather);

      for (let i = 0; i < chars.length; i += 1) {
        const char = chars[i];
        if (!char) continue;
        const local = Math.max(0, Math.min(1, (head - i) / feather));
        char.style.opacity = String(from + (1 - from) * local);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();

    // Filet : le calcul est synchrone (mesure + ecriture de style), donc le
    // rejouer une fois suffit a rattraper un montage ou la geometrie n'etait
    // pas encore stable — polices en cours de chargement, images sans
    // dimensions, transition de page en cours.
    const failsafe = window.setTimeout(update, 1200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [from, feather]);

  charsRef.current = [];

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el: HTMLSpanElement | null) => {
            if (el) charsRef.current[i] = el;
          }}
          style={{ opacity: from }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
