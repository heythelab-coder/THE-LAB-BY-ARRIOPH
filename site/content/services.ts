import type { Locale } from "./dictionary";

/**
 * Offre du studio.
 *
 * Meme discipline que les projets : ce qui est neutre (identifiant, numero) est
 * declare une fois, seul le texte est localise.
 *
 * Le contenu suit le positionnement du site — un laboratoire de lancement — et
 * non un catalogue d'agence. D'ou quatre prestations qui correspondent aux
 * quatre etapes du protocole, et un bloc « ce qu'on ne fait pas » : annoncer ses
 * limites est ce qui rend credible le reste de la liste.
 */

export type ServiceCopy = {
  title: string;
  /** Une phrase : ce que la prestation resout. */
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
    id: "positionnement",
    n: "01",
    fr: {
      title: "Positionnement & stratégie",
      summary:
        "Décider ce que la marque défend, contre qui elle se place, et pourquoi quelqu'un devrait la choisir. C'est la décision qui rend toutes les suivantes plus faciles.",
      deliverables: [
        "Lecture de marché et concurrence",
        "Positionnement écrit",
        "Récit de marque",
        "Ton de voix",
        "Messages clés par audience",
      ],
    },
    en: {
      title: "Positioning & strategy",
      summary:
        "Deciding what the brand stands for, who it stands against, and why anyone should choose it. The decision that makes every later one easier.",
      deliverables: [
        "Market and competitive read",
        "Written positioning",
        "Brand narrative",
        "Tone of voice",
        "Key messages per audience",
      ],
    },
  },
  {
    id: "identite",
    n: "02",
    fr: {
      title: "Identité de marque",
      summary:
        "Donner une forme à la stratégie : un nom, un signe, un système qui tient sur un écran comme sur une façade, et qui reste reconnaissable quand d'autres que nous l'appliquent.",
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
        "Giving the strategy a form: a name, a mark, a system that holds on a screen as well as on a building, and stays recognisable when other people apply it.",
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
    id: "presence",
    n: "03",
    fr: {
      title: "Présence digitale",
      summary:
        "Le premier endroit où votre marque sera jugée. Site, design system et contenu de lancement, conçus pour être tenus dans la durée, pas seulement livrés.",
      deliverables: [
        "Site vitrine ou plateforme",
        "Design system réutilisable",
        "Contenu éditorial de lancement",
        "Modèles réseaux sociaux",
        "Transmission et formation",
      ],
    },
    en: {
      title: "Digital presence",
      summary:
        "The first place your brand gets judged. Site, design system and launch content, built to be maintained over time, not just delivered.",
      deliverables: [
        "Showcase site or platform",
        "Reusable design system",
        "Launch editorial content",
        "Social templates",
        "Handover and training",
      ],
    },
  },
  {
    id: "campagne",
    n: "04",
    fr: {
      title: "Campagne de lancement",
      summary:
        "Mettre la marque au monde et regarder ce que le marché en fait. Direction artistique, production et mesure, puis on ajuste sur ce qu'on observe.",
      deliverables: [
        "Concept de campagne",
        "Production photo et vidéo",
        "Déclinaisons par canal",
        "Plan de diffusion",
        "Mesure et ajustement",
      ],
    },
    en: {
      title: "Launch campaign",
      summary:
        "Putting the brand into the world and watching what the market does with it. Art direction, production and measurement, then we adjust on what we see.",
      deliverables: [
        "Campaign concept",
        "Photo and video production",
        "Per-channel adaptations",
        "Distribution plan",
        "Measurement and adjustment",
      ],
    },
  },
];

export function serviceCopy(service: Service, locale: Locale): ServiceCopy {
  return service[locale];
}
