import remarkGfm from "remark-gfm";
import { workflow } from "../content/fluxo";
import content from "../content/fluxo-completo.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";

export function WorkflowPage() {
  return (
    <PageLayout homeHref="./index.html">
      <article className="workflow-page">
        <div className="workflow-page-nav">
          <a className="button" href={workflow.details.backHref}>
            {workflow.details.backLabel}
          </a>
        </div>
        <MarkdownContent remarkPlugins={[remarkGfm]}>{content}</MarkdownContent>
      </article>
    </PageLayout>
  );
}
