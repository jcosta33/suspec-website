---
type: task
id: TASK-subtle-motion
source:
  - SPEC-subtle-motion
scope: [AC-001, AC-002, AC-003, AC-004]
status: ready
---

# Task: Subtle visual flourishes and motion

## Source

- Spec: `specs/subtle-motion/spec.md` (SPEC-subtle-motion)

## Scope

Implement or preserve:

- AC-001 — Interactive surfaces respond subtly.
- AC-002 — Ambient flourishes support the visual language.
- AC-003 — Motion respects reduced-motion preferences.
- AC-004 — Motion remains lightweight.

## Do not change

- Do not add an animation runtime dependency.
- Do not change navigation transparency behavior; `TASK-transparent-nav` owns it.
- Do not perform route copy rewrites.
- Do not change CTA spacing except as a side effect of preserving layout when
  adding non-layout-shifting flourishes.

## Affected areas

- `app/globals.css`
- `app/components/Button.tsx`
- `app/components/Card.tsx`
- `app/components/PaperArtifact.tsx`
- `app/components/TerminalWindow.tsx`
- `app/components/PilotLamp.tsx`
- `app/components/LoopDiagram.tsx`
- `app/page.tsx`
- `app/the-loop/page.tsx`
- `app/what-is-corpus/page.tsx`
- `app/cli/page.tsx`
- `app/mcp/page.tsx`
- `app/kitchen-sink/page.tsx`
- `package.json`

## Verify

- [ ] `npm run lint` (AC-001, AC-002, AC-003, AC-004)
- [ ] `npx tsc --noEmit` (AC-001, AC-002, AC-003, AC-004)
- [ ] `npm run build` (AC-004)
- [ ] Browser QA for `/`, `/the-loop/`, `/docs/`, `/what-is-corpus/`, `/cli/`,
  `/mcp/`, and `/kitchen-sink/`: flourishes visible, no text obstruction, no
  console errors, no body overflow, and reduced-motion disables nonessential
  animation (AC-001, AC-002, AC-003, AC-004)
- [ ] `git diff -- package.json package-lock.json` shows no new animation
  runtime dependency (AC-004)

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

- Changed files: `app/globals.css`, `app/components/TerminalWindow.tsx`,
  `app/components/PilotLamp.tsx`, `app/components/LoopDiagram.tsx`,
  `app/page.tsx`, `app/the-loop/page.tsx`,
  `app/what-is-corpus/page.tsx`, `app/cli/page.tsx`,
  `app/mcp/page.tsx`, `app/kitchen-sink/page.tsx`,
  `tasks/TASK-subtle-motion.md`, `status.md`.
- Verify results: `rtk npm run lint` exited 0; output pasted in final.
- Verify results: `rtk npx tsc --noEmit` exited 0; output pasted in final.
- Verify results: `rtk npm run build` exited 0; output pasted in final.
- Verify results: Browser QA against `http://localhost:3001` exited 0 for
  desktop, 375px mobile, reduced-motion, and hover probes; output pasted in
  final.
- Verify results: `rtk git diff -- package.json package-lock.json` exited 0
  with no output; output pasted in final.
- Out-of-scope edits: None made for this task. Concurrent route spacing,
  color, and link edits were observed during diff review in files this task
  also touched and were preserved per the collaboration rule.
- Blocked questions: None.
- Provenance: Worker 4 implementation for TASK-subtle-motion.
