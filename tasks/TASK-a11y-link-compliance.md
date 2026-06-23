---
type: task
id: TASK-a11y-link-compliance
source:
  - SPEC-a11y-link-compliance
scope: [AC-001, AC-002, AC-003, AC-004, AC-005]
status: ready
---

# Task: Accessibility and documentation link compliance

## Source

- Spec: `specs/a11y-link-compliance/spec.md` (SPEC-a11y-link-compliance)

## Scope

Implement or preserve:

- AC-001 — Contrast passes WCAG AA.
- AC-002 — Keyboard navigation reaches every interactive element.
- AC-003 — Navigation uses links for navigation and buttons for actions.
- AC-004 — Canonical docs references are real document links.
- AC-005 — Heading and landmark structure stays screen-reader friendly.

## Do not change

- Do not alter nav transparency behavior; `TASK-transparent-nav` owns it.
- Do not tune decorative motion; `TASK-subtle-motion` owns it.
- Do not re-space CTAs except where needed to restore focus or tap target
  accessibility.
- Do not change the generated docs content pipeline.

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
- `app/docs/`
- `app/components/`

## Verify

- [ ] `npm run lint` (AC-001, AC-002, AC-003, AC-004, AC-005)
- [ ] `npx tsc --noEmit` (AC-001, AC-002, AC-003, AC-004, AC-005)
- [ ] Automated accessibility check with `axe-core` or Lighthouse on `/`,
  `/docs/`, one long docs page, `/what-is-corpus/`, `/the-loop/`,
  `/get-started/`, `/agents/`, `/skills/`, `/skills/writing/`, `/cli/`, `/mcp/`,
  and `/kitchen-sink/`; no contrast, heading, landmark, link-name, or
  button-name violations remain (AC-001, AC-003, AC-005)
- [ ] Keyboard smoke test at desktop and 375px for `/`, `/docs/`,
  `/get-started/`, `/skills/`, `/cli/`, and `/mcp/`; all interactive elements
  are reachable in logical order with visible focus (AC-002)
- [ ] Link crawl confirms copy references to local `/docs/.../` documents use
  anchors with `target="_blank"` and `rel="noopener noreferrer"` (AC-003,
  AC-004)

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
