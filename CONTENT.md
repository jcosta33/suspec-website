# Content sources and review cadence

This file tracks where the Corpus website's marketing copy comes from and when it
was last checked against the canonical framework docs.

## Canonical sources

The framework's canonical docs live in the `swarm` repo:

- <https://github.com/jcosta33/swarm/blob/main/docs/01-what-is-swarm.md>
- <https://github.com/jcosta33/swarm/blob/main/docs/ADOPTING.md>
- <https://github.com/jcosta33/swarm/blob/main/README.md>

## Page source map

| Page | Source files in `swarm` repo |
|---|---|
| `/` (homepage) | `docs/01-what-is-swarm.md` (problem statement, feature list), `README.md` (tagline) |
| `/what-is-swarm` | `docs/01-what-is-swarm.md` (definition, is/is-not lists, adjacent-tools table, failure-modes table) |
| `/the-loop` | `docs/02-basic-workflow.md`, `specs/design-system/spec.md` (loop diagram) |
| `/get-started` | `docs/ADOPTING.md` (adoption paths) |
| `/skills` | `swarm-skills` repo (future work) |
| `/agents` | `swarm-agents` repo (Claude-Code-first worker definitions; ADR-0092) |
| `/cli` | `swarm-cli` repo (future work) |

## Quarterly review

Review this website against the canonical sources every three months. Save the
result in `findings/content-drift-YYYY-MM.md`.

## Content workflow

For new copy or updates, follow the Corpus loop:

1. Intake item in `intake/`.
2. Spec in `specs/` referencing the framework ADR or doc.
3. Task in `tasks/`.
4. Review in `reviews/`.
5. Finding in `findings/` if lessons emerge.

## Last reviewed

2026-06-13 — initial launch build.
