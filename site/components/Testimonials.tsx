import SectionHeader from "./SectionHeader";
import type { Dictionary } from "@/content/dictionary";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const items = dict.testimonials.items;

  return (
    <section className="section overflow-hidden">
      <SectionHeader
        eyebrow={dict.testimonials.eyebrow}
        title={dict.testimonials.title}
        count={String(items.length).padStart(2, "0")}
        className="container-lab mb-12"
      />

      <div className="mask-fade-x group relative">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* Deux passes identiques pour la boucle. La seconde est masquee aux
              lecteurs d'ecran, qui sinon liraient tous les avis en double. */}
          {[0, 1].map((pass) => (
            <ul key={pass} aria-hidden={pass === 1} className="flex shrink-0 gap-4 pr-4">
              {items.map((item) => (
                <li
                  key={`${pass}-${item.name}`}
                  className="flex h-[300px] w-[340px] shrink-0 flex-col justify-between border border-line bg-surface p-8 transition-colors duration-500 hover:border-paper/25 md:w-[400px]"
                >
                  <p className="font-serif text-[22px] leading-[1.25] tracking-tightest">
                    <span aria-hidden className="text-paper/35">
                      “
                    </span>
                    {item.quote}
                    <span aria-hidden className="text-paper/35">
                      ”
                    </span>
                  </p>
                  <div>
                    <p className="t-body font-medium">{item.name}</p>
                    <p className="t-meta mt-1 text-paper/55">{item.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
