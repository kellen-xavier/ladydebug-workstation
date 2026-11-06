import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Workflow } from "../src/components/Workflow";
import { WorkflowPage } from "../src/components/WorkflowPage";

describe("workflow page", () => {
  test("links to the workflow page from the home summary", () => {
    const html = renderToStaticMarkup(<Workflow />);
    expect(html).toMatch(/<a class="button workflow-cta" href="\.\/workflow\.html">[^<]+<\/a>/);
  });

  test("does not link the workflow page to itself", () => {
    const html = renderToStaticMarkup(<WorkflowPage />);
    expect(html).not.toMatch(/<a href="\.\/workflow\.html">/);
  });

  test("renders the full Markdown narrative with a single page heading", () => {
    const html = renderToStaticMarkup(<WorkflowPage />);
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html.match(/<h[2-6]>/g)?.length).toBeGreaterThan(0);
  });

  test("shows how I work and my projects", () => {
    const html = renderToStaticMarkup(<WorkflowPage />);
    expect(html.match(/<li>/g)?.length).toBeGreaterThan(0);
    expect(html).toContain('id="projetos"');
  });

  test("routes header and footer back to the home page", () => {
    const html = renderToStaticMarkup(<WorkflowPage />);
    expect(html).toContain('href="./index.html#sobre"');
    expect(html.match(/href="\.\/index\.html#main"/g)).toHaveLength(1);
    expect(html).toContain('class="skip" href="#main"');
  });

  test("renders the study criteria as a readable task list", () => {
    const html = renderToStaticMarkup(<WorkflowPage />);
    expect(html).toMatch(/class="contains-task-list"/);
    expect(html.match(/type="checkbox"/g)).toHaveLength(6);
    expect(html).toContain('href="https://kellen-xavier.github.io/ladydebug.github.io/"');
  });
});
