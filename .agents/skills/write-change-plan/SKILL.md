---
name: write-change-plan
type: agent-guide
description: >-
  Write a change plan — how the codebase changes safely: baseline and target from the
  inventory, enumerated preservation guarantees, transformation waves that each leave
  the build green, cutover and rollback conditions, and the task split. ALWAYS apply when planning
  refactors, rewrites, migrations, upgrades, performance, or schema work. Never write
  "no behavior change" — enumerate what is preserved. Skip for small cleanups, obvious
  bug fixes, and ordinary feature work.
---

# Writing a change plan

A spec answers "what should the system do?"; a change plan answers "how does the codebase
change _safely_?" Write one when the work is primarily structural — it spans modules, must
preserve behavior while touching risky code, needs sequencing, or will land as a diff too
large to interpret without a map. Skip it for an obvious bug fix or a small cleanup.

A change plan has these sections, in order: **Baseline · Target · Preservation
guarantees · Transformation waves · Cutover / rollback · Task split**. The plan sits
beside the spec it serves. This skill is how the plan gets created — filling that shape
well is the job; check it with `suspec check <path>`.

Place the file next to your own native artifacts — the same place you keep your plans,
notes, and memories for this work, in a folder named after the repo you are working on
(or wherever fits your harness best). You choose the exact spot; keep it out of the repo
unless the project's own governance says otherwise, and carry the file's full path
forward — every later step names artifacts by explicit path.

The frontmatter `kind` names the transformation: refactor · rewrite · migration ·
dependency-upgrade · performance · test-infra · mechanical-cleanup · architecture-cleanup ·
schema-change. The kind lives on the plan; the task packets keep one shape regardless.

## Baseline and target come from the inventory

The Baseline section cites the inventory
— it never re-derives the current state from memory. The Target state says what the code looks
like after, _including what explicitly stays unchanged_. A reviewer who can't diff these two
sections in their head can't judge the waves between them. No inventory yet and the work is a
rewrite or wide refactor? Write the inventory first; a plan drawn over guessed terrain plans
the wrong moves.

## Enumerate what you preserve — never "no behavior change"

With enough users, every observable behavior gets depended on — sort order of an "unsorted"
endpoint, the exact text of an error message, timing someone's retry loop was calibrated
against. So the plan never gestures at "no behavior change"; it **enumerates** the behaviors it
preserves as guarantee rows: `ID | Behavior | Verify with` — the same one verification line a
requirement gets, and the review packet checks each row the same way (Pass needs pasted output).

Reuse the spec's own requirement IDs via the `preserves:` frontmatter. A guarantee with no spec
ID to point at gets a `PG-NNN` of its own — and usually signals a spec amendment is owed: you
just found a behavior someone depends on that no spec records.

For the Verify with column, prefer a check that **would fail if the behavior changed**: a
golden-output capture taken before the change, a differential run of old vs new paths, or a
property test. A green suite is necessary but not sufficient — it covers only what was already
tested, so a behavior change in an untested corner passes silently. Where the suite is all you
have, write down in the plan _why_ it's sufficient for this change.

## Waves: each one leaves the build green

Break the transformation into waves **before** starting — a wave discovered mid-flight has no
checkpoint to catch drift. Each wave is the smallest change that leaves the codebase compiling
and passing tests, and each wave **names its verify step** (which commands run, what output
counts). A wave that can't say how it's verified isn't a wave yet — it's a hope. Validating
per wave catches a break while it's one wave old; validating only at the end is how a
half-finished migration becomes its own untangling project.

Where external consumers exist, a wave ships a **bridge release** — old and new surfaces both
working — rather than a flag day. Every compatibility shim a wave introduces is recorded with
its path, what it forwards to, and a checkable removed-when condition (e.g. "grep for the old
call returns zero"). A shim without a removal condition is permanent by default.

## Cutover, rollback, task split

- **Cutover conditions** — what must hold before the change counts as landed: guarantee rows
  verified, consumers moved, shims removed. Decided now, not mid-landing.
- **Rollback criteria** — the observable conditions that send it back, written while nobody is
  defending a half-landed change.
- **Task split** — one row per task: which wave, which guarantee and requirement IDs. Each task
  packet then runs isolated like any other, its Scope reading "implement or
  preserve". The plan's Review focus section is the reviewer's starting exception list, written
  by the person who knew where the risk was before the diff existed.

Everything above is a convention — nothing in this repository enforces a change plan; the
review of each wave's tasks is where it pays off.

## Per-kind notes

- **Refactor.** The preservation table is the whole contract — behavior identical, structure
  moves. Plan per-wave validation at a real checkpoint frequency, and prefer an equivalence
  check (golden/differential/property) over trusting the suite alone.
- **Migration / dependency-upgrade.** Count the old-API callsites up front; plan the count to
  **zero** — across the whole codebase, not just the scoped modules. Include the references a
  text search can't reach: dynamic dispatch, string-based registry lookups, generated code,
  test fixtures, reflection. "Mostly gone" is the half-migration that never closes.
- **Rewrite.** Add a **delta table**: every behavior that changes (before → after) next to what
  is preserved. The table is the contract — anything not on it must be preserved, and a change
  discovered mid-rewrite that isn't on it means stop and amend the plan, not improvise. A
  rewrite that only tests its changes proves nothing about the regressions it just created.
- **Performance.** Baseline and target are **numbers under named conditions** ("p95 of
  `getQuote()` under 1k RPS: 240 ms → ≤ 80 ms"), measured with the **same protocol** before and
  after — warmup, sample count, aggregate, hardware, input shape. Different conditions "prove"
  speedups that don't exist. Set a hard ceiling: the regression on any other metric beyond
  which the change rolls back regardless of the primary gain.
- **Schema-change.** Waves are expand → migrate → contract; the bridge release is mandatory,
  not optional — data has consumers you can't redeploy.

## Gotchas

- **Wrote "no behavior change" instead of enumerating what's preserved.** "No behavior change" is
  unverifiable — there's no row to paste output against, so the review packet can't check it and a
  drift in an untested corner ships silently. With enough users every observable behavior is
  depended on; enumerate each as a guarantee row (`ID | Behavior | Verify with`) the same way a
  requirement gets a verify line.
- **A guarantee row whose Verify with is just the suite.** A green suite covers only what was
  already tested, so a behavior change in an untested corner passes it. Prefer a check that *would
  fail if the behavior changed* — golden capture, differential run, property test; where the suite
  is all you have, write down in the plan why it's sufficient for this change.
- **A wave that leaves the build red.** A wave is the smallest change that still compiles and
  passes — if one leaves the tree broken, there's no checkpoint to catch drift and the next wave's
  failure can't be attributed. A wave that can't name its verify step isn't a wave yet, it's a hope.
- **Planned the migration to "mostly gone."** Old-API callsites counted only across the scoped
  modules miss dynamic dispatch, registry lookups, generated code, and fixtures — the half-migration
  that never closes. Plan the count to zero across the whole codebase, and leave no shim without a
  checkable removed-when condition.

## Before you finish

- [ ] Baseline cites the inventory; Target says what stays unchanged.
- [ ] Preservation guarantees enumerated — no "no behavior change" anywhere in the plan.
- [ ] Every guarantee row has a Verify with that would fail if the behavior changed.
- [ ] Every wave leaves the build green and names its verify step.
- [ ] Shims have removed-when conditions; external consumers get a bridge, not a flag day.
- [ ] Cutover conditions and rollback criteria written.
- [ ] Task split covers every wave; each task maps to guarantee/requirement IDs.
