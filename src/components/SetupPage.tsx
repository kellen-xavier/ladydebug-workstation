import setupSource from "../content/setup.md" with { type: "text" };
import { pageHref } from "../content/site";
import { frontmatter, keyValue, sections, splitIcon } from "./contentFormat";
import { MarkdownContent } from "./MarkdownContent";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type SetupItem = { label: string; value: string };
type SetupGroup = { icon: string; title: string; items: SetupItem[] };

/**
 * Reads src/content/setup.md: front matter (eyebrow/title/intro/toolsLink) plus
 * "## icon Title" panels of "- Label: value" rows. Each value may be inline
 * Markdown, so links are written as [text](url) in the content file.
 */
function parseSetup(source: string) {
  const { meta, body } = frontmatter(source);
  const groups: SetupGroup[] = sections(body).map((section) => ({
    ...splitIcon(section.heading),
    items: section.lines.map((line) => {
      const { key, value } = keyValue(line);
      return { label: key, value };
    }),
  }));
  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    intro: meta.intro ?? "",
    toolsLink: meta.toolsLink ?? "",
    groups,
  };
}

export const setup = parseSetup(setupSource);

export function SetupPage() {
  return (
    <PageLayout current="setup">
      <PageHead eyebrow={setup.eyebrow} title={setup.title} intro={setup.intro} />
      <div className="setup-grid">
        {setup.groups.map((group) => (
          <article className="panel" key={group.title}>
            <div className="panel-title">
              <h2>{group.title}</h2>
              <span aria-hidden="true">{group.icon}</span>
            </div>
            <dl className="spec-list">
              {group.items.map((item) => (
                <div key={`${item.label}-${item.value}`}>
                  <dt>{item.label}</dt>
                  <dd>
                    <MarkdownContent components={{ p: ({ children }) => <>{children}</> }}>
                      {item.value}
                    </MarkdownContent>
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="page-note">
        <a href={pageHref.ferramentas}>{setup.toolsLink}</a>
      </p>
    </PageLayout>
  );
}
