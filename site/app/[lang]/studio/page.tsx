import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
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

export default async function StudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const copy = getPages(locale).studio;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <Approach dict={dict} />
      <Process dict={dict} />
      <Clients dict={dict} lang={locale} />
      <Testimonials dict={dict} />
      <Faq dict={dict} />
      <Cta dict={dict} />
    </>
  );
}
