---
type: spec
id: SPEC-transparent-nav
title: Scroll-aware transparent navigation
status: ready
owner: corpus-website
sources:
  - user-request:2026-06-24-design-refinement
  - specs/design-system/spec.md
  - specs/accessibility/spec.md
---

# SPEC-transparent-nav — Scroll-aware transparent navigation

## Intent

Make the global navigation feel lighter at page entry: no visible background at
the top of the page, then a solid readable shell once the user scrolls or opens
the mobile menu. The behavior must preserve contrast, focus visibility, and
keyboard access.

## Non-goals

- No changes to nav destinations or copy.
- No redesign of the footer.
- No page-specific navigation variants.

## Requirements

### AC-001 — Header starts visually transparent

When a page is loaded at scroll position `0` and the mobile menu is closed, the
global header must render with no visible opaque background, border, blur, or
shadow.

Verify with: run a browser inspection on `/`, `/docs/`, `/what-is-corpus/`,
`/the-loop/`, `/get-started/`, `/agents/`, `/skills/`, `/cli/`, and `/mcp/` at
desktop width; computed styles and screenshots show the top-state header has no
visible background, border, blur, or shadow.

### AC-002 — Header becomes opaque after scroll

When the page scroll position moves past the top threshold, the global header
must switch to an opaque warm control-surface background with a visible divider
or shadow.

Verify with: run a browser inspection that scrolls each AC-001 route by at
least 80px; screenshots and computed styles show the scrolled-state header is
opaque and text remains readable.

### AC-003 — Mobile menu is readable and keyboard-operable

When the mobile menu opens below the `lg` breakpoint, the header/menu region
must use an opaque background, keep all nav links readable, and support opening,
tabbing through items, and closing with the keyboard.

Verify with: at 375px, tab to the menu control, press Enter or Space, tab
through all visible links, press Escape, and confirm focus remains visible and
the menu closes.

### AC-004 — Focus and active states work in both nav states

When any nav link or menu control receives keyboard focus, the focus indicator
must be visible against both the transparent top state and the opaque scrolled
state.

Verify with: keyboard-tab through desktop and mobile nav in top and scrolled
states; each focusable element has a visible focus indicator.

## Open questions

- None.

## Affected areas

- `app/components/Shell.tsx`
- `app/globals.css`

## Dropped from sources

- Sticky-header removal — the request changes top-state styling, not the
  existence of the persistent nav.
- Page-specific hero offsets — each page should continue using the shared shell.
