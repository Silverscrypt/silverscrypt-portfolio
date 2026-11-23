import path from "node:path";
import { cache } from "react";
import type { Entry } from "@/lib/content";
import {
  loadNewestFirst,
  optionalString,
  requireFields,
  type RequiredFields,
} from "@/lib/markdown/files";
import { previewImageUrl } from "@/lib/markdown/images";

/**
 * Every .md file in content/writing is a post. The file name becomes the URL
 * and the frontmatter supplies the title, summary and date, plus optionally
 * `image:` (e.g. hawk.jpg) to pick the preview image. Without it, the post's
 * first image is the preview.
 */

const DIR = path.join(process.cwd(), "content", "writing");

export type Post = RequiredFields & {
  /** Short date for display, e.g. "Nov 2026". */
  dateLabel: string;
  /** Preview image URL: the `image:` field, else the post's first image. */
  image?: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** All posts, newest first. Read once per request. */
export const getPosts = cache((): Post[] =>
  loadNewestFirst(DIR, (file) => {
    const fields = requireFields(file);
    return {
      ...fields,
      dateLabel: dateFormat.format(fields.date),
      image: previewImageUrl(optionalString(file.data.image), fields.body),
    };
  }),
);

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function toEntry(post: Post): Entry {
  return {
    title: post.title,
    summary: post.summary,
    meta: post.dateLabel,
    href: `/writing/${post.slug}`,
    image: post.image,
  };
}
