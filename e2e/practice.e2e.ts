import { expect, test } from "@playwright/test";

test.describe("work cases", () => {
  test("matches the prototype's alternating cover proportions", async ({ page }) => {
    await page.goto("/pratica.html");
    const covers = page.locator(".work-item .work-cover");
    const first = await covers.nth(0).boundingBox();
    const second = await covers.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    if (!first || !second) return;

    if ((page.viewportSize()?.width ?? 0) > 700) {
      expect(first.width / first.height).toBeCloseTo(16 / 10, 2);
      expect(second.width / second.height).toBeCloseTo(4 / 5, 2);
      expect(second.y - first.y).toBeCloseTo(56, 0);
    } else {
      expect(first.width / first.height).toBeCloseTo(16 / 10, 2);
      expect(second.width / second.height).toBeCloseTo(16 / 10, 2);
    }
  });

  test("opens a case from the grid and returns to all work", async ({ page }) => {
    await page.goto("/pratica.html");
    const cards = page.locator(".work-item");
    expect(await cards.count()).toBeGreaterThan(0);
    const first = cards.first().locator("a");
    const id = (await first.getAttribute("href"))?.slice(1);
    expect(id).toBeTruthy();

    await first.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`.work-detail#${id}`)).toBeVisible();
    await expect(cards.first()).toBeHidden();

    await page.locator(".work-detail a[href='#pratica']").first().click();
    await expect(cards.first()).toBeVisible();
  });

  test("keeps the next work link clear on hover", async ({ page }) => {
    await page.goto("/pratica.html#web");
    const next = page.locator(".work-detail#web .work-next a");
    await next.hover();
    await expect(next).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const destination = await next.getAttribute("href");
    await next.click();
    await expect(page).toHaveURL(new RegExp(`${destination}$`));
  });

  test("opens a linked case directly and keeps evidence disclosures keyboard accessible", async ({
    page,
  }) => {
    await page.goto("/pratica.html#web");
    const detail = page.locator(".work-detail#web");
    await expect(detail).toBeVisible();
    const disclosure = detail.locator("details.provenance").first();
    await disclosure.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
  });

  test("keeps external case references in a protected tab", async ({ page }) => {
    await page.goto("/pratica.html#site-web");
    const link = page.locator('.work-detail#site-web a[target="_blank"]').first();
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const destination = await link.getAttribute("href");
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(destination ?? "");
    await popup.close();
  });
});
