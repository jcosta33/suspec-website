---
name: promote
description: Move transient working material into project-owned permanence. Use only when transient material must become durable. Do not use for transient relocation or already-durable material.
---

# Promote

Move the document. Leave no broken trail.

Ask required questions through the native picker, or numbered choices plus `Other`. Put the
recommendation first; offer three genuine options, two if binary; give each one plain reason and
cost.

## Method

1. Confirm every selected artifact and sidecar. Find every inbound and outbound reference.
2. Inspect project governance and existing durable channels. If the source is already durable,
   return it unchanged.
3. Scan for secrets, private paths, transient state, raw prompts, personal data, and stale links.
   If sensitive content exists, stop with a binary choice: **Sanitize and retry** or **Cancel**.
   Recommend sanitization only when removal preserves the artifact's purpose.
   Change nothing until the human selects.
4. Present real project-owned destinations. Use Move unless the human explicitly requests both
   versions; then include Copy. Make commit a separate choice. Reject collisions and blocked
   destinations before mutation.
5. Preflight the selected destination, transformed artifact, repaired references, links, format, and
   project checks in isolation. Mutate nothing unless the preflight passes.
6. Apply the preflighted move or selected copy and reference repairs. Keep a recovery copy until the
   destination, references, and selected source disposition verify.
7. Commit only when selected. Verify the commit. Never push implicitly.
8. After every selected action verifies, delete the recovery copy and verify it is absent. An
   explicitly selected source copy is durable output, not recovery.

## Output

Return the durable absolute path or blocker.

## Boundaries

Reject transient-to-transient moves and invented destinations. On failure, restore every removed
source and repaired reference, remove the destination, then verify rollback. Report anything rollback
could not restore.
