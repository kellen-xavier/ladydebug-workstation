import { useEffect, useRef, useState } from "react";
import { type NavigationItem, type PageId, pageHref, site } from "../content/site";
import { SocialLinks } from "./SocialLinks";

function NavGroup({
  id,
  items,
  current,
}: {
  id: string;
  items: [NavigationItem, ...NavigationItem[]];
  current: PageId;
}) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!groupRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  return (
    // A navigation group contains links, not form fields.
    // biome-ignore lint/a11y/useSemanticElements: A fieldset would be invalid navigation markup.
    <div
      className="nav-group"
      role="group"
      ref={groupRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        type="button"
        className="nav-group-trigger"
        ref={buttonRef}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >
        {items[0].label}
        <span aria-hidden="true" className="nav-group-chevron">
          ⌄
        </span>
      </button>
      <div className="nav-submenu" id={id} hidden={!open}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={item.page === current ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Header({ current = "home" }: { current?: PageId }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrap header-inner">
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
            <a href={site.navigation[0].href}>{site.navigation[0].label}</a>
            <NavGroup id="work-submenu" items={site.workNavigation} current={current} />
            <NavGroup id="setup-submenu" items={site.setupNavigation} current={current} />
            <a
              href={site.navigation[1].href}
              aria-current={current === "contato" ? "page" : undefined}
            >
              {site.navigation[1].label}
            </a>
          </nav>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
