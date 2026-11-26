import type { ReactNode } from "react";
import introduction from "../content/fluxo.md" with { type: "text" };
import workflowSource from "../content/fluxo-passos.md" with { type: "text" };
import { pageHref } from "../content/site";
import { frontmatter, keyValue, sections } from "./contentFormat";
import { MarkdownContent } from "./MarkdownContent";

type WorkflowStep = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  link?: { href: string; label: string };
};

/**
 * Reads one "## title" per step from fluxo-passos.md. An optional case ID and
 * link label point to a work report. The intro stays in fluxo.md.
 */
export function parseWorkflow(source: string, intro: string) {
  const { meta, body } = frontmatter(source);
  const steps: WorkflowStep[] = sections(body).map((section) => {
    const fields: Record<string, string> = {};
    for (const line of section.lines) {
      const { key, value } = keyValue(line);
      fields[key] = value;
    }
    return {
      id: section.heading,
      icon: fields.icon ?? "",
      title: section.heading,
      subtitle: fields.subtitulo || fields.titulo || "",
      description: fields.descricao ?? "",
      link:
        fields.link && fields.caso
          ? { href: `${pageHref.pratica}#${fields.caso}`, label: fields.link }
          : undefined,
    };
  });
  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    intro,
    details: { href: pageHref.workflow, label: meta.detailsLabel ?? "" },
    steps,
  };
}

export const workflow = parseWorkflow(workflowSource, introduction);

function Subtitle({ children }: { children?: ReactNode }) {
  return <p className="flow-subtitle">{children}</p>;
}

export function Workflow({
  showDetailsLink = true,
  headingLevel = 2,
}: {
  showDetailsLink?: boolean;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const StepHeading = headingLevel === 1 ? "h2" : "h3";

  return (
    <section className="practice workflow-section" id="fluxo">
      <div className="section-head">
        <div>
          <p className="eyebrow">{workflow.eyebrow}</p>
          <Heading>{workflow.title}</Heading>
        </div>
        <div className="flow-intro">
          <MarkdownContent
            components={{
              h1: Subtitle,
              h2: Subtitle,
              h3: Subtitle,
              h4: Subtitle,
              h5: Subtitle,
              h6: Subtitle,
            }}
          >
            {workflow.intro}
          </MarkdownContent>
        </div>
        {showDetailsLink && (
          <a className="button workflow-cta" href={workflow.details.href}>
            {workflow.details.label}
          </a>
        )}
      </div>
      <ol className="workflow">
        {workflow.steps.map((step) => (
          <li key={step.id}>
            <span className="step-icon" aria-hidden="true">
              {step.icon}
            </span>
            <StepHeading>{step.title}</StepHeading>
            {step.subtitle && <p className="step-subtitle">{step.subtitle}</p>}
            {step.description && <p>{step.description}</p>}
            {step.link && (
              <a className="flow-ref" href={step.link.href}>
                {step.link.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
