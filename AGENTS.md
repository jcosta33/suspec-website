# AGENTS.md — suspec-website (code repo)

<!-- Keep this file short — agents read it on every task. This is the CODE repo;
     Suspec artifacts (specs, task packets, review packets) live outside this
     public repo, beside the developer's native artifacts. -->

## Suspec artifacts

Site work may be governed by Suspec artifacts that live outside this repository,
beside the developer's own native artifacts, named by explicit path. Read the
spec you are given by the path you are given; if you were given a task packet,
follow that bounded slice. Do not implement behavior outside the spec or task
scope. Record the run in the artifact you were handed (the spec's `## Execution`,
or the task's `## Run summary`); do not create process records in this code repo.

## The loop

Intent → Spec → Implement → Review → Check → Findings (+ Task when one spec
splits into parallel slices, + Inventory / Change Plan for structural work).
The deterministic checker is `suspec check <path>`. Skills live in this repo's
`.agents/skills/` (mirrored at `.claude/skills/`).

## Project facts

- Next.js 15+ App Router, TypeScript, Tailwind CSS.
- Deployed to Vercel; `main` branch auto-deploys.
- App code lives in `app/`; global styles in `app/globals.css`.
- Components live in `app/components/`.
- Static assets in `public/`.
- Design system: warm chassis surfaces with semantic signal roles in
  `app/components/signalStyles.ts`: core gold, evidence sage, greenfield field
  green, brownfield umber, change cinnabar red, reference verdigris, and muted
  brass. Violet and electric blue are package accents only.
- Tone: tongue-in-cheek, laid back, open-source. Avoid corporate buzzwords.

## Commands

| Slot | Command | Purpose |
|---|---|---|
| cmdInstall | `npm install` | install dependencies |
| cmdDev | `npm run dev` | local dev server |
| cmdBuild | `npm run build` | production build |
| cmdLint | `npm run lint` | ESLint |
| cmdTypecheck | `npx tsc --noEmit` | TypeScript check |
| cmdStart | `npm run start` | production server locally |

An empty or missing slot means **ask** — never invent a command. A Verify item
whose command cannot be resolved reads Unverified, not Pass.

## Agent role

You are an implementation or review worker for the Suspec website. Suspec
organizes the work; you perform the assigned task — and you never review your
own implementation.
