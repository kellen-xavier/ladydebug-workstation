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

  test("presents the about portrait slot beside the story and links to the full career", async ({
    page,
  }) => {
    const about = page.locator("#sobre");
    const story = about.locator(".about-story");
    const portrait = about.locator(".about-portrait");
    await expect(story).toBeVisible();
    await expect(portrait).toBeVisible();

    const storyBox = await story.boundingBox();
    const portraitBox = await portrait.boundingBox();
    expect(storyBox).not.toBeNull();
    expect(portraitBox).not.toBeNull();
    if (storyBox && portraitBox && (page.viewportSize()?.width ?? 0) > 780) {
      expect(storyBox.x + storyBox.width).toBeLessThan(portraitBox.x);
    }
    if (storyBox && portraitBox && (page.viewportSize()?.width ?? 0) <= 780) {
      expect(storyBox.y + storyBox.height).toBeLessThan(portraitBox.y);
    }

    await about.locator('a[href="./trajetoria.html"]').click();
    await expect(page).toHaveURL(/\/trajetoria\.html$/);
  });

  test("keeps the portrait colored and fades its block into view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.reload();
    const portrait = page.locator("#sobre .about-portrait");
    const image = portrait.locator("img");
    await expect(image).toHaveJSProperty("complete", true);
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBeGreaterThan(0);
    await expect(image).toHaveCSS("filter", "none");
    await page.waitForTimeout(750);
    expect(await portrait.evaluate((element) => element.getAnimations().length)).toBe(0);
    await expect(portrait).toHaveCSS("opacity", "0.65");
    await portrait.scrollIntoViewIfNeeded();
    await expect
      .poll(() => portrait.evaluate((element) => element.getAnimations().length))
      .toBeGreaterThan(0);
    await expect(portrait).toHaveCSS("opacity", "1");
    const canHover = await page.evaluate(() => matchMedia("(hover: hover)").matches);
    if (canHover) {
      await portrait.hover();
      await expect(image).toHaveCSS("filter", "brightness(1.1) saturate(1.12)");
    }
  });

  test("reveals the portrait when hovered before scrolling to the section", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1100);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.reload();
    const portrait = page.locator("#sobre .about-portrait");
    await expect(portrait.locator("img")).toHaveJSProperty("complete", true);
    await expect(portrait).toHaveCSS("opacity", "0.65");
    const box = await portrait.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;
    await page.mouse.move(box.x + box.width / 2, box.y + 12);
    await expect
      .poll(() => portrait.evaluate((element) => element.getAnimations().length))
      .toBeGreaterThan(0);
  });

  test("reveals the portrait after navigating to About", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.reload();
    await openMenu(page);
    const nav = page.getByRole("navigation", { name: "Navegação principal" });
    await nav.getByRole("button", { name: "Sobre" }).click();
    await nav.getByRole("link", { name: "Sobre" }).click();
    await expect(page).toHaveURL(/#sobre$/);
    const portrait = page.locator("#sobre .about-portrait");
    if ((page.viewportSize()?.width ?? 0) <= 780) await portrait.scrollIntoViewIfNeeded();
    await expect
      .poll(() => portrait.evaluate((element) => element.getAnimations().length))
      .toBeGreaterThan(0);
    await expect(portrait).toHaveCSS("opacity", "1");
  });

  test("waits to reveal the portrait on a fresh desktop visit", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    try {
      const page = await context.newPage();
      await page.goto("/");
      const portrait = page.locator("#sobre .about-portrait");
      await page.waitForTimeout(800);
      expect(await portrait.evaluate((element) => element.getAnimations().length)).toBe(0);
      await portrait.scrollIntoViewIfNeeded();
      await expect
        .poll(() => portrait.evaluate((element) => element.getAnimations().length))
        .toBeGreaterThan(0);
    } finally {
      await context.close();
    }
  });

  test("shows the portrait immediately when reduced motion is requested", async ({ page }) => {
    const portrait = page.locator("#sobre .about-portrait");
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toHaveCSS("opacity", "1");
    await expect(portrait.locator("img")).toHaveCSS("filter", "none");
    await expect(portrait.locator("img")).toHaveCSS("opacity", "1");
    await page.waitForTimeout(100);
    expect(await portrait.evaluate((element) => element.getAnimations().length)).toBe(0);
  });

  test("highlights both workflow and setup panels as a whole", async ({ page }) => {
    test.skip(!(await page.evaluate(() => matchMedia("(hover: hover)").matches)));
    const panels = page.locator("#como-trabalho .panel");
    await expect(panels).toHaveCount(2);
    for (const panel of await panels.all()) {
      await panel.hover();
      await expect(panel).toHaveCSS("background-color", "rgb(240, 212, 223)");
      await expect(panel.locator(".panel-links a").first()).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)",
      );
    }
  });

  test("fades the workflow and setup panel colors when motion is allowed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const panel = page.locator("#como-trabalho .panel").first();
    await panel.hover();
    const immediate = await panel.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(immediate).not.toBe("rgb(240, 212, 223)");
    await expect(panel).toHaveCSS("background-color", "rgb(240, 212, 223)");
  });

  test("bursts sparks on project cards and respects reduced motion", async ({ page }) => {
    const card = page.locator("#projetos .card").first();
    const sparks = card.locator(".click-spark-layer canvas");
    await expect(sparks).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await card.locator("h3").click();
    await expect(sparks).toHaveCount(1);
    await expect
      .poll(() =>
        sparks.evaluate((canvas: HTMLCanvasElement) => {
          const pixels = canvas
            .getContext("2d")
            ?.getImageData(0, 0, canvas.width, canvas.height).data;
          return pixels ? pixels.some((channel, index) => index % 4 === 3 && channel > 0) : false;
        }),
      )
      .toBe(true);
    await expect(sparks).toHaveCount(0, { timeout: 2000 });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await card.locator("h3").click();
    await expect(sparks).toHaveCount(0);
  });

  test("colors each project card pink on hover and keyboard focus", async ({ page }) => {
    test.skip(!(await page.evaluate(() => matchMedia("(hover: hover)").matches)));
    const cards = page.locator("#projetos .card");
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await card.hover();
      await expect(card).toHaveCSS("background-color", "rgb(240, 212, 223)");
    }
    const first = cards.first();
    await page.mouse.move(0, 0);
    await first.locator(".repo-link").focus();
    await expect(first).toHaveCSS("background-color", "rgb(240, 212, 223)");
  });

  test("keeps the projects page link plain while CV and blog buttons turn pink", async ({
    page,
  }) => {
    test.skip(!(await page.evaluate(() => matchMedia("(hover: hover)").matches)));
    const projectsBlog = page.locator("#projetos .section-head .text-link");
    await projectsBlog.hover();
    await expect(projectsBlog).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    for (const selector of ["#cv .button", ".closing .button"]) {
      const link = page.locator(selector).first();
      await link.hover();
      await expect(link).toHaveCSS("background-color", "rgb(240, 212, 223)");
    }
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

  test("gives the main home sections room to read", async ({ page }) => {
    const gap = async (before: string, after: string) => {
      const first = await page.locator(before).last().boundingBox();
      const second = await page.locator(after).first().boundingBox();
      expect(first).not.toBeNull();
      expect(second).not.toBeNull();
      return (second?.y ?? 0) - ((first?.y ?? 0) + (first?.height ?? 0));
    };

    const compact = (page.viewportSize()?.width ?? 0) <= 1000;
    expect(await gap("#como-trabalho .panel", "#projetos .section-head")).toBeGreaterThanOrEqual(
      compact ? 56 : 84,
    );
    expect(await gap("#projetos .card", "#cv")).toBeGreaterThanOrEqual(compact ? 56 : 72);
    expect(await gap("#cv", ".closing")).toBeGreaterThanOrEqual(compact ? 56 : 72);
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
