import { describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import markdownText from "../scripts/markdown-text";
import { MarkdownContent } from "../src/components/MarkdownContent";

const diagram =
  '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20"><rect width="30" height="20" fill="pink"/></svg>';

async function withBundle(
  source: string,
  verify: (bundle: { markdown: string; directory: string; assets: string[] }) => Promise<void>,
) {
  const directory = await mkdtemp(join(tmpdir(), "ladydebug-markdown-images-"));
  try {
    for (const name of ["content/workflow.md", "assets/diagram.svg", "assets/diagram local.svg"]) {
      await mkdir(dirname(join(directory, name)), { recursive: true });
      await Bun.write(join(directory, name), name.endsWith(".md") ? source : diagram);
    }
    const entrypoint = join(directory, "entry.ts");
    await Bun.write(
      entrypoint,
      'export { default } from "./content/workflow.md" with { type: "text" };',
    );
    const result = await Bun.build({
      entrypoints: [entrypoint],
      outdir: join(directory, "dist"),
      target: "browser",
      publicPath: "./",
      plugins: [markdownText],
    });
    if (!result.success) throw new Error(result.logs.map(String).join("\n"));
    const entry = result.outputs.find((output) => output.kind === "entry-point");
    if (!entry) throw new Error("Markdown bundle entry is missing");
    const { default: markdown } = await import(pathToFileURL(entry.path).href);
    await verify({
      markdown,
      directory: join(directory, "dist"),
      assets: result.outputs
        .filter((output) => output.kind === "asset")
        .map((output) => output.path),
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

describe("local images in Markdown", () => {
  test.each([
    ["relative images", '![Diagram](../assets/diagram.svg "Process")'],
    ["reference images", '![Diagram][process]\n\n[process]: ../assets/diagram.svg "Process"'],
    ["encoded filenames", '![Diagram](../assets/diagram%20local.svg "Process")'],
  ])("bundles %s without changing their alternative text or title", async (_, source) => {
    await withBundle(source, async ({ markdown, assets, directory }) => {
      expect(assets).toHaveLength(1);
      const html = renderToStaticMarkup(<MarkdownContent>{markdown}</MarkdownContent>);
      expect(html).toContain('alt="Diagram"');
      expect(html).toContain('title="Process"');
      const url = html.match(/<img[^>]*src="([^"]+)"/)?.[1];
      expect(url?.startsWith("./")).toBe(true);
      if (!url) throw new Error("Bundled image URL is missing");
      const path = fileURLToPath(new URL(url, pathToFileURL(`${directory}/`)));
      expect(path.startsWith(`${directory}/`)).toBe(true);
      expect(await Bun.file(path).text()).toBe(diagram);
    });
  });

  test("supports the existing project-root image path used in the workflow document", async () => {
    await withBundle("![workflow](/src/assets/workflow.png)", async ({ markdown, assets }) => {
      expect(assets).toHaveLength(1);
      expect(markdown).not.toContain("/src/assets/");
      const original = Bun.file(new URL("../src/assets/workflow.png", import.meta.url));
      expect(await Bun.file(assets[0] ?? "").arrayBuffer()).toEqual(await original.arrayBuffer());
    });
  });

  test("preserves remote images and image examples inside code", async () => {
    const source = "![Remote](https://example.com/diagram.png)\n\n`![Example](../missing.png)`";
    await withBundle(source, async ({ markdown, assets }) => {
      expect(markdown).toBe(source);
      expect(assets).toHaveLength(0);
    });
  });

  test("preserves query strings and fragments on local image URLs", async () => {
    await withBundle(
      "![Diagram](../assets/diagram.svg?version=1#diagram)",
      async ({ markdown }) => {
        expect(markdown).toContain("?version=1#diagram");
      },
    );
  });
});
