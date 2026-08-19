---
name: sus-panel
description: Produce a durable recommendation from independent analysis of legitimate alternatives. Use when a consequential technical, architectural, operational, or product choice needs several perspectives before a decision. Do not use when direct evidence settles the choice, the user already decided, or the work needs factual research instead of deliberation.
---

# Sus Panel

Independent first. Evidence next. One recommendation. No committee theater.

## Method

1. Lock one question, fixed evidence packet, constraints, decision owner, and reversal condition.
2. Honor a user-specified participant count. Otherwise choose the smallest panel that covers every
   material perspective. Never fill seats for symmetry.
3. Use the cheapest capable models unless the user requests otherwise. Launch fresh participants
   concurrently, give each one distinct decision-relevant perspective, and hide peer analyses until
   every initial response lands.
4. Require each analysis to name its recommendation, evidence, costs, failure modes, unknowns, and
   what would reverse it.
5. Verify load-bearing factual claims against direct evidence. Agreement proves nothing.
6. Compare options against shared criteria. Preserve the strongest dissent. If one decisive conflict
   can be settled by evidence, run one targeted follow-up. Then stop.
7. Recommend one option or state why evidence cannot choose. Never turn votes into truth or seize
   human-owned intent.

## Artifact

Resolve `~/.agents/artifacts/<workspace>/` to an absolute path; derive `<workspace>` from the
repository or working-directory basename. Write there with `type: panel`, a unique `PANEL-` ID, and
linked sidecars beside it. On collision or ambiguous workspace, present human-readable name choices.
On a blocked write, offer grant and retry, another agent-neutral user directory, or cancel. Never
overwrite or fall back to a repository, vendor directory, or temporary path.

Write local source references relative to the artifact. Use absolute paths only for runtime handoff.

Start with:

```yaml
---
type: panel
id: PANEL-{{slug}}
---
```

Use only sections carrying payload:

- **Question**
- **Constraints**
- **Options**
- **Recommendation**
- **Dissent**
- **Unknowns**

Question, Options, and Recommendation are mandatory. Compare options in one compact table. Tie every
load-bearing claim to direct evidence. Persist no participant identities, votes, transcripts, or
repeated rationale.

## Output

Cut repetition, softness, ceremony, and structural bloat without changing facts, evidence, or the
recommendation. Return only clickable Markdown links for the panel artifact and every sidecar, with
compact `~/.agents/...` labels and fully expanded absolute destinations. Explain only a blocker,
failed creation, incomplete verification, or irreversible-action confirmation.

## Close

Once fully actioned and no downstream step needs it, require one human disposition for the artifact
and its sidecars: Delete, Leave, or Promote. Promote moves transient material into project-owned
permanence. Delete every selected path and verify absence; survivors block close.
