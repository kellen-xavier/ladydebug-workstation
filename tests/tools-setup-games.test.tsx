import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GamesPage, gameStatuses, games } from "../src/components/GamesPage";
import { SetupPage } from "../src/components/SetupPage";
import { ToolsPage, tools } from "../src/components/ToolsPage";

describe("tools page", () => {
  test("documents where to download and how to install each tool", () => {
    for (const tool of tools) {
      expect(tool.name.length).toBeGreaterThan(0);
      if (tool.url) expect(tool.url).toStartWith("https://");
    }
  });

  test("renders an install command with a copy button for each tool", () => {
    const html = renderToStaticMarkup(<ToolsPage />);
    expect(html.match(/<code>/g)).toHaveLength(tools.length);
    expect(html.match(/class="copy-button"/g)).toHaveLength(tools.length);
  });
});

describe("setup page", () => {
  test("renders labelled spec panels and a link to the tools page", () => {
    const html = renderToStaticMarkup(<SetupPage />);
    expect((html.match(/<article class="panel">/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect((html.match(/<dl class="spec-list">/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).toContain('<a href="./ferramentas.html">');
  });

  test("renders a spec value with a link as a safe external anchor", () => {
    const html = renderToStaticMarkup(<SetupPage />);
    expect(html).toMatch(/<dd><a target="_blank" rel="noopener noreferrer" href="https:\/\//);
  });
});

describe("games page", () => {
  test("shows the Steam account in organization details, not as a game", () => {
    expect(games.organization).toContainEqual({ label: "Steam", value: "Minha Steam — PC" });
    expect(games.library.map((game) => game.title)).not.toContain("Minha Steam");
  });

  test("uses only known statuses", () => {
    const known = gameStatuses.map((status) => status.id);
    for (const game of games.library) {
      expect(known).toContain(game.status);
    }
  });

  test("starts with every game visible and the filter set to all", () => {
    const html = renderToStaticMarkup(<GamesPage />);
    expect(html.match(/<article class="game"/g)).toHaveLength(games.library.length);
    expect(html).toContain('aria-pressed="true">Todos</button>');
  });

  test("points to the blog for game research", () => {
    expect(renderToStaticMarkup(<GamesPage />)).toContain(games.blog.href);
  });
});
