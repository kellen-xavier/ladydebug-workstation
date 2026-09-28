export const links = {
  github: "https://github.com/kellen-xavier",
  repositories: "https://github.com/kellen-xavier?tab=repositories",
  blog: "https://kellen-xavier.github.io/ladydebug.github.io/",
};

export const topics = ["TEST AUTOMATION", "DOCUMENTATION", "DEVELOPER TOOLING", "OPEN KNOWLEDGE"];

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
    title: "QA Readme",
    icon: "{ }",
    badge: "QUALITY ENGINEERING",
    description:
      "A shared reference for software quality: test cases, bug reports, test evidence, BDD, and SQL examples.",
    tags: ["Documentation", "QA"],
    url: "https://github.com/kellen-xavier/qa-readme",
  },
  {
    title: "LadyDebug Wiki Projects",
    icon: "~/",
    badge: "STUDY IN PROGRESS",
    description:
      "A starting point for project documentation with AI, connecting business rules, Markdown, and a shared knowledge base.",
    tags: ["Markdown", "AI · Wiki"],
    url: "https://github.com/kellen-xavier/ladydebug-wiki-projects",
  },
  {
    title: "My Skills",
    icon: ">_",
    badge: "DEVELOPER TOOLING",
    description:
      "A central repository of agent skills, shared across AI coding tools so one update can reach multiple workflows.",
    tags: ["Agent skills", "CLI"],
    url: "https://github.com/kellen-xavier/my-skills",
  },
  {
    title: "Tests with k6",
    icon: "k6",
    badge: "TEST AUTOMATION",
    description:
      "A hands-on test project pairing k6 scripts with a local Express application, with setup and execution instructions.",
    tags: ["k6", "Node.js · Express"],
    url: "https://github.com/kellen-xavier/testes-k6",
  },
];
