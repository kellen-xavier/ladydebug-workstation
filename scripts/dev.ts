import portfolio from "../src/index.html";
import workflow from "../src/workflow.html";

const server = Bun.serve({
  routes: {
    "/": portfolio,
    "/index.html": portfolio,
    "/workflow.html": workflow,
  },
  development: true,
});

console.log(`url: ${server.url}`);
