// Bun needs static HTML imports; tests/pages.test.tsx checks this list against src/pages.ts.
import ferramentas from "../src/ferramentas.html";
import games from "../src/games.html";
import portfolio from "../src/index.html";
import pratica from "../src/pratica.html";
import setup from "../src/setup.html";
import trajetoria from "../src/trajetoria.html";
import workflow from "../src/workflow.html";

const server = Bun.serve({
  routes: {
    "/": portfolio,
    "/index.html": portfolio,
    "/trajetoria.html": trajetoria,
    "/pratica.html": pratica,
    "/workflow.html": workflow,
    "/setup.html": setup,
    "/ferramentas.html": ferramentas,
    "/games.html": games,
    "/cv-kellen-xavier.pdf": Bun.file(new URL("../src/assets/cv-kellen-xavier.pdf", import.meta.url)),
  },
  development: true,
});

console.log(`url: ${server.url}`);
