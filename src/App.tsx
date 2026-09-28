import { About } from "./components/About";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Topics } from "./components/Topics";

export function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="wrap">
        <div className="browser-bar">
          <span>LadyDebug — personal homepage</span>
          <span aria-hidden="true">▁ □ ×</span>
        </div>
        <Header />
        <main id="main">
          <Hero />
          <Topics />
          <Projects />
          <About />
          <Closing />
        </main>
        <Footer />
      </div>
    </>
  );
}
