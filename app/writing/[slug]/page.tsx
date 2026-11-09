import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { writing } from "@/lib/content";
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

export default async function PostPage({
  params,
}: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Article
      backHref="/writing"
      backLabel={writing.backLabel}
      tocLabel={writing.tocLabel}
      eyebrow={post.dateLabel}
      title={post.title}
      intro={post.summary}
      markdown={post.body}
    />
  );
}
