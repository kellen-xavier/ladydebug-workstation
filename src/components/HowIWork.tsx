import { site } from "../content/site";

export function HowIWork() {
  const { workflow, setup } = site.howIWork;
  return (
    <section className="section highlights" id="como-trabalho">
      <article className="panel">
        <p className="eyebrow">{workflow.eyebrow}</p>
        <h2>{workflow.title}</h2>
        <p>{workflow.description}</p>
        <div className="panel-links">
          <a href={workflow.link.href}>{workflow.link.label}</a>
        </div>
      </article>
      <article className="panel">
        <p className="eyebrow">{setup.eyebrow}</p>
        <h2>{setup.title}</h2>
        <ul className="chips">
          {setup.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <div className="panel-links">
          {setup.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
