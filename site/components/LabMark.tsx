/**
 * Monogramme THE LAB : six disques en hexagone.
 *
 * Redessine en SVG plutot que decoupe dans le JPG d'origine : fond transparent,
 * net a n'importe quelle taille, aucune requete reseau, et la couleur suit
 * `currentColor` — donc l'icone s'adapte au contexte sans second fichier.
 *
 * Proportions relevees sur le fichier source : rayon des disques a 0,43 fois
 * le rayon de l'anneau.
 */

const R = 46; // rayon de l'anneau
const DOT = 19; // rayon d'un disque
const C = 60; // centre du viewBox

// Six positions a 60 degres d'ecart, la premiere a droite.
const DOTS = Array.from({ length: 6 }, (_, i) => {
  const angle = (Math.PI / 3) * i;
  return { cx: C + R * Math.cos(angle), cy: C + R * Math.sin(angle) };
});

export default function LabMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden focusable="false" className={className}>
      {DOTS.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={DOT} />
      ))}
    </svg>
  );
}
