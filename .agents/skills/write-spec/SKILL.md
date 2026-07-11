---
name: write-spec
type: agent-guide
description: >-
  Write or revise a spec: capture intent as verifiable requirements, never
  implementation. ALWAYS apply when asked to write a spec, requirements, or
  acceptance criteria, or to turn a ticket, intake note, PRD, audit, or research
  doc into one. Do not prescribe mechanisms, leave a requirement without a
  "Verify with:" line, guess past an ambiguity, or introduce a new pattern
  without surveying what exists. Skip for implementing a task, reviewing output,
  small cleanups, and defects with an obvious fix — those need no spec.
---

# Write a spec

A spec is the contract between whoever wants the change and whoever builds it.
Done well, an implementer can build from it with no follow-up questions, and a
reviewer can check every requirement against evidence. A spec has these sections, in
order: **Intent · Non-goals · Requirements · Open questions · Affected areas · Dropped
from sources (when needed) · Execution** — an append-only run record, one dated entry
per change-cycle. Frontmatter carries `type: spec`, `id: SPEC-<name>`, `title`,
`status`, `owner`, and `sources` (the intake, PRD, or ticket this spec traces to); each
requirement is an `AC-NNN` with a `Verify with:` line. This guide is how to fill that
shape, not a restatement of it. This skill is how the spec gets created — writing it
well is the job; check it with `suspec check <path>`.

Place the file next to your own native artifacts — the same place you keep your plans,
notes, and memories for this work, in a folder named after the repo you are working on
(or wherever fits your harness best). You choose the exact spot; keep it out of the repo
unless the project's own governance says otherwise, and carry the file's full path
forward — every later step names artifacts by explicit path.

Everything below is a convention plus a review checklist — nothing enforces it at edit
time.

## Rules

1. **State intent, not implementation.** Write the observable behavior or the
   bound; the implementer picks the mechanism. _Why: naming the mechanism
   over-constrains the solution and hides the actual requirement._ If a
   mechanism is genuinely load-bearing (a wire format, compatibility with an
   existing API), state it as its own requirement with the reason attached.
2. **One behavior per AC.** "When X, the component must Y." If the sentence
   needs an "and", split it into two ACs. _Why: a compound requirement gets
   partial credit at review — the half not done hides in the conjunction._
3. **Every AC gets a `Verify with:` line.** Prefer a runnable test or command;
   a named manual check is the fallback. _Why: it is the highest-value line in
   the file — the review packet is built from these lines, and a requirement
   nobody can check is a wish._ If you cannot say how to verify it, the AC is
   too vague: reword it to the concrete observable.
4. **Order requirements by importance.** Agents weight earlier instructions
   more — put the requirement you would block a merge over first.
5. **Survey before inventing.** Read what the codebase, its ADRs, and its
   open issues already have before specifying a new interface, pattern, or boundary. Record what
   you consulted; if you reuse a pattern, name it; if you introduce one, say
   why the existing ones do not fit. _Why: memory is not a survey — recall
   misses the helper added last week, and the duplication surfaces only when
   implementation collides with it._
6. **Record structural decisions with their alternatives.** When the spec
   commits a real choice — a boundary, a data flow, a compatibility stance —
   note what was considered and rejected — as an ADR in the repo's decision
   ledger for anything
   with reach beyond this spec, or under `## Dropped from sources` when it is a
   cut. _Why: a decision without alternatives is incomplete — the reader cannot
   tell whether the others were weighed or overlooked._
7. **Halt on ambiguity — frame a decision, never guess.** Any unresolved
   behavioral decision goes under `## Open questions` as **options + a
   recommendation** (the decision in one line; 2–4 options with the case
   FOR/AGAINST; your recommended option + a brief why; what it blocks) — not into
   an AC, and not as a bare question. Where your runner supports it, ask the owner
   and proceed on the answer; otherwise leave the decision for them. A spec with a
   blocking open question is not `status: ready`. _Why: a guess written as a
   requirement commits a decision nobody made; a bare question makes the owner do
   the framing — options + a lean lets them just choose._ Either get the answer, or
   make the call explicitly, record it, and resolve it.
8. **Fill `## Dropped from sources`.** What the ticket or PRD asked for that
   this spec deliberately leaves out, and why. Be specific enough to challenge:
   "dropped: implementation details" is a category, not a record — "dropped:
   the CSV export option (only JSON consumers exist)" is. _Why: a silent drop
   looks like an oversight; a recorded drop is a decision someone can
   challenge._
9. **Non-goals are load-bearing — write them in three parts.** The prohibition, the
   positive alternative (what to do instead), and the escape hatch (blocked by the
   boundary? stop and ask). _Why: a bare "do not" is easy for an agent to walk past
   alone; pairing it with a positive alternative and a stop option keeps it
   actionable._ Non-goals bound the task and protect the reviewer from scope drift.
10. **Need stricter structure?** Any spec can switch its requirements to
   structured (SOL) form: add `format: sol` to the frontmatter. SOL blocks are
   bare-header lines like `REQ AC-001:` drawn from a fixed set of block
   keywords (`REQ`, `CONSTRAINT`, `INVARIANT`, `INTERFACE`, `QUESTION`) and
   modal keywords (`MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, `MAY`) — full
   grammar in [`references/sol-grammar.md`](./references/sol-grammar.md).
   Use it for high-risk work; plain form is the default.

## When NOT to write a spec

Forced process on already-clear work hurts more than it helps. Skip the spec
when:

- **Small cleanup** (rename, dead code, comment fix) → a task packet alone.
- **Defect with a clear reproduction** → check the existing spec still holds,
  then a task; do not re-specify working behavior.
- **An open question, not a decided change** → research first; a spec follows
  the decision.
- **A present-state survey of existing code** → an audit; observations are not
  requirements.

## Refuses

| Pressure                                             | Do instead                                                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| "Just write `use Redis` in the spec"                 | State the requirement (the latency bound, the persistence behavior) — or a constraint with its reason if the choice is truly fixed |
| An AC with no way to verify it ("must be intuitive") | Reword to the concrete observable, or cut it                                                                                       |
| "Assume the obvious default and move on"             | Put it in Open questions, or record the decision explicitly — never guess silently                                                 |
| A new boundary with no survey behind it              | Survey first; cite what you read                                                                                                   |
| Editing code "to check the design works"             | The spec session changes the spec and nothing else                                                                                 |
| Speccing a two-line cleanup                          | A task packet alone; say so                                                                                                        |

## Gotchas

- **Smuggled an implementation mechanism into a requirement.** An AC reads "must
  cache results in Redis" — but Redis is a mechanism, not the requirement. The
  real requirement (a latency bound, a persistence behavior) is now hidden, and
  the implementer is over-constrained. State the observable behavior; if a
  mechanism is genuinely load-bearing, make it its own requirement with the reason
  attached.
- **Left an AC with no `Verify with:` line.** It is the highest-value line in the
  file — the review packet is built from these lines, so an AC without one reviews
  as a wish nobody can check. If you can't say how to verify it, the AC is too
  vague: reword it to the concrete observable, or cut it.
- **Guessed past an ambiguity instead of recording an open question.** You hit an
  undecided behavior and wrote in "the obvious default" to keep moving. That
  commits a decision nobody made, buried in an AC where no reviewer will flag it
  as unresolved. Put it under `## Open questions` as options + a recommendation,
  or get the answer and record the call — and the spec is not `status: ready`
  while a blocking question is open.

## Self-review gate

Before handing the spec on, check each — fix, don't rationalize:

- [ ] Pick your vaguest AC: could an implementer build it with no follow-up
      question, and a reviewer check it from its `Verify with:` line alone?
- [ ] No AC names an algorithm, data structure, or library where a behavior
      belongs.
- [ ] Each AC is one behavior; none hides an "and".
- [ ] Requirements are in importance order; non-goals are stated.
- [ ] Every unresolved decision sits in Open questions, and the status is
      honest (`draft` until they close).
- [ ] `Dropped from sources` accounts for everything the source asked for that
      this spec leaves out.
- [ ] You can point at what you surveyed before any new pattern you introduced.
- [ ] `git status` (pasted) shows only spec documents changed — the spec
      session touched no code.

## Bundled resources

- [`references/sol-grammar.md`](./references/sol-grammar.md) — the full SOL grammar for rule 10:
  block types (`REQ`, `CONSTRAINT`, `INVARIANT`, `INTERFACE`, `QUESTION`), strength words, `VERIFY
  BY` syntax, and metadata clauses. Load it when a spec sets `format: sol` — not needed for plain
  form.
