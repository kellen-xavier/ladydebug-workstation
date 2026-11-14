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

function workCase(id: string, source: string): WorkCase {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`Missing work metadata: ${id}`);
  const fields = Object.fromEntries(
    (match[1] ?? "").split("\n").map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator), line.slice(separator + 1).trim()];
    }),
  );
  if (!fields.stack || !fields.period || !fields.summary) {
    throw new Error(`Incomplete work metadata: ${id}`);
  }
  return {
    id,
    stack: fields.stack,
    period: fields.period,
    summary: fields.summary,
    content: source.slice(match[0].length).trim(),
  };
}

export const workCases: WorkCase[] = [
  workCase("web", web),
  workCase("mobile", mobile),
  workCase("cadastro", cadastro),
  workCase("backend", backend),
  workCase("site-web", siteWeb),
  workCase("unity", unity),
];
