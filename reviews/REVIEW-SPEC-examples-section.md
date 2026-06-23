---
type: review
id: REVIEW-SPEC-examples-section
task: SPEC-examples-section
pr: none yet
reviewer: kimi (self-review, adversarial)
status: blocked
---

# Review: SPEC-examples-section — Examples and case-study section

## Summary

This spec is thin and depends on content that does not yet exist. It should be
de-scoped to the one example we actually have or integrated into the homepage
rather than built as a standalone section at launch.

## Changed files

- `specs/examples-section/spec.md`

## Requirement coverage

| ID     | Result     | Evidence                                                   | Human attention |
| ------ | ---------- | ---------------------------------------------------------- | --------------- |
| AC-001 | Fail       | Lists examples that do not exist (brownfield is "planned") | yes             |
| AC-002 | Unverified | Source doc exists but no detail view exists                | yes             |
| AC-003 | Unverified | No code block component exists                             | yes             |

Spot-checked: AC-001 — the brownfield example is listed but marked "planned,"
which means it cannot be rendered at launch.

## Human attention

1. **Launch scope is undefined.** "Brownfield change-level spec (planned)"
   should not appear on a launch page. _Action:_ cut it or move it to a
   post-launch intake item.

2. **Standalone page vs homepage section is unresolved.** The open question asks
   this directly. _Action:_ decide before implementing.

3. **Copy-button requirement is premature.** AC-003 adds a JS interaction before
   the basic site exists. _Action:_ defer to a post-launch polish task or
   integrate with the design-system CodeBlock component.

4. **No source attribution requirement.** The large PR review example is from
   the `corpus` repo; the spec should require a visible source link.

## Suggested decision

**Block until re-scoped.** Merge the large-PR-review highlight into the
homepage spec as one section and delete this standalone spec, or reduce it to a
single `/examples` page with only the one real example.
