import { site } from "../content/site";
import { ExternalLink } from "./ExternalLink";

export function Footer({ homeHref = "" }: { homeHref?: string }) {
  return (
    <footer>
      <a className="brand" href={`${homeHref}#main`}>
        {site.brand}
      </a>
      <span>
        © {new Date().getFullYear()} {site.footer.author}
      </span>
      <span>
        {site.footer.socialLinks.map((link, index) => (
          <span key={link.href}>
            {index > 0 && " · "}
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          </span>
        ))}
      </span>
      <ul className="web-badges" aria-label={site.footer.badgesLabel}>
        {site.footer.badges.map(([first, second]) => (
          <li key={first}>
            {first}
            <br />
            {second}
          </li>
        ))}
      </ul>
    </footer>
  );
}
