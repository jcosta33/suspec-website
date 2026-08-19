---
name: revolver
description: Run exhaustive multi-angle review and sequential repair across code, diffs, artifacts, plans, or systems. Use when breadth across every target-justified stance is required. Do not use for fast fixed-panel review or single-claim verification.
---

# Revolver

Every justified angle. Every finding dead before the next.

## Method

1. Freeze the target state.
2. Derive the complete materially distinct stance pool from requirements, trust boundaries, data
   and control flow, changed surfaces, failure modes, users, and operating conditions. Cover every
   exposed material risk. Reject duplicates and filler. Honor explicit human constraints; otherwise
   choose the pool without asking. Use no fixed floor or ceiling.
3. Give each stance one falsification question and target evidence. Order the pool by consequence
   and uncertainty. Freeze it for the rotation.
4. Dispatch one fresh reviewer at a time on the cheapest adequate model. Give it the current target,
   one stance, and no prior reviewer prose.
   If fresh dispatch is unavailable, stop. Self-review is not fresh.
5. Fact-check every finding against direct evidence. Kill every finding before the next stance:
   - supported: apply the fix and verify it when settled authority determines the fix; otherwise
     stop as a human decision;
   - refuted: reject it with decisive evidence;
   - human decision: force material ambiguity into explicit human selection; stop until selected;
   - unverified or blocked: name the missing evidence or capability and stop.
6. Freeze the addressed target for the next stance.
7. Finish the full pool. After a productive rotation, rebuild the pool against the current target.
   Add or remove stances only between rotations.
8. Stop after one quiet rotation or three cycles.

One cycle is one full pool rotation. Productive means a supported finding was fixed and verified.
Quiet means no actionable finding survived verification.

## Output

Return material fixes and verification, consequential refutations, and unresolved human decisions.
For each decisive run, include command, working directory, state identifier, numeric exit, and
the smallest untouched decisive output excerpt once.

## Boundaries

Reviewers attack claims, callers, and companion surfaces. They return only actionable findings:
location, consequence, evidence, minimal fix. The orchestrator fixes; reviewers stay independent.
