import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/App";
import { Hero } from "../src/components/Hero";
import { links } from "../src/content/site";

const html = renderToStaticMarkup(<App />);

describe("home page", () => {
  test("introduces the author right below the welcome", () => {
    expect(html).toMatch(/<section class="hero">[\s\S]*?<\/section><section class="about" id="sobre">/);
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

  test("offers the complete CV as a PDF download", () => {
    expect(html).toMatch(/<a class="button" href="\.\/cv-kellen-xavier\.pdf" download="">/);
  });

  test("previews personal projects and links to the blog studies", () => {
    const projects = html.match(/<section class="projects" id="projetos"[\s\S]*?<\/section>/)?.[0];
    expect(projects?.match(/<article class="card"/g)).toHaveLength(3);
    expect(projects).toContain(`href="${links.blog}"`);
  });
});
