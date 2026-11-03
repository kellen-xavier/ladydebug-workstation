import type { ComponentType } from "react";
import { CareerPage } from "./components/CareerPage";
import { GamesPage } from "./components/GamesPage";
import { HomePage } from "./components/HomePage";
import { PracticePage } from "./components/PracticePage";
import { SetupPage } from "./components/SetupPage";
import { ToolsPage } from "./components/ToolsPage";
import { WorkflowPage } from "./components/WorkflowPage";

/**
 * Single source of truth for every page of the static site.
 *
 * The HTML entry and the client script of each page are generated from this
 * list at build and dev time (see scripts/generate-pages.ts), so `src/` holds
 * only components — no hand-written `.html` or `*-main.tsx` files.
 */
export type Page = {
  /** Output file name without extension; "index" is the home page. */
  slug: string;
  /** URL path used by the dev server and the navigation. */
  path: string;
  title: string;
  description: string;
  /** The page component, used by the generated entry, tests and any SSR. */
  component: ComponentType;
  /** The exported component name, used to generate the client entry. */
  componentName: string;
};

export const pages = [
  {
    slug: "index",
    path: "/",
    title: "Ladydebug — Kellen Xavier · Software & Quality Engineering",
    description:
      "Portfólio de Kellen Xavier: Atuações em frentes de desenvolvimento, automação de testes e documentação apresentados por contribuições e evidências.",
    component: HomePage,
    componentName: "HomePage",
  },
  {
    slug: "trajetoria",
    path: "/trajetoria.html",
    title: "Trajetória — Ladydebug",
    description: "Trajetória profissional de Kellen Xavier em QA e Engenharia de Software.",
    component: CareerPage,
    componentName: "CareerPage",
  },
  {
    slug: "pratica",
    path: "/pratica.html",
    title: "Na prática — Ladydebug",
    description:
      "Casos de contribuição em desenvolvimento, automação de testes e documentação, com evidências e limites.",
    component: PracticePage,
    componentName: "PracticePage",
  },
  {
    slug: "workflow",
    path: "/workflow.html",
    title: "Workflow de trabalho — Ladydebug",
    description:
      "Como organizo desenvolvimento, testes, documentação e aprendizado nos meus projetos.",
    component: WorkflowPage,
    componentName: "WorkflowPage",
  },
  {
    slug: "setup",
    path: "/setup.html",
    title: "Setup — Ladydebug",
    description:
      "Sistema, IAs, terminal e equipamentos que uso para programar, testar e documentar.",
    component: SetupPage,
    componentName: "SetupPage",
  },
  {
    slug: "ferramentas",
    path: "/ferramentas.html",
    title: "Ferramentas — Ladydebug",
    description: "Ferramentas que uso no dia a dia, onde baixar e como instalar.",
    component: ToolsPage,
    componentName: "ToolsPage",
  },
  {
    slug: "games",
    path: "/games.html",
    title: "Games — Ladydebug",
    description: "Como organizo meus jogos e acompanho estudos e projetos com games.",
    component: GamesPage,
    componentName: "GamesPage",
  },
] satisfies Page[];

/** Output HTML file name for a page ("index.html", "trajetoria.html", …). */
export const pageFile = (page: Pick<Page, "slug">) => `${page.slug}.html`;
