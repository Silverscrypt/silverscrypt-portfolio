import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { PostBody } from "@/components/post-body";
import { TableOfContents } from "@/components/table-of-contents";
import { article } from "@/lib/content";
import { getHeadings } from "@/lib/headings";

type ArticleProps = {
  /** Where the back links go, e.g. "/writing". */
  backHref: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Links such as the source code. Shown under the intro, or above the
   *  contents in the sticky sidebar where there's room for one. */
  actions?: ReactNode;
  /** Shown between the header and the body, e.g. a cover image. */
  media?: ReactNode;
  markdown: string;
};

// The title's contents link targets the page wrapper, so it scrolls to the very
// top. Heading ids never contain a double dash, so this can't collide with one.
const TITLE_ID = "post--title";

function BackLink({ href }: { href: string }) {
  return (
    <Link className="post-back-link" href={href}>
      <ArrowLeft aria-hidden="true" />
      {article.backLabel}
    </Link>
  );
}

/** A Writing post or a Work project page: header, Markdown body and contents. */
export function Article({
  backHref,
  eyebrow,
  title,
  intro,
  actions,
  media,
  markdown,
}: ArticleProps) {
  return (
    <div className="page post-layout" id={TITLE_ID}>
      <article className="post-article">
        <div className="post-back-top">
          <BackLink href={backHref} />
        </div>
        <PageHeader eyebrow={eyebrow} title={title} intro={intro}>
          {actions}
        </PageHeader>
        {media}
        <PostBody markdown={markdown} />
        <div className="post-back">
          <BackLink href={backHref} />
        </div>
      </article>
      <aside className="post-aside">
        {actions && <div className="post-aside-actions">{actions}</div>}
        <TableOfContents
          items={[{ id: TITLE_ID, text: title, level: 2 }, ...getHeadings(markdown)]}
          label={article.tocLabel}
        />
      </aside>
    </div>
  );
}
