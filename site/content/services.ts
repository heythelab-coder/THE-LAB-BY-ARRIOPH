import type { Locale } from "./dictionary";

/**
 * Expertises du studio.
 *
 * A ne pas confondre avec la METHODE (Ecoute, Diagnostic, Formulation,
 * Lancement), qui vit dans `dictionary.ts` sous `process`. La methode dit
 * COMMENT une mission avance dans le temps ; les expertises ci-dessous disent
 * SUR QUOI on travaille. La version precedente decalquait les deux l'une sur
 * l'autre — quatre prestations pour quatre etapes — ce qui laissait croire
 * qu'une mission devait forcement passer par les quatre.
 *
 * Meme discipline que les projets : ce qui est neutre (identifiant, numero) est
 * declare une fois, seul le texte est localise.
 *
 * Chaque resume repond a deux questions dans l'ordre : a quel besoin
 * l'expertise repond, puis ce qu'on fait concretement. Les livrables disent ce
 * que le client recoit. C'est ce triptyque qui permet de reconnaitre son propre
 * cas au lieu de lire une categorie.
 */

export type ServiceCopy = {
  title: string;
  /** Le besoin d'abord, ce qu'on fait ensuite. */
  summary: string;
  /** Ce que le client recoit concretement. */
  deliverables: string[];
};

export type Service = {
  id: string;
  n: string;
  fr: ServiceCopy;
  en: ServiceCopy;
};

export const SERVICES: Service[] = [
  {
    id: "strategie",
    n: "01",
    fr: {
      title: "Stratégie & positionnement",
      summary:
        "Quand l'offre est difficile à résumer, tout le reste devient cher : chaque support doit réexpliquer. On décide ce que la marque défend, à qui elle parle en premier et ce qui la rend préférable, puis on l'écrit noir sur blanc.",
      deliverables: [
        "Lecture de marché et concurrence",
        "Positionnement écrit",
        "Récit de marque",
        "Messages clés par audience",
        "Ton de voix",
      ],
    },
    en: {
      title: "Strategy & positioning",
      summary:
        "When the offer is hard to summarise, everything downstream gets expensive: every asset has to re-explain it. We decide what the brand stands for, who it addresses first and what makes it preferable, then put it in writing.",
      deliverables: [
        "Market and competitive read",
        "Written positioning",
        "Brand narrative",
        "Key messages per audience",
        "Tone of voice",
      ],
    },
  },
  {
    id: "identite",
    n: "02",
    fr: {
      title: "Identité de marque",
      summary:
        "Une marque reconnaissable coûte moins cher à faire connaître. On donne une forme à la stratégie — nom, signe, typographie, couleurs, direction photo — et un cadre assez clair pour que d'autres que nous puissent l'appliquer sans la déformer.",
      deliverables: [
        "Nom et territoire verbal",
        "Logo et déclinaisons",
        "Système typographique et chromatique",
        "Direction photo et iconographie",
        "Charte d'application",
      ],
    },
    en: {
      title: "Brand identity",
      summary:
        "A recognisable brand costs less to make known. We give the strategy a form — name, mark, type, colour, photo direction — and a frame clear enough that people other than us can apply it without bending it.",
      deliverables: [
        "Name and verbal territory",
        "Logo and variants",
        "Type and colour system",
        "Photo direction and iconography",
        "Application guidelines",
      ],
    },
  },
  {
    id: "digital",
    n: "03",
    fr: {
      title: "Présence digitale",
      summary:
        "C'est le premier endroit où votre marque sera jugée, souvent avant le premier échange. On conçoit et développe le site, avec un système de composants que votre équipe peut faire vivre après la livraison.",
      deliverables: [
        "Site vitrine ou plateforme",
        "Design system réutilisable",
        "Rédaction des pages",
        "Référencement de base et mesure",
        "Transmission et formation",
      ],
    },
    en: {
      title: "Digital presence",
      summary:
        "This is the first place your brand gets judged, often before the first conversation. We design and build the site, with a component system your team can keep alive after handover.",
      deliverables: [
        "Showcase site or platform",
        "Reusable design system",
        "Page copywriting",
        "Baseline SEO and measurement",
        "Handover and training",
      ],
    },
  },
  {
    id: "contenus",
    n: "04",
    fr: {
      title: "Contenus & éditorial",
      summary:
        "Une identité ne se voit qu'à travers ce qu'elle publie. On produit les images, les vidéos et les textes qui la font exister au quotidien, et on tient le planning qui évite la page blanche du lundi matin.",
      deliverables: [
        "Direction artistique",
        "Production photo et vidéo",
        "Planning éditorial",
        "Publications et déclinaisons",
        "Gabarits réutilisables",
      ],
    },
    en: {
      title: "Content & editorial",
      summary:
        "An identity only becomes visible through what it publishes. We produce the images, films and words that make it exist day to day, and hold the schedule that prevents the Monday-morning blank page.",
      deliverables: [
        "Art direction",
        "Photo and video production",
        "Editorial calendar",
        "Posts and adaptations",
        "Reusable templates",
      ],
    },
  },
  {
    id: "activation",
    n: "05",
    fr: {
      title: "Activation & campagne",
      summary:
        "Un lancement qui ne rencontre personne n'est pas un lancement. On construit le dispositif qui met la marque devant son public — concept, déclinaisons par canal, relais et créateurs — puis on regarde ce qui a marché.",
      deliverables: [
        "Concept de campagne",
        "Déclinaisons par canal",
        "Collaborations créateurs",
        "Événement et activation terrain",
        "Bilan et ajustements",
      ],
    },
    en: {
      title: "Activation & campaign",
      summary:
        "A launch nobody meets isn't a launch. We build what puts the brand in front of its audience — concept, per-channel adaptations, partners and creators — then look at what actually worked.",
      deliverables: [
        "Campaign concept",
        "Per-channel adaptations",
        "Creator collaborations",
        "Events and on-the-ground activation",
        "Review and adjustments",
      ],
    },
  },
];

export function serviceCopy(service: Service, locale: Locale): ServiceCopy {
  return service[locale];
}
