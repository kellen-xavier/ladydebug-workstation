import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type Page, pages } from "../src/pages";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='9' fill='%23d468a5'/%3E%3Ctext x='6' y='28' font-family='monospace' font-size='25' font-weight='bold' fill='%232b2622'%3Eld%3C/text%3E%3C/svg%3E";

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Generates the HTML entry and client script of every page into `outDir`,
 * from the single registry in `src/pages.ts`. These generated files are what
 * Bun bundles, so the repository keeps only components — no hand-written
 * `.html` or `*-main.tsx`.
 *
 * `srcPrefix` is the import path from `outDir` back to `src` (e.g. "../src").
 * Returns the generated HTML file paths, to pass to Bun as entrypoints.
 */
export async function generatePages(outDir: string, srcPrefix: string): Promise<string[]> {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const htmlFiles: string[] = [];
  for (const page of pages) {
    const entryName = `${page.slug}.entry.tsx`;
    await writeFile(join(outDir, entryName), clientEntry(page.componentName, srcPrefix));

    const htmlPath = join(outDir, `${page.slug}.html`);
    await writeFile(htmlPath, documentHtml(page, `./${entryName}`));
    htmlFiles.push(htmlPath);
  }
  return htmlFiles;
}

/** The HTML shell shared by every page; its CSS is linked by Bun from the entry. */
function documentHtml(page: Pick<Page, "title" | "description">, entrySrc: string): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="theme-color" content="#faf6ed" />
    <link rel="icon" type="image/svg+xml" href="${FAVICON}" />
    <script type="module" src="${entrySrc}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
}

function clientEntry(componentName: string, src: string): string {
  return `import "${src}/styles/global.css";
import "${src}/styles/pages.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ${componentName} } from "${src}/components/${componentName}";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");
createRoot(root).render(
  <StrictMode>
    <${componentName} />
  </StrictMode>,
);
`;
}
