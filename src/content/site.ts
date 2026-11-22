export const links = {
  github: "https://github.com/kellen-xavier",
  linkedin: "https://www.linkedin.com/in/kellen-xavier/",
  repositories: "https://github.com/kellen-xavier?tab=repositories",
  blog: "https://kellen-xavier.github.io/ladydebug.github.io/",
  cvPt: "./cv-kellen-xavier-pt-br.pdf",
  cvEn: "./cv-kellen-xavier-en.pdf",
  contactEmail: "kellenxaviier@gmail.com",
};

export type PageId =
  | "home"
  | "trajetoria"
  | "pratica"
  | "workflow"
  | "setup"
  | "ferramentas"
  | "games"
  | "contato";

export const pageHref: Record<PageId, string> = {
  home: "./index.html",
  trajetoria: "./trajetoria.html",
  pratica: "./pratica.html",
  workflow: "./workflow.html",
  setup: "./setup.html",
  ferramentas: "./ferramentas.html",
  games: "./games.html",
  contato: "./contato.html",
};

export type NavigationItem = { label: string; href: string; page: PageId };
export type SocialLink = { id: "github" | "linkedin" | "blog"; label: string; href: string };

/** @deprecated The topics strip was removed from the home page. */
export const topics = [
  "DESENVOLVIMENTO",
  "AUTOMAÇÃO DE TESTES",
  "DOCUMENTAÇÃO",
  "CONHECIMENTO ABERTO",
];

export const site = {
  brand: "ladydebug",
  skipLink: "Ir para o conteúdo",
  backToTopLabel: "Voltar ao topo",
  navigationLabel: "Navegação principal",
  menuLabel: "menu",
  scrollMenu: {
    openLabel: "Abrir menu flutuante",
    closeLabel: "Fechar menu flutuante",
    navigationLabel: "Navegação ao rolar",
  },
  navigation: [
    { label: "Sobre", href: `${pageHref.home}#sobre`, page: "home" },
    { label: "Contate", href: pageHref.contato, page: "contato" },
  ] satisfies [NavigationItem, NavigationItem],
  workNavigation: [
    { label: "Trabalhos", href: pageHref.pratica, page: "pratica" },
    { label: "Trajetória", href: pageHref.trajetoria, page: "trajetoria" },
    { label: "Workflow", href: pageHref.workflow, page: "workflow" },
  ] satisfies [NavigationItem, ...NavigationItem[]],
  setupNavigation: [
    { label: "Setup", href: pageHref.setup, page: "setup" },
    { label: "Ferramentas", href: pageHref.ferramentas, page: "ferramentas" },
  ] satisfies [NavigationItem, ...NavigationItem[]],

  socialLabel: "Redes",
  social: [
    { id: "github", label: "GitHub", href: links.github },
    { id: "linkedin", label: "LinkedIn", href: links.linkedin },
    { id: "blog", label: "Blog", href: links.blog },
  ] satisfies SocialLink[],
  hero: {
    eyebrow: "★ bem-vindo à workstation ★",
    imageAlt: "Estação de trabalho retrô em pixel art, com computador e caneca rosa",
    imageCaption: "code · test · document · repeat",
  },
  about: {
    eyebrow: "readme.txt / Kellen Xavier",
    careerLink: { href: pageHref.trajetoria, label: "Ver trajetória completa →" },
  },
  howIWork: {
    workflow: {
      eyebrow: "01 / como trabalho",
      title: "Entender. Construir. Aprender. Evoluir.",
      description:
        "Entendo onde o trabalho trava e priorizo melhorias com a equipe. Uso testes, documentação e mentoria para apoiar a entrega e a manutenção.",
      link: { href: pageHref.workflow, label: "Ver meu workflow →" },
    },
    setup: {
      eyebrow: "02 / o que eu uso",
      title: "Setup & ferramentas",
      chips: ["Claude Code", "Codex", "Kitty", "Playwright", "k6"],
      links: [
        { href: pageHref.setup, label: "Ver setup →" },
        { href: pageHref.ferramentas, label: "Ver ferramentas →" },
      ],
    },
  },
  cv: {
    title: "Prefere em PDF?",
    description: "Baixe meu CV em português ou inglês.",
    downloads: [
      { href: links.cvPt, label: "Baixar CV em português ↓" },
      { href: links.cvEn, label: "Baixar CV em inglês ↓" },
    ],
  },
  closing: {
    title: "O estudo continua.",
    description: "Outras anotações, referências e experiências estão no meu blog Ladydebug.",
    linkLabel: "Ler o blog ↗",
  },
  footer: {
    author: "Kellen Xavier",
    taglines: ["code & tests"],
  },
  projectsBlogLabel: "Estudos no blog ↗",
  projectLinkLabel: "Ver repositório ↗",
  projectLinkAccessibleLabel: "Ver repositório",
};
