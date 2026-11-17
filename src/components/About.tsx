import portrait from "../content/retrato.md" with { type: "text" };
import { site } from "../content/site";
import about from "../content/sobre.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";

export function About() {
  return (
    <section className="about" id="sobre" aria-labelledby="about-title">
      <div className="about-story">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <MarkdownContent
          part="title"
          components={{ h2: ({ children }) => <h2 id="about-title">{children}</h2> }}
        >
          {about}
        </MarkdownContent>
        <div className="about-text">
          <MarkdownContent part="body">{about}</MarkdownContent>
        </div>
        <a className="text-link" href={site.about.careerLink.href}>
          {site.about.careerLink.label}
        </a>
      </div>
      <figure className="about-portrait">
        <MarkdownContent>{portrait}</MarkdownContent>
      </figure>
    </section>
  );
}
