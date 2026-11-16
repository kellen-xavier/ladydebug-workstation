import contactSource from "../content/contato.md" with { type: "text" };
import { links, site } from "../content/site";
import { frontmatter } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";

const { meta, body } = frontmatter(contactSource);
const emailAction = meta.emailAction ?? "";
const emailHref = `mailto:${links.contactEmail}?subject=${encodeURIComponent(emailAction)}`;

export function ContactPage() {
  return (
    <PageLayout current="contato">
      <section className="contact-page">
        <div className="contact-intro">
          <p className="eyebrow">{meta.eyebrow}</p>
          <MarkdownContent part="title">{body}</MarkdownContent>
          <MarkdownContent part="body">{body}</MarkdownContent>
        </div>

        <div className="contact-paths">
          <a className="contact-email" href={emailHref}>
            <span>{emailAction}</span>
            <small>{links.contactEmail}</small>
          </a>

          <nav className="contact-social" aria-label={meta.socialTitle}>
            <h2>{meta.socialTitle}</h2>
            <ul>
              {site.social.map((link) => (
                <li key={link.id}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </PageLayout>
  );
}
