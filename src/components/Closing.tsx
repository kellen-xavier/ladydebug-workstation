export function Closing() {
  return (
    <section className="closing">
      <div>
        <h2>{site.closing.title}</h2>
        <p>{site.closing.description}</p>
      </div>
      <ExternalLink className="button" href={links.blog}>
        {site.closing.linkLabel}
      </ExternalLink>
    </section>
  );
}

import { links, site } from "../content/site";
import { ExternalLink } from "./ExternalLink";
