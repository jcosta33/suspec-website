---
type: review
id: REVIEW-SPEC-homepage
task: SPEC-homepage
pr: none yet
reviewer: kimi (self-review, adversarial)
status: blocked
---

# Review: SPEC-homepage — Marketing homepage

## Summary

The homepage spec captures the right sections but leaves the most important
words undecided, overloads one example with too much responsibility, and misses
SEO, performance, and accessibility requirements entirely.

## Changed files

- `specs/homepage/spec.md`

## Requirement coverage

| ID     | Result     | Evidence                                                                    | Human attention |
| ------ | ---------- | --------------------------------------------------------------------------- | --------------- |
| AC-001 | Fail       | Headline is "something like" — not a spec                                   | yes             |
| AC-002 | Pass       | Five walls listed and matched to framework                                  | no              |
| AC-003 | Unverified | Loop diagram shape not specified                                            | yes             |
| AC-004 | Fail       | Example responsibility overloaded; mobile overflow requirement is hand-wavy | yes             |
| AC-005 | Unverified | Feature grid copy exists but no component yet                               | yes             |
| AC-006 | Unverified | No final CTA band exists                                                    | yes             |

Spot-checked: AC-001 — the headline is the first thing a visitor reads. A spec
that proposes two options and says "something like" is not a contract.

## Human attention

1. **Headline is undecided.** "A hive for your coding agents" vs "Your agents
   are busy. Give them a foreman." are two different brand positions. _Action:_
   pick one primary headline and optionally specify a testable secondary.

2. **Hero visual is vague.** "Abstract drone/bee corpus motif or animated hex
   grid" gives the implementer two different aesthetics. _Action:_ decide on a
   single hero treatment and add a verify method (e.g., "renders an SVG hex
   grid with at least 6 animated cells").

3. **No SEO requirements.** No `<title>`, `<meta name="description">`, Open
   Graph, or social image requirements. _Action:_ add an AC for page metadata.

4. **No performance budget.** No Lighthouse target, no bundle-size guard.
   _Action:_ add an AC requiring a build-time performance check or Lighthouse
   threshold.

5. **No accessibility requirements.** Hero motion, code blocks, and CTAs need
   accessible markup. _Action:_ add ACs for semantic headings, alt text, focus
   states, and reduced motion.

6. **AC-004 example is doing too much.** It is the "aha" moment, a code block,
   and a mobile-responsiveness test all at once. _Action:_ split into two ACs:
   one for the example content, one for mobile rendering.

7. **CTA links are not validated.** AC-001 says links must be valid but does
   not name the exact URLs. _Action:_ specify the GitHub template URL and docs
   URL.

## Suggested decision

**Block until revision.** The homepage is the highest-stakes page; it cannot be
implemented from a spec that leaves the headline, visual, and metadata
undecided.
