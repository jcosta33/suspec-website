# suspec-website

The public marketing site for [Suspec](https://github.com/jcosta33/suspec), an opinionated methodology for working with coding agents — shipped as a globally installed skill family, backed by a deterministic checker.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- TypeScript
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

The site is statically exported to `dist/`.

## Quality gates

```bash
npm run lint
npx tsc --noEmit
npm run audit:goal
```

`audit:goal` builds the static export, then runs copy, CSS/palette,
link, route-matrix/SEO, screenshot, accessibility, SSR, and performance
guards.

## Deployment

Pushes to `main` deploy to Vercel automatically. Pull requests receive preview deployments.

## Content sources

Marketing copy is sourced from the `suspec` repo docs. See `CONTENT.md` for the source map and review cadence.
