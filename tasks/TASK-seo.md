---
type: task
id: TASK-seo
source:
  - SPEC-seo
  - CHANGE-website-launch
scope: [AC-001, AC-002, AC-003, AC-004, AC-005]
status: ready
---

# Task: Implement SEO and social sharing

## Source

- Spec: `specs/seo/spec.md` (SPEC-seo)
- Change plan: `change-plans/website-launch.md` (CHANGE-website-launch, wave 4)

## Scope

Add per-page metadata, OG images, sitemap, robots.txt, and canonical URLs.

## Do not change

- Do not add analytics scripts.

## Affected areas

- `app/*/page.tsx`
- `app/sitemap.ts`
- `public/robots.txt`
- `public/og-*.png`

## Verify

- [ ] `npm run build` exits 0
- [ ] `<head>` contains correct title/description on each route
- [ ] `sitemap.xml` is valid and lists expected routes
- [ ] `robots.txt` is served correctly

## Findings

## Run summary

- Changed files:
  - `app/layout.tsx` — added `metadataBase`, default OG `type: website`, siteName, canonical
  - `app/page.tsx` — added OG title/description/type and canonical
  - `app/what-is-corpus/page.tsx` — added OG title/description/type and canonical
  - `app/the-loop/page.tsx` — added OG title/description/type and canonical
  - `app/get-started/page.tsx` — added OG title/description/type and canonical
  - `app/skills/page.tsx` — added OG title/description/type and canonical
  - `app/cli/page.tsx` — added OG title/description/type and canonical
  - `app/colophon/page.tsx` — added canonical
  - `app/sitemap.ts` — generated sitemap with public routes
  - `public/robots.txt` — allow all, point to sitemap
- Verify results:
  - `npm run build` — passes; sitemap.xml generated
  - `npm run lint` — passes
  - `npx tsc --noEmit` — passes
  - All pages have title, description, canonical, og:title, og:description, og:image
  - `dist/sitemap.xml` lists `/`, `/what-is-corpus/`, `/the-loop/`, `/get-started/`, `/skills/`, `/cli/`; `/kitchen-sink` excluded
  - `dist/robots.txt` served with allow all and sitemap URL
  - All `public/og-*.png` images are 1200×630
- Out-of-scope edits: none
- Blocked questions: none
