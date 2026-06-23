---
type: spec
id: SPEC-examples-section
title: Examples and case-study section (post-launch)
status: draft
owner: corpus-website
sources:
  - intake/website.md
  - specs/homepage/spec.md
  - reviews/REVIEW-SPEC-examples-section.md
---

# SPEC-examples-section — Examples and case-study section (post-launch)

## Intent

Show, don't just tell: a dedicated examples page after launch, anchored by the
41-file agent PR review walkthrough from the `corpus` repo.

## Status

**Deferred post-launch.** The homepage will include a single worked example
(see SPEC-homepage AC-004/AC-005). This standalone examples page is planned for
after the initial launch.

## Requirements

### AC-001 — `/examples` index lists available examples

A page with cards for each example:

- Large PR review by exception.
- Feature from ticket (from starter-kit examples).
- Brownfield change-level spec (when available).

Verify with: page renders; each card links to a detail page or external doc;
build passes.

### AC-002 — Large PR review example is highlighted

A detail view summarizing the 41-file review example from
`docs/examples/large-pr-review.md` in the `corpus` repo. Includes source link.

Verify with: content accurately reflects the source doc; link to source is
present; build passes.

### AC-003 — Code samples are copyable

Example code blocks have a copy button.

Verify with: manual check in browser; no JS errors in console.

## Affected areas

- `app/examples/page.tsx`
- `app/components/CodeBlock.tsx`

## Dropped from sources

- Interactive sandbox — out of scope.
