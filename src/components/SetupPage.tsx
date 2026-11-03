import setupSource from "../content/setup.md" with { type: "text" };
import { pageHref } from "../content/site";
import { MarkdownContent } from "./MarkdownContent";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type SetupItem = { label: string; value: string };
type SetupGroup = { icon: string; title: string; items: SetupItem[] };
type SetupContent = {
  eyebrow: string;
  title: string;
  intro: string;
  toolsLink: string;
  groups: SetupGroup[];
};

/**
 * Reads src/content/setup.md: front matter (eyebrow/title/intro/toolsLink) plus
 * "## icon Title" panels of "- Label: value" rows. Each value may be inline
 * Markdown, so links are written as [text](url) in the content file.
 */
function parseSetup(source: string): SetupContent {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const front = match?.[1] ?? "";
  const body = match?.[2] ?? source;

  const meta: Record<string, string> = {};
  for (const line of front.split("\n")) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field?.[1]) meta[field[1]] = (field[2] ?? "").trim();
  }

  const groups: SetupGroup[] = [];
  for (const line of body.split("\n")) {
    const heading = line.match(/^##\s+(\S+)\s+(.+?)\s*$/);
    if (heading) {
      groups.push({ icon: heading[1] ?? "", title: (heading[2] ?? "").trim(), items: [] });
      continue;
    }
    const item = line.match(/^-\s+(.+?):\s+(.+?)\s*$/);
    const current = groups.at(-1);
    if (item && current) {
      current.items.push({ label: (item[1] ?? "").trim(), value: (item[2] ?? "").trim() });
    }
  }

  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    intro: meta.intro ?? "",
    toolsLink: meta.toolsLink ?? "",
    groups,
  };
}

const setup = parseSetup(setupSource);

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
