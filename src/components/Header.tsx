export function Header({ homeHref = "" }: { homeHref?: string }) {
  return (
    <header>
      <a className="brand" href={`${homeHref}#main`}>
        {site.brand}
      </a>
      <nav aria-label={site.navigationLabel}>
        {site.navigation.map((item) => (
          <a key={item.href} href={`${homeHref}${item.href}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

import { site } from "../content/site";
