import { expect, test } from "@playwright/test";
import { mainNavigation, openMenu } from "./support/site";

test.describe("primary navigation", () => {
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
      if (["setup.html", "ferramentas.html", "games.html"].includes(path)) {
        await mainNavigation(page).getByRole("button", { name: "Setup" }).click();
      }
      await mainNavigation(page).locator(`a[href="./${path}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${path}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    }
  });

  test("reveals Setup destinations by hover and closes with Escape", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) <= 1100);
    await page.goto("/");
    const nav = mainNavigation(page);
    const setup = nav.getByRole("button", { name: "Setup" });
    const tools = nav.getByRole("link", { name: "Ferramentas" });
    const games = nav.getByRole("link", { name: "Games" });
    await expect(tools).toBeHidden();
    await expect(games).toBeHidden();
    await setup.hover();
    await expect(tools).toBeVisible();
    await expect(games).toBeVisible();
    await setup.focus();
    await page.keyboard.press("Escape");
    await expect(tools).toBeHidden();
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

  test("returns to the top after scrolling", async ({ page }) => {
    await page.goto("/");
    const backToTop = page.getByRole("button", { name: "Voltar ao topo" });
    await expect(backToTop).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(backToTop).toBeVisible();
    await backToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
});
