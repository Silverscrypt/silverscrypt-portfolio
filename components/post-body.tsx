import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternal } from "@/components/entry-list";
import { remarkHeadingIds } from "@/lib/headings";

const components: Components = {
  // The post title is the page's only h1.
  h1: "h2",
  a: ({ href, children }) =>
    href && isExternal(href) ? (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
};

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <div className="post-body">
      <Markdown remarkPlugins={[remarkGfm, remarkHeadingIds]} components={components}>
        {markdown}
      </Markdown>
    </div>
  );
}
