import { expect, test } from "@playwright/test";
import { mainNavigation, openMenu } from "./support/site";

test.describe("primary navigation", () => {
  test("shows a vector blog icon that adapts to light and dark colors", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const blog = page.locator('header .social a[aria-label="Blog"]');
    const icon = blog.locator(".social-blog-icon");
    await expect(icon).toBeVisible();
    const mask = await icon.evaluate((element) => getComputedStyle(element).maskImage);
    const asset = mask.match(/url\("?([^")]+)"?\)/)?.[1];
    expect(asset).toBeTruthy();
    if (asset) {
      const url = new URL(asset, page.url());
      expect(url.pathname).toMatch(/\.svg$/);
      const response = await page.request.get(url.href);
      expect(response.ok()).toBe(true);
      expect(await response.text()).toContain("currentColor");
    }
    const normal = await icon.evaluate((element) => getComputedStyle(element).backgroundColor);
    await blog.hover();
    const hovered = await icon.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(hovered).not.toBe(normal);
    await blog.evaluate((element) => {
      element.style.color = "rgb(255, 255, 255)";
    });
    await expect(icon).toHaveCSS("background-color", "rgb(255, 255, 255)");
  });

  test("returns to the start of the home page through the brand links", async ({ page }) => {
    for (const [source, link] of [
      ["/pratica.html", "header a.brand"],
      ["/index.html#sobre", "header a.brand"],
      ["/pratica.html", "footer a.brand"],
    ] as const) {
      await page.goto(source);
      await page.locator(link).click();
      await expect(page).toHaveURL(/\/index\.html$/);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    }
  });

  test("opens every internal page from the home navigation", async ({ page }) => {
    for (const path of [
      "trajetoria.html",
      "pratica.html",
      "workflow.html",
      "setup.html",
      "ferramentas.html",
      "contato.html",
    ]) {
      await page.goto("/");
      await openMenu(page);
      if (["trajetoria.html", "pratica.html", "workflow.html"].includes(path)) {
        await mainNavigation(page).getByRole("button", { name: "Trabalhos" }).click();
      }
      if (["setup.html", "ferramentas.html"].includes(path)) {
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
    await expect(tools).toBeHidden();
    await expect(nav.locator('a[href="./games.html"]')).toHaveCount(0);
    await setup.hover();
    await expect(tools).toBeVisible();
    await setup.focus();
    await page.keyboard.press("Escape");
    await expect(tools).toBeHidden();
  });

  test("reveals work destinations by hover and closes with Escape", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) <= 1100);
    await page.goto("/");
    const nav = mainNavigation(page);
    const work = nav.getByRole("button", { name: "Trabalhos" });
    const career = nav.getByRole("link", { name: "Trajetória" });
    const workflow = nav.getByRole("link", { name: "Workflow" });
    await expect(career).toBeHidden();
    await work.hover();
    await expect(career).toBeVisible();
    await expect(workflow).toBeVisible();
    await work.focus();
    await page.keyboard.press("Escape");
    await expect(career).toBeHidden();
  });

  test("marks only the open page as current", async ({ page }) => {
    await page.goto("/trajetoria.html");
    await openMenu(page);
    const nav = mainNavigation(page);
    await nav.getByRole("button", { name: "Trabalhos" }).click();
    await expect(nav.locator('a[href="./trajetoria.html"]')).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);

    await page.goto("/");
    await openMenu(page);
    await expect(mainNavigation(page).locator('a[aria-current="page"]')).toHaveCount(0);
  });

  test("opens the about section from the main menu", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const nav = mainNavigation(page);
    await expect(nav.locator('a[href="./index.html#mapa"]')).toHaveCount(0);
    const about = nav.getByRole("link", { name: "Sobre" });
    await about.click();
    await expect(page).toHaveURL(/#sobre$/);
    await expect(page.locator("#sobre")).toBeInViewport();
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
