import type { ComponentProps } from "react";

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** A link to another site, opened in a new tab. */
export function ExternalLink(props: Omit<ComponentProps<"a">, "target" | "rel">) {
  return <a {...props} target="_blank" rel="noreferrer" />;
}
