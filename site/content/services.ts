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
      title: "Stratégie de marque",
      summary:
        "Si vous n'arrivez pas à résumer ce que vous vendez, chaque affiche, chaque page et chaque post devra le réexpliquer. Et ça coûte cher. On décide ce que la marque défend, à qui elle parle d'abord, et pourquoi on la choisirait elle. Puis on l'écrit noir sur blanc.",
      deliverables: [
        "Marché et concurrents",
        "Ce que vous défendez, écrit",
        "Votre histoire",
        "Messages clés",
        "Votre façon de parler",
      ],
    },
    en: {
      title: "Brand strategy",
      summary:
        "If you cannot sum up what you sell, every poster, every page and every post has to explain it again. That gets expensive. We decide what the brand stands for, who it speaks to first, and why anyone would pick you. Then we put it in writing.",
      deliverables: [
        "Market and competitors",
        "What you stand for, written",
        "Your story",
        "Key messages",
        "How you speak",
      ],
    },
  },
  {
    id: "identite",
    n: "02",
    fr: {
      title: "Identité visuelle",
      summary:
        "Une marque qu'on reconnaît coûte moins cher à faire connaître. On dessine le signe, on choisit les caractères et les couleurs, on cale la façon de photographier. Puis on écrit les règles, assez clairement pour que quelqu'un d'autre les applique sans tout déformer.",
      deliverables: [
        "Nom",
        "Logo et ses versions",
        "Caractères et couleurs",
        "Direction photo",
        "Règles d'usage",
      ],
    },
    en: {
      title: "Visual identity",
      summary:
        "A brand people recognise costs less to make known. We draw the mark, pick the type and the colours, set how things get photographed. Then we write the rules, clearly enough that someone else can follow them without bending everything out of shape.",
      deliverables: [
        "Name",
        "Logo and its versions",
        "Type and colours",
        "Photo direction",
        "Rules of use",
      ],
    },
  },
  {
    id: "digital",
    n: "03",
    fr: {
      title: "Site et présence en ligne",
      summary:
        "C'est là qu'on vous juge, souvent avant même de vous parler. On dessine et on code le site, avec des blocs réutilisables pour que votre équipe ajoute une page sans avoir à nous rappeler.",
      deliverables: [
        "Site ou plateforme",
        "Blocs réutilisables",
        "Textes des pages",
        "Référencement et statistiques",
        "Passation et prise en main",
      ],
    },
    en: {
      title: "Site and online presence",
      summary:
        "This is where you get judged, often before anyone talks to you. We design and code the site, with reusable blocks so your team can add a page without calling us back.",
      deliverables: [
        "Site or platform",
        "Reusable blocks",
        "Page copy",
        "Search visibility and stats",
        "Handover and training",
      ],
    },
  },
  {
    id: "contenus",
    n: "04",
    fr: {
      title: "Photo, vidéo et contenus",
      summary:
        "Une identité ne se voit que dans ce qu'elle publie. On shoote, on monte, on écrit. Et on tient le calendrier qui évite la page blanche du lundi matin.",
      deliverables: [
        "Direction artistique",
        "Shooting photo et vidéo",
        "Calendrier de publication",
        "Posts et adaptations",
        "Gabarits à réutiliser",
      ],
    },
    en: {
      title: "Photo, film and content",
      summary:
        "An identity only shows up in what it publishes. We shoot, we edit, we write. And we hold the calendar that keeps Monday morning from being a blank page.",
      deliverables: [
        "Art direction",
        "Photo and film shoots",
        "Publishing calendar",
        "Posts and adaptations",
        "Templates to reuse",
      ],
    },
  },
  {
    id: "activation",
    n: "05",
    fr: {
      title: "Campagne de lancement",
      summary:
        "Un lancement que personne ne voit n'est pas un lancement. On trouve l'idée, on l'adapte à chaque support, on mobilise les relais et les créateurs qui parlent déjà à vos clients. Puis on regarde ce qui a marché.",
      deliverables: [
        "Idée de campagne",
        "Adaptations par support",
        "Collaborations créateurs",
        "Événement et terrain",
        "Bilan et ajustements",
      ],
    },
    en: {
      title: "Launch campaign",
      summary:
        "A launch nobody sees is not a launch. We find the idea, adapt it to each surface, and bring in the partners and creators who already talk to your customers. Then we look at what actually worked.",
      deliverables: [
        "Campaign idea",
        "Adaptations per surface",
        "Creator collaborations",
        "Events and on the ground",
        "Review and adjustments",
      ],
    },
  },
];

export function serviceCopy(service: Service, locale: Locale): ServiceCopy {
  return service[locale];
}
