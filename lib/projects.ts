import path from "node:path";
import type { Entry } from "@/lib/content";
import { optionalString, readMarkdownDir, toDate, type MarkdownFile } from "@/lib/markdown-files";

/**
 * Every .md file in content/work is a project. The file name becomes the URL
 * (/work/<file-name>) and the frontmatter supplies the details:
 *
 *   title:    required
 *   summary:  required, one sentence
 *   date:     required, YYYY-MM-DD when it started (sorts the list)
 *   period:   optional label, e.g. "2026 to Present" (defaults to the year)
 *   repo:     optional source code URL, shown as a GitHub button
 *   image:    optional cover image in /public, e.g. /images/work/space.png
 *   imageAlt: optional description of the cover image
 */

const DIR = path.join(process.cwd(), "content", "work");

export type Project = {
  slug: string;
  title: string;
  summary: string;
  date: Date;
  period: string;
  repo?: string;
  image?: { src: string; alt: string };
  body: string;
};

function toProject({ file, slug, data, body }: MarkdownFile): Project {
  const date = toDate(data.date);

  // Fail the build with a useful message rather than publish a broken page.
  if (typeof data.title !== "string" || typeof data.summary !== "string" || !date) {
    throw new Error(
      `${file} needs a title, a summary and a date (YYYY-MM-DD) in its frontmatter.`,
    );
  }

  const image = optionalString(data.image);
  if (image && !image.startsWith("/")) {
    throw new Error(`${file}: image should be a path in /public, e.g. /images/work/cover.png.`);
  }

  return {
    slug,
    title: data.title,
    summary: data.summary,
    date,
    period: optionalString(data.period) ?? String(date.getUTCFullYear()),
    repo: optionalString(data.repo),
    image: image ? { src: image, alt: optionalString(data.imageAlt) ?? "" } : undefined,
    body,
  };
}

/** All projects, newest first. */
export function getProjects(): Project[] {
  return readMarkdownDir(DIR)
    .map(toProject)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function toEntry(project: Project): Entry {
  return {
    title: project.title,
    summary: project.summary,
    meta: project.period,
    href: `/work/${project.slug}`,
    repo: project.repo,
  };
}
