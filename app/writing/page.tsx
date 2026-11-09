import type { Metadata } from "next";
import { EntryList } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { writing } from "@/lib/content";
import { getPosts, toEntry } from "@/lib/posts";

export const metadata: Metadata = { title: writing.title };

export default function WritingPage() {
  return (
    <div className="page">
      <PageHeader eyebrow={writing.eyebrow} title={writing.title} intro={writing.intro} />
      <EntryList entries={getPosts().map(toEntry)} label="Posts" />
    </div>
  );
}
