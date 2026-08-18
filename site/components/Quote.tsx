import ScrollText from "./ScrollText";
import type { Dictionary } from "@/content/dictionary";

export default function Quote({ dict }: { dict: Dictionary }) {
  return (
    <section className="section container-lab">
      {/* Le bloc doit pouvoir traverser l'ecran pour que le remplissage ait le
          temps de se jouer : d'ou la hauteur genereuse autour du texte. */}
      <div className="flex min-h-[70svh] items-center justify-center">
        {/* Largeur en px, pas en ch : l'unite ch se calcule sur la taille de
            police de l'element qui la porte, pas sur celle du texte a
            l'interieur. */}
        <blockquote className="mx-auto w-full max-w-[1000px] text-center">
          <ScrollText text={dict.quote} className="t-quote" />
        </blockquote>
      </div>
    </section>
  );
}
