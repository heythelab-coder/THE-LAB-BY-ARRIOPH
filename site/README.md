# THE LAB — site

Site vitrine bilingue (FR/EN) construit avec **Next.js 15 (App Router) + Tailwind CSS**.
Structure et mise en page inspirées du template Framer « Vence » ; contenu, visuels et identité sont ceux de THE LAB.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000. `/` redirige automatiquement vers `/fr` ou `/en`
selon la langue du navigateur.

Build de production :

```bash
npm run build && npm start
```

## Où modifier quoi

| Ce que vous voulez changer | Fichier |
| --- | --- |
| Textes de l'accueil (FR et EN) | `content/dictionary.ts` |
| Textes des pages internes (FR et EN) | `content/pages.ts` |
| **Projets** — slug, visuel, année, client, textes | `content/projects.ts` |
| Règles de disponibilité du rendez-vous | `lib/booking.ts` |
| Email, téléphone, ville, réseaux sociaux | `content/site.ts` |
| Logos clients (fichier + calage optique `scale`) | `content/site.ts` → `CLIENTS` |
| Étapes du process, FAQ, témoignages | `content/dictionary.ts` |
| Couleurs, polices, animations | `tailwind.config.ts` |
| Dégradé du hero et du bloc CTA | `app/globals.css` → classe `.mesh` |
| Images projets | `public/work/` |
| Logos clients | `public/clients/` |
| Vidéo du bloc studio | `public/video/approach.mp4` |
| Visuels Process et FAQ | `public/editorial/` |

`content/dictionary.ts` et `content/pages.ts` contiennent chacun deux objets,
`fr` et `en`, de structure identique. TypeScript signale une erreur si vous
oubliez de traduire une clé — c'est voulu.

`content/projects.ts` est la **source unique** des projets : tout ce qui est
neutre (slug, visuel, année, client) y est déclaré une fois, seul le texte est
localisé. Les projets vivaient auparavant en double dans le dictionnaire, ce qui
garantissait la désynchronisation dès qu'on touchait à une image.

## À remplacer avant la mise en ligne

- `content/site.ts` : `SITE_URL`, email, téléphone, clients et liens réseaux sont des
  **placeholders**. `SITE_URL` alimente l'Open Graph, le sitemap et les liens canoniques —
  s'il reste faux, les aperçus de partage et le référencement pointeront dans le vide.
- Une image Open Graph (1200×630) dans `app/opengraph-image.png` : sans elle, les partages
  sur LinkedIn et WhatsApp sortent sans visuel.
- `content/dictionary.ts` : **les années des projets sont vides** sauf Beyond Fears
  (2026, lisible sur le visuel). Le séparateur se masque tout seul tant que le champ
  `year` est vide — il suffit de le remplir.
- Les descriptions des 5 projets décrivent ce que montre le visuel. À reprendre
  avec le vrai périmètre de chaque mission.
- Les 6 témoignages sont encore des exemples.
- Le logo `REFERENCE/2.png` (triangle orange) n'a pas été intégré : marque non
  identifiée avec certitude. À ajouter dans `CLIENTS` une fois le nom connu.

  Le bandeau défilant n'impose aucune contrainte de nombre : ajoutez ou retirez
  des entrées de `CLIENTS` librement, la boucle reste raccord.
- `public/work/1.jpg` à `7.jpg` sont les anciens visuels de marque, désormais
  inutilisés par la grille projets — supprimables.
- Une vignette (`poster`) pour `public/video/approach.mp4` : sans elle, le bloc
  reste sur son fond sombre le temps du chargement. Extraire une image avec
  `ffmpeg -i approach.mp4 -vframes 1 poster.jpg`, puis la passer à `<VideoPanel poster="…" />`.

## Sections

1. `Hero` — dégradé animé plein écran, deux CTA
2. `Approach` — texte + vidéo d'ambiance
3. `Clients` — bandeau défilant, 11 logos (pause au survol)
4. `Work` — grille asymétrique, 5 projets
5. `Quote` — citation, remplissage piloté par le scroll
6. `Process` — 3 étapes numérotées, visuel + tags
7. `Testimonials` — carrousel infini (pause au survol)
8. `Faq` — accordéon + visuel de colonne
9. `Cta` — bloc contact
10. `Footer` — logotype détouré en signature

## Échelle typographique

Relevée sur la référence et centralisée dans `app/globals.css` — utilisez ces classes
plutôt que des tailles en dur :

| Classe | Usage | Valeur |
| --- | --- | --- |
| `.t-h1` | titre du hero | Sentient 64px / 1 / -0.04em |
| `.t-h2` | titres de section | Inter 32px / 1.2 / -0.02em |
| `.t-h3` | titres de projet et d'étape | Inter 24px / 1.2 / -0.02em |
| `.t-quote` | citation | Sentient 40px / 1.1 / -0.04em |
| `.t-cta` | titre du bloc contact | Sentient 48px / 1 / -0.04em |
| `.t-lead` | chapeaux | Inter 20px / 1.2 |
| `.t-body` | texte d'interface, ligne unique | Inter 16px / 1.25 |
| `.t-prose` | **paragraphes de lecture** | Inter 16px / 1.55 |
| `.t-meta` | métadonnées, légendes | Inter 14.4px / 1.2 |
| `.eyebrow` | sur-titres | Inter 12px, majuscules, +0.1em |

`.t-display` s'ajoute à cette échelle pour les titres de section (Sentient, jusqu'à
64px) : la référence tient tout entre 12 et 32px, un rapport de 2,6 qui aplatit la
page. Passer les titres de section à l'échelle display porte ce rapport à 5,3.

Rythme vertical : `.section` = 64px de padding haut et bas, soit **128px entre deux
sections**.

Grille projets : les visuels sont affichés en **niveaux de gris avec un léger
gain de contraste**, et repassent en couleur au survol. Les images viennent de
contextes très différents (studio gris, ciel bleu saturé, dégradé bleu nuit) :
côte à côte, les températures de couleur se cognent et la grille ne lit plus
comme une série. Le gain de contraste compense l'aplatissement que produit
toujours une désaturation. La page projet, elle, affiche le visuel en couleur —
seul, il n'a aucun problème de cohérence.

L'asymétrie vient de la **largeur** (5/7 puis 7/5), jamais d'un
décalage vertical. Les cartes d'une même rangée partagent une **hauteur fixe** —
avec un ratio commun, deux colonnes de largeurs différentes donneraient deux
hauteurs différentes et les légendes ne s'aligneraient plus.

Écart assumé avec la référence : Vence utilise un interligne de 1.2 partout, y compris
sur ses paragraphes. C'est tenable sur des textes courts en anglais, illisible sur des
paragraphes français plus longs. D'où la séparation `.t-body` (interface) / `.t-prose`
(lecture). Utilisez `.t-prose` dès qu'un texte dépasse deux lignes.

## Pages

| Route | Contenu |
| --- | --- |
| `/[lang]` | Accueil |
| `/[lang]/work` | Index des projets |
| `/[lang]/work/[slug]` | Page projet (5 projets × 2 langues) |
| `/[lang]/studio` | Le studio — approche, process, clients, témoignages, FAQ |
| `/[lang]/contact` | Formulaire + prise de rendez-vous |

Nav et pied de page vivent dans `app/[lang]/layout.tsx` : toutes les pages en
héritent et la nav ne se remonte pas entre deux navigations.

## Formulaire de contact et rendez-vous

**Rien n'est envoyé nulle part tant que vous n'avez rien configuré.** Copiez
`.env.example` en `.env.local` et remplissez au moins un canal.

L'action serveur (`app/actions/contact.ts`) tente trois canaux et considère la
demande reçue dès qu'un seul aboutit :

1. **Email via Resend** — `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`
2. **Webhook JSON** — `CONTACT_WEBHOOK_URL` (Slack, Make, n8n, Zapier…)
3. **Fichier local** — `.data/requests.jsonl`

Si aucun n'aboutit, le visiteur voit une erreur et l'adresse email directe —
jamais un faux « message envoyé ». **En production sur Vercel ou Netlify, le
système de fichiers est éphémère** : sans Resend ni webhook, les demandes sont
perdues. Le fichier local ne suffit qu'en développement ou en auto-hébergement.

`.data/` contient des données personnelles et n'est jamais versionné.

### Règles de disponibilité

Dans `lib/booking.ts`, partagées entre le calendrier et la validation serveur —
un créneau validé côté client ne prouve rien, le serveur rejoue les mêmes règles.

| Réglage | Valeur |
| --- | --- |
| Jours ouverts | lundi → vendredi |
| Délai minimum | 1 jour ouvré |
| Horizon | 60 jours |
| Créneaux | 09:00–11:30 et 14:00–17:00, toutes les 30 min |

Il n'y a **aucune connexion à un vrai agenda** : les créneaux viennent de ces
règles, pas de vos disponibilités réelles. Deux personnes peuvent réserver le
même horaire. Pour une vraie synchronisation, brancher Google Calendar ou Cal.com
dans l'action serveur.

### Anti-spam

Champ piège invisible (`website`) et rejet des envois faits en moins de trois
secondes. Pas de CAPTCHA : ça suffit contre les robots courants sans imposer
d'épreuve au visiteur.

## Système de mouvement

Un seul easing sur tout le site : `cubic-bezier(0.16, 1, 0.3, 1)` (« expo out »), exposé
en `ease-expo`. Départ franc, arrivée qui glisse. Trois durées seulement :

| Durée | Usage |
| --- | --- |
| 300–500ms | survols, micro-états |
| 700ms | morphing de la nav |
| 900–1200ms | apparitions au scroll, parallaxe |

### Couche globale

Montée dans `app/[lang]/layout.tsx`, chaque pièce se désactivant elle-même :

| Composant | Rôle | Désactivé si |
| --- | --- | --- |
| `SmoothScroll` | défilement interpolé (Lenis, `lerp: 0.1`) | reduced-motion, écran tactile |
| `PageTransitions` | volet entre les pages (View Transitions) | reduced-motion, API absente |
| `Cursor` | curseur maison, états contextuels | reduced-motion, écran tactile |
| `Intro` | rideau d'ouverture, une fois par session | reduced-motion |

**Transitions de page** : le drapeau `experimental.viewTransition` de Next active
le composant `<ViewTransition>` de React, **pas** les transitions automatiques du
routeur — vérifié en instrumentant l'API, zéro appel sur un clic de `<Link>`.
D'où l'interception explicite dans `PageTransitions`, en phase de **capture**
avec `stopPropagation` : sans ça, `<Link>` déclenche une seconde navigation qui
court-circuite la transition.

Conséquence à connaître : un `onClick` posé sur un `<a>` interne ne s'exécutera
jamais, l'événement étant arrêté avant d'atteindre React. C'est pourquoi le menu
mobile se referme sur un changement de `pathname` et non au clic.

L'état du curseur se déclare par attribut sur l'élément survolé, pas par une
liste de sélecteurs centralisée :

```html
<a data-cursor="view" data-cursor-label="Voir">   <!-- disque + libellé -->
<div data-cursor="hidden">                        <!-- curseur masqué -->
```

### Composants de mouvement

- `Reveal` — fondu + montée d'un bloc entier à l'entrée dans le viewport.
- `RevealText` — révélation par masque, mot à mot. Réservée aux titres.
  Baisser `stagger` sur les textes longs (22ms sur la citation, 40–55ms ailleurs).
- `Parallax` — décalage interne du média pendant le scroll, en `transform` seul,
  piloté par `requestAnimationFrame`. Neutralisé si `prefers-reduced-motion`.
- `ActionLink` — bouton dont le libellé roule au survol, avec attraction magnétique.
- `MediaReveal` — dévoilement d'un média par `clip-path` montant, contenu
  légèrement sur-dimensionné revenant à l'échelle 1. Les deux mouvements en sens
  inverse donnent la profondeur. À préférer au `Reveal` générique sur les images :
  un fondu-translation fait glisser le cadre, pas le contenu.
- `Magnetic` — attraction vers le pointeur, plafonnée à une fraction de la
  distance. Au-delà, le bouton se décolle de sa zone cliquable.
- `VideoPanel` — vidéo d'ambiance décorative (muette, en boucle, `playsInline`).
  Toujours visible : aucune opacité pilotée par JavaScript, sinon un événement de
  chargement manqué laisse la vidéo invisible. Le fond sombre du conteneur sert
  de vignette le temps que la première image arrive.
- `ScrollText` — remplissage du texte piloté par le scroll, caractère par
  caractère. Utilisé sur la citation. Ne pas l'employer sur des paragraphes :
  du texte de lecture à 18 % d'opacité est illisible.

## Identité

- `components/LabMark.tsx` — monogramme (six disques en hexagone) redessiné en
  SVG plutôt que découpé dans le JPG source : fond transparent, net à toute
  taille, aucune requête, et la couleur suit `currentColor`. Utilisé dans la nav,
  avec le nom « THE LAB » en libellé masqué pour les lecteurs d'écran.
- `public/brand/wordmark.png` — logotype « The Lab by Arrioph » qui ferme le pied
  de page. Détouré depuis `7.jpg` par keying sur le canal minimum : le fond bleu
  y plafonnait à 139 quand le texte était à 253, d'où une séparation nette et
  aucune frange colorée. 10 Ko au lieu de 139 Ko.

  **Il est plafonné à 420 px de large.** Le logotype ne mesure que 659 px dans le
  fichier source, donc au-delà il devient mou sur un écran Retina. Pour
  l'afficher plus grand, il faut un export vectoriel (SVG) ou une image plus
  définie — le dossier `LOGO/` contient une autre marque, pas ce logotype.

## Accessibilité

- Lien d'évitement en premier élément focusable, anneaux de focus au clavier partout.
- Contrastes remontés à un minimum de 4.5:1 (les gris à 35–45% d'opacité échouaient).
- Ancres décalées de `--nav-offset` pour ne pas passer sous la nav fixe.
- Menu mobile : scroll bloqué, fermeture avec Échap.
- FAQ : `aria-expanded` / `aria-controls` / `role="region"`, panneaux repliés en `inert`.
- Bandeaux défilants : la seconde copie est `aria-hidden` (sinon tout est lu deux fois).
- Sans JavaScript, un `<noscript>` force l'affichage des blocs animés à l'apparition.
- `prefers-reduced-motion` neutralise animations et transitions.

## Attention

Le dev server et `npm run build` ne peuvent pas tourner en même temps (ils écrivent tous
les deux dans `.next`). Arrêtez `npm run dev` avant de lancer un build.

## Déploiement

Le plus simple : **Vercel**. Importer le dossier `site/` comme projet, aucun réglage
particulier n'est nécessaire (Next.js détecté automatiquement).
Netlify fonctionne aussi avec le plugin Next.js officiel.

## Notes techniques

- Typographies : **Sentient** (titres, chargée depuis Fontshare) et **Inter** (texte, via `next/font`).
- Les deux langues sont pré-générées en statique au build (`generateStaticParams`).
- `middleware.ts` gère la redirection de langue.
- Les animations d'apparition au scroll passent par `components/Reveal.tsx` (IntersectionObserver),
  et respectent `prefers-reduced-motion`.
