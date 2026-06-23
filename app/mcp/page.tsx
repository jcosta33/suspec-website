import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Braces,
  Cable,
  ExternalLink,
  FileJson,
  FolderLock,
  MessagesSquare,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { DroneIcon } from "../components/DroneIcon";
import { Heading } from "../components/Heading";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Panel } from "../components/Panel";
import { PaperArtifact } from "../components/PaperArtifact";
import { Section } from "../components/Section";
import { TerminalWindow } from "../components/TerminalWindow";

export const metadata: Metadata = {
  title: "corpus-mcp — corpus",
  description:
    "corpus-mcp is a read-only MCP stdio server for corpus workspaces: status, checks, parsed artifacts, and reconcile facts with no verdict.",
  openGraph: {
    title: "corpus-mcp — corpus",
    description:
      "A thin MCP adapter over corpus-cli's --json contract: tools, resources, and prompts for read-only reconcile facts in agent clients.",
    type: "website",
    url: "/mcp/",
    siteName: "corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "corpus-mcp — a read-only MCP bridge for corpus workspaces",
      },
    ],
  },
  alternates: {
    canonical: "/mcp/",
  },
};

const guardrails = [
  {
    title: "Read-only",
    text: "The server exposes facts from the workspace. It does not write durable artifacts.",
    icon: ShieldCheck,
  },
  {
    title: "No verdict",
    text: "Tool results carry noVerdictIssued. A human or independent reviewer still owns Pass, Fail, Unverified, or Blocked.",
    icon: MessagesSquare,
  },
  {
    title: "Root-confined",
    text: "Client inputs are validated before subprocess calls; paths must resolve inside the configured workspace root.",
    icon: FolderLock,
  },
  {
    title: "CLI contract only",
    text: "It shells out to corpus status, check, review, and show with --json. It does not import CLI internals.",
    icon: Braces,
  },
];

const tools = [
  {
    group: "reconcile",
    items: [
      "corpus_get_status",
      "corpus_check_workspace",
      "corpus_check_file",
      "corpus_scan_task",
      "corpus_reconcile_review",
      "corpus_validate_review_packet",
    ],
  },
  {
    group: "loaders",
    items: [
      "corpus_get_task",
      "corpus_get_spec",
      "corpus_get_review",
      "corpus_get_checks",
    ],
  },
];

const resources = [
  "corpus://workspace",
  "corpus://status",
  "corpus://checks",
  "corpus://tasks/{id}",
  "corpus://specs/{id}",
  "corpus://reviews/{id}",
  "corpus://findings/{id}",
];

const prompts = [
  "corpus_task_briefing",
  "corpus_before_done",
  "corpus_review_assistant",
  "corpus_evidence_rule",
  "corpus_finding_candidate",
];

export default function McpPage() {
  return (
    <div className="flex flex-col gap-20 py-20 sm:gap-24 sm:py-24">
      <Section className="ambient-header">
        <PageHero
          eyebrow="mcp server / read-only adapter"
          title={
            <>
              corpus<span className="text-corpus-yellow">-mcp</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A stdio MCP server that lets agent clients ask a corpus workspace
            for scope, checks, parsed artifacts, and reconcile facts.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            It is an adapter, not a judge. It gives the agent better context;
            it does not approve the work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="ready">v0 surface</Badge>
            <Badge variant="draft">read-only</Badge>
            <Badge variant="unverified">no verdict</Badge>
            <Badge variant="default">Node &gt;= 18.18</Badge>
          </div>
        </PageHero>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel brushed className="p-2">
          <TerminalWindow title="mcp.json" ariaLabel="corpus-mcp config">
            <p className="text-concrete-500">
              {"// Claude Desktop / Cursor MCP config"}
            </p>
            <p>{"{"}</p>
            <p className="pl-4">&quot;mcpServers&quot;: {"{"}</p>
            <p className="pl-8">&quot;corpus&quot;: {"{"}</p>
            <p className="pl-12">
              &quot;command&quot;: &quot;corpus-mcp&quot;,
            </p>
            <p className="pl-12">
              &quot;args&quot;: [&quot;--workspace&quot;,
              &quot;/path/to/corpus-workspace&quot;]
            </p>
            <p className="pl-8">{"}"}</p>
            <p className="pl-4">{"}"}</p>
            <p>{"}"}</p>
          </TerminalWindow>
        </Panel>

        <PaperArtifact
          label="note"
          title="why a separate package?"
          meta="mcp sdk lives here / cli stays small"
        >
          <p>
            corpus-mcp adapts the public <span className="font-semibold">--json</span>{" "}
            contract. The CLI keeps its small footprint; the MCP server carries
            the SDK dependency and process model separately.
          </p>
          <p className="mt-4 text-pencil">
            This is the &ldquo;many libraries, not a framework&rdquo; shape:
            useful pieces, coupled by public interfaces.
          </p>
        </PaperArtifact>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <DroneIcon className="h-4 w-4" />
            <span>guardrails.ts</span>
          </div>
          <Heading className="mt-3">What it refuses to be</Heading>
          <p className="mt-4 text-concrete-400">
            The server gives an MCP-capable client a clean way to read the
            workspace. It does not run an agent loop, write reviews, or decide
            whether the code is done.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guardrails.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card screws className="h-full border-panel-border">
                  <HexBadge color="yellow" className="mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                    {item.text}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-2">
        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-phosphor">
            <Cable className="h-4 w-4" aria-hidden="true" />
            <span>tools / 10</span>
          </div>
          <Heading className="mt-3">MCP tools</Heading>
          <p className="mt-4 text-concrete-400">
            Reconcile/check calls plus parsed-artifact loaders. Every tool maps
            to a fixed corpus CLI invocation with <code>--json</code>.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tools.map((group) => (
              <div
                key={group.group}
                className="rounded-panel border border-panel-border bg-panel p-4"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-amber">
                  {group.group}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="break-words font-mono text-sm text-concrete-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <FileJson className="h-4 w-4" aria-hidden="true" />
            <span>resources + prompts</span>
          </div>
          <Heading className="mt-3">Context the client can ask for</Heading>
          <p className="mt-4 text-concrete-400">
            Resources expose the board, checks, and selected artifacts. Prompts
            steer agents toward scope, evidence, and independent review.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-panel border border-panel-border bg-panel p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-amber">
                resources
              </p>
              <ul className="mt-3 space-y-2">
                {resources.map((item) => (
                  <li
                    key={item}
                    className="break-words font-mono text-sm text-concrete-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-panel border border-panel-border bg-panel p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-amber">
                prompts
              </p>
              <ul className="mt-3 space-y-2">
                {prompts.map((item) => (
                  <li
                    key={item}
                    className="break-words font-mono text-sm text-concrete-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>install.sh</span>
          </div>
          <Heading className="mt-3">Install from source for now</Heading>
          <p className="mt-4 text-concrete-400">
            The package exposes a <code>corpus-mcp</code> binary. It expects the{" "}
            <Link
              href="/cli/"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              corpus CLI
            </Link>{" "}
            on PATH, unless you point <code>CORPUS_BIN</code> or{" "}
            <code>--corpus-bin</code> at a specific binary.
          </p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="install corpus-mcp">
            <p className="text-concrete-500">
              # until a published build is available
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> git clone
              https://github.com/jcosta33/corpus-mcp.git
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> cd corpus-mcp
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> pnpm install
              &amp;&amp; pnpm build &amp;&amp; npm link
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section>
        <Card
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
              <Boxes className="h-4 w-4" aria-hidden="true" />
              <span>source</span>
            </div>
            <Heading className="mt-3">Read the adapter code</Heading>
            <p className="mt-2 max-w-2xl text-concrete-400">
              The repo is small: config, root guards, CLI invocation, tools,
              resources, prompts, and tests.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link
                href="https://github.com/jcosta33/corpus-mcp"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/cli/">
                See the CLI <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
