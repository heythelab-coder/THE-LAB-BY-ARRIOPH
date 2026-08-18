# Mise en ligne

Build de production vérifié : toutes les routes répondent en 200, les slugs
inconnus en 404, `sitemap.xml` et `robots.txt` sont servis.

## À corriger avant de rendre le site public

Par ordre d'importance réelle.

### 1. On ne peut pas vous joindre

`content/site.ts` contient encore `hello@thelab.studio` et `+33 6 00 00 00 00`.
Ces valeurs alimentent le bouton du hero, le bloc CTA, le pied de page **et** le
repli du formulaire de contact. Tant qu'elles sont fausses, un visiteur qui veut
vous écrire n'a aucun moyen d'y arriver.

Dans le même fichier, `SITE_URL` vaut `https://thelab.studio` : il alimente les
aperçus de partage, les liens canoniques et le sitemap. S'il est faux, Google et
LinkedIn pointent dans le vide.

### 2. Les témoignages sont inventés

`content/dictionary.ts` → `testimonials.items` contient six personnes que j'ai
écrites comme exemples : Mara L., Daniel O., Sofia B., Aiko T., Elias B.,
Tomas V. Sur un site public, ce sont de faux avis clients attribués à des
personnes nommées.

À remplacer par de vrais retours, ou à supprimer le bloc — un site sans
témoignages est normal, un site avec de faux témoignages est un risque.

### 3. Le formulaire n'enverra rien

Sur Vercel ou Netlify le système de fichiers est éphémère, donc le canal
« fichier local » ne fonctionne pas. Sans `RESEND_API_KEY` ni
`CONTACT_WEBHOOK_URL`, l'action ne trouve aucun canal.

Le visiteur voit alors un message d'erreur et l'adresse email directe — il n'y a
pas de faux « message envoyé », rien n'est perdu en silence. Mais le formulaire
ne sert à rien tant que rien n'est configuré. Voir `.env.example`.

### 4. Points à valider

- **Logos clients** (Coca-Cola, Red Bull, Sodexo, Fnac Darty…) : ils deviennent
  publics. Vérifiez que vous avez le droit de les afficher comme références.
- **Années des projets** : vides sauf Beyond Fears. Le séparateur se masque tout
  seul, mais des projets sans date font moins sérieux.
- **Image Open Graph** : absente. Les partages sortiront sans visuel.

## Déployer sur Vercel

Le plus simple, gratuit, et Next.js y est détecté sans réglage.

### Option A — par le site web

1. Créer un dépôt Git et y pousser le dossier `site/`.
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt.
3. Si le dépôt contient tout le projet, régler **Root Directory** sur `site`.
4. Ajouter les variables d'environnement (voir `.env.example`).
5. Déployer.

### Option B — en ligne de commande

```bash
npm i -g vercel
```

Puis, depuis le dossier `site/` :

```bash
vercel login
```

```bash
vercel --prod
```

La première commande ouvre votre navigateur pour vous authentifier. C'est cette
étape qui ne peut pas être automatisée — elle demande votre compte.

## Variables d'environnement à renseigner

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Envoi des demandes par email |
| `CONTACT_TO` | Adresse qui reçoit les demandes |
| `CONTACT_FROM` | Expéditeur, sur un domaine vérifié chez Resend |
| `CONTACT_WEBHOOK_URL` | Alternative : Slack, Make, n8n, Zapier |

Au moins un canal doit être configuré pour que le formulaire fonctionne.

## Après la mise en ligne

1. Remplacer `SITE_URL` par le vrai domaine, puis redéployer — sinon les
   métadonnées gardent l'ancienne valeur.
2. Envoyer le sitemap dans la Google Search Console : `https://votre-domaine/sitemap.xml`.
3. Tester le formulaire en conditions réelles et vérifier que l'email arrive.
