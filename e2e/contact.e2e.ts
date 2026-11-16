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
    const href = await emailLink.getAttribute("href");
    expect(href).toBeTruthy();
    const [recipient, query] = (href ?? "").replace("mailto:", "").split("?");
    expect(recipient).toBe("kellenxaviier@gmail.com");
    expect(new URLSearchParams(query).get("subject")).toBe("Vamos conversar");
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
