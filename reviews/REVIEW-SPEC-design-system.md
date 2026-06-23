---
type: review
id: REVIEW-SPEC-design-system
task: SPEC-design-system
pr: none yet
reviewer: kimi (self-review, adversarial)
status: blocked
---

# Review: SPEC-design-system — Website design system and global shell

## Summary

This spec establishes the visual language for the Corpus marketing site. It gets
the vibe right but is under-specified on accessibility, Tailwind version
reality, icon strategy, and responsive behavior. Several requirements are
unverifiable as written.

## Changed files

- `specs/design-system/spec.md`

## Requirement coverage

| ID     | Result     | Evidence                                                                                  | Human attention |
| ------ | ---------- | ----------------------------------------------------------------------------------------- | --------------- |
| AC-001 | Fail       | No build exists yet; config mechanism contradicts likely Tailwind v4 setup                | yes             |
| AC-002 | Unverified | Font families are examples ("e.g."), not decisions                                        | yes             |
| AC-003 | Unverified | No shell component exists to inspect                                                      | yes             |
| AC-004 | Fail       | "Storybook or /kitchen-sink route" is two options, not a requirement; no components exist | yes             |
| AC-005 | Unverified | No motif exists to inspect                                                                | yes             |

Spot-checked: AC-001 — the spec mentions `@theme` entries, but Next.js 16's
Tailwind setup likely uses `@import "tailwindcss"` and `@theme` blocks, not the
classic `tailwind.config.ts`. The spec is ambiguous about which version's
mechanism to use.

## Human attention

1. **Tailwind config mechanism is ambiguous.** Next.js 16 + `create-next-app`
   shipped Tailwind CSS v4 with the new `@theme` block. AC-001 references both
   "Tailwind config" and "@theme entries" without deciding. _Action:_ pick one
   mechanism and rewrite AC-001 to name the exact file and syntax.

2. **Font decision is deferred via examples.** "e.g., Inter or Space Grotesk"
   means the implementer must choose. _Action:_ decide the fonts and make them
   explicit requirements.

3. **No accessibility requirements.** A yellow-on-black palette risks contrast
   failures. _Action:_ add an AC requiring WCAG AA contrast for text and focus
   states.

4. **No responsive breakpoint requirement.** "Mobile hamburger menu" is
   mentioned but no breakpoint is named. _Action:_ specify the breakpoint.

5. **No icon strategy.** The problem section and feature grid will need icons.
   _Action:_ add an AC choosing an icon set (Lucide, Heroicons, custom SVG).

6. **AC-004 is two mutually exclusive options.** "Storybook or /kitchen-sink
   route" means the verifier cannot know what to check. _Action:_ pick the
   kitchen-sink route (simpler for launch) or drop Storybook entirely.

7. **No motion/accessibility note.** "Subtle animated hex grid" open question
   implies motion; no reduced-motion preference is mentioned. _Action:_ add a
   requirement to respect `prefers-reduced-motion`.

## Suggested decision

**Block until revision.** The spec is a good draft but needs concrete decisions
on Tailwind version, fonts, icons, accessibility, and responsive breakpoints
before implementation tasks can be cut from it.
