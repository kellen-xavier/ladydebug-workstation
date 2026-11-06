import { site } from "../content/site";
import about from "../content/sobre.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";

export function About() {
  return (
    <section className="about" id="sobre">
      <div>
        <p className="eyebrow">{site.about.eyebrow}</p>
        <MarkdownContent part="title">{about}</MarkdownContent>
      </div>
      <div className="about-text">
        <MarkdownContent part="body">{about}</MarkdownContent>
        <a className="text-link" href={site.about.careerLink.href}>
          {site.about.careerLink.label}
        </a>
      </div>
    </section>
  );
}
