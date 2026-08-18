"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LabMark from "./LabMark";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import type { Dictionary, Locale } from "@/content/dictionary";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Le menu mobile se referme au changement de page, et non au clic sur un
  // lien : l'interception des transitions de page arrete la propagation de
  // l'evenement avant qu'il n'atteigne React, donc un onClick sur le lien ne
  // s'executerait jamais. Fermer sur la navigation est de toute facon plus
  // juste — le menu se ferme quelle que soit la maniere dont on a navigue.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 80);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Menu mobile ouvert : on bloque le scroll de la page derrière,
  // et Échap referme (sinon le seul moyen de sortir est le bouton).
  useEffect(() => {
    if (!open) return;

    document.body.classList.add("scroll-locked");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Vraies routes depuis que les pages internes existent : des ancres
  // renverraient vers des sections absentes dès qu'on quitte l'accueil.
  const links = [
    { label: dict.nav.work, href: `/${lang}/work` },
    { label: dict.nav.services, href: `/${lang}/services` },
    { label: dict.nav.studio, href: `/${lang}/studio` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  const other: Locale = lang === "fr" ? "en" : "fr";

  return (
    // `vt-nav` sort la nav du cliché racine pendant une transition de page :
    // identique d'une page à l'autre, elle doit rester fixe au lieu d'être
    // emportée par le volet.
    <header className="vt-nav fixed inset-x-0 top-0 z-50 flex justify-center">
      {/* Le wrapper porte la largeur max. La pilule anime donc sa max-width
          de 100% vers une valeur fixe, sans temps mort en début d'animation. */}
      <div className="flex w-full max-w-[1440px] justify-center">
        <nav
          style={{
            transitionTimingFunction: EASE,
            transitionDuration: "700ms",
            transitionProperty:
              "max-width, height, margin-top, padding, background-color, border-color, border-radius, box-shadow",
          }}
          className={`relative flex w-full items-center justify-between will-change-[max-width,height] ${
            scrolled
              // Pilule resserree depuis que le mot-symbole a laisse place au
              // monogramme : a 460px il restait un vide de 110px au milieu.
              ? "mt-[18px] h-[56px] max-w-[470px] rounded-full border border-paper/10 bg-elevated/85 px-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "mt-0 h-[88px] max-w-full rounded-[40px] border border-transparent bg-transparent px-5 md:px-8"
          }`}
        >
          {/* Le monogramme remplace le mot-symbole. Le nom reste expose aux
              lecteurs d'ecran et aux moteurs via le libelle masque. */}
          <Link
            href={`/${lang}`}
            className="group flex items-center transition-opacity hover:opacity-70"
          >
            <LabMark
              className={`text-paper transition-all duration-700 ease-expo ${
                scrolled ? "h-[24px] w-[24px]" : "h-[28px] w-[28px]"
              }`}
            />
            <span className="sr-only">THE LAB</span>
          </Link>

          <div className="hidden items-center md:flex">
            {/* Séparateur vertical : n'apparaît qu'en mode pilule. */}
            <span
              aria-hidden
              style={{ transitionTimingFunction: EASE }}
              className={`mr-6 h-[26px] w-px bg-paper/20 transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="t-body text-paper/80 transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* La bascule de thème reste visible en pilule : c'est une
                préférence qu'on veut pouvoir changer à tout moment, pas un
                réglage qu'on range. */}
            <ThemeToggle className="ml-6" />

            {/* Le sélecteur de langue se replie quand la barre devient pilule. */}
            <Link
              href={`/${other}`}
              aria-hidden={scrolled}
              tabIndex={scrolled ? -1 : undefined}
              style={{ transitionTimingFunction: EASE }}
              className={`overflow-hidden whitespace-nowrap rounded-full border text-[12px] font-medium uppercase tracking-[0.08em] text-paper/70 transition-all duration-500 hover:text-paper ${
                scrolled
                  ? "ml-0 max-w-0 border-transparent px-0 py-0 opacity-0"
                  : "ml-7 max-w-[80px] border-paper/15 px-3 py-1.5 opacity-100 hover:border-paper/40"
              }`}
            >
              {other}
            </Link>
          </div>

          {/* Progression de lecture : un filet qui se remplit au bas de la
              pilule. Indique ou l'on se trouve dans une page longue sans
              ajouter le moindre element a la composition. */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-6 bottom-[10px] h-px origin-left bg-paper/35 transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `scaleX(${progress})` }}
          />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={dict.nav.menu}
            className="t-body font-medium md:hidden"
          >
            {dict.nav.menu}
          </button>
        </nav>
      </div>

      {open && (
        <MobileMenu dict={dict} lang={lang} links={links} onClose={() => setOpen(false)} />
      )}
    </header>
  );
}
