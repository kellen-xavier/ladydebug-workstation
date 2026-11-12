import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "../src/components/Header";
import { links } from "../src/content/site";

const navLinks = (html: string) => {
  const nav = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
  return [...nav.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map(([, href, label]) => ({
    href,
    label,
  }));
};

describe("site navigation", () => {
  test("renders every primary navigation destination", () => {
    expect(navLinks(renderToStaticMarkup(<Header />))).toHaveLength(7);
  });

  test("links each item to a page or to an anchor on the home page", () => {
    const hrefs = navLinks(renderToStaticMarkup(<Header />)).map((link) => link.href);
    expect(hrefs).toEqual([
      "./index.html#mapa",
      "./trajetoria.html",
      "./pratica.html",
      "./workflow.html",
      "./setup.html",
      "./ferramentas.html",
      "./games.html",
    ]);
  });

  test("offers a collapsible menu toggle that controls the nav tools", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain('class="menu-toggle"');
    expect(html).toContain('aria-controls="header-tools"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('id="header-tools"');
    // the links stay in the DOM so the collapse is purely presentational
    expect(navLinks(html)).toHaveLength(7);
  });

  test("groups Setup destinations under an accessible trigger", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain('aria-controls="setup-submenu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('id="setup-submenu"');
    expect(html).toContain('href="./ferramentas.html"');
    expect(html).toContain('href="./games.html"');
  });

  test("uses the brand to reach the about section from every page", () => {
    for (const current of ["home", "setup"] as const) {
      expect(renderToStaticMarkup(<Header current={current} />)).toContain(
        'class="brand" href="./index.html#sobre"',
      );
    }
  });

  test("marks only the current page", () => {
    const html = renderToStaticMarkup(<Header current="setup" />);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    expect(html).toContain('href="./setup.html" aria-current="page"');
  });

  test("shows GitHub, LinkedIn and Blog as icon-only external links", () => {
    const html = renderToStaticMarkup(<Header />);
    for (const [label, href] of [
      ["GitHub", links.github],
      ["LinkedIn", links.linkedin],
      ["Blog", links.blog],
    ]) {
      const anchor = html.match(new RegExp(`<a[^>]+aria-label="${label}"[^>]*>([\\s\\S]*?)</a>`));
      expect(anchor?.[0]).toContain(`href="${href}"`);
      expect(anchor?.[0]).toContain('rel="noopener noreferrer"');
      expect(anchor?.[1]).toStartWith("<svg");
      expect((anchor?.[1] ?? "").replace(/<[^>]*>/g, "").trim()).toBe("");
    }
  });
});
