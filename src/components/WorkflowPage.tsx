import remarkGfm from "remark-gfm";
import content from "../content/fluxo-completo.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";
import { Projects } from "./Projects";
import { Workflow } from "./Workflow";

export function WorkflowPage() {
  return (
    <PageLayout current="workflow">
      <article className="workflow-page">
        <MarkdownContent remarkPlugins={[remarkGfm]}>{content}</MarkdownContent>
      </article>
      <Workflow showDetailsLink={false} />
      <Projects />
    </PageLayout>
  );
}
