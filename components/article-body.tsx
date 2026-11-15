import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink, isExternal } from "@/components/external-link";
import { FootnoteHighlight } from "@/components/footnote-highlight";
import { rehypeFootnoteWords } from "@/lib/markdown/footnotes";
import { remarkHeadingIds } from "@/lib/markdown/headings";

const components: Components = {
  // The post title is the page's only h1.
  h1: "h2",
  // Pass every attribute through: footnote links rely on their id (the back
  // arrow's target), aria-describedby, aria-label and data-footnote-* props.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ node, href, ...props }) =>
    href && isExternal(href) ? (
      <ExternalLink href={href} {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-body">
      <Markdown
        remarkPlugins={[remarkGfm, remarkHeadingIds]}
        rehypePlugins={[rehypeFootnoteWords]}
        components={components}
      >
        {markdown}
      </Markdown>
      <FootnoteHighlight />
    </div>
  );
}
