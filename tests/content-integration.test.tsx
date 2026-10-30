import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { About } from "../src/components/About";
import { Hero } from "../src/components/Hero";
import { Work } from "../src/components/Work";
import { Workflow } from "../src/components/Workflow";
import { workflow } from "../src/content/fluxo";
import { workCases } from "../src/content/trabalhos";

describe("content-driven portfolio sections", () => {
  test("preserves the presentation heading, emphasis, and line break", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toMatch(/<h1>Meu trabalho,\s*<br\/>\s*<em>por dentro\.<\/em><\/h1>/);
    expect(html.match(/class="intro"/g)).toHaveLength(1);
  });

  test("preserves the about title as a single heading", () => {
    const html = renderToStaticMarkup(<About />);
    expect(html).toMatch(/<h2>Uma trajetória entre\s+código, testes\s+e documentação\.<\/h2>/);
  });

  test("renders a newly registered Markdown work report without changing the layout", () => {
    workCases.push({
      id: "new-work",
      stack: "TypeScript",
      summary: "An editable contribution preview.",
      content: "# New work\n\nAn **editable** report.\n\n## References\n\nSource document.",
    });
    try {
      const html = renderToStaticMarkup(<Work />);
      expect(html).toContain('id="new-work"');
      expect(html).toMatch(/<summary>New work\s*<span class="case-label">TypeScript<\/span>/);
      expect(html).toContain("An <strong>editable</strong> report.");
      expect(html).toContain('<span class="case-excerpt">An editable contribution preview.</span>');
      expect(html).toMatch(/<details class="provenance">\s*<summary>References<\/summary>/);
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
      expect(html).toContain("<h3>An editable step</h3>");
      expect(html).toContain("<p>An editable description.</p>");
      expect(html).toContain('href="#mobile">Inspect the example</a>');
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
      expect(introduction).toContain("<p>A <strong>short</strong> process note.</p>");
      expect(introduction).toContain('<p>A <a href="#mobile">work example</a>.</p>');
      expect(introduction).not.toContain("**short**");
    } finally {
      workflow.intro = original;
    }
  });
});
