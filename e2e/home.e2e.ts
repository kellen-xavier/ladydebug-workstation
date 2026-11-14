import { expect, test } from "@playwright/test";
import { openMenu } from "./support/site";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("keeps work accessible through the main navigation without a hero action", async ({
    page,
  }) => {
    await expect(page.locator(".hero .actions")).toHaveCount(0);
    await openMenu(page);
    const work = page.getByRole("navigation", { name: "Navegação principal" });
    await work.getByRole("button", { name: "Trabalhos" }).click();
    await work.locator('a[href="./pratica.html"]').click();
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
