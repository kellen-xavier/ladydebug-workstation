import { projectSection, projects } from "../content/projetos";
import { links, site } from "../content/site";
import { ExternalLink } from "./ExternalLink";
import { ProjectCard } from "./ProjectCard";

/** Lists open projects; `limit` shows a preview with a link to the blog studies. */
export function Projects({ limit }: { limit?: number }) {
  const preview = limit !== undefined;
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">{projectSection.eyebrow}</p>
          <h2 id="projects-title">{projectSection.title}</h2>
        </div>
        {preview ? (
          <ExternalLink className="text-link" href={links.blog}>
            {site.projectsBlogLabel}
          </ExternalLink>
        ) : (
          <ExternalLink className="text-link" href={links.repositories}>
            {projectSection.linkLabel}
          </ExternalLink>
        )}
      </div>
      <div className="grid">
        {projects.slice(0, limit).map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </section>
  );
}
