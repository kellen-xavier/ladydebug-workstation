export const links = {
  github: "https://github.com/kellen-xavier",
  linkedin: "https://www.linkedin.com/in/kellen-xavier/",
  repositories: "https://github.com/kellen-xavier?tab=repositories",
  blog: "https://kellen-xavier.github.io/ladydebug.github.io/",
  cvPt: "./cv-kellen-xavier-pt-br.pdf",
  cvEn: "./cv-kellen-xavier-en.pdf",
};

export type PageId =
  | "home"
  | "trajetoria"
  | "pratica"
  | "workflow"
  | "setup"
  | "ferramentas"
  | "games";

export const pageHref: Record<PageId, string> = {
  home: "./index.html",
  trajetoria: "./trajetoria.html",
  pratica: "./pratica.html",
  workflow: "./workflow.html",
  setup: "./setup.html",
  ferramentas: "./ferramentas.html",
  games: "./games.html",
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
  navigationLabel: "Navegação principal",
  menuLabel: "menu",
  navigation: [
    { label: "Mapa", href: `${pageHref.home}#mapa`, page: "home" },
    { label: "Trajetória", href: pageHref.trajetoria, page: "trajetoria" },
    { label: "Na prática", href: pageHref.pratica, page: "pratica" },
    { label: "Workflow", href: pageHref.workflow, page: "workflow" },
    { label: "Setup", href: pageHref.setup, page: "setup" },
    { label: "Ferramentas", href: pageHref.ferramentas, page: "ferramentas" },
    { label: "Games", href: pageHref.games, page: "games" },
  ] satisfies NavigationItem[],
  socialLabel: "Redes",
  social: [
    { id: "github", label: "GitHub", href: links.github },
    { id: "linkedin", label: "LinkedIn", href: links.linkedin },
    { id: "blog", label: "Blog", href: links.blog },
  ] satisfies SocialLink[],
  hero: {
    eyebrow: "★ bem-vindo à workstation ★",
    action: { href: pageHref.pratica, label: "Ver contribuições →" },
    imageAlt: "Estação de trabalho retrô em pixel art, com computador e caneca rosa",
    imageCaption: "code · test · document · repeat",
  },
  about: {
    eyebrow: "readme.txt",
    careerLink: { href: pageHref.trajetoria, label: "Ver trajetória completa →" },
  },
  howIWork: {
    workflow: {
      eyebrow: "01 / como trabalho",
      title: "Entender. Construir. Aprender. Evoluir.",
      description:
        "Do contexto à revisão, os testes acompanham a implementação. Registro as decisões e uso o aprendizado para orientar a próxima entrega.",
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
  work: {
    eyebrow: "worklog / contribuições",
    title: "O que faço, na prática.",
    badge: "IMPLEMENTAÇÃO · EVIDÊNCIA · LIMITES",
    intro:
      "Os exemplos abaixo vêm de relatórios de contribuições com referências de código, histórico Git e registros de execução. Cada caso explicita o que foi feito e até onde a evidência permite afirmar.",
    methodLabel: "Como ler:",
    method:
      "os casos profissionais são sínteses dos relatórios fornecidos, não uma auditoria independente dos repositórios privados. As fichas identificam a fonte e os localizadores para conferência com acesso ao original. Os projetos abertos podem ser inspecionados diretamente no GitHub.",
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
