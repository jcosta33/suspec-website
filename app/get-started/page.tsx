import type { Metadata } from "next";
import { ArrowRight, FolderPlus, Rocket, Terminal, Wrench } from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { ActionLink } from "../components/ActionLink";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";
import { TextLink } from "../components/TextLink";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Get started — Corpus",
  description:
    "Set up Corpus in a new repo or an existing project.",
  openGraph: {
    title: "Get started — Corpus",
    description:
      "Set up Corpus in a new repo or an existing project.",
    type: "website",
    url: "/get-started/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-get-started.png",
        width: 1200,
        height: 630,
        alt: "Get started with Corpus — a new repo or an existing project",
      },
    ],
  },
  alternates: {
    canonical: "/get-started/",
  },
};

function KitIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-panel border border-panel-border bg-panel-raised text-corpus-yellow shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.45)]">
      <div
        className="brushed-metal absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </div>
  );
}

function ListDot() {
  return (
    <span
      className="mt-2.5 h-2 w-2 shrink-0 rounded-sm bg-corpus-yellow shadow-[0_0_8px_rgba(216,138,36,0.72)]"
      aria-hidden="true"
    />
  );
}

export default function GetStartedPage() {
  return (
    <div className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-20">
      <Section className="ambient-header">
        <PageHero eyebrow="setup / first workspace" title="Get started">
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400 sm:text-xl">
            Start with the starter kit. Use the CLI when you want scaffolding
            and checks.
          </p>
        </PageHero>
      </Section>

      <Section className="reveal grid gap-6 md:grid-cols-2">
        <Card screws className="h-full" contentClassName="flex h-full flex-col gap-5">
          <KitIcon>
            <Rocket className="h-6 w-6" aria-hidden="true" />
          </KitIcon>
          <div>
            <Heading>New repo</Heading>
            <p className="mt-2 text-concrete-400">
              Use the GitHub template for a fresh workspace with folders,
              templates, and guides in place.
            </p>
          </div>
          <ActionLink
            href="https://github.com/jcosta33/corpus-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 w-fit justify-start"
          >
            Use the starter kit{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>

        <Card screws className="h-full" contentClassName="flex h-full flex-col gap-5">
          <KitIcon>
            <FolderPlus className="h-6 w-6" aria-hidden="true" />
          </KitIcon>
          <div>
            <Heading>Existing project</Heading>
            <p className="mt-2 text-concrete-400">
              Copy the kit into your repo. Add specs and tasks beside the code.
            </p>
          </div>
          <ActionLink
            href="/docs/ADOPTING/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 w-fit justify-start"
          >
            Read the adopting guide{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>
      </Section>

      <Section className="flex flex-col gap-6">
        <div className="section-kicker section-kicker-gold">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>or scaffold it with the cli</span>
        </div>
        <Heading>Prefer the command line?</Heading>
        <p className="max-w-2xl text-concrete-400">
          <code className="text-corpus-yellow">corpus init</code> scaffolds the
          same workspace into a new or existing repo. It refuses to overwrite
          existing files. Install it from source for now.
        </p>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500">
              # install the CLI from source
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}PKG=corpus-cli
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
              <span className="text-corpus-yellow">$</span>{" "}npm install
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm run build
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm link
            </p>
            <p className="mt-2 text-concrete-500">
              # then, in a new or existing repo
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus init{" "}
              <span className="text-concrete-500">
                # scaffold the workspace, conflict-safe
              </span>
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus check{" "}
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

      <Section className="flex flex-col gap-8">
        <Heading>Starter kit contents</Heading>
        <PaperArtifact
          label="note"
          title="starter kit contents"
          meta="workspace / committed artifacts"
          className="max-w-3xl"
        >
          <p>
            AGENTS.md sets the local contract. Templates shape the records.
            status.md tracks the work.
          </p>
        </PaperArtifact>
        <ul className="reveal grid gap-4 sm:grid-cols-2">
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">AGENTS.md</strong> — the
              file your agent reads before work starts.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Core guides</strong> —
              write specs, run tasks, review output, save findings.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Eight templates</strong> —
              intake, spec, task, review, finding, status, inventory,
              change plan.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Flow folders</strong> —
              specs/, tasks/, reviews/, findings/, and related folders.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">status.md</strong> — a
              small workboard for active items.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">decisions/</strong> — ADRs
              for local decisions.
            </span>
          </li>
        </ul>
        <p className="text-concrete-400">
          More setup notes:{" "}
          <TextLink
            href="/docs/ADOPTING/"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs/ADOPTING.md
          </TextLink>
        </p>
      </Section>

      <Section className="grid gap-6 md:grid-cols-2">
        <Card
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div className="flex items-start gap-4">
            <KitIcon>
              <Wrench className="h-6 w-6" aria-hidden="true" />
            </KitIcon>
            <div>
              <Heading>Need more depth?</Heading>
              <p className="mt-2 text-concrete-400">
                Install optional skills for review, fixes, features, and docs.
              </p>
            </div>
          </div>
          <ActionLink href="/skills/" className="mt-auto w-fit">
            Browse skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>

        <Card
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div className="flex items-start gap-4">
            <KitIcon>
              <Terminal className="h-6 w-6" aria-hidden="true" />
            </KitIcon>
            <div>
              <Heading>Using Claude Code?</Heading>
              <p className="mt-2 text-concrete-400">
                Copy a worker definition for review, exploration, or authoring.
              </p>
            </div>
          </div>
          <ActionLink href="/agents/" className="mt-auto w-fit">
            Browse agents <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </Card>
      </Section>
    </div>
  );
}
