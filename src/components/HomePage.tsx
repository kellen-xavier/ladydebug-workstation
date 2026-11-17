import { useHashReveal } from "../hooks/useHashReveal";
import { About } from "./About";
import { Closing } from "./Closing";
import { CvDownload } from "./CvDownload";
import { Hero } from "./Hero";
import { HowIWork } from "./HowIWork";
import { PageLayout } from "./PageLayout";
import { Projects } from "./Projects";

export function HomePage() {
  useHashReveal();
  return (
    <PageLayout current="home">
      <Hero />
      <About />
      <HowIWork />
      <Projects limit={3} />
      <CvDownload />
      <Closing />
    </PageLayout>
  );
}
