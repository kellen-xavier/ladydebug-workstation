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
  description: string;
  href: string;
  linkLabel: string;
};

/**
 * Reads src/content/fluxo-passos.md (front matter + one "## <id>" section per
 * step, with "- icon / titulo / descricao / link"); each step id links to its
 * case on the practice page. The intro prose stays in src/content/fluxo.md.
 */
function parseWorkflow(source: string, intro: string) {
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
      title: fields.titulo ?? "",
      description: fields.descricao ?? "",
      href: `${pageHref.pratica}#${section.heading}`,
      linkLabel: fields.link ?? "",
    };
  });
  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    titleEmphasis: meta.titleEmphasis ?? "",
    intro,
    details: { href: pageHref.workflow, label: meta.detailsLabel ?? "" },
    steps,
    cycle: {
      icon: meta.cycleIcon ?? "",
      description: meta.cycleDescription ?? "",
      href: "#fluxo",
      linkLabel: meta.cycleLinkLabel ?? "",
    },
  };
}

export const workflow = parseWorkflow(workflowSource, introduction);

function Subtitle({ children }: { children?: ReactNode }) {
  return <p className="flow-subtitle">{children}</p>;
}

export function Workflow({ showDetailsLink = true }: { showDetailsLink?: boolean }) {
  return (
    <section className="practice" id="fluxo">
      <div className="section-head">
        <div>
          <p className="eyebrow">{workflow.eyebrow}</p>
          <h2>
            {workflow.title}
            <br />
            <em>{workflow.titleEmphasis}</em>
          </h2>
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
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <a className="flow-ref" href={step.href}>
              {step.linkLabel}
            </a>
          </li>
        ))}
      </ol>
      <p className="cycle">
        <span aria-hidden="true">{workflow.cycle.icon}</span>
        <strong>{workflow.cycle.description}</strong>
        <a href={workflow.cycle.href}>{workflow.cycle.linkLabel}</a>
      </p>
    </section>
  );
}
