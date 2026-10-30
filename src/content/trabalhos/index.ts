import backend from "./backend.md" with { type: "text" };
import cadastro from "./cadastro.md" with { type: "text" };
import mobile from "./mobile.md" with { type: "text" };
import unity from "./unity.md" with { type: "text" };

export type WorkCase = {
  id: string;
  stack: string;
  content: string;
};

export const workCases: WorkCase[] = [
  { id: "mobile", stack: "React Native · TypeScript · Detox · Jest", content: mobile },
  { id: "backend", stack: "C# · .NET 10 · xUnit · Moq", content: backend },
  { id: "cadastro", stack: "C# · .NET · NUnit · Contratos HTTP", content: cadastro },
  { id: "unity", stack: "C# · Unity Test Framework · NUnit · Zenject", content: unity },
];
