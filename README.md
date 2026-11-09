# Portfolio

A minimal portfolio in black, white and orange, with Home, Work and Writing pages behind a full-screen menu. Writing posts are plain Markdown files.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

No environment variables or accounts are needed.

## Make it yours

| To change | Edit |
| --- | --- |
| Name, tagline, site description | `profile` and `siteDescription` in `lib/content.ts` |
| Photo | Add a square image to `public/images/`, then set `profile.image.src` and `alt` in `lib/content.ts` |
| Menu links | `nav` in `lib/content.ts` (each one needs a matching page in `app/`) |
| GitHub, LinkedIn and other profile links | `elsewhere` in `lib/content.ts` |
| Projects on the Work page | `work.entries` in `lib/content.ts` |
| Writing page title and intro, back button text | `writing` in `lib/content.ts` |
| Colors, spacing, animation | `app/globals.css` |
| Font (Figtree, self-hosted) | `app/layout.tsx` |
| Favicon | `app/icon.svg` |

Project rows with `href: "#"` are placeholders. Replace each with a real URL (external links open in a new tab), or remove `href` to make the row plain text.

## Add a post

Add a `.md` file to `content/writing/`. That's the only step: the post appears on the Writing page, newest first, with its own page and table of contents.

```md
---
title: My first post
summary: A line or two about what this post covers.
date: 2026-11-08
---

The post itself, in normal Markdown.

## A section

### A sub-section
```

- **URL:** comes from the file name, so `my-first-post.md` becomes `/writing/my-first-post`.
- **Required fields:** `title`, `summary` and `date` (`YYYY-MM-DD`, shown as "Nov 2026"). If one is missing, the build stops and names the file.
- **Table of contents:** built from `#`, `##` and `###` headings, with `###` indented. It shows on windows 1100px and wider.
- **Images:** put them in `public/images/` and use `![Description](/images/photo.jpg)`.
- **Supported:** standard Markdown plus tables. Raw HTML in a post is not rendered.

`content/writing/hello-world.md` is a sample. Replace it with your first post rather than deleting it while the folder would be empty, because that case is untested.

## Common style tweaks

These are all in `app/globals.css`.

| To change | Edit |
| --- | --- |
| Accent color | `--brand` in section 3 |
| Page background and text colors | `--background`, `--foreground`, `--muted-foreground` in section 3 |
| Menu colors | `--menu`, `--menu-foreground`, `--menu-muted` in section 3 |
| Animation easing | `--ease`, `--ease-out` in section 3 |
| Height of the table of contents | `--toc-drop` under `.post-layout` (larger is lower) |
| Home page background | `opacity` under `.hero-vine` (keep it at 0.28 or below so the tagline stays readable). The image is `public/images/vines.webp` |

Colors set in section 3 apply across the whole site, including shadcn components.

## Deploy

The site is hosted on Vercel, connected to this GitHub repository. Merging to `main` publishes the site, and that includes adding a post. You can also add a post from GitHub using **Add file → Upload files** in `content/writing/` on `main`.

Before merging a code change, run:

```bash
npm run lint
npm run build
```

## How styling works

All styling lives in `app/globals.css`. Components only use class names such as `className="hero"`, and each class is defined in that file with `@apply` and plain CSS.

| Section in globals.css | What it holds |
| --- | --- |
| 2. Theme mapping | Exposes tokens as Tailwind utilities (`bg-brand`, `text-muted-foreground`, …) |
| 3. Design tokens | shadcn color roles plus `--brand` (orange) and `--menu-*` colors |
| 4. Base | Element defaults, focus ring, selection color |
| 5. Components | `.page`, `.hero-*`, `.entry-*`, `.post-*`, `.toc-*`, `.menu-*`, `.skip-link`, … |
| 6. Motion | Keyframes and the reduced-motion fallbacks |

The shadcn components in `components/ui/` keep their default variant classes so they can be updated with the shadcn CLI. To add one:

```bash
npx shadcn@latest add dialog
```

## Notes

- Orange is for marks and motion, not body text. On the off-white background it measures 3.1:1, which is too low for reading. The one exception is the hover state in the table of contents.
- All animation respects `prefers-reduced-motion`.
