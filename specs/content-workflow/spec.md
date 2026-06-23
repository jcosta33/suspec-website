---
type: spec
id: SPEC-content-workflow
title: Content update workflow
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
---

# SPEC-content-workflow — Content update workflow

## Intent

Define how marketing copy stays accurate as the `corpus` framework evolves. The
website must not silently drift out of sync with the canonical docs.

## Non-goals

- No automated CMS.
- No sync bot that opens PRs from `corpus` docs.
- No translation workflow.

## Requirements

### AC-001 — Copy sources are documented

Every marketing page lists its canonical sources in a `## Sources` section of
the spec or in a `CONTENT.md` file. For example, `/what-is-corpus` sources:

- `https://github.com/jcosta33/corpus/blob/main/docs/01-what-is-corpus.md`
- `https://github.com/jcosta33/corpus/blob/main/README.md`

Verify with: each marketing-page spec names its source docs; `CONTENT.md`
exists in the repo root or `docs/` folder.

### AC-002 — Content divergences are reviewed quarterly

A recurring task (or calendar reminder) reviews the website against the `corpus`
docs every three months. Findings are saved in `findings/`.

Verify with: a `findings/content-drift-YYYY-MM.md` file exists for the first
review.

### AC-003 — New framework features follow the Corpus loop

When a new Corpus feature warrants website copy, the workflow is:

1. Intake item in `intake/`.
2. Spec in `specs/` referencing the framework ADR.
3. Task in `tasks/`.
4. Review in `reviews/`.
5. Finding in `findings/` if lessons emerge.

Verify with: at least one content update has gone through the full loop.

### AC-004 — Outdated pages carry a freshness note

If a page references a feature marked "coming soon" or "future," the page must
say so explicitly and link to the relevant GitHub issue or ADR.

Verify with: `/skills` and `/cli` pages include "coming soon" badges and links.

## Open questions

- (non-blocking) Should we add a `LAST_REVIEWED` date to each page?

## Affected areas

- `README.md`
- `specs/marketing-pages/spec.md`
- `findings/`

## Dropped from sources

- Automated sync from `corpus` docs — too complex for launch.
- Translation workflow — out of scope.
