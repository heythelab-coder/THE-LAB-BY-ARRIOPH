export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Dictionary = typeof fr;

export const fr = {
  meta: {
    title: "4Lab, laboratoire de lancement de marque",
    description:
      "On construit des marques : le nom, l'image, le site, les photos et les films. Pour ceux qui se lancent, et pour ceux qui ouvrent un nouveau chapitre.",
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
      "On construit des marques, de la première idée jusqu'à ce qui se voit : le nom, l'image, le site, les photos, les films. Les mêmes personnes décident et fabriquent.",
    primary: "Parlons de votre projet",
    secondary: "Voir les projets",
    tagline: "Laboratoire de lancement de marque",
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
    p1: "Se lancer, sortir une nouvelle offre, attaquer un marché : tout se décide en quelques semaines, et une décision de travers en abîme trois autres. On les prend avec vous, et c'est nous qui fabriquons derrière.",
    /**
     * Trois situations plutôt qu'une liste de prestations : le visiteur se
     * reconnaît dans un moment, pas dans un intitulé de service. C'est aussi
     * ce qui ouvre la porte aux entreprises installées sans avoir à écrire
     * « on travaille aussi avec les grandes marques ».
     */
    situations: [
      {
        label: "Construire et lancer une marque",
        body: "Vous partez d'une idée, parfois d'un nom. On trouve ce que vous défendez, on lui dessine un visage, et on le met en ligne.",
      },
      {
        label: "Lancer une nouvelle offre",
        body: "La marque tourne déjà. Il faut faire de la place au nouveau sans casser ce qui marche.",
      },
      {
        label: "Ouvrir un nouveau chapitre",
        body: "Nouveau marché, nouveau public, changement d'échelle. On reprend ce qui coince, on garde ce qui tient.",
      },
    ],
    outcome:
      "Au bout : on comprend ce que vous vendez en une phrase, votre marque se reconnaît d'une affiche à un post, et vous avez de quoi parler à vos premiers clients sans bricoler.",
    name: "4Lab",
    role: "Laboratoire de lancement de marque",
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
    "Un logo ne sauve pas une marque. Ce qui la tient, ce sont les décisions prises avant de dessiner quoi que ce soit. On écoute, on tranche, on fabrique, puis on regarde ce que les gens en font.",
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
        body: "On regarde le terrain : qui vend la même chose, à quel prix, avec quels arguments, et ce que vos clients pensent déjà de vous. C'est là-dessus qu'on s'appuie ensuite, pas sur une intuition.",
        tags: ["Terrain", "Concurrence", "Ce qui est en jeu"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "On écrit ce que vous défendez, on choisit un nom s'il en faut un, on dessine l'image qui va avec. On montre tôt, souvent, et à voix haute. Vous voyez les pistes qu'on jette autant que celles qu'on garde.",
        tags: ["Nom", "Ce que vous défendez", "Identité"],
      },
      {
        n: "04",
        title: "Lancement",
        body: "On met en ligne, on tourne les images, on lance la campagne. Puis on regarde ce qui prend et ce qui ne prend pas, et on ajuste. Un lancement n'est pas une livraison, c'est un début.",
        tags: ["Site", "Photo et vidéo", "Campagne"],
      },
    ],
  },
  faq: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "FAQ",
    items: [
      {
        q: "Vous faites quoi, exactement ?",
        a: "On trouve ce que votre marque défend, on lui dessine une image, on construit le site, et on produit les photos, les films et les publications qui la font exister. Selon d'où vous partez, on prend tout ou juste ce qui manque.",
      },
      {
        q: "À qui ça s'adresse ?",
        a: "Beaucoup de fondateurs et de jeunes boîtes, parce que c'est là que tout se joue d'un coup. Et des entreprises installées qui sortent une offre, attaquent un marché ou changent d'échelle. Ce n'est pas une question de taille, c'est une question de moment.",
      },
      {
        q: "Faut-il tout refaire pour travailler avec vous ?",
        a: "Non. Parfois on reprend la marque depuis le début, parfois on fait juste un site, une identité ou une campagne. On commence par regarder ce qui tient, et on ne touche qu'à ce qui bloque.",
      },
      {
        q: "Comment se passe le premier échange ?",
        a: "Une séance d'écoute d'une trentaine de minutes. Pas besoin de brief, ni de budget arrêté, ni de deck. Vous racontez le projet, on pose des questions. Aucun devis n'est envoyé à ce stade.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Ça dépend de ce qu'on lance et de ce qui existe déjà. On décide ensemble de ce qu'on fait après le premier échange, et le prix porte là-dessus, pas sur un catalogue.",
      },
      {
        q: "Qu'est-ce qu'Arrioph apporte ?",
        a: "Arrioph est notre partenaire sur le conseil. Quand un projet dépasse la marque et touche à l'organisation ou aux outils, on s'appuie sur eux plutôt que de faire semblant.",
      },
    ],
  },
  cta: {
    eyebrow: "PROCHAINE ÉTAPE",
    availability: "Prochaine disponibilité :",
    title: "Racontez-nous ce que vous construisez.",
    body: "Pas besoin de brief. Une séance d'écoute d'une trentaine de minutes, sans engagement, pour comprendre où vous en êtes et si on peut aider.",
    button: "Parlons de votre projet",
  },
  footer: {
    pagesLabel: "Pages",
    socialsLabel: "Réseaux",
    contactLabel: "Contact",
    rights: "Tous droits réservés.",
    blurb:
      "On construit des marques : le nom, l'image, le site, les photos et les films. Pour ceux qui se lancent, et pour ceux qui ouvrent un nouveau chapitre.",
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
    title: "4Lab, brand launch lab",
    description:
      "We build brands: the name, the look, the site, the photos and the films. For people starting out, and for those opening a new chapter.",
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
      "We build brands, from the first idea to the thing people actually see: the name, the look, the site, the photos, the films. The same people decide and make.",
    primary: "Let's talk about your project",
    secondary: "View work",
    tagline: "Brand launch lab",
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
    p1: "Launching, putting out a new offer, going after a market: it all gets decided in a few weeks, and one decision off course wrecks three others. We make them with you, and we build what comes after.",
    situations: [
      {
        label: "Build and launch a brand",
        body: "You start with an idea, sometimes a name. We work out what you stand for, give it a face, and put it online.",
      },
      {
        label: "Launch a new offer",
        body: "The brand is already running. The new thing needs room without breaking what works.",
      },
      {
        label: "Open a new chapter",
        body: "New market, new crowd, a change of scale. We reopen what is stuck and keep what holds.",
      },
    ],
    outcome:
      "At the end: people get what you sell in one sentence, your brand is recognisable from a poster to a post, and you have enough to talk to your first customers without winging it.",
    name: "4Lab",
    role: "Brand launch lab",
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
    "A logo does not save a brand. What holds it together are the decisions made before anyone draws anything. We listen, we decide, we make, then we watch what people do with it.",
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
        body: "We look at the ground: who sells the same thing, at what price, with what arguments, and what your customers already think of you. That is what we build on, not a hunch.",
        tags: ["Legwork", "Competition", "What is at stake"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "We write down what you stand for, pick a name if you need one, and draw the look that goes with it. We show early, often, and out loud. You see the routes we bin as clearly as the ones we keep.",
        tags: ["Name", "What you stand for", "Identity"],
      },
      {
        n: "04",
        title: "Release",
        body: "We put it online, shoot the images, run the campaign. Then we watch what lands and what does not, and adjust. A launch is not a delivery, it is a start.",
        tags: ["Site", "Photo and video", "Campaign"],
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    title: "FAQ",
    items: [
      {
        q: "What exactly do you do?",
        a: "We work out what your brand stands for, give it a look, build the site, and produce the photos, films and posts that make it exist day to day. Depending on where you start, we take all of it or just what is missing.",
      },
      {
        q: "Who is it for?",
        a: "Plenty of founders and young companies, because that is where everything lands at once. And established companies putting out an offer, going after a market or changing scale. It is not about size, it is about timing.",
      },
      {
        q: "Do we have to redo everything to work with you?",
        a: "No. Sometimes we rebuild the brand from scratch, sometimes we just do a site, an identity or a campaign. We start by looking at what holds, and only touch what is in the way.",
      },
      {
        q: "What does the first conversation look like?",
        a: "A listening session of about thirty minutes. No brief needed, no fixed budget, no deck. You tell us the project, we ask questions. No quote is sent at this stage.",
      },
      {
        q: "What does it cost?",
        a: "It depends on what is being launched and what already exists. We decide together what we are doing after the first conversation, and the price covers that, not a list of services.",
      },
      {
        q: "What does Arrioph bring?",
        a: "Arrioph is our partner on consulting. When a project reaches past the brand into how the company runs or what it runs on, we lean on them instead of pretending.",
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
      "We build brands: the name, the look, the site, the photos and the films. For people starting out, and for those opening a new chapter.",
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
