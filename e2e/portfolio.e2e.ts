import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("shows the complete primary action in the first viewport", async ({ page }) => {
  const action = page.locator('.hero a[href="#pratica"]');
  await expect(action).toBeVisible();
  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  expect(box?.y).toBeGreaterThanOrEqual(0);
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(page.viewportSize()?.height ?? 0);
});

test("places the about block below topics with clear spacing before the work examples", async ({
  page,
}) => {
  expect(await page.locator(".topics").evaluate((topics) => topics.nextElementSibling?.id)).toBe(
    "sobre",
  );
  await expect(page.locator("#sobre")).toHaveCount(1);
  const topics = await page.locator(".topics").boundingBox();
  const about = await page.locator("#sobre").boundingBox();
  const workHeading = await page.locator("#pratica .section-head").boundingBox();
  if (!topics || !about || !workHeading) throw new Error("Portfolio sections are missing");
  expect(about.y - (topics.y + topics.height)).toBeGreaterThanOrEqual(24);
  expect(workHeading.y - (about.y + about.height)).toBeGreaterThanOrEqual(24);
  await page.locator('nav a[href="#sobre"]').click();
  await expect(page.locator("#sobre")).toBeInViewport();
});

test("shows a contribution preview while keeping report details collapsible", async ({ page }) => {
  const reports = page.locator("details.case");
  await expect(reports).toHaveCount(4);
  for (const report of await reports.all()) {
    await expect(report).not.toHaveAttribute("open");
    await expect(report.locator(":scope > summary .case-excerpt")).toBeVisible();
    await expect(report.locator(".case-limit")).toBeHidden();
  }
  const mobile = page.locator("#mobile");
  await mobile.locator(":scope > summary").focus();
  await page.keyboard.press("Enter");
  await expect(mobile.locator(".case-limit")).toBeVisible();
  await mobile.locator(".provenance > summary").click();
  await expect(mobile.locator(".provenance")).toHaveAttribute("open", "");
  await expect(mobile.locator(".provenance")).toContainText("SHA-256");
});

test("provides comfortable touch targets for navigation and standalone links", async ({ page }) => {
  const targets = page.locator(
    "nav a, .hero .text-link, .repo-link, .flow-ref, footer a, .cycle a, .projects .text-link",
  );
  for (const target of await targets.all()) {
    const box = await target.boundingBox();
    const label = (await target.textContent()) ?? "Standalone link";
    expect(box?.height, label).toBeGreaterThanOrEqual(44);
    expect(box?.width, label).toBeGreaterThanOrEqual(44);
  }
});

test("keeps all content within the viewport and preserves anchor destinations", async ({
  page,
}) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links.every((link) => document.getElementById((link as HTMLAnchorElement).hash.slice(1))),
      ),
  ).toBe(true);
  await page.locator('nav a[href="#fluxo"]').click();
  await expect(page).toHaveURL(/#fluxo$/);
  await page.locator('.flow-ref[href="#mobile"]').click();
  await expect(page.locator("#mobile")).toHaveAttribute("open", "");
});

test("arranges mobile navigation in two balanced columns", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 560, "Applies to the mobile layout");
  const links = page.locator("nav a");
  const boxes = await Promise.all((await links.all()).map((link) => link.boundingBox()));
  expect(boxes[0]?.y).toBe(boxes[1]?.y);
  expect(boxes[2]?.y).toBe(boxes[3]?.y);
  expect(boxes[0]?.x).toBe(boxes[2]?.x);
  expect(boxes[0]?.width).toBe(boxes[1]?.width);
});

test("keeps the mobile workflow steps compact while retaining all four steps", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 560, "Applies to the mobile layout");
  await expect(page.locator(".workflow > li")).toHaveCount(4);
  const box = await page.locator(".workflow").boundingBox();
  expect(box?.height).toBeLessThan(900);
});

test("centers the workflow heading above its editable Markdown content", async ({ page }) => {
  const heading = page.locator("#fluxo .section-head > div").first();
  const introduction = page.locator("#fluxo .flow-intro");
  const sectionBox = await page.locator("#fluxo").boundingBox();
  const titleBox = await heading.boundingBox();
  const introBox = await introduction.boundingBox();
  expect(sectionBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(introBox).not.toBeNull();
  if (!sectionBox || !titleBox || !introBox) throw new Error("Workflow content is missing");
  const center = sectionBox.x + sectionBox.width / 2;
  expect(Math.abs(titleBox.x + titleBox.width / 2 - center)).toBeLessThan(1);
  expect(Math.abs(introBox.x + introBox.width / 2 - center)).toBeLessThan(1);
  expect(introBox.y).toBeGreaterThanOrEqual(titleBox.y + titleBox.height + 16);
  await expect(page.locator("#fluxo h2")).toHaveCSS("text-align", "center");
  await expect(introduction).toHaveCSS("text-align", "center");
});

test("centers the workflow steps and closing message", async ({ page }) => {
  for (const element of await page.locator(".workflow h3, .workflow p, .flow-ref, .cycle").all()) {
    await expect(element).toHaveCSS("text-align", "center");
  }
  for (const link of await page.locator(".flow-ref").all()) {
    await expect(link).toHaveCSS("justify-content", "center");
  }
});

test("uses one subtitle style for all workflow introduction headings", async ({ page }) => {
  const introduction = page.locator(".flow-intro");
  await expect(introduction.locator("h1, h2, h3, h4, h5, h6")).toHaveCount(0);
  const subtitles = introduction.locator(".flow-subtitle");
  await expect(subtitles).toHaveCount(2);
  const styles = await subtitles.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        font: style.fontFamily,
        size: style.fontSize,
        weight: style.fontWeight,
        align: style.textAlign,
      };
    }),
  );
  expect(styles[0]).toEqual(styles[1]);
  expect(styles[0]?.align).toBe("center");
});

test("opens the full workflow page and supports direct reload and return navigation", async ({
  page,
}) => {
  const action = page.getByRole("link", { name: "Conhecer meu Workflow", exact: true });
  await expect(action).toHaveAttribute("href", "./workflow.html");
  await action.click();
  await expect(page).toHaveURL(/\/workflow\.html$/);
  await expect(page).toHaveTitle(/Workflow.*Ladydebug/);
  await expect(page.locator("h1")).toHaveText("Workflow de Trabalho e Aprendizados");
  await expect(
    page.getByRole("heading", { name: "Como é o fluxo do desenvolvimento?" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".workflow-page")).toContainText("Meu Definition of Done de Estudos");
  await expect(page.locator('.workflow-page input[type="checkbox"]')).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Voltar ao portfólio", exact: true }).click();
  await expect(page).toHaveURL(/\/index\.html#fluxo$/);
  await expect(page.locator("#fluxo")).toBeInViewport();
});

test("loads local Markdown images and keeps them within the article width", async ({ page }) => {
  await page.goto("/workflow.html");
  const image = page.getByRole("img", { name: "workflow", exact: true });
  await image.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      image.evaluate((element) => {
        const image = element as HTMLImageElement;
        return image.complete && image.naturalWidth > 0;
      }),
    )
    .toBe(true);
  const source = await image.getAttribute("src");
  expect(source).not.toMatch(/^\/src\//);
  const article = await page.locator(".workflow-page").boundingBox();
  const box = await image.boundingBox();
  if (!article || !box) throw new Error("Workflow image is missing");
  expect(box.width).toBeGreaterThan(0);
  expect(box.x).toBeGreaterThanOrEqual(article.x);
  expect(box.x + box.width).toBeLessThanOrEqual(article.x + article.width + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
