---
type: spec
id: SPEC-homepage
title: Homepage
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - specs/design-system/spec.md
  - reviews/REVIEW-SPEC-homepage.md
---

# SPEC-homepage — Marketing homepage

## Intent

Create the landing page that explains Corpus in one scroll: what it is, why it
exists, how the loop works, and where to start. The page should feel like a
friendly factory foreman handing you a clipboard — not a SaaS sales deck.

## Non-goals

- No pricing page (Corpus is free/open source).
- No blog or changelog.
- No interactive demo beyond code snippets.
- No customer testimonials.
- No video explainer.

## Requirements

### AC-001 — Hero section states the value prop

Above the fold:

- **Headline:** "A hive for your coding agents."
- **Subheadline:** "Turn tickets into clear specs, specs into agent-ready tasks,
  and agent output into evidence you can review — plain markdown, any agent, no
  runtime."
- **Primary CTA:** "Copy the starter kit" linking to
  `https://github.com/jcosta33/corpus-starter-kit`.
- **Secondary CTA:** "Read the docs" linking to
  `https://github.com/jcosta33/corpus/tree/main/docs`.
- **Visual:** animated SVG hex grid in corpus yellow on the factory-950
  background; subtle, continuous motion.

Verify with: `app/page.tsx` renders the hero; `npm run build` passes; CTAs have
valid `href` attributes and open the correct URLs.

### AC-002 — Problem section names the five walls

A section listing the problems Corpus answers:

1. Vague tickets.
2. Re-pasted context.
3. Agent drift.
4. Giant PRs.
5. Lost findings.

Each wall gets a Lucide icon glyph, a one-line title, and a one-sentence
description matching the Corpus framework's stated problem set.

Verify with: the section renders; text matches `docs/01-what-is-corpus.md` in
the `corpus` repo.

### AC-003 — Loop section visualizes Pull → Spec → Task → Run → Review → Close

A horizontal diagram (desktop) stacking vertically (mobile) with six nodes.
Each node has a number, label, and one-sentence explanation. Arrows connect the
nodes. The section uses the hazard-stripe motif as a top border.

Verify with: all six steps appear in order; `npm run build` passes.

### AC-004 — Spec/review example shows the core artifact

A `CodeBlock`-styled example showing:

- A requirement with `Verify with:`.
- A small review packet table with one Pass and one Unverified row.

Verify with: the example renders without syntax errors; `npm run build` passes.

### AC-005 — Example renders correctly on mobile

The code block and review table do not cause horizontal overflow on screens
down to 375px wide. Long lines wrap or the container scrolls horizontally with
visible affordance.

Verify with: open the page at 375px viewport width; no unexpected horizontal
overflow on the body element.

### AC-006 — Feature grid highlights distinctives

Three cards (not four — keep it tight):

1. **Spec-first, not prompt-first.** Write the contract; let the agent execute.
2. **Review by exception.** Evidence per requirement, human attention only where
   needed.
3. **Honesty framework.** Every rule says whether it is convention, checklist,
   toolable, or enforced.

Verify with: cards render; copy is consistent with `corpus` docs.

### AC-007 — Final CTA section

A closing band with hazard-stripe borders, a punchy line ("Stop herding agents
with chat history."), and the starter-kit CTA again.

Verify with: `npm run build` passes; CTA links are valid.

### AC-008 — Page metadata is present

The page sets:

- `<title>`: "Corpus — a hive for your coding agents"
- `<meta name="description">`: "A lightweight spec and review workflow for
  teams using coding agents. Plain markdown, any agent, no runtime."
- Open Graph image: `/og-home.png` (static asset).

Verify with: inspect rendered HTML; meta tags are present and correct.

### AC-009 — Performance budget is met

The page scores ≥ 90 on Lighthouse Performance for mobile simulated in Chrome
DevTools, after a production build.

Verify with: run Lighthouse on `npm run build` output served by `npm run
start`; screenshot or report attached.

### AC-010 — Hero animation respects reduced motion

When `prefers-reduced-motion: reduce` is set, the hex grid is static.

Verify with: toggle preference in browser dev tools; animation stops.

## Open questions

- (non-blocking) Should the hex grid animate continuously or only on load?

## Affected areas

- `app/page.tsx`
- `app/components/`
- `public/og-home.png`

## Dropped from sources

- Customer testimonials — none exist yet.
- Video explainer — out of scope for launch.
- Live interactive demo — out of scope.
