---
type: spec
id: SPEC-testing
title: Testing and quality gates
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
---

# SPEC-testing — Testing and quality gates

## Intent

Define the automated and manual checks that keep the website correct,
accessible, and fast as it evolves.

## Non-goals

- No unit tests for UI components (build + lint + a11y cover launch needs).
- No end-to-end browser test suite.
- No visual regression pipeline.

## Requirements

### AC-001 — Build passes on every PR

`npm run build` exits 0 and produces no TypeScript or ESLint errors.

Verify with: CI runs `npm run build` on every PR.

### AC-002 — Lint passes on every PR

`npm run lint` exits 0.

Verify with: CI runs `npm run lint` on every PR.

### AC-003 — Type checking passes

`npx tsc --noEmit` exits 0.

Verify with: CI runs the type check on every PR; no `any` types introduced
without a comment.

### AC-004 — Internal links are checked

A link checker script runs against the built `dist/` output and reports no 404s
for internal links.

Verify with: add a CI step running `npx linkinator dist/ --skip
'https://github.com'`; it exits 0.

### AC-005 — Accessibility is checked in CI

A CI step runs an accessibility audit on the built output (e.g., `axe-core`
via `pa11y-ci` or `@axe-core/cli`) and fails on violations.

Verify with: introduce a deliberate contrast violation; CI fails. Fix it; CI
passes.

### AC-006 — Lighthouse performance budget is checked

A CI step runs Lighthouse on `/` and reports Performance ≥ 90, Accessibility ≥
95, Best Practices ≥ 90, SEO ≥ 90.

Verify with: CI artifact includes Lighthouse report; thresholds are met.

## Open questions

- (non-blocking) Which accessibility runner should we use?
- (non-blocking) Should Lighthouse run on mobile, desktop, or both?

## Affected areas

- `.github/workflows/ci.yml`
- `package.json`
- `README.md`

## Dropped from sources

- Visual regression testing — out of scope for launch.
- End-to-end tests with Playwright — out of scope.
