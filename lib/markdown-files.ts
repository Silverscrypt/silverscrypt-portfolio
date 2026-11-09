import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Reads every .md file in a content folder. The file name becomes the slug
 * (the URL) and the frontmatter is returned as-is for the caller to check.
 */

export type MarkdownFile = {
  /** Path from the project root, for error messages. */
  file: string;
  slug: string;
  data: Record<string, unknown>;
  body: string;
};

function toSlug(file: string) {
  return file
    .replace(/\.md$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Pass the folder as a literal path.join(process.cwd(), "content", "...") so
 * the bundler can see which files the build reads.
 */
export function readMarkdownDir(dir: string): MarkdownFile[] {
  const label = path.relative(process.cwd(), dir).split(path.sep).join("/");
  return readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(readFileSync(path.join(dir, file), "utf8"));
      return { file: `${label}/${file}`, slug: toSlug(file), data, body: content };
    });
}

/** Parses a frontmatter date (YAML may already have turned it into a Date). */
export function toDate(value: unknown): Date | undefined {
  if (!(value instanceof Date) && typeof value !== "string") return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

/** A non-empty string, also accepting numbers (YAML reads `2026` as one). */
export function optionalString(value: unknown) {
  const text = typeof value === "number" ? String(value) : value;
  return typeof text === "string" && text.trim() ? text.trim() : undefined;
}
