import Link from "next/link";
import { pagesFr } from "@/content/pages";

/**
 * Page 404 du segment de langue.
 *
 * Elle ne recoit pas de params (Next l'affiche hors resolution de route), donc
 * elle ne connait pas la langue courante : les textes sont en francais, la
 * langue par defaut du site, et les liens pointent vers `/fr`.
 */
export default function NotFound() {
  const copy = pagesFr.notFound;

  return (
    <section className="container-lab flex min-h-[70svh] flex-col justify-center pb-24 pt-[136px]">
      <p className="eyebrow border-t border-line pt-4 text-paper/40">404</p>
      <h1 className="t-display mt-6 max-w-[16ch]">{copy.title}</h1>
      <p className="t-lead mt-6 max-w-[52ch] text-paper/70">{copy.body}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/fr" className="btn-solid">
          {copy.home}
        </Link>
        <Link href="/fr/work" className="btn-ghost">
          {copy.work}
        </Link>
      </div>
    </section>
  );
}
