import { site } from "../content/site";
import { ClickSpark } from "./ClickSpark";
import { ExternalLink } from "./ExternalLink";

export type Project = {
  title: string;
  icon: string;
  badge: string;
  description: string;
  tags: string[];
  url: string;
};

export function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ClickSpark className="card">
      <div className="card-top">
        <span className="repo-icon" aria-hidden="true">
          {project.icon}
        </span>
        <span className="badge">{project.badge}</span>
      </div>
      <Heading>{project.title}</Heading>
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
          aria-label={`${site.projectLinkAccessibleLabel} ${project.title}`}
        >
          {site.projectLinkLabel}
        </ExternalLink>
      </div>
    </ClickSpark>
  );
}
