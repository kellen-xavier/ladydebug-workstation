import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HomePage } from "../src/components/HomePage";
import { Work } from "../src/components/Work";

describe("portfolio design priorities", () => {
  test("places the about section right after the welcome and only once", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toMatch(
      /<section class="hero">[\s\S]*?<\/section><section class="about" id="sobre">/,
    );
    expect(html.match(/id="sobre"/g)).toHaveLength(1);
  });

  test("includes a contribution preview inside each closed report summary", () => {
    const html = renderToStaticMarkup(<Work />);
    for (const id of ["web", "mobile", "backend", "cadastro", "site-web", "unity"]) {
      const summary = html.match(
        new RegExp(`<details[^>]+id="${id}"[^>]*><summary>([\\s\\S]*?)</summary>`),
      )?.[1];
      expect(summary).toBeDefined();
      expect(summary).toMatch(/<span class="case-excerpt">[^<]+<\/span>/);
    }
  });
});
