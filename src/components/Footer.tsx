import { pageHref, site } from "../content/site";

export function Footer() {
  return (
    <footer>
      <a className="brand" href={`${pageHref.home}#main`}>
        {site.brand}
      </a>
      <span className="footer-note">
        © {new Date().getFullYear()} {site.footer.author}
        {site.footer.taglines.map((tagline) => ` · ${tagline}`).join("")}
      </span>
    </footer>
  );
}
