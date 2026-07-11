---
name: spec-check
type: agent-guide
description: >-
  Check a spec by hand against the core checks, the writing-rules watchlist, and the
  leverage test (does every section pull weight), and report hard errors, warnings,
  and advice — without changing a character of the spec. ALWAYS apply this skill
  before a spec goes to status ready, before tasks are cut from it, or when asked
  "is this spec sound?". Never fix what you find while checking — report it;
  editing is a separate step with the author. Skip when asked to write or
  improve the spec itself.
---

# Checking a spec

A defect in a spec is cheapest to catch before any task is cut from it — after that, every
agent run inherits it. This guide runs the check by hand and produces a short report.
`suspec check <spec-path>` (suspec-cli) automates exactly this contract; run it by hand when the
CLI is not installed. Either way the result is a review checklist, not a gate —
whether it blocks is the team's policy.

## The one rule: check, don't edit

You read the spec and write a **report**. You change nothing — not a typo, not a "quick fix".
Mixing checking with editing destroys the report's value: the author can no longer see what was
found versus what was silently changed, and a one-word "fix" can change what gets built. Hand
the report to the author (or switch hats explicitly and edit _after_ the report exists).

## The core checks

Run each against the spec (this table is a curated set; the full catalogue with IDs and
severities lives in the Suspec repo):

| ID   | Check                                                                                           | Severity   |
| ---- | ----------------------------------------------------------------------------------------------- | ---------- |
| C001 | Every requirement ID (`AC-NNN`) appears exactly once in the file                                | hard error |
| C002 | No other file claims the same frontmatter `id:` (requirement IDs are spec-scoped — AC-001 in two specs is fine) | hard error |
| C003 | Every requirement carries a `Verify with:` line                                                 | hard error |
| C004 | Each requirement states at least one strength word (must / must not / should / should not / may); more than one flags a split candidate (advice, not a format bar) | warning    |
| C005 | Non-goals section present and non-empty                                                         | warning    |
| C006 | Open questions section present (even if "none")                                                 | warning    |
| C007 | No `TBD`, `TODO`, `???`, or unresolved open question at `status: ready`                         | hard error |
| C008 | Frontmatter `sources:` names at least one origin                                                | warning    |
| C009 | Every path or ID in `sources:` and cross-references resolves to something that exists           | hard error |
| C015 | Every inline `[[KEY]]` citation resolves to a matching `<a id="KEY">` anchor in the `sources.md` the frontmatter names | warning    |
| C019 | A `###` heading shaped like a requirement id but with a lowercase split-suffix (`AC-004a`) parses as prose and silently vanishes from scope and coverage | warning    |

Three notes. C003 asks that the `Verify with:` line _be there_ — a target that doesn't exist yet
is not a spec defect; the requirement simply reviews as Unverified until it does. C004's usual
finding: two strength words in one requirement means two requirements — report it as a split
candidate, don't split it yourself. C019 only fires on the plain `###` form — a spec written in
structured requirements (`format: sol`) is caught by the SOL catalogue instead.

## The writing-rules watchlist

Then re-read each requirement for the word families that predict an agent interpreting it
differently than meant:

| Word family               | Examples                          |
| ------------------------- | --------------------------------- |
| Subjective words          | robust, clean, seamless           |
| Non-verifiable qualities  | fast, secure, scalable            |
| Vague verbs               | handle, support, manage           |
| Loopholes                 | where feasible, if practical      |
| Vague qualifiers          | significant, as needed            |
| Comparatives, no baseline | better, faster                    |
| Ambiguous quantifiers     | all, any, some                    |
| Bundling connectives      | joining separable behaviors       |
| Ambiguous exceptions      | unless, except where              |
| Vague references          | it, this, the above               |

Apply the **same-line rule**: a risky word is fine when the same line makes it checkable — it
names who does what to what, gives a number with units, or points at a named test. If the line
can't say how you'd check it, report the line. These are warnings by convention, never hard
errors: word-detection is known to be imprecise, so the watchlist advises — a human decides.

Two habits to check alongside: a bare "must not" with no paired affirmative behavior (what
_should_ happen instead?), and uncertainty buried in requirement prose ("probably", "we
think") that belongs in Open questions.

If the spec opts into structured requirements (`format: sol` in the frontmatter), also walk
the SOL check catalogue — same discipline, finer grain. Both the SOL check catalogue and the
structured-requirements notation live in the Suspec repo.

## The leverage test (does every section pull weight?)

One structural pass — a review-checklist item: a spec that carries ceremony no
reader uses is as costly as one that's vague. For each section, ask whether it improves at least one of **clarity,
scope, execution-context, verification, reviewability,** or **durable-memory**. A section that serves
none — an empty Non-goals kept only for the template's sake, a restated background nobody acts on,
boilerplate that changes nothing when removed — is a leverage miss: report it as advice to cut or fill,
never as a hard error. This is the artifact-level companion to the writing watchlist: the watchlist asks
whether a line is *checkable*, the leverage test asks whether a section is *earning its place*.

## The report

Short and sorted — hard errors first, warnings second, watchlist hits third, advice last:

```markdown
# Spec check: SPEC-payment-retry (2026-06-11)

Hard errors (fix before status: ready)

- C003 — AC-004 has no `Verify with:` line.
- C007 — "TBD: retry ceiling" in AC-002, but status is `ready`.

Warnings

- C004 — AC-001 says "must … and should …": two requirements bundled.
- C005 — Non-goals section is empty.

Watchlist

- AC-003 "handles errors gracefully" — no same-line criterion; what does the
  caller observe?

Advice

- Background section restates the ticket and nobody acts on it — cut it or
  make it earn its place.

Result: 2 hard errors, 2 warnings, 1 watchlist hit, 1 leverage miss. Not ready.
```

Every line points at a requirement ID or section, so the author's fix is unambiguous. "Not
ready" here is your recommendation — whether it blocks anything is the team's policy, not
Suspec's.

## Gotchas

- **Fixed the spec while checking it.** You spot a typo or an empty Non-goals
  section and "just fix it" mid-pass. Now the report and the file disagree, and
  the author can't tell what you found from what you silently changed. Checking
  and editing are separate steps — report it, then switch hats if you must.
- **Passed a spec with a `{{placeholder}}` still in it.** A template token like
  `{{feature}}` or an unfilled `Verify with: {{...}}` slid through because no core
  check names it explicitly — but C007's spirit (no unresolved `TBD`/`TODO`) and
  C003 (a real `Verify with:` line) both catch it. An unresolved placeholder at
  `status: ready` is a hard error, not cosmetic.
- **Watchlist hit reported as a hard error.** A vague word ("handles errors
  gracefully") is a warning by convention — word-detection is imprecise, so it
  advises and a human decides. Reporting it as a blocker, or skipping the
  same-line rule that would have cleared it, both miscalibrate the report.

## Before you finish

- [ ] The spec file is byte-for-byte unchanged — a diff proves it.
- [ ] Every core check was run, not just the ones that looked likely to fire.
- [ ] Every finding names its check ID (or "watchlist") and the requirement it's on.
- [ ] Hard errors and warnings are separated; the one-line result states both counts.
- [ ] Each section pulls weight (the leverage test) — ceremony that serves no reader is flagged to cut.
- [ ] Nothing in the report claims enforcement — it recommends; the team decides.
