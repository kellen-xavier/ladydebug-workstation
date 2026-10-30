import { useEffect } from "react";
import { About } from "./components/About";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Topics } from "./components/Topics";
import { Work } from "./components/Work";
import { Workflow } from "./components/Workflow";

export function App() {
  useEffect(() => {
    const reveal = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView();
      }
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Ir para o conteúdo
      </a>
      <div className="wrap">
        <div className="browser-bar">
          <span>LadyDebug Workstation</span>
          <span aria-hidden="true">▁ □ ×</span>
        </div>
        <Header />
        <main id="main">
          <Hero />
          <Topics />
          <Work />
          <Workflow />
          <Projects />
          <About />
          <Closing />
        </main>
        <Footer />
      </div>
    </>
  );
}
