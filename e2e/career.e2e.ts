import { expect, test } from "@playwright/test";

test.describe("career page", () => {
  test("aligns the introduction with the left edge of its title", async ({ page }) => {
    await page.goto("/trajetoria.html");
    const intro = page.locator(".career-page-head .section-intro");
    await expect(intro).toHaveCSS("text-align", "left");
    const introBox = await intro.boundingBox();
    const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    if (!introBox || !titleBox) throw new Error("The career title or introduction is not visible");
    expect(Math.abs(introBox.x - titleBox.x)).toBeLessThanOrEqual(1);
  });

  test("uses the full highlight panel when no focus list is present", async ({ page }) => {
    await page.goto("/trajetoria.html");
    const panel = page.locator(".career-highlight");
    const description = panel.locator(":scope > div > p:not(.eyebrow)");
    const contentBlock = panel.locator(":scope > div");
    const columns = await panel.evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length,
    );
    const contentBox = await contentBlock.boundingBox();
    const descriptionBox = await description.boundingBox();
    if (!contentBox || !descriptionBox) throw new Error("The career highlight is not visible");
    expect(columns).toBe(1);
    expect(descriptionBox.width).toBeGreaterThan(contentBox.width * 0.95);
  });
});
