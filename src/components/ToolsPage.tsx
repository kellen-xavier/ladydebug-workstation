import toolsSource from "../content/ferramentas.md" with { type: "text" };
import { CopyButton } from "./CopyButton";
import { frontmatter, keyValue, sections } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type Tool = { category: string; name: string; description: string; install: string; url: string };

/**
 * Reads src/content/ferramentas.md: front matter (page labels) plus one
 * "## Tool name" section per tool, with "- categoria / descricao / instalar /
 * site" rows.
 */
function parseTools(source: string) {
  const { meta, body } = frontmatter(source);
  const tools: Tool[] = sections(body).map((section) => {
    const fields: Record<string, string> = {};
    for (const line of section.lines) {
      const { key, value } = keyValue(line);
      fields[key] = value;
    }
    return {
      name: section.heading,
      category: fields.categoria ?? "",
      description: fields.descricao ?? "",
      install: fields.instalar ?? "",
      url: fields.site ?? "",
    };
  });
  return {
    tools,
    toolsPage: {
      eyebrow: meta.eyebrow ?? "",
      title: meta.title ?? "",
      intro: meta.intro ?? "",
      officialSiteLabel: meta.officialSiteLabel ?? "",
      copyLabel: meta.copyLabel ?? "",
      copiedLabel: meta.copiedLabel ?? "",
    },
  };
}

export const { tools, toolsPage } = parseTools(toolsSource);

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
              {tool.install && (
                <div className="install">
                  <code>{tool.install}</code>
                  <CopyButton
                    text={tool.install}
                    label={tool.name}
                    copyLabel={toolsPage.copyLabel}
                    copiedLabel={toolsPage.copiedLabel}
                  />
                </div>
              )}
              {tool.url && (
                <ExternalLink className="text-link" href={tool.url}>
                  {toolsPage.officialSiteLabel}
                </ExternalLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
