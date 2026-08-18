"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Detection d'entree dans l'ecran, concue pour ne jamais laisser de contenu
 * invisible.
 *
 * Toutes les animations d'apparition du site partent d'un etat masque et
 * comptent sur un callback pour devenir visibles. Si ce callback n'arrive pas,
 * le contenu ne revient jamais — et il n'arrive PAS dans plusieurs situations
 * reelles :
 *
 * - onglet en arriere-plan au chargement : IntersectionObserver n'emet rien
 *   tant que la page n'est pas peinte (constate en test, y compris pour un
 *   observateur neuf sur un element parfaitement dans le viewport) ;
 * - pendant une transition de page, le rendu est gele le temps des cliches et
 *   la livraison initiale peut etre perdue ;
 * - navigateur sans IntersectionObserver.
 *
 * Trois filets, tous fondes sur la MEME question — l'element est-il dans
 * l'ecran ? Un filet qui afficherait apres un simple delai revelerait aussi
 * tout ce qui est encore sous la ligne de flottaison, et supprimerait
 * l'animation au scroll de la page entiere.
 *
 * 1. Mesure synchrone au montage.
 * 2. L'observateur, pour le cas normal.
 * 3. Un ecouteur de scroll passif qui refait la mesure, plus une re-mesure
 *    differee : de quoi rattraper une livraison perdue sans jamais reveler
 *    un element hors ecran.
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { threshold = 0.12, rootMargin = "0px 0px -6% 0px" } = {},
) {
  const [inView, setInView] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || done.current) return;

    let observer: IntersectionObserver | null = null;
    const timers: number[] = [];

    const cleanup = () => {
      observer?.disconnect();
      timers.forEach(window.clearTimeout);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    const reveal = () => {
      if (done.current) return;
      done.current = true;
      setInView(true);
      cleanup();
    };

    /** Filet commun : on ne revele que si l'element est reellement visible. */
    function check() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 0;
      if (rect.top < viewport * 0.94 && rect.bottom > 0) reveal();
    }

    // 1. Deja visible au montage : inutile d'attendre quoi que ce soit.
    check();
    if (done.current) return;

    // 2. Cas normal.
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal();
        },
        { threshold, rootMargin },
      );
      observer.observe(node);
    }

    // 3. Filets. Plusieurs re-mesures echelonnees plutot qu'une seule : au
    //    montage, la geometrie n'est pas forcement stable — transition de page
    //    en cours (le rendu est gele pendant les cliches, la livraison initiale
    //    de l'observateur peut etre perdue), polices en cours de chargement,
    //    images sans dimensions. La derniere passe est volontairement au-dela
    //    de la duree d'une transition.
    [300, 900, 1800].forEach((ms) => timers.push(window.setTimeout(check, ms)));

    //    Et le scroll comme declencheur de secours permanent.
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return cleanup;
  }, [ref, threshold, rootMargin]);

  return inView;
}
