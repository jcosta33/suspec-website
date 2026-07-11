import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Panel } from "../components/Panel";
import { PilotLamp } from "../components/PilotLamp";
import { ToggleButton } from "../components/ToggleButton";
import { RackRow } from "../components/RackRow";
import { Section } from "../components/Section";
import { CodeBlock } from "../components/CodeBlock";
import { GiltBand } from "../components/GiltBand";
import { TerminalWindow } from "../components/TerminalWindow";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";
import { PageHero } from "../components/PageHero";
import {
  signalRoleOrder,
  signalRoleMeta,
  signalRoles,
  type SignalRole,
} from "../components/signalStyles";
import { AlertTriangle, CheckCircle, Wrench } from "lucide-react";
import { canonicalAlternates } from "../seo";

const kitchenSinkDescription =
  "Internal Suspec website component preview for checking surfaces, state, and artifact treatments.";

export const metadata: Metadata = {
  title: "Kitchen sink — Suspec",
  description: kitchenSinkDescription,
  robots: "noindex, nofollow",
  openGraph: {
    title: "Kitchen sink — Suspec",
    description: kitchenSinkDescription,
    type: "website",
    url: "/kitchen-sink/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Suspec website component preview",
      },
    ],
  },
  alternates: canonicalAlternates("/kitchen-sink/"),
};

const specimenRegister = [
  {
    label: "Surfaces",
    note: "Panels, cards, paper, terminal, and chassis wells.",
    links: [
      { label: "Panels", href: "#panels" },
      { label: "Cards", href: "#cards" },
      { label: "Paper", href: "#paper-artifact" },
      { label: "Code", href: "#code-block" },
      { label: "Terminal", href: "#terminal-window" },
    ],
  },
  {
    label: "State",
    note: "Semantic palette, actions, badges, lamps, and toggles.",
    links: [
      { label: "Palette", href: "#palette" },
      { label: "Buttons", href: "#buttons" },
      { label: "Badges", href: "#badges" },
      { label: "Pilot lamps", href: "#pilot-lamps" },
      { label: "Toggle", href: "#toggle-switch" },
    ],
  },
  {
    label: "Texture",
    note: "Hardware, dividers, icons, type, and small ornamental rules.",
    links: [
      { label: "Rack row", href: "#rack-row" },
      { label: "Gilt divider", href: "#gilt-divider" },
      { label: "Icons", href: "#icons" },
      { label: "Typography", href: "#typography" },
    ],
  },
];

const terminalSpecimenCommand = "suspec check ./spec.md";

function PreviewSection({
  id,
  index,
  title,
  registerTone = "muted",
  children,
}: {
  id: string;
  index: string;
  title: string;
  registerTone?: SignalRole;
  children: ReactNode;
}) {
  return (
    <Section
      id={id}
      register={`${index} / ${title}`}
      registerTone={registerTone}
      className="flex scroll-mt-28 flex-col gap-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span
          aria-hidden="true"
          className="font-mono text-xs font-semibold uppercase tracking-wide text-brass"
        >
          {index}
        </span>
        <Heading className="shrink-0">{title}</Heading>
        <span className="h-px min-w-8 flex-1 bg-panel-border" aria-hidden="true" />
      </div>
      {children}
    </Section>
  );
}

export default function KitchenSinkPage() {
  return (
    <div className="flex flex-col gap-14 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="component preview"
          motif="internal"
          title="Kitchen sink"
          tone="core"
        >
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400">
            Internal preview for checking surfaces, state, and artifact
            treatments before they move into public pages.
          </p>
        </PageHero>
      </Section>

      <Section
        register="00 / specimen register"
        registerTone="muted"
        className="kitchen-specimen-section"
      >
        <nav aria-label="Kitchen sink specimen register">
          <Panel brushed screws className="kitchen-specimen-panel p-0">
            <div className="kitchen-specimen-layout">
              <div className="kitchen-specimen-intro">
                <p className="kitchen-specimen-kicker font-mono text-xs font-semibold uppercase tracking-wide text-brass">
                  Specimen register
                </p>
                <h2 className="kitchen-specimen-title">Component map.</h2>
                <p className="kitchen-specimen-copy text-sm leading-relaxed text-concrete-400">
                  A small map for catching drift in the design system without
                  turning this page into product theater.
                </p>
              </div>
              <div className="kitchen-specimen-strip process-strip process-strip-signal-muted grid gap-px bg-panel-border sm:grid-cols-3">
                {specimenRegister.map((group, index) => (
                  <article
                    key={group.label}
                    className="kitchen-specimen-group bg-panel-raised/95 p-4 sm:p-5"
                  >
                    <header className="kitchen-specimen-group-head">
                      <p className="kitchen-specimen-index font-mono text-xs font-semibold uppercase tracking-wide text-suspec-yellow">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="kitchen-specimen-label font-heading text-lg font-bold text-concrete-100">
                        {group.label}
                      </h3>
                    </header>
                    <p className="kitchen-specimen-note text-sm leading-relaxed text-concrete-400">
                      {group.note}
                    </p>
                    <ul className="kitchen-specimen-links mt-3 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:mt-4">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="focus-ring inline-flex min-h-11 min-w-11 items-center rounded-sm text-sm font-medium text-suspec-yellow underline decoration-suspec-yellow/40 underline-offset-4 transition-[color,text-decoration-color] hover:text-gold-bright hover:decoration-gold-bright"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Panel>
        </nav>
      </Section>

      <PreviewSection id="panels" index="01" title="Panels">
        <div className="grid gap-6 md:grid-cols-2">
          <Panel className="p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold">Raised panel</h3>
            <p className="mt-2 text-concrete-400">
              A heavy machined plate with a strong shadow.
            </p>
          </Panel>
          <Panel variant="inset" className="p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold">Inset panel</h3>
            <p className="mt-2 text-concrete-400">
              A recessed well for screens and readouts.
            </p>
          </Panel>
          <Panel brushed rivets screws className="p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold">Hardware panel</h3>
            <p className="mt-2 text-concrete-400">
              Brushed metal, rivets, and screws.
            </p>
          </Panel>
          <Panel gilt className="p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold">Gilt panel</h3>
            <p className="mt-2 text-concrete-400">Thin gold rule for state changes.</p>
          </Panel>
        </div>
      </PreviewSection>

      <PreviewSection
        id="buttons"
        index="02"
        title="Buttons"
        registerTone="core"
      >
        <div className="flex flex-wrap gap-4 sm:gap-5">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="secondary">Outline action</Button>
          <Button disabled>Disabled</Button>
        </div>
      </PreviewSection>

      <PreviewSection
        id="palette"
        index="03"
        title="Semantic palette"
        registerTone="reference"
      >
        <div className="space-y-5">
          <p className="max-w-3xl text-concrete-400">
            Accent colors are labels, not decoration. Pick the role by meaning
            first; the same role should drive the text, lamp, border, rail, and
            hover state.
          </p>
          <div className="palette-grammar-note">
            <span>Rule</span>
            <p>
              Assign the role from the object or action, then let that role
              drive the color, rail, pattern, lamp, and hover state. Greenfield
              and brownfield are setup-path nouns, not moods: fresh repo gets
              greenfield, existing repo gets brownfield. Evidence is proof, not
              generic success.
            </p>
          </div>
          <div className="palette-specimen-grid">
            {signalRoleOrder.map((role) => (
              <article
                key={role}
                className={`palette-specimen ${signalRoles[role].accentCard}`}
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className={`font-mono text-xs font-semibold uppercase tracking-[0.12em] ${signalRoles[role].text}`}
                    >
                      {signalRoleMeta[role].label}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-concrete-100">
                      {signalRoleMeta[role].tone}
                    </h3>
                    <p className="palette-specimen-relationship">
                      {signalRoleMeta[role].relationship}
                    </p>
                    <p className="palette-specimen-family">
                      {signalRoleMeta[role].family}
                    </p>
                  </div>
                  <span className="palette-specimen-swatch" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-concrete-300">
                  {signalRoleMeta[role].use}
                </p>
                <dl className="mt-4 grid gap-3 border-t border-panel-border pt-4 text-sm">
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-concrete-500">
                      Wheel
                    </dt>
                    <dd className="mt-1 text-concrete-300">
                      {signalRoleMeta[role].wheel}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-concrete-500">
                      Example
                    </dt>
                    <dd className="mt-1 text-concrete-300">
                      {signalRoleMeta[role].example}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-concrete-500">
                      Surface rule
                    </dt>
                    <dd className="mt-1 text-concrete-300">
                      {signalRoleMeta[role].surface}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-concrete-500">
                      Pattern
                    </dt>
                    <dd className="mt-1 text-concrete-300">
                      {signalRoleMeta[role].pattern}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-concrete-500">
                      Do not use for
                    </dt>
                    <dd className="mt-1 text-concrete-400">
                      {signalRoleMeta[role].avoid}
                    </dd>
                  </div>
                </dl>
                <code className="palette-specimen-hex">
                  {signalRoleMeta[role].hex}
                </code>
              </article>
            ))}
          </div>
        </div>
      </PreviewSection>

      <PreviewSection id="cards" index="04" title="Cards">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-heading text-lg font-bold">Default card</h3>
            <p className="mt-2 text-concrete-400">
              A raised module with a machined lip.
            </p>
          </Card>
          <Card screws brushed rivets>
            <h3 className="font-heading text-lg font-bold">Hardware card</h3>
            <p className="mt-2 text-concrete-400">Visible screws and rivets.</p>
          </Card>
        </div>
      </PreviewSection>

      <PreviewSection
        id="badges"
        index="05"
        title="Badges"
        registerTone="evidence"
      >
        <div className="flex flex-wrap gap-3">
          <Badge>default</Badge>
          <Badge variant="ready">ready</Badge>
          <Badge variant="pass">pass</Badge>
          <Badge variant="unverified">unverified</Badge>
          <Badge variant="blocked">blocked</Badge>
          <Badge variant="draft">draft</Badge>
          <Badge variant="archived">archived</Badge>
        </div>
      </PreviewSection>

      <PreviewSection
        id="paper-artifact"
        index="06"
        title="Paper artifact"
        registerTone="reference"
      >
        <PaperArtifact
          label="review"
          title="REVIEW-example"
          meta="review packet / example"
          className="max-w-2xl"
        >
          <p>AC-001 — Pass</p>
          <p className="text-pencil">Evidence: build output pasted, exit 0.</p>
          <p className="mt-3">AC-002 — Unverified</p>
          <p className="text-pencil">Evidence missing; route to human attention.</p>
        </PaperArtifact>
      </PreviewSection>

      <PreviewSection
        id="pilot-lamps"
        index="07"
        title="Pilot lamps"
        registerTone="evidence"
      >
        <div className="flex flex-wrap items-center gap-6">
          {signalRoleOrder.map((role) => (
            <PilotLamp key={role} color={role} label={role} />
          ))}
          <PilotLamp color="off" label="idle" />
        </div>
      </PreviewSection>

      <PreviewSection id="toggle-switch" index="08" title="Toggle switch">
        <ToggleButton label="Enable override" />
      </PreviewSection>

      <PreviewSection id="rack-row" index="09" title="Rack row">
        <RackRow>
          <Card screws>Module A</Card>
          <Card screws>Module B</Card>
          <Card screws>Module C</Card>
        </RackRow>
      </PreviewSection>

      <PreviewSection
        id="code-block"
        index="10"
        title="Code block"
        registerTone="reference"
      >
        <CodeBlock>{`loop:
  intent
  -> spec
  -> implement
  -> review
  -> check
  -> findings`}</CodeBlock>
      </PreviewSection>

      <PreviewSection
        id="terminal-window"
        index="11"
        title="Terminal window"
        registerTone="reference"
      >
        <TerminalWindow
          title="terminal"
          copyText={terminalSpecimenCommand}
          copyLabel="Copy command"
        >
          <p className="text-concrete-500"># CRT monitor panel</p>
          <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check ./spec.md
          </p>
          <p className="mt-1 text-signal-evidence">✓ all systems nominal</p>
        </TerminalWindow>
      </PreviewSection>

      <PreviewSection id="gilt-divider" index="12" title="Gilt divider">
        <GiltBand height="md" />
      </PreviewSection>

      <PreviewSection id="icons" index="13" title="Icons">
        <div className="flex gap-4 text-suspec-yellow">
          <AlertTriangle aria-label="Warning" />
          <CheckCircle aria-label="Success" />
          <Wrench aria-label="Tools" />
        </div>
      </PreviewSection>

      <PreviewSection id="typography" index="14" title="Typography">
        <div className="space-y-5">
          <p className="text-concrete-100">
            Primary text on chassis background.
          </p>
          <p className="text-concrete-400">
            Secondary text for captions and metadata.
          </p>
        </div>
      </PreviewSection>
    </div>
  );
}
