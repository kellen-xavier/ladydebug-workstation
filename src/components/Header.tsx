import { useEffect, useRef, useState } from "react";
import { type PageId, pageHref, site } from "../content/site";
import { SocialLinks } from "./SocialLinks";

export function Header({ current = "home" }: { current?: PageId }) {
  const [open, setOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const setupRef = useRef<HTMLDivElement>(null);
  const setupButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!setupRef.current?.contains(event.target as Node)) setSetupOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

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
            {site.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  item.page === current && !item.href.includes("#") ? "page" : undefined
                }
              >
                {item.label}
              </a>
            ))}
            {/* Group navigation links are not form controls, so a fieldset is unsuitable. */}
            {/* biome-ignore lint/a11y/useSemanticElements: A navigation group needs a non-form container. */}
            <div
              className="nav-group"
              role="group"
              ref={setupRef}
              onMouseEnter={() => setSetupOpen(true)}
              onMouseLeave={() => setSetupOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setSetupOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSetupOpen(false);
                  setupButtonRef.current?.focus();
                }
              }}
            >
              <button
                type="button"
                className="nav-group-trigger"
                ref={setupButtonRef}
                aria-expanded={setupOpen}
                aria-controls="setup-submenu"
                onClick={() => setSetupOpen(true)}
                onFocus={() => setSetupOpen(true)}
              >
                {site.setupNavigation[0].label}
                <span aria-hidden="true" className="nav-group-chevron">
                  ⌄
                </span>
              </button>
              <div className="nav-submenu" id="setup-submenu" hidden={!setupOpen}>
                {site.setupNavigation.map((item) => (
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
          </nav>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
