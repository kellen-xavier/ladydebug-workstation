import backend from "./backend.md" with { type: "text" };
import cadastro from "./cadastro.md" with { type: "text" };
import mobile from "./mobile.md" with { type: "text" };
import siteWeb from "./site-web.md" with { type: "text" };
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
      "Aplicativo mobile de estacionamento de carros (com gerenciamento de estacionamento e multas) para usuários finais.",
    content: mobile,
  },
  {
    id: "cadastro",
    stack: "C# · .NET · NUnit · Contratos HTTP",
    period: "2026",
    summary:
      "Backend demicroserviço de cadastro de clientes, com testes unitários e de integração, além de contratos HTTP.",
    content: cadastro,
  },
  {
    id: "backend",
    stack: "C# · .NET 10 · xUnit · Moq",
    period: "2026",
    summary:
      "Backend de microserviço para cadastro de clientes, com testes unitários e de integração, além de contratos HTTP.",
    content: backend,
  },
  {
    id: "site-web",
    stack: "React · TypeScript · Decap CMS",
    period: "2026",
    summary:
      "Criação de site profissional para divulgação de Prestação de Serviços com o suporte do CMS, com testes de interface e integração.",
    content: siteWeb,
  },
  {
    id: "unity",
    stack: "C# · Unity Test Framework · NUnit · Zenject",
    period: "set. 2023 – mar. 2024",
    summary:
      "Teste de unidade e integração de jogos desenvolvidos em Unity, com injeção de dependência e testes automatizados.",
    content: unity,
  },
];
