---
type: spec
id: SPEC-design-system
title: Website design system and global shell
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - decisions/0001-website-aesthetic.md
---

# SPEC-design-system — Website design system and global shell

## Intent

Establish a single, reusable visual language for the Corpus marketing site:
colors, typography, spacing, motion, and the global shell (navigation + footer)
that every page shares. The vibe is **drone corpus meets bee hive meets factory
floor** — functional, modular, slightly mechanical, but friendly.

## Non-goals

- No full component library docs page in this spec.
- No dark/light toggle in this spec; dark mode is the default.
- No CMS integration.

## Requirements

### AC-001 — Color palette is codified in `app/globals.css`

The site uses a constrained palette defined via Tailwind CSS v4 `@theme` block
in `app/globals.css`:

| Token                   | Hex       | Usage                                |
| ----------------------- | --------- | ------------------------------------ |
| `--color-corpus-yellow` | `#FACC15` | primary buttons, accents, highlights |
| `--color-factory-950`   | `#0A0A0A` | page background                      |
| `--color-factory-900`   | `#171717` | card/surface background              |
| `--color-factory-800`   | `#262626` | borders, dividers                    |
| `--color-concrete-100`  | `#F5F5F5` | primary text                         |
| `--color-concrete-400`  | `#A3A3A3` | secondary text                       |
| `--color-hazard-orange` | `#F97316` | warnings, badges, small highlights   |
| `--color-drone-green`   | `#22C55E` | success states                       |

Verify with: `npm run build` passes; inspect `app/globals.css` and confirm the
`@theme` block exports the tokens; `npx tailwindcss --help` exits 0.

### AC-002 — Typography uses three font families via `next/font`

- **Headings:** `Space Grotesk`, uppercase labels, weights 500–700.
- **Body:** `Inter`, weights 400–600.
- **Code:** `JetBrains Mono`, weights 400–500.

All fonts load through `next/font/google` in `app/layout.tsx` with
`display: swap`.

Verify with: `app/layout.tsx` imports and applies the fonts; `npm run build`
passes; the rendered HTML contains the font CSS variables.

### AC-003 — Global shell includes nav and footer

A `Shell` component renders on every route via `app/layout.tsx`:

- **Nav:**
  - Logo: "SWARM" wordmark linking to `/`.
  - Links: Product (`/what-is-corpus`), Loop (`/the-loop`), Docs
    (`https://github.com/jcosta33/corpus/blob/main/docs`), GitHub
    (`https://github.com/jcosta33/corpus`).
  - Mobile: hamburger menu below the `lg` breakpoint (1024px).
- **Footer:**
  - Copyright: "© 2026 Corpus contributors.".
  - Links: GitHub, Starter kit, Docs, Colophon.
  - Colophon line: "Built with Corpus by agents who review their own diffs."

Verify with: `npm run build` passes; every generated page contains exactly one
`<nav>` and one `<footer>`; nav links are valid `href` attributes.

### AC-004 — Shared components exist, render on `/kitchen-sink`, and are typed

At minimum, in `app/components/`:

- `Button` — primary (yellow), secondary (ghost), with hover/active/focus
  states. Disabled state included.
- `Card` — bordered surface with subtle hover lift.
- `Badge` — small label for tags (e.g., "free", "open source", "coming soon").
- `Section` — max-width wrapper (`max-w-7xl`) with vertical rhythm.
- `CodeBlock` — styled preformatted block for spec/review examples.

A `/kitchen-sink` route renders all components with sample props. This route is
excluded from production navigation and has `robots` meta `noindex`.

Verify with: `npm run build` and `npm run lint` pass; `/kitchen-sink` renders
without errors; components have TypeScript prop types.

### AC-005 — Hazard-stripe motif is reusable

A `HazardStripe` component or utility class renders a yellow/black diagonal
striped divider (angle 45deg, stripe width 16px). Used at least once on the
homepage.

Verify with: visual inspection of the homepage build; the motif appears at
least once.

### AC-006 — Icon strategy uses Lucide React

All icons come from `lucide-react`. No ad-hoc SVG icons except the logo.

Verify with: `package.json` includes `lucide-react`; `npm run build` passes;
searching `app/` finds only Lucide imports or the logo SVG.

### AC-007 — Text contrast meets WCAG AA

All text/background combinations in the default palette pass WCAG AA (4.5:1 for
normal text, 3:1 for large text). The primary yellow is used on dark surfaces,
never on light surfaces.

Verify with: automated contrast check via `axe-core` or manual inspection
report; `npm run build` passes.

### AC-008 — Motion respects `prefers-reduced-motion`

Any CSS animation or transition respects `prefers-reduced-motion: reduce` by
falling back to instant state changes. The hex-grid hero animation is
CSS-based, not JS-driven, and honors the preference.

Verify with: toggle `prefers-reduced-motion` in browser dev tools; animations
stop or reduce.

### AC-009 — Responsive breakpoint for mobile nav is `lg`

The mobile hamburger menu appears below 1024px and the desktop nav appears at
1024px and above.

Verify with: resize browser to 1023px and 1024px; nav switches correctly.

## Open questions

- (non-blocking) Should the hero hex grid animate continuously or only on load?

## Affected areas

- `app/layout.tsx`
- `app/globals.css`
- `app/components/`
- `app/kitchen-sink/page.tsx`
- `public/`

## Dropped from sources

- Light mode toggle — out of scope; dark factory-floor default is the brand.
- Storybook — too much setup for launch; `/kitchen-sink` route suffices.
- Full marketing animations — keep motion minimal and performant.
