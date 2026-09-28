import { links } from "../data/site";
import { Brand } from "./Brand";
import { ExternalLink } from "./ExternalLink";

export function Header() {
  return (
    <header>
      <Brand label="LadyDebug home" />
      <nav aria-label="Main navigation">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <ExternalLink className="nav-git" href={links.github}>
          GitHub ↗
        </ExternalLink>
        <ExternalLink href={links.blog}>My blog ↗</ExternalLink>
      </nav>
    </header>
  );
}
