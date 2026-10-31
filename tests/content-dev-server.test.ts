import { describe, expect, test } from "bun:test";
import { cp, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import manifest from "../package.json";

describe("Markdown content in the development server", () => {
  test("keeps Markdown source on initial load and after editing a content file", async () => {
    const root = new URL("../", import.meta.url).pathname;
    const directory = await mkdtemp(join(tmpdir(), "ladydebug-markdown-"));
    await cp(join(root, "src"), join(directory, "src"), { recursive: true });
    await cp(join(root, "tsconfig.json"), join(directory, "tsconfig.json"));
    await cp(join(root, "bunfig.toml"), join(directory, "bunfig.toml"));
    await cp(join(root, "scripts"), join(directory, "scripts"), { recursive: true });
    await symlink(join(root, "node_modules"), join(directory, "node_modules"));
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
      const reader = server.stdout.getReader();
      const decoder = new TextDecoder();
      let output = "";
      let url: string | undefined;
      while (!url) {
        const chunk = await reader.read();
        if (chunk.done) throw new Error(`Development server exited: ${output}`);
        output += decoder.decode(chunk.value, { stream: true });
        url = output.match(/url:\s*(http:\/\/\S+)/)?.[1];
      }
      reader.releaseLock();
      const readBundle = async () => {
        const html = await (await fetch(url)).text();
        const script = html.match(/src="([^"]+)" data-bun-dev-server-script/)?.[1];
        if (!script) throw new Error("Development bundle was not included in the page");
        const response = await fetch(new URL(script, url));
        expect(response.ok).toBe(true);
        return response.text();
      };
      const bundle = await readBundle();
      expect(bundle.includes("# Mobile: implementação, testes e verificação de estado")).toBe(true);
      expect(
        bundle.includes("<h1>Mobile: implementação, testes e verificação de estado</h1>"),
      ).toBe(false);

      const report = join(directory, "src/content/trabalhos/mobile.md");
      await Bun.write(report, `${await Bun.file(report).text()}\nEdited Markdown content.\n`);
      let updated = "";
      for (let attempt = 0; attempt < 25; attempt++) {
        updated = await readBundle();
        if (updated.includes("Edited Markdown content.")) break;
        await Bun.sleep(20);
      }
      expect(updated.includes("Edited Markdown content.")).toBe(true);
      expect(updated.includes("# Mobile: implementação, testes e verificação de estado")).toBe(
        true,
      );
      expect(
        updated.includes("<h1>Mobile: implementação, testes e verificação de estado</h1>"),
      ).toBe(false);
    } finally {
      server.kill();
      await server.exited;
      await rm(directory, { recursive: true, force: true });
    }
  });
});
