import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { TocItem } from "@/components/table-of-contents";

/**
 * Gives each top-level #, ## and ### heading a unique id and returns them in
 * order. The sidebar and the rendered post share this, so links always match.
 */
function assignHeadingIds(tree: Root): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];

  for (const node of tree.children) {
    if (node.type !== "heading" || node.depth > 3) continue;

    const text = toString(node);
    const base =
      text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "") || "section";
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;

    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
    // A Markdown # renders as an h2, because the post title is the page's h1.
    items.push({ id, text, level: node.depth === 3 ? 3 : 2 });
  }

  return items;
}

/** Remark plugin that puts the ids on the rendered headings. */
export function remarkHeadingIds() {
  return (tree: Root) => {
    assignHeadingIds(tree);
  };
}

export function getHeadings(markdown: string): TocItem[] {
  return assignHeadingIds(unified().use(remarkParse).use(remarkGfm).parse(markdown));
}
