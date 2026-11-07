import { expect, test } from "@playwright/test";

test.describe("workflow page", () => {
  test("loads directly, survives reload and renders the study checklist", async ({ page }) => {
    await page.goto("/workflow.html");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("checkbox")).toHaveCount(6);

    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("checkbox")).toHaveCount(6);
  });

  test("loads the local Markdown image from a bundled URL", async ({ page }) => {
    await page.goto("/workflow.html");
    const image = page.locator(".markdown-image");
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0))
      .toBe(true);
    expect(await image.getAttribute("src")).not.toMatch(/^\/?src\//);
  });
});
