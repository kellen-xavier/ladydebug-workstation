import { pageHref } from "./site";

export type SetupGroup = {
  title: string;
  icon: string;
  items: { label: string; value: string }[];
};

// Items in [brackets] are placeholders to be filled in.
export const setup = {
  eyebrow: "setup.txt / qual o meu PC?",
  title: "Setup",
  intro: "Sistema, IAs, terminal e o resto da estação onde programo, testo e documento.",
  toolsLink: { href: pageHref.ferramentas, label: "Como instalar cada ferramenta →" },
  groups: [
    { title: "Sistema", icon: "[▣]", items: [{ label: "SO", value: "[sistema operacional]" }, { label: "Shell", value: "[bash / zsh / fish]" }, { label: "Dotfiles", value: "[link do repositório]" }] },
    { title: "IAs", icon: "✦", items: [{ label: "Agente", value: "Claude Code" }, { label: "Agente", value: "Codex" }, { label: "Skills", value: "My Skills" }] },
    { title: "Terminal & editor", icon: ">_", items: [{ label: "Terminal", value: "Kitty" }, { label: "Editor", value: "[editor + tema]" }, { label: "Fonte", value: "[fonte]" }] },
    { title: "Hardware", icon: "▤", items: [{ label: "Máquina", value: "[modelo / CPU / RAM]" }, { label: "Monitor", value: "[tamanho]" }, { label: "Periféricos", value: "[teclado / mouse]" }] },
  ] satisfies SetupGroup[],
};
