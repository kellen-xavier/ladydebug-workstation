import type { WorkCase } from "./trabalhos";

type YearMonth = `${number}-${number}`;

export type CareerEntry = {
  end: YearMonth | "present";
  period: string;
  role: string;
  organization: string;
  kind: "work" | "education";
  description: string;
  cases?: WorkCase["id"][];
};

// Ordered by end date, most recent first (verified in tests/career.test.tsx).
// Source: LinkedIn profile exported on 02/11/2026.
export const career = {
  eyebrow: "career.log / QA → engenharia de software",
  title: "Trajetória",
  intro:
    "Mais de seis anos em análise e automação de testes. Nos últimos três, aplicando esse conhecimento em engenharia de software: implementação, integração de sistemas e documentação técnica.",
  highlight: {
    eyebrow: "★ após a pós-graduação · 2026 → hoje",
    title: "Software Engineer",
    description:
      "Com a especialização em Engenharia de Software concluída em dezembro de 2025, o foco passa a ser a engenharia: atuação independente em desenvolvimento, integração de sistemas, testes e documentação.",
    focus: [
      "Mobile em React Native e TypeScript",
      "Regras de negócio em C# e .NET",
      "Testes unitários, de contrato e E2E",
      "Game Quality Engineering em Unity",
      "Estudos sobre carga cognitiva e manutenibilidade",
    ],
  },
  timeline: [
    {
      end: "present",
      period: "out 2021 → hoje",
      role: "Software Engineer",
      organization: "Atuação independente",
      kind: "work",
      description:
        "Desenvolvimento e manutenção de funcionalidades mobile e de regras de negócio, integração com APIs, testes em diferentes níveis, pipelines de execução e documentação de arquitetura, com práticas de Shift Left Testing.",
      cases: ["mobile", "backend", "cadastro", "unity"],
    },
    {
      end: "2026-08",
      period: "jul 2022 – ago 2026",
      role: "Analista de testes",
      organization: "DBServer",
      kind: "work",
      description:
        "Gerenciamento de testes do refinamento à validação final, automação mobile nativa integrada a CI/CD na plataforma Perfecto, mentorias para iniciantes em QA e apresentações na comunidade interna de testes.",
    },
    {
      end: "2025-12",
      period: "mar – dez 2025",
      role: "Pós-graduação em Engenharia de Software",
      organization: "Unisinos · Especialização",
      kind: "education",
      description: "Especialização que marca a virada do foco de QA para engenharia de software.",
    },
    {
      end: "2023-01",
      period: "jun 2021 – jan 2023",
      role: "Analista de teste / QA",
      organization: "Vortigo Digital",
      kind: "work",
      description:
        "Planos e casos de teste, rastreamento de bugs e causas raiz, monitoramento de crashes, validação de releases e manipulação de dados com SQL, em times Kanban e Scrum.",
    },
    {
      end: "2022-05",
      period: "mar 2018 – mai 2022",
      role: "Graduação em Análise e Desenvolvimento de Sistemas",
      organization: "UNINTER",
      kind: "education",
      description: "Formação concluída em maio de 2022.",
    },
  ] satisfies CareerEntry[],
  before: {
    eyebrow: "antes · 2018 – 2021",
    title: "Suporte e front-end",
    description:
      "Front-end em WordPress na Ondaweb (2018), PHP com Laravel e WordPress na POP3DEV (2018–2019), incluindo a validação de uma migração para ERP, e suporte N1 a N3 em projetos web e mobile na Vortigo Digital (2019–2021), onde a transição para QA começou.",
  },
  practiceLinkLabel: "Casos relacionados:",
};
