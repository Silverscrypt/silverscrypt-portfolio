import path from "node:path";
import type { Entry } from "@/lib/content";
import { readMarkdownDir, toDate, type MarkdownFile } from "@/lib/markdown-files";

/**
 * Every .md file in content/writing is a post. The file name becomes the URL
 * and the frontmatter supplies the title, summary and date.
 */

const DIR = path.join(process.cwd(), "content", "writing");

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: Date;
  /** Short date for display, e.g. "Nov 2026". */
  dateLabel: string;
  body: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function toPost({ file, slug, data, body }: MarkdownFile): Post {
  const date = toDate(data.date);

  // Fail the build with a useful message rather than publish a broken post.
  if (typeof data.title !== "string" || typeof data.summary !== "string" || !date) {
    throw new Error(
      `${file} needs a title, a summary and a date (YYYY-MM-DD) in its frontmatter.`,
    );
  }

  return {
    slug,
    title: data.title,
    summary: data.summary,
    date,
    dateLabel: dateFormat.format(date),
    body,
  };
}

/** All posts, newest first. */
export function getPosts(): Post[] {
  return readMarkdownDir(DIR)
    .map(toPost)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function toEntry(post: Post): Entry {
  return {
    title: post.title,
    summary: post.summary,
    meta: post.dateLabel,
    href: `/writing/${post.slug}`,
  };
}
