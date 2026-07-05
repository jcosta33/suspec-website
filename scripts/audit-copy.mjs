import * as chromeLauncher from "chrome-launcher";

import { openCdp, wait, waitForRouteReady } from "./lib/cdp.mjs";
import {
  assertDistBuilt,
  createStaticDistServer,
  listen,
} from "./lib/static-dist-server.mjs";

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

const bannedPatterns = [
  { label: "stale hive language", pattern: /\b(?:hive|bee|bees|back to hive)\b/i },
  { label: "stale factory language", pattern: /\bfactory\b/i },
  { label: "stale cute-magic language", pattern: /\bmagic\b/i },
  { label: "stale space background language", pattern: /\b(?:starfield|nebula)\b/i },
  { label: "hype language", pattern: /\b(?:revolutionary|game-changing|supercharge|10x|unlock)\b/i },
  { label: "corporate filler", pattern: /\b(?:seamless|seamlessly|synergy|best-in-class)\b/i },
  { label: "overdramatic ritual copy", pattern: /\b(?:six gates|one trace|sacred|oracle|summon|spell|sigil)\b/i },
  { label: "vague AI positioning", pattern: /\b(?:ai-powered|autonomous agent platform)\b/i },
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
    "/what-is-suspec/",
    [
      /does not run an agent, approve code, replace ci, or declare correctness/i,
      /record around agent work/i,
    ],
  ],
  ["/cli/", [/reports facts; people decide/i, /no verdicts/i]],
  ["/mcp/", [/does not decide correctness/i, /not become a hosted service or a review authority/i]],
  ["/agents/", [/return evidence, not verdicts/i, /human or team rule decides/i]],
  ["/skills/", [/skills advise; review still decides/i, /framework-free/i]],
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

async function collectRouteText(cdp, baseUrl, route) {
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
    return (main?.innerText || main?.textContent || '').replace(/\\s+/g, ' ').trim();
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
    const text = normalize(await collectRouteText(cdp, baseUrl, route));
    const failures = scanRoute(route, text);
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
