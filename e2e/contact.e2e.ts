import { expect, test } from "@playwright/test";
import { openMenu } from "./support/site";

test.describe("contact page", () => {
  test("opens from navigation and offers a direct email conversation", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    await page.getByRole("navigation").locator('a[href="./contato.html"]').click();
    await expect(page).toHaveURL(/\/contato\.html$/);

    const main = page.getByRole("main");
    await expect(main.locator("form")).toHaveCount(0);
    await expect(main.getByRole("button")).toHaveCount(0);
    const emailLink = main.getByRole("link", { name: /Vamos conversar/ });
    await expect(emailLink).toBeVisible();
    await expect(emailLink.locator("small")).toHaveCount(0);
    const href = await emailLink.getAttribute("href");
    expect(href).toMatch(/^mailto:/);
    const destination = new URL(href ?? "mailto:");
    expect(destination.pathname).toBe("kellenxaviier@gmail.com");
    expect(destination.searchParams.get("subject")?.trim()).toBeTruthy();
    await emailLink.click();
    await expect(page).toHaveURL(/\/contato\.html$/);
  });

  test("keeps the email tooltip next to the pointer and available on focus", async ({ page }) => {
    await page.goto("/contato.html");
    const emailLink = page.locator(".contact-email");
    const tooltip = page.getByRole("tooltip");

    await expect(tooltip).toBeHidden();
    const linkBox = await emailLink.boundingBox();
    expect(linkBox).not.toBeNull();
    if (!linkBox) return;
    const pointerX = linkBox.x + 100;
    const pointerY = linkBox.y + 72;
    await page.mouse.move(pointerX, pointerY);
    await expect(tooltip).toBeVisible();
    const first = await tooltip.boundingBox();
    expect(first).not.toBeNull();
    if (first && (page.viewportSize()?.width ?? 0) > 900) {
      expect(Math.abs(first.y - pointerY)).toBeLessThanOrEqual(30);
      expect(Math.abs(first.x - pointerX)).toBeLessThanOrEqual(30);
      await page.mouse.move(pointerX + 80, pointerY + 20);
      const moved = await tooltip.boundingBox();
      expect((moved?.x ?? 0) - first.x).toBeGreaterThan(40);
    }
    if (first && (page.viewportSize()?.width ?? 0) <= 700) {
      const social = await page.locator(".contact-social").boundingBox();
      expect(social).not.toBeNull();
      expect(first.y + first.height).toBeLessThanOrEqual(social?.y ?? 0);
    }
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();
    await emailLink.focus();
    await expect(tooltip).toBeVisible();
    await expect(emailLink).toHaveAttribute(
      "aria-describedby",
      (await tooltip.getAttribute("id")) ?? "",
    );
  });

  test("offers visible social destinations with safe external links", async ({ page }) => {
    await page.goto("/contato.html");
    const links = page.locator("main .contact-social a");
    await expect(links).toHaveCount(3);
    const heading = await page.locator("main .contact-social h2").boundingBox();
    const firstLink = await links.first().boundingBox();
    expect(heading).not.toBeNull();
    expect(firstLink).not.toBeNull();
    if (heading && firstLink) expect(heading.y + heading.height).toBeLessThan(firstLink.y);
    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /^https:\/\//);
    }
  });
});
