---
type: change-plan
id: CHANGE-website-launch
title: Launch the Corpus marketing website
status: draft
kind: architecture-cleanup
owner: corpus-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
  - specs/design-system/spec.md
  - specs/homepage/spec.md
  - specs/marketing-pages/spec.md
  - specs/deployment/spec.md
  - specs/accessibility/spec.md
  - specs/seo/spec.md
  - specs/testing/spec.md
  - specs/content-workflow/spec.md
preserves: []
created: 2026-06-13
---

# Change Plan: Launch the Corpus marketing website

## Intent

Take the corpus-website repo from a bare Next.js + Corpus workspace scaffold to a
deployed marketing site with a homepage, three core marketing pages, and
production-ready infrastructure.

## Why this change is needed

The framework needs a public face. The initial specs were reviewed adversarially
(FINDING-website-launch-gaps) and found to be good page outlines but missing
launch-critical concerns: deployment, accessibility, SEO, testing, and content
workflow. This plan sequences the work so each wave leaves the site green.

## Baseline

- Next.js 16 + Tailwind CSS scaffold builds successfully.
- Corpus workspace files are in place.
- Four initial specs exist; reviews blocked them on missing concerns.
- No pages beyond the default Next.js landing page exist.
- No deployment target configured.

## Target state

- Static Next.js site deployed to Vercel from `main`.
- Design system implemented with yellow/factory/drone aesthetic.
- Homepage live with hero, problem section, loop diagram, example, feature grid,
  and CTA.
- Marketing pages live: `/what-is-corpus`, `/the-loop`, `/get-started`.
- Placeholder pages live: `/skills`, `/cli` (post-launch content).
- Accessibility, SEO, and testing specs implemented.
- CI runs build, lint, type check, link check, and accessibility audit on every
  PR.

## Behavioral preservation guarantees

| ID     | Behavior                                                            | Verify with                                                |
| ------ | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| PG-001 | The default Next.js landing page is replaced by the Corpus homepage | `npm run build` + visual inspection                        |
| PG-002 | The Corpus workspace files remain untouched by the build            | `dist/` contains no markdown from `specs/`, `tasks/`, etc. |
| PG-003 | Build output is pure static HTML/JS/CSS                             | `next.config.ts` uses `output: 'export'`                   |

## Non-goals

- No blog.
- No interactive demo.
- No full examples page (homepage example suffices for launch).
- No serverless functions.
- No visual regression suite.

## Affected surfaces

| Surface                    | Intended change                                |
| -------------------------- | ---------------------------------------------- |
| `app/`                     | New pages, layout, components, global styles   |
| `public/`                  | Static assets, OG images, favicon, robots.txt  |
| `next.config.ts`           | Static export config                           |
| `package.json`             | Add dev tools (axe, linkinator, Lighthouse CI) |
| `.github/workflows/ci.yml` | CI quality gates                               |
| `README.md`                | Deployment and contribution docs               |

## Risk areas

- Tailwind v4 syntax may differ from spec assumptions; verify early in wave 1.
- Yellow-on-black palette can fail contrast; verify in wave 1.
- Marketing copy may drift from `corpus` docs; source links must be explicit.

## Transformation waves

1. **Wave 1 — Foundation.** Implement design system, global shell, and
   `/kitchen-sink`. Verify: build, lint, type check pass; contrast check passes.
2. **Wave 2 — Homepage.** Implement hero, problem section, loop diagram,
   example, feature grid, CTA. Verify: Lighthouse Performance ≥ 90, no a11y
   violations.
3. **Wave 3 — Marketing pages.** Implement `/what-is-corpus`, `/the-loop`,
   `/get-started`, placeholder `/skills` and `/cli`. Verify: all routes render,
   internal links valid.
4. **Wave 4 — SEO + 404.** Add metadata, OG images, sitemap, robots.txt,
   custom 404. Verify: meta tags correct, sitemap valid.
5. **Wave 5 — Deployment + CI.** Configure Vercel, static export, GitHub
   Actions. Verify: production build deploys, CI gates pass.
6. **Wave 6 — Content workflow.** Add `CONTENT.md`, source notes, and a
   quarterly-review reminder. Verify: every page has documented sources.

## Cutover conditions

- All waves complete and reviewed.
- Domain resolves and serves the site.
- CI passes on `main`.
- Lighthouse scores meet thresholds.

## Rollback criteria

- Domain does not resolve within 1 hour of deployment.
- Lighthouse Performance < 80 after launch.
- Accessibility checker reports critical violations.

## Verification strategy

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Link checker reports no internal 404s
- [ ] Accessibility checker reports no violations
- [ ] Lighthouse thresholds met
- [ ] Vercel production deployment succeeds

## Review focus

- Contrast ratios and reduced motion.
- Correctness of links to `corpus`, `corpus-starter-kit`, `corpus-skills`,
  `corpus-cli` repos.
- Whether the homepage headline matches the brand position.
- Whether `/skills` and `/cli` are honest about being future work.

## Task split

| Task                  | Wave | Scope                                                      |
| --------------------- | ---- | ---------------------------------------------------------- |
| TASK-design-system    | 1    | SPEC-design-system AC-001–AC-009                           |
| TASK-homepage         | 2    | SPEC-homepage AC-001–AC-010                                |
| TASK-marketing-pages  | 3    | SPEC-marketing-pages AC-001–AC-007                         |
| TASK-seo              | 4    | SPEC-seo AC-001–AC-005                                     |
| TASK-deployment-ci    | 5    | SPEC-deployment AC-001–AC-006 + SPEC-testing AC-001–AC-006 |
| TASK-content-workflow | 6    | SPEC-content-workflow AC-001–AC-004                        |
