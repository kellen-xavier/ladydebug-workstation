import { expect, test } from "@playwright/test";

test.describe("workflow page", () => {
  test("loads directly and survives reload", async ({ page }) => {
    await page.goto("/workflow.html");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
});
