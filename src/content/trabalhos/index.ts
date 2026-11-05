import backend from "./backend.md" with { type: "text" };
import cadastro from "./cadastro.md" with { type: "text" };
import mobile from "./mobile.md" with { type: "text" };
import ppci from "./ppci.md" with { type: "text" };
import unity from "./unity.md" with { type: "text" };
import web from "./web.md" with { type: "text" };

export type WorkCase = {
  id: string;
  stack: string;
  period: string;
  summary: string;
  content: string;
};

export const workCases: WorkCase[] = [
  {
    id: "web",
    stack: "Vue.js · JavaScript · Axios · Playwright",
    period: "2026",
    summary:
      "Implementei validação fiscal, coordenação de sessão e consultas assíncronas, com testes de comportamento e contratos.",
    content: web,
  },
  {
    id: "mobile",
    stack: "React Native · TypeScript · Detox · Jest",
    period: "2026",
    summary:
      "Implementei fluxos mobile e testes que comparam interface, estado da API e débito nos cenários contemplados.",
    content: mobile,
  },
  {
    id: "cadastro",
    stack: "C# · .NET · NUnit · Contratos HTTP",
    period: "2026",
    summary:
      "Extraí validações fiscais do legado e integrei o módulo ao cadastro, com testes de domínio e contrato HTTP.",
    content: cadastro,
  },
  {
    id: "backend",
    stack: "C# · .NET 10 · xUnit · Moq",
    period: "2026",
    summary:
      "Estruturei testes de regras de estacionamento e contratos HTTP simulados, com documentação técnica.",
    content: backend,
  },
  {
    id: "ppci",
    stack: "React · TypeScript · Decap CMS",
    period: "2026",
    summary:
      "Contribuí no fluxo editorial do CMS, no desempenho da página e na configuração de CI.",
    content: ppci,
  },
  {
    id: "unity",
    stack: "C# · Unity Test Framework · NUnit · Zenject",
    period: "set. 2023 – mar. 2024",
    summary:
      "Criei e mantive testes de aceitação que reproduzem jornadas e decisões alternativas em um simulador educacional.",
    content: unity,
  },
];
