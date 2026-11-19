import { useEffect, useRef } from "react";
import portrait from "../content/retrato.md" with { type: "text" };
import { site } from "../content/site";
import about from "../content/sobre.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";

export function About() {
  const portraitRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = portraitRef.current;
    if (!element || !window.IntersectionObserver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      element.animate([{ opacity: 0.65 }, { opacity: 1 }], {
        duration: 650,
        easing: "ease-out",
        fill: "both",
      });
      observer.disconnect();
      element.removeEventListener("pointerenter", reveal);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { threshold: 0.5, rootMargin: "0px 0px -8% 0px" },
    );
    const image = element.querySelector("img");
    const observe = () => {
      element.style.opacity = "0.65";
      element.addEventListener("pointerenter", reveal);
      observer.observe(element);
    };
    if (image && !image.complete) {
      image.addEventListener("load", observe, { once: true });
      image.addEventListener("error", observe, { once: true });
    } else {
      observe();
    }
    return () => {
      image?.removeEventListener("load", observe);
      image?.removeEventListener("error", observe);
      element.removeEventListener("pointerenter", reveal);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about" id="sobre" aria-labelledby="about-title">
      <div className="about-story">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <MarkdownContent
          part="title"
          components={{ h2: ({ children }) => <h2 id="about-title">{children}</h2> }}
        >
          {about}
        </MarkdownContent>
        <div className="about-text">
          <MarkdownContent part="body">{about}</MarkdownContent>
        </div>
        <a className="text-link" href={site.about.careerLink.href}>
          {site.about.careerLink.label}
        </a>
      </div>
      <figure className="about-portrait" ref={portraitRef}>
        <MarkdownContent>{portrait}</MarkdownContent>
      </figure>
    </section>
  );
}
