import { pageHref, site } from "../content/site";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <footer>
      <a className="brand" href={`${pageHref.home}#main`}>
        {site.brand}
      </a>
      <span>
        © {new Date().getFullYear()} {site.footer.author}
      </span>
      <span>
        {site.social.map((link, index) => (
          <span key={link.id}>
            {index > 0 && " · "}
            <ExternalLink href={link.href}>{link.label} ↗</ExternalLink>
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
