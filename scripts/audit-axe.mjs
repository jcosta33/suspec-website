import { spawn } from "node:child_process";

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
  "/docs/reference/cli/",
  "/colophon/",
  "/kitchen-sink/",
];

function runAxe(urls) {
  const command = process.platform === "win32" ? "npx.cmd" : "npx";
  const args = [
    "axe",
    ...urls,
    "--stdout",
    "--tags",
    "wcag2a,wcag2aa,wcag21a,wcag21aa",
    "--load-delay",
    "1000",
    "--timeout",
    "120",
    "--chrome-options=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage",
  ];

  const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  return new Promise((resolve) => {
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

function compactViolation(violation) {
  return {
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes?.length ?? 0,
    help: violation.help,
  };
}

function parseAxeJson(stdout) {
  const start = stdout.indexOf("[");
  const end = stdout.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("axe stdout did not contain a JSON array");
  }
  return JSON.parse(stdout.slice(start, end + 1));
}

assertDistBuilt("audit-axe");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;

let exitCode = 0;
try {
  const urls = routes.map((route) => `${baseUrl}${route}`);
  const result = await runAxe(urls);
  let reports;
  try {
    reports = parseAxeJson(result.stdout);
  } catch (error) {
    console.log(`FAIL axe parse ${JSON.stringify({ error: error.message, stderr: result.stderr })}`);
    process.exitCode = 1;
    throw error;
  }

  if (result.code !== 0) {
    exitCode = 1;
    console.log(`FAIL axe-cli ${JSON.stringify({ code: result.code, stderr: result.stderr })}`);
  }

  for (const report of reports) {
    const route = new URL(report.url).pathname;
    const violations = report.violations ?? [];
    const incomplete = report.incomplete ?? [];
    if (violations.length) {
      exitCode = 1;
      console.log(
        `FAIL axe ${route} ${JSON.stringify({
          violations: violations.map(compactViolation),
          incomplete: incomplete.length,
        })}`,
      );
    } else {
      console.log(
        `PASS axe ${route} ${JSON.stringify({
          violations: 0,
          incomplete: incomplete.length,
          passes: report.passes?.length ?? 0,
        })}`,
      );
    }
  }

  console.log(`[audit-axe] routes=${reports.length}`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
