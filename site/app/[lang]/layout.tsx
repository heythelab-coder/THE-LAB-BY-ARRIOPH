import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Entrance from "@/components/Entrance";
import ChapterRail from "@/components/ChapterRail";
import Ambient from "@/components/Ambient";
import { ThemeScript } from "@/components/ThemeToggle";
import PageTransitions from "@/components/PageTransitions";
import { getDictionary, locales, resolveLocale } from "@/content/dictionary";
import { SITE_URL, CONTACT } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      // Les pages internes n'ont qu'a fournir leur propre titre.
      template: `%s · 4Lab`,
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      url: `/${locale}`,
      siteName: "4Lab",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    // suppressHydrationWarning : le script de theme pose `data-theme` sur <html>
    // AVANT l'hydratation, par conception — c'est precisement ce qui evite le
    // flash de theme. React voit donc un attribut absent du HTML serveur et le
    // signale. L'ecart est voulu et limite a cet element.
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Pose le theme avant la premiere peinture : sans ce script, un
            visiteur en clair recoit une page noire pendant l'hydratation. */}
        <ThemeScript />
        {/* Sans JS, les blocs animés à l'apparition resteraient invisibles. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}[data-reveal-text] span{transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Premier élément focusable de la page : permet de sauter la nav au clavier. */}
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-paper focus-visible:px-5 focus-visible:py-3 focus-visible:text-[15px] focus-visible:font-medium focus-visible:text-ink"
        >
          {dict.nav.skip}
        </a>

        {/* Couche d'animation. Chacun de ces composants se désactive lui-même
            sous prefers-reduced-motion ; le défilement interpolé et le curseur
            se désactivent également sur écran tactile. */}
        <SmoothScroll />
        <PageTransitions />
        <Cursor />
        <Ambient />
        <ChapterRail />
        <Entrance
          name="4Lab"
          tagline={dict.hero.tagline}
          city={CONTACT.city}
          skipLabel={dict.entrance.skip}
        />

        {/* Nav et pied de page vivent dans le layout : toutes les pages en
            héritent, et la nav ne se remonte pas entre deux navigations. */}
        <Nav dict={dict} lang={locale} />
        <main id="main">{children}</main>
        <Footer dict={dict} lang={locale} />
      </body>
    </html>
  );
}
