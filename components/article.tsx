import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { PostBody } from "@/components/post-body";
import { TableOfContents } from "@/components/table-of-contents";
import { getHeadings } from "@/lib/headings";

type ArticleProps = {
  /** Where the back links go, e.g. "/writing". */
  backHref: string;
  backLabel: string;
  tocLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Buttons under the intro, e.g. a link to the source code. */
  actions?: ReactNode;
  /** Shown between the header and the body, e.g. a cover image. */
  media?: ReactNode;
  markdown: string;
};

// The title's contents link targets the page wrapper, so it scrolls to the very
// top. Heading ids never contain a double dash, so this can't collide with one.
const TITLE_ID = "post--title";

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="post-back-link" href={href}>
      <ArrowLeft aria-hidden="true" />
      {label}
    </Link>
  );
}

/** A Writing post or a Work project page: header, Markdown body and contents. */
export function Article({
  backHref,
  backLabel,
  tocLabel,
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
          <BackLink href={backHref} label={backLabel} />
        </div>
        <PageHeader eyebrow={eyebrow} title={title} intro={intro}>
          {actions}
        </PageHeader>
        {media}
        <PostBody markdown={markdown} />
        <div className="post-back">
          <BackLink href={backHref} label={backLabel} />
        </div>
      </article>
      <TableOfContents
        items={[{ id: TITLE_ID, text: title, level: 2 }, ...getHeadings(markdown)]}
        label={tocLabel}
      />
    </div>
  );
}
