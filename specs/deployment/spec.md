---
type: spec
id: SPEC-deployment
title: Deployment to Vercel
status: draft
owner: swarm-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
---

# SPEC-deployment — Deployment to Vercel

## Intent

Define how the swarm-website repo builds and deploys to Vercel from the `main`
branch. The deployment must be reproducible, branch-preview friendly, and
compatible with the Corpus workspace files living alongside the Next.js app.

## Non-goals

- No multi-region CDN configuration.
- No custom server or serverless functions.
- No staging environment beyond Vercel preview deployments.

## Requirements

### AC-001 — `next.config.ts` is configured for static export

The Next.js config sets:

```ts
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
```

Verify with: `npm run build` produces a `dist/` folder with `index.html` and
static assets; no server-side runtime required.

### AC-002 — Vercel project ignores Corpus workspace files

The Vercel build does not treat `specs/`, `tasks/`, `reviews/`, `findings/`,
`change-plans/`, `decisions/`, `intake/`, `inventory/`, `templates/`, or
`advanced/` as routes or build inputs. They are ignored via `.gitignore` or
Vercel project settings.

Verify with: the production build only contains routes defined in `app/`;
`dist/` does not include markdown files from Corpus folders.

### AC-003 — `main` branch auto-deploys

Pushing to `main` triggers a Vercel production deployment. Pull requests
against `main` trigger preview deployments.

Verify with: make a test commit on a branch; a preview URL is generated. Merge
it; production URL updates.

### AC-004 — Custom domain is configured

The site serves from `swarm.dev` (or the chosen domain). `www` redirects to
the apex domain or vice versa.

Verify with: visit the domain; the site loads; `curl -I` shows the expected
redirect.

### AC-005 — Environment variables are documented

If any environment variables are needed (e.g., analytics key), they are listed
in `.env.example` and documented in `README.md`. No secrets are committed.

Verify with: `.env.example` exists; `.gitignore` includes `.env*`; no secrets
in `process.env` usage are hard-coded.

### AC-006 — Build command is standard

Vercel uses `npm run build` as the build command. No custom build script is
required.

Verify with: Vercel project settings screenshot or inspection; build succeeds
on Vercel.

## Open questions

- (blocking) What is the final domain name?
- (non-blocking) Do we want branch aliases for long-lived feature branches?

## Affected areas

- `next.config.ts`
- `vercel.json` (if needed for redirects/headers)
- `.env.example`
- `README.md`

## Dropped from sources

- Server-side rendering — static export is simpler and cheaper for a marketing
  site.
- Edge functions — not needed for launch.
