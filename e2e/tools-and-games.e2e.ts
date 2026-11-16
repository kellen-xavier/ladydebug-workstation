import { expect, test } from "@playwright/test";

test.describe("setup, tools and games", () => {
  test("copies an install command to the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ferramentas.html");
    const tool = page.locator(".tool").first();
    const command = ((await tool.locator("code").textContent()) ?? "").trim();
    expect(command.length).toBeGreaterThan(0);
    await tool.locator(".copy-button").click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(command);
  });

  test("filters the games library and updates the selected state", async ({ page }) => {
    await page.goto("/games.html");
    const cards = page.locator(".game");
    const filters = page.locator(".filters button");
    expect(await filters.count()).toBeGreaterThan(1);
    await expect(filters.nth(0)).toHaveAttribute("aria-pressed", "true");
    const allGames = await cards.count();

    await filters.nth(1).click();
    await expect(filters.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(filters.nth(0)).toHaveAttribute("aria-pressed", "false");
    const filteredGames = await cards.count();
    expect(filteredGames).toBeLessThan(allGames);

    await filters.nth(0).click();
    await expect(cards).toHaveCount(allGames);
  });
});
