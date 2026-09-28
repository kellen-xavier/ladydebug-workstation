// Serves the production build in dist/ as static files: `bun run preview`.
const root = new URL("../dist/", import.meta.url).pathname;

const server = Bun.serve({
  port: Number(process.env.PORT ?? 4173),
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const file = Bun.file(root + (pathname === "/" ? "index.html" : pathname.slice(1)));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});

console.log(`Preview running at ${server.url}`);
