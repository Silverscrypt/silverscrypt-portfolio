import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { GithubIcon } from "@/components/github-icon";
import { buttonVariants } from "@/components/ui/button";
import { work } from "@/lib/content";
import { getProject, getProjects } from "@/lib/projects";

// Projects are prerendered from their .md files, so a loading placeholder
// would only add a flash. Opts this route out of the dev-only instant check.
export const instant = false;

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

// A real link styled as a button, so it's announced as a link.
function ProjectLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-brand")}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Article
      backHref="/work"
      backLabel={work.backLabel}
      tocLabel={work.tocLabel}
      eyebrow={project.period}
      title={project.title}
      intro={project.summary}
      actions={
        (project.repo || project.site) && (
          <>
            {project.site && (
              <ProjectLink href={project.site}>
                <ArrowUpRight aria-hidden="true" />
                {work.siteLabel}
              </ProjectLink>
            )}
            {project.repo && (
              <ProjectLink href={project.repo}>
                <GithubIcon />
                {work.repoLabel}
              </ProjectLink>
            )}
          </>
        )
      }
      media={
        project.image && (
          <figure className="project-cover">
            {/* The width and height only reserve space; CSS keeps the
                image's own aspect ratio. */}
            <Image
              className="project-cover-image"
              src={project.image.src}
              alt={project.image.alt}
              width={1600}
              height={1000}
              sizes="(min-width: 1100px) 60rem, 100vw"
              preload
            />
          </figure>
        )
      }
      markdown={project.body}
    />
  );
}
