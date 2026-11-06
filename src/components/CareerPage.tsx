import { pageHref } from "../content/site";
import careerSource from "../content/trajetoria.md" with { type: "text" };
import { frontmatter, keyValue, sections } from "./contentFormat";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type CareerEntry = {
  end: string;
  period: string;
  role: string;
  organization: string;
  kind: string;
  description: string;
  cases?: string[];
};

const caseTitle = (id: string) => id.replace(/^./, (letter) => letter.toUpperCase());

/**
 * Reads src/content/trajetoria.md: front matter (intro, highlight and "before"
 * blocks), a "## Foco" list for the highlight, and one "## Role" section per
 * timeline entry with "- periodo / organizacao / fim / tipo / descricao / casos".
 */
function parseCareer(source: string) {
  const { meta, body } = frontmatter(source);
  const secs = sections(body);
  const focus = secs.find((section) => section.heading === "Foco")?.lines ?? [];
  const timeline: CareerEntry[] = secs
    .filter((section) => section.heading !== "Foco")
    .map((section) => {
      const fields: Record<string, string> = {};
      for (const line of section.lines) {
        const { key, value } = keyValue(line);
        fields[key] = value;
      }
      const cases = fields.casos ? fields.casos.split(",").map((id) => id.trim()) : undefined;
      return {
        role: section.heading,
        period: fields.periodo ?? "",
        organization: fields.organizacao ?? "",
        end: fields.fim ?? "",
        kind: fields.tipo ?? "",
        description: fields.descricao ?? "",
        ...(cases ? { cases } : {}),
      };
    });

  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    intro: meta.intro ?? "",
    practiceLinkLabel: meta.practiceLinkLabel ?? "",
    highlight: {
      eyebrow: meta.highlightEyebrow ?? "",
      title: meta.highlightTitle ?? "",
      description: meta.highlightDescription ?? "",
      focus,
    },
    timeline,
    before: {
      eyebrow: meta.beforeEyebrow ?? "",
      title: meta.beforeTitle ?? "",
      description: meta.beforeDescription ?? "",
    },
  };
}

export const career = parseCareer(careerSource);

export function CareerPage() {
  const { highlight } = career;
  return (
    <PageLayout current="trajetoria">
      <PageHead
        eyebrow={career.eyebrow}
        title={career.title}
        intro={career.intro}
        className="career-page-head"
      />

      <section
        className={
          highlight.focus.length > 0
            ? "career-highlight"
            : "career-highlight career-highlight--full"
        }
      >
        <div>
          <p className="eyebrow">{highlight.eyebrow}</p>
          <h2>{highlight.title}</h2>
          <p>{highlight.description}</p>
        </div>
        {highlight.focus.length > 0 && (
          <ul>
            {highlight.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
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
