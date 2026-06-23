---
type: finding
id: FINDING-meta-lessons-from-building-swarm-website
status: accepted
source: BUILD-swarm-website
---

# FINDING-meta-lessons-from-building-swarm-website — What building the website taught us about Corpus

## Observation

The swarm-website was built using the Corpus framework itself: a change plan, specs per feature,
task files, a content-source contract, findings, an adversarial review, and continuous deployment.
This finding records the meta-lessons that surfaced during the work.

## Lessons

### 1. The loop is easy to follow informally, hard to follow strictly

We naturally moved through Pull → Spec → Task → Run → Review → Close, but only the formal
artifacts (task files, findings, status updates) made the state visible. Without them, progress
looked like "a bunch of commits" rather than a traceable chain of intent, evidence, and verdict.

### 2. Specs are living documents, not frozen briefs

`specs/marketing-pages/spec.md` started as a draft and was updated mid-project with a `## Sources`
section once `CONTENT.md` was introduced. The framework's single-sourcing rule meant the website
copy had to point back to canonical docs; without that link, drift would be invisible.

### 3. The content workflow (CONTENT.md + drift findings) is essential for a derived site

Because the website rephrases the framework docs, `CONTENT.md` and `findings/content-drift-2026-06.md`
were the only durable record of where a claim came from. This is the difference between
"marketing copy" and "maintained derivative content."

### 4. Human-in-the-loop positioning is a design decision, not a default

The first draft of the site leaned toward general "coding agents" language. Reframing everything
around "humans in the driver seat" required explicit editing of hero copy, feature lists, is/is-not
lists, and CTAs. The framework's vocabulary tiers helped keep the user-facing copy distinct from
internal terms like "obligation" and "verdict."

### 5. Self-review misses things an independent adversarial review catches

The build passed type check, lint, build, linkinator, axe, and Lighthouse 100/100/100/100. The
adversarial review still found a CI gap, keyboard-scrollable code blocks, missing new-tab warnings,
mobile-menu focus behavior, and a logo that visually spelled "Moo Vo." This validated ADR-0056:
self-review must produce fixes and critique, but it cannot issue the final Pass.

### 6. The four repo roles are clearer after using them

- **swarm** — the canonical framework docs and decision ledger.
- **swarm-starter-kit** — the copy-whole workspace with templates and guides.
- **swarm-skills** — optional, installable agent guides for stances and change shapes.
- **swarm-cli** — optional automation around the workflow; transitional but real.

Trying to explain each on the website forced a sharper separation than the READMEs imply.

### 7. The framework's "honesty framework" applies to the website too

Claims on the site are convention or checklist level; none are toolable or enforced by the website
itself. The copy had to say so implicitly (e.g., "no runtime" rather than "guaranteed correct").

### 8. Tool configuration is part of the spec

The static-export + Vercel setup required `"framework": null` in `vercel.json` because Vercel's
Next.js builder expected `.next` metadata while the site exports to `dist/`. This kind of
environment-specific detail belongs in the deployment spec, not just in CI.

### 9. Mistakes survive despite checklists

Examples from this build:
- `CONTENT.md` was initially written to the wrong repo (`/Users/josecosta/dev/swarm/`).
- The logo SVG paths spelled "Moo Vo" instead of "Corpus."
- An adversarial finding incorrectly claimed the footer nav lacked an accessible name.

Each required human attention to catch and correct. Checklists reduce but do not eliminate the
need for skeptical reading.

### 10. Continuous deployment makes the loop tangible

Every commit pushed to `main` triggered CI and a Vercel deployment. This tight feedback loop made
the "Close" step feel real: a merged change was live seconds later, with the review packet and
finding file as the durable record.

## Recommended action

Keep these lessons in the starter kit's examples/ folder as a worked case study
(`examples/website-launch/`) so future adopters can see how Corpus eats its own cooking.
