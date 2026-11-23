import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type PageId, pageHref, site } from "../content/site";
import "../styles/staggered-menu.css";

const items = [
  site.navigation[0],
  ...site.workNavigation,
  ...site.setupNavigation,
  site.navigation[1],
];

export function StaggeredMenu({ current, visible }: { current: PageId; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const openedOnceRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      setOpen(false);
      setActive(false);
    }
  }, [visible]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".staggered-menu-layer"));
    const labels = panel.querySelectorAll<HTMLElement>(".staggered-menu-item-label");
    animationRef.current?.kill();

    if (!open) {
      if (!openedOnceRef.current || !visible) {
        gsap.set([...layers, panel], { xPercent: 105 });
        setActive(false);
        return;
      }
      animationRef.current = gsap.to([panel, ...layers], {
        xPercent: 105,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.24,
        ease: "power2.in",
        onComplete: () => setActive(false),
      });
      return;
    }

    openedOnceRef.current = true;
    setActive(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(labels, { y: reduced ? 0 : 12, opacity: reduced ? 1 : 0 });
    if (reduced) {
      gsap.set([...layers, panel], { xPercent: 0 });
      return;
    }
    const timeline = gsap.timeline();
    layers.forEach((layer, index) => {
      timeline.to(layer, { xPercent: 0, duration: 0.3, ease: "power2.out" }, index * 0.04);
    });
    timeline.to(panel, { xPercent: 0, duration: 0.38, ease: "power2.out" }, 0.1);
    timeline.to(
      labels,
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: "power2.out" },
      0.22,
    );
    animationRef.current = timeline;
    return () => {
      timeline.kill();
    };
  }, [open, visible]);

  useEffect(() => {
    if (!open || !active) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      if (!links?.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        toggleRef.current?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      } else if (!event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, active]);

  return (
    <div className="staggered-menu" data-visible={visible} data-active={active} ref={rootRef}>
      {active && (
        <button
          aria-label={site.scrollMenu.closeLabel}
          className="staggered-menu-backdrop"
          onClick={() => setOpen(false)}
          tabIndex={-1}
          type="button"
        />
      )}
      <div className="staggered-menu-layer staggered-menu-layer-first" aria-hidden="true" />
      <div className="staggered-menu-layer staggered-menu-layer-second" aria-hidden="true" />
      <aside
        id="staggered-menu-panel"
        className="staggered-menu-panel"
        ref={panelRef}
        aria-hidden={!open}
        inert={!open}
      >
        <a className="staggered-menu-brand" href={pageHref.home}>
          {site.brand}
        </a>
        <nav aria-label={site.scrollMenu.navigationLabel}>
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.page === current && item.page !== "home" ? "page" : undefined}
                >
                  <span className="staggered-menu-item-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="staggered-menu-socials">
          <span>{site.socialLabel}</span>
          <ul>
            {site.social.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <button
        ref={toggleRef}
        type="button"
        className="staggered-menu-toggle"
        aria-label={open ? site.scrollMenu.closeLabel : site.scrollMenu.openLabel}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="staggered-menu-icon" aria-hidden="true" data-open={open}>
          <span className="staggered-menu-icon-line" />
          <span className="staggered-menu-icon-line" />
          <span className="staggered-menu-icon-line" />
        </span>
      </button>
    </div>
  );
}
