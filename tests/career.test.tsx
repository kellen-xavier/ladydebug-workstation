import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CareerPage, career } from "../src/components/CareerPage";
import { workCases } from "../src/content/trabalhos";

const html = renderToStaticMarkup(<CareerPage />);
describe("career page", () => {
  test("renders a single page heading", () => {
    expect(html.match(/<h1>/g)).toHaveLength(1);
  });

  test("keeps the postgraduate completion date and career highlight", () => {
    const postgraduate = career.timeline.find((entry) => entry.organization.includes("Unisinos"));
    expect(postgraduate?.end).toBe("2025-12");
    const highlight = html.match(
      /<section class="career-highlight(?: career-highlight--full)?">([\s\S]*?)<\/section>/,
    )?.[1];
    expect(highlight).toBeDefined();
    expect(highlight).toContain("<h2>");
  });

  test("keeps DBServer and Vortigo career entries", () => {
    const dbserver = career.timeline.find((entry) => entry.organization === "DBServer");
    const vortigo = career.timeline.find((entry) => entry.organization === "Vortigo Digital");
    expect(dbserver).toBeDefined();
    expect(vortigo).toBeDefined();
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
});
