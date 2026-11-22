import { type ReactNode, useEffect, useRef, useState } from "react";
import { type PageId, site } from "../content/site";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StaggeredMenu } from "./StaggeredMenu";

export function PageLayout({
  children,
  current = "home",
}: {
  children: ReactNode;
  current?: PageId;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const [showScrollMenu, setShowScrollMenu] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => setShowScrollMenu(header.getBoundingClientRect().bottom <= 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        {site.skipLink}
      </a>
      <Header current={current} headerRef={headerRef} />
      <StaggeredMenu current={current} visible={showScrollMenu} />
      <main className="wrap" id="main">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
