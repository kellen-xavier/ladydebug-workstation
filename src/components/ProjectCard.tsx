import type { Project } from "../data/site";
import { ExternalLink } from "./ExternalLink";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="repo-icon" aria-hidden="true">
          {project.icon}
        </span>
        <span className="badge">{project.badge}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-bottom">
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ExternalLink
          className="repo-link"
          href={project.url}
          aria-label={`View ${project.title} repository`}
        >
          View repository ↗
        </ExternalLink>
      </div>
    </article>
  );
}
