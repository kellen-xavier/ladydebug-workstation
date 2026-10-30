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
  intro:
    "Qualidade faz parte do desenvolvimento: os testes acompanham a implementação, e o que aprendemos orienta a próxima entrega.",
  steps: [
    {
      id: "mobile",
      icon: "⌕",
      title: "Entender o contexto",
      description:
        "Regras de negócio, integrações, riscos e critérios de aceite tornam o problema concreto.",
      href: "#mobile",
      linkLabel: "Requisitos e lacunas no mobile →",
    },
    {
      id: "cadastro",
      icon: "</>",
      title: "Construir e testar",
      description: "Implementação e testes avançam juntos, em mudanças pequenas e revisáveis.",
      href: "#cadastro",
      linkLabel: "Regras e testes no cadastro →",
    },
    {
      id: "backend",
      icon: "[✓]",
      title: "Revisar e evidenciar",
      description: "Código, verificações e documentação apoiam a revisão e a decisão de entrega.",
      href: "#backend",
      linkLabel: "Contratos e documentação no backend →",
    },
    {
      id: "unity",
      icon: "↻",
      title: "Acompanhar e evoluir",
      description: "Feedback e comportamento observado ajudam a ajustar o próximo incremento.",
      href: "#unity",
      linkLabel: "Evolução dos cenários em Unity →",
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
  steps: WorkflowStep[];
  cycle: { icon: string; description: string; href: `#${string}`; linkLabel: string };
};
