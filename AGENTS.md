# AGENTS.md — suspec-website (code repo)

<!-- Keep this file short — agents read it on every task. This is the CODE repo;
     the Suspec workspace (specs, tasks, reviews, findings, decisions, the board)
     lives in the sibling ../suspec-website-works. -->

## Suspec workspace

The specs, tasks, reviews, findings, decisions, and board for this site live in
**`../suspec-website-works`** — the dedicated Suspec workspace. Read the task packet
you were given there first; for 1:1 work with no task, read the linked spec in
`../suspec-website-works/specs/`. Do not implement behavior outside the task's scope.
Record the run (the spec's `## Execution`, or the task's `## Run summary`) and flip
the board row in the workspace, not here.

## The loop

Pull → Spec → Task → Run → Review → Close (+ Inventory / Change Plan for structural
work). Agent guides live in the workspace's `.agents/skills/`.

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
