import type { Locale } from "./dictionary";

/**
 * Source unique des projets.
 *
 * Les projets vivaient jusqu'ici en double dans `dictionary.ts` (une copie par
 * langue). Avec des pages de detail qui ajoutent slug, galerie, livrables et
 * credits, la duplication garantissait la desynchronisation : une image changee
 * d'un cote, oubliee de l'autre.
 *
 * Ici, tout ce qui est neutre (slug, visuel, annee, client) est declare une
 * fois ; seul le texte est localise.
 */

export type ProjectCopy = {
  title: string;
  category: string;
  /** Une phrase, affichee sous la carte dans la grille. */
  desc: string;
  /** Deux a trois phrases, en tete de la page de detail. */
  intro: string;
  deliverables: string[];
};

export type Project = {
  slug: string;
  image: string;
  /** Vide tant que l'annee n'est pas confirmee : l'affichage s'adapte. */
  year: string;
  client: string;
  /** Visuels supplementaires de la page de detail. Vide pour l'instant. */
  gallery: string[];
  fr: ProjectCopy;
  en: ProjectCopy;
};

export const PROJECTS: Project[] = [
  {
    slug: "red-bull-morocco",
    image: "/work/red-bull-morocco.jpg",
    year: "",
    client: "Red Bull Morocco",
    gallery: [],
    fr: {
      title: "Red Bull Morocco",
      category: "Contenu de marque",
      desc: "Couverture photo et contenu social d'un événement communautaire.",
      intro:
        "Un événement communautaire à couvrir en direct, avec des contenus attendus dans les heures qui suivent. Notre part : la captation et le montage, pensés pour le format vertical dès la prise de vue. L'objectif n'était pas de documenter l'événement mais d'en restituer l'ambiance, en cadrant au ras du public plutôt qu'en surplomb.",
      deliverables: ["Photo d'événement", "Contenu social", "Montage court", "Livraison 48 h"],
    },
    en: {
      title: "Red Bull Morocco",
      category: "Brand content",
      desc: "Photo coverage and social content for a community event.",
      intro:
        "A community event to cover live, with content expected within hours. Our part: the shoot and the edit, framed for vertical from the first frame. The goal was not to document the event but to carry its atmosphere, shooting level with the crowd rather than above it.",
      deliverables: ["Event photography", "Social content", "Short edits", "48h delivery"],
    },
  },
  {
    slug: "wac-official-brand",
    image: "/work/wac-official.jpg",
    year: "",
    client: "Wydad AC",
    gallery: [],
    fr: {
      title: "WAC Official Brand",
      category: "Campagne",
      desc: "Direction artistique et production photo pour la ligne officielle du club.",
      intro:
        "Une ligne officielle à présenter sans passer par des mannequins : le club voulait ses propres supporters devant l'objectif. Notre part : la direction artistique, le casting et la production photo. Studio et lumière ont été calés pour que le vêtement reste lisible tout en laissant la personnalité du modèle occuper le cadre.",
      deliverables: ["Direction artistique", "Casting", "Production photo", "Retouche"],
    },
    en: {
      title: "WAC Official Brand",
      category: "Campaign",
      desc: "Art direction and photo production for the club's official line.",
      intro:
        "An official line to present without models: the club wanted its own supporters in front of the lens. Our part: art direction, casting and photo production. Studio and lighting were set so the garment stays legible while the subject's presence still owns the frame.",
      deliverables: ["Art direction", "Casting", "Photo production", "Retouching"],
    },
  },
  {
    slug: "le-temple",
    image: "/work/le-temple.jpg",
    year: "",
    client: "Le Temple",
    gallery: [],
    fr: {
      title: "Le Temple",
      category: "Film de marque",
      desc: "Film de mode et mise en scène de l'écran qui le diffuse.",
      intro:
        "Un film de mode fait pour un écran grand format installé sur place, dans un lieu où le visiteur passe plutôt qu'il ne s'assoit. Notre part : la direction artistique, la réalisation et le montage, conçus avec le support. Cadrage, rythme du montage et échelle typographique répondent à la distance de lecture réelle.",
      deliverables: ["Direction artistique", "Réalisation", "Montage", "Installation"],
    },
    en: {
      title: "Le Temple",
      category: "Brand film",
      desc: "Fashion film and staging of the screen that shows it.",
      intro:
        "A fashion film made for a large screen installed on site, in a space where people walk past rather than sit down. Our part: art direction, filming and edit, designed alongside the display itself. Framing, edit rhythm and type scale all answer to the viewer's actual reading distance.",
      deliverables: ["Art direction", "Direction", "Edit", "Installation"],
    },
  },
  {
    slug: "beyond-fears",
    image: "/work/beyond-fears.jpg",
    year: "2026",
    client: "Beyond Fears",
    gallery: [],
    fr: {
      title: "Beyond Fears",
      category: "Événementiel",
      desc: "Identité et affiche de campagne pour l'édition Marrakech.",
      intro:
        "Une édition à installer à Marrakech, avec une identité à tenir de l'affiche jusqu'à la signalétique sur place. Notre part : l'identité de l'événement et toutes ses versions. Elle repose sur un contraste simple, un ciel photographié tel quel et une écriture manuscrite posée dessus ; le décalage entre les deux registres porte le ton de l'édition.",
      deliverables: ["Identité", "Affiche", "Versions réseaux", "Signalétique"],
    },
    en: {
      title: "Beyond Fears",
      category: "Event",
      desc: "Identity and campaign poster for the Marrakech edition.",
      intro:
        "An edition to stage in Marrakech, with an identity that had to hold from the poster through to the on-site signage. Our part: the event identity and its variants. It rests on one simple contrast, a sky shot as-is with handwriting laid over it; the gap between the two registers carries the tone of the edition.",
      deliverables: ["Identity", "Poster", "Social assets", "Signage"],
    },
  },
  {
    slug: "sneaks-plus",
    image: "/work/sneaks-plus.jpg",
    year: "",
    client: "Sneaks Plus",
    gallery: [],
    fr: {
      title: "Sneaks Plus",
      category: "Photo produit",
      desc: "Photographie produit et direction lumière pour la vitrine e-commerce.",
      intro:
        "Une vitrine e-commerce dont les fiches devaient rester homogènes à mesure que le catalogue s'agrandit. Notre part : la photographie produit et la direction lumière. Fond dégradé maîtrisé, ombre portée nette, et un angle unique reproductible pour que la grille tienne dans la durée.",
      deliverables: ["Photo produit", "Direction lumière", "Retouche", "Gabarit catalogue"],
    },
    en: {
      title: "Sneaks Plus",
      category: "Product photo",
      desc: "Product photography and lighting direction for the e-commerce storefront.",
      intro:
        "An e-commerce storefront whose listings had to stay consistent as the catalogue grew. Our part: product photography and lighting direction. Controlled gradient backdrop, crisp drop shadow, and a single repeatable angle so the grid holds over time.",
      deliverables: ["Product photography", "Lighting direction", "Retouching", "Catalogue template"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function projectCopy(project: Project, locale: Locale): ProjectCopy {
  return project[locale];
}

/** Projet suivant, en bouclant sur le premier. Alimente la navigation de fin de page. */
export function nextProject(slug: string): Project {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
