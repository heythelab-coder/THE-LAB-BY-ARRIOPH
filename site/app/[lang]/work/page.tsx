import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkIndex from "@/components/WorkIndex";
import ClosingCta from "@/components/ClosingCta";
import { PROJECTS } from "@/content/projects";
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
  const copy = getPages(resolveLocale(lang)).work;

  return {
    title: copy.title,
    description: copy.intro,
    alternates: { canonical: `/${resolveLocale(lang)}/work` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const copy = getPages(locale).work;

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        count={String(PROJECTS.length).padStart(2, "0")}
      />

      <section className="container-lab pb-16">
        <WorkIndex locale={locale} allLabel={dict.work.allFilter} viewLabel={dict.work.view} />
      </section>

      <ClosingCta dict={dict} locale={locale} />
    </>
  );
}
