import type { Metadata } from "next";
import {
  ArrowRight,
  Braces,
  Bug,
  FileCheck,
  Link2,
  ListChecks,
  ScanEye,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Heading } from "../components/Heading";
import { Badge } from "../components/Badge";
import { PilotLamp } from "../components/PilotLamp";
import { TextLink } from "../components/TextLink";
import { PageNav } from "../components/PageNav";
import { JsonLd } from "../components/JsonLd";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { CopyButton } from "../components/CopyButton";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const CLI_REPOSITORY = "https://github.com/jcosta33/suspec-cli";
const CLI_PAGE_URL = `${SITE_URL}/cli/`;
const cliDescription =
  "suspec-cli is Suspec's honesty floor: a path-agnostic deterministic checker over the artifacts it is handed. Three invocations, --json on any, exit codes 0/1/2. Facts, never verdicts.";
const cliTitle = "suspec-cli — the honesty floor";

export const metadata: Metadata = {
  title: cliTitle,
  description: cliDescription,
  openGraph: {
    title: cliTitle,
    description: cliDescription,
    type: "website",
    url: "/cli/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-cli.png",
        width: 1200,
        height: 630,
        alt: "suspec-cli check surface reference",
      },
    ],
  },
  alternates: canonicalAlternates("/cli/"),
};

const cliInstallCommands = [
  "HOST=github.com/jcosta33",
  "PKG=suspec-cli",
  "SRC=$HOST/$PKG.git",
  "git clone https://$SRC",
  'cd "$PKG"',
  "npm install",
  "npm run build",
  "npm link",
  "suspec check --contract",
].join("\n");

const cliExampleCommands = [
  "suspec check ./spec.md",
  "suspec check ./review.md --spec ./spec.md --task ./task.md",
  "suspec check --contract --json",
].join("\n");

const commands = [
  {
    cmd: "check <artifact> [<artifact>...]",
    family: "Artifacts",
    what: "Lint specs and change plans by explicit path. Several at once is a batching convenience; the exit code is the max severity across files.",
    icon: ShieldCheck,
  },
  {
    cmd: "check <review> --spec <spec> [--task <task>]",
    family: "Review",
    what: "Reconcile a review packet against the spec it answers to — and the task packet, exactly when the review names one. Companions are explicit flags; nothing is discovered.",
    icon: ScanEye,
  },
  {
    cmd: "check --contract",
    family: "Contract",
    what: "Print the checks contract as JSON — the version plus every check's id, name, and severity. Contract 0.16.0 lives in the canon repo, at checks/checks.yaml.",
    icon: Braces,
  },
];

const honestyFloor = [
  {
    title: "Coverage",
    label: "C012",
    icon: ListChecks,
    text: "Every in-scope requirement has a coverage row in the review. Nothing gets dropped silently.",
    signal: "evidence",
  },
  {
    title: "Command match",
    label: "C013",
    icon: Terminal,
    text: "The recorded evidence ran the command the spec's Verify with: line named — not a friendlier one.",
    signal: "evidence",
  },
  {
    title: "Pass needs evidence",
    label: "C016",
    icon: ScanEye,
    text: "A Pass with an empty evidence cell is a structural contradiction. Blocking.",
    signal: "evidence",
  },
  {
    title: "Reference resolves",
    label: "C020",
    icon: Link2,
    text: "The review's task reference must resolve to the packet it is checked against. Blocking.",
    signal: "evidence",
  },
  {
    title: "Per-artifact lint",
    label: "lint",
    icon: FileCheck,
    text: "Specs, change plans, and review packets each get their own kind's lint — kind read from the artifact's own type: frontmatter.",
    signal: "reference",
  },
  {
    title: "Missing companion blocks",
    label: "exit 2",
    icon: ShieldAlert,
    text: "A review checked without a required --spec or --task is a blocking exit 2, naming the missing flag — never a silently shallower check.",
    signal: "change",
  },
] as const satisfies Array<{
  title: string;
  label: string;
  icon: typeof ListChecks;
  text: string;
  signal: SignalRole;
}>;

const boundaries = [
  {
    title: "No resolution",
    text: "It never finds files for you. Every path is given; nothing is discovered, listed, or inferred.",
  },
  {
    title: "No gate",
    text: "It reports facts and exit codes. What blocks a merge is the human's decision.",
  },
  {
    title: "No verdicts",
    text: "Pass, Fail, Unverified, and Blocked are written by the reviewer. The checker verifies their shape and their binding to evidence — nothing more.",
  },
  {
    title: "No execution",
    text: "It never runs your verify commands, your tests, or any agent. It checks that recorded evidence matches what the spec named — not that the commands pass.",
  },
  {
    title: "No writes",
    text: "The filesystem is read-only to it. Nothing scaffolded, nothing seeded, nothing managed.",
  },
] as const satisfies Array<{
  title: string;
  text: string;
}>;

const commandFamilies = [
  {
    label: "Artifacts",
    stripLabel: "Spec / change plan",
    id: "artifact-check",
    commands: "suspec check <artifact> [<artifact>...]",
    detail: "Per-artifact lint over specs and change plans, by explicit path.",
    icon: ShieldCheck,
    signal: "reference",
  },
  {
    label: "Review",
    stripLabel: "Review packet",
    id: "review-check",
    commands: "suspec check <review> --spec <spec> [--task <task>]",
    detail: "Reconcile a review packet's evidence against its companions.",
    icon: ScanEye,
    signal: "reference",
  },
  {
    label: "Contract",
    stripLabel: "Contract JSON",
    id: "contract-check",
    commands: "suspec check --contract",
    detail: "The checks contract itself, as JSON.",
    icon: Braces,
    signal: "reference",
  },
] as const;

const commandFamilyHrefByLabel = Object.fromEntries(
  commandFamilies.map((family) => [
    family.label,
    `/cli/#${family.id}` as `/cli/#${string}`,
  ]),
) as Record<string, `/cli/#${string}`>;

const cliCommandItems = commands.map((command) => ({
  name: `suspec ${command.cmd}`,
  description: `${command.what} Form: ${command.family}.`,
  url: commandFamilyHrefByLabel[command.family],
  category: `${command.family} invocation`,
}));

const cliPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${CLI_PAGE_URL}#webpage`,
  name: "suspec check invocation reference",
  url: CLI_PAGE_URL,
  description: cliDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${CLI_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec check invocations",
    itemListElement: cliCommandItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        url: `${SITE_URL}${item.url}`,
        genre: item.category,
      },
    })),
  },
};

const cliPageNav = [
  { label: "Surface", href: "#the-surface", signal: "reference" },
  { label: "Install", href: "#install", signal: "core" },
  { label: "Session", href: "#check-session", signal: "core" },
  { label: "Invocations", href: "#commands", signal: "reference" },
  { label: "Honesty floor", href: "#honesty-floor", signal: "evidence" },
  { label: "Source", href: "#source", signal: "reference" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

export default function CliPage() {
  return (
    <div className="repo-product-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="suspec-cli — optional reinforcement"
          className="page-hero-package-cli"
          motif="catalog"
          tone="reference"
          toneLabel="cli"
          titleLabel="suspec-cli"
          title={
            <>
              suspec<span className="product-name-suffix">-cli</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            The skills are the product; this is the honesty floor. A
            path-agnostic deterministic checker: it reads exactly the files it
            is handed, reports facts, and exits. Never a verdict.
          </p>
          <div className="hero-badge-row mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="draft">Optional — no step requires it</Badge>
            <Badge variant="draft">Exit codes are the API</Badge>
          </div>
        </PageHero>
      </Section>

      <PageNav
        items={cliPageNav}
        ariaLabel="suspec-cli page sections"
        wrapperClassName="mx-auto w-full max-w-7xl px-6 lg:px-8"
      />

      <Section
        id="the-surface"
        register="01 / the whole surface"
        registerTone="reference"
        className="scroll-mt-28 space-y-4"
      >
        <Panel brushed screws className="cli-surface-panel p-0">
          <div className="cli-surface-header">
            <h2>The whole surface</h2>
            <span>three invocations · --json on any</span>
          </div>
          <ol
            className="cli-command-rail package-process-strip package-process-strip-cli process-strip process-strip-signal-reference grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-3"
            aria-label="suspec check invocation forms"
          >
            {commandFamilies.map((family, index) => {
              const Icon = family.icon;
              return (
                <li
                  key={family.label}
                  className={`cli-command-step ${signalRoles[family.signal].processItem} bg-panel-raised/95`}
                >
                  <a
                    href={`#${family.id}`}
                    className="cli-command-link focus-ring group block h-full p-5 transition-colors duration-150 hover:bg-panel sm:p-6"
                    aria-label={`Jump to the ${family.label} invocation: ${family.commands}. ${family.detail}`}
                  >
                    <div className="cli-command-heading flex items-center gap-3">
                      <HexBadge
                        color={family.signal}
                        className="h-10 w-10 shrink-0"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <p
                          className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[family.signal].text}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="cli-command-title font-heading text-lg font-semibold text-concrete-100">
                          {family.stripLabel}
                        </h3>
                      </div>
                      <ArrowRight
                        className="text-signal-reference motion-nudge-x ml-auto h-4 w-4 shrink-0 opacity-70"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="cli-command-code mt-3 font-mono text-xs leading-relaxed text-signal-reference">
                      {family.commands}
                    </p>
                    <p className="cli-command-detail mt-2 text-sm leading-relaxed text-concrete-400">
                      {family.detail}
                    </p>
                  </a>
                </li>
              );
            })}
          </ol>
          <p className="p-5 text-sm leading-relaxed text-concrete-400 sm:p-6">
            There is no other command. No interactive mode, no dashboard, no
            scaffolds — the exit code is the API:{" "}
            <code className="text-suspec-yellow">0</code> clean ·{" "}
            <code className="text-suspec-yellow">1</code> warning ·{" "}
            <code className="text-suspec-yellow">2</code> blocking.
          </p>
        </Panel>
      </Section>

      <Section
        id="install"
        register="02 / install"
        registerTone="core"
        className="section-flow section-flow-tight scroll-mt-28"
      >
        <h2 className="sr-only">Install suspec-cli</h2>
        <div className="section-kicker section-kicker-core">
          <DroneIcon className="h-4 w-4" />
          <span>install — from source, not npm</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            ariaLabel="install"
            copyText={cliInstallCommands}
          >
            <p className="text-concrete-500">
              # not on npm — install from source
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}PKG=suspec-cli
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
              <span className="text-suspec-yellow">$</span>{" "}npm install
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm run build
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm link
            </p>
            <p className="mt-2 text-concrete-500">
              # sanity check — prints checks contract 0.16.0
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check
              --contract
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="check-session"
        register="03 / a check session"
        registerTone="core"
        className="section-flow section-flow-tight scroll-mt-28"
      >
        <h2 className="sr-only">A suspec check session, end to end</h2>
        <div className="section-kicker section-kicker-core">
          <DroneIcon className="h-4 w-4" />
          <span>session.sh — facts and exit codes</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            ariaLabel="example check session"
            copyText={cliExampleCommands}
          >
            <p className="text-concrete-500">
              # a spec, by explicit path — its own kind&apos;s lint
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check
              ./spec.md{" "}
              <span className="text-concrete-500"># exit 0 — clean</span>
            </p>
            <p className="mt-2 text-concrete-500">
              # a review packet, reconciled against its companions
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check
              ./review.md --spec ./spec.md --task ./task.md
            </p>
            <p className="text-concrete-100">
              C016 blocking — review.md: Pass on AC-003 with an empty evidence
              cell
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}echo $?{" "}
              <span className="text-concrete-500"># 2 — blocking</span>
            </p>
            <p className="mt-2 text-concrete-500">
              # a required companion missing is never a shallower check
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check
              ./review.md{" "}
              <span className="text-concrete-500">
                # blocking — a review requires --spec; exit 2
              </span>
            </p>
            <p className="mt-2 text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check
              --contract --json{" "}
              <span className="text-concrete-500">
                # the contract, for other tools
              </span>
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="commands"
        register="04 / invocation reference"
        registerTone="reference"
        className="cli-command-reference section-flow section-flow-tight scroll-mt-28"
      >
        <div className="cli-command-reference-intro max-w-5xl">
          <div className="section-kicker section-kicker-reference">
            <Bug className="h-4 w-4" aria-hidden="true" />
            <span>the surface, invocation by invocation</span>
          </div>
          <Heading className="mt-3">Invocations</Heading>
          <p className="mt-4 max-w-2xl text-concrete-400">
            The artifact&apos;s kind is read from its own{" "}
            <code className="text-suspec-yellow">type:</code> frontmatter,
            never from its filename or location. Every invocation takes{" "}
            <code className="text-suspec-yellow">--json</code> — the same
            facts, structured: check id, severity, message, location.
          </p>
          <ul className="cli-command-legend mt-6" aria-label="Invocation shortcuts">
            {commandFamilies.map((family) => (
              <li
                key={family.label}
                className={`cli-command-legend-item cli-command-legend-${family.signal}`}
              >
                <a
                  className="cli-command-legend-link focus-ring"
                  href={`#${family.id}`}
                  aria-label={`${family.label} invocation: ${family.detail}`}
                >
                  <span>{family.label}</span>
                  <span>{family.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Panel brushed screws className="cli-command-catalog p-0">
          <div className="cli-command-catalog-header">
            <span>invocation catalog</span>
            <span>the entire surface</span>
          </div>
          <div className="cli-command-catalog-body">
            {commandFamilies.map((family) => {
              const signal = family.signal;
              const familyCommands = commands.filter(
                (command) => command.family === family.label,
              );
              return (
                <section
                  key={family.label}
                  id={family.id}
                  className={`cli-command-section cli-command-section-${signal} scroll-mt-28`}
                  aria-labelledby={`${family.id}-heading`}
                >
                  <div className="cli-command-section-heading">
                    <div>
                      <p className={`font-mono text-xs font-semibold uppercase tracking-[0.12em] ${signalRoles[signal].text}`}>
                        {family.commands}
                      </p>
                      <h3
                        id={`${family.id}-heading`}
                        className="mt-1 font-heading text-xl font-semibold text-concrete-100"
                      >
                        {family.label}
                      </h3>
                    </div>
                    <span className="cli-command-family-tag">form</span>
                  </div>
                  <ul className="cli-command-list">
                    {familyCommands.map((c) => {
                      const Icon = c.icon;
                      return (
                        <li key={c.cmd} className="min-w-0">
                          <div
                            className={`cli-command-row catalog-row catalog-row-${signal} group`}
                          >
                            <div className="flex min-w-0 items-start gap-4">
                              <HexBadge
                                color={signal}
                                className="catalog-row-badge cli-command-row-badge"
                              >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </HexBadge>
                              <div className="min-w-0">
                                <h4 className={`catalog-row-title font-mono text-[13px] leading-snug font-semibold break-words sm:text-sm ${signalRoles[signal].text}`}>
                                  suspec {c.cmd}
                                </h4>
                                <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
                                  {c.what}
                                </p>
                              </div>
                            </div>
                            <div className="cli-command-row-actions">
                              <CopyButton
                                text={`suspec ${c.cmd}`}
                                label="Copy"
                                compactLabel="Copy"
                                ariaLabel={`Copy suspec ${c.cmd} invocation`}
                                className="cli-command-copy"
                              />
                              <PilotLamp
                                color={signal}
                                className="cli-command-row-lamp"
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </Panel>
      </Section>

      <Section
        id="honesty-floor"
        register="05 / the honesty floor"
        registerTone="muted"
        className="section-flow scroll-mt-28"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-muted">
            <DroneIcon className="h-4 w-4" />
            <span>floor.md — why a checker?</span>
          </div>
          <Heading className="mt-3">
            Facts a reviewer cannot fake
          </Heading>
          <p className="mt-4 text-concrete-400">
            What the checker earns its keep on: the facts a lazy or dishonest
            reviewer cannot fake, at zero model cost.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {honestyFloor.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.title}>
                <Card
                  screws
                  className={`group h-full border-panel-border ${signalRoles[p.signal].hoverBorder}`}
                >
                    <div className={`catalog-row catalog-row-${p.signal}`}>
                      <HexBadge
                        color={p.signal}
                        className="catalog-row-badge mb-4"
                      >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <p
                      className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[p.signal].text}`}
                    >
                      {p.label}
                    </p>
                    <h3 className="catalog-row-title mt-1 font-heading text-sm font-semibold uppercase tracking-wide text-concrete-100">
                      {p.title}
                    </h3>
                    <p className="catalog-row-copy mt-2 text-sm leading-relaxed text-concrete-400">
                      {p.text}
                    </p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
        <Card screws className="border-panel-border">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-concrete-100">
            What it does not do
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boundaries.map((b) => (
              <li key={b.title}>
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles.muted.text}`}
                >
                  {b.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                  {b.text}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section
        id="source"
        register="06 / source"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-2"
      >
        <Card
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div>
            <Heading>Don&apos;t need the CLI at all?</Heading>
            <p className="mt-2 text-concrete-400">
              Correct — no step requires it. The skills are the product:
              install them, work the loop by hand, and add the checker when
              you want the floor held for free.
            </p>
            <p className="mt-4 font-mono text-sm text-suspec-yellow">
              npx skills add jcosta33/suspec-skills -g
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <TextLink
              href="/skills/"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              Meet the skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
            <TextLink
              href="/get-started/"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>

        <Card
          screws
          className="h-full border-panel-border"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div>
            <Heading>Reference repository</Heading>
            <p className="mt-4 text-concrete-400">
              Source, issues, and install notes live on GitHub. The checks
              contract itself lives in the canon repo:{" "}
              <TextLink
                href="/docs/reference/checks/"
                target="_blank"
                rel="noopener noreferrer"
              >
                checks/checks.yaml
                <span className="sr-only"> (opens in new tab)</span>
              </TextLink>
              .
            </p>
          </div>
          <div className="mt-auto space-y-4">
            <p>
              <TextLink
                href="https://github.com/jcosta33/suspec-cli"
                target="_blank"
                rel="noopener noreferrer"
                touchTarget
                aria-label="Open suspec-cli on GitHub (opens in new tab)"
              >
                Open suspec-cli on GitHub →
              </TextLink>
            </p>
            <p className="text-concrete-400">
              Running shell-less?{" "}
              <TextLink href="/mcp/">
                suspec-mcp carries the same check surface over MCP
              </TextLink>
            </p>
          </div>
        </Card>
      </Section>
      <JsonLd data={cliPageJsonLd} />
      <PackageJsonLd
        name="suspec-cli"
        description={cliDescription}
        path="/cli/"
        repository={CLI_REPOSITORY}
        keywords={[
          "deterministic checker",
          "honesty floor",
          "artifact checks",
          "exit codes",
          "JSON output",
        ]}
        catalogItems={cliCommandItems}
      />
    </div>
  );
}
