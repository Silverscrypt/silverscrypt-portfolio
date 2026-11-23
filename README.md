# Portfolio

A minimal portfolio in black, white and orange, with Home, Work and Writing pages behind a full-screen menu. Writing posts are plain Markdown files, which can be published straight from an Obsidian vault.

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
| About section on the home page | `about` in `lib/content.ts` |
| Photo | Add a square image to `public/images/`, then set `profile.image.src` and `alt` in `lib/content.ts` |
| Menu links | `nav` in `lib/content.ts` (each one needs a matching page in `app/`) |
| GitHub, LinkedIn and other profile links | `elsewhere` in `lib/content.ts` |
| Projects on the Work page | One `.md` file per project in `content/work/` (see [Add a project](#add-a-project)) |
| Writing page title and intro | `writing` in `lib/content.ts` (posts are the `.md` files in `content/writing/`) |
| Back button and contents labels on posts and projects | `article` in `lib/content.ts` |
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
- **Images:** put them in `public/writing/` and embed them by file name, either Obsidian style or as plain Markdown (see below). If a post embeds an image that isn't there, the build stops and names it.
- **Preview image:** the post's first image appears as a small thumbnail on the Writing page. To pick a different one, add `image: photo.jpg` to the frontmatter.
- **Supported:** standard Markdown plus tables and footnotes. Raw HTML in a post is not rendered.

| You write | You get |
| --- | --- |
| `![[photo.jpg]]` | The image |
| `![[photo.jpg\|A short description]]` | The image, with that description for screen readers |
| `![[photo.jpg\|400]]` | The image, 400px wide (`400x300` also works) |
| `![A short description](photo.jpg)` | The image, plain Markdown style |

## Add a project

Add a `.md` file to `content/work/`. It works like a post, with a few extra fields:

```md
---
title: My Project
summary: One sentence about what it is.
date: 2026-01-31
period: 2026 to Present
repo: https://github.com/you/my-project
site: https://my-project.example.com
image: /images/work/my-project.png
imageAlt: The app's home screen.
---
```

- **Required fields:** `title`, `summary` and `date` (when it started, used for sorting).
- **`period`:** the label beside the row. Defaults to the year of `date`.
- **`repo` and `site`:** add **Source code** and **Live site** buttons. On wide windows they stay in the sidebar as you scroll. The Work list also gets a GitHub button for `repo`.
- **`image`:** a cover at the top of the project page and a thumbnail on the Work page. The path is inside `public/`.

## Publish from Obsidian

Posts can be written in an Obsidian vault and published automatically. A GitHub Actions workflow in the vault's repository copies notes from a `Website/` folder into `content/writing/`, and their images from `Attachments/Website/` into `public/writing/`, then commits to this repository. Vercel then redeploys.

The ready-to-use workflow, with step-by-step setup (folders, the Obsidian plugin, the access token), is in [`docs/obsidian-sync-workflow.txt`](docs/obsidian-sync-workflow.txt). Only those two folders are published, and deleting a note or image there removes it from the site too.

The workflow commits to `main`, so merge any site changes a new post depends on before publishing it.

## Common style tweaks

These are all in `app/globals.css`.

| To change | Edit |
| --- | --- |
| Accent color | `--brand` in section 3 |
| Page background and text colors | `--background`, `--foreground`, `--muted-foreground` in section 3 |
| Menu colors | `--menu`, `--menu-foreground`, `--menu-muted` in section 3 |
| Animation easing | `--ease`, `--ease-out` in section 3 |
| Height of the table of contents | `--toc-drop` under `.article-layout` (larger is lower) |
| Home page background | `opacity` under `.hero-vine` (keep it at 0.28 or below so the tagline stays readable). The image is `public/images/vines.webp` |
| Where the home background fades into the page | The `90%` in `mask-image` under `.hero-vine` (lower starts the fade earlier) |
| How far the scroll arrow hops | `@keyframes hop` in section 6 |

Colors set in section 3 apply across the whole site, including shadcn components.

## Deploy

The site is hosted on Vercel, connected to this GitHub repository. Merging to `main` publishes the site, and that includes adding a post. You can add a post from GitHub using **Add file → Upload files** in `content/writing/` on `main`, or [publish from Obsidian](#publish-from-obsidian).

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
| 5. Components | `.page`, `.hero-*`, `.scroll-cue`, `.about-*`, `.entry-*`, `.article-*`, `.toc-*`, `.menu-*`, `.skip-link`, … |
| 6. Motion | Keyframes and the reduced-motion fallbacks |

The shadcn components in `components/ui/` keep their default variant classes so they can be updated with the shadcn CLI. To add one:

```bash
npx shadcn@latest add dialog
```

## Notes

- Orange is for marks, icons and motion, not body text. Text needs 4.5:1 contrast against the off-white background to be easy to read, so check the shade before using it for words. The one exception is the hover state in the table of contents.
- All animation respects `prefers-reduced-motion`.
