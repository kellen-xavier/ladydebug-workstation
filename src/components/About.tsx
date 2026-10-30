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
        <MarkdownContent
          part="body"
          components={{ blockquote: ({ children }) => <div className="education">{children}</div> }}
        >
          {about}
        </MarkdownContent>
      </div>
    </section>
  );
}
