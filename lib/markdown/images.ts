import { existsSync } from "node:fs";
import path from "node:path";
import type { Image, Parent, PhrasingContent, Root, Text } from "mdast";

/**
 * Remark plugin for images written the Obsidian way. The sync workflow in the
 * Obsidian vault copies Attachments/Website/ into public/writing/, so every
 * image is served from /writing/<file name>.
 *
 *   ![[hawk.jpg]]               the image, with no description
 *   ![[hawk.jpg|A young hawk]]  with a description (alt text)
 *   ![[hawk.jpg|400]]           400px wide (also 400x300)
 *   ![A young hawk](hawk.jpg)   plain Markdown with a relative path works too
 *
 * A missing file fails the build with its name, rather than publishing a
 * broken image.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public", "writing");
const URL_BASE = "/writing/";

// ![[file]] or ![[file|option]]. A #heading or #^block suffix is ignored.
const EMBED = /!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;
const SIZE = /^(\d+)(?:x(\d+))?$/;

/** The URL of a synced image, from its file name or Obsidian path. */
function writingImageUrl(file: string) {
  const name = path.basename(file.trim());
  if (!existsSync(path.join(PUBLIC_DIR, name))) {
    throw new Error(
      `Image "${name}" isn't in public/writing. Put it in Attachments/Website in ` +
        `Obsidian so the sync publishes it.`,
    );
  }
  return URL_BASE + encodeURIComponent(name);
}

function toImage(file: string, option = ""): Image {
  const size = option.trim().match(SIZE);
  return {
    type: "image",
    url: writingImageUrl(file),
    alt: size ? "" : option.trim(),
    data: {
      hProperties: {
        loading: "lazy",
        decoding: "async",
        ...(size && { width: size[1], height: size[2] }),
      },
    },
  };
}

/** Splits a text node around its embeds. Returns undefined when it has none. */
function splitEmbeds(node: Text): PhrasingContent[] | undefined {
  const parts: PhrasingContent[] = [];
  let last = 0;
  for (const match of node.value.matchAll(EMBED)) {
    if (match.index > last) parts.push({ type: "text", value: node.value.slice(last, match.index) });
    parts.push(toImage(match[1], match[2]));
    last = match.index + match[0].length;
  }
  if (last === 0) return undefined;
  if (last < node.value.length) parts.push({ type: "text", value: node.value.slice(last) });
  return parts;
}

const isRelative = (url: string) => !/^([a-z]+:|\/|#)/i.test(url);

function walk(parent: Parent) {
  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];

    if (node.type === "text") {
      const parts = splitEmbeds(node);
      if (parts) {
        parent.children.splice(i, 1, ...parts);
        i += parts.length - 1;
      }
    } else if (node.type === "image" && isRelative(node.url)) {
      const image = toImage(decodeURIComponent(node.url));
      node.url = image.url;
      node.data = image.data;
    } else if ("children" in node) {
      walk(node);
    }
  }
}

// ![alt](relative/path.jpg): the first capture is the path.
const MARKDOWN_IMAGE = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?[^)]*\)/g;

/**
 * The URL of a post's preview image: the `image:` frontmatter field when it's
 * set (`hawk.jpg`, `"[[hawk.jpg]]"` or a /public path), otherwise the first
 * image in the post. Undefined when the post has no images.
 */
export function previewImageUrl(field: string | undefined, markdown: string) {
  if (field) {
    const file = field.replace(/^!?\[\[|\]\]$/g, "").split("|")[0];
    return file.startsWith("/") || !isRelative(file) ? file : writingImageUrl(file);
  }

  const first = [...markdown.matchAll(EMBED), ...markdown.matchAll(MARKDOWN_IMAGE)]
    .map((match) => ({ index: match.index, file: match[1] }))
    .sort((a, b) => a.index - b.index)[0];
  if (!first) return undefined;
  return isRelative(first.file) ? writingImageUrl(decodeURIComponent(first.file)) : first.file;
}

export function remarkObsidianImages() {
  return (tree: Root) => {
    walk(tree);
  };
}
