"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/markdown/headings";

type TableOfContentsProps = {
  items: TocItem[];
  /** Accessible name for the navigation. */
  label: string;
};

/** A heading becomes active once it reaches this far from the viewport top. */
const ACTIVE_LINE_PX = 128;

export function TableOfContents({ items, label }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  // While true, a clicked item keeps the highlight until its scroll finishes.
  const pinnedRef = useRef(false);
  const pinTimerRef = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (pinnedRef.current) return;
      const headings = items.flatMap((item) => document.getElementById(item.id) ?? []);
      const root = document.documentElement;
      const atBottom =
        window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      // A short final section can never scroll up to the line.
      const passed = atBottom
        ? headings
        : headings.filter((el) => el.getBoundingClientRect().top <= ACTIVE_LINE_PX);
      setActiveId(passed[passed.length - 1]?.id ?? items[0]?.id);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const unpin = () => {
      pinnedRef.current = false;
    };

    // One signal removes every listener on cleanup.
    const listeners = new AbortController();
    const { signal } = listeners;
    const passive = { passive: true, signal };

    schedule();
    window.addEventListener("scroll", schedule, passive);
    window.addEventListener("resize", schedule, { signal });
    window.addEventListener("scrollend", unpin, { signal });
    window.addEventListener("wheel", unpin, passive);
    window.addEventListener("touchmove", unpin, passive);
    return () => {
      listeners.abort();
      cancelAnimationFrame(frame);
      window.clearTimeout(pinTimerRef.current);
    };
  }, [items]);

  // Slides the bar to the active link. It only starts animating after it has
  // been placed once, so it doesn't sweep in on page load.
  useEffect(() => {
    const rail = railRef.current;
    const bar = barRef.current;
    if (!rail || !bar) return;

    const place = () => {
      const link = rail.querySelector<HTMLElement>("[aria-current]");
      if (!link) return;
      bar.style.setProperty("--toc-y", `${link.offsetTop}px`);
      bar.style.setProperty("--toc-h", String(link.offsetHeight));
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(rail);
    const frame = requestAnimationFrame(() => {
      bar.dataset.ready = "true";
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [activeId]);

  const pin = (id: string) => {
    pinnedRef.current = true;
    setActiveId(id);
    // Nothing fires scrollend if the page is already as far as it can go.
    window.clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => {
      pinnedRef.current = false;
    }, 1500);
  };

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-label={label}>
      <div className="toc-rail" ref={railRef}>
        <span className="toc-indicator" ref={barRef} aria-hidden="true" />
        <ul className="toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className="toc-link"
                href={`#${item.id}`}
                data-level={item.level}
                aria-current={item.id === activeId ? "location" : undefined}
                onClick={() => pin(item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
