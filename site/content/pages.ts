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
    intro:
      "Une sélection de lancements et de projets de marque. Chacun part d'une séance d'écoute et se termine par quelque chose qui existe dans le monde réel.",
  },
  services: {
    eyebrow: "PRESTATIONS",
    title: "Ce qu'on fait,\net ce qu'on ne fait pas.",
    intro:
      "Quatre prestations, qui correspondent aux quatre temps du protocole. Elles se prennent ensemble le plus souvent, séparément quand c'est justifié. Jamais au catalogue.",
    deliverablesLabel: "Livrables",
    excludeEyebrow: "HORS PÉRIMÈTRE",
    excludeTitle: "Ce qu'on ne fait pas.",
    excludeIntro:
      "Annoncer ses limites vaut mieux que de les découvrir en cours de route. Si votre besoin est dans cette liste, on vous le dira au premier échange et on vous orientera.",
    excludes: [
      "Retainer social mensuel",
      "Régie et achat média",
      "Production à la demande sans stratégie",
      "Exécution d'un plan déjà écrit ailleurs",
      "SEO de volume et netlinking",
    ],
    // Titre du bloc protocole sur CETTE page uniquement. Le dictionnaire
    // l'appelle « Services », ce qui convient partout ailleurs mais repete ici
    // le nom de la page qu'on est en train de lire.
    processTitle: "Comment on travaille.",
    ctaTitle: "Vous ne savez pas dans quelle case vous êtes ?",
    ctaBody: "C'est le cas le plus fréquent. Une séance d'écoute suffit à le savoir.",
  },
  project: {
    backToWork: "Tous les projets",
    clientLabel: "Client",
    yearLabel: "Année",
    categoryLabel: "Discipline",
    deliverablesLabel: "Livrables",
    nextLabel: "Projet suivant",
    ctaTitle: "Un lancement en préparation ?",
    ctaButton: "Parlons-en",
  },
  studio: {
    eyebrow: "LE LABORATOIRE",
    title: "Un laboratoire,\npas une agence.",
    intro:
      "THE LAB est né dans Arrioph, cabinet de transformation digitale. On y applique la discipline de la R&D : écouter, formuler une hypothèse, la tester, l'ajuster. Une équipe, un protocole, peu de projets à la fois.",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Racontez-nous votre lancement.",
    intro:
      "Quelques lignes suffisent, pas besoin de brief formel. Réservez au passage une séance d'écoute : trente minutes pour comprendre votre projet, sans engagement et sans devis.",
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
    projectType: "Nature du lancement",
    projectTypeOptions: [
      "Lancement de marque",
      "Relancement / repositionnement",
      "Lancement produit",
      "Nouveau marché",
      "Je ne sais pas encore",
    ],
    budget: "Ordre de grandeur",
    budgetOptions: ["À définir ensemble", "< 5 000 €", "5 000 – 15 000 €", "15 000 – 40 000 €", "> 40 000 €"],
    placeholderSelect: "Sélectionner",
    message: "Ce que vous construisez",
    messagePlaceholder:
      "Où vous en êtes, ce que vous lancez, quand. Quelques lignes suffisent, on creusera ensemble.",
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
    slotHint: "Heure de Paris",
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
      "A selection of launches and brand projects. Each one starts with a listening session and ends with something that exists in the real world.",
  },
  services: {
    eyebrow: "SERVICES",
    title: "What we do,\nand what we don't.",
    intro:
      "Four services, matching the four stages of the protocol. Usually taken together, separately when it makes sense. Never off a catalogue.",
    deliverablesLabel: "Deliverables",
    excludeEyebrow: "OUT OF SCOPE",
    excludeTitle: "What we don't do.",
    excludeIntro:
      "Naming your limits beats discovering them mid-project. If your need is on this list, we'll say so in the first conversation and point you elsewhere.",
    excludes: [
      "Monthly social retainer",
      "Media buying",
      "On-demand production without strategy",
      "Executing a plan written elsewhere",
      "Volume SEO and link building",
    ],
    // Titre du bloc protocole sur CETTE page uniquement. Le dictionnaire
    // l'appelle « Services », ce qui convient partout ailleurs mais repete ici
    // le nom de la page qu'on est en train de lire.
    processTitle: "How we work.",
    ctaTitle: "Not sure which box you're in?",
    ctaBody: "That's the most common case. One listening session is enough to find out.",
  },
  project: {
    backToWork: "All projects",
    clientLabel: "Client",
    yearLabel: "Year",
    categoryLabel: "Discipline",
    deliverablesLabel: "Deliverables",
    nextLabel: "Next project",
    ctaTitle: "A launch in the works?",
    ctaButton: "Let's talk",
  },
  studio: {
    eyebrow: "THE LABORATORY",
    title: "A laboratory,\nnot an agency.",
    intro:
      "THE LAB was born inside Arrioph, a digital transformation firm. We apply the discipline of R&D: listen, form a hypothesis, test it, adjust. One team, one protocol, few projects at a time.",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Tell us about your launch.",
    intro:
      "A few lines are enough, no formal brief needed. Book a listening session while you're here: thirty minutes to understand your project, no commitment and no quote.",
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
    projectType: "Kind of launch",
    projectTypeOptions: [
      "Brand launch",
      "Relaunch / repositioning",
      "Product launch",
      "New market",
      "Not sure yet",
    ],
    budget: "Ballpark",
    budgetOptions: ["To define together", "< €5,000", "€5,000 – 15,000", "€15,000 – 40,000", "> €40,000"],
    placeholderSelect: "Select",
    message: "What you're building",
    messagePlaceholder:
      "Where you are, what you're launching, when. A few lines are enough, we'll dig in together.",
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
    slotHint: "Paris time",
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
