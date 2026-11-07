import { expect, test } from "@playwright/test";
import { hasHorizontalScroll, mainNavigation, openMenu, pagePaths } from "./support/site";

test.describe("responsive layout", () => {
  test("centers the site map in a responsive grid", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#mapa");
    const grid = section.locator(".site-map");
    const columns = await grid.evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length,
    );
    const width = page.viewportSize()?.width ?? 0;
    const expectedColumns = width <= 560 ? 1 : width <= 900 ? 2 : 3;
    expect(columns).toBe(expectedColumns);
    await expect(grid.locator(":scope > li")).toHaveCount(9);

    const sectionBox = await section.boundingBox();
    const gridBox = await grid.boundingBox();
    if (!sectionBox || !gridBox) throw new Error("The site map or section is not visible");
    expect(
      Math.abs(sectionBox.x + sectionBox.width / 2 - (gridBox.x + gridBox.width / 2)),
    ).toBeLessThanOrEqual(1);
  });

  for (const path of pagePaths) {
    test(`avoids horizontal scrolling on ${path}`, async ({ page }) => {
      await page.goto(`/${path}`);
      expect(await hasHorizontalScroll(page)).toBe(false);
    });
  }

  test("resolves every in-page anchor to an existing element", async ({ page }) => {
    for (const path of pagePaths) {
      await page.goto(`/${path}`);
      const unresolved = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .map((link) => (link as HTMLAnchorElement).hash.slice(1))
            .filter((id) => id.length > 0 && !document.getElementById(id)),
        );
      expect(unresolved, `${path} has anchors without a target`).toEqual([]);
    }
  });

  test("keeps primary tap targets at least 44 pixels high on touch devices", async ({ page }) => {
    test.skip(!test.info().project.use.hasTouch, "Applies to touch viewports");
    await page.goto("/");
    const toggle = page.locator(".menu-toggle");
    await expect(toggle).toHaveCSS("min-height", "44px");
    await openMenu(page);
    const targets = page.locator("nav a, .button, .social a");
    const heights = await targets.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );
    for (const height of heights) expect(height).toBeGreaterThanOrEqual(44);
  });

  test("collapses and expands navigation on small screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 1100, "Collapsed layout only");
    await page.goto("/");
    const nav = mainNavigation(page);
    const toggle = page.locator(".menu-toggle");
    await expect(toggle).toBeVisible();
    await expect(nav).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();
    await expect(nav.locator("a").first()).toBeVisible();
  });

  test("keeps navigation visible without a toggle on wide screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) <= 1100, "Wide-screen layout only");
    await page.goto("/");
    await expect(mainNavigation(page)).toBeVisible();
    await expect(page.locator(".menu-toggle")).toBeHidden();
  });
});
