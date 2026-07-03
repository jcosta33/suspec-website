import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  FolderPlus,
  FolderTree,
  LayoutTemplate,
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
import { PilotLamp } from "../components/PilotLamp";
import { SignalKey } from "../components/SignalKey";
import { CopyButton } from "../components/CopyButton";
import { JsonLd } from "../components/JsonLd";
import {
  setupPathSignalKey,
  signalRoles,
  type SignalRole,
} from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const getStartedDescription =
  "Set up Suspec with the starter kit, adopt it in an existing repo, and add the optional CLI only when you need scaffolding or checks.";
const getStartedTitle = "Get started with Suspec — starter kit and CLI";

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
        alt: "Get started with Suspec — a new repo or an existing project",
      },
    ],
  },
  alternates: canonicalAlternates("/get-started/"),
};

const cliInitCommands = [
  "HOST=github.com/jcosta33",
  "PKG=suspec-cli",
  "SRC=$HOST/$PKG.git",
  "git clone https://$SRC",
  'cd "$PKG"',
  "npm install",
  "npm run build",
  "npm link",
  "suspec init",
  "suspec check",
].join("\n");

const manualCopyCommand = "cp -R path/to/suspec-starter-kit/. <project>-works/";
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
      className={`kit-icon kit-icon-${signal} relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-panel border bg-panel-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.45)]`}
    >
      <div
        className="brushed-metal absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </div>
  );
}

const kitContents = [
  {
    name: "AGENTS.md",
    role: "local contract",
    text: "The file your agent reads before work starts.",
    icon: ScrollText,
  },
  {
    name: "Core guides",
    role: "working method",
    text: "Write specs, run tasks, review output, save findings.",
    icon: BookOpen,
  },
  {
    name: "Templates",
    role: "record shapes",
    text: "Intake, spec, task, review, finding, status, inventory, change plan, ADR.",
    icon: LayoutTemplate,
  },
  {
    name: "Flow folders",
    role: "workspace map",
    text: "Specs, tasks, reviews, findings, and related folders.",
    icon: FolderTree,
  },
  {
    name: "status.md",
    role: "active board",
    text: "A small workboard for active items.",
    icon: ClipboardList,
  },
  {
    name: "decisions/",
    role: "local ADRs",
    text: "Decision records for choices that should survive chat.",
    icon: FileText,
  },
];

function StarterKitContentsNote({ className = "" }: { className?: string }) {
  return (
    <div className={`copy-section-support flex flex-col gap-4 ${className}`}>
      <PaperArtifact
        label="note"
        title="starter kit contents"
        meta="workspace / committed artifacts"
      >
        <p>
          Local rules, record templates, flow folders, and the board. Copy once;
          keep the edits in repo.
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
    label: "New repo",
    text: "Use the starter kit template.",
    icon: FolderPlus,
    href: "#choose",
    signal: "greenfield",
  },
  {
    label: "Existing project",
    text: "Add Suspec beside existing code.",
    icon: FolderTree,
    href: "#choose",
    signal: "brownfield",
  },
  {
    label: "Copy",
    text: "Commit rules, templates, and board.",
    icon: LayoutTemplate,
    href: "#copy",
    signal: "core",
  },
  {
    label: "Check",
    text: "Run CLI checks for review or CI.",
    icon: Terminal,
    href: "#check",
    signal: "core",
  },
  {
    label: "Work",
    text: "Keep specs, reviews, and evidence.",
    icon: ClipboardList,
    href: "#work",
    signal: "core",
  },
] as const satisfies Array<{
  label: string;
  text: string;
  icon: LucideIcon;
  href: string;
  signal: SignalRole;
}>;

const setupHeroTrace = [
  { label: "Choose", signal: "reference" },
  { label: "Copy", signal: "core" },
  { label: "Check", signal: "core" },
  { label: "Work", signal: "reference" },
] as const satisfies Array<{
  label: string;
  signal: SignalRole;
}>;

const setupHowToSteps = [
  {
    name: "Choose a setup path",
    text: "Use the starter kit for a new repo, or add Suspec beside an existing codebase.",
    href: "#choose",
  },
  {
    name: "Copy local workspace files",
    text: `Copy the starter kit into the workspace with ${manualCopyCommand}.`,
    href: "#copy",
  },
  {
    name: "Run optional CLI checks",
    text: "Install suspec-cli from source when you want scaffolding or local checks, then run suspec init and suspec check.",
    href: "#check",
  },
  {
    name: "Add task-specific guides",
    text: "Start with the starter kit, then add Suspec skills or agents only when the next change needs them.",
    href: "#work",
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
        name: "Set up a Suspec workspace",
        description: getStartedDescription,
        tool: [
          { "@type": "HowToTool", name: "suspec-starter-kit" },
          { "@type": "HowToTool", name: "suspec-cli", description: "Optional" },
        ],
        supply: [
          { "@type": "HowToSupply", name: "A new or existing Git repository" },
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
          eyebrow="setup / first workspace"
          motif="setup"
          title="Get started"
          tone="core"
        >
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400 sm:text-xl">
            Start with the starter kit. Add the CLI only when you want
            scaffolding or a check.
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
              <p className="setup-route-title">Starter kit → local records</p>
            </div>
            <div className="setup-route-meta" aria-label="Setup notes">
              <span>plain files</span>
              <span>optional cli</span>
              <span>local rules</span>
            </div>
          </div>
          <div
            className="setup-command-strip"
            aria-label="Manual starter kit copy command"
          >
            <div className="setup-command-copy">
              <span className="setup-command-label">manual copy</span>
              <code>{manualCopyCommand}</code>
            </div>
            <CopyButton
              text={manualCopyCommand}
              label="Copy command"
              compactLabel="Copy"
              className="setup-command-button"
            />
          </div>
          <ol
            className="setup-path-strip process-strip process-strip-signal-muted grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-5"
            aria-label="Suspec setup paths and next steps"
          >
            {setupPath.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.label}
                  className={`${signalRoles[step.signal].processItem} bg-panel-raised/95 sm:last:col-span-2 lg:last:col-span-1`}
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
        id="choose"
        register="02 / new or existing"
        registerTone="muted"
        className="reveal grid scroll-mt-28 gap-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <div className={`section-kicker ${signalRoles.muted.sectionKicker}`}>
            <FolderTree className="h-4 w-4" aria-hidden="true" />
            <span>choose a path</span>
          </div>
          <Heading className="mt-3">Pick a setup path</Heading>
          <p className="mt-4 max-w-2xl leading-relaxed text-concrete-400">
            Greenfield is for a new workspace. Brownfield is for a repo that
            already has history.
          </p>
          <SignalKey
            ariaLabel="Setup path color roles"
            items={setupPathSignalKey}
            className="setup-choice-signal-key"
          />
        </div>
        <Card
          signal="greenfield"
          href="https://github.com/jcosta33/suspec-starter-kit"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Use the starter kit on GitHub (opens in new tab)"
          screws
          className="setup-choice-card setup-choice-card-greenfield h-full"
          contentClassName="flex h-full flex-col gap-5"
        >
          <div className="setup-choice-head flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <KitIcon signal="greenfield">
                <FolderPlus className="h-6 w-6" aria-hidden="true" />
              </KitIcon>
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles.greenfield.text}`}
                >
                  greenfield / starter kit
                </p>
                <Heading
                  as="h3"
                  size="xl"
                  className="setup-choice-title mt-2"
                >
                  New repo
                </Heading>
              </div>
            </div>
            <span className="setup-choice-index">
              <PilotLamp color="greenfield" className="scale-75" />
              Path 01
            </span>
          </div>
          <p className="text-concrete-400">
            Template repo with flow folders, templates, and guides already in
            place.
          </p>
          <dl className="setup-choice-facts">
            <div>
              <dt>Best for</dt>
              <dd>Greenfield workspace.</dd>
            </div>
            <div>
              <dt>Creates</dt>
              <dd>Templates, local rules, and a board.</dd>
            </div>
          </dl>
          <code className="setup-choice-command">GitHub template</code>
          <span className="setup-choice-action inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors">
            Use the starter kit{" "}
            <ArrowRight
              className="motion-nudge-x h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </Card>

        <Card
          signal="brownfield"
          href="/docs/ADOPTING/"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Read the adopting guide (opens in new tab)"
          screws
          className="setup-choice-card setup-choice-card-brownfield h-full"
          contentClassName="flex h-full flex-col gap-5"
        >
          <div className="setup-choice-head flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <KitIcon signal="brownfield">
                <FolderTree className="h-6 w-6" aria-hidden="true" />
              </KitIcon>
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles.brownfield.text}`}
                >
                  brownfield / adoption
                </p>
                <Heading
                  as="h3"
                  size="xl"
                  className="setup-choice-title mt-2"
                >
                  Existing project
                </Heading>
              </div>
            </div>
            <span className="setup-choice-index">
              <PilotLamp color="brownfield" className="scale-75" />
              Path 02
            </span>
          </div>
          <p className="text-concrete-400">
            Keep the app structure; add only the Suspec workspace files.
          </p>
          <dl className="setup-choice-facts">
            <div>
              <dt>Best for</dt>
              <dd>Brownfield adoption.</dd>
            </div>
            <div>
              <dt>Adds</dt>
              <dd>Suspec records beside the code.</dd>
            </div>
          </dl>
          <code className="setup-choice-command">{manualCopyCommand}</code>
          <span className="setup-choice-action inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors">
            Read the adopting guide{" "}
            <ArrowRight
              className="motion-nudge-x h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </Card>
      </Section>

      <Section
        id="copy"
        register="03 / kit contents"
        registerTone="reference"
        className="copy-section grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start"
      >
        <div className="copy-section-left">
          <div className="copy-section-heading">
            <Heading>Starter kit contents</Heading>
          </div>
          <StarterKitContentsNote className="copy-section-support-desktop" />
        </div>

        <Card
          screws
          className="copy-section-manifest h-full"
          contentClassName="copy-section-manifest-body space-y-4 sm:space-y-5"
        >
          <div className="section-kicker section-kicker-reference">
            <FolderTree className="h-4 w-4" aria-hidden="true" />
            <span>manifest — copied files</span>
          </div>
          <ul className="kit-ledger">
            {kitContents.map((item, index) => {
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
        <StarterKitContentsNote className="copy-section-support-mobile" />
      </Section>

      <Section
        id="check"
        register="04 / cli option"
        registerTone="core"
        className="flex scroll-mt-28 flex-col gap-6"
      >
        <div className="section-kicker section-kicker-core">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>or scaffold it with the cli</span>
        </div>
        <Heading>Command-line setup</Heading>
        <p className="max-w-2xl text-concrete-400">
          <code className="text-suspec-yellow">suspec init</code> scaffolds the
          same workspace into a new or existing repo. It refuses to overwrite
          existing files. Install it from source for now.
        </p>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={cliInitCommands}>
            <p className="text-concrete-500">
              # install the CLI from source
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
              # then, in a new or existing repo
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec init{" "}
              <span className="text-concrete-500">
                # scaffold the workspace, conflict-safe
              </span>
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check{" "}
              <span className="text-concrete-500">
                # confirm it is well-formed; exit 0/1/2
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
        id="work"
        register="05 / next"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <div className="section-kicker section-kicker-reference">
            <Wrench className="h-4 w-4" aria-hidden="true" />
            <span>next moves</span>
          </div>
          <Heading className="mt-3">Add only what the task needs</Heading>
          <p className="mt-4 max-w-2xl leading-relaxed text-concrete-400">
            The starter kit is enough to begin. Add skills or worker files when
            the next change needs a narrower role.
          </p>
        </div>
        <Card
          signal="reference"
          screws
          className="h-full"
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
                Optional guides for review, fixes, features, and docs.
              </p>
            </div>
          </div>
          <ActionLink href="/skills/" className="mt-auto w-fit">
            Browse skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>

        <Card
          signal="reference"
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div className="flex items-start gap-4">
            <KitIcon signal="reference">
              <Terminal className="h-6 w-6" aria-hidden="true" />
            </KitIcon>
            <div>
              <Heading as="h3" size="xl">
                Agents
              </Heading>
              <p className="mt-2 text-concrete-400">
                Worker definitions for review, exploration, or authoring.
              </p>
            </div>
          </div>
          <ActionLink href="/agents/" className="mt-auto w-fit">
            Browse agents <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>
      </Section>
      <JsonLd data={setupJsonLd} />
    </div>
  );
}
