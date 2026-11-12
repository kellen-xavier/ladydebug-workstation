import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Work } from "../src/components/Work";
import { Workflow, workflow } from "../src/components/Workflow";
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
      expect(html).toMatch(
        /<summary>[\s\S]*?<span class="case-label">[^<]+<\/span>\s*<span class="case-period">[^<]+<\/span>/,
      );
      expect(html).toContain("<strong>");
      expect(html).toMatch(/<span class="case-excerpt">[^<]+<\/span>/);
      expect(html).toMatch(/<details class="provenance">\s*<summary>[^<]+<\/summary>/);
    } finally {
      workCases.pop();
    }
  });

  test("renders workflow steps and anchor links from the editable structured content", () => {
    workflow.steps.push({
      id: "new-step",
      icon: "✓",
      title: "An editable step",
      description: "An editable description.",
      href: "#mobile",
      linkLabel: "Inspect the example",
    });
    try {
      const html = renderToStaticMarkup(<Workflow />);
      expect(html.match(/<h3>/g)).toHaveLength(workflow.steps.length);
      expect(html).toMatch(/<p>[^<]+<\/p>/);
      expect(html).toMatch(/<a class="flow-ref" href="#mobile">[^<]+<\/a>/);
    } finally {
      workflow.steps.pop();
    }
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
