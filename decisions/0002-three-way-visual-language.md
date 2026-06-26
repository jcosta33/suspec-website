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
  evidence/review; field green is for greenfield setup; umber is for brownfield
  adoption; red clay is for change/attention; olive is for reference/catalog.
- **Manuscript surfaces:** use paper only for specs, review packets, findings,
  docs notes, source metadata, and annotated examples.
- **Copy:** ritual/manuscript words are labels, not extended metaphors.

## Consequences

- Positive: the six-step loop, evidence packets, and docs canon now have a
  coherent visual system.
- Positive: the design becomes less generic SaaS and less launch-era hive
  metaphor.
- Negative: paper surfaces introduce light-on-dark contrast complexity and need
  explicit accessibility checks.
- Neutral: older `corpus-yellow`, `hazard-orange`, and `drone-green` token names
  remain compatibility aliases until component classes are fully migrated.
