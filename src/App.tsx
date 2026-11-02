import { About } from "./components/About";
import { Closing } from "./components/Closing";
import { CvDownload } from "./components/CvDownload";
import { Hero } from "./components/Hero";
import { HowIWork } from "./components/HowIWork";
import { PageLayout } from "./components/PageLayout";
import { Projects } from "./components/Projects";
import { SiteMap } from "./components/SiteMap";
import { useHashReveal } from "./hooks/useHashReveal";

export function App() {
  useHashReveal();
  return (
    <PageLayout current="home">
      <Hero />
      <About />
      <SiteMap />
      <HowIWork />
      <Projects limit={3} />
      <CvDownload />
      <Closing />
    </PageLayout>
  );
}
