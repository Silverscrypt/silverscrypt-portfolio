import Image from "next/image";
import Link from "next/link";
import { ExternalLink, isExternal } from "@/components/external-link";
import { GithubIcon } from "@/components/github-icon";
import { buttonVariants } from "@/components/ui/button";
import { entryList, type Entry } from "@/lib/content";
import { cn } from "@/lib/utils";

type EntryListProps = {
  entries: Entry[];
  /** Accessible name for the list, e.g. "Projects". */
  label: string;
};

function EntryBody({ entry }: { entry: Entry }) {
  return (
    <>
      <span className="entry-marker" aria-hidden="true" />
      <div className="entry-text">
        <h2 className="entry-title">{entry.title}</h2>
        <p className="entry-summary">{entry.summary}</p>
      </div>
      {entry.image && (
        // Decorative: the title already names the row.
        <Image
          className="entry-thumb"
          src={entry.image}
          alt=""
          width={224}
          height={168}
          sizes="(max-width: 640px) 15rem, 7rem"
        />
      )}
      <span className="entry-meta">{entry.meta}</span>
    </>
  );
}

function EntryRow({ entry }: { entry: Entry }) {
  if (!entry.href) {
    return (
      <div className="entry-row">
        <EntryBody entry={entry} />
      </div>
    );
  }
  return isExternal(entry.href) ? (
    <ExternalLink className="entry-row entry-link" href={entry.href}>
      <EntryBody entry={entry} />
    </ExternalLink>
  ) : (
    <Link className="entry-row entry-link" href={entry.href}>
      <EntryBody entry={entry} />
    </Link>
  );
}

export function EntryList({ entries, label }: EntryListProps) {
  return (
    <ul className="entry-list" aria-label={label}>
      {entries.map((entry) => (
        <li key={entry.title} className="entry">
          <EntryRow entry={entry} />
          {/* A sibling of the row, since a link can't contain another link. */}
          {entry.repo && (
            <ExternalLink
              className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "entry-repo")}
              href={entry.repo}
              aria-label={entryList.repoLabel(entry.title)}
            >
              <GithubIcon />
            </ExternalLink>
          )}
        </li>
      ))}
    </ul>
  );
}
