import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import Parallax from "@/components/Parallax";
import ActionLink from "@/components/ActionLink";
import { PROJECTS, getProject, nextProject, projectCopy } from "@/content/projects";
import { locales, resolveLocale } from "@/content/dictionary";
import { getPages } from "@/content/pages";
import { CONTACT } from "@/content/site";

/** Une page statique par projet et par langue. */
export function generateStaticParams() {
  return locales.flatMap((lang) => PROJECTS.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);
  if (!project) return {};

  const copy = projectCopy(project, locale);

  return {
    title: copy.title,
    description: copy.desc,
    alternates: { canonical: `/${locale}/work/${slug}` },
    openGraph: {
      title: `${copy.title} — 4Lab`,
      description: copy.desc,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);

  // Slug inconnu : 404 plutot qu'une page vide.
  if (!project) notFound();

  const copy = projectCopy(project, locale);
  const pages = getPages(locale).project;
  const next = nextProject(slug);
  const nextCopy = projectCopy(next, locale);

  return (
    <>
      <header className="container-lab pb-12 pt-[136px] md:pt-[176px]">
        <Reveal>
          <Link
            href={`/${locale}/work`}
            className="group eyebrow inline-flex items-center gap-2 text-paper/50 transition-colors hover:text-paper"
          >
            <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:-translate-x-1">
              ←
            </span>
            {pages.backToWork}
          </Link>
        </Reveal>

        <RevealText as="h1" text={copy.title} className="t-display mt-8" stagger={50} />

        <Reveal delay={200}>
          <p className="t-lead mt-8 max-w-[62ch] text-paper/70">{copy.intro}</p>
        </Reveal>
      </header>

      <section className="container-lab">
        <Reveal>
          <Parallax amount={8} className="aspect-[4/5] w-full bg-paper/5 md:aspect-[16/9]">
            <Image
              src={project.image}
              alt={copy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
        </Reveal>
      </section>

      {/* Fiche technique : filets et colonnes, meme vocabulaire que le reste. */}
      <section className="section container-lab">
        <dl className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          <Detail label={pages.clientLabel} value={project.client} />
          <Detail label={pages.categoryLabel} value={copy.category} />
          {/* L'annee n'est affichee que si elle est connue. */}
          {project.year && <Detail label={pages.yearLabel} value={project.year} numeric />}
          <Detail label={pages.deliverablesLabel} value={copy.deliverables.join(", ")} />
        </dl>
      </section>

      {project.gallery.length > 0 && (
        <section className="container-lab pb-16">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((src, index) => (
              <Reveal as="li" key={src} delay={(index % 2) * 90}>
                <Parallax amount={8} className="aspect-[4/3] w-full bg-paper/5">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <section className="section container-lab">
        <Reveal className="flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <h2 className="t-h2 max-w-[20ch]">{pages.ctaTitle}</h2>
          <ActionLink href={`/${locale}/contact`} label={pages.ctaButton} withArrow />
        </Reveal>
      </section>

      {/* Projet suivant : sortie de page qui garde le visiteur dans le portfolio. */}
      <section className="border-t border-line">
        <Link href={`/${locale}/work/${next.slug}`} className="group block">
          <div className="container-lab grid items-center gap-8 py-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-paper/45">{pages.nextLabel}</p>
              <p className="t-display mt-4">
                <span className="link-sweep">{nextCopy.title}</span>
              </p>
              <p className="t-prose mt-3 max-w-[46ch] text-paper/60">{nextCopy.desc}</p>
            </div>

            <div className="md:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper/5">
                <Image
                  src={next.image}
                  alt={nextCopy.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Adresse en clair : certains preferent ecrire plutot que remplir un formulaire. */}
      <p className="container-lab pb-12 pt-6">
        <a href={`mailto:${CONTACT.email}`} className="eyebrow text-paper/45 hover:text-paper">
          {CONTACT.email}
        </a>
      </p>
    </>
  );
}

function Detail({ label, value, numeric }: { label: string; value: string; numeric?: boolean }) {
  return (
    <div className="border-b border-r border-line px-5 py-7 md:px-7">
      <dt className="eyebrow text-paper/40">{label}</dt>
      <dd className={`t-body mt-3 text-paper/85 ${numeric ? "nums" : ""}`}>{value}</dd>
    </div>
  );
}
