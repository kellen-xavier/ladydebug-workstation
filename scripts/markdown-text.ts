import type { BunPlugin } from "bun";

// Keep Markdown as source text on both initial loads and HMR updates.
const markdownText: BunPlugin = {
  name: "markdown-text",
  setup(build) {
    build.onLoad({ filter: /\.md$/ }, async ({ path }) => ({
      contents: `export default ${JSON.stringify(await Bun.file(path).text())};`,
      loader: "js",
    }));
  },
};

export default markdownText;
