---
name: save-findings
type: agent-guide
description: >-
  Close the work by saving what it taught: sweep the task or review packet's
  Findings section, write each durable lesson as a native harness memory with
  its evidence, and route team-facing residue through the project's own
  channels by hand. ALWAYS apply this skill at Close — after the review,
  before the work is handed off — or whenever a session surfaced something a
  future session would want to know. Never save unevidenced memories, bundle
  lessons under one generic title, point evidence at a packet that dies
  with the work, or drop a severe candidate (a security issue, a correctness
  risk) as ephemeral without escalating it first. Skip mid-task; the packet's
  Findings section is the staging area until Close.
---

# Saving findings

An agent session ends and its context evaporates — anything not written down is gone, and the
next session re-discovers it the expensive way. Close is where you stop that: **before closing
the work, record every durable lesson as a native memory.** This is a convention — nothing
enforces it; it costs one memory per lesson.

## The close flow

1. **Sweep the staging area.** Read the packet's `## Findings` section — the task packet's when
   one exists, the review packet's otherwise. List every candidate: facts learned, quirks hit,
   decisions made, gotchas survived.
2. **Decide each candidate deliberately.** Durable → a native memory. Ephemeral → it rides the
   review packet and dies with it — drop it, knowingly. A candidate carrying real severity — a
   security issue, a correctness risk — is never dropped as ephemeral without escalating it
   first: an issue, an ADR, or the review packet's `## Human attention` list (see
   review-output). The failure mode is neither saving nor dropping — candidates rotting in a
   closed packet nobody reopens, or a severe one dying quietly because nobody escalated it.
3. **Write each durable lesson natively.** A durable lesson becomes a native memory: write it
   the way your harness records memories (a memory file, CLAUDE.md, whatever your runner
   provides), one claim per memory, the evidence attached, under a searchable title. Suspec
   adds no parallel findings store — if the lesson belongs to the team rather than to you,
   raise it through the project's own channels (an issue, an ADR, a test).
4. **Attach the evidence to the memory itself.** The command, the pasted output, or the
   file:line that proves the claim lives in the memory — a memory whose proof stayed in this
   session's context is unprovable by the next one. Link related memories where your harness
   supports it.
5. **Route the outgrown ones by hand.** A decision big enough to outlive the feature is an ADR
   in the repo's decision ledger, not a memory. New intended behavior is a spec amendment, not
   a memory. A reproduced defect is a bug report, filed as an issue. Each is written by hand,
   like any other contribution — the memory is for reusable facts that belong to you.

## What counts as durable

The test: _would a future session in this area want to know this?_

- **Provider quirks** — "the payments sandbox rate-limits at 10 rps; the docs say 100."
- **Hidden contracts** — "the export job assumes `user.email` is never null."
- **Decisions with rationale** — "we retry idempotent calls only; see the PR discussion."
- **Gotchas** — "the suite passes locally with a stale fixture; regenerate first."

What does **not** count: run logs, transcripts, "the tests passed" (that lives in the review
packet), local environment details, anything you'd never search for again.

## Writing one well

- **One claim per memory.** Learned three things? Write three memories — a grab-bag memory is
  unsearchable and un-retractable, and you cannot correct one claim in it without dragging the
  others along.
- **Evidence attached.** Paste the proving output or name it precisely — the command and its
  result, the file:line, the PR or issue. An evidence-free memory is a rumor with a title.
  Prefer durable pointers: the review packet dies with the work, so anything it proves must be
  carried into the memory itself.
- **Bound it honestly.** "Where it does not apply" is what keeps a true-in-March lesson from
  misleading someone in November.
- **Title you'd search for.** "payments-sandbox-rate-limit" gets found; "notes-from-task-12"
  doesn't.

## Memory hygiene

- **A memory states what was verified, not what was assumed.** If the session didn't prove it,
  either prove it before saving or don't save it.
- **Agent-authored claims name their evidence.** Anything you write is a claim, not a fact,
  until the evidence that grounds it is attached — a future session must be able to re-check
  it without you.
- **Correct or delete a memory when contradicted.** The moment reality disagrees with a saved
  memory, fix it or remove it — a stale memory misleads every session that loads it.

## How findings come back

A native memory comes back by itself: the harness loads it into future sessions — that is the
whole feedback loop, and it is why each memory must stand on its own text (claim, evidence,
bounds). A team lesson comes back through the project's own surfaces — the issue tracker's
search, the ADR ledger, a test that fails when the lesson is forgotten. When the next spec
touches the same area, cite the issue or ADR the lesson produced in its `sources:`.

## Gotchas

- **Saving a memory with no evidence.** The lesson feels obviously true, so you write the claim
  and skip the proof. When someone doubts it in November, there is nothing to re-check, and the
  memory quietly loses the next argument it should have won.
- **Writing memories mid-task instead of at Close.** A quirk bites you, so you save it right
  then. The packet's `## Findings` section is the staging area until Close; premature saves
  skip the deliberate keep-or-drop sweep and land half-baked.
- **Packing several lessons into one memory under a generic title.** Three discoveries land in
  "notes-from-task-12." A grab-bag is unsearchable, and no single claim in it can be corrected
  or retracted on its own.
- **Pointing evidence at the review packet.** The packet dies with the work; a memory whose
  proof lived there is evidence-free by the next session. Carry the output or a durable
  reference (PR, issue, file:line) into the memory itself.
- **Writing a team lesson only into your own memory.** Memories are per-developer and
  per-harness — the team never sees them. Residue that belongs to the team goes through the
  project's own channels — an issue, an ADR, a test — written by hand.

## Before you finish

- [ ] Every candidate in the packet's Findings section became a native memory or was
      deliberately dropped.
- [ ] Each memory states one verified claim, with its evidence named in the memory itself
      (the command, output, or file:line that proves it).
- [ ] Each memory says where it applies _and_ where it does not, under a title you'd search
      for.
- [ ] Team-facing residue went through the project's own channels — an issue, an ADR, a
      test — written by hand.
- [ ] Any existing memory this session contradicted was corrected or deleted.
