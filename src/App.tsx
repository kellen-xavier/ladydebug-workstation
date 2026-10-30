import { useEffect } from "react";
import { About } from "./components/About";
import { Closing } from "./components/Closing";
import { Hero } from "./components/Hero";
import { PageLayout } from "./components/PageLayout";
import { Projects } from "./components/Projects";
import { Topics } from "./components/Topics";
import { Work } from "./components/Work";
import { Workflow } from "./components/Workflow";

export function App() {
  useEffect(() => {
    const reveal = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
      }
      target.scrollIntoView();
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return (
    <PageLayout>
      <Hero />
      <Topics />
      <About />
      <Work />
      <Workflow />
      <Projects />
      <Closing />
    </PageLayout>
  );
}
