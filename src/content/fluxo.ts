import introduction from "./fluxo.md" with { type: "text" };

export type WorkflowStep = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: `#${string}`;
  linkLabel: string;
};

export const workflow = {
  eyebrow: "03 / COMO TRABALHO",
  title: "Entender. Construir.",
  titleEmphasis: "Aprender. Evoluir.",
  intro: introduction,
  details: {
    href: "./workflow.html",
    label: "Conhecer meu Workflow",
    backHref: "./index.html#fluxo",
    backLabel: "Voltar ao portfólio",
  },
  steps: [
    {
      id: "mobile",
      icon: "⌕",
      title: "Entender o contexto",
      description:
        "Regras de negócio, integrações, riscos e critérios de aceite definem o contexto.",
      href: "#mobile",
      linkLabel: "Requisitos no mobile →",
    },
    {
      id: "cadastro",
      icon: "</>",
      title: "Construir e testar",
      description: "Implementação e testes em mudanças pequenas e revisáveis.",
      href: "#cadastro",
      linkLabel: "Regras no cadastro →",
    },
    {
      id: "backend",
      icon: "[✓]",
      title: "Revisar e evidenciar",
      description: "Código, verificações e documentação apoiam a entrega.",
      href: "#backend",
      linkLabel: "Contratos no backend →",
    },
    {
      id: "unity",
      icon: "↻",
      title: "Acompanhar e evoluir",
      description: "Feedback e comportamento observado orientam o próximo incremento.",
      href: "#unity",
      linkLabel: "Cenários em Unity →",
    },
  ],
  cycle: {
    icon: "↻",
    description: "Um ciclo de colaboração e melhoria contínua.",
    href: "#fluxo",
    linkLabel: "Voltar ao contexto ↑",
  },
} satisfies {
  eyebrow: string;
  title: string;
  titleEmphasis: string;
  intro: string;
  details: { href: string; label: string; backHref: string; backLabel: string };
  steps: WorkflowStep[];
  cycle: { icon: string; description: string; href: `#${string}`; linkLabel: string };
};
