import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { BunPlugin } from "bun";
import type { Definition } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

function markdownModule(source: string, path: string) {
  const tree = fromMarkdown(source);
  const definitions = new Map<string, Definition>();
  visit(tree, "definition", (node) => {
    definitions.set(node.identifier, node);
  });

  const imports: string[] = [];
  const parts: string[] = [];
  let cursor = 0;
  visit(tree, (node) => {
    if (node.type !== "image" && node.type !== "imageReference") return;
    const image = node.type === "image" ? node : definitions.get(node.identifier);
    if (!image || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(image.url)) return;
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start === undefined || end === undefined) return;

    const separator = image.url.search(/[?#]/);
    const pathname = separator < 0 ? image.url : image.url.slice(0, separator);
    const suffix = separator < 0 ? "" : image.url.slice(separator);
    const filename = decodeURIComponent(pathname);
    const assetPath = filename.startsWith("/")
      ? resolve(projectRoot, `.${filename}`)
      : resolve(dirname(path), filename);
    const asset = `markdownImage${imports.length}`;
    imports.push(`import ${asset} from ${JSON.stringify(assetPath)} with { type: "file" };`);

    const alt = (node.alt ?? "").replace(/[\\[\]]/g, "\\$&").replace(/\r?\n/g, " ");
    const title = image.title
      ? ` "${image.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
      : "";
    parts.push(
      JSON.stringify(source.slice(cursor, start)),
      JSON.stringify(`![${alt}](<`),
      asset,
      JSON.stringify(`${suffix}>${title})`),
    );
    cursor = end;
  });
  parts.push(JSON.stringify(source.slice(cursor)));
  return `${imports.join("\n")}\nexport default ${parts.join(" + ")};`;
}

// Keep Markdown as text and register its local images with Bun's asset pipeline.
const markdownText: BunPlugin = {
  name: "markdown-text",
  setup(build) {
    build.onLoad({ filter: /\.md$/ }, async ({ path }) => ({
      contents: markdownModule(await Bun.file(path).text(), path),
      loader: "js",
    }));
  },
};

export default markdownText;
