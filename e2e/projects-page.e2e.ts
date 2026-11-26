import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const projectCount = [
  ...readFileSync(new URL("../src/content/projetos.md", import.meta.url), "utf8").matchAll(
    /^##\s+.+$/gm,
  ),
].length;

test.describe("projects and studies page", () => {
  test("opens from the home preview and shows every saved project", async ({ page }) => {
    await page.goto("/");
    await page.locator('#projetos .section-head a[href="./projetos-e-estudos.html"]').click();

    await expect(page).toHaveURL(/\/projetos-e-estudos\.html$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator(".projects-page-intro")).toBeVisible();
    await expect(page.locator("#projetos .card")).toHaveCount(projectCount);
    await expect(page.locator("#projetos .card h2")).toHaveCount(projectCount);
    await expect(page.locator("#projetos .section-head h2")).toHaveCount(0);
  });

  test("loads directly with the shared site navigation", async ({ page }) => {
    await page.goto("/projetos-e-estudos.html");
    await expect(page.locator("header a.brand")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
});
