---
type: spec
id: SPEC-a11y-link-compliance
title: Accessibility and documentation link compliance
status: ready
owner: corpus-website
sources:
  - user-request:2026-06-24-design-refinement
  - specs/accessibility/spec.md
  - specs/marketing-pages/spec.md
---

# SPEC-a11y-link-compliance — Accessibility and documentation link compliance

## Intent

Tighten the site’s accessibility pass beyond the original launch checklist:
contrast, keyboard navigation, semantic links/buttons, and canonical `/docs/`
references must all be correct. The site should behave like a serious reference
surface, not a set of styled divs.

## Non-goals

- No third-party VPAT or formal certified audit.
- No wholesale content rewrite unless a sentence needs a link target.
- No changes to the generated docs content pipeline.

## Requirements

### AC-001 — Contrast passes WCAG AA

When the primary marketing routes render in default colors, all text,
interactive controls, focus indicators, and meaningful graphical UI elements
must meet WCAG 2.2 AA contrast thresholds.

Verify with: run `axe-core` or Lighthouse accessibility checks against `/`,
`/docs/`, one long docs page, `/what-is-corpus/`, `/the-loop/`,
`/get-started/`, `/agents/`, `/skills/`, `/skills/writing/`, `/cli/`, `/mcp/`,
and `/kitchen-sink/`; no contrast violations remain.

### AC-002 — Keyboard navigation reaches every interactive element

When a keyboard-only user tabs through desktop and mobile layouts, every link,
button, menu item, and interactive control must be reachable in a logical order
with a visible focus state.

Verify with: run a keyboard smoke test on `/`, `/docs/`, `/get-started/`,
`/skills/`, `/cli/`, and `/mcp/` at desktop and 375px mobile widths; no
interactive element is skipped or trapped.

### AC-003 — Navigation uses links for navigation and buttons for actions

When an element navigates to another route, document, repository, or anchor, it
must be an anchor/link with a valid `href`; when an element changes UI state, it
must be a button.

Verify with: inspect route DOM and React components; CTAs, cards, footer links,
and documentation references are anchors, while menu toggles remain buttons.

### AC-004 — Canonical docs references are real document links

When page copy references a concept that has a canonical document under the
local `/docs/` route, the reference must include a link to that local document
route. Links that open a referenced document from marketing copy must use
`target="_blank"` and `rel="noopener noreferrer"`.

Verify with: crawl primary routes and assert every intentional `/docs/.../`
document reference has `target="_blank"` and `rel` containing both `noopener`
and `noreferrer`; reviewers spot-check that framework concepts with local docs
links are linked where they are mentioned as deeper reference.

### AC-005 — Heading and landmark structure stays screen-reader friendly

When each route renders, it must contain one main landmark, exactly one primary
`h1`, and a logical heading order.

Verify with: run `axe-core` or Lighthouse accessibility checks on the AC-001
route list; no landmark, page-has-heading-one, or heading-order violations
remain.

## Open questions

- None.

## Affected areas

- `app/page.tsx`
- `app/what-is-corpus/page.tsx`
- `app/the-loop/page.tsx`
- `app/get-started/page.tsx`
- `app/agents/page.tsx`
- `app/skills/page.tsx`
- `app/skills/writing/page.tsx`
- `app/cli/page.tsx`
- `app/mcp/page.tsx`
- `app/kitchen-sink/page.tsx`
- `app/docs/`
- `app/components/`

## Dropped from sources

- Full manual WCAG audit — out of scope for this pass; automated checks plus
  keyboard smoke tests are the acceptance bar.
- External GitHub docs migration — canonical links should use local `/docs/`
  where the local document exists.
