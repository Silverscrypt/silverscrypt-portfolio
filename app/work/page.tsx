import type { Metadata } from "next";
import { EntryList } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { work } from "@/lib/content";
import { getProjects, toEntry } from "@/lib/projects";

export const metadata: Metadata = { title: work.title };

export default function WorkPage() {
  return (
    <div className="page">
      <PageHeader eyebrow={work.eyebrow} title={work.title} intro={work.intro} />
      <EntryList
        entries={getProjects().map(toEntry)}
        label="Projects"
        repoLabel={work.repoListLabel}
      />
    </div>
  );
}
