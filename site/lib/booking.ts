/**
 * Regles de disponibilite du rendez-vous.
 *
 * Partage entre le client (pour afficher le calendrier) et le serveur (pour
 * revalider ce qui est soumis). Un creneau valide cote client ne prouve rien :
 * n'importe qui peut poster le formulaire a la main, donc le serveur rejoue
 * exactement les memes regles.
 *
 * Tout est manipule en chaines `YYYY-MM-DD` et `HH:MM`, jamais en objets Date
 * serialises. Un `Date` traverse la frontiere client/serveur en UTC et decale
 * la journee d'un cran pour tout visiteur a l'est de Greenwich — un rendez-vous
 * pris le 3 arriverait le 2.
 */

export const BOOKING = {
  /** 1 = lundi ... 5 = vendredi. Le week-end est ferme. */
  openDays: [1, 2, 3, 4, 5],
  /** Delai minimum avant un rendez-vous, en jours ouvres. */
  leadDays: 1,
  /** Horizon de reservation, en jours calendaires. */
  horizonDays: 60,
  slots: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ],
  /**
   * Fuseau de reference des creneaux. Les horaires sont des chaines simples,
   * sans conversion : ce champ dit dans QUEL fuseau il faut les lire, et c'est
   * lui que l'interface affiche. Casablanca plutot que Paris parce que c'est la
   * premiere ville annoncee, ce sont les premiers numeros, et le Maroc ne change
   * pas d'heure — donc l'ecart avec Paris varie d'une heure selon la saison, et
   * annoncer Paris ferait arriver un client marocain a la mauvaise heure la
   * moitie de l'annee.
   */
  timezone: "Africa/Casablanca",
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` a partir des composantes locales, sans passage par UTC. */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;

  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));

  // Rejette les dates qui "debordent" (31 fevrier devient 3 mars).
  if (toDateKey(date) !== key) return null;
  return date;
}

function isOpenDay(date: Date): boolean {
  return (BOOKING.openDays as readonly number[]).includes(date.getDay());
}

/** Premiere date reservable : `leadDays` jours ouvres apres aujourd'hui. */
export function firstBookableDate(today = new Date()): Date {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let remaining = BOOKING.leadDays;

  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    if (isOpenDay(date)) remaining -= 1;
  }

  while (!isOpenDay(date)) date.setDate(date.getDate() + 1);
  return date;
}

export function lastBookableDate(today = new Date()): Date {
  return new Date(today.getTime() + BOOKING.horizonDays * DAY_MS);
}

export function isBookable(key: string, today = new Date()): boolean {
  const date = fromDateKey(key);
  if (!date) return false;
  if (!isOpenDay(date)) return false;

  const first = firstBookableDate(today);
  const last = lastBookableDate(today);
  return date.getTime() >= first.getTime() && date.getTime() <= last.getTime();
}

export function isValidSlot(slot: string): boolean {
  return (BOOKING.slots as readonly string[]).includes(slot);
}

/** Grille du mois, alignee sur un lundi, pour l'affichage du calendrier. */
export function monthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  // getDay() renvoie 0 pour dimanche : on decale pour demarrer la semaine lundi.
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (string | null)[] = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toDateKey(new Date(year, month, day)));
  }
  return cells;
}

export function formatDate(key: string, locale: string): string {
  const date = fromDateKey(key);
  if (!date) return key;

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
