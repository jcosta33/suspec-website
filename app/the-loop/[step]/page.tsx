import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "../../components/Card";
import { Heading } from "../../components/Heading";
import { HexBadge } from "../../components/HexBadge";
import { HeroTrace } from "../../components/HeroTrace";
import { JsonLd } from "../../components/JsonLd";
import { PageHero } from "../../components/PageHero";
import { Panel } from "../../components/Panel";
import { Section } from "../../components/Section";
import { signalRoles } from "../../components/signalStyles";
import { TerminalWindow } from "../../components/TerminalWindow";
import { TextLink } from "../../components/TextLink";
import { canonicalAlternates } from "../../seo";
import { loopStepHref, loopSteps } from "../loopSteps";

const SITE_URL = "https://suspecframework.dev";

export const dynamicParams = false;

export function generateStaticParams(): { step: string }[] {
  return loopSteps.map(({ slug }) => ({ step: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}): Promise<Metadata> {
  const { step: slug } = await params;
  const step = loopSteps.find((item) => item.slug === slug);
  if (!step) return {};

  const title = `${step.name} — The Suspec loop`;
  const description = `${step.descriptor}. ${step.body}`;
  return {
    title,
    description,
    alternates: canonicalAlternates(loopStepHref(step.slug)),
    openGraph: {
      title,
      description,
      type: "article",
      url: loopStepHref(step.slug),
      siteName: "Suspec",
      locale: "en_US",
      images: [
        {
          url: "/og-the-loop.png",
          width: 1200,
          height: 630,
          alt: `${step.name} — The Suspec loop`,
        },
      ],
    },
  };
}

export default async function LoopStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step: slug } = await params;
  const stepIndex = loopSteps.findIndex((item) => item.slug === slug);
  const step = loopSteps[stepIndex];
  if (!step) notFound();

  const Icon = step.icon;
  const previous = loopSteps[stepIndex - 1];
  const next = loopSteps[stepIndex + 1];
  const pageUrl = `${SITE_URL}${loopStepHref(step.slug)}`;
  const exampleText = step.example.lines
    .map((line) => `${line.prompt ? "$ " : ""}${line.text}`)
    .join("\n");

  return (
    <div className="repo-product-page loop-step-detail-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow={`the loop / ${step.number}`}
          motif="loop"
          tone={step.signal}
          toneLabel="step"
          titleLabel={step.name}
          title={step.name}
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            {step.descriptor}. {step.output}.
          </p>
          <HeroTrace
            ariaLabel={`${step.name} step path`}
             items={[
               { label: "Input", signal: "reference" },
               { label: step.name, signal: step.signal },
               { label: "Output", signal: "evidence" },
             ]}
          />
        </PageHero>
      </Section>

      <Section
        register={`01 / ${step.descriptor}`}
        registerTone={step.signal}
        className="loop-step-detail-opening grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:items-start"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <HexBadge color={step.signal}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </HexBadge>
            <div>
              <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${signalRoles[step.signal].text}`}>
                step {step.number}
              </p>
              <Heading className="mt-2">The work here</Heading>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-concrete-300">{step.body}</p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title={step.example.title}
            ariaLabel={`${step.name} example — ${step.example.title}`}
            copyText={exampleText}
          >
            {step.example.lines.map((line, index) => (
              <p
                key={`${line.text}-${index}`}
                className={line.prompt ? "text-concrete-100" : "text-concrete-400"}
              >
                {line.prompt && <span className="text-suspec-yellow">$ </span>}
                {line.text}
              </p>
            ))}
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        register="02 / handoff"
        registerTone="reference"
        className="grid gap-6 lg:grid-cols-2 lg:items-start"
      >
        <Card screws contentClassName="space-y-4" signal="reference">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal-reference">
            next handoff
          </p>
          <Heading>{step.handoff}</Heading>
          <p className="text-sm leading-relaxed text-concrete-400">
            When this step produces a record, the next step reads it by
            explicit full path. Lighter work can keep the boundary inline; the
            loop does not need a file for the sake of owning a file.
          </p>
          {next ? (
            <TextLink href={loopStepHref(next.slug)} className="w-fit gap-2">
              Continue to {next.name}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          ) : (
            <TextLink href="/the-loop/" className="w-fit gap-2">
              Return to the loop
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          )}
        </Card>
        <Card screws contentClassName="space-y-4" signal={step.signal}>
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${signalRoles[step.signal].text}`}>
            boundary
          </p>
          <Heading>Keep the evidence attached.</Heading>
          <p className="text-sm leading-relaxed text-concrete-400">
            The record names its source, scope, or result clearly enough for a
            reviewer to pick up. The next step gets the evidence; it should not
            have to excavate the story from chat.
          </p>
        </Card>
      </Section>

      <Section register="03 / move along" registerTone="muted">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <TextLink href="/the-loop/" className="w-fit gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the loop
          </TextLink>
          {previous ? (
            <TextLink href={loopStepHref(previous.slug)} className="w-fit gap-2">
              Previous: {previous.name}
            </TextLink>
          ) : null}
          {next ? (
            <TextLink href={loopStepHref(next.slug)} className="w-fit gap-2">
              Next: {next.name}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          ) : null}
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "@id": `${pageUrl}#article`,
          name: step.name,
          headline: `${step.name} — The Suspec loop`,
          description: `${step.descriptor}. ${step.body}`,
          url: pageUrl,
          articleSection: "Suspec loop",
          isPartOf: { "@id": `${SITE_URL}/the-loop/#webpage` },
          author: { "@type": "Organization", name: "Suspec" },
        }}
      />
    </div>
  );
}
