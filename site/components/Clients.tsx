import Image from "next/image";
import Reveal from "./Reveal";
import { CLIENTS } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionary";

/**
 * Bandeau clients defilant.
 *
 * La grille a filets precedente occupait pres de 800px de haut pour onze
 * logos — un bloc de preuve qui pesait autant qu'une section de contenu. Ici la
 * meme information tient sur une bande d'environ 180px.
 *
 * Deux passes identiques et une translation de -50% : la seconde reprend
 * exactement la ou la premiere s'arrete, donc la boucle est invisible. Elle est
 * masquee aux lecteurs d'ecran, qui liraient sinon les onze marques en double.
 *
 * L'appel « Et vous ? » remonte dans l'en-tete : dans le flux defilant il
 * passerait toutes les quarante secondes, ce qui n'est pas un appel a l'action.
 */
export default function Clients({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="section overflow-hidden">
      <Reveal className="container-lab flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <p className="eyebrow">{dict.clients.eyebrow}</p>

        <a
          href={`/${lang}/contact`}
          className="group eyebrow inline-flex items-center gap-2 text-paper/40 transition-colors hover:text-paper"
        >
          {dict.clients.cta}
          <span
            aria-hidden
            className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </Reveal>

      <Reveal delay={120} className="mask-fade-x group mt-10">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((pass) => (
            <ul
              key={pass}
              aria-hidden={pass === 1}
              className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
            >
              {CLIENTS.map((client) => (
                <li key={`${pass}-${client.name}`} className="shrink-0">
                  {/* Boite de taille fixe + `fill` : sans dimension intrinseque
                      tant que l'image n'est pas chargee, la cellule
                      s'effondrerait a zero et la bande sauterait. */}
                  <div className="relative h-[32px] w-[110px] md:h-[38px] md:w-[130px]">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="130px"
                      style={{ transform: `scale(${client.scale})` }}
                      className="object-contain opacity-50 grayscale transition-all duration-500 ease-expo hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
