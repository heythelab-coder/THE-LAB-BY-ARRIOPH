export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Dictionary = typeof fr;

export const fr = {
  meta: {
    title: "4Lab — Laboratoire de lancement de marque",
    description:
      "Stratégie, identité, digital et contenus pour les marques qui se lancent et pour celles qui ouvrent un nouveau chapitre.",
  },
  nav: {
    work: "Projets",
    services: "Services",
    studio: "Studio",
    contact: "Contact",
    menu: "Menu",
    close: "Fermer",
    skip: "Aller au contenu principal",
  },
  hero: {
    line1: "Les marques ne naissent pas.",
    line2: "Elles se formulent.",
    // La signature est évocatrice : la ligne qui suit doit dire concrètement
    // ce qu'on fait, sinon le visiteur repart avec une jolie phrase et
    // aucune idée de ce qu'il peut nous demander.
    subtitle:
      "On donne forme aux projets qui commencent et aux marques qui ouvrent un nouveau chapitre. Stratégie, identité, digital et contenus : une même équipe pour relier les décisions à leur mise en œuvre.",
    primary: "Parlons de votre projet",
    secondary: "Voir les projets",
    tagline: "Laboratoire de lancement, par Arrioph",
    scroll: "Faire défiler",
  },
  entrance: {
    skip: "Appuyez sur une touche ou cliquez pour passer l'introduction.",
  },
  chapters: {
    opening: "Ouverture",
    studio: "Le studio",
    work: "Projets",
    method: "Méthode",
    contact: "Contact",
  },
  approach: {
    eyebrow: "CE QU'ON FAIT",
    title: "Là où une marque\nprend forme.",
    p1: "Un lancement, une offre qui s'ouvre, un marché qu'on aborde : ce sont des moments où beaucoup de décisions se prennent en même temps, et où elles se tiennent ou s'annulent entre elles. On les prend avec vous, puis on les met en œuvre.",
    /**
     * Trois situations plutôt qu'une liste de prestations : le visiteur se
     * reconnaît dans un moment, pas dans un intitulé de service. C'est aussi
     * ce qui ouvre la porte aux entreprises installées sans avoir à écrire
     * « on travaille aussi avec les grandes marques ».
     */
    situations: [
      {
        label: "Construire et lancer une marque",
        body: "Vous partez d'un projet, parfois d'un nom. On pose le positionnement, l'identité et la présence qui vont avec.",
      },
      {
        label: "Lancer une nouvelle offre",
        body: "La marque existe déjà. Il faut faire une place à la nouveauté sans abîmer ce qui fonctionne.",
      },
      {
        label: "Ouvrir un nouveau chapitre",
        body: "Nouveau marché, nouveau public, nouvelle étape. On reprend le positionnement là où il coince et on réaligne le reste.",
      },
    ],
    outcome:
      "Ce que ça donne : une offre qu'on comprend en une phrase, des efforts concentrés au bon endroit, une présence cohérente d'un support à l'autre, et de quoi aborder vos premiers clients sans improviser.",
    name: "4Lab",
    role: "Laboratoire de lancement, par Arrioph",
  },
  clients: {
    eyebrow: "CLIENTS & PARTENAIRES",
    cta: "ET VOUS ?",
  },
  work: {
    eyebrow: "SÉLECTION",
    title: "Projets",
    all: "Voir tous les projets",
    allFilter: "Tous",
    view: "Voir",
  },
  quote:
    "Ce qui tient une marque, ce n'est pas le logo, ce sont les décisions prises avant lui. On écoute d'abord, on décide ensuite, on produit une fois que c'est clair, puis on regarde ce que le marché en fait.",
  process: {
    eyebrow: "MÉTHODE",
    // La méthode et les expertises sont deux choses différentes. Ce bloc
    // décrit COMMENT on avance ; les expertises (stratégie, identité,
    // digital, contenus, activation) vivent dans `content/services.ts`.
    title: "Comment on travaille.",
    steps: [
      {
        n: "01",
        title: "Écoute",
        body: "Une séance, sans engagement et sans devis. Vous racontez le projet tel qu'il est, pas la version présentable. On pose des questions, on prend des notes. À la sortie, vous savez si on est les bons, et nous aussi.",
        tags: ["Séance d'écoute", "Sans engagement", "Aucun devis"],
      },
      {
        n: "02",
        title: "Diagnostic",
        body: "On cherche ce qui est réellement en jeu : le marché, la concurrence, ce que votre audience croit déjà, ce qui tient déjà chez vous. Cette lecture ouvre la mission et sert de base à tout ce qui suit.",
        tags: ["Lecture de marché", "Concurrence", "Enjeu réel"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "On construit avec vous ce qui doit l'être : positionnement, récit, nom, identité. Par itérations courtes, à voix haute. Vous voyez les pistes écartées autant que celles retenues.",
        tags: ["Positionnement", "Récit", "Identité", "Nom"],
      },
      {
        n: "04",
        title: "Lancement",
        body: "On met la marque au monde : site, contenus, campagne. Puis on regarde ce que le marché en fait, et on ajuste. Un lancement n'est pas une livraison, c'est un début.",
        tags: ["Campagne", "Présence digitale", "Contenus"],
      },
    ],
  },
  faq: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "FAQ",
    items: [
      {
        q: "Vous faites quoi, exactement ?",
        a: "Stratégie et positionnement, identité de marque, présence digitale, contenus et activation. Le tout autour d'un projet qui se lance ou qui change d'échelle. Selon votre point de départ, on prend l'ensemble ou seulement ce qui manque.",
      },
      {
        q: "À qui ça s'adresse ?",
        a: "Beaucoup de fondateurs et de jeunes structures, parce que c'est là que tout se décide en même temps. Et des entreprises installées qui lancent une offre, ouvrent un marché ou passent une étape. Le point commun n'est pas la taille, c'est le moment.",
      },
      {
        q: "Faut-il tout refaire pour travailler avec vous ?",
        a: "Non. Certaines missions reprennent la marque depuis le positionnement, d'autres se limitent à un site, une identité ou une campagne. On commence par regarder ce qui tient déjà, et on ne rouvre que ce qui bloque.",
      },
      {
        q: "Comment se passe le premier échange ?",
        a: "Une séance d'écoute d'une trentaine de minutes. Pas besoin de brief, ni de budget arrêté, ni de deck. Vous racontez le projet, on pose des questions. Aucun devis n'est envoyé à ce stade.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Ça dépend de ce qu'on lance et de ce qui existe déjà. Le périmètre se décide ensemble après le premier échange, et le chiffrage porte sur ce périmètre-là, pas sur un catalogue de prestations.",
      },
      {
        q: "Qu'est-ce qu'Arrioph apporte ?",
        a: "Arrioph est notre partenaire sur le conseil et les missions associées. Quand un projet dépasse la marque et touche à l'organisation ou aux outils, on s'appuie sur cette expertise plutôt que d'improviser.",
      },
    ],
  },
  cta: {
    eyebrow: "PROCHAINE ÉTAPE",
    availability: "Prochaine disponibilité :",
    title: "Parlons de ce que vous construisez.",
    body: "Pas besoin de brief. Une séance d'écoute d'une trentaine de minutes, sans engagement, pour comprendre où vous en êtes et si on peut aider.",
    button: "Parlons de votre projet",
  },
  footer: {
    pagesLabel: "Pages",
    socialsLabel: "Réseaux",
    contactLabel: "Contact",
    rights: "Tous droits réservés.",
    blurb:
      "Stratégie, identité, digital et contenus pour les marques qui se lancent et pour celles qui ouvrent un nouveau chapitre.",
    backToTop: "Haut de page ↑",
    pages: [
      { label: "Accueil", href: "" },
      { label: "Projets", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Studio", href: "/studio" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const en: Dictionary = {
  meta: {
    title: "4Lab — Brand launch lab",
    description:
      "Strategy, identity, digital and content for brands being launched and for brands opening a new chapter.",
  },
  nav: {
    work: "Work",
    services: "Services",
    studio: "Studio",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    skip: "Skip to main content",
  },
  hero: {
    line1: "Brands aren't born.",
    line2: "They're formulated.",
    subtitle:
      "We give shape to projects that are starting out and to brands opening a new chapter. Strategy, identity, digital and content: one team connecting the decisions to the work that follows them.",
    primary: "Let's talk about your project",
    secondary: "View work",
    tagline: "Brand launch lab, by Arrioph",
    scroll: "Scroll",
  },
  entrance: {
    skip: "Press any key or click to skip the intro.",
  },
  chapters: {
    opening: "Opening",
    studio: "The studio",
    work: "Work",
    method: "Method",
    contact: "Contact",
  },
  approach: {
    eyebrow: "WHAT WE DO",
    title: "Where a brand\ntakes shape.",
    p1: "A launch, a new offer, a market you're stepping into: these are moments when a lot of decisions get made at once, and where they either hold together or cancel each other out. We make them with you, then we build them.",
    situations: [
      {
        label: "Build and launch a brand",
        body: "You start with a project, sometimes a name. We set the positioning, the identity and the presence that go with it.",
      },
      {
        label: "Launch a new offer",
        body: "The brand already exists. The new thing needs its own room without damaging what already works.",
      },
      {
        label: "Open a new chapter",
        body: "New market, new audience, new stage. We reopen the positioning where it strains and realign the rest.",
      },
    ],
    outcome:
      "What that gives you: an offer people grasp in one sentence, effort concentrated where it counts, a presence that holds from one surface to the next, and enough to meet your first customers without improvising.",
    name: "4Lab",
    role: "Brand launch lab, by Arrioph",
  },
  clients: {
    eyebrow: "CLIENTS & PARTNERS",
    cta: "YOU NEXT?",
  },
  work: {
    eyebrow: "SELECTED",
    title: "Work",
    all: "View all work",
    allFilter: "All",
    view: "View",
  },
  quote:
    "What holds a brand together isn't the logo, it's the decisions made before it. We listen first, decide next, produce once it's clear, then watch what the market does with it.",
  process: {
    eyebrow: "METHOD",
    title: "How we work.",
    steps: [
      {
        n: "01",
        title: "Intake",
        body: "One session, no commitment and no quote. You tell us the project as it is, not the presentable version. We ask questions, we take notes. By the end, you know whether we're the right fit, and so do we.",
        tags: ["Listening session", "No commitment", "No quote"],
      },
      {
        n: "02",
        title: "Diagnostic",
        body: "We look for what's actually at stake: the market, the competition, what your audience already believes, what already works on your side. This reading opens the engagement and grounds everything after it.",
        tags: ["Market reading", "Competition", "Real stakes"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "We build what needs building, with you: positioning, story, name, identity. Short iterations, out loud. You see the routes we drop as clearly as the ones we keep.",
        tags: ["Positioning", "Story", "Identity", "Naming"],
      },
      {
        n: "04",
        title: "Release",
        body: "We put the brand into the world: site, content, campaign. Then we watch what the market does with it, and adjust. A launch isn't a delivery, it's a beginning.",
        tags: ["Campaign", "Digital presence", "Content"],
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    title: "FAQ",
    items: [
      {
        q: "What exactly do you do?",
        a: "Strategy and positioning, brand identity, digital presence, content and activation. All of it around a project that's launching or changing gear. Depending on where you start, we take the whole thing or only what's missing.",
      },
      {
        q: "Who is it for?",
        a: "Plenty of founders and young companies, because that's where everything gets decided at once. And established companies launching an offer, entering a market or reaching a new stage. The common thread isn't size, it's timing.",
      },
      {
        q: "Do we have to redo everything to work with you?",
        a: "No. Some engagements reopen the brand from the positioning up, others stop at a site, an identity or a campaign. We start by looking at what already holds, and only reopen what's in the way.",
      },
      {
        q: "What does the first conversation look like?",
        a: "A listening session of about thirty minutes. No brief needed, no fixed budget, no deck. You tell us the project, we ask questions. No quote is sent at this stage.",
      },
      {
        q: "What does it cost?",
        a: "It depends on what's being launched and what already exists. Scope is decided together after the first conversation, and the pricing covers that scope, not a catalogue of services.",
      },
      {
        q: "What does Arrioph bring?",
        a: "Arrioph is our partner on consulting and the work that comes with it. When a project reaches past the brand into the organisation or the tooling, we lean on that expertise instead of improvising.",
      },
    ],
  },
  cta: {
    eyebrow: "NEXT STEP",
    availability: "Next opening:",
    title: "Tell us what you're building.",
    body: "No brief required. A listening session of about thirty minutes, no commitment, to understand where you are and whether we can help.",
    button: "Let's talk about your project",
  },
  footer: {
    pagesLabel: "Pages",
    socialsLabel: "Socials",
    contactLabel: "Contact",
    rights: "All rights reserved.",
    blurb:
      "Strategy, identity, digital and content for brands being launched and for brands opening a new chapter.",
    backToTop: "Back to top ↑",
    pages: [
      { label: "Home", href: "" },
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Studio", href: "/studio" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function resolveLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value) ? (value as Locale) : defaultLocale;
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[resolveLocale(locale)];
}
