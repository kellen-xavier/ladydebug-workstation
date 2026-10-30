export function Header() {
  return (
    <header>
      <a className="brand" href="#main">
        {site.brand}
      </a>
      <nav aria-label={site.navigationLabel}>
        {site.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

import { site } from "../content/site";
