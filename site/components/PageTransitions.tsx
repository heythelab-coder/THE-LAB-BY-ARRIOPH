"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Transitions entre pages.
 *
 * Le drapeau `experimental.viewTransition` de Next active le composant
 * `<ViewTransition>` de React, pas les transitions automatiques du routeur :
 * une navigation par `<Link>` n'appelle jamais startViewTransition. Verifie en
 * instrumentant l'API — zero appel sur un clic de nav. D'ou cette interception
 * explicite.
 *
 * Le point delicat : `router.push` ne rend pas de promesse qui se resout quand
 * le DOM est a jour. On passe donc a startViewTransition une promesse que l'on
 * resout nous-memes au changement de `pathname` — le navigateur prend son
 * cliche « avant », attend ce signal, puis prend le cliche « apres ».
 *
 * Sans support de l'API, le clic n'est pas intercepte et la navigation se fait
 * normalement : amelioration progressive, rien ne casse.
 */
export default function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  // Le changement de pathname signale que la nouvelle page est rendue.
  useEffect(() => {
    resolveRef.current?.();
    resolveRef.current = null;
  }, [pathname]);

  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      // On laisse passer tout ce qui n'est pas un clic gauche simple :
      // ouverture dans un onglet, menu contextuel, telechargement.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      // Liens externes, ancres et protocoles speciaux : hors de notre ressort.
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      // stopPropagation est indispensable : sans lui, le gestionnaire de
      // <Link> s'execute aussi et declenche une seconde navigation, qui
      // court-circuite la transition. C'est aussi pourquoi on ecoute en phase
      // de CAPTURE — en phase de bulle, <Link> a deja navigue.
      event.preventDefault();
      event.stopPropagation();

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolveRef.current = resolve;
            router.push(url.pathname + url.search);
          }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
