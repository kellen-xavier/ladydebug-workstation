import { expect, test } from "@playwright/test";

test.describe("workflow page", () => {
  test("loads directly and survives reload", async ({ page }) => {
    await page.goto("/workflow.html");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("shows the team workflow in order and keeps work examples reachable", async ({ page }) => {
    await page.goto("/workflow.html");
    const flow = page.locator("#fluxo");
    await expect(flow.getByRole("heading", { level: 1 })).toHaveText(
      /Entender\. Construir\.\s*Aprender\. Evoluir\./,
    );
    await expect(flow.getByRole("heading", { level: 2 })).toHaveText([
      "Entender o contexto",
      "Construir com a equipe",
      "Aprender na prática",
      "Evoluir a cada entrega",
    ]);
    const details = page.locator(".workflow-page");
    await expect(details.getByRole("heading", { level: 2 })).toHaveText([
      "Entender o contexto e os gargalos",
      "Construir melhorias com a equipe",
      "Aprender com mentoria e prática",
      "Evoluir a partir do que observamos",
      "Como uso ferramentas e IA",
    ]);
    await flow.getByRole("link", { name: "Ver o caso de cadastro" }).click();
    await expect(page).toHaveURL(/\/pratica\.html#cadastro$/);
  });
});
