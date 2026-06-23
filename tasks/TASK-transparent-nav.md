---
type: task
id: TASK-transparent-nav
source:
  - SPEC-transparent-nav
scope: [AC-001, AC-002, AC-003, AC-004]
status: ready
---

# Task: Scroll-aware transparent navigation

## Source

- Spec: `specs/transparent-nav/spec.md` (SPEC-transparent-nav)

## Scope

Implement or preserve:

- AC-001 — Header starts visually transparent.
- AC-002 — Header becomes opaque after scroll.
- AC-003 — Mobile menu is readable and keyboard-operable.
- AC-004 — Focus and active states work in both nav states.

## Do not change

- Do not change route/page content.
- Do not change footer content.
- Do not add animation beyond the minimal state transition required for the nav.
- Do not alter CTA spacing; `TASK-spacing-rhythm` owns that pass.

## Affected areas

- `app/components/Shell.tsx`
- `app/globals.css`

## Verify

- [ ] `npm run lint` (AC-001, AC-002, AC-003, AC-004)
- [ ] `npx tsc --noEmit` (AC-001, AC-002, AC-003, AC-004)
- [ ] Browser QA for `/`, `/docs/`, `/what-is-corpus/`, `/the-loop/`,
  `/get-started/`, `/agents/`, `/skills/`, `/cli/`, and `/mcp/`: top-state nav
  is transparent; scrolled nav is opaque; mobile keyboard open/tab/Escape works
  at 375px (AC-001, AC-002, AC-003, AC-004)

## Agent instructions

1. Read the source spec first.
2. Stay inside this task's scope. If a requirement can't be met as written,
   stop and say why instead of improvising.
3. Run every Verify item and paste the real output — a claim without output
   counts as unverified.
4. Before finishing, re-read your own diff as a skeptic: what would a
   reviewer flag?
5. Fill `## Run summary` below — changed files, one line per Verify command
   citing its pasted output above, out-of-scope edits, blocked questions —
   and drop anything durable in `## Findings`.

## Findings

## Run summary

- Changed files: `app/components/Shell.tsx`, `tasks/TASK-transparent-nav.md`,
  `status.md`.
- Verify results: `npm run lint`, `npx tsc --noEmit`, and browser QA for `/`,
  `/docs/`, `/what-is-corpus/`, `/the-loop/`, `/get-started/`, `/agents/`,
  `/skills/`, `/cli/`, and `/mcp/` passed; real output is pasted in the final
  handoff.
- Out-of-scope edits: none by Worker 2. Concurrent non-owned diffs were
  observed in the worktree, including route/component/style/task files outside
  this task; they were left untouched.
- Blocked questions: none.
- Provenance: Worker 2 transparent-nav pass; browser QA used headless Chrome via
  temporary `/tmp` `playwright-core` against `npm run build` output served from
  `dist` at `http://localhost:3210` after the shared dev server became unhealthy.
