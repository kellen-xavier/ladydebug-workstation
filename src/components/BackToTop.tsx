import { useEffect, useState } from "react";
import { site } from "../content/site";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 320);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label={site.backToTopLabel}
      title={site.backToTopLabel}
      onClick={scrollToTop}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
