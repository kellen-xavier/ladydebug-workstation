import { describe, expect, test } from "bun:test";
import { siteMap } from "../src/components/SiteMap";
import { pageFile, pages } from "../src/pages";

const pageFiles = pages.map(pageFile);
const localFile = (href: string) => href.replace(/^\.\//, "").split("#")[0] ?? href;

describe("site map", () => {
  test("leads only to existing pages or to external https links", () => {
    for (const { href } of siteMap.places) {
      if (href.startsWith("https://")) continue;
      expect(pageFiles).toContain(localFile(href));
    }
  });
});
