import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/App";
import { Hero } from "../src/components/Hero";
import { Work } from "../src/components/Work";

describe("portfolio design priorities", () => {
  test("places the about section immediately after topics and before the work examples", () => {
    const html = renderToStaticMarkup(<App />);
    expect(/<ul class="topics">[\s\S]*?<\/ul><section class="about" id="sobre">/.test(html)).toBe(
      true,
    );
    expect(html.match(/id="sobre"/g)).toHaveLength(1);
    const positions = ["sobre", "pratica", "fluxo", "projetos"].map((id) =>
      html.indexOf(`id="${id}"`),
    );
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((first, second) => first - second));
  });

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
