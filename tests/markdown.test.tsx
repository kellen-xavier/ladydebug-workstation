import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownContent } from "../src/components/MarkdownContent";

describe("editable Markdown content", () => {
  test("renders headings, emphasis, paragraphs, and lists from supplied content", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {"# An editable title\n\nA **new** paragraph.\n\n- First\n- Second"}
      </MarkdownContent>,
    );
    expect(html).toContain("<h1>An editable title</h1>");
    expect(html).toContain("<p>A <strong>new</strong> paragraph.</p>");
    expect(html).toContain("<li>First</li>");
    expect(html).toContain("<li>Second</li>");
  });

  test("renders the title and body in separate layout slots without duplicating content", () => {
    const content = "# Title with *emphasis*\n\nBody text.\n\n### Body heading";
    const title = renderToStaticMarkup(<MarkdownContent part="title">{content}</MarkdownContent>);
    const body = renderToStaticMarkup(<MarkdownContent part="body">{content}</MarkdownContent>);
    expect(title).toBe("<h1>Title with <em>emphasis</em></h1>");
    expect(body).toContain("<p>Body text.</p>");
    expect(body).toContain("<h3>Body heading</h3>");
    expect(body).not.toContain("Title with");
    expect(title).not.toContain("Body text");
  });

  test("keeps body content when no title is supplied", () => {
    const html = renderToStaticMarkup(<MarkdownContent part="body">A paragraph.</MarkdownContent>);
    expect(html).toBe("<p>A paragraph.</p>");
  });

  test("preserves internal anchors and applies safe attributes to external links", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {"[Work](#mobile) and [Source](https://example.com/report)"}
      </MarkdownContent>,
    );
    expect(html).toContain('<a href="#mobile">Work</a>');
    expect(html).toContain('href="https://example.com/report"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test("does not render raw HTML or executable link URLs", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {'<script>alert("unsafe")</script>\n\n[Unsafe](javascript:alert)'}
      </MarkdownContent>,
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("javascript:");
  });

  test("renders report references as a nested disclosure using a level-two heading", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent disclosures>
        {
          "### Work\n\n- A contribution\n\n## Report references\n\n**Document:** source.md\n\nSHA-256: abc123"
        }
      </MarkdownContent>,
    );
    expect(html).toMatch(/<details class="provenance">\s*<summary>Report references<\/summary>/);
    expect(html).toContain("<strong>Document:</strong> source.md");
    expect(html).toContain("SHA-256: abc123");
    expect(html.indexOf("<li>A contribution</li>")).toBeLessThan(html.indexOf("<details"));
    expect(html).toEndWith("</details>");
  });
});
