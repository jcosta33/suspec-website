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
import { AlertTriangle, CheckCircle, Wrench } from "lucide-react";

export const metadata = {
  title: "Kitchen sink — Corpus",
  robots: "noindex, nofollow",
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
    note: "Actions, badges, lamps, toggles, and verified output color.",
    links: [
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

function PreviewSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section id={id} className="flex scroll-mt-28 flex-col gap-6">
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
        <PageHero eyebrow="component preview" title="Kitchen sink" tone="muted">
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400">
            Internal preview for checking surfaces, state, and artifact
            treatments before they move into public pages.
          </p>
        </PageHero>
      </Section>

      <Section>
        <nav aria-label="Kitchen sink specimen register">
          <Panel brushed screws className="p-0">
            <div className="grid md:grid-cols-[0.85fr_2fr]">
              <div className="border-b border-panel-border p-4 sm:p-6 md:border-b-0 md:border-r">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-brass">
                  Specimen register
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold text-concrete-100 sm:mt-3 sm:text-2xl">
                  Quick checks, grouped by job.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400 sm:mt-3">
                  A small map for catching drift in the design system without
                  turning this page into product theater.
                </p>
              </div>
              <div className="process-strip process-strip-signal-muted grid gap-px bg-panel-border sm:grid-cols-3">
                {specimenRegister.map((group, index) => (
                  <div
                    key={group.label}
                    className="bg-panel-raised/95 p-4 sm:p-6"
                  >
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-corpus-yellow">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-concrete-100 sm:mt-3 sm:text-xl">
                      {group.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-concrete-400 sm:mt-2 md:min-h-[3.75rem]">
                      {group.note}
                    </p>
                    <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:mt-4 sm:grid-cols-1 sm:gap-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="focus-ring inline-flex min-h-9 items-center rounded-sm text-sm font-medium text-corpus-yellow underline decoration-corpus-yellow/40 underline-offset-4 transition-[color,text-decoration-color] hover:text-amber hover:decoration-amber sm:min-h-11"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
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

      <PreviewSection id="buttons" index="02" title="Buttons">
        <div className="flex flex-wrap gap-4 sm:gap-5">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="secondary">Outline action</Button>
          <Button disabled>Disabled</Button>
        </div>
      </PreviewSection>

      <PreviewSection id="cards" index="03" title="Cards">
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

      <PreviewSection id="badges" index="04" title="Badges">
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

      <PreviewSection id="paper-artifact" index="05" title="Paper artifact">
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

      <PreviewSection id="pilot-lamps" index="06" title="Pilot lamps">
        <div className="flex flex-wrap items-center gap-6">
          <PilotLamp color="amber" pulse label="active" />
          <PilotLamp color="green" label="ok" />
          <PilotLamp color="red" label="fault" />
          <PilotLamp color="off" label="idle" />
        </div>
      </PreviewSection>

      <PreviewSection id="toggle-switch" index="07" title="Toggle switch">
        <ToggleButton label="Enable override" />
      </PreviewSection>

      <PreviewSection id="rack-row" index="08" title="Rack row">
        <RackRow>
          <Card screws>Module A</Card>
          <Card screws>Module B</Card>
          <Card screws>Module C</Card>
        </RackRow>
      </PreviewSection>

      <PreviewSection id="code-block" index="09" title="Code block">
        <CodeBlock>{`loop:
  spec
  -> task
  -> run
  -> review
  -> close`}</CodeBlock>
      </PreviewSection>

      <PreviewSection id="terminal-window" index="10" title="Terminal window">
        <TerminalWindow title="terminal">
          <p className="text-concrete-500"># CRT monitor panel</p>
          <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus status
          </p>
          <p className="mt-1 text-phosphor">✓ all systems nominal</p>
        </TerminalWindow>
      </PreviewSection>

      <PreviewSection id="gilt-divider" index="11" title="Gilt divider">
        <GiltBand height="md" />
      </PreviewSection>

      <PreviewSection id="icons" index="12" title="Icons">
        <div className="flex gap-4 text-corpus-yellow">
          <AlertTriangle aria-label="Warning" />
          <CheckCircle aria-label="Success" />
          <Wrench aria-label="Tools" />
        </div>
      </PreviewSection>

      <PreviewSection id="typography" index="13" title="Typography">
        <div className="space-y-4">
          <p className="text-concrete-100">
            Primary text on chassis background.
          </p>
          <p className="text-concrete-400">
            Secondary text for captions and metadata.
          </p>
          <p className="text-corpus-yellow">
            Aurum for the main loop and primary actions.
          </p>
          <p className="text-phosphor">Phosphor for verified evidence.</p>
          <p className="text-greenfield">Greenfield for fresh starts.</p>
          <p className="text-brownfield">Brownfield for adoption paths.</p>
          <p className="text-rubedo">Rubedo for change and blocked states.</p>
          <p className="text-brass">Brass hardware accent.</p>
          <p className="text-olive">Olive for reference and ledgers.</p>
          <p className="text-aluminium">Aluminium label accent.</p>
        </div>
      </PreviewSection>
    </div>
  );
}
