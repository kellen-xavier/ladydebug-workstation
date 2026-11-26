import remarkGfm from "remark-gfm";
import content from "../content/fluxo-completo.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";
import { Workflow } from "./Workflow";

export function WorkflowPage() {
  return (
    <PageLayout current="workflow">
      <Workflow showDetailsLink={false} headingLevel={1} />
      <article className="workflow-page">
        <MarkdownContent remarkPlugins={[remarkGfm]} components={{ h1: "h2", h2: "h3" }}>
          {content}
        </MarkdownContent>
      </article>
    </PageLayout>
  );
}
