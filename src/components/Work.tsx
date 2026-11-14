import { useEffect, useState } from "react";
import { workCases } from "../content/trabalhos";
import copy from "../content/trabalhos.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";

const metadata = copy.match(/^---\n([\s\S]*?)\n---\n/);
if (!metadata) throw new Error("Missing work page metadata");
const labels = Object.fromEntries(
  (metadata[1] ?? "").split("\n").map((line) => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator), line.slice(separator + 1).trim()];
  }),
);
const [introduction = "", method = ""] = copy
  .slice(metadata[0].length)
  .trim()
  .split(/\n(?=## )/, 2);

function selectedFromHash() {
  if (typeof window === "undefined") return null;
  const id = decodeURIComponent(window.location.hash.slice(1)).replace(/^trabalhos\//, "");
  return workCases.some((work) => work.id === id) ? id : null;
}

export function Work({ titleAs: Title = "h2" }: { titleAs?: "h1" | "h2" }) {
  const [selected, setSelected] = useState<string | null>(selectedFromHash);

  useEffect(() => {
    const update = () => {
      const next = selectedFromHash();
      setSelected(next);
      requestAnimationFrame(() => document.getElementById(next ?? "pratica")?.scrollIntoView());
    };
    window.addEventListener("hashchange", update);
    if (window.location.hash) update();
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return (
    <section className="practice" id="pratica">
      <div hidden={selected !== null}>
        <div className="work-intro">
          <p className="eyebrow">{labels.eyebrow}</p>
          <MarkdownContent components={{ h1: ({ children }) => <Title>{children}</Title> }}>
            {introduction}
          </MarkdownContent>
        </div>
        <div className="work-grid">
          {workCases.map((work) => (
            <article className="work-item" key={work.id}>
              <a href={`#${work.id}`}>
                <div className="work-cover" aria-hidden="true">
                  <div className="work-cover-window">
                    <small>{work.stack}</small>
                    <MarkdownContent
                      part="title"
                      components={{ h1: ({ children }) => <strong>{children}</strong> }}
                    >
                      {work.content}
                    </MarkdownContent>
                    <span className="work-cover-lines" />
                  </div>
                </div>
                <div className="work-card-copy">
                  <MarkdownContent
                    part="title"
                    components={{ h1: ({ children }) => <h2>{children}</h2> }}
                  >
                    {work.content}
                  </MarkdownContent>
                  <p className="work-meta">
                    {work.stack} · {work.period}
                  </p>
                  <p className="work-summary">{work.summary}</p>
                  <span className="work-link-label">{labels.cardLink}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="work-method">
          <MarkdownContent>{method}</MarkdownContent>
        </div>
      </div>
      {workCases.map((work, index) => {
        const next = workCases[(index + 1) % workCases.length] ?? work;
        return (
          <article className="work-detail" id={work.id} key={work.id} hidden={selected !== work.id}>
            <a className="work-back" href="#pratica">
              {labels.backLink}
            </a>
            <div className="work-detail-cover" aria-hidden="true">
              <div className="work-cover-window">
                <small>{work.stack}</small>
                <MarkdownContent
                  part="title"
                  components={{ h1: ({ children }) => <strong>{children}</strong> }}
                >
                  {work.content}
                </MarkdownContent>
                <span className="work-cover-lines" />
              </div>
            </div>
            <div className="work-detail-grid">
              <div className="work-detail-copy">
                <MarkdownContent part="title">{work.content}</MarkdownContent>
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
              <aside className="work-facts">
                <p>{work.stack}</p>
                <p>{work.period}</p>
                <p>{work.summary}</p>
              </aside>
            </div>
            <nav className="work-next" aria-label={labels.nextLink}>
              <a href={`#${next.id}`}>
                <span>{labels.nextLink}</span>
                <MarkdownContent
                  part="title"
                  components={{ h1: ({ children }) => <h2>{children}</h2> }}
                >
                  {next.content}
                </MarkdownContent>
              </a>
            </nav>
          </article>
        );
      })}
    </section>
  );
}
