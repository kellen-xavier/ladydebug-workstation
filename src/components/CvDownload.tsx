import { links, site } from "../content/site";

export function CvDownload() {
  return (
    <section className="cv" id="cv">
      <div>
        <h2>{site.cv.title}</h2>
        <p>{site.cv.description}</p>
      </div>
      <a className="button" href={links.cv} download>
        {site.cv.label}
      </a>
    </section>
  );
}
