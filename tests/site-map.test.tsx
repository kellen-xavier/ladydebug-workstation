import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteMap } from "../src/components/SiteMap";
import { siteMap } from "../src/content/mapa";
import { pageFiles } from "../src/pages";

const localFile = (href: string) => href.replace(/^\.\//, "").split("#")[0];

describe("site map", () => {
  test("answers a visitor question with each place", () => {
    for (const place of siteMap.places) {
      expect(place.question.endsWith("?")).toBe(true);
    }
  });

  test("leads only to existing pages or to external https links", () => {
    for (const { href } of siteMap.places) {
      if (href.startsWith("https://")) continue;
      expect(pageFiles).toContain(localFile(href) as (typeof pageFiles)[number]);
    }
  });

  test("reaches every page of the site", () => {
    const reached = siteMap.places.map((place) => localFile(place.href));
    for (const file of pageFiles) {
      expect(reached).toContain(file);
    }
  });

  test("renders each place as a link inside the map section", () => {
    const html = renderToStaticMarkup(<SiteMap />);
    expect(html).toContain('id="mapa"');
    expect(html.match(/class="map-place"/g)).toHaveLength(siteMap.places.length);
  });
});
