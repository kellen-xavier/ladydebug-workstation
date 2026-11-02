import pixelDesk from "../assets/pixel-desk.png";
import presentation from "../content/apresentacao.md" with { type: "text" };
import { site } from "../content/site";
import { MarkdownContent } from "./MarkdownContent";

export function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <MarkdownContent part="title">{presentation}</MarkdownContent>
        <MarkdownContent
          part="body"
          components={{ p: ({ children }) => <p className="intro">{children}</p> }}
        >
          {presentation}
        </MarkdownContent>
        <div className="actions">
          <a className="button" href={site.hero.action.href}>
            {site.hero.action.label}
          </a>
        </div>
      </div>
      <figure className="pixel-scene">
        <img src={pixelDesk} width="1536" height="1024" alt={site.hero.imageAlt} />
        <figcaption>{site.hero.imageCaption}</figcaption>
      </figure>
    </section>
  );
}
