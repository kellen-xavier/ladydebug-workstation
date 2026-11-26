import pageSource from "../content/page-projetos-e-estudos.md" with { type: "text" };
import { frontmatter } from "./contentFormat";
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";
import { Projects } from "./Projects";

const { meta, body } = frontmatter(pageSource);

export function ProjectsAndStudiesPage() {
  return (
    <PageLayout current="projetos">
      <div className="page-head projects-page-intro">
        {meta.eyebrow && <p className="eyebrow">{meta.eyebrow}</p>}
        <MarkdownContent>{body}</MarkdownContent>
      </div>
      <Projects showHeading={false} />
    </PageLayout>
  );
}
