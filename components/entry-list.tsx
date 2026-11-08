import Link from "next/link";
import type { Entry } from "@/lib/content";

type EntryListProps = {
  entries: Entry[];
  /** Accessible name for the list, e.g. "Projects". */
  label: string;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

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

export function EntryList({ entries, label }: EntryListProps) {
  return (
    <ul className="entry-list" aria-label={label}>
      {entries.map((entry) => (
        <li key={entry.title} className="entry">
          {!entry.href ? (
            <div className="entry-row">
              <EntryBody entry={entry} />
            </div>
          ) : isExternal(entry.href) ? (
            <a className="entry-row entry-link" href={entry.href} target="_blank" rel="noreferrer">
              <EntryBody entry={entry} />
            </a>
          ) : (
            <Link className="entry-row entry-link" href={entry.href}>
              <EntryBody entry={entry} />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
