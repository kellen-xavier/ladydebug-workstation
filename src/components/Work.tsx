import { site } from "../content/site";
import { workCases } from "../content/trabalhos";
import { MarkdownContent } from "./MarkdownContent";

export function Work() {
  return (
    <section className="practice" id="pratica">
      <div className="section-head">
        <div>
          <p className="eyebrow">{site.work.eyebrow}</p>
          <h2>{site.work.title}</h2>
        </div>
        <span className="badge">{site.work.badge}</span>
      </div>
      <p className="section-copy">{site.work.intro}</p>
      {workCases.map((work) => (
        <details className="case" id={work.id} key={work.id}>
          <summary>
            <MarkdownContent part="title" components={{ h1: ({ children }) => <>{children}</> }}>
              {work.content}
            </MarkdownContent>
            <span className="case-label">{work.stack}</span>
          </summary>
          <div className="case-body">
            <MarkdownContent
              part="body"
              disclosures
              components={{
                blockquote: ({ children }) => <div className="case-limit">{children}</div>,
              }}
            >
              {work.content}
            </MarkdownContent>
          </div>
        </details>
      ))}
      <p className="method">
        <strong>{site.work.methodLabel}</strong> {site.work.method}
      </p>
    </section>
  );
}
