import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "../src/components/Header";
import { HomePage } from "../src/components/HomePage";
import { PracticePage } from "../src/components/PracticePage";
import { projects } from "../src/components/Projects";
import { Workflow } from "../src/components/Workflow";
import { workCases } from "../src/content/trabalhos";

const markup = () => renderToStaticMarkup(<HomePage />);

describe("work portfolio", () => {
  test("keeps the home anchors used by the navigation", () => {
    const html = markup();
    for (const id of ["sobre", "mapa"]) {
      expect(html).toContain(`href="./index.html#${id}"`);
      expect(html).toContain(`id="${id}"`);
    }
  });

  test("renders the reviewed cases with nested evidence disclosures", () => {
    const html = renderToStaticMarkup(<PracticePage />);
    for (const id of ["mobile", "cadastro", "unity"]) {
      const caseHtml = html.match(
        new RegExp(`<details[^>]+id="${id}"[^>]*>([\\s\\S]*?)</details>\\s*</div>\\s*</details>`),
      )?.[1];
      expect(caseHtml).toBeDefined();
      expect(caseHtml).toMatch(/<details class="provenance">/);
      expect(caseHtml).toMatch(/<summary>[^<]+<\/summary>/);
    }
  });

  test("preserves the workflow steps and links to the practice page", () => {
    const html = renderToStaticMarkup(<Workflow />);
    expect(html.match(/<ol class="workflow">[\s\S]*?<li>/)?.length).toBeGreaterThan(0);
    for (const id of ["mobile", "cadastro", "backend", "unity"]) {
      expect(html).toContain(`href="./pratica.html#${id}"`);
    }
  });

  test("includes the services website contribution and published site link", () => {
    const siteWeb = workCases.find((work) => work.id === "site-web");
    expect(siteWeb).toBeDefined();
    expect(siteWeb?.period).toBe("2026");
    const html = renderToStaticMarkup(<PracticePage />);
    expect(html).toContain('href="https://elementarprojetos.com.br"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test("includes documented mobile and Unity contributions", () => {
    expect(workCases.find((work) => work.id === "mobile")).toBeDefined();
    const unity = workCases.find((work) => work.id === "unity");
    expect(unity).toBeDefined();
    expect(unity?.period).toBe("set. 2023 – mar. 2024");
  });

  test("includes Bot Planner with a public URL", () => {
    const planner = projects.find((project) => project.url.endsWith("/ladydebug-bot-planner"));
    expect(planner).toBeDefined();
    expect(markup()).toContain('href="https://github.com/kellen-xavier/ladydebug-bot-planner"');
  });

  test("renders the brand link", () => {
    expect(renderToStaticMarkup(<Header />)).toMatch(/<a class="brand"[^>]+href=/);
  });
});
