import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Work from "@/components/Work";
import Quote from "@/components/Quote";
import ClosingCta from "@/components/ClosingCta";
import StepAccordion from "@/components/StepAccordion";
import { getDictionary, resolveLocale } from "@/content/dictionary";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Approach dict={dict} />
      <Clients dict={dict} lang={locale} />
      <StepAccordion dict={dict} />
      <Work dict={dict} locale={locale} />
      <Quote dict={dict} />
      <ClosingCta dict={dict} locale={locale} />
    </>
  );
}
