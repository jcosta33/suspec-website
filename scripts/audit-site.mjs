import * as chromeLauncher from "chrome-launcher";

import {
  assertDistBuilt,
  createStaticDistServer,
  listen,
} from "./lib/static-dist-server.mjs";
import { openCdp, wait, waitForRouteReady } from "./lib/cdp.mjs";

const routes = [
  "/",
  "/what-is-suspec/",
  "/the-loop/",
  "/get-started/",
  "/skills/",
  "/skills/writing/",
  "/agents/",
  "/cli/",
  "/mcp/",
  "/docs/",
  "/docs/01-what-is-suspec/",
  "/docs/reference/advanced-lifecycle/",
  "/colophon/",
  "/kitchen-sink/",
];

const sitemapRoutes = routes.filter((route) => route !== "/kitchen-sink/");
const agentResourceRoutes = ["/llms.txt", "/llms-full.txt"];

const viewports = [
  { name: "desktop", width: 1280, height: 900, mobile: false, dpr: 1 },
  { name: "tablet", width: 768, height: 1024, mobile: false, dpr: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, dpr: 2 },
];

const hoverStabilitySelector = [
  ".home-hero-run-card",
  ".home-step-rail-item",
  ".terminal-window",
  ".panel-raised",
  ".paper-artifact",
  ".loop-step-card",
  ".setup-choice-card",
  ".cli-command-link",
  ".catalog-row",
  ".agent-worker-card",
  ".mcp-adapter-step-link",
  ".process-strip > *",
  ".docs-index-section",
  ".docs-pager-link",
].join(",");

const expectedStructuredTypes = new Map([
  ["/", ["SoftwareApplication", "FAQPage"]],
  ["/what-is-suspec/", ["AboutPage"]],
  ["/the-loop/", ["WebPage", "ItemList"]],
  ["/get-started/", ["WebPage", "HowTo"]],
  ["/skills/", ["CollectionPage", "ItemList"]],
  ["/skills/writing/", ["TechArticle", "ItemList"]],
  ["/agents/", ["CollectionPage", "ItemList"]],
  ["/cli/", ["CollectionPage", "ItemList"]],
  ["/mcp/", ["CollectionPage", "ItemList"]],
  ["/docs/", ["CollectionPage", "ItemList"]],
  ["/docs/01-what-is-suspec/", ["BreadcrumbList", "TechArticle"]],
  ["/docs/reference/advanced-lifecycle/", ["BreadcrumbList", "TechArticle"]],
  ["/colophon/", ["WebPage", "SoftwareSourceCode"]],
  ["/kitchen-sink/", []],
]);

function isIdentityTransform(value) {
  return (
    !value ||
    value === "none" ||
    value === "matrix(1, 0, 0, 1, 0, 0)" ||
    value === "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
  );
}

function isIdentityLonghand(value, identity) {
  return !value || value === "none" || value === identity;
}

function rectDelta(before, after) {
  return Math.max(
    Math.abs(before.left - after.left),
    Math.abs(before.top - after.top),
    Math.abs(before.width - after.width),
    Math.abs(before.height - after.height),
  );
}

async function auditHoverStability(cdp, viewport) {
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: viewport.width - 2,
    y: 2,
  });
  await wait(40);

  const targets = await cdp.eval(`(() => {
    const selector = ${JSON.stringify(hoverStabilitySelector)};
    const isVisible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.visibility !== 'hidden' &&
        style.display !== 'none' &&
        rect.width > 8 &&
        rect.height > 8 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < innerHeight &&
        rect.left < innerWidth
      );
    };
    return [...document.querySelectorAll(selector)]
      .filter(isVisible)
      .slice(0, 12)
      .map((el, index) => {
        const id = \`hover-audit-\${index}\`;
        el.setAttribute('data-hover-audit-id', id);
        const rect = el.getBoundingClientRect();
        return {
          id,
          label: (el.textContent || el.getAttribute('aria-label') || el.className || el.tagName)
            .replace(/\\s+/g, ' ')
            .trim()
            .slice(0, 90),
          x: Math.min(Math.max(rect.left + rect.width / 2, 1), innerWidth - 2),
          y: Math.min(Math.max(rect.top + rect.height / 2, 1), innerHeight - 2),
        };
      });
  })()`);

  const probes = [];
  for (const target of targets) {
    const before = await cdp.eval(`(() => {
      const el = document.querySelector('[data-hover-audit-id="${target.id}"]');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        transform: style.transform,
        translate: style.translate,
        scale: style.scale,
      };
    })()`);

    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: target.x,
      y: target.y,
    });
    await wait(80);

    const after = await cdp.eval(`(() => {
      const el = document.querySelector('[data-hover-audit-id="${target.id}"]');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        transform: style.transform,
        translate: style.translate,
        scale: style.scale,
      };
    })()`);

    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: viewport.width - 2,
      y: 2,
    });
    await wait(30);

    if (!before || !after) continue;

    const delta = rectDelta(before.rect, after.rect);
    const transformed =
      !isIdentityTransform(after.transform) ||
      !isIdentityLonghand(after.translate, "0px") ||
      !isIdentityLonghand(after.scale, "1");

    probes.push({
      label: target.label,
      delta: Math.round(delta * 100) / 100,
      transform: after.transform,
      translate: after.translate,
      scale: after.scale,
      pass: delta <= 0.75 && !transformed,
    });
  }

  return {
    checked: probes.length,
    failures: probes.filter((probe) => !probe.pass).slice(0, 8),
  };
}

function visibleControlSelector() {
  return [
    "button",
    "input",
    "summary",
    ".site-nav a",
    ".mobile-menu a",
    ".docs-nav a",
    ".docs-search input",
    ".btn",
    ".button",
    "[role='button']",
  ].join(",");
}

async function auditRoute(cdp, baseUrl, route, viewport) {
  cdp.exceptions = [];
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.dpr,
    mobile: viewport.mobile,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: viewport.mobile });
  await cdp.send("Emulation.setEmulatedMedia", { features: [] });
  await cdp.send("Page.navigate", { url: `${baseUrl}${route}` });
  await waitForRouteReady(cdp, new URL(route, baseUrl).pathname);
  await wait(route.startsWith("/docs") ? 1800 : 1000);

  const report = await cdp.eval(`(() => {
    const controlSelector = ${JSON.stringify(visibleControlSelector())};
    const isVisible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const text = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
    const head = (selector, attr = 'content') => document.querySelector(selector)?.getAttribute(attr) || '';
    const normalizeClaim = (value) =>
      (value || '')
        .toLowerCase()
        .replace(/https?:\\/\\/[^\\s]+/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\\s+/g, ' ')
        .trim();
    const visibleText = normalizeClaim([
      document.title,
      head('meta[name="description"]'),
      text(document.body),
    ].join(' '));
    const jsonLdItemsFor = (value, depth = 0) => {
      if (!value || depth > 6) return [];
      if (Array.isArray(value)) return value.flatMap((item) => jsonLdItemsFor(item, depth + 1));
      if (typeof value !== 'object') return [];
      const item = value;
      const ownType = item['@type'];
      const record = {
        type: Array.isArray(ownType) ? ownType : ownType ? [ownType] : [],
        name: typeof item.name === 'string' ? item.name : '',
        headline: typeof item.headline === 'string' ? item.headline : '',
        description: typeof item.description === 'string' ? item.description : '',
        url: typeof item.url === 'string' ? item.url : '',
        id: typeof item['@id'] === 'string' ? item['@id'] : '',
        depth,
      };
      const nestedKeys = [
        '@graph',
        'acceptedAnswer',
        'about',
        'author',
        'hasPart',
        'item',
        'itemListElement',
        'mainEntity',
        'potentialAction',
        'publisher',
        'step',
        'supply',
        'tool',
      ];
      return [
        record,
        ...nestedKeys.flatMap((key) => jsonLdItemsFor(item[key], depth + 1)),
      ];
    };
    const claimVisible = (value, field) => {
      const normalized = normalizeClaim(value);
      if (!normalized || normalized.length < 3 || visibleText.includes(normalized)) return true;
      if (field === 'description') return false;
      const tokens = normalized
        .split(' ')
        .filter((token) => token.length > 2 && !['and', 'for', 'the', 'with'].includes(token));
      if (!tokens.length) return true;
      const visibleTokens = tokens.filter((token) => visibleText.includes(token));
      return visibleTokens.length / tokens.length >= 0.8;
    };
    const shouldCheckStructuredClaim = (item, field) => {
      const types = new Set(item.type);
      if (types.has('Organization') || types.has('WebSite')) return false;
      if (field === 'description' && item.depth > 1) return false;
      if (field === 'description' && (
        types.has('CreativeWork') ||
        types.has('HowToStep') ||
        types.has('HowToSupply') ||
        types.has('HowToTool') ||
        types.has('ItemList') ||
        types.has('ListItem') ||
        types.has('WebPageElement')
      )) return false;
      if (field === 'name' && (
        types.has('HowToStep') ||
        types.has('HowToSupply') ||
        types.has('HowToTool') ||
        types.has('ItemList') ||
        types.has('ListItem')
      )) return false;
      return true;
    };
    const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script, index) => {
        try {
          const parsed = JSON.parse(script.textContent || '{}');
          const items = jsonLdItemsFor(parsed).filter(
            (item) =>
              item.type.length ||
              item.name ||
              item.headline ||
              item.description ||
              item.url ||
              item.id,
          );
          const missingVisibleClaims = items
            .flatMap((item) =>
              ['name', 'headline', 'description'].flatMap((field) => {
                const value = item[field];
                if (!value || !shouldCheckStructuredClaim(item, field) || claimVisible(value, field)) return [];
                return [{
                  type: item.type.join(',') || 'unknown',
                  field,
                  value: value.slice(0, 120),
                }];
              }),
            )
            .slice(0, 8);
          return {
            index,
            ok: true,
            itemCount: items.length,
            types: [...new Set(items.flatMap((item) => item.type))].sort(),
            urls: [...new Set(items.flatMap((item) => [item.url, item.id]).filter(Boolean))].slice(0, 80),
            missingVisibleClaims,
          };
        } catch (error) {
          return { index, ok: false, error: error.message, itemCount: 0, types: [], urls: [], missingVisibleClaims: [] };
        }
      });
    const labelledByText = (el) =>
      (el.getAttribute('aria-labelledby') || '')
        .split(/\\s+/)
        .map((id) => text(document.getElementById(id)))
        .filter(Boolean)
        .join(' ');
    const controlName = (el) => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
        return text(el.labels?.[0]) || el.getAttribute('aria-label') || labelledByText(el) || el.getAttribute('placeholder') || el.getAttribute('title') || '';
      }
      return text(el) || el.getAttribute('aria-label') || labelledByText(el) || el.getAttribute('title') || el.querySelector('img[alt]')?.getAttribute('alt') || '';
    };
    const html = document.documentElement;
    const width = html.clientWidth;
    const h1s = [...document.querySelectorAll('h1')].filter(isVisible).map((el) => {
      const rect = el.getBoundingClientRect();
      return { text: text(el), width: rect.width, top: rect.top };
    });
    const navRect = document.querySelector('.site-header')?.getBoundingClientRect();
    const pageHero = document.querySelector('.page-hero');
    const heroRect = pageHero?.getBoundingClientRect();
    const nextVisibleAfterHero = pageHero
      ? [...document.querySelectorAll('main section, main article, main nav, main > div')]
          .filter(isVisible)
          .find((el) => {
            const rect = el.getBoundingClientRect();
            return !el.contains(pageHero) && el !== pageHero && rect.top > heroRect.bottom - 4;
          })
      : null;
    const nextVisibleAfterHeroRect = nextVisibleAfterHero?.getBoundingClientRect();
    const rhythm = pageHero && h1s[0] && navRect && heroRect
      ? {
          gapNavH1: Math.round(h1s[0].top - navRect.bottom),
          gapHeroNext: nextVisibleAfterHeroRect
            ? Math.round(nextVisibleAfterHeroRect.top - heroRect.bottom)
            : null,
        }
      : null;
    const copyButtons = [...document.querySelectorAll('button, [role="button"]')]
      .filter(isVisible)
      .filter((el) => /copy/i.test(text(el) + ' ' + (el.getAttribute('aria-label') || '')))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          label: text(el) || el.getAttribute('aria-label') || el.className || el.tagName,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          cursor: getComputedStyle(el).cursor,
        };
      });
    const smallControls = [...document.querySelectorAll(controlSelector)]
      .filter(isVisible)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          label: text(el) || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName,
          tag: el.tagName.toLowerCase(),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter((item) => item.width < 40 || item.height < 40)
      .slice(0, 8);
    const wideBlocks = [...document.querySelectorAll('pre, code, .terminal-content, .terminal-window')]
      .filter(isVisible)
      .map((el) => ({
        label: el.className || el.tagName,
        clientWidth: Math.round(el.clientWidth),
        scrollWidth: Math.round(el.scrollWidth),
        overflowX: getComputedStyle(el).overflowX,
      }))
      .filter((item) => item.scrollWidth > item.clientWidth + 2 && !/(auto|scroll)/.test(item.overflowX))
      .slice(0, 8);
    const headingsTooWide = h1s.filter((item) => item.width > width + 1);
    const pageOverflow =
      html.scrollWidth > html.clientWidth + 1 ||
      document.body.scrollWidth > html.clientWidth + 1;
    const badCopyButtons = copyButtons.filter((item) => item.cursor !== 'pointer' || item.width < 40 || item.height < 40);
    const anchorsWithoutHref = [...document.querySelectorAll('a')].filter((el) => !el.getAttribute('href')).length;
    const nestedInteractive = [...document.querySelectorAll('a button, button a')].length;
    const unnamedControls = [...document.querySelectorAll(controlSelector)]
      .filter(isVisible)
      .filter((el) => !controlName(el))
      .map((el) => el.outerHTML.slice(0, 120))
      .slice(0, 8);
    const targetBlankMissingRel = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((el) => {
        const rel = (el.getAttribute('rel') || '').toLowerCase();
        return !rel.includes('noopener') || !rel.includes('noreferrer');
      })
      .map((el) => text(el) || el.getAttribute('aria-label') || el.getAttribute('href'))
      .slice(0, 8);
    const seenIds = new Set();
    const duplicateIds = [];
    for (const el of document.querySelectorAll('[id]')) {
      const id = el.id;
      if (!id) continue;
      if (seenIds.has(id) && !duplicateIds.includes(id)) duplicateIds.push(id);
      seenIds.add(id);
    }
    const canonicalPath = head('link[rel="canonical"]', 'href') ? new URL(head('link[rel="canonical"]', 'href'), location.origin).pathname : '';
    return {
      url: location.pathname,
      title: document.title.trim(),
      description: head('meta[name="description"]'),
      canonical: head('link[rel="canonical"]', 'href'),
      ogTitle: head('meta[property="og:title"]'),
      ogDescription: head('meta[property="og:description"]'),
      h1s,
      rhythm,
      mainTextLength: text(document.querySelector('main')).length,
      pageOverflow,
      headingsTooWide,
      copyButtons,
      badCopyButtons,
      smallControls,
      wideBlocks,
      anchorsWithoutHref,
      nestedInteractive,
      unnamedControls,
      targetBlankMissingRel,
      duplicateIds: duplicateIds.slice(0, 8),
      canonicalPath,
      jsonLdScripts,
    };
  })()`);
  const hoverStability = await auditHoverStability(cdp, viewport);
  report.hoverStability = hoverStability;

  const failures = [];
  if (report.h1s.length !== 1) failures.push(`h1 count ${report.h1s.length}`);
  if (report.title.length < 12) failures.push("short/missing title");
  if (report.description.length < 50) failures.push("short/missing description");
  if (!report.canonical) failures.push("missing canonical");
  if (!report.ogTitle || !report.ogDescription) failures.push("missing OG metadata");
  if (report.mainTextLength < 300) failures.push("main content too thin");
  if (report.pageOverflow) failures.push("body horizontal overflow");
  if (report.headingsTooWide.length) failures.push("H1 overflows viewport");
  if (report.rhythm?.gapNavH1 < 56) failures.push("hero heading too close to fixed nav");
  if (
    route !== "/" &&
    report.rhythm &&
    report.rhythm.gapHeroNext !== null &&
    report.rhythm.gapHeroNext < 40
  ) {
    failures.push("hero content too close to following section");
  }
  if (report.badCopyButtons.length) failures.push("bad copy button target/cursor");
  if (viewport.mobile && report.smallControls.length) failures.push("small mobile control target");
  if (report.wideBlocks.length) failures.push("unscrollable code/terminal overflow");
  if (report.anchorsWithoutHref) failures.push(`anchors without href ${report.anchorsWithoutHref}`);
  if (report.nestedInteractive) failures.push(`nested interactive ${report.nestedInteractive}`);
  if (report.unnamedControls.length) failures.push("interactive controls missing accessible name");
  if (report.targetBlankMissingRel.length) failures.push("target blank links missing noopener/noreferrer");
  if (report.duplicateIds.length) failures.push("duplicate ids");
  if (hoverStability.failures.length) failures.push("hover moves surface");
  if (report.canonicalPath !== new URL(route, baseUrl).pathname) failures.push("canonical path does not match route");
  if (cdp.exceptions.length) failures.push(`runtime exceptions ${cdp.exceptions.length}`);

  return { route, viewport: viewport.name, failures, report, exceptions: cdp.exceptions };
}

async function auditReducedMotion(cdp, baseUrl) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: `${baseUrl}/` });
  await wait(1000);
  return cdp.eval(`(() => {
    const identity = (transform) =>
      transform === 'none' ||
      transform === 'matrix(1, 0, 0, 1, 0, 0)' ||
      transform === 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
    const terminal = document.querySelector('.terminal-window');
    const panel = document.querySelector('.panel-raised.group');
    const lamp = document.querySelector('.pilot-lamp-pulse, .pilot-lamp');
    for (const el of [terminal, panel].filter(Boolean)) {
      const rect = el.getBoundingClientRect();
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: rect.left + 8, clientY: rect.top + 8 }));
    }
    const terminalTransform = terminal ? getComputedStyle(terminal).transform : 'none';
    const panelTransform = panel ? getComputedStyle(panel).transform : 'none';
    const lampAnimation = lamp ? getComputedStyle(lamp).animationName : 'none';
    return {
      matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      terminalTransform,
      panelTransform,
      lampAnimation,
      pass: identity(terminalTransform) && identity(panelTransform) && lampAnimation === 'none',
    };
  })()`);
}

async function fetchText(baseUrl, route) {
  const response = await fetch(`${baseUrl}${route}`);
  return {
    route,
    ok: response.ok,
    status: response.status,
    type: response.headers.get("content-type") ?? "",
    text: await response.text(),
  };
}

async function auditSeoArtifacts(baseUrl) {
  const [robots, sitemap, llms, llmsFull] = await Promise.all([
    fetchText(baseUrl, "/robots.txt"),
    fetchText(baseUrl, "/sitemap.xml"),
    fetchText(baseUrl, "/llms.txt"),
    fetchText(baseUrl, "/llms-full.txt"),
  ]);

  const failures = [];
  for (const resource of [robots, sitemap, llms, llmsFull]) {
    if (!resource.ok) failures.push(`${resource.route} returned ${resource.status}`);
  }

  if (!robots.text.includes("Sitemap: https://suspecframework.dev/sitemap.xml")) {
    failures.push("robots.txt missing sitemap directive");
  }

  for (const route of [...sitemapRoutes, ...agentResourceRoutes]) {
    const absoluteUrl = `https://suspecframework.dev${route}`;
    if (!sitemap.text.includes(`<loc>${absoluteUrl}</loc>`)) {
      failures.push(`sitemap missing ${absoluteUrl}`);
    }
  }

  for (const route of [
    "/docs/01-what-is-suspec/",
    "/docs/reference/advanced-lifecycle/",
  ]) {
    const absoluteUrl = `https://suspecframework.dev${route}`;
    if (!sitemap.text.includes(`<loc>${absoluteUrl}</loc>`)) {
      failures.push(`sitemap missing docs route ${absoluteUrl}`);
    }
  }

  const llmsRequired = [
    "# Suspec",
    "any agent, no runtime",
    "https://suspecframework.dev/docs/",
    "https://suspecframework.dev/llms-full.txt",
    "https://suspecframework.dev/mcp/",
  ];
  for (const needle of llmsRequired) {
    if (!llms.text.includes(needle)) failures.push(`llms.txt missing ${needle}`);
  }

  const fullRequired = [
    "# Suspec - full documentation",
    "<!-- 01-what-is-suspec.md -->",
    "<!-- tutorial/README.md -->",
    "<!-- examples/large-pr-review.md -->",
  ];
  for (const needle of fullRequired) {
    if (!llmsFull.text.includes(needle)) {
      failures.push(`llms-full.txt missing ${needle}`);
    }
  }
  if (llmsFull.text.length < 20000) failures.push("llms-full.txt unexpectedly short");

  return {
    failures,
    lengths: {
      robots: robots.text.length,
      sitemap: sitemap.text.length,
      llms: llms.text.length,
      llmsFull: llmsFull.text.length,
    },
  };
}

function auditRouteMetadata(results) {
  const failures = [];
  const byRoute = new Map();
  for (const result of results) {
    const items = byRoute.get(result.route) ?? [];
    items.push(result.report);
    byRoute.set(result.route, items);
  }

  const routeRecords = [];
  for (const [route, reports] of byRoute) {
    const [first] = reports;
    for (const key of ["title", "description", "canonical", "ogTitle", "ogDescription"]) {
      const variants = new Set(reports.map((report) => report[key]).filter(Boolean));
      if (variants.size !== 1) failures.push(`${route} inconsistent ${key} across viewports`);
    }
    routeRecords.push({
      route,
      title: first.title,
      description: first.description,
    });
  }

  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const record of routeRecords) {
      const value = record[key];
      if (!value) continue;
      const routesWithValue = seen.get(value) ?? [];
      routesWithValue.push(record.route);
      seen.set(value, routesWithValue);
    }
    for (const [value, routesWithValue] of seen) {
      if (routesWithValue.length > 1) {
        failures.push(`duplicate ${key} "${value}" on ${routesWithValue.join(", ")}`);
      }
    }
  }

  return { failures, routes: routeRecords.length };
}

function auditStructuredData(results) {
  const failures = [];
  const byRoute = new Map();
  for (const result of results) {
    const items = byRoute.get(result.route) ?? [];
    items.push(result.report.jsonLdScripts);
    byRoute.set(result.route, items);
  }

  let scriptCount = 0;
  let itemCount = 0;
  for (const [route, viewportScripts] of byRoute) {
    const scripts = viewportScripts[0] ?? [];
    scriptCount += scripts.length;
    itemCount += scripts.reduce((sum, script) => sum + script.itemCount, 0);

    if (scripts.length < 1) failures.push(`${route} missing JSON-LD`);
    for (const script of scripts) {
      if (!script.ok) failures.push(`${route} JSON-LD script ${script.index} parse error: ${script.error}`);
      for (const miss of script.missingVisibleClaims) {
        failures.push(`${route} JSON-LD ${miss.type} ${miss.field} not visible: ${miss.value}`);
      }
      for (const url of script.urls) {
        if (/localhost|127\\.0\\.0\\.1|0\\.0\\.0\\.0/.test(url)) {
          failures.push(`${route} JSON-LD leaks local URL: ${url}`);
        }
        if (/^https?:/.test(url) && !url.startsWith("https://suspecframework.dev") && !url.startsWith("https://github.com/")) {
          failures.push(`${route} JSON-LD external URL not allowlisted: ${url}`);
        }
      }
    }

    const typeSets = viewportScripts.map((scriptsForViewport) =>
      scriptsForViewport.flatMap((script) => script.types).sort().join("|"),
    );
    if (new Set(typeSets).size !== 1) failures.push(`${route} inconsistent JSON-LD types across viewports`);

    const types = new Set(scripts.flatMap((script) => script.types));
    for (const globalType of ["Organization", "WebSite"]) {
      if (!types.has(globalType)) failures.push(`${route} missing global JSON-LD type ${globalType}`);
    }
    for (const expectedType of expectedStructuredTypes.get(route) ?? []) {
      if (!types.has(expectedType)) failures.push(`${route} missing JSON-LD type ${expectedType}`);
    }
  }

  return { failures, routes: byRoute.size, scripts: scriptCount, items: itemCount };
}

assertDistBuilt("audit-site");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  const results = [];
  for (const route of routes) {
    for (const viewport of viewports) {
      const result = await auditRoute(cdp, baseUrl, route, viewport);
      results.push(result);
      const status = result.failures.length ? "FAIL" : "PASS";
      console.log(`${status} ${result.viewport} ${result.route}`);
      if (result.failures.length) {
        exitCode = 1;
        for (const failure of result.failures) console.log(`  - ${failure}`);
        const details = {
          h1s: result.report.h1s,
          badCopyButtons: result.report.badCopyButtons,
          smallControls: result.report.smallControls,
          wideBlocks: result.report.wideBlocks,
          unnamedControls: result.report.unnamedControls,
          targetBlankMissingRel: result.report.targetBlankMissingRel,
          duplicateIds: result.report.duplicateIds,
          hoverStability: result.report.hoverStability,
          exceptions: result.exceptions,
        };
        console.log(`  details ${JSON.stringify(details)}`);
      }
    }
  }

  const metadata = auditRouteMetadata(results);
  if (metadata.failures.length) {
    exitCode = 1;
    console.log(`FAIL route-metadata ${JSON.stringify(metadata)}`);
  } else {
    console.log(`PASS route-metadata ${JSON.stringify({ routes: metadata.routes })}`);
  }

  const structuredData = auditStructuredData(results);
  if (structuredData.failures.length) {
    exitCode = 1;
    console.log(`FAIL structured-data ${JSON.stringify(structuredData)}`);
  } else {
    console.log(
      `PASS structured-data ${JSON.stringify({
        routes: structuredData.routes,
        scripts: structuredData.scripts,
        items: structuredData.items,
      })}`,
    );
  }

  const reducedMotion = await auditReducedMotion(cdp, baseUrl);
  if (reducedMotion.pass) {
    console.log(`PASS reduced-motion ${JSON.stringify(reducedMotion)}`);
  } else {
    exitCode = 1;
    console.log(`FAIL reduced-motion ${JSON.stringify(reducedMotion)}`);
  }

  const routeCount = new Set(results.map((result) => result.route)).size;
  const seoArtifacts = await auditSeoArtifacts(baseUrl);
  if (seoArtifacts.failures.length) {
    exitCode = 1;
    console.log(`FAIL seo-artifacts ${JSON.stringify(seoArtifacts)}`);
  } else {
    console.log(`PASS seo-artifacts ${JSON.stringify(seoArtifacts.lengths)}`);
  }

  console.log(`[audit-site] routes=${routeCount} viewport-runs=${results.length}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
