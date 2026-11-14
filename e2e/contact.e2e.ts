import { expect, test } from "@playwright/test";
import { openMenu } from "./support/site";

test.describe("service contact", () => {
  test("opens the contact page from navigation and reveals the selected request form", async ({
    page,
  }) => {
    await page.goto("/");
    await openMenu(page);
    await page.getByRole("navigation").getByRole("link", { name: "Contate serviços" }).click();
    await expect(page).toHaveURL(/\/contato\.html$/);

    await expect(page.getByLabel("Seu nome")).toHaveCount(0);
    await page.getByRole("button", { name: /Consultoria ou mentoria/ }).click();
    await expect(page.getByLabel("Tipo de apoio")).toBeVisible();
    await expect(page.getByLabel("Seu e-mail")).toBeVisible();
    await page.getByLabel("Assunto").fill("Um tema de mentoria");

    await page.getByRole("button", { name: /Divulgar meu serviço/ }).click();
    await expect(page.getByLabel("Nome do serviço")).toBeVisible();
    await expect(page.getByLabel("Link da apresentação")).toBeVisible();
    await expect(page.getByLabel("Link da apresentação")).toHaveValue("");
    await expect(page.getByLabel("Tipo de apoio")).toHaveCount(0);
  });

  test("sends the selected service request and confirms receipt", async ({ page }) => {
    await page.goto("/contato.html");
    await page.getByRole("button", { name: /Consultoria ou mentoria/ }).click();
    await page.getByLabel("Seu nome").fill("Ana Lima");
    await page.getByLabel("Seu e-mail").fill("ana@example.com");
    await page.getByLabel("Tipo de apoio").selectOption("mentoria");
    await page.getByLabel("Assunto").fill("Automação de testes");
    await page
      .getByLabel("Conte um pouco sobre o que precisa")
      .fill("Quero conversar sobre meu plano de estudos.");

    let submitted = "";
    await page.route("https://formsubmit.co/ajax/**", async (route) => {
      submitted = route.request().postData() ?? "";
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: "true" }),
      });
    });

    await page.getByRole("button", { name: "Enviar pedido" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    expect(submitted).toContain("Ana Lima");
    expect(submitted).toContain("ana@example.com");
    expect(submitted).toContain("mentoria");
    expect(submitted).toContain("Automação de testes");
  });

  test("offers an email fallback when sending fails", async ({ page }) => {
    await page.goto("/contato.html");
    await page.getByRole("button", { name: /Divulgar meu serviço/ }).click();
    await page.getByLabel("Seu nome").fill("Bruna Costa");
    await page.getByLabel("Seu e-mail").fill("bruna@example.com");
    await page.getByLabel("Nome do serviço").fill("Design de interfaces");
    await page
      .getByLabel("Conte um pouco sobre o serviço")
      .fill("Crio interfaces para sites e aplicações.");
    await page.route("https://formsubmit.co/ajax/**", (route) => route.fulfill({ status: 503 }));

    await page.getByRole("button", { name: "Enviar pedido" }).click();
    await expect(page.getByRole("alert")).toBeVisible();
    const emailLink = page.getByRole("link", { name: "contate", exact: true });
    await expect(emailLink).toHaveAttribute("href", /^mailto:kellenxaviier@gmail\.com\?/);
  });
});
