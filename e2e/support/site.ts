import type { Page } from "@playwright/test";

export const pagePaths = [
  "index.html",
  "trajetoria.html",
  "pratica.html",
  "workflow.html",
  "setup.html",
  "ferramentas.html",
  "games.html",
] as const;

export const mainNavigation = (page: Page) => page.locator("header nav");

export async function openMenu(page: Page) {
  const toggle = page.locator(".menu-toggle");
  if (await toggle.isVisible()) await toggle.click();
}

export const hasHorizontalScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
