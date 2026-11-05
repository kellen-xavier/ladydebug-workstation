import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "../src/components/Header";
import { HomePage } from "../src/components/HomePage";
import { PracticePage } from "../src/components/PracticePage";
import { projects } from "../src/components/Projects";
import { Workflow } from "../src/components/Workflow";
import { workCases } from "../src/content/trabalhos";

const markup = () => renderToStaticMarkup(<HomePage />);

describe("work portfolio", () => {
  test("keeps the home anchors used by the navigation", () => {
    const html = markup();
    for (const id of ["sobre", "mapa"]) {
      expect(html).toContain(`href="./index.html#${id}"`);
      expect(html).toContain(`id="${id}"`);
    }
  });

  test("presents the reviewed cases with their current evidence notes", () => {
    const html = renderToStaticMarkup(<PracticePage />);
    for (const id of ["mobile", "cadastro", "unity"]) {
      const caseHtml = html.match(
        new RegExp(`<details[^>]+id="${id}"[^>]*>([\\s\\S]*?)</details>\\s*</div>\\s*</details>`),
      )?.[1];
      expect(caseHtml).toBeDefined();
      expect(caseHtml).toContain("Alcance da evidência:");
      expect(caseHtml).toContain("Origem e referências do relatório");
      expect(caseHtml).toContain("O hash identifica a cópia consultada");
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

  test("includes the PPCI website contribution and public repository link", () => {
    const ppci = workCases.find((work) => work.id === "ppci");
    expect(ppci).toBeDefined();
    expect(ppci?.content).toContain("Decap CMS");
    expect(ppci?.content).toContain("desempenho");
    expect(ppci?.content).toContain("configuração de CI");
    expect(ppci?.period).toBe("2026");
    const html = renderToStaticMarkup(<PracticePage />);
    expect(html).toContain('href="https://github.com/kellen-xavier/site-douglas-ppci"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test("includes documented Android execution and Unity contribution counts", () => {
    expect(workCases.find((work) => work.id === "mobile")?.content).toContain("Android físico");
    const unity = workCases.find((work) => work.id === "unity");
    expect(unity?.content).toContain("11 casos");
    expect(unity?.period).toBe("set. 2023 – mar. 2024");
  });

  test("includes Bot Planner with a public URL and describes Slack as a planned enhancement", () => {
    const planner = projects.find((project) => project.url.endsWith("/ladydebug-bot-planner"));
    expect(planner).toBeDefined();
    expect(planner?.description).toContain("Discord");
    expect(planner?.description).toContain("Slack é uma evolução prevista");
    expect(markup()).toContain('href="https://github.com/kellen-xavier/ladydebug-bot-planner"');
  });

  test("displays the brand only as ladydebug", () => {
    expect(renderToStaticMarkup(<Header />)).toContain(">ladydebug</a>");
  });
});
