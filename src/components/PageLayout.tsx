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
      <Header current={current} />
      <main className="wrap" id="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
