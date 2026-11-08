import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="404"
        title="Page not found"
        intro="That address doesn't match anything on this site."
      />
      <div className="page-actions">
        <Button size="lg" nativeButton={false} render={<Link href="/" />}>
          Go to the home page
        </Button>
      </div>
    </div>
  );
}
