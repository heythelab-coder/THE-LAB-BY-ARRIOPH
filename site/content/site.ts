// Coordonnées et liens — à remplacer par les vraies infos de 4Lab.
// Contact details and links — replace with 4Lab's real information.

// URL de production — sert de base aux métadonnées Open Graph, au sitemap
// et aux liens canoniques. À changer au moment du déploiement.
export const SITE_URL = "https://thelab.com";

export const CONTACT = {
  email: "thelab@arrioph.com",
  city: "Casablanca, MA et Paris, FR",
  /**
   * Plusieurs numeros, un par ligne.
   *
   * `display` est la forme lisible, `href` la forme composable : un lien tel:
   * doit etre en E.164 sans espace ni tiret, sinon certains telephones refusent
   * d'appeler. Les deux sont separes pour ne pas avoir a nettoyer la chaine a
   * chaque affichage, et pour eviter qu'un espace mal place casse un appel.
   */
  phones: [
    { label: "France", display: "+33 6 66 11 12 91", href: "+33666111291" },
  ],
};

// Bloc « Clients & partenaires ».
// `scale` ajuste chaque logo individuellement : les fichiers sources n'ont pas
// la même marge interne ni le même rapport hauteur/largeur, donc une taille
// unique donnerait un alignement optique bancal.
export const CLIENTS = [
  { name: "Coca-Cola", logo: "/clients/coca-cola.png", scale: 1 },
  { name: "Red Bull", logo: "/clients/red-bull.png", scale: 1.15 },
  { name: "Sodexo", logo: "/clients/sodexo.png", scale: 0.95 },
  { name: "Fnac Darty", logo: "/clients/fnac-darty.png", scale: 1 },
  { name: "Colas", logo: "/clients/colas.png", scale: 0.9 },
  { name: "Grant Thornton", logo: "/clients/grant-thornton.png", scale: 1.05 },
  { name: "France Galop", logo: "/clients/france-galop.png", scale: 1 },
  { name: "Ofi Invest", logo: "/clients/ofi-invest.png", scale: 1 },
  { name: "OCB", logo: "/clients/ocb.png", scale: 0.85 },
  { name: "Up", logo: "/clients/up.png", scale: 0.8 },
  { name: "Subway", logo: "/clients/subway.png", scale: 1.1 },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
];
