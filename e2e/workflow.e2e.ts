import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const workflowSource = readFileSync(
  new URL("../src/content/fluxo-passos.md", import.meta.url),
  "utf8",
);
const savedSteps = workflowSource
  .split(/^##[ \t]+/m)
  .slice(1)
  .map((section) => {
    const [heading = ""] = section.split("\n");
    const field = (name: string) =>
      section.match(new RegExp(`^- ${name}:[ \\t]*(.*)$`, "m"))?.[1]?.trim() ?? "";
    return {
      heading: heading.trim(),
      subtitle: field("subtitulo") || field("titulo"),
      description: field("descricao"),
    };
  });

test.describe("workflow page", () => {
  test("loads directly and survives reload", async ({ page }) => {
    await page.goto("/workflow.html");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("shows the team workflow in order and keeps work examples reachable", async ({ page }) => {
    await page.goto("/workflow.html");
    const flow = page.locator("#fluxo");
    await expect(flow.getByRole("heading", { level: 1 })).not.toBeEmpty();
    const steps = flow.locator(".workflow > li");
    expect(savedSteps.length).toBeGreaterThan(0);
    await expect(steps).toHaveCount(savedSteps.length);
    await expect(steps.getByRole("heading", { level: 2 })).toHaveText(
      savedSteps.map((step) => step.heading),
    );
    for (const [index, savedStep] of savedSteps.entries()) {
      const step = steps.nth(index);
      if (savedStep.subtitle) {
        await expect(step.locator(".step-subtitle")).toHaveText(savedStep.subtitle);
      }
      if (savedStep.description) {
        await expect(step.locator(":scope > p:not(.step-subtitle)")).toHaveText(
          savedStep.description,
        );
      }
    }
    for (const step of await steps.all()) {
      await expect(step.getByRole("heading", { level: 2 })).not.toBeEmpty();
      await expect(step.locator(".step-icon")).toBeVisible();
      expect(await step.evaluate((element) => getComputedStyle(element).borderLeftWidth)).toBe(
        "0px",
      );
    }
    const positions = await Promise.all((await steps.all()).map((step) => step.boundingBox()));
    const width = page.viewportSize()?.width ?? 0;
    if (positions.every(Boolean)) {
      if (width >= 1000 && positions.length > 1) {
        for (const position of positions.slice(1, 4)) {
          expect(position?.y).toBeCloseTo(positions[0]?.y ?? 0, 0);
        }
        if (positions.length > 4) {
          expect((positions[4]?.y ?? 0) - (positions[0]?.y ?? 0)).toBeGreaterThan(0);
        }
      } else if (width >= 560 && positions.length > 1) {
        expect(positions[0]?.y).toBeCloseTo(positions[1]?.y ?? 0, 0);
        if (positions.length > 2) {
          expect((positions[2]?.y ?? 0) - (positions[0]?.y ?? 0)).toBeGreaterThan(0);
        }
      } else if (positions.length > 1) {
        expect((positions[1]?.y ?? 0) - (positions[0]?.y ?? 0)).toBeGreaterThan(0);
      }
    }
    const details = page.locator(".workflow-page");
    await expect(details).toHaveCount(1);
    await expect(details.getByRole("heading", { level: 2 })).toHaveCount(1);
    expect(await details.getByRole("heading", { level: 3 }).count()).toBeGreaterThan(0);
    const titleBox = await details.getByRole("heading", { level: 2 }).boundingBox();
    const firstSectionBox = await details.getByRole("heading", { level: 3 }).first().boundingBox();
    expect((firstSectionBox?.y ?? 0) - (titleBox?.y ?? 0)).toBeGreaterThan(0);
    await expect(page.locator("#projetos")).toHaveCount(0);
    const workLink = flow.locator(".flow-ref").first();
    if (await workLink.count()) {
      const href = await workLink.getAttribute("href");
      expect(href).toBeTruthy();
      const destination = new URL(href ?? "", page.url()).href;
      await workLink.click();
      await expect(page).toHaveURL(destination);
    }
  });
});
