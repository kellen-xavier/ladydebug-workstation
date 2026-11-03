import { expect, type Page, test } from "@playwright/test";

// Internal pages reachable from the main navigation, with the title and the
// level-1 heading each one must render. Drives the cross-page navigation checks.
const pages = [
  { nav: "Trajetória", path: "trajetoria.html", title: /^Trajetória —/, heading: "Trajetória" },
  {
    nav: "Na prática",
    path: "pratica.html",
    title: /^Na prática —/,
    heading: "O que faço, na prática.",
  },
  {
    nav: "Workflow",
    path: "workflow.html",
    title: /^Workflow de trabalho —/,
    heading: "Workflow de Trabalho e Aprendizados",
  },
  { nav: "Setup", path: "setup.html", title: /^Setup —/, heading: "Setup" },
  { nav: "Ferramentas", path: "ferramentas.html", title: /^Ferramentas —/, heading: "Ferramentas" },
  { nav: "Games", path: "games.html", title: /^Games —/, heading: "Games" },
] as const;

const allPaths = ["index.html", ...pages.map((page) => page.path)] as const;

const mainNav = (page: Page) => page.getByRole("navigation", { name: "Navegação principal" });

const hasHorizontalScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

test.describe("primary navigation", () => {
  test("opens every internal page from the home navigation", async ({ page }) => {
    for (const entry of pages) {
      await page.goto("/");
      await mainNav(page).getByRole("link", { name: entry.nav, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${entry.path}$`));
      await expect(page).toHaveTitle(entry.title);
      await expect(page.getByRole("heading", { level: 1, name: entry.heading })).toBeVisible();
    }
  });

  test("marks only the open page as the current one", async ({ page }) => {
    await page.goto("/trajetoria.html");
    const nav = mainNav(page);
    await expect(nav.getByRole("link", { name: "Trajetória", exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);

    // The home page exposes Sobre/Mapa as in-page anchors, so none is "current".
    await page.goto("/");
    await expect(mainNav(page).locator('a[aria-current="page"]')).toHaveCount(0);
  });

  test("scrolls to the home sections from the navigation anchors", async ({ page }) => {
    await page.goto("/");
    for (const anchor of ["sobre", "mapa"] as const) {
      await mainNav(page)
        .getByRole("link", { name: anchor === "sobre" ? "Sobre" : "Mapa", exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
    }
  });

  test("exposes GitHub, LinkedIn and Blog as external social links", async ({ page }) => {
    await page.goto("/");
    const social = page.getByRole("group", { name: "Redes" });
    const expected = {
      GitHub: "https://github.com/kellen-xavier",
      LinkedIn: "https://www.linkedin.com/in/kellen-xavier/",
      Blog: "https://kellen-xavier.github.io/ladydebug.github.io/",
    };
    for (const [label, href] of Object.entries(expected)) {
      const link = social.getByRole("link", { name: label, exact: true });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the primary call to action within the first viewport", async ({ page }) => {
    const action = page.getByRole("link", { name: "Explorar o mapa ↓" });
    await expect(action).toBeVisible();
    await expect(action).toHaveAttribute("href", "#mapa");
    await expect(action).toBeInViewport();
  });

  test("links the site map places to their destinations", async ({ page }) => {
    await expect(page.locator("ul.site-map > li")).toHaveCount(9);
    await page.getByRole("link", { name: /O museu/ }).click();
    await expect(page).toHaveURL(/\/trajetoria\.html$/);
  });

  test("points the how-I-work panels to the matching pages", async ({ page }) => {
    const panels = {
      "Ver meu workflow →": "./workflow.html",
      "Ver setup →": "./setup.html",
      "Ver ferramentas →": "./ferramentas.html",
    };
    for (const [label, href] of Object.entries(panels)) {
      await expect(page.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  test("offers the CV as a downloadable PDF", async ({ page }) => {
    const download = page.getByRole("link", { name: "Baixar CV ↓" });
    await expect(download).toHaveAttribute("href", "./cv-kellen-xavier.pdf");
    await expect(download).toHaveAttribute("download", "");
  });

  test("renders the simplified footer without badges or social links", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("code & tests · keep the web personal")).toBeVisible();
    await expect(footer.getByRole("link", { name: /GitHub|LinkedIn|Blog/ })).toHaveCount(0);
    await expect(footer.locator("ul")).toHaveCount(0);
  });
});

test.describe("na prática — work cases", () => {
  test("keeps the four reports collapsed with a visible excerpt", async ({ page }) => {
    await page.goto("/pratica.html");
    const reports = page.locator("details.case");
    await expect(reports).toHaveCount(4);
    for (const report of await reports.all()) {
      await expect(report).not.toHaveAttribute("open", "");
      await expect(report.locator(":scope > summary .case-excerpt")).toBeVisible();
      await expect(report.locator(".case-limit")).toBeHidden();
    }
  });

  test("expands a report with the keyboard and reveals its limits and provenance", async ({
    page,
  }) => {
    await page.goto("/pratica.html");
    const mobile = page.locator("#mobile");
    await mobile.locator(":scope > summary").focus();
    await page.keyboard.press("Enter");
    await expect(mobile).toHaveAttribute("open", "");
    await expect(mobile.locator(".case-limit")).toBeVisible();

    const provenance = mobile.locator(".provenance");
    await provenance.locator(":scope > summary").click();
    await expect(provenance).toHaveAttribute("open", "");
    await expect(provenance).toContainText("SHA-256");
  });

  test("auto-opens the case referenced by the URL hash", async ({ page }) => {
    await page.goto("/pratica.html#backend");
    await expect(page.locator("#backend")).toHaveAttribute("open", "");
    await expect(page.locator("#backend")).toBeInViewport();
  });

  test("links each career case back to its report on the practice page", async ({ page }) => {
    await page.goto("/trajetoria.html");
    await expect(page.getByRole("link", { name: "Mobile →" })).toHaveAttribute(
      "href",
      "./pratica.html#mobile",
    );
  });
});

test.describe("workflow page", () => {
  test("loads directly, survives reload and offers a readable study checklist", async ({
    page,
  }) => {
    await page.goto("/workflow.html");
    await expect(
      page.getByRole("heading", { level: 1, name: "Workflow de Trabalho e Aprendizados" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Como é o fluxo do desenvolvimento?" }),
    ).toBeVisible();

    await page.reload();
    await expect(page.locator(".workflow-page")).toContainText("Meu Definition of Done de Estudos");
    await expect(page.getByRole("checkbox")).toHaveCount(6);
  });

  test("loads the local Markdown image through the bundler, not the source path", async ({
    page,
  }) => {
    await page.goto("/workflow.html");
    const image = page.getByRole("img", { name: "workflow", exact: true });
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0))
      .toBe(true);
    expect(await image.getAttribute("src")).not.toMatch(/^\/src\//);
  });
});

test.describe("setup, tools and games", () => {
  test("groups the setup specs into labelled panels", async ({ page }) => {
    await page.goto("/setup.html");
    await expect(page.locator(".setup-grid .panel")).not.toHaveCount(0);
    await expect(page.locator(".setup-grid .panel h2").first()).toBeVisible();
    await expect(page.locator(".page-note a")).toHaveAttribute("href", "./ferramentas.html");
  });

  test("lists each tool with an install command and a copy button", async ({ page }) => {
    await page.goto("/ferramentas.html");
    const tool = page.locator(".tool").first();
    await expect(tool.locator("code")).toBeVisible();
    await expect(tool.getByRole("button", { name: /^copiar:/ })).toBeVisible();
    await expect(tool.getByRole("link", { name: "Site oficial ↗" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  test("copies an install command to the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ferramentas.html");
    const tool = page.locator(".tool").first();
    const command = ((await tool.locator("code").textContent()) ?? "").trim();
    expect(command.length).toBeGreaterThan(0);
    await tool.getByRole("button", { name: /^copiar:/ }).click();
    await expect(tool.getByText("copiado")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(command);
  });

  test("filters the games library by status", async ({ page }) => {
    await page.goto("/games.html");
    const cards = page.locator(".game");
    await expect(cards).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Todos" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const playing = page.getByRole("button", { name: "Jogando" });
    await playing.click();
    await expect(playing).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(0);

    await page.getByRole("button", { name: "Todos" }).click();
    await expect(cards).toHaveCount(1);
  });
});

test.describe("responsive layout invariants", () => {
  for (const path of allPaths) {
    test(`avoids horizontal scrolling on ${path}`, async ({ page }) => {
      await page.goto(`/${path}`);
      expect(await hasHorizontalScroll(page)).toBe(false);
    });
  }

  test("resolves every in-page anchor to an existing element", async ({ page }) => {
    for (const path of allPaths) {
      await page.goto(`/${path}`);
      const unresolved = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .map((link) => (link as HTMLAnchorElement).hash.slice(1))
            .filter((id) => id.length > 0 && !document.getElementById(id)),
        );
      expect(unresolved, `${path} has anchors without a target`).toEqual([]);
    }
  });

  test("keeps primary tap targets comfortable on touch devices", async ({ page }) => {
    test.skip(!test.info().project.use.hasTouch, "Applies to touch viewports");
    await page.goto("/");
    const targets = page.locator("nav a, .button, .social a");
    for (const target of await targets.all()) {
      const box = await target.boundingBox();
      const label = (await target.textContent())?.trim() || "tap target";
      expect(box?.height, label).toBeGreaterThanOrEqual(44);
    }
  });
});
