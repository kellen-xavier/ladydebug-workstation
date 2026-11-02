import { pageHref } from "../content/site";
import { workCases } from "../content/trabalhos";
import { career } from "../content/trajetoria";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

const caseTitle = (id: string) =>
  workCases.find((work) => work.id === id)?.id.replace(/^./, (letter) => letter.toUpperCase()) ??
  id;

export function CareerPage() {
  const { highlight } = career;
  return (
    <PageLayout current="trajetoria">
      <PageHead eyebrow={career.eyebrow} title={career.title} intro={career.intro} />

      <section className="career-highlight">
        <div>
          <p className="eyebrow">{highlight.eyebrow}</p>
          <h2>{highlight.title}</h2>
          <p>{highlight.description}</p>
        </div>
        <ul>
          {highlight.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ol className="timeline">
        {career.timeline.map((entry) => (
          <li
            key={`${entry.organization}-${entry.end}`}
            className={entry.end === "present" ? "is-current" : `is-${entry.kind}`}
          >
            <p className="timeline-period">{entry.period}</p>
            <h3>{entry.role}</h3>
            <p className="timeline-org">{entry.organization}</p>
            <p className="timeline-text">{entry.description}</p>
            {entry.cases && (
              <ul className="case-links" aria-label={career.practiceLinkLabel}>
                {entry.cases.map((id) => (
                  <li key={id}>
                    <a href={`${pageHref.pratica}#${id}`}>{caseTitle(id)} →</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <section className="career-before">
        <div>
          <p className="eyebrow">{career.before.eyebrow}</p>
          <h2>{career.before.title}</h2>
        </div>
        <p>{career.before.description}</p>
      </section>
    </PageLayout>
  );
}
