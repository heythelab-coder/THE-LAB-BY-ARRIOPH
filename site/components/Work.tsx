import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ProjectCard, { CARD_SHAPES } from "./ProjectCard";
import { PROJECTS } from "@/content/projects";
import type { Dictionary, Locale } from "@/content/dictionary";

export default function Work({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const total = String(PROJECTS.length).padStart(2, "0");

  return (
    <section id="work" data-chapter={dict.work.title} className="section container-lab">
      <SectionHeader
        eyebrow={dict.work.eyebrow}
        title={dict.work.title}
        count={total}
        className="mb-16"
      />

      <ul className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-12">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            index={index}
            shape={CARD_SHAPES[index % CARD_SHAPES.length]}
            viewLabel={dict.work.view}
          />
        ))}
      </ul>

      <Reveal className="mt-16 flex justify-center">
        <Link href={`/${locale}/work`} className="btn-ghost group">
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">
              {dict.work.all}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0"
            >
              {dict.work.all}
            </span>
          </span>
          <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
