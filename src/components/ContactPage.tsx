import { useRef } from "react";
import contactSource from "../content/contato.md" with { type: "text" };
import { links, site } from "../content/site";
import { frontmatter } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";
import { MarkdownContent } from "./MarkdownContent";
import { PageLayout } from "./PageLayout";

const { meta, body } = frontmatter(contactSource);
const emailAction = meta.emailAction ?? "";
const emailHref = `mailto:${links.contactEmail}?subject=${encodeURIComponent(emailAction)}`;

function placeTooltip(tooltip: HTMLElement | null, x: number, y: number) {
  if (!tooltip) return;
  const { width, height } = tooltip.getBoundingClientRect();
  const left = Math.max(12, Math.min(x + 14, window.innerWidth - width - 12));
  const below = y + height + 18 <= window.innerHeight - 12;
  const top = below ? y + 18 : Math.max(12, y - height - 12);
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

export function ContactPage() {
  const tooltipRef = useRef<HTMLParagraphElement>(null);
  return (
    <PageLayout current="contato">
      <section className="contact-page">
        <div className="contact-intro">
          <p className="eyebrow">{meta.eyebrow}</p>
          <MarkdownContent part="title">{body}</MarkdownContent>
          <MarkdownContent part="body">{body}</MarkdownContent>
        </div>

        <div className="contact-paths">
          <div className="contact-email-wrap">
            <a
              className="contact-email"
              href={emailHref}
              aria-describedby="contact-email-tooltip"
              onMouseMove={(event) =>
                placeTooltip(tooltipRef.current, event.clientX, event.clientY)
              }
              onFocus={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                placeTooltip(tooltipRef.current, box.left + 24, box.top + box.height / 2);
              }}
            >
              <span>{emailAction}</span>
            </a>
            <p
              className="contact-tooltip"
              id="contact-email-tooltip"
              role="tooltip"
              ref={tooltipRef}
            >
              {meta.emailTooltip}
            </p>
          </div>

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
