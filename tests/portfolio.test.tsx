import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Brand } from "../src/components/Brand";
import { HomePage } from "../src/components/HomePage";
import { PracticePage } from "../src/components/PracticePage";
import { Workflow } from "../src/components/Workflow";
import { projects } from "../src/data/site";

const markup = () => renderToStaticMarkup(<HomePage />);

describe("work portfolio", () => {
  test("keeps the home anchors used by the navigation", () => {
    const html = markup();
    for (const id of ["sobre", "mapa"]) {
      expect(html).toContain(`href="./index.html#${id}"`);
      expect(html).toContain(`id="${id}"`);
    }
  });

  test("presents four case studies with documentary sources and evidence limitations", () => {
    const html = renderToStaticMarkup(<PracticePage />);
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

  test("preserves the approved workflow with links to the practice page", () => {
    const html = renderToStaticMarkup(<Workflow />);
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
      expect(html).toContain(`href="./pratica.html#${id}"`);
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
