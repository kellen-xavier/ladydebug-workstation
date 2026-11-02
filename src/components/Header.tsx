import { type PageId, pageHref, site } from "../content/site";
import { SocialLinks } from "./SocialLinks";

export function Header({ current = "home" }: { current?: PageId }) {
  return (
    <header>
      <a className="brand" href={`${pageHref.home}#main`}>
        {site.brand}
      </a>
      <div className="header-tools">
        <nav aria-label={site.navigationLabel}>
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.page === current && !item.href.includes("#") ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <SocialLinks />
      </div>
    </header>
  );
}
