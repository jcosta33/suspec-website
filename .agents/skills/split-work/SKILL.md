---
name: split-work
type: agent-guide
description: >-
  Split a spec or change plan into task packets agents can run without colliding:
  every requirement lands in exactly one task (or, for same-behavior-per-platform/repo
  work, one task per context), tasks that write the same files are sequenced not
  parallelized, and the dependency order is written down. ALWAYS apply this skill when
  the work is too big for one run or several agents will work at once. Never invent new
  requirements while splitting, and never cut a task from a requirement with an open
  blocking question. Skip when the job fits one spec → one implementer with no task packet — most do.
---

# Splitting work into tasks

Most work is one spec → one implementer — **no task packet**; the implementer fills the spec's
`## Execution` section. Cut tasks only when the work is too big for one agent run, or when several
agents will work in parallel and a collision would be expensive. The output is N task packets,
each self-contained, plus a few lines recording the order they run in.

Place the file next to your own native artifacts — the same place you keep your plans,
notes, and memories for this work, in a folder named after the repo you are working on
(or wherever fits your harness best). You choose the exact spot; keep it out of the repo
unless the project's own governance says otherwise, and carry the file's full path
forward — every later step names artifacts by explicit path.

The dispatch prompt you compose names every input, including each task packet, by full path.

## Cut along requirements, cover them all

Cut task boundaries along the spec's requirement IDs (or the change plan's waves and guarantee
IDs — a plan splits by wave, see the plan's Task split table). Then check coverage both ways:

- **Nothing uncovered.** Every requirement appears in some task's Scope — or is explicitly
  recorded as deferred. A requirement no task owns is the one that silently doesn't get built.
- **Nothing owned twice.** No requirement appears in two tasks' Scopes. Two agents each
  "owning" AC-003 produce two implementations and one merge fight.

While splitting you will spot gaps — behavior the spec never decided. Don't quietly write the
missing requirement into a task packet: route it back to the spec (or its Open questions). A
requirement that exists only in a task was never reviewed as part of the spec. And a
requirement with an open **blocking** question isn't ready to become a task at all — splitting
it commits a guess.

## Keep each task small, single-concern, and untangled

Coverage decides _what_ goes in a task; size and tangle decide whether it can be reviewed. Small,
single-concern changes are the best-replicated result in code review — review effectiveness is best
on a small change and the proportion of useful review comments drops as a change spreads across more
files. So when you cut:

- **One concern per task.** Prefer more, smaller tasks over one that bundles unrelated requirements.
- **Refactor in its own task, ahead of the behavior change.** A rename, a move, or a signature
  change that other work builds on is its own task and commit — separate from the feature or fix it
  enables. Mixing a refactor with a behavior change is the most common way a diff becomes
  unreviewable; the interface-defining task already goes first (see _Run order_ below), so this falls
  out naturally. A trivial cleanup (a local rename) may ride along.
- **Split out the connective tissue.** When new code wires into existing code, make the high-diffusion
  wiring — the edits touching many existing files — its own task, so the reviewer judges the new logic
  and its integration separately rather than as one tangled blob.

This buys _cleaner_ reviews — fewer false positives at the same defect yield — not more bugs caught;
that is reason enough. It is a convention; nothing sizes a task for you.

## Tasks that share files are not independent

The collision that matters is **writes**. Before declaring two tasks parallel, list the files
and directories each will touch (each packet's Affected areas) and compare. Same file in two
lists → they are one sequence, not two parallel tasks: pick an order and record it.

```text
Two tasks may run in parallel only if every one of these holds:
  1. neither depends on the other — directly or through a chain;
  2. they write no file or directory in common;
  3. neither reads files the other writes;
  4. they don't both touch a shared surface — a public interface,
     a schema or migration, generated code, CI or build config.

When in doubt, run them one after the other. Unknown scope counts
as conflicting with everything.
```

The two defaults in that box do the real work. **Unknown serializes:** a task that can't say
what it writes is assumed to collide with everything — sequence it. **Shared serializes:** a
schema migration or a public interface is a hidden meeting point even when the feature work
looks disjoint. Parallelism is the opt-in, earned by demonstrated disjointness; sequencing is
the default. All of this is a convention checked by hand against the listed paths — splitting
work is judgment work, and no Suspec tooling does it for you.

## Write the dependency order down

A few lines next to the packets (in the change plan's Task split, or appended to the spec) —
plain language:

```markdown
## Run order — SPEC-payment-retry

1. TASK-retry-interface — defines the retry interface (first; others build on it)
2. TASK-retry-core — AC-001..AC-003 (after 1)
3. TASK-retry-metrics — AC-004 (after 1; parallel with 2 —
   no shared files, checked 2026-06-11)
```

Interface-defining work goes first: when one task fixes a contract others call, sequencing it
ahead is cheaper than reconciling three guesses about it afterwards. If you find a cycle —
task A waits on B waits on A — the boundary is wrong; merge them or re-cut.

## Each packet stands alone

The agent running a packet sees the packet, not your splitting reasons. Each one carries its
own source links, Scope ("implement or preserve" the listed IDs), Do not change (which for
a parallel task includes the files its siblings own), Affected areas, and a Verify line per
requirement. A packet that needs the other packets explained to it isn't disjoint yet — and
"the other agent will handle it" is not a sentence that belongs inside one.

One context carve-out (platform or repo): a spec shipping the same behavior on N platforms —
or a requirement independently verifiable in each of N repos, the contract-test shape (an API
honored on both sides) — may scope the same requirement id to N context tasks, write-disjoint
by platform directory or repo. At spec level the requirement reads green only when every
context task's packet shows Pass; per-context results never substitute for each other. The
entry condition is strict: a behavior that only exists when both repos meet decomposes into
per-repo requirements instead — the carve-out never covers a requirement no single task
verifies.

## Snapshot the slice into the packet

Each task packet carries the requirement slice it covers **inside** the packet — stamped with
the spec id and the commit it was cut against — so the implementer reads a pinned slice and
the spec cannot drift mid-task. Re-cut the task if the spec changes materially. The spec
stays canonical; the packet's copy is a marked execution snapshot, not authoritative.

## Review the split against the spec

Splitting is itself work to review — against the **spec**, not the code (no code exists yet). Before you
hand the packets off, re-read them as a set and confirm they **faithfully represent the spec**:

- Every in-scope spec requirement is covered by exactly one task, and the union of the task Scopes is the
  spec's in-scope set — nothing dropped, nothing added.
- Each task's scope line and its `Verify` carry the spec's requirement faithfully — the same obligation
  and the same `Verify with:` method, not a weakened paraphrase.
- No task invented a requirement the spec never decided; every gap went back to the spec.

This is a spec-conformance check on the decomposition — the same refute-by-default stance the review step
turns on code, turned here on the split itself.

## Gotchas

- **Two tasks that write the same file got parallelized → merge collision.** The
  feature work looked disjoint, so they were called parallel — but both edit a
  shared config, schema migration, or public interface. At run time the second
  task's diff lands on a file the first already changed, and you get a conflict no
  one sequenced for. The collision that matters is _writes_: compare the listed
  Affected-areas paths before declaring any pair parallel, and let shared
  surfaces serialize.
- **Invented a requirement while splitting.** You spot a gap the spec never
  decided and quietly write the missing behavior into a task's Scope. That
  requirement now exists only in a packet — it was never reviewed as part of the
  spec, and the reviewer has nothing to check it against. Route the gap back to
  the spec (or its Open questions); don't patch it in the split.
- **Cut a task from a requirement with an open blocking question.** Splitting a
  requirement whose blocking question is still open commits a guess: the agent
  builds against an answer nobody gave. A requirement isn't ready to become a task
  until its blocking questions close.

## Before you finish

- [ ] The split was reviewed against the spec — the task set faithfully represents it (coverage exact,
      each scope + `Verify` carries the spec's requirement, nothing invented).
- [ ] Every requirement (or guarantee/wave item) is in exactly one task's Scope — none
      uncovered, none duplicated (context carve-out — platform or repo: N context tasks may share one id, each
      verifying it whole in its own context).
- [ ] No new requirement was invented inside a packet; gaps went back to the spec.
- [ ] No task was cut from a requirement with an open blocking question.
- [ ] Every parallel pair passed all four conditions in the box — including the file-overlap
      comparison, done against listed paths, not from memory.
- [ ] The run order is written down where the next person will look.
- [ ] Each packet reads as self-contained: source, scope, do not change, verify — with its
      pinned spec-slice snapshot stamped with the spec id and commit it was cut against.
