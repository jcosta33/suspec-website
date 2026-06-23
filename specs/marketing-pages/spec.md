---
type: spec
id: SPEC-marketing-pages
title: Marketing content pages
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - specs/design-system/spec.md
  - reviews/REVIEW-SPEC-marketing-pages.md
---

# SPEC-marketing-pages — Marketing content pages

## Intent

Define the content, structure, and cross-linking for the secondary marketing
pages. This spec does not implement the pages; it sets the standard each page
must meet. Implementation is staged in `change-plans/website-launch.md`.

## Non-goals

- No full documentation reader.
- No API reference.
- No blog.

## Requirements

### AC-001 — Each page has standard metadata

Every marketing page exports a `metadata` object with:

- `title`: "<Page name> — Corpus"
- `description`: one-sentence summary.
- `openGraph.images`: `/og-<page>.png` static asset.

Verify with: inspect rendered HTML for each route; meta tags are present and
match the source spec.

### AC-002 — Pages link to each other and to canonical docs

Every page includes:

- A link back to `/`.
- Links to the other marketing pages where contextually relevant.
- Links to the `corpus` docs repo for deeper reference.

Verify with: crawl the marketing routes and assert no broken internal links;
external links point to `github.com/jcosta33/corpus*`.

### AC-003 — `/what-is-corpus` explains the framework

Content must match the `corpus` repo:

- Definition from `docs/01-what-is-corpus.md` line 5.
- "What Corpus is" list (lines 31–38).
- "What Corpus is not" list (lines 40–51).
- Adjacent-tools table (lines 55–61).
- Failure-modes table (lines 93–100).

Verify with: diff the page text against the source doc; any divergence is
flagged in the review packet.

### AC-004 — `/the-loop` walks through the six steps

Each step (Pull, Spec, Task, Run, Review, Close) gets its own section with:

- Step number and name.
- One-paragraph explanation.
- A concrete artifact example (intake note, spec AC, task packet, review row,
  finding file).

Verify with: all six steps have dedicated sections; examples render as code or
formatted text.

### AC-005 — `/get-started` links to adoption paths

Two paths:

1. **New repo:** use the `jcosta33/corpus-starter-kit` GitHub template.
2. **Existing project:** copy the kit into a workspace folder.

Plus a link to `docs/ADOPTING.md` in the `corpus` repo.

Verify with: both links resolve; `npm run build` passes.

### AC-006 — `/skills` and `/cli` are post-launch pages

These pages are explicitly out of the launch wave. They are reserved routes with
a placeholder card reading "Coming soon" and a link to the respective GitHub
repos (`jcosta33/corpus-skills`, `jcosta33/corpus-cli`).

Verify with: the routes exist and render; no over-promising copy; links are
valid.

### AC-007 — 404 page uses the global shell

The default Next.js not-found page is replaced with a Corpus-branded 404 that
uses the global shell and links back to `/`.

Verify with: visit a non-existent route; the 404 page renders with nav/footer
and a "Back to hive" link.

## Open questions

- (non-blocking) Should `/the-loop` be one long page or six sub-pages?
- (non-blocking) Do we need a dedicated `/examples` page for the 41-file review
  walkthrough, or does the homepage section suffice?

## Affected areas

- `app/what-is-corpus/page.tsx`
- `app/the-loop/page.tsx`
- `app/get-started/page.tsx`
- `app/skills/page.tsx`
- `app/cli/page.tsx`
- `app/not-found.tsx`

## Sources

All marketing copy derives from the `corpus` framework repo
(`https://github.com/jcosta33/corpus`). The authoritative sources are tracked in
`CONTENT.md` and reviewed quarterly for drift.

- Homepage, `/what-is-corpus`: `docs/01-what-is-corpus.md`
- `/the-loop`: `docs/02-basic-workflow.md`
- `/get-started`: `docs/ADOPTING.md`
- `/skills`, `/cli`: placeholder pages linking to their future repos.

## Dropped from sources

- `/docs` subsite — docs live in the `corpus` repo; website links there.
- `/pricing` — Corpus is free/open source.
- Full customer case studies — none exist.
