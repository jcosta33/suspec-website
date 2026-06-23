---
type: spec
id: SPEC-spacing-rhythm
title: Marketing spacing and CTA rhythm
status: ready
owner: corpus-website
sources:
  - user-request:2026-06-24-design-refinement
  - specs/design-system/spec.md
  - specs/homepage/spec.md
  - specs/marketing-pages/spec.md
---

# SPEC-spacing-rhythm — Marketing spacing and CTA rhythm

## Intent

Normalize the vertical rhythm across the corpus marketing pages so sections,
cards, and calls to action feel deliberate instead of squeezed together. The
site should stay dense and useful, but CTAs must never look glued to the text
above them.

## Non-goals

- No copy rewrite beyond spacing-related line breaks or grouping.
- No navigation behavior changes.
- No new visual motifs or animation behavior.

## Requirements

### AC-001 — CTA groups have breathing room

When a CTA group follows a heading, paragraph, artifact, or list on any primary
marketing route, the CTA group must have visible vertical separation from that
content on desktop and mobile.

Verify with: run a Playwright inspection against `/`, `/what-is-corpus/`,
`/the-loop/`, `/get-started/`, `/agents/`, `/skills/`, `/skills/writing/`,
`/cli/`, `/mcp/`, and `/kitchen-sink/`; capture before/after screenshots for
at least `/`, `/get-started/`, and `/mcp/`; no CTA group appears visually glued
to preceding text.

### AC-002 — Section spacing is consistent by section type

When a top-level section, band, or route header appears on a marketing page, its
outer spacing must follow a small set of repeated rhythms so adjacent sections
feel related across pages.

Verify with: visual QA screenshots of `/`, `/what-is-corpus/`, `/the-loop/`,
`/get-started/`, `/agents/`, `/skills/`, `/cli/`, and `/mcp/`; reviewers can
identify the repeated route-header, section, grid, and closing-CTA rhythms.

### AC-003 — Compact surfaces keep internal rhythm

When cards, paper artifacts, command examples, terminal panels, or index items
contain multiple content blocks, the internal gaps must keep headings, body
copy, badges, and actions from touching.

Verify with: inspect `/kitchen-sink/`, `/skills/`, `/agents/`, `/cli/`, and
`/mcp/` at desktop and 375px mobile widths; no component text or action cluster
touches a sibling block.

### AC-004 — Mobile spacing preserves tap targets

When CTA groups stack on screens 375px wide, each link or button must preserve a
minimum 44px tap target and visible spacing from neighboring controls.

Verify with: run a Playwright check at 375px that reports CTA link/button
bounding boxes and gaps; every route listed in AC-001 has no body overflow and
all CTA controls are at least 44px tall.

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
- `app/components/`

## Dropped from sources

- Broad copy rewrite — handled by the existing copy pass and out of scope here.
- Navigation transparency — split to `SPEC-transparent-nav`.
- Animation/flourish work — split to `SPEC-subtle-motion`.
