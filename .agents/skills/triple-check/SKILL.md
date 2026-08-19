---
name: triple-check
description: Run a fast parallel review with exactly three fresh top-tier reviewers across code, diffs, artifacts, plans, or systems. Use when rapid independent scrutiny is required. Do not use for exhaustive sequential review or single-claim verification.
---

# Triple-check

Three strong reviewers. One snapshot. One repair.

## Method

1. Freeze the target, governing requirements, and evidence.
2. Dispatch exactly three fresh top-tier reviewers concurrently. Give each the same frozen snapshot
   and no peer prose. Each independently derives its attack and reviews the whole target.
   If three fresh concurrent reviewers are unavailable, stop. Self-review is invalid.
3. Keep reviewers read-only. Demand only location, consequence, evidence, and minimal fix.
4. Wait for all three. Deduplicate and fact-check every finding against direct evidence:
   - supported: queue the fix when settled authority determines it; otherwise stop as a human
     decision;
   - refuted: reject it with evidence;
   - human decision: force material ambiguity into explicit human selection; stop until selected;
   - unverified or blocked: obtain the missing evidence or report the exact capability blocker.
5. After reconciliation, apply every queued fix. Run decisive verification against the final target.
6. Use one dispatch wave. Repeat only on explicit request.

## Output

Return material fixes and verification, consequential refutations, and unresolved human decisions.
For each decisive run, include command, working directory, state identifier, numeric exit, and
the smallest untouched decisive output excerpt once.
