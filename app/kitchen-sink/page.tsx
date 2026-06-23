import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Panel } from "../components/Panel";
import { PilotLamp } from "../components/PilotLamp";
import { ToggleButton } from "../components/ToggleButton";
import { RackRow } from "../components/RackRow";
import { Section } from "../components/Section";
import { CodeBlock } from "../components/CodeBlock";
import { HazardStripe } from "../components/HazardStripe";
import { TerminalWindow } from "../components/TerminalWindow";
import { Heading } from "../components/Heading";
import { AlertTriangle, CheckCircle, Wrench } from "lucide-react";

export const metadata = {
  title: "Kitchen sink — Calma",
  robots: "noindex, nofollow",
};

export default function KitchenSinkPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      <Section>
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100">
          Kitchen sink
        </h1>
        <p className="mt-4 text-concrete-400">
          Internal component preview. Not linked from production navigation.
        </p>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Panels</Heading>
        <div className="grid gap-6 md:grid-cols-2">
          <Panel>
            <h3 className="font-heading text-lg font-bold">Raised panel</h3>
            <p className="mt-2 text-concrete-400">
              A heavy machined plate with a strong shadow.
            </p>
          </Panel>
          <Panel variant="inset">
            <h3 className="font-heading text-lg font-bold">Inset panel</h3>
            <p className="mt-2 text-concrete-400">
              A recessed well for screens and readouts.
            </p>
          </Panel>
          <Panel brushed rivets screws>
            <h3 className="font-heading text-lg font-bold">Hardware panel</h3>
            <p className="mt-2 text-concrete-400">
              Brushed metal, rivets, and screws.
            </p>
          </Panel>
          <Panel hazard>
            <h3 className="font-heading text-lg font-bold">Hazard panel</h3>
            <p className="mt-2 text-concrete-400">Bolted-on caution trim.</p>
          </Panel>
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Buttons</Heading>
        <div className="flex flex-wrap gap-4">
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
          <Badge variant="hazard">hazard</Badge>
          <Badge variant="success">success</Badge>
        </div>
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
  spec -> task -> run -> review -> close`}</CodeBlock>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Terminal window</Heading>
        <TerminalWindow title="terminal">
          <p className="text-concrete-500"># CRT monitor panel</p>
          <p className="text-concrete-100">
            <span className="text-corpus-yellow">$</span> corpus status
          </p>
          <p className="mt-1 text-drone-green">✓ all systems nominal</p>
        </TerminalWindow>
      </Section>

      <Section className="flex flex-col gap-6">
        <Heading>Hazard stripe</Heading>
        <HazardStripe height="md" />
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
          <p className="text-hazard-orange">
            Hazard text for warnings and notices.
          </p>
          <p className="text-drone-green">Drone green for success states.</p>
          <p className="text-brass">Brass hardware accent.</p>
          <p className="text-aluminium">Aluminium label accent.</p>
          <p className="text-phosphor">Phosphor amber glow text.</p>
        </div>
      </Section>
    </div>
  );
}
