import { useEffect } from "react";

/** Scrolls to the element in the URL hash and opens it when it is a <details>. */
export function useHashReveal() {
  useEffect(() => {
    const reveal = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
      }
      target.scrollIntoView();
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
}
