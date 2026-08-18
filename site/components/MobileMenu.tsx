"use client";

import Link from "next/link";
import LabMark from "./LabMark";
import ThemeToggle from "./ThemeToggle";
import { CONTACT } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionary";

/**
 * Menu mobile.
 *
 * La version precedente etait un panneau `absolute` place a 88px du haut, a
 * l'interieur d'un header `fixed` qui ne fait que 88px de haut lui-meme. Sa
 * hauteur suivait donc son contenu : 322px dans un ecran de 812. Le reste de la
 * page restait visible dessous et le titre du hero traversait les liens.
 *
 * Ici le menu est un calque plein ecran, `fixed inset-0`, sur un fond
 * parfaitement opaque. Il porte sa propre barre haute, alignee sur celle du
 * site, pour que le passage de l'une a l'autre ne fasse pas sauter le
 * monogramme.
 *
 * Il occupe toute la hauteur meme quand les liens n'en ont pas besoin : c'est
 * ce vide assume qui fait la difference entre un menu et une liste deroulante.
 */
export default function MobileMenu({
  dict,
  lang,
  links,
  onClose,
}: {
  dict: Dictionary;
  lang: Locale;
  links: { label: string; href: string }[];
  onClose: () => void;
}) {
  const other: Locale = lang === "fr" ? "en" : "fr";

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[60] flex flex-col bg-ink [animation:menu-in_600ms_cubic-bezier(0.16,1,0.3,1)_both] md:hidden"
    >
      <div className="container-lab flex h-[88px] shrink-0 items-center justify-between">
        <LabMark className="h-7 w-7 text-paper" />
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.nav.close}
          className="t-body -mr-2 px-2 py-2 font-medium"
        >
          {dict.nav.close}
        </button>
      </div>

      {/* Les liens occupent le centre : le menu doit sembler habite, pas
          empile en haut de l'ecran. */}
      <nav aria-label={dict.nav.menu} className="container-lab flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-1">
          {links.map((link, index) => (
            <li
              key={link.href}
              style={{ animationDelay: `${120 + index * 70}ms` }}
              className="[animation:fadeUp_600ms_cubic-bezier(0.16,1,0.3,1)_both]"
            >
              <Link
                href={link.href}
                className="group flex items-baseline gap-4 py-3 font-serif text-[clamp(2.25rem,11vw,3rem)] leading-none tracking-tightest"
              >
                <span className="eyebrow nums w-6 shrink-0 text-paper/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="link-sweep">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{ animationDelay: "420ms" }}
        className="container-lab shrink-0 space-y-4 border-t border-line py-8 [animation:fadeUp_600ms_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        <div className="flex items-center justify-between gap-4">
          <a href={`mailto:${CONTACT.email}`} className="t-body text-paper/70">
            {CONTACT.email}
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href={`/${other}`}
              className="rounded-full border border-paper/15 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-paper/70"
            >
              {other === "en" ? "English" : "Français"}
            </Link>
          </div>
        </div>
        <p className="eyebrow text-paper/35">{CONTACT.city}</p>
      </div>
    </div>
  );
}
