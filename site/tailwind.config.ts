import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Les couleurs pointent vers des variables CSS, pas vers des valeurs
        // fixes. Basculer le theme revient a redefinir deux triplets sur
        // <html> : tout le site suit, sans classe conditionnelle nulle part.
        //
        // `ink` et `paper` s'echangent d'un theme a l'autre. C'est ce qui fait
        // qu'un bouton `bg-paper text-ink` reste inverse dans les deux sens
        // sans qu'on ait a le traiter a part.
        ink: "rgb(var(--bg) / <alpha-value>)",
        paper: "rgb(var(--fg) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        elevated: "rgb(var(--elev) / <alpha-value>)",
        line: "rgb(var(--fg) / 0.12)",
        surface: "rgb(var(--fg) / 0.04)",
      },
      fontFamily: {
        serif: ["Sentient", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Rideau d'ouverture : le voile se lève, le monogramme apparaît.
        "intro-lift": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-101%)" },
        },
        "intro-mark": {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "menu-in": {
          from: { clipPath: "inset(0 0 100% 0)" },
          to: { clipPath: "inset(0 0 0% 0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-3%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-3%,4%,0) scale(1.05)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fadeUp 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 22s ease-in-out infinite",
      },
      transitionTimingFunction: {
        // « Expo out » : départ franc, arrivée qui glisse. L'easing de référence
        // de tout le site — vitesse et détente cohérentes partout.
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
