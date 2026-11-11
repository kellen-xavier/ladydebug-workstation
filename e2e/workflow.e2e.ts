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
});
