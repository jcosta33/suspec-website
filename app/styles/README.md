# Suspec CSS Inventory And Change Plan

Scope: global CSS loaded by `app/layout.tsx`, docs CSS loaded by
`app/docs/layout.tsx`, and the late art-direction layers under `app/styles/`.
Excluded: Tailwind-generated output, Pagefind output, generated `dist/`, and
component TypeScript.

## Current Modules

| Path | Current role |
| --- | --- |
| `app/styles/site.css` | Root CSS manifest imported by `app/layout.tsx`; preserves the cascade order in one file. |
| `app/styles/theme.css` | Tailwind import, design tokens, semantic signal roles, package accents, utility aliases. |
| `app/styles/base.css` | Runtime aliases, document/body defaults, selection, target focus, reduced-motion baseline. |
| `app/globals.css` | Late global utilities: gilt trim/rules, `.toggle`, scrollbars, selection compatibility. |
| `app/styles/site-chrome.css` | Header/nav chrome, scroll-revealed top bar, mobile menu states. |
| `app/styles/site-surfaces.css`, `app/styles/surface-primitives.css`, `app/styles/artifact-surfaces.css`, `app/styles/artifact-*.css`, `app/styles/terminal-window.css`, `app/styles/paper-artifact.css` | Reusable panels, terminals, paper artifacts, buttons, badges, lamps, tactile surface primitives. |
| `app/styles/sections.css`, `app/styles/sections-*.css`, `app/styles/route-heroes.css`, `app/styles/route-heroes-*.css`, `app/styles/process-strips.css` | Shared route rhythm, section heading/register subfamilies, route hero manifest/subfamilies, process rails. |
| `app/styles/home.css`, `app/styles/get-started.css`, `app/styles/get-started-choices.css`, `app/styles/what-is-suspec.css`, `app/styles/what-is-suspec-*.css`, `app/styles/loop.css`, `app/styles/loop-*.css`, `app/styles/cli.css`, `app/styles/mcp.css`, `app/styles/mcp-*.css`, `app/styles/skills.css`, `app/styles/skills-*.css`, `app/styles/repo-product-*.css`, `app/styles/home-hero-*-polish.css`, `app/styles/mobile-*-polish.css`, `app/styles/colophon.css`, `app/styles/footer.css` | Route and product-page styling. Product shared CSS is split into manifest, navigation, roster, worker-card, and late product-polish families; home, overview, loop, MCP, skills, and product mobile tuning now sits beside route owners. |
| `app/styles/motion-primitives.css`, `app/styles/motion-surfaces.css`, `app/styles/reduced-motion.css` | Cursor/background motion, hover-safe transforms, reduced-motion clamp. `reduced-motion.css` stays last. |
| `app/styles/mobile-*-polish.css` | Late mobile tuning from the redesign, split by route family at the same cascade point. |
| `app/docs/docs.css` | Docs CSS manifest imported by `app/docs/layout.tsx`; keeps docs-only cascade in one place. |
| `app/docs/docs-shell.css`, `app/docs/docs-article.css`, `app/docs/docs-article-*.css`, `app/docs/docs-index.css`, `app/docs/docs-index-*.css`, `app/docs/docs-footer.css`, `app/docs/docs-responsive.css`, `app/styles/docs-index-polish.css`, `app/styles/mobile-docs-index-polish.css` | Docs shell, rendered markdown, article and index subfamilies, footer, docs-specific responsive fixes, and late docs-index polish imported only under the docs layout manifest. |

`app/art-direction-pass.css` and the later `app/styles/art-direction-*.css`
files no longer exist; their work is split into `*-polish.css` files by route
family.

## Current Interfaces

| Interface | Callers | Observed contract |
| --- | --- | --- |
| Root CSS imports | `app/layout.tsx`, `app/styles/site.css` | `app/layout.tsx` imports one root manifest. The manifest defines cascade: tokens/base first, component and route files next, `globals.css`, motion/art-direction overrides, then `reduced-motion.css` last. |
| Docs CSS imports | `app/docs/layout.tsx`, `app/docs/docs.css` | `app/docs/layout.tsx` imports one docs manifest. Docs styles load only under the docs layout and style `.docs-layout`, docs nav, docs index, and rendered markdown. |
| Semantic signal tokens | `app/styles/theme.css`, `app/components/signalStyles.ts`, route pages | Signal roles carry meaning: core gold, evidence sage, greenfield green, brownfield umber, change red, reference verdigris, muted brass. |
| Route hero classes | Route pages using `PageHero`, `Section`, product package pages | `.ambient-header`, `.page-hero-*`, package classes, and product suffix classes control first-viewport rhythm and package accents. |
| Reduced-motion clamp | `app/layout.tsx` import order, `app/styles/reduced-motion.css` | Final import disables cursor, lamp, terminal, diagram, and hover motion for reduced-motion users. |

## Observed Behavior To Preserve

| ID | Behavior | Evidence |
| --- | --- | --- |
| PG-CSS-001 | Root route CSS order keeps `reduced-motion.css` last. | `app/layout.tsx` imports `./styles/site.css`; `app/styles/site.css` imports `./reduced-motion.css` after all other root CSS. |
| PG-CSS-002 | Docs route keeps docs-specific CSS out of non-docs pages. | `app/docs/layout.tsx` imports `./docs.css`; `app/docs/docs.css` imports docs-only CSS. |
| PG-CSS-003 | Generated pages remain static/crawlable while CSS is global. | Verify with `npm run build`. |
| PG-CSS-004 | Route matrix has no horizontal overflow, obvious terminal overflow, missing metadata, or reduced-motion regression. | Verify with `npm run audit:site`. |
| PG-CSS-005 | CSS growth stays bounded while refactoring proceeds. | Verify with `npm run audit:css`. |

## Risks And Unknowns

- `route-heroes.css`, `docs-article.css`, and `what-is-suspec.css` are still
  large enough that unrelated concerns are easy to mix.
- mobile polish files still use many `!important` declarations because the old
  mobile art-direction layer was added as a late tuning pass.
- Several route files still combine Tailwind utilities with named global
  classes, so moving a selector requires checking JSX call sites.
- CSS Modules could reduce global leakage, but renaming all selectors at once
  would create high visual regression risk.

## Conservative Target

- Keep token and role definitions in `theme.css`.
- Keep document defaults, global motion defaults, and root behavior in `base.css`.
- Keep `reduced-motion.css` as the last CSS import.
- Move only cohesive selector families at a time.
- Prefer splitting large global files by route or component family before
  changing selector names.
- Shrink art-direction files by folding stable overrides back into their owning
  route/component files.
- Keep package accent color limited to package headers and identities; content
  keeps semantic signal roles.

## Refactor Waves

| Wave | Change | Preserves | Verify with |
| --- | --- | --- | --- |
| 1 | Add CSS inventory guardrails and this map. | PG-CSS-001 through PG-CSS-005. | `npm run audit:css`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run audit:site`. |
| 2 | Split `repo-products.css` into manifest, navigation, agent roster, and worker-card files without changing selectors. | Product page layout, package colors, nav behavior. | `npm run audit:css`, `npm run audit:site`; visual spot-check `/skills`, `/agents`, `/cli`, `/mcp`. |
| 3 | Fold stable `art-direction-products.css` rules into owning late product-polish files, preserving cascade before merging them earlier. | Product page spacing and mobile fit. | `npm run audit:css`, `npm run audit:site`; screenshot product pages at mobile/tablet/desktop. |
| 4 | Fold stable `art-direction-home.css` and `art-direction-docs.css` rules into owning late home/docs polish files, preserving cascade before merging them earlier. | Home first viewport, docs search/nav alignment, docs quote/code tone. | `npm run audit:css`, `npm run audit:site`; screenshot `/`, `/docs`, one short doc, one long doc. |
| 5 | Split the old mobile art-direction layer by route family, then reduce `!important` only after the owning selector order is clear. | Mobile no-overflow and reduced-motion behavior. | `npm run audit:css`, `npm run audit:site`, representative keyboard/a11y checks. |

## Cutover And Rollback

Cutover for each wave requires the named verify commands to pass and a cached
diff showing selector moves, not visual redesign. Roll back a wave if route
audit reports overflow/metadata/motion failures, Lighthouse shows a clear
regression on representative routes, or screenshots show spacing, overlap, or
color-role drift.
