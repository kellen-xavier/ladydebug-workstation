import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { generatePages } from "./generate-pages";
import markdownText from "./markdown-text";

const root = new URL("../", import.meta.url);
const outdir = fileURLToPath(new URL("dist/", root));
const generated = fileURLToPath(new URL(".generated/", root));

await rm(outdir, { recursive: true, force: true });
const entrypoints = await generatePages(generated, "../src");

const result = await Bun.build({
  entrypoints,
  outdir,
  target: "browser",
  minify: true,
  publicPath: "./",
  plugins: [markdownText],
});

if (!result.success) throw new AggregateError(result.logs, "Production build failed");

const staticFiles: [from: string, to: string][] = [
  ["src/assets/fonts/OFL.txt", "dist/OFL.txt"],
  ["src/assets/cv-kellen-xavier.pdf", "dist/cv-kellen-xavier.pdf"],
];
for (const [from, to] of staticFiles) {
  const source = Bun.file(new URL(from, root));
  if (!(await source.exists())) throw new Error(`Missing static file: ${from}`);
  await Bun.write(new URL(to, root), source);
}

console.log(`Built ${result.outputs.length} files in dist/`);
