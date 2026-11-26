import { expect, test } from "@playwright/test";
import { mainNavigation, openMenu } from "./support/site";

test.describe("primary navigation", () => {
  test("keeps the primary header at the top while scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(600);
    await expect(header).toBeInViewport();
    await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
    await expect(page.locator(".staggered-menu")).toHaveCount(0);
  });

  test("opens navigation from the sticky header on compact screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 1100);
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
    const toggle = page.locator("header .menu-toggle");
    await expect(toggle).toBeInViewport();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(mainNavigation(page).getByRole("button", { name: "Trabalhos" })).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await mainNavigation(page).getByRole("button", { name: "Trabalhos" }).click();
    await mainNavigation(page).locator('a[href="./workflow.html"]').click();
    await expect(page).toHaveURL(/\/workflow\.html$/);
  });

  test("shows a vector blog icon that adapts to light and dark colors", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const blog = page.locator('header .social a[aria-label="Blog"]');
    const icon = blog.locator(".social-blog-icon");
    await expect(icon).toBeVisible();
    const githubIcon = page.locator('header .social a[aria-label="GitHub"] svg');
    const blogSize = await icon.boundingBox();
    const githubSize = await githubIcon.boundingBox();
    expect(blogSize?.width).toBe(githubSize?.width);
    expect(blogSize?.height).toBe(githubSize?.height);
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
      "projetos-e-estudos.html",
      "workflow.html",
      "setup.html",
      "ferramentas.html",
      "contato.html",
    ]) {
      await page.goto("/");
      await openMenu(page);
      if (path === "trajetoria.html") {
        await mainNavigation(page).getByRole("button", { name: "Sobre" }).click();
      }
      if (["pratica.html", "projetos-e-estudos.html", "workflow.html"].includes(path)) {
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
    const workflow = nav.getByRole("link", { name: "Workflow" });
    await work.hover();
    await expect(workflow).toBeVisible();
    await expect(nav.locator("#work-submenu a[href='./trajetoria.html']")).toHaveCount(0);
    await work.focus();
    await page.keyboard.press("Escape");
    await expect(workflow).toBeHidden();
  });

  test("reveals about and career destinations from Sobre", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const nav = mainNavigation(page);
    const about = nav.getByRole("button", { name: "Sobre" });
    const career = nav.getByRole("link", { name: "Trajetória" });
    await expect(career).toBeHidden();
    await about.click();
    await expect(nav.locator('a[href="./index.html#sobre"]')).toBeVisible();
    await expect(career).toBeVisible();
  });

  test("marks only the open page as current", async ({ page }) => {
    await page.goto("/trajetoria.html");
    await openMenu(page);
    const nav = mainNavigation(page);
    await nav.getByRole("button", { name: "Sobre" }).click();
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
    await nav.getByRole("button", { name: "Sobre" }).click();
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
