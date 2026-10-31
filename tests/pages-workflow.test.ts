import { describe, expect, test } from "bun:test";

type Step = {
  uses?: string;
  run?: string;
  with?: Record<string, unknown>;
};

type Workflow = {
  on: {
    push: { branches: string[] };
    pull_request: { branches: string[] };
    workflow_dispatch: unknown;
  };
  permissions: Record<string, string>;
  jobs: Record<
    string,
    {
      if?: string;
      needs?: string;
      permissions?: Record<string, string>;
      environment?: { name: string };
      steps: Step[];
    }
  >;
};

const configuration = async () =>
  Bun.YAML.parse(
    await Bun.file(new URL("../.github/workflows/pages.yml", import.meta.url)).text(),
  ) as Workflow;

describe("GitHub Pages publication policy", () => {
  test("validates pull requests and supports publication from main or a manual run", async () => {
    const workflow = await configuration();
    expect(workflow.on.push.branches).toEqual(["main"]);
    expect(workflow.on.pull_request.branches).toEqual(["main"]);
    expect(workflow.on).toHaveProperty("workflow_dispatch");
  });

  test("keeps publication permissions out of the job that runs pull request code", async () => {
    const workflow = await configuration();
    expect(workflow.permissions).toEqual({ contents: "read" });
    expect(workflow.jobs.build?.permissions).toBeUndefined();
    expect(workflow.jobs.deploy?.permissions).toMatchObject({
      pages: "write",
      "id-token": "write",
    });
    expect(workflow.jobs.deploy?.environment?.name).toBe("github-pages");
  });

  test("blocks deployment for pull requests and branches other than main", async () => {
    const deploy = (await configuration()).jobs.deploy;
    expect(deploy?.needs).toBe("build");
    expect(deploy?.if).toContain("github.ref == 'refs/heads/main'");
    expect(deploy?.if).toContain("github.event_name != 'pull_request'");
    expect(deploy?.if).toContain("&&");
    expect(deploy?.if).not.toContain("||");
  });

  test("publishes the same dist artifact checked by production browser tests", async () => {
    const build = (await configuration()).jobs.build;
    const steps = build?.steps ?? [];
    const commands = steps.map((step) => step.run);
    for (const command of [
      "bun install --frozen-lockfile",
      "bun run lint",
      "bun run typecheck",
      "bun test",
    ]) {
      expect(commands).toContain(command);
    }
    const tested = steps.findIndex((step) => step.run === "bun run test:browser:production");
    const uploaded = steps.findIndex((step) =>
      step.uses?.startsWith("actions/upload-pages-artifact@"),
    );
    expect(tested).toBeGreaterThan(-1);
    expect(uploaded).toBeGreaterThan(tested);
    expect(steps[uploaded]?.with?.path).toBe("dist");
    expect(steps.slice(tested + 1).some((step) => step.run?.includes("bun run build"))).toBe(false);
  });
});
