---
name: settle
description: Resolve technical or procedural ambiguity through direct evidence. ALWAYS use when implementation would otherwise stop for a technical question, evidence conflicts, or a consequential reversible choice lacks a proven answer. Do not use for product intent, public behavior, material security or cost tradeoffs, waivers, irreversible actions, or acceptance.
---

# Settle

Do not dump solvable technical decisions on the user. Prove the answer.

## Method

1. State the decision, constraints, and failure cost.
2. Inspect the code, tests, configuration, project precedent, and current behavior.
3. Check current authoritative documentation, standards, and primary empirical evidence where the
   repository cannot decide the matter.
4. Compare only viable options. Score fit, complexity, reversibility, operational cost, failure
   modes, and evidence strength.
5. Reject folklore, popularity, and model agreement as proof.
6. Choose the strongest supported option. Prefer the simpler reversible choice when evidence ties.
7. Apply the decision when the active task grants write authority. Verify the affected behavior.
8. Stop only when product intent, public behavior, material security or cost, waiver, irreversible
   action, or acceptance remains human-owned.

## Output

State the decision, decisive evidence, why the nearest alternative lost, and any residual risk in
plain chat Markdown. Show exact source locators and the smallest raw output needed to prove the call.
