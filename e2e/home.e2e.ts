import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the primary action in the first viewport and routes to practice", async ({
    page,
  }) => {
    const action = page.locator('.hero .actions a[href="./pratica.html"]');
    await expect(action).toBeVisible();
    await expect(action).toBeInViewport();
    await action.click();
    await expect(page).toHaveURL(/\/pratica\.html$/);
  });

  test("routes a site map entry to its destination", async ({ page }) => {
    const map = page.locator("ul.site-map");
    await map.locator('a[href="./trajetoria.html"]').click();
    await expect(page).toHaveURL(/\/trajetoria\.html$/);
  });

  test("opens workflow and setup pages from their panels", async ({ page }) => {
    for (const href of ["./workflow.html", "./setup.html", "./ferramentas.html"]) {
      await page.goto("/");
      await page.locator(`#como-trabalho .panel-links a[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${href.slice(2)}$`));
    }
  });

  test("downloads the Portuguese and English CV files", async ({ page }) => {
    for (const file of ["cv-kellen-xavier-pt-br.pdf", "cv-kellen-xavier-en.pdf"]) {
      const link = page.locator(`a[href="./${file}"][download]`);
      await expect(link).toBeVisible();
      const downloadPromise = page.waitForEvent("download");
      await link.click();
      expect((await downloadPromise).suggestedFilename()).toBe(file);
    }
  });
});
