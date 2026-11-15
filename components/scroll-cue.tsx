"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

type ScrollCueProps = {
  href: string;
  /** Accessible name, e.g. "Scroll to About". */
  label: string;
};

/** Hopping arrow at the bottom of the hero. Goes away once the page scrolls. */
export function ScrollCue({ href, label }: ScrollCueProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setHidden(window.scrollY > 0);
    update(); // e.g. a reload that restores a scrolled position
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      className="scroll-cue"
      href={href}
      aria-label={label}
      data-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      <ArrowDown aria-hidden="true" />
    </a>
  );
}
