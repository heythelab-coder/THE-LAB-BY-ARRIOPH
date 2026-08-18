"use client";

import { useEffect, useRef } from "react";

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
 */
export default function VideoPanel({ src, poster, className = "" }: VideoPanelProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

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
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
