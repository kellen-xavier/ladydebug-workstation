import type { ReactNode } from "react";
import { type PageId, site } from "../content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageLayout({
  children,
  current = "home",
}: {
  children: ReactNode;
  current?: PageId;
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
        <Header current={current} />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
