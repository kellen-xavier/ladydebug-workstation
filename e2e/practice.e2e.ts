import { expect, test } from "@playwright/test";

test.describe("practice reports", () => {
  test("keeps reports collapsed and their summaries available", async ({ page }) => {
    await page.goto("/pratica.html");
    const reports = page.locator("details.case");
    expect(await reports.count()).toBeGreaterThan(0);
    for (const report of await reports.all()) {
      await expect(report).not.toHaveAttribute("open", "");
      await expect(report.locator(":scope > summary")).toBeVisible();
      await expect(report.locator(":scope > summary .case-excerpt")).toBeVisible();
    }
  });

  test("opens an external report link in a protected tab", async ({ page }) => {
    await page.goto("/pratica.html");
    const report = page.locator('details.case:has(a[target="_blank"])').first();
    await report.locator(":scope > summary").click();
    const externalLink = report.locator('a[target="_blank"]').first();
    const destination = await externalLink.getAttribute("href");
    await expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = page.waitForEvent("popup");
    await externalLink.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(destination ?? "");
    await popup.close();
  });

  test("opens a report and toggles the evidence disclosure with the keyboard", async ({ page }) => {
    await page.goto("/pratica.html");
    const report = page.locator("details.case:has(details.provenance)").first();
    await report.locator(":scope > summary").focus();
    await page.keyboard.press("Enter");
    await expect(report).toHaveAttribute("open", "");

    const evidence = report.locator(".case-body > details.provenance").first();
    const summary = evidence.locator(":scope > summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(evidence).toHaveAttribute("open", "");

    await page.keyboard.press("Enter");
    await expect(evidence).not.toHaveAttribute("open", "");
  });

  test("opens the report identified by the URL fragment", async ({ page }) => {
    await page.goto("/pratica.html");
    const id = await page.locator("details.case").first().getAttribute("id");
    expect(id).toBeTruthy();
    await page.goto(`/pratica.html#${id}`);
    await expect(page.locator(`details.case#${id}`)).toHaveAttribute("open", "");
    await expect(page.locator(`details.case#${id}`)).toBeInViewport();
  });
});
