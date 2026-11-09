import { cn } from "cn";
import Link from "next/link";
import { GithubIcon } from "@/components/github-icon";
import { buttonVariants } from "@/components/ui/button";
import type { Entry } from "@/lib/content";

type EntryListProps = {
  entries: Entry[];
  /** Accessible name for the list, e.g. "Projects". */
  label: string;
  /** Accessible name for an entry's GitHub button, from its title. */
  repoLabel?: (title: string) => string;
};

export const isExternal = (href: string) => /^https?:\/\//.test(href);

function EntryBody({ entry }: { entry: Entry }) {
  return (
    <>
      <span className="entry-marker" aria-hidden="true" />
      <div className="entry-text">
        <h2 className="entry-title">{entry.title}</h2>
        <p className="entry-summary">{entry.summary}</p>
      </div>
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
    <a className="entry-row entry-link" href={entry.href} target="_blank" rel="noreferrer">
      <EntryBody entry={entry} />
    </a>
  ) : (
    <Link className="entry-row entry-link" href={entry.href}>
      <EntryBody entry={entry} />
    </Link>
  );
}

export function EntryList({
  entries,
  label,
  repoLabel = (title) => `${title} on GitHub`,
}: EntryListProps) {
  return (
    <ul className="entry-list" aria-label={label}>
      {entries.map((entry) => (
        <li key={entry.title} className="entry">
          <EntryRow entry={entry} />
          {/* A sibling of the row, since a link can't contain another link. */}
          {entry.repo && (
            <a
              className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "entry-repo")}
              href={entry.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={repoLabel(entry.title)}
            >
              <GithubIcon />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
