import { expect, test } from "@playwright/test";

test.describe("setup and tools", () => {
  test("copies an install command to the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ferramentas.html");
    const tool = page.locator(".tool").first();
    const command = ((await tool.locator("code").textContent()) ?? "").trim();
    expect(command.length).toBeGreaterThan(0);
    await tool.locator(".copy-button").click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(command);
  });

  test("keeps the unfinished games route available as a placeholder", async ({ page }) => {
    await page.goto("/games.html");
    await expect(page).toHaveURL(/\/games\.html$/);
    await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator(".game, .filters, .game-organization")).toHaveCount(0);
  });
});
