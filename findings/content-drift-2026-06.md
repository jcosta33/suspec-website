---
type: finding
id: FINDING-content-drift-2026-06
status: accepted
source: SPEC-content-workflow
---

# FINDING-content-drift-2026-06 — Initial content-source review

## Observation

The website marketing copy was sourced from the canonical `corpus` framework docs
during the initial launch build (2026-06-13). No drift was detected because the
site did not exist before this date.

## Affected pages

- `/` — homepage value prop, problem list, feature grid sourced from
  `docs/01-what-is-corpus.md`.
- `/what-is-corpus` — definition, is/is-not lists, adjacent-tools table,
  failure-modes table sourced from `docs/01-what-is-corpus.md`.
- `/the-loop` — six-step loop sourced from `docs/02-basic-workflow.md`.
- `/get-started` — adoption paths sourced from `docs/ADOPTING.md`.
- `/skills` and `/cli` — explicitly marked "Coming soon" with links to future
  repos.

## Recommended action

Schedule the next review for 2026-09-13 and save any divergences as a new
finding.
