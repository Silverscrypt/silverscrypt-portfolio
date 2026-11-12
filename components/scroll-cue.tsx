"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

/** Hopping arrow at the bottom of the hero. Goes away once the page scrolls. */
export function ScrollCue({ href }: { href: string }) {
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
      aria-label="Scroll to About"
      data-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      <ArrowDown aria-hidden="true" />
    </a>
  );
}
