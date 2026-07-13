import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GitBranch,
  Terminal,
} from "lucide-react";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import { Heading } from "../../components/Heading";
import { HexBadge } from "../../components/HexBadge";
import { HeroTrace } from "../../components/HeroTrace";
import { JsonLd } from "../../components/JsonLd";
import { PageHero } from "../../components/PageHero";
import { PaperArtifact } from "../../components/PaperArtifact";
import { Panel } from "../../components/Panel";
import { Section } from "../../components/Section";
import { signalRoles } from "../../components/signalStyles";
import { TerminalWindow } from "../../components/TerminalWindow";
import { TextLink } from "../../components/TextLink";
import { canonicalAlternates } from "../../seo";
import {
  getSkill,
  skillDetails,
  skillSourceUrl,
  type SkillDetail,
} from "../skillData";

const SITE_URL = "https://suspecframework.dev";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return skillDetails.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};

  const title = `${skill.name} — Suspec skill`;
  const description = `${skill.description} ${skill.rationale}`;
  return {
    title,
    description,
    alternates: canonicalAlternates(`/skills/${skill.slug}/`),
    openGraph: {
      title,
      description,
      type: "article",
      url: `/skills/${skill.slug}/`,
      siteName: "Suspec",
      locale: "en_US",
      images: [
        {
          url: "/og-skills.png",
          width: 1200,
          height: 630,
          alt: `${skill.name} — Suspec skill detail`,
        },
      ],
    },
  };
}

function SkillDiagram({ visual, tone }: Pick<SkillDetail, "visual" | "tone">) {
  const roleText = signalRoles[tone].text;

  if (visual === "revolver") {
    return (
      <div
        className="skill-detail-visual skill-detail-visual-revolver"
        role="img"
        aria-label="Technical revolver diagram with six review stances around a cylinder"
      >
        <div className="skill-revolver-drawing" aria-hidden="true">
          <span className="skill-revolver-barrel" />
          <span className="skill-revolver-frame" />
          <span className="skill-revolver-grip" />
          <div className="skill-revolver-cylinder">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index}>
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
        <div className="skill-detail-visual-caption">
          <span className={roleText}>six stances</span>
          <span>one current target</span>
          <span>resolve before firing again</span>
        </div>
      </div>
    );
  }

  if (visual === "decision") {
    return (
      <div
        className="skill-detail-visual skill-detail-visual-decision"
        role="img"
        aria-label="Decision tree with a recommended option and two alternatives"
      >
        <div className="skill-decision-root">unresolved choice</div>
        <div className="skill-decision-branches" aria-hidden="true">
          <span className="skill-decision-branch skill-decision-branch-recommended">
            recommended
          </span>
          <span className="skill-decision-branch">alternative</span>
          <span className="skill-decision-branch">defer</span>
        </div>
        <p className="skill-detail-visual-caption">
          Facts first. Choice second. Work resumes after selection.
        </p>
      </div>
    );
  }

  if (visual === "passes") {
    return (
      <div
        className="skill-detail-visual skill-detail-visual-passes"
        role="img"
        aria-label="Three sequential review passes"
      >
        {["01 / contract", "02 / failure", "03 / regression"].map((label, index) => (
          <div key={label} className="skill-pass-row">
            <span className="skill-pass-number">{label.slice(0, 2)}</span>
            <span>{label.slice(5)}</span>
            <span className={`skill-pass-state ${index === 2 ? roleText : ""}`}>
              {index === 0 ? "fix" : index === 1 ? "refute" : "verify"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "before-after") {
    return (
      <div
        className="skill-detail-visual skill-detail-visual-before-after"
        role="img"
        aria-label="Before and after copy reduction"
      >
        <div>
          <span>before</span>
          <p>long setup, repeated rationale, soft landing</p>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span className={roleText}>after</span>
          <p>action, evidence, boundary</p>
        </div>
      </div>
    );
  }

  if (visual === "chat") {
    return (
      <div
        className="skill-detail-visual skill-detail-visual-chat"
        role="img"
        aria-label="An in-chat method result with no Suspec artifact emitted"
      >
        <div className="skill-chat-thread">
          <div className="skill-chat-message skill-chat-message-prompt">
            <span>request</span>
            <p>Run the method on the supplied target.</p>
          </div>
          <div className="skill-chat-message skill-chat-message-result">
            <span className={roleText}>result</span>
            <p>Facts, boundaries, and the next useful action.</p>
          </div>
        </div>
        <p className="skill-detail-visual-caption">
          <span className={roleText}>in chat</span>
          <span>no Suspec artifact</span>
        </p>
      </div>
    );
  }

  if (visual === "flow" || visual === "memory") {
    return (
      <div
        className={`skill-detail-visual skill-detail-visual-${visual}`}
        role="img"
        aria-label={
          visual === "memory"
            ? "Verified lesson routed into native memory or a project channel"
            : "A bounded record moving from source to a durable or decisive result"
        }
      >
        <div className="skill-flow-node">{visual === "memory" ? "verified lesson" : "bounded target"}</div>
        <ArrowRight aria-hidden="true" />
        <div className="skill-flow-node skill-flow-node-active">{visual === "memory" ? "native memory" : "evidence"}</div>
        <ArrowRight aria-hidden="true" />
        <div className="skill-flow-node">{visual === "memory" ? "next change" : "decision"}</div>
      </div>
    );
  }

  return (
    <div
      className="skill-detail-visual skill-detail-visual-artifact"
      role="img"
      aria-label="A structured Markdown artifact with evidence fields"
    >
      <div className="skill-artifact-scanline" aria-hidden="true" />
      <span className={roleText}>type: record</span>
      <span>intent / scope / evidence</span>
      <span>one claim per row</span>
    </div>
  );
}

function skillEffect(skill: SkillDetail) {
  if (skill.kind === "artifact") return "creates a Suspec artifact";
  if (skill.slug === "disrespec") return "rewrites supplied Markdown";
  if (skill.slug === "promote") return "moves a selected record";
  if (skill.slug === "remember") return "writes to native memory or a project channel";
  return "returns a focused result";
}

function SkillPageJsonLd({ skill }: { skill: SkillDetail }) {
  const url = `${SITE_URL}/skills/${skill.slug}/`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "@id": `${url}#article`,
        name: skill.name,
        headline: `${skill.name} — Suspec skill`,
        description: `${skill.description} ${skill.rationale}`,
        url,
        articleSection: skill.kind === "artifact" ? "Artifact authors" : "Universal methods",
        isPartOf: { "@id": `${SITE_URL}/skills/#webpage` },
        about: {
          "@type": "SoftwareSourceCode",
          name: "Suspec methodology",
          codeRepository: skillSourceUrl(skill.slug),
        },
        author: { "@type": "Organization", name: "Suspec" },
      }}
    />
  );
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const installCommand = `npx skills add jcosta33/suspec-skills --skill ${skill.slug} -g`;
  const kindLabel = skill.kind === "artifact" ? "artifact author" : "universal method";
  const workingShapeTitle =
    skill.kind === "artifact"
      ? "Use the smallest record that carries the work."
      : "Keep the result in the conversation.";
  const workingShapeCopy =
    skill.kind === "artifact"
      ? "The example is a shape, not a template. Keep the source evidence close to the claim and add structure only when it changes execution or review."
      : "The example shows the kind of answer the method returns. It reports in chat; no Suspec artifact is emitted unless a separate artifact-author skill takes over.";

  return (
    <div className="repo-product-page skill-detail-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow={`${kindLabel} / ${skill.slug}`}
          className={`skill-detail-hero skill-detail-hero-${skill.tone}`}
          motif={skill.visual === "revolver" ? "loop" : "catalog"}
          tone={skill.tone}
          toneLabel={skill.kind === "artifact" ? "artifact" : "method"}
          titleLabel={skill.name}
          title={skill.name}
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            {skill.description}
          </p>
          <HeroTrace
            ariaLabel={`${skill.name} skill path`}
            items={[
              { label: "Load", signal: skill.tone },
              { label: "Apply", signal: "core" },
              { label: skill.kind === "artifact" ? "Record" : "Return", signal: "reference" },
            ]}
          />
        </PageHero>
      </Section>

      <Section
        register="01 / why it exists"
        registerTone={skill.tone}
        className="skill-detail-opening grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:items-stretch"
      >
        <div className="skill-detail-copy space-y-5">
          <div className="flex items-center gap-3">
            <HexBadge color={skill.tone} className="h-11 w-11 shrink-0">
              <skill.icon className="h-5 w-5" aria-hidden="true" />
            </HexBadge>
            <div>
              <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${signalRoles[skill.tone].text}`}>
                {kindLabel}
              </p>
              <h2 className="font-heading text-2xl font-semibold text-concrete-100">Why it belongs in the method</h2>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-concrete-300">{skill.rationale}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card screws className="skill-detail-fact-card h-full" contentClassName="space-y-2">
              <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${signalRoles[skill.tone].text}`}>
                returns
              </p>
              <p className="text-sm leading-relaxed text-concrete-400">{skill.output}</p>
            </Card>
            <Card screws className="skill-detail-fact-card h-full" contentClassName="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal-reference">
                boundary
              </p>
              <p className="text-sm leading-relaxed text-concrete-400">{skill.boundary}</p>
            </Card>
            <Card screws className="skill-detail-fact-card h-full sm:col-span-2" contentClassName="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal-reference">
                common misuse
              </p>
              <p className="text-sm leading-relaxed text-concrete-400">{skill.misuse}</p>
            </Card>
          </div>
        </div>
        <Card screws className="skill-detail-visual-card h-full" contentClassName="flex h-full flex-col justify-center gap-4">
          <SkillDiagram visual={skill.visual} tone={skill.tone} />
        </Card>
      </Section>

      <Section
        register="02 / example"
        registerTone="reference"
        className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(20rem,1.18fr)] lg:items-start"
      >
        <PaperArtifact
          label={skill.kind === "artifact" ? "record" : "note"}
          title={skill.example.title}
          meta={skill.example.meta}
          className="skill-detail-paper"
        >
          <pre className="m-0 whitespace-pre-wrap font-mono text-sm leading-7 text-ink">
            {skill.example.lines.join("\n")}
          </pre>
        </PaperArtifact>
        <div className="skill-detail-copy space-y-5">
          <div>
            <p className="section-kicker section-kicker-reference">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              <span>working shape</span>
            </p>
            <Heading className="mt-3">{workingShapeTitle}</Heading>
          </div>
          <p className="text-concrete-400">{workingShapeCopy}</p>
          <Badge variant={skill.kind === "artifact" ? "ready" : "draft"}>
            {skillEffect(skill)}
          </Badge>
        </div>
      </Section>

      <Section
        register="03 / install"
        registerTone="core"
        className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,1.2fr)] lg:items-start"
      >
        <div className="skill-detail-copy space-y-5">
          <div>
            <p className="section-kicker section-kicker-core">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>skills add</span>
            </p>
            <Heading className="mt-3">Load it when the task matches.</Heading>
          </div>
          <p className="text-concrete-400">
            Skills are standalone Markdown. Install one or install the catalog; repo-specific commands stay in the repo&apos;s AGENTS.md.
          </p>
          <TextLink href="/skills/" className="w-fit gap-2" touchTarget>
            Back to the skills index <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={installCommand} copyLabel="Copy install command">
            <p className="text-concrete-500"># install one skill globally</p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}{installCommand}
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section register="04 / source" registerTone="muted" className="skill-detail-source">
        <Card screws contentClassName="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brass">source record</p>
            <p className="mt-2 text-sm leading-relaxed text-concrete-400">Read the complete skill contract in the catalog repository.</p>
          </div>
          <TextLink
            href={skillSourceUrl(skill.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit gap-2"
            touchTarget
            aria-label={`Open ${skill.name} source on GitHub (opens in new tab)`}
          >
            Open SKILL.md <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </Card>
      </Section>
      <SkillPageJsonLd skill={skill} />
    </div>
  );
}
