import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import LabMark from "./LabMark";
import { CONTACT, SOCIALS } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionary";

/**
 * Repartition des colonnes.
 *
 * La version precedente donnait `col-span-3` aux quatre blocs mais posait le
 * deuxieme en `col-start-6` : les trois premiers occupaient 1-3, 6-8 et 9-11,
 * et le quatrieme, qui aurait eu besoin de 12-14, repassait a la ligne. D'ou le
 * bloc Contact echoue sous le texte de marque.
 *
 * Ici chaque bloc a sa place explicite et la somme tombe juste : 1-4, puis
 * 6-7, 8-9, 10-12. La colonne 5 sert de respiration entre la marque et les
 * listes.
 */
export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="border-t border-line">
      <div className="container-lab grid gap-x-8 gap-y-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <LabMark className="h-8 w-8 text-paper" />
          <p className="t-prose mt-6 max-w-[34ch] text-paper/60">{dict.footer.blurb}</p>
        </div>

        <nav aria-label={dict.footer.pagesLabel} className="md:col-span-2 md:col-start-6">
          <p className="eyebrow">{dict.footer.pagesLabel}</p>
          <ul className="mt-5 space-y-3">
            {dict.footer.pages.map((page) => (
              <li key={page.label}>
                <Link
                  href={`/${lang}${page.href}`}
                  className="group t-body text-paper/65 hover:text-paper"
                >
                  <span className="link-sweep">{page.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.socialsLabel} className="md:col-span-2">
          <p className="eyebrow">{dict.footer.socialsLabel}</p>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group t-body text-paper/65 hover:text-paper"
                >
                  <span className="link-sweep">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow">{dict.footer.contactLabel}</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group t-body text-paper/65 hover:text-paper"
              >
                <span className="link-sweep">{CONTACT.email}</span>
              </a>
            </li>
            {CONTACT.phones.map((phone) => (
              <li key={phone.href}>
                <a
                  href={`tel:${phone.href}`}
                  className="group t-body nums text-paper/65 hover:text-paper"
                >
                  <span className="link-sweep">{phone.display}</span>
                </a>
              </li>
            ))}
            <li className="t-body text-paper/45">{CONTACT.city}</li>
          </ul>
        </div>
      </div>

      {/* Signature de fin : le logotype detoure, blanc sur le noir de la page.
          Le fond bleu du fichier source a ete retire par keying sur le canal
          minimum (le bleu plafonnait a 139, le texte etait a 253) — d'ou un PNG
          transparent de 10 Ko a la place du JPG de 139 Ko. */}
      <Reveal className="container-lab flex justify-center border-t border-line py-14 md:py-16">
        <Image
          src="/brand/wordmark.png"
          alt="The Lab by Arrioph"
          width={659}
          height={241}
          sizes="(max-width: 768px) 70vw, 420px"
          // Plafonne a 420px : le logotype ne fait que 659px de large dans le
          // fichier source, donc au-dela il devient mou sur un ecran Retina
          // (420 x 2 = 840, deja un leger sur-echantillonnage). Pour l'afficher
          // plus grand, il faut un export vectoriel ou une source plus definie.
          className="h-auto w-[70%] max-w-[420px]"
        />
      </Reveal>

      <div className="container-lab flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="t-meta nums text-paper/55">
          © {new Date().getFullYear()} THE LAB. {dict.footer.rights}
        </p>
        <a href="#main" className="group t-meta text-paper/55 hover:text-paper">
          <span className="link-sweep">{dict.footer.backToTop}</span>
        </a>
      </div>
    </footer>
  );
}
