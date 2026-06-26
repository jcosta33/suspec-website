import type { Metadata } from "next";
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
import { Card } from "../components/Card";
import { DroneIcon } from "../components/DroneIcon";
import { Heading } from "../components/Heading";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Panel } from "../components/Panel";
import { PaperArtifact } from "../components/PaperArtifact";
import { Section } from "../components/Section";
import { TerminalWindow } from "../components/TerminalWindow";
import { TextLink } from "../components/TextLink";

export const metadata: Metadata = {
  title: "corpus-mcp — Corpus",
  description:
    "corpus-mcp exposes Corpus workspace facts through a read-only MCP server.",
  openGraph: {
    title: "corpus-mcp — Corpus",
    description:
      "A read-only MCP server for Corpus status, checks, artifacts, and review facts.",
    type: "website",
    url: "/mcp/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "corpus-mcp — a read-only MCP bridge for Corpus workspaces",
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
    text: "It reads workspace facts. It does not write artifacts.",
    icon: ShieldCheck,
  },
  {
    title: "No verdict",
    text: "It reports facts. Review owns Pass, Fail, Unverified, or Blocked.",
    icon: MessagesSquare,
  },
  {
    title: "Root-confined",
    text: "Paths stay inside the configured workspace root.",
    icon: FolderLock,
  },
  {
    title: "CLI contract only",
    text: "It calls the CLI JSON surface.",
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

const bridgeFlow = [
  {
    label: "Client",
    detail: "Claude Desktop, Cursor, or another MCP host.",
    icon: MessagesSquare,
    href: "#mcp-config",
  },
  {
    label: "stdio",
    detail: "A local process pipe, not a hosted service.",
    icon: Cable,
    href: "#install",
  },
  {
    label: "corpus-mcp",
    detail: "Read-only adapter around the workspace.",
    icon: Boxes,
    href: "#guardrails",
  },
  {
    label: "CLI JSON",
    detail: "Commands return structured facts.",
    icon: Terminal,
    href: "#mcp-tools",
  },
  {
    label: "Workspace",
    detail: "Markdown artifacts stay the source of truth.",
    icon: FileJson,
    href: "#source",
  },
];

export default function McpPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
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
            A read-only MCP server for Corpus workspace facts.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            It runs over standard I/O and gives clients read access to status,
            checks, artifacts, and review data.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="ready">v0 surface</Badge>
            <Badge variant="draft">read-only</Badge>
            <Badge variant="unverified">no verdict</Badge>
          </div>
        </PageHero>
      </Section>

      <Section>
        <Panel brushed screws className="mcp-adapter-panel p-0">
          <div className="mcp-adapter-header">
            <p>Request path</p>
            <span>local stdio bridge</span>
          </div>
          <ol
            className="mcp-adapter-rail process-strip grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-5"
            aria-label="corpus-mcp request path"
          >
            {bridgeFlow.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="mcp-adapter-step relative bg-panel-raised/95"
                >
                  <a
                    href={item.href}
                    className="mcp-adapter-step-link focus-ring group block h-full p-5 transition-colors duration-150 hover:bg-panel sm:p-6"
                    aria-label={`Jump to ${item.label} details`}
                  >
                    <div className="flex items-center gap-3">
                      <HexBadge color="yellow" className="h-10 w-10 shrink-0">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-corpus-yellow">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="font-heading text-lg font-bold text-concrete-100">
                          {item.label}
                        </h2>
                      </div>
                      <ArrowRight
                        className="motion-nudge-x ml-auto h-4 w-4 shrink-0 text-brass/70 lg:hidden"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-concrete-400">
                      {item.detail}
                    </p>
                    {index < bridgeFlow.length - 1 ? (
                      <ArrowRight
                        className="motion-nudge-x-centered absolute right-4 top-1/2 hidden h-4 w-4 text-brass lg:block"
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </Panel>
      </Section>

      <Section
        id="mcp-config"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
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
              &quot;/path/to/workspace&quot;]
            </p>
            <p className="pl-8">{"}"}</p>
            <p className="pl-4">{"}"}</p>
            <p>{"}"}</p>
          </TerminalWindow>
        </Panel>

        <PaperArtifact
          label="note"
          title="package boundary"
          meta="adapter package / cli stays small"
        >
          <p>
            corpus-mcp adapts the CLI&apos;s public{" "}
            <span className="font-semibold">--json</span> contract. The SDK
            lives here so corpus-cli can stay small.
          </p>
        </PaperArtifact>
      </Section>

      <Section id="guardrails" className="flex scroll-mt-28 flex-col gap-12">
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-gold">
            <DroneIcon className="h-4 w-4" />
            <span>guardrails.ts</span>
          </div>
          <Heading className="mt-3">What it does not do</Heading>
          <p className="mt-4 text-concrete-400">
            It does not run an agent loop, write reviews, or decide whether code
            is done.
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

      <Section id="mcp-tools" className="grid scroll-mt-28 gap-6 lg:grid-cols-2">
        <Card screws className="border-panel-border">
          <div className="section-kicker section-kicker-olive">
            <Cable className="h-4 w-4" aria-hidden="true" />
            <span>tools / 10</span>
          </div>
          <Heading className="mt-3">MCP tools</Heading>
          <p className="mt-4 text-concrete-400">
            Check and reconcile calls, plus artifact loaders. Each maps to a
            CLI JSON command.
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
                      className="whitespace-nowrap font-mono text-[0.8125rem] leading-6 text-concrete-300"
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
          <div className="section-kicker section-kicker-gold">
            <FileJson className="h-4 w-4" aria-hidden="true" />
            <span>resources + prompts</span>
          </div>
          <Heading className="mt-3">Context the client can ask for</Heading>
          <p className="mt-4 text-concrete-400">
            Resources expose the board, checks, and selected artifacts. Prompts
            give clients a Corpus-shaped starting point.
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
                    className="whitespace-nowrap font-mono text-[0.8125rem] leading-6 text-concrete-300"
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
                    className="whitespace-nowrap font-mono text-[0.8125rem] leading-6 text-concrete-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section
        id="install"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <div className="section-kicker section-kicker-muted">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>install.sh</span>
          </div>
          <Heading className="mt-3">Install from source for now</Heading>
          <p className="mt-4 text-concrete-400">
            The package exposes a <code>corpus-mcp</code> binary. It expects the{" "}
            <TextLink
              href="/cli/"
            >
              Corpus CLI
            </TextLink>{" "}
            on PATH. Use <code>CORPUS_BIN</code> or{" "}
            <code>--corpus-bin</code> to set the binary explicitly.
          </p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="install corpus-mcp">
            <p className="text-concrete-500">
              # until a published build is available
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}PKG=corpus-mcp
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}SRC=$HOST/$PKG.git
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}git clone https://$SRC
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cd &quot;$PKG&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}pnpm install
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}pnpm build
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm link
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section id="source" className="scroll-mt-28">
        <Card
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="section-kicker section-kicker-brass">
              <Boxes className="h-4 w-4" aria-hidden="true" />
              <span>source</span>
            </div>
            <Heading className="mt-3">Read the adapter code</Heading>
            <p className="mt-2 max-w-2xl text-concrete-400">
              Source, issues, and tests live on GitHub.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <TextLink
              href="https://github.com/jcosta33/corpus-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit gap-2 text-base font-semibold"
            >
              GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TextLink>
            <TextLink
              href="/cli/"
              className="w-fit gap-2 text-base font-semibold"
            >
              See the CLI <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>
      </Section>
    </div>
  );
}
