import siteMapSource from "../content/mapa.md" with { type: "text" };
import { frontmatter, keyValue, sections, splitIcon } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";

type MapPlace = { icon: string; name: string; destination: string; question: string; href: string };

/**
 * Reads src/content/mapa.md: front matter (eyebrow/title/intro) plus one
 * "## icon Name" section per place, with "- destino / pergunta / link" rows.
 */
function parseSiteMap(source: string) {
  const { meta, body } = frontmatter(source);
  const places: MapPlace[] = sections(body).map((section) => {
    const { icon, title } = splitIcon(section.heading);
    const fields: Record<string, string> = {};
    for (const line of section.lines) {
      const { key, value } = keyValue(line);
      fields[key] = value;
    }
    return {
      icon,
      name: title,
      destination: fields.destino ?? "",
      question: fields.pergunta ?? "",
      href: fields.link ?? "",
    };
  });
  return { eyebrow: meta.eyebrow ?? "", title: meta.title ?? "", intro: meta.intro ?? "", places };
}

export const siteMap = parseSiteMap(siteMapSource);

export function SiteMap() {
  return (
    <section className="section" id="mapa" aria-labelledby="mapa-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">{siteMap.eyebrow}</p>
          <h2 id="mapa-title">{siteMap.title}</h2>
        </div>
        <p className="section-intro">{siteMap.intro}</p>
      </div>
      <ul className="site-map">
        {siteMap.places.map((place) => {
          const content = (
            <>
              <span className="map-icon" aria-hidden="true">
                {place.icon}
              </span>
              <span className="map-name">{place.name}</span>
              <span className="map-destination">→ {place.destination}</span>
              <span className="map-question">{place.question}</span>
            </>
          );
          return (
            <li key={place.href}>
              {place.href.startsWith("https://") ? (
                <ExternalLink className="map-place" href={place.href}>
                  {content}
                </ExternalLink>
              ) : (
                <a className="map-place" href={place.href}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
