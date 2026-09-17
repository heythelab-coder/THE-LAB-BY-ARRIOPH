# Site 4Lab — note de reprise

Bonjour Mehdi,

Le site de 4Lab est prêt à être mis en ligne. Cette note dit quoi en faire,
dans l'ordre, et ce qui reste à décider.

---

## Ce que c'est

Un site **Next.js 15** (App Router, TypeScript), bilingue français / anglais.

Point important : **ce n'est pas un site statique.** Il lui faut un serveur
Node pour trois raisons :

1. `middleware.ts` redirige `/` vers `/fr` ou `/en` selon la langue du
   navigateur. Il n'existe aucune page racine — sans le middleware, le domaine
   nu tombe sur du vide.
2. Le formulaire de contact est une **action serveur** (`app/actions/contact.ts`).
3. Les images sont converties en AVIF/WebP à la demande par `next/image`.

Déposer les fichiers dans un dossier `public_html` ne fonctionnera pas.

---

## Le dépôt

Tout est sur GitHub, cette archive n'en est qu'une copie :

```
https://github.com/heythelab-coder/THE-LAB-BY-ARRIOPH
```

Le code du site est dans le sous-dossier **`site/`**, pas à la racine.
C'est le piège classique au moment du déploiement.

---

## Lancer en local

```bash
cd site
npm install
npm run dev
```

Puis `http://localhost:3000`. Node 20.9 minimum (verrouillé dans `package.json`).

---

## Mise en ligne — option recommandée : Vercel

Vercel est édité par les auteurs de Next.js, tout fonctionne sans adaptation,
et le niveau gratuit suffit pour ce site.

1. `vercel.com`, se connecter avec GitHub
2. **Add New → Project**, importer `THE-LAB-BY-ARRIOPH`
3. **Root Directory** : choisir **`site`** ← indispensable
4. **Deploy**

On obtient une adresse `.vercel.app` fonctionnelle en quelques minutes.
Chaque `git push` redéploie ensuite automatiquement.

### Variables d'environnement à ajouter

Dans **Settings → Environment Variables**. Sans elles, le formulaire de
contact n'envoie rien et **les demandes des prospects sont perdues sans
message d'erreur visible côté studio**. À faire avant d'ouvrir le domaine.

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API Resend (resend.com) |
| `CONTACT_TO` | Adresse qui reçoit les demandes |
| `CONTACT_FROM` | Expéditeur, sur un domaine vérifié chez Resend |

Une alternative existe : `CONTACT_WEBHOOK_URL` (Slack, Make, n8n, Zapier).
Un seul des deux canaux suffit. Détail dans `.env.example`.

---

## Le domaine — c'est là qu'on a besoin de toi

`4lab.arrioph.com` pointe aujourd'hui vers `138.201.14.18`, le serveur cPanel.

Vérification faite sur la DNS publique : la zone `arrioph.com` est servie par
**Microsoft 365** :

```
ns1.bdm.microsoftonline.com
ns2.bdm.microsoftonline.com
ns3.bdm.microsoftonline.com
ns4.bdm.microsoftonline.com
```

Conséquence : **le Zone Editor de cPanel est sans effet.** On peut y créer
des enregistrements, internet ne les lira jamais. La modification doit se
faire dans le compte Microsoft 365 d'Arrioph.

### L'enregistrement à créer

Une fois le domaine ajouté dans Vercel (**Settings → Domains**), Vercel
affiche la valeur exacte. Ce sera un CNAME de cette forme :

| Champ | Valeur |
|---|---|
| Nom | `4lab` |
| Type | `CNAME` |
| Valeur | celle affichée par Vercel (typiquement `cname.vercel-dns.com`) |

Reprendre la valeur donnée par Vercel, elle varie selon les comptes.
Le certificat HTTPS s'installe ensuite tout seul.

### Autre voie possible

Si le cPanel dispose de **Setup Node.js App** (section Software), le site
peut y tourner directement et la DNS reste inchangée, puisqu'elle pointe déjà
sur ce serveur. Plus manuel : envoi des fichiers, `npm install`, `npm run build`,
configuration du proxy Passenger, et à refaire à chaque modification.

---

## Ce qui reste ouvert

Trois valeurs appartiennent au studio et ne sont pas renseignées :

- **Liens réseaux** — les quatre entrées de `SOCIALS` dans `content/site.ts`
  pointent vers les pages d'accueil d'Instagram, LinkedIn, YouTube et TikTok.
  Il manque le nom de compte après la barre oblique.
- **Adresse email** — `thelab@arrioph.com` est affichée partout. Elle
  fonctionne, mais porte l'ancien nom de la marque.
- **Années des projets** — quatre projets sur cinq n'ont pas de date
  (`content/projects.ts`).

Un point de marque, pas technique : le studio s'appelle 4Lab et son logotype
ne porte plus la mention Arrioph. Un domaine en `arrioph.com` le présente
comme un produit d'Arrioph. À trancher entre vous.

---

## Où se trouve quoi

| Contenu | Fichier |
|---|---|
| Textes de l'accueil (FR + EN) | `content/dictionary.ts` |
| Textes des pages internes | `content/pages.ts` |
| Les cinq métiers | `content/services.ts` |
| Les projets | `content/projects.ts` |
| Coordonnées, logos clients, réseaux | `content/site.ts` |
| Règles de rendez-vous | `lib/booking.ts` |

`README.md` décrit l'architecture en détail. `DEPLOY.md` liste les points à
régler avant mise en ligne.
