import { workflow } from "../content/fluxo";

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
        <p className="flow-intro">{workflow.intro}</p>
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
