# Portfolio

A minimal portfolio in black, white and orange. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and shadcn/ui.

Pages: Home, Work, Writing, behind a full-screen menu.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## How styling works

All styling lives in **`app/globals.css`**. The components only use class names such as `className="hero"`, and every one of those classes is defined in that file with `@apply` and plain CSS.

| Section in globals.css | What it holds                                                   |
| ---------------------- | --------------------------------------------------------------- |
| 2. Theme mapping       | Exposes tokens as Tailwind utilities (`bg-brand`, `text-muted-foreground`, …) |
| 3. Design tokens       | shadcn color roles plus `--brand` (orange) and `--menu-*` colors |
| 4. Base                | Element defaults, focus ring, selection color                  |
| 5. Components          | `.page`, `.hero-*`, `.entry-*`, `.menu-*`, `.skip-link`, …     |
| 6. Motion              | Keyframes and the reduced-motion fallbacks                     |

To change a color across the whole site, including shadcn components, edit section 3.

The shadcn components in `components/ui/` keep their default variant classes, so they can be updated with the shadcn CLI. They take their colors from the same tokens.

## Where to edit

| To change                                 | Edit                     |
| ----------------------------------------- | ------------------------ |
| Name, tagline, nav, links, projects, posts | `lib/content.ts`        |
| Photo | Add a square image to `public/images/`, then set `profile.image.src` in `lib/content.ts` |
| Colors, type, spacing, animation          | `app/globals.css`        |
| Font (Figtree, self-hosted)               | `app/layout.tsx`         |
| Favicon                                   | `app/icon.svg`           |

## Adding shadcn components

```bash
npx shadcn@latest add dialog
```

## Notes

- Rows in `lib/content.ts` with `href: "#"` are placeholders. Replace each with a real URL (external links open in a new tab), or remove `href` to make the row plain text.
- Orange is used only for marks and motion, never for text. On the off-white background it measures 3.1:1, which is enough for those details but too low for readable text.
- All animation respects `prefers-reduced-motion`.
