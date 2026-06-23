---
type: task
id: TASK-spacing-rhythm
source:
  - SPEC-spacing-rhythm
scope: [AC-001, AC-002, AC-003, AC-004]
status: ready
---

# Task: Marketing spacing and CTA rhythm

## Source

- Spec: `specs/spacing-rhythm/spec.md` (SPEC-spacing-rhythm)

## Scope

Implement or preserve:

- AC-001 — CTA groups have visible breathing room.
- AC-002 — Section spacing is consistent by section type.
- AC-003 — Compact surfaces keep internal rhythm.
- AC-004 — Mobile spacing preserves tap targets.

## Do not change

- Do not change global navigation behavior; `TASK-transparent-nav` owns it.
- Do not add new motion or animation motifs; `TASK-subtle-motion` owns them.
- Do not perform broad copy rewrites; only adjust grouping or line breaks needed
  for spacing.
- Do not change generated docs content.

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
- `app/components/Section.tsx`
- `app/components/Button.tsx`
- `app/components/Card.tsx`
- `app/components/PaperArtifact.tsx`

## Verify

- [ ] `npm run lint` (AC-001, AC-002, AC-003, AC-004)
- [ ] `npx tsc --noEmit` (AC-001, AC-002, AC-003, AC-004)
- [ ] Browser QA at desktop and 375px for `/`, `/what-is-corpus/`, `/the-loop/`,
  `/get-started/`, `/agents/`, `/skills/`, `/skills/writing/`, `/cli/`, `/mcp/`,
  and `/kitchen-sink/`; no body overflow, no glued CTA groups, controls are at
  least 44px tall where they stack (AC-001, AC-002, AC-003, AC-004)

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

- Changed files:
- Verify results:
- Out-of-scope edits:
- Blocked questions:
- Provenance:
