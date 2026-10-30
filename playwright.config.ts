import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  reporter: "list",
  use: {
    baseURL: "http://localhost:4174",
    browserName: "chromium",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
    { name: "narrow-mobile", use: { viewport: { width: 320, height: 812 }, hasTouch: true } },
  ],
  webServer: {
    command:
      process.env.PLAYWRIGHT_SERVER === "production"
        ? "bun run build && PORT=4174 bun scripts/preview.ts"
        : "bun --port=4174 scripts/dev.ts",
    url: "http://localhost:4174",
    reuseExistingServer: false,
  },
});
