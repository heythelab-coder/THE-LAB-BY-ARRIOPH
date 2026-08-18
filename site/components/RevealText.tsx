"use client";

import { useRef, type ElementType } from "react";
import { useInView } from "@/lib/useInView";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Decalage entre chaque mot, en ms. A baisser sur les textes longs. */
  stagger?: number;
  delay?: number;
};

/**
 * Revelation par masque : chaque mot monte depuis sous une ligne invisible.
 * C'est le mouvement signature des sites de studio haut de gamme. Il coute une
 * transform par mot et se lit comme du soin, la ou un fondu global se lit
 * comme un template.
 *
 * Le decoupage se fait au mot, pas a la ligne : aucune mesure au montage, et
 * l'effet survit a n'importe quel retour a la ligne. Le texte complet reste
 * expose via aria-label, les fragments sont masques aux lecteurs d'ecran.
 *
 * Deux elements par mot, pas trois : le masque et le mobile. L'espace qui
 * separe deux mots est un simple noeud de texte pose entre les masques — il
 * n'a jamais eu besoin d'un element pour exister, il avait seulement besoin de
 * rester HORS du masque, ou un `inline-flex` l'aurait supprime et aurait colle
 * les mots entre eux.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 45,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Les mots sont masques par translation : une detection ratee les laisserait
  // hors du cadre, donc invisibles. `useInView` garantit qu'ils remontent.
  const visible = useInView(ref, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  const lines = text.split("\n");
  let wordIndex = -1;

  return (
    <Tag ref={ref} aria-label={text} data-reveal-text="" className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, i, words) => {
            wordIndex += 1;
            return [
              <span
                key={`${lineIndex}-${i}`}
                aria-hidden
                className="inline-flex overflow-hidden align-bottom"
              >
                <span
                  style={{ transitionDelay: `${delay + wordIndex * stagger}ms` }}
                  className={`inline-block transition-transform duration-[900ms] ease-expo ${
                    visible ? "translate-y-0" : "translate-y-[110%]"
                  }`}
                >
                  {word}
                </span>
              </span>,
              i < words.length - 1 ? " " : null,
            ];
          })}
        </span>
      ))}
    </Tag>
  );
}
