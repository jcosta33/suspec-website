---
type: task
id: TASK-homepage
source:
  - SPEC-homepage
  - CHANGE-website-launch
scope:
  [
    AC-001,
    AC-002,
    AC-003,
    AC-004,
    AC-005,
    AC-006,
    AC-007,
    AC-008,
    AC-009,
    AC-010,
  ]
status: ready
---

# Task: Implement homepage

## Source

- Spec: `specs/homepage/spec.md` (SPEC-homepage)
- Change plan: `change-plans/website-launch.md` (CHANGE-website-launch, wave 2)

## Scope

Implement the Corpus homepage: hero, problem section, loop diagram, spec/review
example, feature grid, final CTA, metadata, performance budget, and reduced-motion
support.

## Do not change

- Do not implement marketing pages yet.
- Do not add analytics.

## Affected areas

- `app/page.tsx`
- `app/components/` (if new page-specific components needed)
- `public/og-home.png`

## Verify

- [ ] `npm run build` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npx tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] No accessibility violations from automated checker
- [ ] Page metadata correct in rendered HTML
- [ ] 375px viewport has no body horizontal overflow

## Findings

## Run summary

- Changed files:
  - `app/page.tsx` — full homepage (hero, problem, loop, example, features, final CTA)
  - `app/components/HeroHexGrid.tsx` — animated SVG hex grid
  - `app/components/LoopDiagram.tsx` — six-step loop diagram
  - `app/components/Button.tsx` — added `asChild` support for Link usage
  - `app/globals.css` — added `animate-pulse-slow` keyframes and reduced-motion fallback
  - `public/og-home.png` — generated Open Graph image
- Verify results:
  - `npm run build` — passes
  - `npm run lint` — passes
  - `npx tsc --noEmit` — passes
  - Lighthouse (mobile): Performance 95, Accessibility 100, Best Practices 100, SEO 100
  - axe-core: 0 violations
  - 375px viewport: 0px horizontal body overflow
  - Metadata: title, description, and OG image present in rendered HTML
- Out-of-scope edits: none
- Blocked questions: none
