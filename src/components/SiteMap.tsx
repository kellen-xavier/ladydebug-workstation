import { siteMap } from "../content/mapa";
import { ExternalLink } from "./ExternalLink";

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
