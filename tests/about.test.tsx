import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { About } from "../src/components/About";

describe("about section", () => {
  test("removes education cards and keeps the full career link", () => {
    const html = renderToStaticMarkup(<About />);

    expect(html).not.toContain('class="education-list"');
    expect(html).not.toContain("UNINTER");
    expect(html).not.toContain("Unisinos");
    expect(html).toContain(
      '<a class="text-link" href="./trajetoria.html">Ver trajetória completa →</a>',
    );
  });
});
