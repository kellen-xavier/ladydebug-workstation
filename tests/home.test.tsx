import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "../src/components/Hero";
import { HomePage } from "../src/components/HomePage";
import { links } from "../src/content/site";

const html = renderToStaticMarkup(<HomePage />);

describe("home page", () => {
  test("introduces the author right below the welcome", () => {
    expect(html).toMatch(
      /<section class="hero">[\s\S]*?<\/section><section class="about" id="sobre">/,
    );
    const about = html.match(/<section class="about" id="sobre">([\s\S]*?)<\/section>/)?.[1];
    expect(about).toContain("Quem sou eu?");
    expect(about).toContain("UNINTER");
    expect(about).toContain("Unisinos");
  });

  test("orders the sections as in the site flow", () => {
    const positions = ["sobre", "mapa", "como-trabalho", "projetos", "cv"].map((id) =>
      html.indexOf(`id="${id}"`),
    );
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((first, second) => first - second));
  });

  test("removes the topics strip and the GitHub link from the welcome", () => {
    expect(html).not.toContain('class="topics"');
    expect(renderToStaticMarkup(<Hero />)).not.toContain(links.github);
  });

  test("links the summary to the full career page", () => {
    const about = html.match(/<section class="about" id="sobre">([\s\S]*?)<\/section>/)?.[1];
    expect(about).toContain('href="./trajetoria.html"');
  });

  test("offers the Portuguese and English CVs as PDF downloads", () => {
    expect(html).toContain('href="./cv-kellen-xavier-pt-br.pdf" download=""');
    expect(html).toContain('href="./cv-kellen-xavier-en.pdf" download=""');
    expect(html).toContain("Baixar CV em português");
    expect(html).toContain("Baixar CV em inglês");
  });

  test("uses concise and consistent copy across the home page", () => {
    expect(html).toContain(
      "Desde 2018, atuo com desenvolvimento, integrações, testes e documentação técnica.",
    );
    expect(html).not.toContain("Sou Kellen Xavier.");
    expect(html).toContain("Software &amp; Qualidade");
    expect(html).toContain("Ver contribuições →");
    expect(html).toContain("Escolha uma seção para conhecer meu trabalho.");
    expect(html).toContain("Quais ferramentas uso no dia a dia?");
    expect(html).toContain("O que estudo sobre jogos?");
    expect(html).toContain("Onde baixo meu CV?");
  });

  test("takes the primary call to action directly to the contribution page", () => {
    const hero = renderToStaticMarkup(<Hero />);
    expect(hero).toContain('href="./pratica.html"');
    expect(hero).toContain("Ver contribuições →");
  });

  test("previews personal projects and links to the blog studies", () => {
    const projects = html.match(/<section class="projects" id="projetos"[\s\S]*?<\/section>/)?.[0];
    expect(projects?.match(/<article class="card"/g)).toHaveLength(3);
    expect(projects).toContain(`href="${links.blog}"`);
  });
});
