"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { elsewhere, nav } from "@/lib/content";

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  // While open: lock page scroll, move focus into the menu, close on Escape,
  // and keep Tab cycling through the toggle and the menu links.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const getLinks = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
      );

    // Wait a frame: the menu is still visibility:hidden in this commit,
    // and hidden elements can't take focus.
    const frame = requestAnimationFrame(() => getLinks()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const stops = [toggleRef.current, ...getLinks()].filter(
        (el): el is HTMLElement => el !== null,
      );
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        data-open={open}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="menu-bars" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div
        id={menuId}
        ref={menuRef}
        className="menu"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="menu-wipe" aria-hidden="true" />
        <div className="menu-panel">
          <nav aria-label="Primary">
            <ul className="menu-primary">
              {nav.map((item, index) => (
                <li
                  key={item.href}
                  className="menu-item"
                  style={{ "--i": index } as CSSProperties}
                >
                  <Link
                    href={item.href}
                    className="menu-link"
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-aside">
            <h2 className="menu-aside-title">My Links</h2>
            <ul className="menu-aside-list">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="menu-aside-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
