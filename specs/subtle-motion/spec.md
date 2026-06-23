---
type: spec
id: SPEC-subtle-motion
title: Subtle visual flourishes and motion
status: ready
owner: corpus-website
sources:
  - user-request:2026-06-24-design-refinement
  - specs/design-system/spec.md
  - specs/homepage/spec.md
---

# SPEC-subtle-motion — Subtle visual flourishes and motion

## Intent

Add restrained motion and visual flourishes so the corpus site feels alive
without becoming theatrical. The effect should support the three-way visual
language: warm control surfaces, alchemical signals, and manuscript artifacts.

## Non-goals

- No new animation library.
- No large hero rewrite or interactive demo.
- No motion that hides copy, shifts layout, or delays navigation.

## Requirements

### AC-001 — Interactive surfaces respond subtly

When a user hovers or focuses links, buttons, cards, paper artifacts, and command
surfaces, the element must respond with restrained color, border, shadow, or
transform feedback without changing layout size.

Verify with: inspect `/`, `/what-is-corpus/`, `/get-started/`, `/skills/`,
`/cli/`, `/mcp/`, and `/kitchen-sink/`; hover and keyboard focus states are
visible, polished, and do not cause layout shift.

### AC-002 — Ambient flourishes support the visual language

When the homepage and major route headers render, at least two subtle ambient
details must be visible across the system, such as warm scanlines, paper grain,
lamps, ruled marks, seal ticks, or terminal cursor effects.

Verify with: visual QA screenshots of `/`, `/the-loop/`, `/docs/`,
`/what-is-corpus/`, and `/mcp/`; reviewers can identify the flourishes and none
obscure text.

### AC-003 — Motion respects reduced-motion preferences

When `prefers-reduced-motion: reduce` is active, nonessential animation must
stop or become instant while the final static visual state remains usable.

Verify with: run a browser inspection with reduced motion enabled on `/`,
`/the-loop/`, `/cli/`, `/mcp/`, and `/kitchen-sink/`; seal, lamp, terminal,
hover, and diagram motion are disabled or near-instant.

### AC-004 — Motion remains lightweight

When the production site renders, the flourish pass must not add a runtime
animation dependency or introduce console errors, body overflow, or noticeable
load delay.

Verify with: `npm run build` passes; route QA for desktop and 375px mobile
shows no console errors or body overflow; `package.json` has no new animation
runtime dependency.

## Open questions

- None.

## Affected areas

- `app/globals.css`
- `app/components/`
- `app/page.tsx`
- `app/the-loop/page.tsx`
- `app/what-is-corpus/page.tsx`
- `app/cli/page.tsx`
- `app/mcp/page.tsx`
- `app/kitchen-sink/page.tsx`

## Dropped from sources

- Heavy sci-fi effects, particle systems, and scroll-jacking — all too loud for
  this pass.
- Animation libraries — CSS is sufficient for the requested level of motion.
