import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { ArticleBody } from "@/components/article-body";
import { TableOfContents } from "@/components/table-of-contents";
import { article } from "@/lib/content";
import { getHeadings } from "@/lib/markdown/headings";

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
const TITLE_ID = "article--title";

function BackLink({ href }: { href: string }) {
  return (
    <Link className="article-back-link" href={href}>
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
    <div className="page article-layout" id={TITLE_ID}>
      <article className="article-main">
        <div className="article-back-top">
          <BackLink href={backHref} />
        </div>
        <PageHeader eyebrow={eyebrow} title={title} intro={intro}>
          {actions}
        </PageHeader>
        {media}
        <ArticleBody markdown={markdown} />
        <div className="article-back">
          <BackLink href={backHref} />
        </div>
      </article>
      <aside className="article-aside">
        {actions && <div className="article-aside-actions">{actions}</div>}
        <TableOfContents
          items={[{ id: TITLE_ID, text: title, level: 2 }, ...getHeadings(markdown)]}
          label={article.tocLabel}
        />
      </aside>
    </div>
  );
}
