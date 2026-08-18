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
      desc: "Couverture photo et contenu social d'une activation communautaire.",
      intro:
        "Une captation d'activation pensée pour le format vertical dès la prise de vue. L'objectif n'était pas de documenter l'événement mais d'en restituer l'ambiance, avec des cadrages au ras du public plutôt qu'en surplomb.",
      deliverables: ["Photo d'événement", "Contenu social", "Montage court", "Livraison 48 h"],
    },
    en: {
      title: "Red Bull Morocco",
      category: "Brand content",
      desc: "Photo coverage and social content for a community activation.",
      intro:
        "Activation coverage framed for vertical from the moment of shooting. The goal was not to document the event but to carry its atmosphere, shooting level with the crowd rather than above it.",
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
        "Une campagne portée par les supporters plutôt que par des mannequins. Le casting, le studio et la lumière ont été calés pour que le vêtement reste lisible tout en laissant la personnalité du modèle occuper le cadre.",
      deliverables: ["Direction artistique", "Casting", "Production photo", "Retouche"],
    },
    en: {
      title: "WAC Official Brand",
      category: "Campaign",
      desc: "Art direction and photo production for the club's official line.",
      intro:
        "A campaign carried by supporters rather than models. Casting, studio and lighting were set so the garment stays legible while the subject's presence still owns the frame.",
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
      desc: "Film de mode et mise en scène du dispositif de diffusion.",
      intro:
        "Un film de mode pensé pour un dispositif de diffusion grand format. L'image et son support ont été conçus ensemble : le cadrage, le rythme du montage et l'échelle de la typographie répondent à la distance de lecture réelle du visiteur.",
      deliverables: ["Direction artistique", "Réalisation", "Montage", "Installation"],
    },
    en: {
      title: "Le Temple",
      category: "Brand film",
      desc: "Fashion film and staging of the screening installation.",
      intro:
        "A fashion film built for a large-format screening setup. Image and support were designed together: framing, edit rhythm and type scale all answer to the viewer's actual reading distance.",
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
        "Une identité d'événement construite sur un contraste simple : un ciel photographié tel quel, et une écriture manuscrite qui vient s'y poser. Le décalage entre les deux registres porte le ton de l'édition.",
      deliverables: ["Identité", "Affiche", "Déclinaisons social", "Signalétique"],
    },
    en: {
      title: "Beyond Fears",
      category: "Event",
      desc: "Identity and campaign poster for the Marrakech edition.",
      intro:
        "An event identity built on one simple contrast: a sky shot as-is, and handwriting laid over it. The gap between the two registers carries the tone of the edition.",
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
        "Une série produit conçue pour une fiche e-commerce : fond dégradé maîtrisé, ombre portée nette, et un angle unique reproductible sur l'ensemble du catalogue pour que la grille reste cohérente à mesure qu'elle s'agrandit.",
      deliverables: ["Photo produit", "Direction lumière", "Retouche", "Gabarit catalogue"],
    },
    en: {
      title: "Sneaks Plus",
      category: "Product photo",
      desc: "Product photography and lighting direction for the e-commerce storefront.",
      intro:
        "A product series built for a storefront listing: controlled gradient backdrop, crisp drop shadow, and a single repeatable angle across the catalogue so the grid stays coherent as it grows.",
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
