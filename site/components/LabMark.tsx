"use client";

import { useId } from "react";

/**
 * Monogramme 4Lab : quatre disques en losange.
 *
 * Redessine en SVG plutot que servi en PNG : le fichier source fait 3500px de
 * cote pour un affichage entre 24 et 32px, il serait mou au rendu et couterait
 * une requete reseau sur chaque page. Ici c'est net a n'importe quelle taille.
 *
 * Geometrie relevee sur `LOGO/Logo 4LAB.png` : disques de 352px de diametre,
 * centres a 372px horizontalement et 352px verticalement du centre. Ramene a
 * un viewBox de 120 avec deux unites de marge sur les cotes.
 *
 * Le degrade reprend les couleurs exactes du fichier, mais passe par des
 * variables CSS : tel quel, un degrade bleu tres clair vers un gris pale
 * disparaitrait sur le fond du theme clair. Les variables portent la version
 * d'origine en sombre et une version assombrie en clair.
 *
 * `useId` plutot qu'un identifiant fixe : le composant apparait plusieurs fois
 * par page (nav, menu mobile, ouverture, pied de page) et deux elements ne
 * peuvent pas partager le meme `id` — c'est invalide, et les outils
 * d'accessibilite comme les validateurs le signalent. React garantit ici le
 * meme identifiant au rendu serveur et a l'hydratation.
 */

const OFFSET_X = 39.4; // ecart horizontal au centre
const OFFSET_Y = 37.3; // ecart vertical au centre
const DOT = 18.6; // rayon d'un disque
const C = 60; // centre du viewBox

const DOTS = [
  { cx: C, cy: C - OFFSET_Y },
  { cx: C - OFFSET_X, cy: C },
  { cx: C + OFFSET_X, cy: C },
  { cx: C, cy: C + OFFSET_Y },
];

export default function LabMark({ className = "" }: { className?: string }) {
  const gradientId = `lab-mark-${useId()}`;

  return (
    <svg viewBox="0 0 120 120" aria-hidden focusable="false" className={className}>
      <defs>
        {/* `objectBoundingBox` par defaut : le degrade se calcule sur la boite
            de CHAQUE disque, comme dans le fichier d'origine, et non une seule
            fois sur l'ensemble du losange. */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--mark-from))" />
          <stop offset="100%" stopColor="rgb(var(--mark-to))" />
        </linearGradient>
      </defs>

      {DOTS.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={DOT} fill={`url(#${gradientId})`} />
      ))}
    </svg>
  );
}
