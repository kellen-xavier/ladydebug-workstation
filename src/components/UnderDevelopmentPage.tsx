import message from "../content/em-desenvolvimento.md" with { type: "text" };
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";

export function UnderDevelopmentPage() {
  return (
    <PageLayout current="games">
      <section className="under-development">
        <MarkdownContent>{message}</MarkdownContent>
      </section>
    </PageLayout>
  );
}
