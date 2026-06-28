---
type: decision
id: DECISION-0002
title: Website visual identity — control surface, seal, manuscript
status: accepted
date: 2026-06-23
supersedes:
  - decisions/0001-website-aesthetic.md
---

# DECISION-0002 — Website visual identity

## Context

The original website aesthetic used a bee-hive / drone / factory-floor metaphor.
That direction made the launch site memorable, but it now over-indexes on hive
and construction cues while corpus itself has settled around evidence, review
packets, findings, and a six-step loop.

The website needs a visual system that still feels like serious software while
making the loop, the proof artifacts, and the framework's ritual language feel
native.

## Decision

Adopt a three-way visual language:

1. **1970s institutional sci-fi** — the structure: panels, terminals, grids,
   rails, lamps, switches, and dense operating surfaces.
2. **Alchemical geometry** — the symbolic layer: gold ink, circles, loop marks,
   transmutation labels, and a six-node mark tied to the six corpus steps.
3. **Manuscript archive** — the artifact layer: paper insets, folio notes,
   marginalia, pencil rules, stamped labels, and evidence ledgers.

The site should read first as serious software, then as a ritualized evidence
system, then as a working manuscript record. The target balance is mostly
utility with a small ritual charge.

### Concrete choices

- **Logo:** a compact six-node loop mark plus capitalized `Corpus`.
- **Wordmark:** semibold old-style serif or tuned display serif; no wide
  uppercase tracking and no thin elegant weight.
- **Dark surfaces:** black/graphite chassis for navigation, panels, terminals,
  rosters, command references, and diagrams.
- **Gold:** sparse signal only; use for focus, primary action, seal lines, and
  active states.
- **Accent palette:** use color by role, not by decoration. Proof green is for
  evidence/review; field green is for greenfield setup; brownfield copper is
  for existing-project adoption; rubedo rose is for change/attention; verdigris is
  for reference/catalog.
- **Manuscript surfaces:** use paper only for specs, review packets, findings,
  docs notes, source metadata, and annotated examples.
- **Copy:** ritual/manuscript words are labels, not extended metaphors.

### Color grammar

Color is semantic signage, not decoration. Pick the role at the group level
first, then let that role drive the label, rail, lamp, border, hover state, and
small icon treatment. Item-level color variance is reserved for places where
the reader is actually comparing categories.

| Role | Color job | Use for |
|---|---|---|
| Core gold | Corpus identity and primary action | logo, primary CTA, active nav, current loop state |
| Reference verdigris | Reading, manuals, catalogs, ledgers | docs, command references, read-only file lists, source notes |
| Evidence green | Proof and review confidence | Pass states, verified output, review/evidence sections |
| Greenfield green | Fresh starts | new repo, starter kit, first-run setup only |
| Brownfield copper | Existing-code adoption | existing project, adoption path, repo-with-history setup only |
| Rubedo rose | Change or attention | edits, fixes, run work, blocked/unverified states, failure modes |
| Brass | Hardware chrome and neutral detail | screws, rails, counters, low-emphasis labels |

Each role also has a surface pattern so the color is not doing the whole job:

| Role | Surface pattern |
|---|---|
| Core gold | gilt rail, seal line, soft center glow |
| Reference verdigris | horizontal ledger rules |
| Evidence green | small checkpoint ticks and proof marks |
| Greenfield green | upright field rows and clean-start marks |
| Brownfield copper | diagonal survey hatching and adoption plates |
| Rubedo rose | angled change hatching |
| Brass | quiet ruler marks and hardware bosses |

Do not use evidence green for a problem merely because the word "evidence"
appears in the copy. Missing evidence is an attention/change state. Do not use
greenfield green for any "good" or "fresh-looking" surface unless the user is
starting a new workspace. Brownfield means existing code; it should not be
represented by green.

## Consequences

- Positive: the six-step loop, evidence packets, and docs canon now have a
  coherent visual system.
- Positive: the design becomes less generic SaaS and less launch-era hive
  metaphor.
- Negative: paper surfaces introduce light-on-dark contrast complexity and need
  explicit accessibility checks.
- Neutral: older `corpus-yellow`, `hazard-orange`, and `drone-green` token names
  remain compatibility aliases until component classes are fully migrated.
