import type { Metadata } from "next";
import { Section } from "../components/Section";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";

export const metadata: Metadata = {
  title: "Colophon — Swarm",
  description: "How the Swarm website is built and by whom.",
  robots: "noindex",
  alternates: {
    canonical: "/colophon/",
  },
};

const facts = [
  { label: "Framework", value: "Next.js 16 with App Router" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Fonts", value: "Inter, Space Grotesk, JetBrains Mono" },
  { label: "Icons", value: "Lucide React" },
  { label: "Hosting", value: "Vercel" },
];

export default function ColophonPage() {
  return (
    <Section className="py-24">
      <Panel brushed rivets screws className="mx-auto max-w-2xl p-2">
        <TerminalWindow title="build.manifest">
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
                Colophon
              </h1>
              <p className="mt-2 text-concrete-400">
                Built with Swarm: drafted by agents, reviewed by a session that didn&apos;t write it,
                merged by a human.
              </p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-[auto_1fr]">
              {facts.map((fact) => (
                <div key={fact.label} className="contents">
                  <dt className="font-mono text-xs uppercase tracking-wide text-brass">
                    {fact.label}
                  </dt>
                  <dd className="text-concrete-100">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </TerminalWindow>
      </Panel>
    </Section>
  );
}
