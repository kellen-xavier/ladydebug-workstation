import { describe, expect, test } from "bun:test";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CareerPage } from "../src/components/CareerPage";
import { GamesPage } from "../src/components/GamesPage";
import { PracticePage } from "../src/components/PracticePage";
import { SetupPage } from "../src/components/SetupPage";
import { ToolsPage } from "../src/components/ToolsPage";
import { WorkflowPage } from "../src/components/WorkflowPage";
import { pageFiles } from "../src/pages";

const source = (path: string) => Bun.file(new URL(path, import.meta.url)).text();

describe("site pages", () => {
  test("has an HTML entry for each registered page", async () => {
    for (const file of pageFiles) {
      expect(await Bun.file(new URL(`../src/${file}`, import.meta.url)).exists()).toBe(true);
    }
  });

  test("builds and serves every registered page", async () => {
    expect(await source("../scripts/build.ts")).toContain("pageFiles");
    const dev = await source("../scripts/dev.ts");
    for (const file of pageFiles) {
      expect(dev).toContain(`"/${file}"`);
    }
  });

  const pages: [string, ReactElement][] = [
    ["trajetoria.html", <CareerPage key="career" />],
    ["pratica.html", <PracticePage key="practice" />],
    ["workflow.html", <WorkflowPage key="workflow" />],
    ["setup.html", <SetupPage key="setup" />],
    ["ferramentas.html", <ToolsPage key="tools" />],
    ["games.html", <GamesPage key="games" />],
  ];

  for (const [file, page] of pages) {
    test(`${file} has one heading and marks itself in the navigation`, () => {
      const html = renderToStaticMarkup(page);
      expect(html.match(/<h1[ >]/g)).toHaveLength(1);
      expect(html).toContain(`href="./${file}" aria-current="page"`);
    });
  }
});
