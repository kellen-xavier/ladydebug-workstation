import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/App";
import { Brand } from "../src/components/Brand";
import { projects } from "../src/data/site";

const markup = () => renderToStaticMarkup(<App />);

describe("portfólio de trabalho", () => {
  test("permite navegar para contribuições, fluxo e projetos por âncoras existentes", () => {
    const html = markup();
    for (const id of ["pratica", "fluxo", "projetos", "sobre"]) {
      expect(html).toContain(`href="#${id}"`);
      expect(html).toContain(`id="${id}"`);
    }
  });

  test("apresenta quatro casos com origem documental e limites da comprovação", () => {
    const html = markup();
    for (const id of ["mobile", "backend", "cadastro", "unity"]) {
      const caseHtml = html.match(
        new RegExp(`<details[^>]+id="${id}"[^>]*>([\\s\\S]*?)</details>\\s*</div>\\s*</details>`),
      )?.[1];
      expect(caseHtml).toBeDefined();
      expect(caseHtml).toContain("Alcance da evidência:");
      expect(caseHtml).toContain("Origem e referências do relatório");
      expect(caseHtml).toContain("SHA-256");
    }
  });

  test("preserva o fluxo aprovado com links para exemplos de trabalho", () => {
    const html = markup();
    for (const title of [
      "Entender o contexto",
      "Construir e testar",
      "Revisar e evidenciar",
      "Acompanhar e evoluir",
    ]) {
      expect(html).toContain(title);
    }
    expect(html).toContain("os testes acompanham a implementação");
    for (const id of ["mobile", "cadastro", "backend", "unity"]) {
      expect(html).toContain(`href="#${id}"`);
    }
    expect(html).not.toMatch(/Vamos conversar|Fale comigo|Seu próximo projeto/);
  });

  test("inclui Bot Planner com destino público e descreve Slack como evolução prevista", () => {
    const planner = projects.find((project) => project.url.endsWith("/ladydebug-bot-planner"));
    expect(planner).toBeDefined();
    expect(planner?.description).toContain("Discord");
    expect(planner?.description).toContain("Slack é uma evolução prevista");
    expect(markup()).toContain('href="https://github.com/kellen-xavier/ladydebug-bot-planner"');
  });

  test("exibe a marca apenas como ladydebug", () => {
    expect(renderToStaticMarkup(<Brand />)).toMatch(/>ladydebug<\/a>/);
  });
});
