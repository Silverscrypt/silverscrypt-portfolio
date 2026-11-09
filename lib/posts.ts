import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Entry } from "@/lib/content";

/**
 * Every .md file in content/writing is a post. The file name becomes the URL
 * and the frontmatter supplies the title, summary and date.
 */

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: Date;
  /** Short date for display, e.g. "Nov 2026". */
  dateLabel: string;
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "writing");

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function toSlug(file: string) {
  return file
    .replace(/\.md$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPost(file: string): Post {
  const { data, content } = matter(readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const date = new Date(data.date);

  // Fail the build with a useful message rather than publish a broken post.
  if (typeof data.title !== "string" || typeof data.summary !== "string" || isNaN(date.getTime())) {
    throw new Error(
      `content/writing/${file} needs a title, a summary and a date (YYYY-MM-DD) in its frontmatter.`,
    );
  }

  return {
    slug: toSlug(file),
    title: data.title,
    summary: data.summary,
    date,
    dateLabel: dateFormat.format(date),
    body: content,
  };
}

/** All posts, newest first. */
export function getPosts(): Post[] {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.toLowerCase().endsWith(".md"))
    .map(readPost)
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
