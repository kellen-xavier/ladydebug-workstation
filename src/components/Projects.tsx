import { links, projects } from "../data/site";
import { ExternalLink } from "./ExternalLink";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">repositories / projetos abertos</p>
          <h2 id="projects-title">Conhecimento que vira repositório.</h2>
        </div>
        <ExternalLink className="text-link" href={links.repositories}>
          Todos os repositórios ↗
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
