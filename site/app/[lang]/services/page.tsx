import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceList from "@/components/ServiceList";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import ActionLink from "@/components/ActionLink";
import Process from "@/components/Process";
import { SERVICES } from "@/content/services";
import { getDictionary, locales, resolveLocale } from "@/content/dictionary";
import { getPages } from "@/content/pages";

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
  const copy = getPages(locale).services;

  return {
    title: copy.title.replace("\n", " "),
    description: copy.intro,
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const copy = getPages(locale).services;

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        count={String(SERVICES.length).padStart(2, "0")}
      />

      <section className="container-lab pb-16">
        <ServiceList locale={locale} deliverablesLabel={copy.deliverablesLabel} />
      </section>

      {/* Ce bloc listait des refus. Il liste desormais des engagements : meme
          fonction — dire a quoi s'attendre avant de s'engager — mais il ouvre
          la conversation au lieu de la fermer.
          Le marqueur suit : la croix disait « non », le filet ne dit rien et
          laisse la phrase parler. */}
      <section className="section container-lab">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal className="border-t border-line pt-4">
              <p className="eyebrow">{copy.engageEyebrow}</p>
            </Reveal>
            <RevealText as="h2" text={copy.engageTitle} className="t-display mt-6" stagger={40} />
            <Reveal delay={150}>
              <p className="t-prose mt-6 max-w-[46ch] text-paper/65">{copy.engageIntro}</p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-line">
              {copy.engagePoints.map((item, index) => (
                <Reveal as="li" key={item} delay={index * 70}>
                  <div className="flex items-baseline gap-4 border-b border-line py-5">
                    <span aria-hidden className="mt-[2px] h-px w-3 shrink-0 bg-paper/30" />
                    <span className="t-body text-paper/60">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* La methode a sa place ici, juste apres les expertises : le visiteur
          vient de lire SUR QUOI on travaille, ce bloc dit COMMENT. Son titre
          vient du dictionnaire — il ne s'appelle plus « Services », donc il ne
          repete plus le nom de la page. */}
      <Process dict={dict} />

      {/* Cette section porte desormais l'ancre `contact` et le chapitre : elle
          etait suivie d'un second appel a l'action, retire ici, qui les
          portait. Sans ce report, tout lien vers `#contact` depuis cette page
          ne menerait plus nulle part et le rail de chapitres perdrait sa
          derniere etape. */}
      <section id="contact" data-chapter={dict.chapters.contact} className="section container-lab">
        <Reveal className="flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="t-h2 max-w-[24ch]">{copy.ctaTitle}</h2>
            <p className="t-prose mt-3 max-w-[46ch] text-paper/60">{copy.ctaBody}</p>
          </div>
          <ActionLink href={`/${locale}/contact`} label={dict.cta.button} withArrow />
        </Reveal>
      </section>
    </>
  );
}
