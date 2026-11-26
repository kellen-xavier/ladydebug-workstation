import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Work } from "../src/components/Work";
import { parseWorkflow, Workflow, workflow } from "../src/components/Workflow";
import { workCases } from "../src/content/trabalhos";

describe("content-driven portfolio sections", () => {
  test("renders a newly registered Markdown work report without changing the layout", () => {
    workCases.push({
      id: "new-work",
      stack: "TypeScript",
      period: "2026",
      summary: "An editable contribution preview.",
      content: "# New work\n\nAn **editable** report.\n\n## References\n\nSource document.",
    });
    try {
      const html = renderToStaticMarkup(<Work />);
      expect(html).toContain('id="new-work"');
      expect(html).toContain('href="#new-work"');
      expect(html).toContain('class="work-item"');
      expect(html).toContain("<strong>");
      expect(html).toMatch(/<details class="provenance">\s*<summary>[^<]+<\/summary>/);
    } finally {
      workCases.pop();
    }
  });

  test("uses Markdown headings as step titles and omits links without a case reference", () => {
    const source = `---\ntitle: Workflow\n---\n\n## Analyze\n- subtitulo: Find the issue\n- descricao: Inspect the process.\n\n## Improve\n- subtitulo: Deliver a change\n- descricao: Verify it.\n- caso: backend\n- link: Inspect the case\n`;
    const parsed = parseWorkflow(source, "");
    expect(parsed.steps).toHaveLength(2);
    expect(parsed.steps[0]).toMatchObject({
      title: "Analyze",
      subtitle: "Find the issue",
      description: "Inspect the process.",
    });
    expect(parsed.steps[0]?.link).toBeUndefined();
    expect(parsed.steps[1]?.link).toEqual({
      href: "./pratica.html#backend",
      label: "Inspect the case",
    });
  });

  test("accepts any number of steps with optional fields and title aliases", () => {
    const source = `## First\n- subtitulo: Plan\n- descricao: Inspect.\n\n## Second\n- titulo: Build\n- descricao: Deliver.\n\n## Third\n- icon: ↻\n- titulo:\n- descricao:\n- link:\n\n## Fourth\n- icon: ↻\n\n## Fifth\n- titulo: Review\n\n## Sixth\n- descricao: Learn.\n`;
    const parsed = parseWorkflow(source, "");
    expect(parsed.steps).toHaveLength(6);
    expect(parsed.steps.map((step) => step.title)).toEqual([
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
    ]);
    expect(parsed.steps[1]?.subtitle).toBe("Build");
    expect(parsed.steps[2]).toMatchObject({
      icon: "↻",
      subtitle: "",
      description: "",
      link: undefined,
    });
  });

  test("renders the workflow introduction as Markdown with paragraphs and internal links", () => {
    const original = workflow.intro;
    workflow.intro = "A **short** process note.\n\nA [work example](#mobile).";
    try {
      const html = renderToStaticMarkup(<Workflow />);
      const introduction = html.match(/<div class="flow-intro">([\s\S]*?)<\/div>/)?.[1];
      expect(introduction).toBeDefined();
      expect(introduction).toMatch(/<p>[^<]*<strong>[^<]+<\/strong>[^<]*<\/p>/);
      expect(introduction).toMatch(/<p>[^<]*<a href="#mobile">[^<]+<\/a>[^<]*<\/p>/);
    } finally {
      workflow.intro = original;
    }
  });
});
