import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { generatePages } from "../scripts/generate-pages";
import { pageFile, pages } from "../src/pages";

describe("site pages", () => {
  test("registers unique slugs with the home page at the root", () => {
    const slugs = pages.map((page) => page.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const home = pages.find((page) => page.path === "/");
    expect(home?.slug).toBe("index");
    expect(pages.every((page) => page.title && page.description)).toBe(true);
  });

  test("generates an HTML entry and client script for every registered page", async () => {
    const dir = await mkdtemp(join(tmpdir(), "ladydebug-pages-"));
    try {
      const files = await generatePages(dir, "../src");
      expect(files).toHaveLength(pages.length);
      for (const page of pages) {
        const html = await Bun.file(join(dir, pageFile(page))).text();
        expect(html).toContain(`<script type="module" src="./${page.slug}.entry.tsx">`);
        expect(html).toContain('<div id="root">');
        expect(html).toContain(`<title>${page.title.replace(/&/g, "&amp;")}</title>`);

        const entry = await Bun.file(join(dir, `${page.slug}.entry.tsx`)).text();
        expect(entry).toContain(`../src/components/${page.componentName}`);
        expect(entry).toContain("createRoot");
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  for (const page of pages.filter((candidate) => candidate.slug !== "index")) {
    test(`${pageFile(page)} has one heading and marks itself in the navigation`, () => {
      const html = renderToStaticMarkup(<page.component />);
      expect(html.match(/<h1[ >]/g)).toHaveLength(1);
      expect(html).toContain(`href="./${pageFile(page)}" aria-current="page"`);
    });
  }
});
