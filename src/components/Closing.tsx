import { links } from "../data/site";
import { ExternalLink } from "./ExternalLink";

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div>
        <h2 id="closing-title">Good work grows when it's shared.</h2>
        <p>Explore the code, read the docs, or follow what I build next.</p>
      </div>
      <ExternalLink className="button" href={links.github}>
        Let's connect on GitHub <span aria-hidden="true">↗</span>
      </ExternalLink>
    </section>
  );
}
