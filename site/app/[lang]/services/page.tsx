import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceList from "@/components/ServiceList";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import ActionLink from "@/components/ActionLink";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
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

      {/* Le hors-perimetre a autant de valeur que l'offre : il evite les
          mauvais rendez-vous des deux cotes, et une agence qui sait dire non
          est plus credible sur ce qu'elle dit savoir faire. */}
      <section className="section container-lab">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal className="border-t border-line pt-4">
              <p className="eyebrow">{copy.excludeEyebrow}</p>
            </Reveal>
            <RevealText as="h2" text={copy.excludeTitle} className="t-display mt-6" stagger={40} />
            <Reveal delay={150}>
              <p className="t-prose mt-6 max-w-[46ch] text-paper/65">{copy.excludeIntro}</p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-line">
              {copy.excludes.map((item, index) => (
                <Reveal as="li" key={item} delay={index * 70}>
                  <div className="flex items-center gap-4 border-b border-line py-5">
                    <span aria-hidden className="text-[18px] leading-none text-paper/25">
                      ×
                    </span>
                    <span className="t-body text-paper/60">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Process dict={dict} />

      <section className="section container-lab">
        <Reveal className="flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="t-h2 max-w-[24ch]">{copy.ctaTitle}</h2>
            <p className="t-prose mt-3 max-w-[46ch] text-paper/60">{copy.ctaBody}</p>
          </div>
          <ActionLink href={`/${locale}/contact`} label={dict.cta.button} withArrow />
        </Reveal>
      </section>

      <Cta dict={dict} />
    </>
  );
}
