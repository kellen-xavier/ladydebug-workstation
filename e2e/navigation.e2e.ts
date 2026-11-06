import { expect, test } from "@playwright/test";
import { mainNavigation, openMenu } from "./support/site";

test.describe("primary navigation", () => {
  test("keeps desktop navigation and social links on one row", async ({ page }) => {
    if ((page.viewportSize()?.width ?? 0) <= 1100) return;
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const boxes = await page
      .locator("header .brand, header nav a, header .social a")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { center: rect.top + rect.height / 2, width: rect.width };
        }),
      );
    for (const box of boxes) {
      expect(Math.abs(box.center - (boxes[0]?.center ?? 0))).toBeLessThan(2);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
    expect(await page.locator("header nav a").evaluateAll((links) => links.length)).toBeGreaterThan(
      0,
    );
  });

  test("opens every internal page from the home navigation", async ({ page }) => {
    for (const path of [
      "trajetoria.html",
      "pratica.html",
      "workflow.html",
      "setup.html",
      "ferramentas.html",
      "games.html",
    ]) {
      await page.goto("/");
      await openMenu(page);
      await mainNavigation(page).locator(`a[href="./${path}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${path}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    }
  });

  test("marks only the open page as current", async ({ page }) => {
    await page.goto("/trajetoria.html");
    await openMenu(page);
    const nav = mainNavigation(page);
    await expect(nav.locator('a[href="./trajetoria.html"]')).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);

    await page.goto("/");
    await openMenu(page);
    await expect(mainNavigation(page).locator('a[aria-current="page"]')).toHaveCount(0);
  });

  test("scrolls to home sections through their links", async ({ page }) => {
    for (const [href, anchor] of [
      ["./index.html#sobre", "sobre"],
      ["./index.html#mapa", "mapa"],
    ]) {
      await page.goto("/");
      await openMenu(page);
      await page.locator(`header a[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
    }
  });

  test("keeps social links external and safely isolated", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    for (const href of [
      "https://github.com/kellen-xavier",
      "https://www.linkedin.com/in/kellen-xavier/",
      "https://kellen-xavier.github.io/ladydebug.github.io/",
    ]) {
      const link = page.locator(`.social a[href="${href}"]`);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
