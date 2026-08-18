"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const THEME_KEY = "thelab:theme";

/**
 * Bascule clair / sombre.
 *
 * Le theme vit dans un attribut `data-theme` sur <html> : tout le site suit via
 * les variables CSS, sans qu'aucun composant n'ait a connaitre le theme courant.
 *
 * L'etat initial est pose par un script inline AVANT le premier rendu (voir
 * `ThemeScript`), pas ici. Un composant React s'execute apres la premiere
 * peinture : un visiteur en clair verrait un ecran noir le temps de
 * l'hydratation.
 *
 * Ce composant se contente donc de LIRE l'etat deja en place au montage, puis
 * de le modifier a la demande.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* navigation privee : le choix ne survit pas a la session, tant pis */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // Le libelle annonce l'ACTION, pas l'etat : « passer en clair » est
      // sans ambiguite la ou « clair » laisse deviner s'il s'agit du mode
      // courant ou de celui qu'on obtiendra.
      aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
      aria-pressed={theme === "light"}
      className={`relative h-[22px] w-[38px] shrink-0 rounded-full border border-paper/20 transition-colors duration-500 hover:border-paper/40 ${className}`}
    >
      <span
        aria-hidden
        // `ready` evite que la pastille glisse au chargement : avant lecture de
        // l'etat reel, la transition est neutralisee.
        className={`absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-paper ${
          ready ? "transition-transform duration-500 ease-expo" : ""
        }`}
        style={{ left: 3, transform: `translateY(-50%) translateX(${theme === "light" ? 16 : 0}px)` }}
      />
    </button>
  );
}

/**
 * Pose le theme avant la premiere peinture.
 *
 * Injecte en <head> et execute de facon synchrone : sans lui, un visiteur ayant
 * choisi le clair recoit une page noire pendant quelques dizaines de
 * millisecondes avant que React ne corrige — le fameux flash de theme.
 *
 * Ordre de priorite : choix explicite memorise, sinon preference systeme,
 * sinon sombre (le theme d'origine du site).
 */
export function ThemeScript() {
  const script = [
    "(function(){try{",
    `var s=localStorage.getItem('${THEME_KEY}');`,
    "var m=window.matchMedia('(prefers-color-scheme: light)').matches;",
    "document.documentElement.setAttribute('data-theme',s||(m?'light':'dark'));",
    "}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();",
  ].join("");

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
