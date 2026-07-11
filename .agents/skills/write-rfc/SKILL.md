---
name: write-rfc
type: agent-guide
description: >-
  Write an RFC — one pre-decision proposal: the problem, the approach you advocate,
  the alternatives you weighed, and the exact decision you ask for. ALWAYS apply when a
  technical approach needs to be argued before anyone commits to it. Never write
  requirements into an RFC, leave Alternatives empty, or word a sentence as a
  settled decision. Skip when the decision is already made (write an ADR), when
  you're surveying without advocating (research), or when intent is the question
  (PRD).
---

# Writing an RFC

A design argued only in chat is gone when the session ends; six months later nobody can say why
this approach won and the rejected options get re-litigated from scratch. An RFC is the durable
version: one proposal, the problem forcing it, the alternatives weighed against it, and the
exact decision requested — so _why this and not that_ outlives the change.

An RFC has these sections: **Problem · Proposal · Alternatives · Migration plan · Open questions · Decision requested** (walked below). Fill them — this guide is how to fill them well.

## The stance: advocate, commit to nothing

An RFC argues for exactly one approach, in enough detail to be judged — and decides nothing.
Two failure modes void one:

- **Reads as a contract.** "The system must retry idempotent calls" is a requirement; it
  belongs in the spec written _after_ acceptance. The RFC's version: "this proposal retries
  idempotent calls because…".
- **Reads as a decision.** "We will adopt X" is settled-choice wording in a document whose
  whole point is that the choice isn't settled. Write "this RFC proposes X because…".

## Section by section

- **Problem.** The technical pressure forcing a proposal, with enough detail that a reader can
  judge whether the proposal is proportionate. Cite the PRD, finding, or audit that surfaced it
  rather than re-deriving it. State what _is_ wrong — never what the system _must_ do.
- **Proposal.** The single approach you advocate: the design, how it works, what it touches.
  Detailed enough to compare against the alternatives; prose, not requirements.
- **Alternatives.** A table — alternative, why weaker than the proposal — with at least one
  real row. This section is the RFC's durable value: a future reader trusts the chosen approach
  because the rejected ones sit written down beside it. "None considered" is a defect — if you
  genuinely can't name an alternative, the proposal is under-explored, not the section optional.
- **Migration plan.** Ordered steps from the present state to the proposed one. Adoption order
  is part of judging a proposal: a great design with an impossible rollout is a weak proposal.
- **Open questions.** Every unresolved point, each marked **blocking** or **non-blocking**. A
  blocking question means the decision cannot be made yet — resolve it, or downgrade it with a
  written reason, before asking for the decision. This is a convention — nothing in this
  repository enforces it; the person deciding is who it protects.
- **Decision requested.** The precise decision you ask for, and where the proposal goes on
  acceptance: an ADR in the repo's decision ledger (recording the choice), a spec (carrying
  the requirements), or both. An RFC that doesn't say what it's asking for can't be acted on.

## Where it lives

Beside the spec it will precede — a flat file, frontmatter `type: rfc`, status one of
`proposed | accepted | rejected | superseded`.

Place the file next to your own native artifacts — the same place you keep your plans,
notes, and memories for this work, in a folder named after the repo you are working on
(or wherever fits your harness best). You choose the exact spot; keep it out of the repo
unless the project's own governance says otherwise, and carry the file's full path
forward — every later step names artifacts by explicit path.

On acceptance, the RFC itself doesn't change into anything: the ADR and/or spec are
written _from_ it, name it in their `sources:`, and the RFC's status flips to `accepted`.

## Common mistakes

- Requirements in the Proposal ("the API must return 429 on…") — describe the mechanism in
  prose; the spec written on acceptance carries the musts.
- An empty Alternatives table — the one thing an RFC exists to preserve is the comparison.
- Hedged prose hiding a real open question ("we might also need…") — lift it into Open
  questions and mark it blocking or not.
- Asking for a decision while a blocking question stands — the answer will be "not yet",
  expensively.
- Writing an RFC for a decision already made — that's an ADR; an RFC pretending the choice is
  open wastes every reviewer's time.

## Gotchas

- **Leaving Alternatives empty.** The table reads "none considered," or holds one straw-man row
  built to lose. The comparison is the single thing an RFC exists to preserve; without it a future
  reader cannot tell whether the chosen approach beat real rivals or was simply the first one
  written down, and the rejected options get re-litigated from scratch next year.
- **Wording a sentence as a settled decision.** "We will adopt X" or "the migration happens in
  Q3" slips into a document whose whole premise is that the choice is still open. A reviewer
  skimming for the ask reads it as already decided, the deliberation the RFC was meant to invite
  never happens, and a choice nobody ratified acquires the look of one that was.
- **Writing requirements into the RFC.** The Proposal hardens into "the system must return 429 on
  rate-limit" — a spec's contract smuggled into a pre-decision argument. The musts acquire force
  before anyone accepts the approach, and the spec written on acceptance either duplicates them or
  silently diverges, leaving two documents disagreeing about what is required.

## Before you finish

- [ ] Every sentence is pre-decision — nothing worded as "we will" or "the system must".
- [ ] Problem cites its upstream source (PRD, finding, audit) where one exists.
- [ ] Exactly one approach advocated, detailed enough to evaluate.
- [ ] Alternatives table non-empty, each row saying why it's weaker.
- [ ] Migration plan is ordered steps, present → proposed.
- [ ] Every open question marked blocking / non-blocking; no blocking question left standing
      at the moment you request the decision.
- [ ] Decision requested names its target: ADR, spec, or both.

## Next

Accepted? Record the choice as an ADR in the repo's decision ledger and write the spec from
the proposal (the `write-spec` skill), each naming this RFC in
its sources. Rejected or superseded? Flip the status and leave the file — the recorded
comparison is still the cheapest insurance against re-arguing it next year.
