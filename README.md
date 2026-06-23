# swarm-website

The public marketing site for [Corpus](https://github.com/jcosta33/swarm), a lightweight spec and review workflow for teams using coding agents.

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
npx linkinator dist/ --skip "^https://github.com"
npx axe http://localhost:3000 --exit
```

## Deployment

Pushes to `main` deploy to Vercel automatically. Pull requests receive preview deployments.

## Content sources

Marketing copy is sourced from the `swarm` repo docs. See `CONTENT.md` for the source map and review cadence.
