import { fileURLToPath } from "node:url";
import type { BunFile, HTMLBundle } from "bun";
import { pages } from "../src/pages";
import { generatePages } from "./generate-pages";

// Generate each page's HTML entry and client script, then let Bun bundle and
// hot-reload them. Editing a component or a Markdown file reloads the page.
const root = new URL("../", import.meta.url);
const generated = new URL(".generated/", root);
await generatePages(fileURLToPath(generated), "../src");

const routes: Record<string, HTMLBundle | BunFile> = {};
for (const page of pages) {
  const html: HTMLBundle = (await import(fileURLToPath(new URL(`${page.slug}.html`, generated))))
    .default;
  routes[page.path] = html;
  routes[`/${page.slug}.html`] = html;
}
routes["/cv-kellen-xavier.pdf"] = Bun.file(new URL("src/assets/cv-kellen-xavier.pdf", root));

const server = Bun.serve({ routes, development: true });
console.log(`url: ${server.url}`);
