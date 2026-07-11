# Content sources and review cadence

This file tracks where website copy comes from and when it was last checked.

Copy rules:

- Be direct.
- Keep paragraphs short.
- Link to detail instead of repeating it.
- Do not make research claims without a source.
- Keep install instructions in one canonical place when possible.
- Present the product as originally designed — no transition narration.
- The only CLI surface the site may show is `suspec check` (three invocations,
  exit codes 0/1/2, `--json`) and `suspec check --contract`.

## Canonical sources

The framework docs are rendered from the canon repo (`suspec`; local checkout
name `corpus`) at build time. Marketing and ecosystem pages also draw from the
separate Suspec repos:

- <https://github.com/jcosta33/suspec/blob/main/README.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/01-what-is-suspec.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/02-basic-workflow.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/03-where-files-live.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/ADOPTING.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/10-integrations.md>
- <https://github.com/jcosta33/suspec/blob/main/docs/reference/cli.md>
- <https://github.com/jcosta33/suspec-skills> (the product: the skill family)
- <https://github.com/jcosta33/suspec-cli> (optional reinforcement: `suspec check`)
- <https://github.com/jcosta33/suspec-mcp> (the check surface for shell-less runners)
- <https://github.com/jcosta33/suspec-agents> (optional Claude Code worker definitions)

## Page source map

| Page              | Source files                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `/`               | `suspec/README.md`, `suspec/docs/01-what-is-suspec.md`                                   |
| `/what-is-suspec` | `suspec/docs/01-what-is-suspec.md`, `suspec/README.md`                                   |
| `/the-loop`       | `suspec/docs/02-basic-workflow.md`, `suspec/docs/03-where-files-live.md`                 |
| `/get-started`    | `suspec/docs/ADOPTING.md`, `suspec/docs/tutorial/README.md`                              |
| `/docs`           | generated from `suspec/docs/**`                                                          |
| `/skills`         | `suspec-skills/README.md`, `suspec-skills/skills/**/SKILL.md`                            |
| `/skills/writing` | `suspec-skills/README.md`, `suspec-skills/skills/**/SKILL.md`                            |
| `/agents`         | `suspec-agents/README.md`, `suspec-agents/agents/*.md`                                   |
| `/cli`            | `suspec/docs/reference/cli.md`, `suspec-cli/README.md`, `suspec/checks/checks.yaml`      |
| `/mcp`            | `suspec-mcp/README.md`, `suspec/docs/10-integrations.md`                                 |
| `/llms.txt`       | hand-authored site and docs index in `public/llms.txt`                                   |
| `/llms-full.txt`  | generated from user-facing docs in `suspec/docs/**`                                      |

## Quarterly review

Review this website against the canonical sources every three months. Save the
result as a durable note beside your own native artifacts (or as an issue on
this repo) — not as a process record committed here.

## Content workflow

New copy or updates follow the Suspec methodology: a lean spec for page-level
work (placed beside your native artifacts, named by explicit path), an
independent review of the result, and durable lessons saved as native harness
memories. Trivial copy fixes take the inline path — state the fix and its
verify command, implement, paste the output.

## Last reviewed

2026-07-11 — rewritten from the current canon (skills are the product; the CLI
is `suspec check` only; artifacts live beside native artifacts).
