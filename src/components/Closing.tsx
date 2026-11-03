import { links, site } from "../content/site";
import { ExternalLink } from "./ExternalLink";

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div>
        <h2 id="closing-title">{site.closing.title}</h2>
        <p>{site.closing.description}</p>
      </div>
      <ExternalLink className="button" href={links.blog}>
        {site.closing.linkLabel}
      </ExternalLink>
    </section>
  );
}
