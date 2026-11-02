import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HomePage } from "../src/components/HomePage";

const normalize = (text: string) => text.replace(/©\s*\d{4}/g, "©YEAR").replace(/\s/g, "");

describe("portfolio content preservation", () => {
  test("matches the reviewed page copy after intentional content edits", async () => {
    const original = await Bun.file(
      new URL("./fixtures/portfolio-text.txt", import.meta.url),
    ).text();
    const html = renderToStaticMarkup(<HomePage />);
    expect(normalize(html.replace(/<[^>]*>/g, ""))).toBe(normalize(original));
  });
});
