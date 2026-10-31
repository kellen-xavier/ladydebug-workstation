import backend from "./backend.md" with { type: "text" };
import cadastro from "./cadastro.md" with { type: "text" };
import mobile from "./mobile.md" with { type: "text" };
import unity from "./unity.md" with { type: "text" };

export type WorkCase = {
  id: string;
  stack: string;
  summary: string;
  content: string;
};

export const workCases: WorkCase[] = [
  {
    id: "mobile",
    stack: "React Native · TypeScript · Detox · Jest",
    summary:
      "Implementei fluxos mobile e testes que comparam interface, estado da API e débito nos cenários contemplados.",
    content: mobile,
  },
  {
    id: "backend",
    stack: "C# · .NET 10 · xUnit · Moq",
    summary:
      "Estruturei testes de regras de estacionamento e contratos HTTP simulados, com documentação técnica.",
    content: backend,
  },
  {
    id: "cadastro",
    stack: "C# · .NET · NUnit · Contratos HTTP",
    summary:
      "Extraí validações fiscais do legado e integrei o módulo ao cadastro, com testes de domínio e contrato HTTP.",
    content: cadastro,
  },
  {
    id: "unity",
    stack: "C# · Unity Test Framework · NUnit · Zenject",
    summary:
      "Criei e mantive testes de aceitação que reproduzem jornadas e decisões alternativas em um simulador educacional.",
    content: unity,
  },
];
