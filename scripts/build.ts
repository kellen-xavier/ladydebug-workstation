import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pageFiles } from "../src/pages";
import markdownText from "./markdown-text";

const outdir = fileURLToPath(new URL("../dist/", import.meta.url));
await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: pageFiles.map((file) => fileURLToPath(new URL(`../src/${file}`, import.meta.url))),
  outdir,
  target: "browser",
  minify: true,
  publicPath: "./",
  plugins: [markdownText],
});

if (!result.success) throw new AggregateError(result.logs, "Production build failed");

const staticFiles: [from: string, to: string][] = [
  ["../src/assets/fonts/OFL.txt", "../dist/OFL.txt"],
  ["../src/assets/cv-kellen-xavier.pdf", "../dist/cv-kellen-xavier.pdf"],
];
for (const [from, to] of staticFiles) {
  const source = Bun.file(new URL(from, import.meta.url));
  if (!(await source.exists())) throw new Error(`Missing static file: ${from}`);
  await Bun.write(new URL(to, import.meta.url), source);
}

console.log(`Built ${result.outputs.length} files in dist/`);
