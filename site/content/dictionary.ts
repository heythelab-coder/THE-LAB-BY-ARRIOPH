export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Dictionary = typeof fr;

export const fr = {
  meta: {
    title: "THE LAB — Laboratoire de lancement de marque",
    description:
      "On lance des marques. Positionnement, récit, identité et première campagne. Formulés avec vous, jamais vendus sur catalogue. Par Arrioph.",
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
    subtitle:
      "On accompagne les marques au moment qui décide de tout : le lancement. Vous n'arrivez pas avec un brief, vous arrivez avec un projet. Le brief, on l'écrit ensemble.",
    primary: "Réserver une séance",
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
    services: "Services",
    method: "Méthode",
    contact: "Contact",
  },
  approach: {
    eyebrow: "NOTRE POSITION",
    title: "On ne vend pas de services.\nOn formule des marques.",
    p1: "La plupart des agences font tout. Nous, on fait une chose : le lancement. Le moment où la marque n'existe pas encore, où tout est encore ouvert, où une seule décision de positionnement pèse plus lourd que dix ans de communication.",
    p2: "On ne commence pas par une proposition commerciale. On commence par écouter. Vous racontez ce que vous construisez, on cherche ce qui est réellement en jeu, puis on formule avec vous. Derrière, l'expertise data, IA et technologique d'Arrioph vient prouver ce que l'intuition seule ne peut pas.",
    name: "THE LAB",
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
    "Un lancement raté ne se répare pas, il se recommence. C'est pour ça qu'on écoute avant de proposer, qu'on formule avant de produire, et qu'on mesure avant de conclure.",
  process: {
    eyebrow: "PROTOCOLE",
    title: "Services",
    steps: [
      {
        n: "01",
        title: "Écoute",
        body: "Une séance, sans engagement et sans devis. Vous racontez le vrai projet, pas la version présentable. On pose des questions, on prend des notes, on ne vend rien. À la sortie, vous savez déjà si on est les bons.",
        tags: ["Séance découverte", "Sans engagement", "Aucun devis"],
      },
      {
        n: "02",
        title: "Diagnostic",
        body: "On cherche ce qui est réellement en jeu : le marché, la concurrence, ce que votre audience croit déjà. Arrioph apporte la donnée. Vous recevez une lecture écrite de votre situation, utile même si vous vous arrêtez là.",
        tags: ["Lecture de marché", "Données", "Enjeu réel"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "On construit la marque avec vous : positionnement, récit, nom, identité. Par itérations courtes, à voix haute, jamais en boîte noire. Vous voyez les hypothèses écartées autant que celles retenues.",
        tags: ["Positionnement", "Récit", "Identité", "Nom"],
      },
      {
        n: "04",
        title: "Lancement",
        body: "On met la marque au monde : présence digitale, première campagne, contenu de lancement. Puis on observe ce que le marché en fait, et on ajuste. Un lancement n'est pas une livraison, c'est une mesure.",
        tags: ["Campagne de lancement", "Présence digitale", "Mesure"],
      },
    ],
  },
  faq: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "FAQ",
    items: [
      {
        q: "Vous faites quoi, exactement ?",
        a: "Des lancements. Positionnement, récit, identité, présence digitale et première campagne. Pas de retainer social, pas de régie média, pas de production à la demande. Si votre besoin n'est pas un lancement, on vous le dira dès le premier échange.",
      },
      {
        q: "Pourquoi uniquement les lancements ?",
        a: "Parce que c'est le moment où le travail compte le plus, et où il est le plus souvent bâclé. Une marque lancée sur un positionnement faible passe les dix années suivantes à compenser. On préfère être là avant.",
      },
      {
        q: "Comment se passe le premier échange ?",
        a: "Une séance d'écoute de trente minutes. Pas besoin de brief, ni de budget arrêté, ni de deck. Vous racontez le projet, on pose des questions. Aucun devis n'est envoyé à ce stade.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Impossible à dire avant de savoir ce qu'on lance. Ce qu'on peut dire : le périmètre se décide ensemble après le diagnostic, jamais avant. On chiffre un lancement défini, pas un catalogue de prestations.",
      },
      {
        q: "Qu'est-ce qu'Arrioph change concrètement ?",
        a: "Arrioph est un cabinet de transformation digitale : data, IA, cloud, technologie. Concrètement : nos décisions créatives s'appuient sur de la donnée réelle, et ce qu'on lance peut se brancher sur de vrais systèmes au lieu de rester une image.",
      },
      {
        q: "Et si on est déjà lancés ?",
        a: "Alors on parle de relancement : repositionnement, changement de cap, nouveau marché. Même protocole. En revanche, si vous cherchez une agence pour exécuter un plan déjà écrit, on n'est pas les bons, et on vous le dira vite.",
      },
    ],
  },
  cta: {
    eyebrow: "PROCHAINE ÉTAPE",
    availability: "Prochaine disponibilité :",
    title: "Racontez-nous ce que vous construisez.",
    body: "Pas besoin de brief. Une séance d'écoute, trente minutes, sans engagement.",
    button: "Réserver une séance",
  },
  footer: {
    pagesLabel: "Pages",
    socialsLabel: "Réseaux",
    contactLabel: "Contact",
    rights: "Tous droits réservés.",
    blurb: "Laboratoire de lancement de marque. Positionnement, récit, identité et lancement, formulés avec vous. Par Arrioph.",
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
    title: "THE LAB — Brand launch lab",
    description:
      "We launch brands. Positioning, story, identity and first campaign. Formulated with you, never sold off a catalogue. By Arrioph.",
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
      "We work with brands at the moment that decides everything: the launch. You don't arrive with a brief, you arrive with a project. We write the brief together.",
    primary: "Book a session",
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
    services: "Services",
    method: "Method",
    contact: "Contact",
  },
  approach: {
    eyebrow: "WHERE WE STAND",
    title: "We don't sell services.\nWe formulate brands.",
    p1: "Most agencies do everything. We do one thing: the launch. The moment the brand doesn't exist yet, when everything is still open, when a single positioning decision outweighs ten years of communication.",
    p2: "We don't open with a proposal. We open by listening. You tell us what you're building, we look for what's actually at stake, then we formulate it with you. Behind us, Arrioph's data, AI and technology expertise proves what instinct alone cannot.",
    name: "THE LAB",
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
    "A failed launch can't be repaired, only restarted. That's why we listen before we propose, formulate before we produce, and measure before we call it done.",
  process: {
    eyebrow: "PROTOCOL",
    title: "Services",
    steps: [
      {
        n: "01",
        title: "Intake",
        body: "One session, no commitment and no quote. You tell us the real project, not the presentable version. We ask questions, we take notes, we sell nothing. By the end, you already know whether we're the right fit.",
        tags: ["Discovery session", "No commitment", "No quote"],
      },
      {
        n: "02",
        title: "Diagnostic",
        body: "We look for what's actually at stake: the market, the competition, what your audience already believes. Arrioph brings the data. You get a written reading of your situation, useful even if you stop there.",
        tags: ["Market reading", "Data", "Real stakes"],
      },
      {
        n: "03",
        title: "Formulation",
        body: "We build the brand with you: positioning, story, name, identity. Short iterations, out loud, never in a black box. You see the hypotheses we drop as clearly as the ones we keep.",
        tags: ["Positioning", "Story", "Identity", "Naming"],
      },
      {
        n: "04",
        title: "Release",
        body: "We put the brand into the world: digital presence, first campaign, launch content. Then we watch what the market does with it, and adjust. A launch isn't a delivery, it's a measurement.",
        tags: ["Launch campaign", "Digital presence", "Measurement"],
      },
    ],
  },
  // Testimonials removed
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    title: "FAQ",
    items: [
      {
        q: "What exactly do you do?",
        a: "Launches. Positioning, story, identity, digital presence and first campaign. No social retainers, no media buying, no production on demand. If what you need isn't a launch, we'll tell you in the first conversation.",
      },
      {
        q: "Why only launches?",
        a: "Because it's the moment the work matters most, and the moment it's most often rushed. A brand launched on weak positioning spends the next ten years compensating. We'd rather be there before that.",
      },
      {
        q: "What does the first conversation look like?",
        a: "A thirty-minute listening session. No brief needed, no fixed budget, no deck. You tell us the project, we ask questions. No quote is sent at this stage.",
      },
      {
        q: "What does it cost?",
        a: "Impossible to say before we know what we're launching. What we can say: scope is decided together after the diagnostic, never before. We price a defined launch, not a catalogue of services.",
      },
      {
        q: "What does Arrioph actually change?",
        a: "Arrioph is a digital transformation firm: data, AI, cloud, technology. In practice: our creative decisions rest on real data, and what we launch can plug into real systems instead of staying an image.",
      },
      {
        q: "What if we've already launched?",
        a: "Then we're talking about a relaunch: repositioning, change of direction, new market. Same protocol. That said, if you're looking for an agency to execute a plan that's already written, we're not the right fit, and we'll say so quickly.",
      },
    ],
  },
  cta: {
    eyebrow: "NEXT STEP",
    availability: "Next opening:",
    title: "Tell us what you're building.",
    body: "No brief required. One listening session, thirty minutes, no commitment.",
    button: "Book a session",
  },
  footer: {
    pagesLabel: "Pages",
    socialsLabel: "Socials",
    contactLabel: "Contact",
    rights: "All rights reserved.",
    blurb: "Brand launch lab. Positioning, story, identity and launch, formulated with you. By Arrioph.",
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
