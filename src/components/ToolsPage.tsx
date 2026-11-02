import { tools, toolsPage } from "../content/ferramentas";
import { CopyButton } from "./CopyButton";
import { ExternalLink } from "./ExternalLink";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

export function ToolsPage() {
  return (
    <PageLayout current="ferramentas">
      <PageHead eyebrow={toolsPage.eyebrow} title={toolsPage.title} intro={toolsPage.intro} />
      <ul className="tool-list">
        {tools.map((tool) => (
          <li className="tool" key={tool.name}>
            <div>
              <span className="tool-category">{tool.category}</span>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
            <div className="tool-install">
              <div className="install">
                <code>{tool.install}</code>
                <CopyButton text={tool.install} label={tool.name} />
              </div>
              <ExternalLink className="text-link" href={tool.url}>
                {toolsPage.officialSiteLabel}
              </ExternalLink>
            </div>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
