export const projectSection = {
  eyebrow: "repositories / projetos abertos",
  title: "Conhecimento que vira repositório.",
  linkLabel: "Todos os repositórios ↗",
};

export type Project = {
  title: string;
  icon: string;
  badge: string;
  description: string;
  tags: string[];
  url: string;
};

export const projects: Project[] = [
  {
    title: "LadyDebug Bot Planner",
    icon: "[↻]",
    badge: "COMUNICAÇÃO ASSÍNCRONA",
    description:
      "Bot para Discord que registra notas, tarefas, links e PRs e compila um relatório ao encerrar o dia. Núcleo em ports & adapters, com SQLite e testes em pytest. Slack é uma evolução prevista.",
    tags: ["Python", "Discord · SQLite · pytest"],
    url: "https://github.com/kellen-xavier/ladydebug-bot-planner",
  },
  {
    title: "QA Readme",
    icon: "{ }",
    badge: "QUALITY ENGINEERING",
    description:
      "Referência compartilhada de qualidade: casos de teste, defeitos, evidências, BDD e exemplos SQL.",
    tags: ["Documentation", "QA"],
    url: "https://github.com/kellen-xavier/qa-readme",
  },
  {
    title: "LadyDebug Wiki Projects",
    icon: "~/",
    badge: "STUDY IN PROGRESS",
    description:
      "Estudo em desenvolvimento para organizar documentação com IA, regras de negócio, Markdown e wiki.",
    tags: ["Markdown", "AI · Wiki"],
    url: "https://github.com/kellen-xavier/ladydebug-wiki-projects",
  },
  {
    title: "My Skills",
    icon: ">_",
    badge: "DEVELOPER TOOLING",
    description:
      "Repositório central de skills para agentes de código, compartilhadas entre ferramentas de desenvolvimento.",
    tags: ["Agent skills", "CLI"],
    url: "https://github.com/kellen-xavier/my-skills",
  },
  {
    title: "Tests with k6",
    icon: "k6",
    badge: "TEST AUTOMATION",
    description:
      "Estudo prático com scripts k6 e aplicação Express local, incluindo configuração e execução.",
    tags: ["k6", "Node.js · Express"],
    url: "https://github.com/kellen-xavier/testes-k6",
  },
];
