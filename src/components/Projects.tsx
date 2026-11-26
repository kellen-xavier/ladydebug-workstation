import projectsSource from "../content/projetos.md" with { type: "text" };
import { links, pageHref, site } from "../content/site";
import { frontmatter, keyValue, sections } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";
import { type Project, ProjectCard } from "./ProjectCard";

/**
 * Reads src/content/projetos.md: front matter (section labels) plus one
 * "## Project name" section with "- icon / badge / descricao / tags / url"
 * (tags are "|"-separated).
 */
function parseProjects(source: string) {
  const { meta, body } = frontmatter(source);
  const projects: Project[] = sections(body).map((section) => {
    const fields: Record<string, string> = {};
    for (const line of section.lines) {
      const { key, value } = keyValue(line);
      fields[key] = value;
    }
    return {
      title: section.heading,
      icon: fields.icon ?? "",
      badge: fields.badge ?? "",
      description: fields.descricao ?? "",
      tags: fields.tags ? fields.tags.split("|").map((tag) => tag.trim()) : [],
      url: fields.url ?? "",
    };
  });
  return {
    projects,
    projectSection: {
      eyebrow: meta.eyebrow ?? "",
      title: meta.title ?? "",
      description: meta.description ?? "",
      linkLabel: meta.linkLabel ?? "",
    },
  };
}

export const { projects, projectSection } = parseProjects(projectsSource);

/** Lists open projects; `limit` shows a preview with a link to the blog studies. */
export function Projects({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const preview = limit !== undefined;
  return (
    <section
      className={
        preview
          ? "projects projects--preview"
          : showHeading
            ? "projects"
            : "projects projects--page"
      }
      id="projetos"
      aria-labelledby={showHeading ? "projects-title" : undefined}
      aria-label={showHeading ? undefined : projectSection.title}
    >
      <div className="section-head">
        {showHeading && (
          <div>
            <p className="eyebrow">{projectSection.eyebrow}</p>
            <h2 id="projects-title">{projectSection.title}</h2>
          </div>
        )}
        {preview ? (
          <a className="text-link" href={pageHref.projetos}>
            {site.projectsPageLabel}
          </a>
        ) : (
          <ExternalLink className="text-link" href={links.repositories}>
            {projectSection.linkLabel}
          </ExternalLink>
        )}
      </div>
      <div className="grid">
        {projects.slice(0, limit).map((project) => (
          <ProjectCard key={project.url} project={project} headingLevel={showHeading ? 3 : 2} />
        ))}
      </div>
    </section>
  );
}
