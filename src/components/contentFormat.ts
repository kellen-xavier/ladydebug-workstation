/**
 * Small parsing helpers shared by the page components. The editable text lives
 * in src/content/*.md (front matter + "## heading" sections with "- " lines);
 * these turn it into the typed structures each page renders.
 */

/** Splits the leading `--- ... ---` front matter (flat `key: value`) from the body. */
export function frontmatter(source: string): { meta: Record<string, string>; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field?.[1]) meta[field[1]] = (field[2] ?? "").trim();
  }
  return { meta, body: match?.[2] ?? source };
}

export type Section = { heading: string; lines: string[] };

/** Groups the body into "## heading" sections, each collecting its "- " lines. */
export function sections(body: string): Section[] {
  const result: Section[] = [];
  for (const raw of body.split("\n")) {
    const heading = raw.match(/^##\s+(.+?)\s*$/);
    if (heading?.[1]) {
      result.push({ heading: heading[1], lines: [] });
      continue;
    }
    const item = raw.match(/^-\s+(.+?)\s*$/);
    const current = result.at(-1);
    if (item?.[1] && current) current.lines.push(item[1]);
  }
  return result;
}

/** Splits "Label: value" on the first ": "; the value keeps any later colons. */
export function keyValue(line: string): { key: string; value: string } {
  const match = line.match(/^(.+?):\s+(.+)$/);
  return { key: (match?.[1] ?? line).trim(), value: (match?.[2] ?? "").trim() };
}

/** Splits "icon rest of heading": the icon is the first whitespace-delimited token. */
export function splitIcon(heading: string): { icon: string; title: string } {
  const [icon = "", ...rest] = heading.split(/\s+/);
  return { icon, title: rest.join(" ") };
}
