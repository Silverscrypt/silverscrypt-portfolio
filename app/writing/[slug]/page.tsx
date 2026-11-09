import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PostBody } from "@/components/post-body";
import { TableOfContents } from "@/components/table-of-contents";
import { writing } from "@/lib/content";
import { getHeadings } from "@/lib/headings";
import { getPost, getPosts } from "@/lib/posts";

// Posts are prerendered from their .md files, so a loading placeholder would
// only add a flash. Opts this route out of the dev-only instant check.
export const instant = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

// The title's contents link targets the page wrapper, so it scrolls to the very
// top. Heading ids never contain a double dash, so this can't collide with one.
const TITLE_ID = "post--title";

function BackLink() {
  return (
    <Link className="post-back-link" href="/writing">
      <ArrowLeft aria-hidden="true" />
      {writing.backLabel}
    </Link>
  );
}

export default async function PostPage({
  params,
}: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="page post-layout" id={TITLE_ID}>
      <article className="post-article">
        <div className="post-back-top">
          <BackLink />
        </div>
        <PageHeader
          eyebrow={post.dateLabel}
          title={post.title}
          intro={post.summary}
        />
        <PostBody markdown={post.body} />
        <div className="post-back">
          <BackLink />
        </div>
      </article>
      <TableOfContents
        items={[{ id: TITLE_ID, text: post.title, level: 2 }, ...getHeadings(post.body)]}
        label={writing.tocLabel}
      />
    </div>
  );
}
