import path from "node:path";
import { cache } from "react";
import type { Entry } from "@/lib/content";
import {
  loadNewestFirst,
  optionalString,
  requireFields,
  type MarkdownFile,
  type RequiredFields,
} from "@/lib/markdown/files";

/**
 * Every .md file in content/work is a project. The file name becomes the URL
 * (/work/<file-name>) and the frontmatter supplies the details:
 *
 *   title:    required
 *   summary:  required, one sentence
 *   date:     required, YYYY-MM-DD when it started (sorts the list)
 *   period:   optional label, e.g. "2026 to Present" (defaults to the year)
 *   repo:     optional source code URL, shown as a GitHub button
 *   site:     optional URL of the deployed project, shown as a Live site button
 *   image:    optional cover image in /public, e.g. /images/work/space.png
 *   imageAlt: optional description of the cover image
 */

const DIR = path.join(process.cwd(), "content", "work");

export type Project = RequiredFields & {
  period: string;
  repo?: string;
  site?: string;
  image?: { src: string; alt: string };
};

function toProject(file: MarkdownFile): Project {
  const fields = requireFields(file);
  const { data } = file;

  const image = optionalString(data.image);
  if (image && !image.startsWith("/")) {
    throw new Error(
      `${file.file}: image should be a path in /public, e.g. /images/work/cover.png.`,
    );
  }

  return {
    ...fields,
    period: optionalString(data.period) ?? String(fields.date.getUTCFullYear()),
    repo: optionalString(data.repo),
    site: optionalString(data.site),
    image: image ? { src: image, alt: optionalString(data.imageAlt) ?? "" } : undefined,
  };
}

/** All projects, newest first. Read once per request. */
export const getProjects = cache((): Project[] => loadNewestFirst(DIR, toProject));

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
    image: project.image?.src,
  };
}
