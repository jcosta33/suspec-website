# Content sources and review cadence

This file tracks where website copy comes from and when it was last checked.

Copy rules:

- Be direct.
- Keep paragraphs short.
- Link to detail instead of repeating it.
- Do not make research claims without a source.
- Keep install instructions in one canonical place when possible.

## Canonical sources

The framework docs are rendered from the sibling `suspec` repo at build time.
Marketing and ecosystem pages also draw from the separate Suspec repos:

- <https://github.com/jcosta33/suspec/blob/main/docs/01-what-is-suspec.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/02-basic-workflow.md>
- <https://github.com/jcosta33/suspec/blob/main/README.md>
- <https://github.com/jcosta33/suspec-starter-kit>
- <https://github.com/jcosta33/suspec-cli>
- <https://github.com/jcosta33/suspec-mcp>
- <https://github.com/jcosta33/suspec-agents>
- <https://github.com/jcosta33/suspec-skills>

## Page source map

| Page              | Source files                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `/`               | `suspec/docs/01-what-is-suspec.md`, `suspec/README.md`                                               |
| `/what-is-suspec` | `suspec/docs/01-what-is-suspec.md`                                                                   |
| `/the-loop`       | `suspec/docs/02-basic-workflow.md`                                                                   |
| `/get-started`    | `suspec-starter-kit`, `suspec-cli`, `suspec/docs/tutorial/README.md`                                 |
| `/docs`           | generated from `suspec/docs/**`                                                                      |
| `/skills`         | `suspec-skills`                                                                                      |
| `/skills/writing` | `suspec-skills/docs`, `suspec-skills/skills/**/SKILL.md`                                             |
| `/agents`         | `suspec-agents`, `suspec/docs/adrs/0092-suspec-agents-member.md`                                     |
| `/cli`            | `suspec-cli`, `suspec/docs/adrs/0077-suspec-cli-reconcile-only-harness.md`                           |
| `/mcp`            | `suspec-mcp`, `suspec/docs/adrs/0085-suspec-mcp-adapts-the-json-contract.md`                         |
| `/llms.txt`       | hand-authored site and docs index in `public/llms.txt`                                               |
| `/llms-full.txt`  | generated from user-facing docs in `suspec/docs/**`                                                  |

## Quarterly review

Review this website against the canonical sources every three months. Save the
result in `findings/content-drift-YYYY-MM.md`.

## Content workflow

For new copy or updates, follow the Suspec loop:

1. Intake item in `intake/`.
2. Spec in `specs/` referencing the framework ADR or doc.
3. Task in `tasks/`.
4. Review in `reviews/`.
5. Finding in `findings/` if lessons emerge.

## Last reviewed

2026-06-24 — shortened after the Suspec docs rewrite.
