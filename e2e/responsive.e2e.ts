import { expect, test } from "@playwright/test";
import { hasHorizontalScroll, mainNavigation, openMenu, pagePaths } from "./support/site";

test.describe("responsive layout", () => {
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
    const targets = page.locator("nav a:visible, nav button:visible, .button, .social a");
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

  test("keeps the expanded menu below the brand and across the available width", async ({
    page,
  }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 1100, "Collapsed layout only");
    await page.goto("/");
    const brand = await page.locator("header .brand").boundingBox();
    const toggle = await page.locator(".menu-toggle").boundingBox();
    expect(brand).not.toBeNull();
    expect(toggle).not.toBeNull();
    if (brand && toggle) expect(Math.abs(brand.y - toggle.y)).toBeLessThan(20);

    await page.locator(".menu-toggle").click();
    const frame = await page.locator(".header-inner").boundingBox();
    const navigation = await mainNavigation(page).boundingBox();
    const social = await page.locator("header .social").boundingBox();
    expect(frame).not.toBeNull();
    expect(navigation).not.toBeNull();
    expect(social).not.toBeNull();
    if (brand && frame && navigation && social) {
      expect(navigation.y).toBeGreaterThanOrEqual(brand.y + brand.height);
      expect(Math.abs(navigation.x - frame.x)).toBeLessThan(2);
      expect(Math.abs(navigation.width - frame.width)).toBeLessThan(2);
      expect(social.y).toBeGreaterThanOrEqual(navigation.y + navigation.height);
    }
    if ((page.viewportSize()?.width ?? 0) <= 900) {
      const about = await mainNavigation(page).getByRole("link", { name: "Sobre" }).boundingBox();
      const work = await mainNavigation(page)
        .getByRole("button", { name: "Trabalhos" })
        .boundingBox();
      expect(about).not.toBeNull();
      expect(work).not.toBeNull();
      if (about && work) expect(work.y).toBeGreaterThanOrEqual(about.y + about.height);
    }
  });

  test("lets touch users close and reopen a navigation group", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 1100, "Collapsed layout only");
    await page.goto("/");
    await openMenu(page);
    const work = mainNavigation(page).getByRole("button", { name: "Trabalhos" });
    const career = mainNavigation(page).getByRole("link", { name: "Trajetória" });
    await work.click();
    await expect(career).toBeVisible();
    await work.click();
    await expect(career).toBeHidden();
  });

  test("keeps navigation visible without a toggle on wide screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) <= 1100, "Wide-screen layout only");
    await page.goto("/");
    await expect(mainNavigation(page)).toBeVisible();
    await expect(page.locator(".menu-toggle")).toBeHidden();
  });
});
