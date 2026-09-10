import type { Locale } from "./dictionary";

/**
 * Textes des pages internes (projets, contact, studio, 404).
 *
 * Fichier separe de `dictionary.ts`, qui porte deja tout le contenu de la page
 * d'accueil : un seul fichier de 800 lignes rend chaque relecture penible et
 * les conflits de fusion illisibles.
 *
 * Meme discipline qu'ailleurs : le type est derive de la version francaise, donc
 * TypeScript signale toute cle oubliee en anglais.
 */

export const pagesFr = {
  work: {
    eyebrow: "TOUS LES PROJETS",
    title: "Projets",
    /**
     * L'ancienne phrase presentait chaque projet comme un lancement complet.
     * La selection contient surtout des missions de contenu, de campagne et
     * d'identite : autant le dire, la page detaille de toute facon le
     * perimetre reel de chacune.
     */
    intro:
      "Des projets de tailles différentes : identité, campagne, contenu de marque, photo et vidéo. Chaque page dit ce qu'on nous a demandé, et ce qu'on a rendu.",
  },
  services: {
    eyebrow: "CE QU'ON FAIT",
    title: "Cinq métiers,\nassemblés selon le projet.",
    intro:
      "On les prend rarement tous. Selon ce qui existe déjà, un projet peut aller de la stratégie jusqu'à la campagne, ou se limiter à un site, une identité, un calendrier de contenus.",
    deliverablesLabel: "Ce que vous recevez",
    /**
     * Ce bloc listait cinq refus, dont un — le suivi social mensuel — que le
     * studio pratique reellement. Une liste d'exclusions se perime vite et
     * ferme des portes que rien n'oblige a fermer. Elle est remplacee par des
     * engagements : meme fonction (dire a quoi s'attendre, eviter les mauvais
     * rendez-vous), sans se contredire six mois plus tard.
     */
    engageEyebrow: "CADRE DE TRAVAIL",
    engageTitle: "Comment on s'engage.",
    engageIntro:
      "Quelques principes qui valent mieux qu'une liste de refus : ils disent comment on cadre un projet, et ce que vous pouvez attendre de nous une fois qu'il a commencé.",
    engagePoints: [
      "Ce qu'on fait se décide après l'écoute, jamais avant.",
      "Peu de projets à la fois, pour rester disponibles quand ça s'accélère.",
      "Les mêmes personnes de la première séance à la mise en ligne.",
      "Quand un besoin sort de notre terrain, on le dit et on oriente.",
      "Ce qu'on livre doit pouvoir vivre sans nous.",
    ],
    ctaTitle: "Vous ne savez pas par où commencer ?",
    ctaBody: "C'est le cas le plus fréquent. Une séance d'écoute suffit à y voir clair.",
  },
  project: {
    backToWork: "Tous les projets",
    clientLabel: "Client",
    yearLabel: "Année",
    categoryLabel: "Métier",
    deliverablesLabel: "Ce qu'on a rendu",
    nextLabel: "Projet suivant",
    ctaTitle: "Un projet du même ordre ?",
    ctaButton: "Parlons-en",
  },
  studio: {
    eyebrow: "LE STUDIO",
    /**
     * L'ancien titre — « Un laboratoire, pas une agence » — se definissait
     * contre les autres. Il posait aussi une frontiere que la page suivante
     * contredisait. On garde l'esprit laboratoire, on retire l'opposition.
     */
    title: "Une équipe réduite,\nau contact du projet.",
    intro:
      "On travaille avec les fondateurs et les équipes qui lancent quelque chose. Peu de projets à la fois, les mêmes personnes de la première séance à la mise en ligne, et une préférence assumée pour les décisions prises à voix haute plutôt que dévoilées à la fin.",
    principlesEyebrow: "COMMENT ON TRAVAILLE ENSEMBLE",
    principlesTitle: "Ce qui change,\nconcrètement.",
    principles: [
      {
        label: "Celui qui écoute est celui qui produit",
        body: "Pas de passage de dossier entre une équipe qui vend et une équipe qui exécute. Ce qui se dit en séance arrive intact dans le travail.",
      },
      {
        label: "Peu de projets à la fois",
        body: "C'est la condition pour rester joignables quand un lancement s'accélère, et pour que les délais annoncés tiennent.",
      },
      {
        label: "Les décisions à voix haute",
        body: "Vous voyez les pistes écartées autant que celles retenues, pendant le travail et non dans une présentation finale.",
      },
      {
        label: "Ce qu'on livre doit vivre sans nous",
        body: "Un système que votre équipe peut reprendre et faire évoluer, pas un fichier qu'il faut nous redemander à chaque besoin.",
      },
    ],
    partnerLabel: "Avec Arrioph",
    partnerBody:
      "Arrioph est notre partenaire sur le conseil. Quand un projet dépasse la marque et touche à l'organisation ou aux outils, on s'appuie sur eux plutôt que de faire semblant.",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Parlons de votre projet.",
    /**
     * Ce qu'on annonce ici doit correspondre exactement a ce qui se passe
     * ensuite : une conversation, pas une etude offerte. Le diagnostic ecrit
     * fait partie d'une mission, il n'est pas un cadeau de bienvenue.
     */
    intro:
      "Quelques lignes suffisent, pas besoin de brief formel. Vous pouvez aussi réserver une séance d'écoute : une trentaine de minutes pour comprendre où vous en êtes, ce que vous lancez et si on est les bons pour le faire. Sans engagement, et sans devis à ce stade.",
    directLabel: "Écrire directement",
    phoneLabel: "Téléphone",
    cityLabel: "Studio",
    responseLabel: "Délai de réponse",
    responseValue: "Sous 24 h ouvrées",
  },
  form: {
    legendProject: "Votre projet",
    legendMeeting: "Séance d'écoute",
    legendMeetingHint: "Facultatif : laissez vide si vous préférez qu'on vous écrive.",
    name: "Nom",
    namePlaceholder: "Prénom et nom",
    email: "Email",
    emailPlaceholder: "vous@societe.com",
    company: "Société",
    companyPlaceholder: "Facultatif",
    projectType: "Nature du projet",
    projectTypeOptions: [
      "Lancement de marque",
      "Nouvelle offre ou produit",
      "Refonte de la marque",
      "Nouveau marché",
      "Site web",
      "Je ne sais pas encore",
    ],
    budget: "Ordre de grandeur",
    budgetOptions: ["À définir ensemble", "Moins de 5 000 €", "5 000 à 15 000 €", "15 000 à 40 000 €", "Plus de 40 000 €"],
    placeholderSelect: "Sélectionner",
    message: "Ce que vous construisez",
    messagePlaceholder:
      "Où vous en êtes, ce que vous préparez, pour quand. Quelques lignes suffisent, on creusera ensemble.",
    consent:
      "J'accepte que ces informations soient utilisées pour traiter ma demande. Elles ne sont ni revendues ni transmises à des tiers.",
    submit: "Envoyer la demande",
    submitting: "Envoi…",
    required: "obligatoire",
    optional: "facultatif",
    successTitle: "Demande envoyée.",
    successBody:
      "On revient vers vous sous 24 h ouvrées. Si vous avez réservé un créneau, vous recevrez la confirmation par email.",
    successAgain: "Envoyer une autre demande",
    errors: {
      name: { required: "Indiquez votre nom." },
      email: { invalid: "Cette adresse email ne semble pas valide." },
      message: { tooShort: "Donnez-nous un peu plus de contexte (20 caractères minimum)." },
      consent: { required: "Votre accord est nécessaire pour traiter la demande." },
      date: {
        required: "Choisissez une date pour ce créneau.",
        unavailable: "Cette date n'est plus disponible.",
      },
      slot: { required: "Choisissez un créneau horaire.", invalid: "Ce créneau n'existe pas." },
      form: {
        spam: "Envoi refusé. Réessayez, ou écrivez-nous directement par email.",
        delivery:
          "Impossible d'enregistrer votre demande pour le moment. Écrivez-nous directement par email : le message ci-dessous est encore dans le formulaire.",
      },
    },
  },
  booking: {
    dateLabel: "Date souhaitée",
    slotLabel: "Créneau",
    slotHint: "Heure de Casablanca (UTC+1)",
    noDate: "Sélectionnez d'abord une date.",
    clear: "Effacer",
    previousMonth: "Mois précédent",
    nextMonth: "Mois suivant",
    weekdays: ["L", "M", "M", "J", "V", "S", "D"],
    closedHint: "Rendez-vous du lundi au vendredi.",
    selected: "Sélectionné",
  },
  notFound: {
    title: "Page introuvable",
    body: "Le lien est peut-être obsolète, ou l'adresse mal recopiée.",
    home: "Retour à l'accueil",
    work: "Voir les projets",
  },
};

export type PagesCopy = typeof pagesFr;

export const pagesEn: PagesCopy = {
  work: {
    eyebrow: "ALL PROJECTS",
    title: "Work",
    intro:
      "Projects of different sizes: identity, campaign, brand content, photo and film. Each page says what we were asked to do, and what we handed over.",
  },
  services: {
    eyebrow: "WHAT WE DO",
    title: "Five crafts,\nassembled per project.",
    intro:
      "We rarely take all five. Depending on what already exists, a project can run from strategy through to campaign, or stop at a site, an identity, a publishing calendar.",
    deliverablesLabel: "What you get",
    engageEyebrow: "HOW WE ENGAGE",
    engageTitle: "What you can expect.",
    engageIntro:
      "A few commitments, worth more than a list of refusals: they say how we frame a project, and what you can expect from us once it has started.",
    engagePoints: [
      "What we do is decided after the listening session, never before.",
      "Few projects at a time, so we stay reachable when things speed up.",
      "The same people from the first session to going live.",
      "When a need falls outside our ground, we say so and point elsewhere.",
      "What we hand over has to work without us.",
    ],
    ctaTitle: "Not sure where to start?",
    ctaBody: "That's the most common case. One listening session is usually enough.",
  },
  project: {
    backToWork: "All projects",
    clientLabel: "Client",
    yearLabel: "Year",
    categoryLabel: "Craft",
    deliverablesLabel: "What we handed over",
    nextLabel: "Next project",
    ctaTitle: "Something similar in the works?",
    ctaButton: "Let's talk",
  },
  studio: {
    eyebrow: "THE STUDIO",
    title: "A small team,\nclose to the work.",
    intro:
      "We work with founders and teams launching something. Few projects at a time, the same people from the first session to going live, and a deliberate preference for decisions made out loud rather than unveiled at the end.",
    principlesEyebrow: "HOW WE WORK TOGETHER",
    principlesTitle: "What that changes,\nin practice.",
    principles: [
      {
        label: "The people who listen are the people who build",
        body: "No handover between a team that sells and a team that executes. What gets said in the session arrives intact in the work.",
      },
      {
        label: "Few projects at a time",
        body: "That's what keeps us reachable when a launch speeds up, and what makes the dates we give you hold.",
      },
      {
        label: "Decisions made out loud",
        body: "You see the routes we drop as clearly as the ones we keep, during the work rather than in a final presentation.",
      },
      {
        label: "What we hand over has to work without us",
        body: "A system your team can pick up and extend, not a file you have to ask us for every time.",
      },
    ],
    partnerLabel: "With Arrioph",
    partnerBody:
      "Arrioph is our partner on consulting. When a project reaches past the brand into how the company runs or what it runs on, we lean on them instead of pretending.",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Let's talk about your project.",
    intro:
      "A few lines are enough, no formal brief needed. You can also book a listening session: about thirty minutes to understand where you are, what you're launching and whether we're the right people for it. No commitment, and no quote at this stage.",
    directLabel: "Email directly",
    phoneLabel: "Phone",
    cityLabel: "Studio",
    responseLabel: "Response time",
    responseValue: "Within 24 working hours",
  },
  form: {
    legendProject: "Your project",
    legendMeeting: "Listening session",
    legendMeetingHint: "Optional: leave blank if you'd rather we email you.",
    name: "Name",
    namePlaceholder: "First and last name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    company: "Company",
    companyPlaceholder: "Optional",
    projectType: "Kind of project",
    projectTypeOptions: [
      "Brand launch",
      "New offer or product",
      "Repositioning",
      "New market",
      "Website",
      "Not sure yet",
    ],
    budget: "Ballpark",
    budgetOptions: ["To define together", "Under €5,000", "€5,000 to 15,000", "€15,000 to 40,000", "Over €40,000"],
    placeholderSelect: "Select",
    message: "What you're building",
    messagePlaceholder:
      "Where you are, what you're preparing, and by when. A few lines are enough, we'll dig in together.",
    consent:
      "I agree to these details being used to handle my request. They are never sold or passed to third parties.",
    submit: "Send request",
    submitting: "Sending…",
    required: "required",
    optional: "optional",
    successTitle: "Request sent.",
    successBody:
      "We'll get back to you within 24 working hours. If you booked a slot, confirmation follows by email.",
    successAgain: "Send another request",
    errors: {
      name: { required: "Please enter your name." },
      email: { invalid: "That email address doesn't look valid." },
      message: { tooShort: "Give us a bit more context (20 characters minimum)." },
      consent: { required: "We need your agreement to handle the request." },
      date: {
        required: "Pick a date for this slot.",
        unavailable: "That date is no longer available.",
      },
      slot: { required: "Pick a time slot.", invalid: "That slot doesn't exist." },
      form: {
        spam: "Submission refused. Try again, or email us directly.",
        delivery:
          "We couldn't record your request right now. Please email us directly: your message is still in the form below.",
      },
    },
  },
  booking: {
    dateLabel: "Preferred date",
    slotLabel: "Time slot",
    slotHint: "Casablanca time (UTC+1)",
    noDate: "Pick a date first.",
    clear: "Clear",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    closedHint: "Meetings Monday to Friday.",
    selected: "Selected",
  },
  notFound: {
    title: "Page not found",
    body: "The link may be out of date, or the address mistyped.",
    home: "Back to home",
    work: "View work",
  },
};

const pages: Record<Locale, PagesCopy> = { fr: pagesFr, en: pagesEn };

export function getPages(locale: Locale): PagesCopy {
  return pages[locale] ?? pagesFr;
}
