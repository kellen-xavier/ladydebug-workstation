import type { ReactNode } from "react";
import { workflow } from "../content/fluxo";
import { MarkdownContent } from "./MarkdownContent";

function Subtitle({ children }: { children?: ReactNode }) {
  return <p className="flow-subtitle">{children}</p>;
}

export function Workflow() {
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
        <a className="button workflow-cta" href={workflow.details.href}>
          {workflow.details.label}
        </a>
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
