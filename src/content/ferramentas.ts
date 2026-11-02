export type Tool = {
  category: "IA" | "Terminal" | "Dev" | "Testes";
  name: string;
  description: string;
  install: string;
  url: `https://${string}`;
};

export const toolsPage = {
  eyebrow: "tools.list / caixa de ferramentas",
  title: "Ferramentas",
  intro: "O que uso no dia a dia, onde baixar e como instalar.",
  officialSiteLabel: "Site oficial ↗",
  copyLabel: "copiar",
  copiedLabel: "copiado",
};

// Review the commands for your operating system before publishing.
export const tools: Tool[] = [
  {
    category: "IA",
    name: "Claude Code",
    description: "Agente de código no terminal.",
    install: "npm install -g @anthropic-ai/claude-code",
    url: "https://www.anthropic.com/claude-code",
  },
  {
    category: "IA",
    name: "Codex CLI",
    description: "Agente de código da OpenAI no terminal.",
    install: "npm install -g @openai/codex",
    url: "https://github.com/openai/codex",
  },
  {
    category: "Terminal",
    name: "Kitty",
    description: "Terminal rápido, acelerado por GPU.",
    install: "curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin",
    url: "https://sw.kovidgoyal.net/kitty/",
  },
  {
    category: "Terminal",
    name: "Git",
    description: "Controle de versão.",
    install: "sudo apt install git",
    url: "https://git-scm.com/downloads",
  },
  {
    category: "Dev",
    name: "Bun",
    description: "Runtime e gerenciador de pacotes usado neste site.",
    install: "curl -fsSL https://bun.sh/install | bash",
    url: "https://bun.sh",
  },
  {
    category: "Dev",
    name: "Biome",
    description: "Formatação e lint.",
    install: "bun add -D -E @biomejs/biome",
    url: "https://biomejs.dev",
  },
  {
    category: "Testes",
    name: "Playwright",
    description: "Testes end-to-end no navegador.",
    install: "bunx playwright install",
    url: "https://playwright.dev",
  },
  {
    category: "Testes",
    name: "k6",
    description: "Testes de carga e performance.",
    install: "brew install k6",
    url: "https://k6.io",
  },
];
