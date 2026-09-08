# Partager le site pour recueillir des retours

Le script `npm run share` construit la version de **production** et la sert sur
le port 4000. Toujours partager celle-là, jamais `npm run dev` : le mode
développement est plusieurs fois plus lent et donnerait une fausse impression.

```bash
npm run share
```

## Option 1 — Vercel (recommandé)

La seule option qui fonctionne quand votre Mac est éteint. C'est décisif pour
des retours : les gens regardent quand ils ont le temps, pas quand vous êtes
devant l'écran.

```bash
npm i -g vercel
```

Puis depuis le dossier `site/` :

```bash
vercel
```

La première commande ouvre votre navigateur pour vous connecter. Vercel renvoie
ensuite une URL de préversion permanente, du type
`the-lab-xxxx.vercel.app`, à envoyer telle quelle.

Chaque `vercel` suivant crée une **nouvelle** URL de préversion : pratique pour
comparer deux versions côte à côte. `vercel --prod` publie sur l'adresse
principale.

## Option 2 — Redirection de port VS Code

Utile pour montrer une version en cours à quelqu'un, en direct.

1. Lancer `npm run share`
2. Dans VS Code : panneau **Ports** (à côté du Terminal) → **Forward a Port** → `4000`
3. Clic droit sur le port → **Port Visibility** → **Public**
4. Copier l'URL `*.devtunnels.ms` proposée

Demande une connexion GitHub ou Microsoft la première fois.

Le CLI VS Code n'est pas dans le PATH sur cette machine. Pour l'ajouter :
ouvrir VS Code, `Cmd+Shift+P`, puis « Shell Command: Install 'code' command in PATH ».

**Limite** : le lien ne fonctionne que tant que votre Mac est allumé et la
commande lancée. À réserver à une démo, pas à une collecte de retours.

## Option 3 — Même réseau Wi-Fi

Sans aucune installation, pour quelqu'un dans la même pièce :

```
http://192.168.31.254:4000/fr
```

Cette adresse change à chaque changement de réseau. La vérifier avec
`ipconfig getifaddr en0`.

## Avant d'envoyer le lien

Trois points que vos relecteurs remonteront à coup sûr, et qui n'ont rien à voir
avec le design. Autant les traiter avant, pour que les retours portent sur ce
qui compte :

1. **Les liens réseaux ne mènent nulle part** : ils pointent vers les pages
   d'accueil d'Instagram, LinkedIn, YouTube et TikTok, sans nom de compte.
   Quelqu'un essaiera de cliquer.
2. **Le formulaire de contact n'envoie rien** tant que `RESEND_API_KEY` ou
   `CONTACT_WEBHOOK_URL` n'est pas configuré. Sur un lien partagé, une demande
   test se perdra. Voir `.env.example`.
3. **L'image du hero est en 1080×566** pour un affichage plein écran : elle sera
   visiblement floue sur un écran récent. C'est le premier écran que vos
   relecteurs verront.

## Ce qu'il faut demander

Un lien nu ramène surtout « c'est joli ». Trois questions ciblées donnent des
retours exploitables :

- En arrivant sur la page, qu'est-ce que vous pensez qu'on vend ?
- À quel endroit vous êtes-vous arrêté de descendre ?
- Qu'est-ce qui vous ferait hésiter à nous écrire ?
