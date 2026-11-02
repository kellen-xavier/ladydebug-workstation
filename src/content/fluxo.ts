import introduction from "./fluxo.md" with { type: "text" };
import { pageHref } from "./site";

export type WorkflowStep = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

const caseHref = (id: string) => `${pageHref.pratica}#${id}`;

export const workflow = {
  eyebrow: "03 / COMO TRABALHO",
  title: "Entender. Construir.",
  titleEmphasis: "Aprender. Evoluir.",
  intro: introduction,
  details: {
    href: pageHref.workflow,
    label: "Conhecer meu Workflow",
  },
  steps: [
    {
      id: "mobile",
      icon: "⌕",
      title: "Entender o contexto",
      description:
        "Regras de negócio, integrações, riscos e critérios de aceite definem o contexto.",
      href: caseHref("mobile"),
      linkLabel: "Requisitos no mobile →",
    },
    {
      id: "cadastro",
      icon: "</>",
      title: "Construir e testar",
      description: "Implementação e testes em mudanças pequenas e revisáveis.",
      href: caseHref("cadastro"),
      linkLabel: "Regras no cadastro →",
    },
    {
      id: "backend",
      icon: "[✓]",
      title: "Revisar e evidenciar",
      description: "Código, verificações e documentação apoiam a entrega.",
      href: caseHref("backend"),
      linkLabel: "Contratos no backend →",
    },
    {
      id: "unity",
      icon: "↻",
      title: "Acompanhar e evoluir",
      description: "Feedback e comportamento observado orientam o próximo incremento.",
      href: caseHref("unity"),
      linkLabel: "Cenários em Unity →",
    },
  ] satisfies WorkflowStep[],
  cycle: {
    icon: "↻",
    description: "Um ciclo de colaboração e melhoria contínua.",
    href: "#fluxo",
    linkLabel: "Voltar ao contexto ↑",
  },
};
