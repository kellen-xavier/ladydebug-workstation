import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import markdownText from "./markdown-text";

const outdir = fileURLToPath(new URL("../dist/", import.meta.url));
await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["../src/index.html", "../src/workflow.html"].map((path) =>
    fileURLToPath(new URL(path, import.meta.url)),
  ),
  outdir,
  target: "browser",
  minify: true,
  publicPath: "./",
  plugins: [markdownText],
});

if (!result.success) throw new AggregateError(result.logs, "Production build failed");
await Bun.write(
  new URL("../dist/OFL.txt", import.meta.url),
  Bun.file(new URL("../src/assets/fonts/OFL.txt", import.meta.url)),
);
console.log(`Built ${result.outputs.length} files in dist/`);
