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
import { PageNav } from "../components/PageNav";
import { JsonLd } from "../components/JsonLd";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const MCP_REPOSITORY = "https://github.com/jcosta33/suspec-mcp";
const MCP_PAGE_URL = `${SITE_URL}/mcp/`;
const mcpDescription =
  "suspec-mcp is a local stdio MCP adapter that exposes Suspec workspace status, checks, artifacts, and review data without writing verdicts.";
const mcpTitle = "suspec-mcp — local MCP adapter for Suspec";

export const metadata: Metadata = {
  title: mcpTitle,
  description: mcpDescription,
  openGraph: {
    title: mcpTitle,
    description: mcpDescription,
    type: "website",
    url: "/mcp/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-mcp.png",
        width: 1200,
        height: 630,
        alt: "suspec-mcp — a verdict-free MCP bridge for Suspec workspaces",
      },
    ],
  },
  alternates: canonicalAlternates("/mcp/"),
};

const mcpConfigSnippet = `{
  "mcpServers": {
    "suspec": {
      "command": "suspec-mcp",
      "args": ["--workspace", "/path/to/workspace"]
    }
  }
}`;

const mcpInstallCommands = [
  "HOST=github.com/jcosta33",
  "PKG=suspec-mcp",
  "SRC=$HOST/$PKG.git",
  "git clone https://$SRC",
  'cd "$PKG"',
  "pnpm install",
  "pnpm build",
  "npm link",
].join("\n");

const guardrails = [
  {
    title: "No board, no result",
    text: "It writes no board and no review result. Safe-write tools only scaffold fresh artifacts.",
    stamp: "scope",
    icon: ShieldCheck,
    signal: "reference",
  },
  {
    title: "No verdict",
    text: "It reports facts. Review owns Pass, Fail, Unverified, or Blocked.",
    stamp: "defer",
    icon: MessagesSquare,
    signal: "muted",
  },
  {
    title: "Root-confined",
    text: "Paths stay inside the configured workspace root.",
    stamp: "bound",
    icon: FolderLock,
    signal: "muted",
  },
  {
    title: "CLI contract only",
    text: "It calls the CLI JSON surface.",
    stamp: "json",
    icon: Braces,
    signal: "reference",
  },
] as const satisfies Array<{
  title: string;
  text: string;
  stamp: string;
  icon: typeof ShieldCheck;
  signal: SignalRole;
}>;

const tools = [
  {
    group: "read",
    signal: "reference",
    items: [
      "suspec_get_status",
      "suspec_list",
      "suspec_check_workspace",
      "suspec_check_file",
      "suspec_get_task",
      "suspec_get_spec",
      "suspec_get_review",
      "suspec_get_checks",
    ],
  },
  {
    group: "reconcile",
    signal: "evidence",
    items: ["suspec_reconcile"],
  },
  {
    group: "safe-write",
    signal: "evidence",
    items: [
      "suspec_scaffold_spec",
      "suspec_split_task",
      "suspec_scaffold_finding",
    ],
  },
] as const satisfies Array<{
  group: string;
  signal: SignalRole;
  items: readonly string[];
}>;

const toolDescriptions = {
  suspec_get_status: "Reads the current Suspec workspace status.",
  suspec_list: "Lists Suspec workspace artifacts.",
  suspec_check_workspace: "Reports workspace-level configuration and integrity checks.",
  suspec_check_file: "Checks one Suspec artifact file.",
  suspec_get_task: "Reads one task packet.",
  suspec_get_spec: "Reads one spec artifact.",
  suspec_get_review: "Reads one review packet.",
  suspec_get_checks: "Reads the applicable check set.",
  suspec_reconcile: "Compares records and reports workspace gaps.",
  suspec_scaffold_spec: "Scaffolds a fresh spec artifact without issuing a verdict.",
  suspec_split_task: "Scaffolds task packets from a spec without deciding correctness.",
  suspec_scaffold_finding: "Scaffolds a fresh finding artifact without issuing a verdict.",
} as const;

const mcpToolCatalogItems = tools.flatMap((group) =>
  group.items.map((tool) => ({
    name: tool,
    description: toolDescriptions[tool],
    url: `${MCP_PAGE_URL}#mcp-tools`,
    category: `${group.group} MCP tool`,
  })),
);

const mcpPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${MCP_PAGE_URL}#webpage`,
  name: "suspec-mcp adapter reference",
  url: MCP_PAGE_URL,
  description: mcpDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${MCP_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec-mcp MCP tools",
    itemListElement: mcpToolCatalogItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        url: item.url,
        genre: item.category,
      },
    })),
  },
};

const resources = [
  "suspec://workspace",
  "suspec://status",
  "suspec://checks",
  "suspec://tasks/{id}",
  "suspec://specs/{id}",
  "suspec://reviews/{id}",
  "suspec://findings/{id}",
];

const prompts = [
  "suspec_task_briefing",
  "suspec_before_done",
  "suspec_review_assistant",
  "suspec_evidence_rule",
  "suspec_finding_candidate",
];

const bridgeFlow = [
  {
    label: "Client",
    channel: "host",
    detail: "Claude Desktop, Cursor, or another MCP host.",
    icon: MessagesSquare,
    href: "#mcp-config",
    signal: "reference",
  },
  {
    label: "stdio",
    channel: "pipe",
    detail: "A local process pipe, not a hosted service.",
    icon: Cable,
    href: "#install",
    signal: "reference",
  },
  {
    label: "suspec-mcp",
    channel: "adapter",
    detail: "Verdict-free adapter around the workspace.",
    icon: Boxes,
    href: "#guardrails",
    signal: "reference",
  },
  {
    label: "CLI JSON",
    channel: "json",
    detail: "Commands return structured facts.",
    icon: Terminal,
    href: "#mcp-tools",
    signal: "reference",
  },
  {
    label: "Workspace",
    channel: "records",
    detail: "Markdown artifacts stay the source of truth.",
    icon: FileJson,
    href: "#source",
    signal: "reference",
  },
] as const;

const bridgeContracts = [
  {
    label: "Host",
    value: "An MCP-capable client asks for workspace context.",
    signal: "reference",
  },
  {
    label: "Adapter",
    value: "suspec-mcp calls the public CLI JSON surface.",
    signal: "core",
  },
  {
    label: "Records",
    value: "Markdown artifacts stay the source of truth.",
    signal: "muted",
  },
] as const satisfies Array<{
  label: string;
  value: string;
  signal: SignalRole;
}>;

const mcpPageNav = [
  { label: "Bridge", href: "#bridge", signal: "muted" },
  { label: "Config", href: "#mcp-config", signal: "reference" },
  { label: "Limits", href: "#guardrails", signal: "muted" },
  { label: "Tools", href: "#mcp-tools", signal: "evidence" },
  { label: "Install", href: "#install", signal: "core" },
  { label: "Source", href: "#source", signal: "reference" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

export default function McpPage() {
  return (
    <div className="repo-product-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <JsonLd data={mcpPageJsonLd} />
      <PackageJsonLd
        name="suspec-mcp"
        description={mcpDescription}
        path="/mcp/"
        repository={MCP_REPOSITORY}
        keywords={[
          "MCP server",
          "stdio adapter",
          "workspace facts",
          "review data",
          "no verdict",
        ]}
        catalogItems={mcpToolCatalogItems}
      />
      <Section className="ambient-header">
        <PageHero
          eyebrow="mcp server / verdict-free adapter"
          className="page-hero-package-mcp"
          motif="bridge"
          tone="reference"
          toneLabel="mcp"
          title={
            <>
              suspec<span className="product-name-suffix">-mcp</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Local stdio access to Suspec status, checks, artifacts, and review
            data. It exposes records; it does not decide correctness.
          </p>
          <div className="hero-badge-row mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="ready">v0.2 surface</Badge>
            <Badge variant="draft">no board</Badge>
            <Badge signal="muted">no verdict</Badge>
          </div>
        </PageHero>
      </Section>

      <PageNav
        items={mcpPageNav}
        ariaLabel="suspec-mcp page sections"
        wrapperClassName="mx-auto w-full max-w-7xl px-6 lg:px-8"
      />

      <Section
        id="bridge"
        register="01 / bridge"
        registerTone="reference"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro max-w-3xl">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <Cable className="h-4 w-4" aria-hidden="true" />
            <span>local bridge</span>
          </div>
          <Heading>Client asks, records answer</Heading>
          <p className="text-concrete-400">
            suspec-mcp is a local stdio bridge. It adapts the CLI&apos;s{" "}
            <code>--json</code> contract for MCP clients; it does not become a
            hosted service or a review authority.
          </p>
          <p className="text-sm text-concrete-400">
            Source:{" "}
            <TextLink
              href="/docs/10-integrations/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the integrations documentation (opens in new tab)"
            >
              docs/10-integrations.md
            </TextLink>
          </p>
        </div>
        <Panel brushed screws className="mcp-adapter-panel p-0">
          <div className="mcp-adapter-header">
            <p>client request</p>
            <span>local stdio</span>
            <dl className="mcp-adapter-contracts">
              {bridgeContracts.map((item) => (
                <div
                  key={item.label}
                  className={`mcp-adapter-contract mcp-adapter-contract-${item.signal}`}
                >
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ol
            className="mcp-adapter-rail package-process-strip package-process-strip-mcp process-strip process-strip-signal-reference grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-5"
            aria-label="suspec-mcp request path"
          >
            {bridgeFlow.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className={`mcp-adapter-step ${signalRoles[item.signal].processItem} relative bg-panel-raised/95`}
                >
                  <a
                    href={item.href}
                    className="mcp-adapter-step-link focus-ring group block h-full p-5 transition-colors duration-150 hover:bg-panel sm:p-6"
                    aria-label={`Jump to ${item.label} step (${item.channel}): ${item.detail}`}
                  >
                    <div className="mcp-adapter-heading flex items-center gap-3">
                      <HexBadge color={item.signal} className="h-10 w-10 shrink-0">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <p
                          className={`mcp-adapter-meta font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[item.signal].text}`}
                        >
                          {String(index + 1).padStart(2, "0")} / {item.channel}
                        </p>
                        <span className="mcp-adapter-title block font-heading text-lg font-semibold text-concrete-100">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight
                        className="motion-nudge-x ml-auto h-4 w-4 shrink-0 text-brass/70 lg:hidden"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mcp-adapter-detail mt-3 text-sm leading-relaxed text-concrete-400">
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
        register="02 / config"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <Panel brushed className="p-2">
          <TerminalWindow
            title="mcp.json"
            ariaLabel="suspec-mcp config"
            copyText={mcpConfigSnippet}
          >
            <p className="text-concrete-500">
              {"// Claude Desktop / Cursor MCP config"}
            </p>
            <p>{"{"}</p>
            <p className="pl-4">&quot;mcpServers&quot;: {"{"}</p>
            <p className="pl-8">&quot;suspec&quot;: {"{"}</p>
            <p className="pl-12">
              &quot;command&quot;: &quot;suspec-mcp&quot;,
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
            suspec-mcp adapts the CLI&apos;s public{" "}
            <span className="font-semibold">--json</span> contract. The SDK
            lives here so suspec-cli can stay small.
          </p>
        </PaperArtifact>
      </Section>

      <Section
        id="guardrails"
        register="03 / limits"
        registerTone="muted"
        className="section-flow scroll-mt-28"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.muted.sectionKicker}`}>
            <DroneIcon className="h-4 w-4" />
            <span>guardrails.ts</span>
          </div>
          <Heading className="mt-3">What it does not do</Heading>
          <p className="mt-4 text-concrete-400">
            It does not run an agent loop, write a board or a review result, or
            decide whether code is done. Safe-write tools only scaffold fresh
            artifacts; they issue no verdict.
          </p>
        </div>
        <ul className="mcp-guardrail-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guardrails.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card
                  signal={item.signal}
                  screws
                  className={`mcp-guardrail-card mcp-guardrail-card-${item.signal} h-full border-panel-border ${signalRoles[item.signal].hoverBorder}`}
                  contentClassName="flex h-full flex-col"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <HexBadge color={item.signal}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <span className="mcp-guardrail-stamp">{item.stamp}</span>
                  </div>
                  <h3 className="mcp-guardrail-title">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                    {item.text}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        id="mcp-tools"
        register="04 / tools"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-2"
      >
        <Card signal="reference" screws className="mcp-fact-card border-panel-border">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <Cable className="h-4 w-4" aria-hidden="true" />
            <span>tools</span>
          </div>
          <Heading className="mt-3">MCP tools</Heading>
          <p className="mt-4 text-concrete-400">
            Read and reconcile calls, plus a verdict-free safe-write tier that
            scaffolds fresh artifacts. Each maps to a CLI JSON command.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tools.map((group) => (
              <div
                key={group.group}
                className={`mcp-fact-list tool-list-card tool-list-card-${group.signal} rounded-panel border bg-panel p-4 ${
                  group.group === "read" ? "sm:row-span-2" : ""
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-wide ${signalRoles[group.signal].text}`}
                >
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

        <Card signal="reference" screws className="mcp-fact-card border-panel-border">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <FileJson className="h-4 w-4" aria-hidden="true" />
            <span>resources + prompts</span>
          </div>
          <Heading className="mt-3">Context the client can ask for</Heading>
          <p className="mt-4 text-concrete-400">
            Resources expose the board, checks, and selected artifacts. Prompts
            give clients a Suspec-shaped starting point.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="mcp-fact-list tool-list-card tool-list-card-reference rounded-panel border bg-panel p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-signal-reference">
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
            <div className="mcp-fact-list tool-list-card tool-list-card-core rounded-panel border bg-panel p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-signal-core">
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
        register="05 / install"
        registerTone="core"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="mcp-install-brief">
          <div className={`section-kicker ${signalRoles.core.sectionKicker}`}>
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>install.sh</span>
          </div>
          <Heading className="mt-3">Install from source for now</Heading>
          <p className="mt-4 text-concrete-400">
            The package exposes a <code>suspec-mcp</code> binary. It expects the{" "}
            <TextLink
              href="/cli/"
            >
              Suspec CLI
            </TextLink>{" "}
            on PATH. Use <code>SUSPEC_BIN</code> or{" "}
            <code>--suspec-bin</code> to set the binary explicitly.
          </p>
          <dl className="mcp-install-ledger mt-6">
            <div>
              <dt>Binary</dt>
              <dd>suspec-mcp</dd>
            </div>
            <div>
              <dt>Requires</dt>
              <dd>suspec CLI</dd>
            </div>
            <div>
              <dt>Override</dt>
              <dd>SUSPEC_BIN</dd>
            </div>
          </dl>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            ariaLabel="install suspec-mcp"
            copyText={mcpInstallCommands}
          >
            <p className="text-concrete-500">
              # until a published build is available
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}PKG=suspec-mcp
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}SRC=$HOST/$PKG.git
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}git clone https://$SRC
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}cd &quot;$PKG&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}pnpm install
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}pnpm build
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm link
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="source"
        register="06 / source"
        registerTone="reference"
        className="scroll-mt-28"
      >
        <Card
          signal="reference"
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
              <Boxes className="h-4 w-4" aria-hidden="true" />
              <span>source</span>
            </div>
            <Heading className="mt-3">Read the adapter code</Heading>
            <p className="mt-2 max-w-2xl text-concrete-400">
              Source, issues, and tests live on GitHub. The integration notes
              explain where MCP fits in the Suspec workflow.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <TextLink
              href="https://github.com/jcosta33/suspec-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TextLink>
            <TextLink
              href="/cli/"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              See the CLI <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
            <TextLink
              href="/docs/10-integrations/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the integration notes docs (opens in new tab)"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              Integration notes{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>
      </Section>
    </div>
  );
}
