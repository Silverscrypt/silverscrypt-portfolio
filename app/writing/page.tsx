import type { Metadata } from "next";
import { EntryList } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { writing } from "@/lib/content";

export const metadata: Metadata = { title: writing.title };

export default function WritingPage() {
  return (
    <div className="page">
      <PageHeader eyebrow={writing.eyebrow} title={writing.title} intro={writing.intro} />
      <EntryList entries={writing.entries} label="Posts" />
    </div>
  );
}
