---
type: finding
id: FINDING-website-launch-gaps
title: Cross-cutting gaps in website launch specs
status: accepted
source: reviews of SPEC-design-system, SPEC-homepage, SPEC-marketing-pages, SPEC-examples-section
---

# Finding: Cross-cutting gaps in website launch specs

## Observation

The initial website specs cover pages and aesthetics but miss several
launch-critical concerns that will block a production-ready site:

1. **Deployment and infrastructure.** No spec defines Vercel project setup,
   build output configuration, custom domain, or environment variables.

2. **Accessibility.** No spec sets a WCAG target or requires reduced-motion
   support, focus management, or semantic markup.

3. **SEO and social sharing.** No spec requires per-page metadata, Open Graph
   images, robots.txt, or sitemap.xml.

4. **Testing strategy.** The only verification command is `npm run build`. There
   is no link checker, no accessibility checker, no visual regression, no
   Lighthouse budget.

5. **Content update workflow.** No spec explains how marketing copy stays in
   sync with the `corpus` repo as it evolves.

6. **Analytics and privacy.** No spec decides whether to add analytics or how
   to handle visitor privacy.

7. **Scope / launch priority.** The specs do not distinguish launch blockers
   from post-launch additions. `/skills` and `/cli` teaser pages, for example,
   may not be necessary for launch.

## Impact

If these gaps persist, the website will ship without accessibility, without
proper SEO, without a documented deployment process, and without a clear
definition of "done." The specs are good page outlines but not a launch plan.

## Recommendation

Add the following specs before cutting implementation tasks:

- `SPEC-deployment` — Vercel setup, domain, build config, env vars.
- `SPEC-accessibility` — WCAG AA, reduced motion, focus, alt text.
- `SPEC-seo` — metadata, Open Graph, sitemap, robots.
- `SPEC-testing` — link checker, a11y checker, Lighthouse budget, CI checks.
- `SPEC-content-workflow` — how copy stays in sync with `corpus` docs.

Also convert `SPEC-marketing-pages` into a change plan or per-page specs, and
merge `SPEC-examples-section` into `SPEC-homepage` or defer it.
