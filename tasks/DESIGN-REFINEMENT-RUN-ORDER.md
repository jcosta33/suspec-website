# Design Refinement Run Order

Source request: 2026-06-24 design refinement pass.

## Tasks

1. `TASK-transparent-nav` — owns `app/components/Shell.tsx` and top/scrolled nav
   behavior.
2. `TASK-spacing-rhythm` — owns page and component spacing rhythm.
3. `TASK-a11y-link-compliance` — owns contrast, keyboard checks, semantic links,
   and `/docs/.../` document references.
4. `TASK-subtle-motion` — owns CSS/components for restrained flourishes and
   reduced-motion behavior.

## Coordination

- The tasks may be explored by separate workers, but merge-back should be
  sequenced in the order above.
- Shared-file edits in `app/globals.css`, `app/components/`, or route pages must
  be reconciled by the lead before final verification.
- No task owns another task's acceptance criteria.
