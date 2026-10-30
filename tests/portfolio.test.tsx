import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/App";
import { Brand } from "../src/components/Brand";
import { projects } from "../src/data/site";

const markup = () => renderToStaticMarkup(<App />);

describe("work portfolio", () => {
  test("allows navigation to contributions, workflow, and projects via existing anchors", () => {
    const html = markup();
    for (const id of ["pratica", "fluxo", "projetos", "sobre"]) {
      expect(html).toContain(`href="#${id}"`);
      expect(html).toContain(`id="${id}"`);
    }
  });

  test("presents four case studies with documentary sources and evidence limitations", () => {
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

  test("preserves the approved workflow with links to work examples", () => {
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

  test("includes Bot Planner with a public URL and describes Slack as a planned enhancement", () => {
    const planner = projects.find((project) => project.url.endsWith("/ladydebug-bot-planner"));
    expect(planner).toBeDefined();
    expect(planner?.description).toContain("Discord");
    expect(planner?.description).toContain("Slack é uma evolução prevista");
    expect(markup()).toContain('href="https://github.com/kellen-xavier/ladydebug-bot-planner"');
  });

  test("displays the brand only as ladydebug", () => {
    expect(renderToStaticMarkup(<Brand />)).toMatch(/>ladydebug<\/a>/);
  });
});
