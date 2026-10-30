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
