/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],

    // AVIF avant WebP : le navigateur prend le premier format qu'il accepte.
    // Sur les photographies du site, l'AVIF pese environ 25 % de moins que le
    // WebP a qualite percue egale. Les navigateurs qui l'ignorent recoivent le
    // WebP, ceux qui ignorent les deux recoivent la source.
    formats: ["image/avif", "image/webp"],

    // Les sources sont des fichiers statiques versionnes : leur contenu ne
    // change jamais sans que le nom change. Sans cette valeur, Next reencode
    // au bout de 60 secondes — a chaque fois un decodage complet cote serveur
    // pour un resultat identique.
    minimumCacheTTL: 31536000,

    // Le site n'affiche aucune image au-dela de 1920px de large : generer les
    // variantes 2048 et 3840 ne sert qu'a multiplier les encodages.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Retire l'en-tete `X-Powered-By: Next.js` : il n'apporte rien au visiteur
  // et annonce la pile technique.
  poweredByHeader: false,
};

export default nextConfig;
