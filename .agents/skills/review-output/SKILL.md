---
name: review-output
type: agent-guide
description: >-
  Review finished work against its SPEC: refute by default, re-run the checks
  yourself, prove every spec requirement is honored by the code with evidence,
  and route what a human must see. ALWAYS apply when asked to review a
  finished task, a diff, or a PR against a spec, or to fill a review packet.
  Reconcile against the spec, never the task; never mark Pass from the
  implementer's paste alone; never leave a Pass with an empty Evidence cell; never
  review a change you wrote. Skip for writing specs and implementing tasks.
---

# Review output against the spec

The review packet is named `review-<slug>.md`.

Place the file next to your own native artifacts — the same place you keep your plans,
notes, and memories for this work, in a folder named after the repo you are working on
(or wherever fits your harness best). You choose the exact spot; keep it out of the repo
unless the project's own governance says otherwise, and carry the file's full path
forward — every later step names artifacts by explicit path.

It proves one thing: **the code honors the spec** — every requirement met, evidenced, or
explicitly not. Your stance is refute-by-default: "done" is a claim until evidence forces you to
agree. Making sure the spec is respected is this review's **primary job**; everything else
(style, neatness) is secondary. The rules below are review-checklist conventions — nothing
enforces them. Check it with `suspec check <review-path> --spec <spec-path> [--task <task-path>]`
(spec is always required; task only when this review's frontmatter names one — a missing required
companion is blocking).

**Reconcile against the spec, never the task.** The requirement, its `Verify with:` method, and the bar
for Pass come from the **spec's** ACs — the spec is the source of truth for *what* must be true. A task,
when one exists, tells you only *which* ACs are in scope (it covers a partial slice of the spec) and
*indexes the evidence* in its `## Run summary`; it never defines the requirement and is never the thing
you validate against. This keeps the review independent of the (optional) task step.

## Getting an independent reviewer — self-contained

You may not review a change you wrote — an author favors their own output, and independence is the
whole point. The self-contained way to get it needs no installed catalog: **spawn a fresh subagent**
and hand it the diff, the spec, and this discipline. A fresh context can't be primed by the parent's
reasoning and returns findings, not a recommendation the parent shaped. (The `suspec-reviewer` agent in
suspec-agents is an accelerator over this same path — a pre-built reviewer definition — but it is never
required; spawning a fresh reviewer is a harness capability, not a dependency.)

## Rules

1. **The implementer's paste is a claim; your run is evidence.** Re-run every check yourself wherever
   possible — resolve commands from the `AGENTS.md` `Commands` table; if a needed command is missing,
   ask, never guess. Paste _your_ output into the Evidence column. A check you could not run is
   Unverified, not Pass. _Why: a paste shows the command ran at some past moment on some past code, not
   that it passes on the diff in front of you._
2. **One row per spec AC in scope.** Fill the requirement-coverage table from the **spec's** ACs — all
   of them for 1:1 work, or the subset a task's Scope names when a task exists. Result is one of Pass ·
   Fail · Unverified · Blocked. A Pass needs pasted output, a CI link, or — for a manual `Verify`
   method — a named human's recorded observation (who judged, what they saw). **An empty Evidence cell
   is Unverified, never Pass.** A scoped AC with no row is a missing row, not a free pass.
3. **Read the evidence index first.** For a task, its `## Run summary` indexes the Verify pastes the
   cells cite; for 1:1 work, the spec's `## Execution` section. Read it before filling rows — but the
   *bar* each row is judged against is the spec's requirement, not the summary's phrasing.
4. **Spot-check at least one green row.** Open its evidence and read it: does the output actually
   exercise that AC, and does it say what the row claims? _Why: a fully green table invites
   rubber-stamping; one real probe breaks the habit._
5. **Prove the exact requirement, not a neighbour.** For each AC, point at the lines that address _that_
   requirement as the spec defines it — the first plausible match is how a hole gets approved. Treat
   "should never happen", "harmless", "edge case unlikely" in the implementer's summary as flags to check,
   not assurances.
6. **Read what did not change.** Callers of every changed public surface, tests, docs. _Why: the diff
   shows what changed, not what the change broke elsewhere._
7. **Change-plan guarantees are rows too.** When the work executes a change plan, every preservation
   guarantee gets its own row in the change-plan coverage table — same columns, same rules.
8. **Route the exceptions under `## Human attention`** — that list, not the diff, is what a human reads:
   unverified or failed requirements · out-of-scope changes · risky files · missing test output ·
   changed public interfaces · DB migrations · security-sensitive changes · finding candidates ·
   blocked questions. One line each: what, why it matters, suggested action. "No exceptions" is a valid,
   reportable outcome.
9. **The suggested decision follows the table, not the summary's confidence.** "Merge" only when every
   scoped row is Pass and no exception is open; "Merge with waiver" only with the record — who waived ·
   which rows · why · expiry — and status `waived`; otherwise "Block until …", naming the rows or
   exceptions.
10. **Save finding candidates.** Anything durable the work surfaced — a fact, a decision, a pattern, a
    gotcha — is recorded here; for 1:1 work, carry forward anything the implementer noted in the
    spec's Execution entry, since the spec itself holds no `## Findings` section. Findings ride the
    task or review packet; durable ones become native memories (see save-findings).
11. **Keep the status honest.** `pass` only when the tables support it; `blocked`/`needs-human`
    otherwise; `draft` while working. Never soften a Fail or inflate a nit. The packet's status field
    is the record the human reads — a stale or inflated status misleads more than an empty one.

## Refuses

| Red flag                                                 | Action                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| "Tests passed" with no command, exit, or output          | Row is Unverified; produce or demand the real run                    |
| Accepting the implementer's paste as final evidence      | Re-run it yourself; if you cannot, mark Unverified and say why       |
| Judging an AC against the task's wording, not the spec's | The spec is the bar; re-read the spec's requirement and Verify line  |
| Evidence that addresses a neighbouring AC, not this one  | Unverified for this row — evidence must match the ID                 |
| Schema-valid / well-formed output offered as correctness | Shape is not truth; check the value, not the format                  |
| Your run disagrees with the implementer's paste          | The discrepancy is itself a finding — investigate, do not dismiss it |
| A vague concern ("looks rough")                          | Sharpen it to a file and line, or drop it                            |
| Fixing the code mid-review                               | Review judges; the fix is a new task                                 |
| Reviewing a diff you authored                            | Spawn a fresh reviewer; record that you did                          |

## Gotchas

- **Marking a row Pass from the implementer's paste without re-running it.** A paste proves the command ran
  at some past moment on some past code, not that it passes on the diff in front of you — the one thing
  the review exists to establish.
- **Leaving a Pass row with an empty Evidence cell.** An empty cell is indistinguishable from "I never
  checked"; by the table's own rule it is Unverified, and a green table built on blanks invites the next
  reviewer to rubber-stamp it.
- **Reviewing against the task instead of the spec.** The task's one-line scope summary is a pointer,
  not the requirement. A task that under-describes an AC will pass a review keyed to it and fail the
  spec — judge against the spec's definition and its Verify line.
- **Letting the summary's confidence set the decision.** The decision follows the rows; confident prose
  is a claim to check, not a result to inherit.

## Self-review gate

Before setting the packet status:

- [ ] Every scoped **spec** AC (and change-plan guarantee) has a row; no Pass has an empty Evidence cell.
- [ ] Every Pass rests on output you ran or a CI link you opened; you spot-checked at least one green
      row's evidence against the spec's requirement.
- [ ] You searched callers of changed public surfaces, not just the diff.
- [ ] Each Human-attention entry has what / why / suggested action; nothing was silently skipped.
- [ ] The suggested decision follows strictly from the rows.
- [ ] Finding candidates are recorded in the packet.
- [ ] You did not author the change you judged — an independent (fresh-context) reviewer produced this.
