import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { About } from "../src/components/About";

describe("about section", () => {
  test("links to the full career page", () => {
    const html = renderToStaticMarkup(<About />);
    expect(html).toMatch(/<a class="text-link" href="\.\/trajetoria\.html">[^<]+<\/a>/);
  });
});
