---
type: decision
id: DECISION-0003
title: Semantic signal palette contract
status: accepted
date: 2026-06-27
refines:
  - decisions/0002-three-way-visual-language.md
---

# DECISION-0003 — Semantic Signal Palette

## Context

The three-way visual language needs more than a warm primary color and a few
supporting accents. If accents are applied one-off, the site starts to feel
random: green can mean "good," "new," "review," or simply "different."

Corpus needs a small palette where every hue has a job, and that job repeats
across text, icons, lamps, rails, borders, hatching, and hover states.

## Decision

Use semantic signal roles instead of decorative color choice.

The base hue is core gold `#D88A24` (`HSL(34 71% 49%)`). Its exact complement is
blue `#2472D8` (`HSL(214 71% 49%)`), reserved for diagnostics and tooling, not
the public marketing palette. Public accents stay warm or tempered:

| Role | Hue | Job | Pattern |
|---|---:|---|---|
| Core | `#D88A24` | Corpus identity, primary action, active state, current loop step | gilt rail / seal line |
| Evidence | `#9FBA72` | review proof, verified output, pass states | checkpoint ticks |
| Greenfield | `#63B875` | new repo, starter kit, first-run setup only | upright field rows |
| Brownfield | `#B57E59` | existing-project adoption, migration, repo history | diagonal survey hatching |
| Change | `#CA7058` | edits, fixes, run work, blocked or attention states | angled change hatching |
| Reference | `#78B8AA` | docs, manuals, ledgers, catalogs, read-only rosters | horizontal ledger rules |
| Muted | `#BF7927` | hardware chrome, counters, low-emphasis labels | brass ruler marks |

Color is assigned from the object or action, not from mood:

- New repo is greenfield.
- Existing project is brownfield.
- Review proof is evidence.
- Missing evidence is change/attention.
- Read-only catalogs and rosters are reference.
- Gold is reserved for Corpus identity and primary action.

Implementation follows the same rule. A role should use the shared CSS signal
variables for hue, pattern, and mark (`--signal-*`, `--signal-*-rgb`,
`--signal-pattern-*`, and `--signal-mark-*`) before adding any local treatment.
A local treatment may change layout, density, or strength, but it should not
invent a new meaning for green, brown, sage, clay, verdigris, or gold.

Visible semantic color should usually travel through at least three surfaces:
label text, icon/lamp, rail/border, hatch/mark, or hover state. If color appears
on only one isolated word or card, it reads as decoration and should be removed
or promoted into the full role treatment.

## Consequences

- Positive: accents now carry repeated product meaning instead of decoration.
- Positive: pattern and texture can reinforce color for users who do not read
  subtle hue differences.
- Positive: greenfield and brownfield setup paths become distinct and literal.
- Negative: future components must choose a role before choosing a color.
- Negative: one-off color flourishes need a product reason before they ship.
- Neutral: legacy aliases (`yellow`, `gold`, `orange`, `olive`, `brass`) remain
  as compatibility shims in `app/components/signalStyles.ts`.
