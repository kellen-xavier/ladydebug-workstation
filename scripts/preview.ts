// Serves the production build in dist/ as static files: `bun run preview`.
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));

const server = Bun.serve({
  port: Number(process.env.PORT ?? 4173),
  async fetch(req) {
    let pathname: string;
    try {
      pathname = decodeURIComponent(new URL(req.url).pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    const filePath = resolve(root, pathname === "/" ? "index.html" : pathname.slice(1));
    if (!filePath.startsWith(root + sep)) return new Response("Not found", { status: 404 });
    const file = Bun.file(filePath);
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});

console.log(`Preview running at ${server.url}`);
