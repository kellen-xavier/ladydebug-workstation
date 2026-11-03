import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GamesPage, gameStatuses, games } from "../src/components/GamesPage";
import { SetupPage } from "../src/components/SetupPage";
import { ToolsPage, tools } from "../src/components/ToolsPage";

describe("tools page", () => {
  test("documents where to download and how to install each tool", () => {
    for (const tool of tools) {
      expect(tool.url).toStartWith("https://");
      expect(tool.install.trim().length).toBeGreaterThan(0);
    }
  });

  test("renders an install command with a copy button for each tool", () => {
    const html = renderToStaticMarkup(<ToolsPage />);
    expect(html.match(/<code>/g)).toHaveLength(tools.length);
    expect(html.match(/class="copy-button"/g)).toHaveLength(tools.length);
  });
});

describe("setup page", () => {
  test("informs the operating system, AIs and terminal", () => {
    const html = renderToStaticMarkup(<SetupPage />);
    for (const section of ["<h2>Sistema</h2>", "<h2>IAs</h2>", "<h2>Terminal &amp; editor</h2>"]) {
      expect(html).toContain(section);
    }
    for (const name of ["Claude Code", "Codex", "Kitty"]) {
      expect(html).toContain(name);
    }
  });

  test("renders a value with a link as a safe external anchor", () => {
    const html = renderToStaticMarkup(<SetupPage />);
    expect(html).toContain('href="https://github.com/kellen-xavier/my-skills"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});

describe("games page", () => {
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
