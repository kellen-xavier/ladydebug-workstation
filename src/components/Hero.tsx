import pixelDesk from "../assets/pixel-desk.png";
import { links } from "../data/site";
import { ExternalLink } from "./ExternalLink";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow">★ Kellen Xavier — LadyDebug ★</p>
        <h1 id="hero-title">
          Welcome to my<br />
          <em>little web corner.</em>
        </h1>
        <p className="intro">
          <strong>Software &amp; Quality Engineering.</strong>
          <br />
          I'm Kellen, also known as <strong>LadyDebug</strong>. I connect software development, test
          automation, and documentation — and share what I learn along the way.
        </p>
        <div className="actions">
          <a className="button" href="#projects">
            Explore my projects <span aria-hidden="true">↓</span>
          </a>
          <ExternalLink className="text-link" href={links.github}>Find me on GitHub ↗</ExternalLink>
        </div>
      </div>
      <figure className="pixel-scene">
        <img
          src={pixelDesk}
          alt="Pixel art of a retro computer desk with a pink mug and floppy disk"
          width={1536}
          height={1024}
        />
        <figcaption>code · test · document · repeat</figcaption>
      </figure>
    </section>
  );
}
