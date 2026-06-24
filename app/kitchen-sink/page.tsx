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

export default function KitchenSinkPage() {
  return (
    <div className="flex flex-col gap-14 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero eyebrow="component preview" title="Kitchen sink">
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400">
            Internal component preview. Not linked from production navigation.
          </p>
        </PageHero>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Panels</Heading>
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
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Buttons</Heading>
        <div className="flex flex-wrap gap-4 sm:gap-5">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="secondary">Outline action</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Cards</Heading>
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
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Badges</Heading>
        <div className="flex flex-wrap gap-3">
          <Badge>default</Badge>
          <Badge variant="ready">ready</Badge>
          <Badge variant="pass">pass</Badge>
          <Badge variant="unverified">unverified</Badge>
          <Badge variant="blocked">blocked</Badge>
          <Badge variant="draft">draft</Badge>
          <Badge variant="archived">archived</Badge>
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Paper artifact</Heading>
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
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Pilot lamps</Heading>
        <div className="flex flex-wrap items-center gap-6">
          <PilotLamp color="amber" pulse label="active" />
          <PilotLamp color="green" label="ok" />
          <PilotLamp color="red" label="fault" />
          <PilotLamp color="off" label="idle" />
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Toggle switch</Heading>
        <ToggleButton label="Enable override" />
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Rack row</Heading>
        <RackRow>
          <Card screws>Module A</Card>
          <Card screws>Module B</Card>
          <Card screws>Module C</Card>
        </RackRow>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Code block</Heading>
        <CodeBlock>{`loop:
  spec
  -> task
  -> run
  -> review
  -> close`}</CodeBlock>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Terminal window</Heading>
        <TerminalWindow title="terminal">
          <p className="text-concrete-500"># CRT monitor panel</p>
          <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus status
          </p>
          <p className="mt-1 text-phosphor">✓ all systems nominal</p>
        </TerminalWindow>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Gilt divider</Heading>
        <GiltBand height="md" />
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Icons</Heading>
        <div className="flex gap-4 text-corpus-yellow">
          <AlertTriangle aria-label="Warning" />
          <CheckCircle aria-label="Success" />
          <Wrench aria-label="Tools" />
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Typography</Heading>
        <div className="space-y-4">
          <p className="text-concrete-100">
            Primary text on chassis background.
          </p>
          <p className="text-concrete-400">
            Secondary text for captions and metadata.
          </p>
          <p className="text-corpus-yellow">
            Accent text for links and highlights.
          </p>
          <p className="text-rubedo">Rubedo text for blocked states.</p>
          <p className="text-phosphor">Phosphor text for verified states.</p>
          <p className="text-brass">Brass hardware accent.</p>
          <p className="text-aluminium">Aluminium label accent.</p>
          <p className="text-phosphor">Phosphor for verified output.</p>
        </div>
      </Section>
    </div>
  );
}
