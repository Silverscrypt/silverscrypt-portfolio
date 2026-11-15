import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { notFound } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="page">
      <PageHeader eyebrow={notFound.eyebrow} title={notFound.title} intro={notFound.intro} />
      <div className="page-actions">
        <Button size="lg" nativeButton={false} render={<Link href="/" />}>
          {notFound.homeLabel}
        </Button>
      </div>
    </div>
  );
}
