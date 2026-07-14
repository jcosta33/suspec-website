import * as chromeLauncher from "chrome-launcher";

import { openCdp, wait, waitForRouteReady } from "./lib/cdp.mjs";
import {
  assertDistBuilt,
  createStaticDistServer,
  listen,
} from "./lib/static-dist-server.mjs";

const routes = [
  "/",
  "/the-loop/",
  "/the-loop/intent/",
  "/the-loop/spec/",
  "/the-loop/implement/",
  "/the-loop/review/",
  "/the-loop/check/",
  "/the-loop/findings/",
  "/get-started/",
  "/skills/",
  "/skills/writing/",
  "/skills/bulletproof/",
  "/skills/disrespec/",
  "/skills/fork-me/",
  "/skills/promote/",
  "/skills/revolver/",
  "/skills/sus-spec/",
  "/skills/sus-review/",
  "/skills/triple-check/",
  "/cli/",
  "/mcp/",
  "/docs/",
  "/docs/01-what-is-suspec/",
  "/docs/reference/cli/",
  "/colophon/",
  "/kitchen-sink/",
];

const bannedPatterns = [
  { label: "stale hive language", pattern: /\b(?:hive|bee|bees|back to hive)\b/i },
  { label: "stale factory language", pattern: /\bfactory\b/i },
  { label: "stale cute-magic language", pattern: /\bmagic\b/i },
  { label: "stale space background language", pattern: /\b(?:starfield|nebula)\b/i },
  { label: "hype language", pattern: /\b(?:revolutionary|game-changing|supercharge|10x|unlock)\b/i },
  { label: "corporate filler", pattern: /\b(?:seamless|seamlessly|synergy|best-in-class)\b/i },
  { label: "overdramatic ritual copy", pattern: /\b(?:six gates|one trace|sacred|oracle|summon|spell|sigil)\b/i },
  { label: "vague AI positioning", pattern: /\b(?:ai-powered|autonomous agent platform)\b/i },
  { label: "hand-holdy developer explainer", pattern: /\bA (?:skill|worker|spec|task|CLI|MCP|guide) is\b/i },
  { label: "soft hype adjective", pattern: /\b(?:powerful|robust|effortless|easy-to-use)\b/i },
  // The product is presented as originally designed — no transition narration.
  { label: "retirement language", pattern: /\b(?:retired|superseded|previously|no longer|v2|v3)\b/i },
  // The CLI surface is `suspec check` only; any other verb is a dead surface.
  {
    label: "dead CLI verb",
    pattern:
      /\bsuspec (?:init|work|done|show|next|new|write|fix|pull|worktree|status|review|launch|promote|stamp|gc|doctor)\b/i,
  },
  { label: "store/gate language", pattern: /\b(?:personal store|evidence gate|launch prompt|starter kit|workspace board)\b/i },
];

const claimPatterns = [
  { label: "positive approve-code claim", pattern: /\bapproves? code\b/gi },
  { label: "positive correctness claim", pattern: /\bdeclares? correctness\b/gi },
  { label: "positive guarantee claim", pattern: /\bguarantees? correctness\b/gi },
  { label: "positive CI replacement claim", pattern: /\breplaces? CI\b/gi },
  { label: "positive reviewer replacement claim", pattern: /\breplaces? (?:human )?review(?:ers?)?\b/gi },
];

const boundaryRequirements = new Map([
  [
    "/",
    [/keep their jobs/i, /code (?:stays|is) king/i],
  ],
  ["/cli/", [/reports facts/i, /no verdicts/i]],
  [
    "/mcp/",
    [/shell-less/i, /two tools/i, /no-verdict envelope/i],
  ],
  ["/skills/", [/standalone Markdown|plain Markdown/i, /npx skills add jcosta33\/suspec-skills -g/i]],
]);

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function claimIsNegated(text, index) {
  const before = text.slice(Math.max(0, index - 80), index);
  return /\b(?:does not|do not|cannot|can't|never|no)\b/i.test(before);
}

function scanRoute(route, text) {
  const failures = [];
  for (const { label, pattern } of bannedPatterns) {
    const match = pattern.exec(text);
    if (match) failures.push(`${label}: ${match[0]}`);
  }

  for (const { label, pattern } of claimPatterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      if (!claimIsNegated(text, match.index ?? 0)) failures.push(`${label}: ${match[0]}`);
    }
  }

  for (const requirement of boundaryRequirements.get(route) ?? []) {
    if (!requirement.test(text)) failures.push(`missing boundary copy: ${requirement}`);
  }

  return failures;
}

function duplicateHeadingFailures(headings) {
  const seen = new Map();
  for (const heading of headings) {
    const key = heading.text.toLowerCase();
    if (!key) continue;
    const entries = seen.get(key) ?? [];
    entries.push(heading.level);
    seen.set(key, entries);
  }

  return [...seen.entries()]
    .filter(([, levels]) => levels.length > 1)
    .map(([text, levels]) => `duplicate visible heading "${text}" (${levels.join(", ")})`);
}

async function collectRouteContent(cdp, baseUrl, route) {
  cdp.exceptions = [];
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: false });
  await cdp.send("Emulation.setEmulatedMedia", { features: [] });
  await cdp.send("Page.navigate", { url: `${baseUrl}${route}` });
  await waitForRouteReady(cdp, new URL(route, baseUrl).pathname);
  await wait(route.startsWith("/docs") ? 1800 : 1000);
  return cdp.eval(`(() => {
    const main = document.querySelector('main');
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const clean = (value) => (value || '').replace(/\\s+/g, ' ').trim();
    return {
      text: clean(main?.innerText || main?.textContent || ''),
      headings: [...document.querySelectorAll('main h1, main h2, main h3')]
        .filter(isVisible)
        .map((el) => ({ level: el.tagName.toLowerCase(), text: clean(el.textContent) })),
    };
  })()`);
}

assertDistBuilt("audit-copy");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  const summaries = [];
  for (const route of routes) {
    const content = await collectRouteContent(cdp, baseUrl, route);
    const text = normalize(content.text);
    const failures = [
      ...scanRoute(route, text),
      ...duplicateHeadingFailures(content.headings),
    ];
    summaries.push({ route, chars: text.length });
    if (failures.length || cdp.exceptions.length) {
      exitCode = 1;
      console.log(`FAIL copy ${route} ${JSON.stringify({ failures, exceptions: cdp.exceptions })}`);
    } else {
      console.log(`PASS copy ${route} ${JSON.stringify({ chars: text.length })}`);
    }
  }
  console.log(`[audit-copy] routes=${summaries.length}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
