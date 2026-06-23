---
type: task
id: TASK-marketing-pages
source:
  - SPEC-marketing-pages
  - CHANGE-website-launch
scope: [AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007]
status: ready
---

# Task: Implement marketing pages

## Source

- Spec: `specs/marketing-pages/spec.md` (SPEC-marketing-pages)
- Change plan: `change-plans/website-launch.md` (CHANGE-website-launch, wave 3)

## Scope

Implement `/what-is-swarm`, `/the-loop`, `/get-started`, placeholder `/skills`
and `/cli`, and the custom 404 page.

## Do not change

- Do not implement the full examples page; defer to post-launch.

## Affected areas

- `app/what-is-swarm/page.tsx`
- `app/the-loop/page.tsx`
- `app/get-started/page.tsx`
- `app/skills/page.tsx`
- `app/cli/page.tsx`
- `app/not-found.tsx`

## Verify

- [ ] `npm run build` exits 0
- [ ] All routes render without errors
- [ ] Internal links are valid (linkinator)
- [ ] Content matches source docs in `swarm` repo

## Findings

## Run summary

- Changed files:
  - `app/what-is-swarm/page.tsx` — framework explainer with is/is-not lists, adjacent-tools table, failure-modes grid
  - `app/the-loop/page.tsx` — six-step loop with code examples
  - `app/get-started/page.tsx` — starter-kit and existing-project adoption paths
  - `app/skills/page.tsx` — placeholder "Coming soon" page
  - `app/cli/page.tsx` — placeholder "Coming soon" page
  - `app/colophon/page.tsx` — colophon page (linked from footer)
  - `app/not-found.tsx` — Corpus-branded 404 with nav/footer
  - `next.config.ts` — static export (`output: 'export'`, `distDir: 'dist'`, `trailingSlash: true`)
  - `eslint.config.mjs` — ignore `dist/**`
  - `public/og-*.png` — generated OG images for all pages
- Verify results:
  - `npm run build` — passes; 11 static routes generated
  - `npm run lint` — passes
  - `npx tsc --noEmit` — passes
  - `linkinator` on `dist/` served locally — 19 links scanned, 0 broken (GitHub links skipped)
  - All page titles match `<Page name> — Corpus` pattern
  - `/colophon/` route resolves (footer link no longer broken)
- Out-of-scope edits: none
- Blocked questions: none
