import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionary";
import { PROJECTS } from "@/content/projects";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/studio", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    ...PROJECTS.map((project) => ({ path: `/work/${project.slug}`, priority: 0.7 })),
  ];

  return locales.flatMap((locale) =>
    paths.map(({ path, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "fr" ? priority : priority * 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
