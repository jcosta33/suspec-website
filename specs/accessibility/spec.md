---
type: spec
id: SPEC-accessibility
title: Accessibility standards
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
---

# SPEC-accessibility — Accessibility standards

## Intent

Ensure the Corpus marketing site is usable by as many people as possible,
including those using keyboard navigation, screen readers, or reduced-motion
preferences. Target WCAG 2.2 Level AA.

## Non-goals

- No third-party accessibility statement or VPAT.
- No manual audit by a certified expert (use automated tools + checklist).

## Requirements

### AC-001 — Color contrast meets WCAG AA

All text and interactive elements meet WCAG AA contrast ratios:

- Normal text: 4.5:1 minimum.
- Large text (18pt+ or 14pt+ bold): 3:1 minimum.
- UI components and graphical objects: 3:1 minimum.

Verify with: run `axe-core` or Lighthouse accessibility audit; no contrast
violations.

### AC-002 — Focus indicators are visible

All interactive elements (links, buttons, form controls) have a visible focus
indicator. The default browser outline is acceptable if not overridden; custom
focus styles use `ring-2 ring-corpus-yellow ring-offset-2
ring-offset-factory-950`.

Verify with: tab through the page; every focusable element shows a visible
indicator.

### AC-003 — Heading hierarchy is logical

Each page has exactly one `<h1>` and headings do not skip levels.

Verify with: run `axe-core`; no heading-order violations.

### AC-004 — Images and icons have accessible names

- Decorative SVGs have `aria-hidden="true"`.
- Functional icons are accompanied by visible text or `aria-label`.
- The logo links to `/` and has an accessible name (e.g., "Corpus home").

Verify with: `axe-core` reports no "image-alt" or "button-name" violations.

### AC-005 — Reduced motion is respected

All CSS animations and transitions honor `prefers-reduced-motion: reduce`. The
hero hex grid stops animating; hover transitions become instant.

Verify with: enable reduced motion in OS/browser; reload the page; no motion
persists.

### AC-006 — Keyboard navigation works for mobile menu

The mobile hamburger menu can be opened, navigated, and closed using only the
keyboard.

Verify with: tab to the menu button, press Enter/Space, tab through menu
items, press Escape to close.

## Open questions

- (non-blocking) Should we add a skip-to-content link?

## Affected areas

- `app/globals.css`
- `app/components/`
- `app/layout.tsx`

## Dropped from sources

- Full manual WCAG audit — out of scope for launch; automated checks +
  checklist suffice.
