import { projectSection, projects } from "../content/projetos";
import { links } from "../content/site";
import { ExternalLink } from "./ExternalLink";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">{projectSection.eyebrow}</p>
          <h2 id="projects-title">{projectSection.title}</h2>
        </div>
        <ExternalLink className="text-link" href={links.repositories}>
          {projectSection.linkLabel}
        </ExternalLink>
      </div>
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </section>
  );
}
