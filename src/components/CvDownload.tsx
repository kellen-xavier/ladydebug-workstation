import { site } from "../content/site";

export function CvDownload() {
  return (
    <section className="cv" id="cv">
      <div>
        <h2>{site.cv.title}</h2>
        <p>{site.cv.description}</p>
      </div>
      <div className="cv-downloads">
        {site.cv.downloads.map((item) => (
          <a className="button" href={item.href} download key={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
