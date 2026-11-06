import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import type { BunFile, HTMLBundle } from "bun";
import { generatePages } from "./generate-pages";

// Generate each page's HTML entry and client script, then let Bun bundle and
// hot-reload them. Editing a component or a Markdown file reloads the page.
const root = new URL("../", import.meta.url);
const generatedDir = new URL(".generated/", root);

async function buildRoutes(clean: boolean): Promise<Record<string, HTMLBundle | BunFile>> {
  // Re-read the registry fresh so title/description edits take effect without a restart.
  const bust = Date.now();
  const { pages } = await import(`../src/pages?reload=${bust}`);
  await generatePages(fileURLToPath(generatedDir), "../src", { clean, pageList: pages });

  const routes: Record<string, HTMLBundle | BunFile> = {};
  for (const page of pages) {
    const file = fileURLToPath(new URL(`${page.slug}.html`, generatedDir));
    const html: HTMLBundle = (await import(`${file}?reload=${bust}`)).default;
    routes[page.path] = html;
    routes[`/${page.slug}.html`] = html;
  }
  routes["/cv-kellen-xavier-pt-br.pdf"] = Bun.file(
    new URL("src/assets/cv-kellen-xavier-pt-br.pdf", root),
  );
  routes["/cv-kellen-xavier-en.pdf"] = Bun.file(
    new URL("src/assets/cv-kellen-xavier-en.pdf", root),
  );
  return routes;
}

const server = Bun.serve({ routes: await buildRoutes(true), development: true });

// A page's title and description live in src/pages.ts, so they are baked into
// the generated HTML at startup. Watch the top of src/ (whose only file is
// pages.ts) and regenerate + reload the routes when the registry changes.
let timer: ReturnType<typeof setTimeout> | undefined;
watch(fileURLToPath(new URL("src/", root)), () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    buildRoutes(false)
      .then((routes) => server.reload({ routes }))
      .catch(console.error);
  }, 50);
});

console.log(`url: ${server.url}`);
