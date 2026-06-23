---
type: spec
id: SPEC-seo
title: SEO and social sharing
status: draft
owner: swarm-website
sources:
  - intake/website.md
  - findings/FINDING-website-launch-gaps.md
---

# SPEC-seo — SEO and social sharing

## Intent

Make the Corpus marketing site discoverable via search engines and attractive
when shared on social media.

## Non-goals

- No blog or content marketing pipeline.
- No paid search or analytics beyond basic metadata.

## Requirements

### AC-001 — Every route exports page metadata

Each page in `app/` exports a `metadata` object with:

- `title`: max 60 characters.
- `description`: max 160 characters.
- `openGraph.title` and `openGraph.description`.
- `openGraph.type`: `website`.

Verify with: inspect `<head>` on each route; titles and descriptions are
present and within length limits.

### AC-002 — Open Graph images exist for each major page

Static OG images live in `public/`:

- `og-home.png`
- `og-what-is-swarm.png`
- `og-the-loop.png`
- `og-get-started.png`

Dimensions: 1200×630. Design matches the Corpus aesthetic.

Verify with: images exist in `public/`; Facebook/Twitter card validators render
them.

### AC-003 — `robots.txt` allows indexing

`public/robots.txt` allows all user-agents and points to the sitemap:

```
User-agent: *
Allow: /
Sitemap: https://<domain>/sitemap.xml
```

Verify with: `curl https://<domain>/robots.txt` returns the file.

### AC-004 — `sitemap.xml` lists public routes

`app/sitemap.ts` generates a sitemap including:

- `/`
- `/what-is-swarm`
- `/the-loop`
- `/get-started`
- `/skills`
- `/cli`

The `/kitchen-sink` route is excluded.

Verify with: `curl https://<domain>/sitemap.xml` returns valid XML with the
expected routes.

### AC-005 — Canonical URLs are set

Each page includes a canonical link pointing to its final domain URL.

Verify with: inspect `<head>`; canonical link is present.

## Open questions

- (blocking) What is the final domain for sitemap/robots/canonical URLs?

## Affected areas

- `app/*/page.tsx`
- `app/sitemap.ts`
- `public/robots.txt`
- `public/og-*.png`

## Dropped from sources

- Blog RSS feed — no blog.
- Structured data / JSON-LD — overkill for launch.
