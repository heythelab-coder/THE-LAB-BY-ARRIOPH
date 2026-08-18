import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { locales, resolveLocale } from "@/content/dictionary";
import { getPages } from "@/content/pages";
import { CONTACT, SOCIALS } from "@/content/site";

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
  const copy = getPages(locale).contact;

  return {
    title: copy.title,
    description: copy.intro,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const pages = getPages(locale);

  return (
    <>
      {/* En-tete en deux colonnes.
          Le PageHeader standard occupe toute la largeur et laissait la moitie
          droite vide, pendant que les coordonnees etaient reléguées tout en bas
          de page. Elles remontent ici : c'est la premiere chose qu'on cherche
          sur une page contact, et ca remplit le vide au lieu de le subir. */}
      <header className="container-lab pb-14 pt-[136px] md:pb-20 md:pt-[176px]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal className="border-t border-line pt-4">
              <p className="eyebrow">{pages.contact.eyebrow}</p>
            </Reveal>

            <RevealText
              as="h1"
              text={pages.contact.title}
              className="t-display mt-6"
              stagger={45}
            />

            <Reveal delay={200}>
              <p className="t-lead mt-8 max-w-[52ch] text-paper/70">{pages.contact.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={150} className="md:col-span-4 md:col-start-9">
            <div className="space-y-7 border-t border-line pt-4">
              <ContactLine label={pages.contact.directLabel}>
                <a href={`mailto:${CONTACT.email}`} className="group t-body hover:text-paper">
                  <span className="link-sweep">{CONTACT.email}</span>
                </a>
              </ContactLine>

              {/* Les trois numeros sur trois lignes, chacun avec son pays :
                  une liste sans repere oblige a dechiffrer l'indicatif. */}
              <ContactLine label={pages.contact.phoneLabel}>
                <ul className="space-y-2">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone.href} className="flex items-baseline gap-3">
                      <span className="eyebrow w-[52px] shrink-0 text-paper/35">{phone.label}</span>
                      <a href={`tel:${phone.href}`} className="group t-body nums hover:text-paper">
                        <span className="link-sweep">{phone.display}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactLine>

              <ContactLine label={pages.contact.responseLabel}>
                <span className="t-body text-paper/80">{pages.contact.responseValue}</span>
              </ContactLine>

              <div className="border-t border-line pt-6">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group t-meta text-paper/55 hover:text-paper"
                      >
                        <span className="link-sweep">{social.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Le formulaire prend desormais toute la largeur utile : la colonne de
          coordonnees ayant remonte, plus rien ne le comprime. */}
      <section className="container-lab pb-24">
        <div className="md:max-w-[860px]">
          <ContactForm copy={pages.form} booking={pages.booking} locale={locale} />
        </div>
      </section>
    </>
  );
}

function ContactLine({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-paper/40">{label}</p>
      <div className="mt-2 text-paper/80">{children}</div>
    </div>
  );
}
