# Content sources and review cadence

This file tracks where website copy comes from and when it was last checked.

Copy rules:

- Be direct.
- Keep paragraphs short.
- Write bluntly, with a deadpan edge and the occasional useful pun.
- Cut brochure fog, grand headings, filler setup, and repeated explanations.
- Assume a senior engineer is reading. Explain the boundary or decision, not
  what a familiar tool is.
- Link to detail instead of repeating it.
- Do not make research claims without a source.
- Keep install instructions in one canonical place when possible.
- Present the methodology directly — no transition narration.
- The only CLI surface the site may show is `suspec check` (three invocations,
  exit codes 0/1/2, `--json`) and `suspec check --contract`.
- Keys and scaffold, never mandatory/optional (ADR-0144): the keys — spec,
  review, findings — are present on virtually every change; the spec, task
  split, inventory, change plan, and checker are scaffold the work pulls in.
  Seal semantics: hexagon = the six-step loop, inscribed triangle = the three
  keys.

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
- <https://github.com/jcosta33/suspec-skills> (installable skills that implement the methodology)
- <https://github.com/jcosta33/suspec-cli> (optional reinforcement: `suspec check`)
- <https://github.com/jcosta33/suspec-mcp> (the check surface for shell-less runners)

## Page source map

| Page              | Source files                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `/`               | `suspec/README.md`, `suspec/docs/01-what-is-suspec.md`, `suspec/docs/adrs/0144-keys-and-scaffold.md` |
| `/the-loop`       | `suspec/docs/02-basic-workflow.md`, `suspec/docs/03-where-files-live.md`, `suspec/docs/adrs/0144-keys-and-scaffold.md` |
| `/get-started`    | `suspec/docs/ADOPTING.md`, `suspec/docs/tutorial/README.md`                              |
| `/docs`           | generated from `suspec/docs/**`                                                          |
| `/skills`         | `suspec-skills/README.md`, `suspec-skills/skills/**/SKILL.md`                            |
| `/skills/writing` | `suspec-skills/README.md`, `suspec-skills/skills/**/SKILL.md`                            |
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

2026-07-13 — checked against the current canon, suspec-skills, suspec-cli, and
suspec-mcp. The methodology is the product; skills implement it, the CLI is
`suspec check`, MCP exposes the same check surface, and artifacts live beside
native artifacts. Deleted agents and starter-kit surfaces are absent.
