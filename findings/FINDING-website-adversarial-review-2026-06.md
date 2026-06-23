---
type: finding
id: FINDING-website-adversarial-review-2026-06
status: fixed
source: REVIEW-website-adversarial
---

# FINDING-website-adversarial-review-2026-06 — Adversarial review of swarm-website launch wave

## Reviewer stance

Review performed as the Skeptic: validation commands re-run in a clean worktree, diff read with
fresh eyes, and every claim checked against generated output. No worker output was trusted without
re-running.

## Validation run (reviewer worktree)

```
cd /Users/josecosta/dev/swarm-website
npm install        # up to date, 2 moderate audit warnings
npx tsc --noEmit   # pass
npm run lint       # pass
npm run build      # pass
npx linkinator     # 19 links, passed
npx axe            # 0 violations
npx lighthouse     # performance:100 accessibility:100 bestPractices:100 seo:100
```

## Findings

### 1. CI Lighthouse threshold check can be silently skipped — MAJOR — fixed

- **File:line**: `.github/workflows/ci.yml:47`
- **Issue**: The Lighthouse step used `continue-on-error: true`. The threshold-check step exited 0
  if `lighthouse.json` was missing.
- **Fix applied**: Removed `continue-on-error: true` and changed the threshold check to exit 1 if
  the report is missing.

### 2. 404 page is indexable — MINOR — fixed

- **File:line**: `app/not-found.tsx:5`
- **Issue**: The not-found page exported only `title` metadata.
- **Fix applied**: Added `robots: "noindex"` and a `description`.

### 3. Code blocks are not keyboard-scrollable — MINOR — fixed

- **File:line**: `app/components/CodeBlock.tsx:10`
- **Issue**: `<pre>` had `overflow-x-auto` but no `tabIndex`.
- **Fix applied**: Added `tabIndex={0}`, `aria-label="Code sample"`, and `focus-ring`.

### 4. External nav links give no new-tab warning — MINOR — fixed

- **File:line**: `app/components/Shell.tsx`
- **Issue**: "Docs" and "GitHub" opened in a new tab without visual or accessible warning.
- **Fix applied**: Added `ExternalLink` icon and `aria-label="{label} (opens in new tab)"` for all
  external nav/footer links.

### 5. Mobile menu lacks Escape and focus-trap behavior — MINOR — fixed

- **File:line**: `app/components/Shell.tsx`
- **Issue**: The hamburger menu did not close on `Escape`, trap focus, or return focus to the
  trigger.
- **Fix applied**: Added `useEffect` for `Escape`, manual focus wrapping within the menu, and focus
  return to the toggle button on close.

### 6. Footer wrapper uses generic `<section>` — MINOR — fixed

- **File:line**: `app/components/Shell.tsx`
- **Issue**: Footer content was wrapped in `<Section>` rendering `<section>`.
- **Fix applied**: Changed the footer wrapper to `<Section as="footer">` and removed the redundant
  outer `<footer>` element.

### 7. Footer nav lacks an accessible name — MINOR — invalid

- **File:line**: `app/components/Shell.tsx:93`
- **Issue**: Review claim was incorrect; the footer `<nav>` already had `aria-label="Footer"`.
- **Action**: Finding retracted.

### 8. Placeholder `/cli` is advertised in sitemap — MINOR — fixed

- **File:line**: `app/sitemap.ts:14` / `app/cli/page.tsx`
- **Issue**: `/cli/` was a placeholder page included in the sitemap.
- **Fix applied**: Removed `/cli/` from `sitemap.ts` and added `robots: "noindex"` to
  `app/cli/page.tsx`.

### 9. Colophon copy contradicts Corpus review discipline — MINOR — fixed

- **File:line**: `app/components/Shell.tsx`
- **Issue**: Footer said "agents who review their own diffs," which conflicts with Corpus's rule
  that self-review never issues a result.
- **Fix applied**: Reworded to "agents who attack their own work before a human judges it."

### 10. npm audit reports moderate vulnerabilities — MINOR — fixed

- **File:line**: `package.json` / `package-lock.json`
- **Issue**: `npm install` reported 2 moderate severity vulnerabilities via Next.js's transitive
  `postcss` dependency.
- **Fix applied**: Added `overrides: { "postcss": "^8.5.10" }`; `npm audit` now reports 0
  vulnerabilities.

## Re-validation run (after fixes)

```
cd /Users/josecosta/dev/swarm-website
npm install        # 0 vulnerabilities
npx tsc --noEmit   # pass
npm run lint       # pass
npm run build      # pass
npx linkinator     # 19 links, passed
npx axe            # 0 violations
npx lighthouse     # performance:100 accessibility:100 bestPractices:100 seo:100
```

## Verdict

**Pass.** All findings are fixed or retracted. The site remains functional, fast, accessible, and
SEO-clean.
