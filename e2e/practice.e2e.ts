import { expect, test } from "@playwright/test";

test.describe("practice reports", () => {
  test("uses the same heading typography as other internal pages", async ({ page }) => {
    await page.goto("/setup.html");
    const typography = await page.getByRole("heading", { level: 1 }).evaluate((element) => {
      const style = getComputedStyle(element);
      return { family: style.fontFamily, size: style.fontSize, weight: style.fontWeight };
    });
    await page.goto("/pratica.html");
    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toHaveCSS("font-family", typography.family);
    await expect(title).toHaveCSS("font-size", typography.size);
    await expect(title).toHaveCSS("font-weight", typography.weight);
  });

  test("keeps reports collapsed and their summaries available", async ({ page }) => {
    await page.goto("/pratica.html");
    const reports = page.locator("details.case");
    await expect(reports).toHaveCount(6);
    for (const report of await reports.all()) {
      await expect(report).not.toHaveAttribute("open", "");
      await expect(report.locator(":scope > summary")).toBeVisible();
      await expect(report.locator(":scope > summary .case-excerpt")).toBeVisible();
    }
  });

  test("opens the published services project in a protected external tab", async ({ page }) => {
    await page.goto("/pratica.html");
    const report = page.locator("#site-web");
    await report.locator(":scope > summary").click();
    const publishedSite = report.locator('a[href="https://elementarprojetos.com.br"]');
    await expect(publishedSite).toHaveAttribute("target", "_blank");
    await expect(publishedSite).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("opens a report and toggles the evidence disclosure with the keyboard", async ({ page }) => {
    await page.goto("/pratica.html");
    const report = page.locator("#mobile");
    await report.locator(":scope > summary").focus();
    await page.keyboard.press("Enter");
    await expect(report).toHaveAttribute("open", "");

    const evidence = report.locator(".case-body > details.provenance").first();
    const summary = evidence.locator(":scope > summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(evidence).toHaveAttribute("open", "");
    await expect(report.locator(".case-limit")).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(evidence).not.toHaveAttribute("open", "");
    await expect(report.locator(".case-limit")).not.toBeVisible();
  });

  test("opens the report identified by the URL fragment", async ({ page }) => {
    await page.goto("/pratica.html#backend");
    await expect(page.locator("#backend")).toHaveAttribute("open", "");
    await expect(page.locator("#backend")).toBeInViewport();
  });

  test("links career entries to existing practice reports", async ({ page }) => {
    await page.goto("/trajetoria.html");
    const reportLink = page.locator('a[href="./pratica.html#mobile"]');
    await expect(reportLink).toBeVisible();
    await reportLink.click();
    await expect(page).toHaveURL(/\/pratica\.html#mobile$/);
    await expect(page.locator("#mobile")).toHaveAttribute("open", "");
  });
});
