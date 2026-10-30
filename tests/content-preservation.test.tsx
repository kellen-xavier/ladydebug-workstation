import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/App";

const normalize = (text: string) => text.replace(/©\s*\d{4}/g, "©YEAR").replace(/\s/g, "");

describe("portfolio content preservation", () => {
  test("preserves all existing page copy when content moves out of the layout", async () => {
    const original = await Bun.file(
      new URL("./fixtures/portfolio-text.txt", import.meta.url),
    ).text();
    const html = renderToStaticMarkup(<App />);
    expect(normalize(html.replace(/<[^>]*>/g, ""))).toBe(normalize(original));
  });
});
