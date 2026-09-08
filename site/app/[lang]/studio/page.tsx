import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import Clients from "@/components/Clients";
import Faq from "@/components/Faq";
import ClosingCta from "@/components/ClosingCta";
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
  const copy = getPages(locale).studio;

  return {
    title: copy.title.replace("\n", " "),
    description: copy.intro,
    alternates: { canonical: `/${locale}/studio` },
  };
}

/**
 * Page Studio.
 *
 * Elle reprenait `Approach` et `Process`, deux blocs deja presents sur
 * l'accueil : le visiteur qui cliquait sur « Studio » relisait ce qu'il venait
 * de lire. Elle porte desormais ce qu'aucune autre page ne dit — la maniere de
 * travailler ensemble, et la relation avec Arrioph.
 */
export default async function StudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const copy = getPages(locale).studio;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      <section className="section container-lab">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal className="border-t border-line pt-4">
              <p className="eyebrow">{copy.principlesEyebrow}</p>
            </Reveal>
            <RevealText
              as="h2"
              text={copy.principlesTitle}
              className="t-display mt-6"
              stagger={40}
            />

            {/* Le partenariat est annonce ici plutot qu'en tete de page : c'est
                une precision sur la maniere de travailler, pas l'identite du
                studio. */}
            <Reveal delay={200} className="mt-10 border-t border-line pt-4">
              <p className="eyebrow">{copy.partnerLabel}</p>
              <p className="t-prose mt-4 max-w-[46ch] text-paper/60">{copy.partnerBody}</p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-line">
              {copy.principles.map((principle, index) => (
                <Reveal as="li" key={principle.label} delay={index * 70}>
                  <div className="border-b border-line py-6">
                    <p className="t-h3">{principle.label}</p>
                    <p className="t-prose mt-2 max-w-[52ch] text-paper/55">{principle.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Clients dict={dict} lang={locale} />
      <Faq dict={dict} />
      <ClosingCta dict={dict} locale={locale} />
    </>
  );
}
