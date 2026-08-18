"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";

type VideoPanelProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Video d'ambiance, purement decorative.
 *
 * - muted + playsInline + autoPlay : les trois conditions pour que la lecture
 *   automatique soit autorisee sur mobile comme sur desktop.
 * - prefers-reduced-motion : la premiere image reste affichee, sans lecture.
 *
 * L'element est visible en permanence : aucune opacite pilotee par JavaScript.
 * Une version precedente n'affichait la video qu'apres un evenement de
 * chargement, ce qui la laissait invisible des que l'evenement etait manque
 * (video en cache, onglet en arriere-plan qui gele les transitions CSS...).
 * Le fond sombre du conteneur joue le role de vignette le temps que la
 * premiere image arrive.
 *
 * La SOURCE, elle, n'est attachee qu'a l'approche de l'ecran. Avec un `src`
 * pose des le rendu et `preload="auto"`, le fichier — un megaoctet ici — part
 * en telechargement pendant que le hero se peint encore, sur la meme connexion
 * et souvent avant l'image qui decide du LCP. La video est en deuxieme
 * section : rien ne justifie qu'elle parte en premier.
 *
 * `useInView` est reutilise tel quel pour ses filets : si l'observateur ne
 * repond pas (onglet en arriere-plan, transition de page), une mesure de
 * position differee prend le relais. Une detection ratee ici ne coute qu'une
 * video qui demarre tard, jamais un panneau vide — le fond sombre tient le
 * cadre dans tous les cas.
 */
export default function VideoPanel({ src, poster, className = "" }: VideoPanelProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // Marge large : on veut le fichier pret AVANT que la section arrive, pas au
  // moment ou elle arrive. Le gain vise est l'ordre de chargement, pas
  // l'economie d'un fichier que le visiteur va de toute facon voir.
  const near = useInView(ref, { threshold: 0, rootMargin: "400px 0px 400px 0px" });

  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const tryPlay = () => {
      video.play().catch(() => {
        /* lecture refusee par le navigateur : l'image fixe reste affichee */
      });
    };

    // La video peut deja etre prete quand l'effet s'execute (cache) :
    // on tente tout de suite, et on retente sur canplay.
    if (video.readyState >= 2) tryPlay();
    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, [near]);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      autoPlay
      preload={near ? "auto" : "none"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
