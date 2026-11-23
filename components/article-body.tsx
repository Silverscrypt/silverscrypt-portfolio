import { CornerRightUp } from "lucide-react";
import Markdown from "react-markdown";
import type { Components, Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink, isExternal } from "@/components/external-link";
import { FootnoteHighlight } from "@/components/footnote-highlight";
import { rehypeFootnoteWords } from "@/lib/markdown/footnotes";
import { remarkHeadingIds } from "@/lib/markdown/headings";
import { remarkObsidianImages } from "@/lib/markdown/images";

const remarkRehypeOptions: Options["remarkRehypeOptions"] = {
  // Drop GitHub's "↩" text, which phones draw as an emoji; the back link
  // renders a lucide icon instead (below). Keep the small number that tells
  // a second or third back link to the same note apart.
  footnoteBackContent: (_, rereferenceIndex) =>
    rereferenceIndex > 1
      ? [
          {
            type: "element",
            tagName: "sup",
            properties: {},
            children: [{ type: "text", value: String(rereferenceIndex) }],
          },
        ]
      : [],
};

const components: Components = {
  // The post title is the page's only h1.
  h1: "h2",
  // Pass every attribute through: footnote links rely on their id (the back
  // arrow's target), aria-describedby, aria-label and data-footnote-* props.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ node, href, children, ...props }) => {
    if (href && isExternal(href)) {
      return (
        <ExternalLink href={href} {...props}>
          {children}
        </ExternalLink>
      );
    }
    // The back link already has an aria-label, so the icon is decorative.
    if ("data-footnote-backref" in props) {
      return (
        <a href={href} {...props}>
          <CornerRightUp
            aria-hidden="true"
            className="article-footnote-back-icon"
          />
          {children}
        </a>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-body">
      <Markdown
        remarkPlugins={[remarkGfm, remarkHeadingIds, remarkObsidianImages]}
        rehypePlugins={[rehypeFootnoteWords]}
        remarkRehypeOptions={remarkRehypeOptions}
        components={components}
      >
        {markdown}
      </Markdown>
      <FootnoteHighlight />
    </div>
  );
}
