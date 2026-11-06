import { useState } from "react";
import { type PageId, pageHref, site } from "../content/site";
import { SocialLinks } from "./SocialLinks";

export function Header({ current = "home" }: { current?: PageId }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <a className="brand" href={`${pageHref.home}#sobre`}>
        {site.brand}
      </a>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="header-tools"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">☰</span> {site.menuLabel}
      </button>
      <div className="header-tools" id="header-tools" data-open={open}>
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
