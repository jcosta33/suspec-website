---
type: task
id: TASK-deployment-ci
source:
  - SPEC-deployment
  - SPEC-testing
  - CHANGE-website-launch
scope: [SPEC-deployment AC-001–AC-006, SPEC-testing AC-001–AC-006]
status: ready
---

# Task: Configure deployment and CI

## Source

- Specs: `specs/deployment/spec.md`, `specs/testing/spec.md`
- Change plan: `change-plans/website-launch.md` (CHANGE-website-launch, wave 5)

## Scope

Configure static export, Vercel deployment, GitHub Actions CI, and quality
gates.

## Do not change

- Do not change page content.

## Affected areas

- `next.config.ts`
- `.github/workflows/ci.yml`
- `package.json`
- `vercel.json` (if needed)
- `.env.example`
- `README.md`

## Verify

- [ ] `npm run build` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npx tsc --noEmit` exits 0
- [ ] Link checker passes on `dist/`
- [ ] Accessibility checker passes on `dist/`
- [ ] Vercel production deployment succeeds

## Findings

## Run summary

- Changed files:
  - `next.config.ts` — static export (`output: 'export'`, `distDir: 'dist'`, `trailingSlash: true`, unoptimized images)
  - `.github/workflows/ci.yml` — CI pipeline: type check, lint, build, linkinator, axe, Lighthouse with thresholds
  - `package.json` — added dev tools: `@axe-core/cli`, `lighthouse`, `linkinator`, `serve`
  - `vercel.json` — Vercel build/output config
  - `.env.example` — documented (no secrets required)
  - `README.md` — stack, dev, build, quality gates, deployment notes
  - `.gitignore` — added `/dist`
  - `eslint.config.mjs` — ignore `dist/**`
- Verify results:
  - `npm run build` — passes; static export to `dist/` with 12 routes
  - `npm run lint` — passes
  - `npx tsc --noEmit` — passes
  - `linkinator` on served `dist/` — 18 links scanned, 0 broken (GitHub/external skipped)
  - `axe` on served `dist/` — 0 violations
  - `lighthouse` (desktop) — Performance 100, Accessibility 100, Best Practices 100, SEO 100
  - `dist/` contains no markdown from Corpus workspace folders
  - Vercel production deployment not yet verified (requires push to `main` after merge)
- Out-of-scope edits: none
- Blocked questions: none
