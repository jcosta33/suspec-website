import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Cable,
  ClipboardList,
  Download,
  FileText,
  PenLine,
  ScrollText,
  Terminal,
  Wrench,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { ActionLink } from "../components/ActionLink";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";
import { TextLink } from "../components/TextLink";
import { PageHero } from "../components/PageHero";
import { HeroTrace } from "../components/HeroTrace";
import { JsonLd } from "../components/JsonLd";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { CopyButton } from "../components/CopyButton";
import { canonicalAlternates } from "../seo";
import { SKILLS_INSTALL_COMMAND } from "../productFacts";

const SITE_URL = "https://suspecframework.dev";
const getStartedDescription =
  "Install the skills globally; nothing lands in your repo. Add the optional CLI for deterministic checks or the optional MCP adapter for shell-less clients, then run one small change through the loop.";
const getStartedTitle = "Get started with Suspec — one install";

export const metadata: Metadata = {
  title: getStartedTitle,
  description: getStartedDescription,
  openGraph: {
    title: getStartedTitle,
    description: getStartedDescription,
    type: "website",
    url: "/get-started/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-get-started.png",
        width: 1200,
        height: 630,
        alt: "Get started with Suspec — one install, nothing lands in your repo",
      },
    ],
  },
  alternates: canonicalAlternates("/get-started/"),
};

const skillsInstallCommand = SKILLS_INSTALL_COMMAND;

const mcpInstallCommands = [
  "git clone https://github.com/jcosta33/suspec-mcp",
  "cd suspec-mcp",
  "corepack enable",
  "pnpm install --frozen-lockfile",
].join("\n");

const cliInstallCommands = [
  "git clone https://github.com/jcosta33/suspec-cli",
  "cd suspec-cli",
  "corepack enable",
  "pnpm install --frozen-lockfile",
  "pnpm link --global",
  "suspec check ./spec.md",
].join("\n");

const getStartedUrl = `${SITE_URL}/get-started/`;

function getStartedSectionUrl(href: string) {
  return `${getStartedUrl}${href}`;
}

function KitIcon({
  children,
  signal = "core",
}: {
  children: React.ReactNode;
  signal?: SignalRole;
}) {
  return (
    <div
      className={`kit-icon kit-icon-${signal} shadow-kit-bevel relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-panel border bg-panel-raised`}
    >
      <div
        className="brushed-metal absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </div>
  );
}

const loopSteps = [
  {
    name: "Intent",
    role: "name the work",
    text: "Start from the request, ticket, or idea. Preserve the wording only when it matters.",
    icon: PenLine,
  },
  {
    name: "Spec",
    role: "set the bar",
    text: "Write AC-NNN requirements, verification commands, and non-goals. Carry the full path forward.",
    icon: ScrollText,
  },
  {
    name: "Implement",
    role: "evidence in",
    text: "Run every verification command. Paste real output.",
    icon: Wrench,
  },
  {
    name: "Review",
    role: "independent eyes",
    text: "An independent reviewer checks the packet against the spec.",
    icon: ClipboardList,
  },
  {
    name: "Check",
    role: "optional facts",
    text: "Check shape, coverage, evidence, and references. Humans still decide.",
    icon: Terminal,
  },
  {
    name: "Findings",
    role: "what survives",
    text: "Promote lessons to memory, decisions to ADRs, defects to issues.",
    icon: BookOpen,
  },
];

function SpecPlacementNote({ className = "" }: { className?: string }) {
  return (
    <div className={`copy-section-support flex flex-col gap-4 ${className}`}>
      <PaperArtifact
        label="note"
        title="where the spec lives"
        meta="beside your native artifacts / by explicit path"
      >
        <p>
          Beside your harness&apos;s plans and notes. You choose the location;
          later steps use its full path.
        </p>
      </PaperArtifact>
      <p className="copy-section-note text-concrete-400">
        Setup notes:{" "}
        <TextLink
          href="/docs/ADOPTING/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read docs/ADOPTING.md (opens in new tab)"
        >
          docs/ADOPTING.md
        </TextLink>
      </p>
    </div>
  );
}

const setupPath = [
  {
    label: "Install",
    text: "Install the skills globally.",
    icon: Download,
    href: "#install",
    signal: "core",
  },
  {
    label: "CLI",
    text: "Optional deterministic checks.",
    icon: Terminal,
    href: "#cli",
    signal: "evidence",
  },
  {
    label: "MCP",
    text: "Optional shell-less checks.",
    icon: Cable,
    href: "#mcp",
    signal: "reference",
  },
  {
    label: "First change",
    text: "Run one small change.",
    icon: ClipboardList,
    href: "#first-change",
    signal: "core",
  },
  {
    label: "By hand",
    text: "No CLI required.",
    icon: PenLine,
    href: "#by-hand",
    signal: "reference",
  },
  {
    label: "Committed",
    text: "Nothing automatically.",
    icon: FileText,
    href: "#committed",
    signal: "muted",
  },
] as const satisfies Array<{
  label: string;
  text: string;
  icon: LucideIcon;
  href: string;
  signal: SignalRole;
}>;

const setupHeroTrace = [
  { label: "Install", signal: "core" },
  { label: "Check", signal: "evidence" },
  { label: "Loop", signal: "core" },
  { label: "Keep", signal: "reference" },
] as const satisfies Array<{
  label: string;
  signal: SignalRole;
}>;

const setupHowToSteps = [
  {
    name: "Install the skills",
    text: `Run ${skillsInstallCommand}. The skills implement the method and install outside the repo you are changing.`,
    href: "#install",
  },
  {
    name: "Optionally install the CLI",
    text: "Install suspec-cli from source (github.com/jcosta33/suspec-cli) for the deterministic checks: suspec check <path>, exit codes 0 clean, 1 warning, 2 blocking.",
    href: "#cli",
  },
  {
    name: "Optionally add MCP",
    text: "Build suspec-mcp from source for shell-less clients. It requires the Suspec CLI, exposes two tools, and relays facts without issuing a verdict.",
    href: "#mcp",
  },
  {
    name: "Run the loop once",
    text: "Author a spec beside your native artifacts and carry its full path, lint it, implement with pasted output, and have an independent reviewer check the review packet against the spec.",
    href: "#first-change",
  },
  {
    name: "Keep what mattered",
    text: "A durable lesson becomes a native harness memory, a decision becomes an ADR, a defect becomes an issue — and Suspec commits nothing to your repo.",
    href: "#committed",
  },
] as const;

export default function GetStartedPage() {
  const setupJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/get-started/#webpage`,
    name: "Get started with Suspec",
    url: getStartedUrl,
    description: getStartedDescription,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: [
      {
        "@type": "ItemList",
        name: "Suspec setup path",
        itemListElement: setupPath.map((step, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: step.label,
          url: getStartedSectionUrl(step.href),
          description: step.text,
        })),
      },
      {
        "@type": "HowTo",
        name: "Adopt Suspec",
        description: getStartedDescription,
        tool: [
          { "@type": "HowToTool", name: "suspec-skills" },
          { "@type": "HowToTool", name: "suspec-cli", description: "Optional" },
          {
            "@type": "HowToTool",
            name: "suspec-mcp",
            description: "Optional; for shell-less MCP clients",
          },
        ],
        supply: [
          { "@type": "HowToSupply", name: "A coding agent harness that loads skills" },
        ],
        step: setupHowToSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: getStartedSectionUrl(step.href),
        })),
      },
    ],
  };

  return (
    <div className="get-started-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="setup / one install"
          motif="setup"
          title="Get started"
          tone="core"
        >
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400 sm:text-xl">
            Install the skills. Add deterministic checks only if useful.
          </p>
          <HeroTrace
            ariaLabel="Suspec setup path trace"
            items={setupHeroTrace}
          />
        </PageHero>
      </Section>

      <Section register="01 / setup path" registerTone="core">
        <Panel brushed screws className="setup-route-panel p-0">
          <div className="setup-route-header">
            <div className="min-w-0">
              <p className="setup-route-kicker">setup route</p>
              <p className="setup-route-title">One install → the loop</p>
            </div>
            <div className="setup-route-meta" aria-label="Setup notes">
              <span>plain markdown</span>
              <span>optional cli</span>
              <span>optional mcp</span>
              <span>any agent</span>
            </div>
          </div>
          <div
            className="setup-command-strip"
            aria-label="Suspec skills install command"
          >
            <div className="setup-command-copy">
              <span className="setup-command-label">one install</span>
              <code>{skillsInstallCommand}</code>
            </div>
            <CopyButton
              text={skillsInstallCommand}
              label="Copy command"
              compactLabel="Copy"
              className="setup-command-button"
            />
          </div>
          <ol
            className="setup-path-strip process-strip process-strip-signal-muted grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            aria-label="Suspec setup steps"
          >
            {setupPath.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.label}
                  className={`${signalRoles[step.signal].processItem} bg-panel-raised/95`}
                >
                  <a
                    href={step.href}
                    className="focus-ring group block h-full p-5 transition-colors duration-150 hover:bg-panel/80 sm:p-6"
                    aria-label={`Jump to ${step.label.toLowerCase()} setup step: ${step.text}`}
                  >
                    <div className="flex items-center gap-3">
                      <KitIcon signal={step.signal}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </KitIcon>
                      <div className="min-w-0">
                        <p
                          className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[step.signal].text}`}
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}{" "}
                        </p>
                        <p className="setup-path-step-title font-heading text-lg font-semibold text-concrete-100">
                          {step.label}{" "}
                        </p>
                      </div>
                      <ArrowRight
                        className="motion-nudge-x ml-auto h-4 w-4 shrink-0 text-brass/70"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-concrete-400">
                      {step.text}
                    </p>
                  </a>
                </li>
              );
            })}
          </ol>
        </Panel>
      </Section>

      <Section
        id="install"
        register="02 / the install"
        registerTone="muted"
        className="reveal grid scroll-mt-28 gap-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <div className={`section-kicker ${signalRoles.muted.sectionKicker}`}>
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>one command, everywhere</span>
          </div>
          <Heading className="mt-3">Install the skills</Heading>
          <p className="mt-4 max-w-2xl leading-relaxed text-concrete-400">
            One command installs or updates the skills. Nothing lands in the
            repo.
          </p>
        </div>
        <Card
          signal="core"
          href="https://github.com/jcosta33/suspec-skills"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Browse the suspec-skills catalog on GitHub (opens in new tab)"
          screws
          className="setup-choice-card h-full"
          contentClassName="flex h-full flex-col gap-5"
        >
          <div className="setup-choice-head flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <KitIcon signal="core">
                <Download className="h-6 w-6" aria-hidden="true" />
              </KitIcon>
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles.core.text}`}
                >
                  universal / global install
                </p>
                <Heading
                  as="h3"
                  size="xl"
                  className="setup-choice-title mt-2"
                >
                  Universal skills
                </Heading>
              </div>
            </div>
            <span className="setup-choice-index">Tier 01</span>
          </div>
          <p className="text-concrete-400">
            User-level Markdown skills. Any repo, any capable harness.
          </p>
          <dl className="setup-choice-facts">
            <div>
              <dt>Installs</dt>
              <dd>Once, globally, for every repo.</dd>
            </div>
            <div>
              <dt>Lands in your repo</dt>
              <dd>Nothing.</dd>
            </div>
          </dl>
          <code className="setup-choice-command">{skillsInstallCommand}</code>
          <span className="setup-choice-action inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors">
            Browse the catalog{" "}
            <ArrowRight
              className="motion-nudge-x h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </Card>

        <Card
          signal="reference"
          href="/skills/"
          ariaLabel="Read about the skill tiers"
          screws
          className="setup-choice-card h-full"
          contentClassName="flex h-full flex-col gap-5"
        >
          <div className="setup-choice-head flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <KitIcon signal="reference">
                <ScrollText className="h-6 w-6" aria-hidden="true" />
              </KitIcon>
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles.reference.text}`}
                >
                  repo-specific / stays put
                </p>
                <Heading
                  as="h3"
                  size="xl"
                  className="setup-choice-title mt-2"
                >
                  Repo guides
                </Heading>
              </div>
            </div>
            <span className="setup-choice-index">Tier 02</span>
          </div>
          <p className="text-concrete-400">
            Your commands, your conventions — committed in the repo they
            describe, as they already are. The two tiers never overlap. Good.
          </p>
          <dl className="setup-choice-facts">
            <div>
              <dt>Owns</dt>
              <dd>Project-specific guidance only.</dd>
            </div>
            <div>
              <dt>From Suspec</dt>
              <dd>Nothing to copy in.</dd>
            </div>
          </dl>
          <code className="setup-choice-command">your repo, your rules</code>
          <span className="setup-choice-action inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors">
            See the skills{" "}
            <ArrowRight
              className="motion-nudge-x h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </Card>
      </Section>

      <Section
        id="cli"
        register="03 / cli option"
        registerTone="core"
        className="flex scroll-mt-28 flex-col gap-6"
      >
        <div className="section-kicker section-kicker-core">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>optional — the deterministic checks</span>
        </div>
        <Heading>The optional CLI</Heading>
        <p className="max-w-2xl text-concrete-400">
          <code className="text-suspec-yellow">suspec check &lt;path&gt;</code>{" "}
          reads exactly the files you hand it, reports facts, and never renders
          a review result. Exit codes are the API: 0 clean, 1 warning, 2
          blocking. It is not on npm yet — install it from source.
        </p>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={cliInstallCommands}>
            <p className="text-concrete-500">
              # install the CLI from source
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}git clone https://github.com/jcosta33/suspec-cli
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}cd suspec-cli
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}corepack enable
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}pnpm install --frozen-lockfile
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}pnpm link --global
            </p>
            <p className="mt-2 text-concrete-500">
              # then, on any artifact you name by path
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check ./spec.md{" "}
              <span className="text-concrete-500">
                # facts only; exit 0/1/2
              </span>
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          CLI details:{" "}
          <TextLink href="/cli/">the CLI page</TextLink>.
        </p>
      </Section>

      <Section
        id="mcp"
        register="04 / MCP option"
        registerTone="reference"
        className="flex scroll-mt-28 flex-col gap-6"
      >
        <div className="section-kicker section-kicker-reference">
          <Cable className="h-4 w-4" aria-hidden="true" />
          <span>optional — shell-less clients</span>
        </div>
        <Heading>The optional MCP adapter</Heading>
        <p className="max-w-2xl text-concrete-400">
          <code className="text-suspec-yellow">suspec-mcp</code> exposes the
          same check surface through two MCP tools for clients that cannot run
          shell commands directly. It still requires the Suspec CLI, returns
          facts rather than verdicts, and is installed from source for now.
        </p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(20rem,1.18fr)] lg:items-stretch">
          <Panel brushed className="p-2">
            <TerminalWindow
              title="terminal"
              ariaLabel="Install suspec-mcp from source"
              copyText={mcpInstallCommands}
            >
              <p className="text-concrete-500">
                # install from source; no published package yet
              </p>
              <p className="text-concrete-100">
                <span className="text-suspec-yellow">$</span>{" "}git clone https://github.com/jcosta33/suspec-mcp
              </p>
              <p className="text-concrete-100">
                <span className="text-suspec-yellow">$</span>{" "}cd suspec-mcp
              </p>
              <p className="text-concrete-100">
                <span className="text-suspec-yellow">$</span>{" "}corepack enable
              </p>
              <p className="text-concrete-100">
                <span className="text-suspec-yellow">$</span>{" "}pnpm install --frozen-lockfile
              </p>
            </TerminalWindow>
          </Panel>
          <Card
            signal="reference"
            screws
            className="h-full"
            contentClassName="flex h-full flex-col gap-5"
          >
            <div className="flex items-start gap-4">
              <KitIcon signal="reference">
                <Cable className="h-6 w-6" aria-hidden="true" />
              </KitIcon>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-signal-reference">
                  shell-less clients
                </p>
                <Heading as="h3" size="xl" className="mt-2">
                  Connect through MCP
                </Heading>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-concrete-400">
              <li>
                <span className="font-semibold text-concrete-100">Requires</span>{" "}
                the Suspec CLI on PATH, or an explicit <code>SUSPEC_BIN</code>.
              </li>
              <li>
                <span className="font-semibold text-concrete-100">Exposes</span>{" "}
                <code>suspec_check</code> and <code>suspec_get_checks</code>.
              </li>
              <li>
                <span className="font-semibold text-concrete-100">Returns</span>{" "}
                check facts under a fixed no-verdict envelope.
              </li>
            </ul>
            <TextLink href="/mcp/" className="mt-auto w-fit gap-2">
              Read the MCP page <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </Card>
        </div>
      </Section>

      <Section
        id="first-change"
        register="05 / first useful change"
        registerTone="reference"
        className="copy-section grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start"
      >
        <div className="copy-section-left">
          <div className="copy-section-heading">
            <Heading>First useful change</Heading>
            <p className="mt-4 leading-relaxed text-concrete-400">
              Start small and run the whole loop once. The loop is proportioned
              to feature-sized work — a trivial fix earns a one-line inline
              spec and no files at all; the{" "}
              <TextLink href="/docs/examples/bug-fix/">
                bug-fix example
              </TextLink>{" "}
              shows that shorter path. A hands-on walkthrough lives in{" "}
              <TextLink href="/docs/tutorial/README/">the tutorial</TextLink>.
            </p>
          </div>
          <SpecPlacementNote className="copy-section-support-desktop" />
        </div>

        <Card
          screws
          className="copy-section-manifest h-full"
          contentClassName="copy-section-manifest-body space-y-4 sm:space-y-5"
        >
          <div className="section-kicker section-kicker-reference">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            <span>the loop, once through</span>
          </div>
          <ul className="kit-ledger">
            {loopSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="kit-ledger-item">
                  <div className="kit-ledger-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <Icon className="kit-ledger-icon h-4 w-4" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="kit-ledger-title">{item.name}</h3>
                    <p className="kit-ledger-role">{item.role}</p>
                    <p className="kit-ledger-copy">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
        <SpecPlacementNote className="copy-section-support-mobile" />
      </Section>

      <Section
        id="by-hand"
        register="06 / by hand"
        registerTone="muted"
        className="flex scroll-mt-28 flex-col gap-6"
      >
        <div className={`section-kicker ${signalRoles.muted.sectionKicker}`}>
          <PenLine className="h-4 w-4" aria-hidden="true" />
          <span>no cli required</span>
        </div>
        <Heading>By hand — no CLI</Heading>
        <p className="max-w-2xl leading-relaxed text-concrete-400">
          Every step has a by-hand path; the CLI accelerates checking, nothing
          else.
        </p>
        <Panel brushed screws className="p-6 sm:p-8">
          <ol className="flex max-w-2xl flex-col gap-4 text-concrete-400">
            <li className="leading-relaxed">
              <span className="font-semibold text-concrete-100">
                Write the spec yourself
              </span>{" "}
              — the shape is documented in{" "}
              <TextLink href="/docs/reference/artifact-formats/">
                artifact formats
              </TextLink>
              : status, requirements with ids, a Verify with: line each. Place
              it beside your native artifacts, as above.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-concrete-100">
                Run each Verify with: command yourself
              </span>{" "}
              and paste the real output into the spec&apos;s Execution section.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-concrete-100">
                Review by checklist
              </span>{" "}
              — one coverage row per requirement; empty evidence is Unverified,
               never Supported; exceptions routed to a human. Without the CLI the
              floor is yours to hold.
            </li>
          </ol>
        </Panel>
      </Section>

      <Section
        id="committed"
        register="07 / what gets committed"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <div className="section-kicker section-kicker-reference">
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>what gets committed</span>
          </div>
          <Heading className="mt-3">Nothing, by Suspec&apos;s hand</Heading>
          <p className="mt-4 max-w-2xl leading-relaxed text-concrete-400">
            Your repo takes the code, the tests, and whatever your
            project&apos;s own governance already commits — ADRs, agent guides,
            the PRs themselves. Specs, task packets, and review packets stay
            beside your native artifacts, outside the repo, unless that
            governance says otherwise.
          </p>
        </div>
        <Card
          signal="reference"
          screws
          className="h-full md:col-span-2"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div className="flex items-start gap-4">
            <KitIcon signal="reference">
              <Wrench className="h-6 w-6" aria-hidden="true" />
            </KitIcon>
            <div>
              <Heading as="h3" size="xl">
                Skills
              </Heading>
              <p className="mt-2 text-concrete-400">
                The full catalog: methodology skills plus the universal
                disciplines they lean on. Pick the one that fits.
              </p>
            </div>
          </div>
          <ActionLink href="/skills/" className="mt-auto w-fit">
            Browse skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>

      </Section>
      <JsonLd data={setupJsonLd} />
    </div>
  );
}
