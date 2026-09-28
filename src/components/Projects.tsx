import { links, projects } from "../data/site";
import { ExternalLink } from "./ExternalLink";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">C:\ladydebug\projects</p>
          <h2 id="projects-title">My project directory</h2>
        </div>
        <ExternalLink className="text-link" href={links.repositories}>
          All repositories ↗
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
