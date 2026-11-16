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

  test("keeps the site map off the home page", async ({ page }) => {
    await expect(page.locator("#mapa")).toHaveCount(0);
    await expect(page.locator("#sobre")).toBeVisible();
  });

  test("aligns the three project previews in one row on wide screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1100);
    const cards = page.locator("#projetos .card");
    await expect(cards).toHaveCount(3);
    const boxes = await cards.evaluateAll((elements) =>
      elements.map((element) => {
        const box = element.getBoundingClientRect();
        return { x: box.x, y: box.y, width: box.width };
      }),
    );
    expect(boxes[0]?.x).toBeLessThan(boxes[1]?.x ?? 0);
    expect(boxes[1]?.x).toBeLessThan(boxes[2]?.x ?? 0);
    expect(boxes[0]?.y).toBeCloseTo(boxes[1]?.y ?? 0, 0);
    expect(boxes[1]?.y).toBeCloseTo(boxes[2]?.y ?? 0, 0);
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
