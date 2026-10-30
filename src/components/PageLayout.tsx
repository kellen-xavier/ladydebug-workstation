import type { ReactNode } from "react";
import { site } from "../content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageLayout({
  children,
  homeHref = "",
}: {
  children: ReactNode;
  homeHref?: string;
}) {
  return (
    <>
      <a className="skip" href="#main">
        {site.skipLink}
      </a>
      <div className="wrap">
        <div className="browser-bar">
          <span>{site.browserTitle}</span>
          <span aria-hidden="true">▁ □ ×</span>
        </div>
        <Header homeHref={homeHref} />
        <main id="main">{children}</main>
        <Footer homeHref={homeHref} />
      </div>
    </>
  );
}
