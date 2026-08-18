"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";

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
 * Deux choix pour que ce decoupage ne se paie pas au prix fort :
 *
 * 1. Les espaces ne recoivent pas d'element. Animer l'opacite d'un blanc n'a
 *    aucun effet visible, et sur une citation un caractere sur six est un
 *    espace. Ils restent des noeuds de texte, donc la coupure des lignes est
 *    inchangee.
 *
 * 2. Le scroll n'ecrit qu'UNE propriete, sur le conteneur. Chaque caractere
 *    porte son rang en `--i` et calcule lui-meme son opacite en CSS. La
 *    version precedente ecrivait un style inline par caractere a chaque frame,
 *    soit plus de cent cinquante ecritures repetees soixante fois par seconde
 *    pour une seule citation ; c'est desormais une.
 *
 * Si un navigateur ne sait pas resoudre le calcul, `opacity` redevient 1 et le
 * texte s'affiche en plein — l'echec laisse le contenu lisible.
 */
export default function ScrollText({
  text,
  as: Tag = "span",
  className = "",
  from = 0.18,
  feather = 6,
}: ScrollTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Le rang court sur TOUS les caracteres, espaces compris : le front doit
  // avancer a vitesse constante dans la phrase, pas accelerer aux espaces.
  const length = text.length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const setHead = (value: number) => node.style.setProperty("--head", String(value));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setHead(length + feather);
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

      setHead(clamped * (length + feather));
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
  }, [from, feather, length]);

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`scroll-fill ${className}`}
      style={{ "--from": from, "--feather": feather } as CSSProperties}
    >
      {[...text].map((char, i) =>
        char === " " ? (
          " "
        ) : (
          <span key={i} aria-hidden style={{ "--i": i } as CSSProperties}>
            {char}
          </span>
        ),
      )}
    </Tag>
  );
}
