import { describe, expect, test } from "bun:test";
import { cp, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import manifest from "../package.json";

async function createDevWorkspace() {
  const root = new URL("../", import.meta.url).pathname;
  const directory = await mkdtemp(join(tmpdir(), "ladydebug-markdown-"));
  await cp(join(root, "src"), join(directory, "src"), { recursive: true });
  await cp(join(root, "tsconfig.json"), join(directory, "tsconfig.json"));
  await cp(join(root, "bunfig.toml"), join(directory, "bunfig.toml"));
  await cp(join(root, "scripts"), join(directory, "scripts"), { recursive: true });
  await symlink(join(root, "node_modules"), join(directory, "node_modules"));
  return directory;
}

async function readServerUrl(server: { stdout: ReadableStream<Uint8Array> }) {
  const reader = server.stdout.getReader();
  const decoder = new TextDecoder();
  let output = "";
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) throw new Error(`Development server exited: ${output}`);
    output += decoder.decode(chunk.value, { stream: true });
    const url = output.match(/url:\s*(http:\/\/\S+)/)?.[1];
    if (url) {
      reader.releaseLock();
      return url;
    }
  }
}

describe("Markdown content in the development server", () => {
  test("reloads work reports and workflow steps after editing Markdown", async () => {
    const directory = await createDevWorkspace();
    const command = manifest.scripts.dev
      .split(" ")
      .map((arg) => (arg === "--port=3000" ? "--port=0" : arg));
    const server = Bun.spawn(command, {
      cwd: directory,
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, NO_COLOR: "1" },
    });
    try {
      const url = await readServerUrl(server);
      const readBundle = async (path: string) => {
        const pageUrl = new URL(path, url).href;
        const html = await (await fetch(pageUrl)).text();
        const script = html.match(/src="([^"]+)" data-bun-dev-server-script/)?.[1];
        if (!script) throw new Error("Development bundle was not included in the page");
        const response = await fetch(new URL(script, pageUrl));
        expect(response.ok).toBe(true);
        return response.text();
      };
      const bundle = await readBundle("/pratica.html");
      const marker = "Markdown hot reload probe";
      expect(bundle).not.toContain(marker);
      const report = join(directory, "src/content/trabalhos/mobile.md");
      await Bun.write(report, `${await Bun.file(report).text()}\n${marker}\n`);
      let updated = "";
      for (let attempt = 0; attempt < 25; attempt++) {
        updated = await readBundle("/pratica.html");
        if (updated.includes(marker)) break;
        await Bun.sleep(20);
      }
      expect(updated).toContain(marker);

      const workflowMarker = "Workflow hot reload probe";
      const workflowFile = join(directory, "src/content/fluxo-passos.md");
      await Bun.write(
        workflowFile,
        `${await Bun.file(workflowFile).text()}\n## ${workflowMarker}\n- descricao: Inspect the new step.\n`,
      );
      let updatedWorkflow = "";
      for (let attempt = 0; attempt < 25; attempt++) {
        updatedWorkflow = await readBundle("/workflow.html");
        if (updatedWorkflow.includes(workflowMarker)) break;
        await Bun.sleep(20);
      }
      expect(updatedWorkflow).toContain(workflowMarker);
    } finally {
      server.kill();
      await server.exited;
      await rm(directory, { recursive: true, force: true });
    }
  });

  test("uses an available port when the requested development port is occupied", async () => {
    const directory = await createDevWorkspace();
    const occupied = Bun.serve({ port: 0, fetch: () => new Response("occupied") });
    const server = Bun.spawn(["bun", `--port=${occupied.port}`, "scripts/dev.ts"], {
      cwd: directory,
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, NO_COLOR: "1" },
    });
    try {
      const url = await readServerUrl(server);
      expect(new URL(url).port).not.toBe(String(occupied.port));
      const response = await fetch(url);
      expect(response.ok).toBe(true);
      expect(await response.text()).toContain('<div id="root">');
    } finally {
      server.kill();
      await server.exited;
      occupied.stop();
      await rm(directory, { recursive: true, force: true });
    }
  });
});
