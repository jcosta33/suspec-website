---
type: review
id: REVIEW-SPEC-marketing-pages
task: SPEC-marketing-pages
pr: none yet
reviewer: kimi (self-review, adversarial)
status: blocked
---

# Review: SPEC-marketing-pages — Marketing content pages

## Summary

This spec tries to define five pages at once. The content outline is reasonable,
but the scope is too large for one task, the verification methods are
hand-wavy, and there is no internal linking or navigation strategy.

## Changed files

- `specs/marketing-pages/spec.md`

## Requirement coverage

| ID     | Result     | Evidence                                         | Human attention |
| ------ | ---------- | ------------------------------------------------ | --------------- |
| AC-001 | Unverified | Content outline exists; no page exists to verify | yes             |
| AC-002 | Unverified | Six sections outlined; no examples rendered      | yes             |
| AC-003 | Unverified | Link targets not specified                       | yes             |
| AC-004 | Unverified | "Coming soon" skills listed but not cataloged    | yes             |
| AC-005 | Unverified | CLI page not yet written                         | yes             |

Spot-checked: AC-003 — "both links resolve" but the links are not named in the
spec.

## Human attention

1. **Scope is too broad.** Five distinct pages in one spec means one task would
   be huge. _Action:_ split into per-page specs or add a change plan with waves.

2. **No nav/linking strategy.** The global shell has page links, but this spec
   does not say how the marketing pages link to each other or back to the
   homepage. _Action:_ add an AC for internal cross-links and footer nav.

3. **Content fidelity verification is weak.** "Text matches the Corpus repo" is
   not a verifiable command. _Action:_ specify the exact source files in the
   `corpus` repo and a diff/check command.

4. **"/skills" and "/cli" are teasers.** Are they launch blockers? They
   introduce maintenance burden before the products are ready. _Action:_
   explicitly mark them as launch or post-launch.

5. **No 404 or redirect strategy.** What happens to old routes if marketing
   pages move? _Action:_ add a note or defer to a deployment spec.

6. **No page metadata per route.** Each page needs title/description. _Action:_
   add per-page metadata requirements or a shared metadata pattern.

## Suggested decision

**Block until split or re-scoped.** Convert this into a change plan with waves
(e.g., wave 1: `/what-is-corpus` + `/the-loop`; wave 2: `/get-started`; wave 3:
`/skills` + `/cli` teasers) or split into separate per-page specs.
