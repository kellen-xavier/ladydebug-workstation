import { setup } from "../content/setup";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

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
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="page-note">
        <a href={setup.toolsLink.href}>{setup.toolsLink.label}</a>
      </p>
    </PageLayout>
  );
}
