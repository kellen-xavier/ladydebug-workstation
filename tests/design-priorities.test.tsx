import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "../src/components/Hero";
import { Work } from "../src/components/Work";

describe("portfolio design priorities", () => {
  test("introduces the author, experience, and work in one short paragraph", () => {
    const html = renderToStaticMarkup(<Hero />);
    const paragraphs = html.match(/<p class="intro">[\s\S]*?<\/p>/g) ?? [];
    expect(paragraphs).toHaveLength(1);
    const text = paragraphs.join(" ").replace(/<[^>]*>/g, "");
    expect(text).toContain("Kellen Xavier");
    expect(text).toContain("7 anos");
    expect(text).toContain("Engenharia de Software");
    expect(text.split(/\s+/).length).toBeLessThanOrEqual(55);
  });

  test("includes a contribution preview inside each closed report summary", () => {
    const html = renderToStaticMarkup(<Work />);
    for (const id of ["mobile", "backend", "cadastro", "unity"]) {
      const summary = html.match(
        new RegExp(`<details[^>]+id="${id}"[^>]*><summary>([\\s\\S]*?)</summary>`),
      )?.[1];
      expect(summary).toBeDefined();
      expect(summary).toMatch(/<span class="case-excerpt">[^<]+<\/span>/);
    }
  });
});
