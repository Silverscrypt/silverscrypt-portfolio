"use client";

import { useEffect } from "react";

/**
 * Highlights a footnote's marker and word each time the reader jumps back to
 * it. CSS :target alone can't do this: clicking the same back arrow twice
 * leaves the URL hash unchanged, so the animation wouldn't replay.
 */
export function FootnoteHighlight() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-footnote-backref]",
      );
      const id = link?.hash.slice(1);
      if (!id) return;

      const target = document.getElementById(decodeURIComponent(id));
      const ref = target?.closest<HTMLElement>(".article-footnote-ref");
      if (!target || !ref) return;

      // Remove, force a reflow, then re-add, so the animation starts over.
      delete ref.dataset.highlight;
      void ref.offsetWidth;
      ref.dataset.highlight = "true";

      // The jump focuses the marker link. The highlight already shows where
      // the reader landed, so hide its focus outline until focus moves on;
      // Tab still continues from here, and focusing it again shows the ring.
      target.dataset.quietFocus = "true";
      target.addEventListener("blur", () => delete target.dataset.quietFocus, {
        once: true,
      });
      // Some browsers don't move focus on a hash jump; make it consistent.
      setTimeout(() => target.focus({ preventScroll: true }));
    };

    const onEnd = (event: AnimationEvent) => {
      if (event.target instanceof HTMLElement && event.target.dataset.highlight) {
        delete event.target.dataset.highlight;
      }
    };

    const listeners = new AbortController();
    document.addEventListener("click", onClick, { signal: listeners.signal });
    document.addEventListener("animationend", onEnd, { signal: listeners.signal });
    return () => listeners.abort();
  }, []);

  return null;
}
