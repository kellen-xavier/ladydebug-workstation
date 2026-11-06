import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CareerPage, career } from "../src/components/CareerPage";
import { workCases } from "../src/content/trabalhos";

const html = renderToStaticMarkup(<CareerPage />);
const text = (markup: string) =>
  markup
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

describe("career page", () => {
  test("renders a single page heading", () => {
    expect(html.match(/<h1>/g)).toHaveLength(1);
  });

  test("highlights software engineering and QA in alignment with the CV", () => {
    const postgraduate = career.timeline.find((entry) => entry.organization.includes("Unisinos"));
    expect(postgraduate?.end).toBe("2025-12");
    const highlight = html.match(
      /<section class="career-highlight(?: career-highlight--full)?">([\s\S]*?)<\/section>/,
    )?.[1];
    expect(career.highlight.title).toBe("Engenharia de Software | QA");
    expect(highlight).toContain("desenvolvimento");
    expect(highlight).toContain("testes");
  });

  test("describes DBServer and Vortigo responsibilities from the CV", () => {
    const dbserver = career.timeline.find((entry) => entry.organization === "DBServer");
    const vortigo = career.timeline.find((entry) => entry.organization === "Vortigo Digital");
    expect(dbserver?.role).toBe("Analista de Testes / Quality Engineer");
    expect(dbserver?.description).toContain("Selenium WebDriver");
    expect(dbserver?.description).toContain("Perfecto");
    expect(vortigo?.description).toContain("redução gradual");
    expect(vortigo?.description).toContain("DBServer");
  });

  test("associates the services website contribution with the independent work", () => {
    const independent = career.timeline.find(
      (entry) => entry.organization === "Atuação independente",
    );
    expect(independent?.cases).toContain("site-web");
  });

  test("lists the timeline from the most recent activity", () => {
    const ends = career.timeline.map((entry) => (entry.end === "present" ? "9999-12" : entry.end));
    expect(ends).toEqual([...ends].sort().reverse());
  });

  test("links contributions to existing case studies", () => {
    const ids = workCases.map((work) => work.id);
    const linked = career.timeline.flatMap((entry) => entry.cases ?? []);
    expect(linked.length).toBeGreaterThan(0);
    for (const id of linked) {
      expect(ids).toContain(id);
      expect(html).toContain(`href="./pratica.html#${id}"`);
    }
  });

  test("summarizes the earlier support and front-end work briefly", () => {
    const before = html.match(/<section class="career-before">([\s\S]*?)<\/section>/)?.[1] ?? "";
    expect(text(before)).toContain("2018");
    expect(text(career.before.description).split(" ").length).toBeLessThanOrEqual(60);
  });
});
