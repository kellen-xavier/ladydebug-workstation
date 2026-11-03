import { useState } from "react";
import gamesSource from "../content/games.md" with { type: "text" };
import { links } from "../content/site";
import { frontmatter, keyValue, sections } from "./contentFormat";
import { ExternalLink } from "./ExternalLink";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

// Status ids drive the filter, so they stay in code; their labels and badges
// are the display text shown in the filter buttons and the game cards.
export const gameStatuses = [
  { id: "jogando", label: "Jogando", badge: "▶ jogando" },
  { id: "zerado", label: "Zerados", badge: "★ zerado" },
  { id: "fila", label: "Na fila", badge: "… fila" },
] as const;

export type GameStatus = (typeof gameStatuses)[number]["id"];
type Game = { title: string; platform: string; status: GameStatus };
type Filter = GameStatus | "todos";

/**
 * Reads src/content/games.md: front matter (labels + blog) plus an
 * "## Organização" panel and one "## <status label>" section per status,
 * each listing "- Título — plataforma".
 */
function parseGames(source: string) {
  const { meta, body } = frontmatter(source);
  const statusByLabel = new Map<string, GameStatus>(
    gameStatuses.map((status) => [status.label, status.id]),
  );

  const organization: { label: string; value: string }[] = [];
  const library: Game[] = [];
  for (const section of sections(body)) {
    const status = statusByLabel.get(section.heading);
    if (status) {
      for (const line of section.lines) {
        const [title = line, platform = ""] = line.split(/\s+—\s+/);
        library.push({ title, platform, status });
      }
    } else {
      for (const line of section.lines) {
        const { key, value } = keyValue(line);
        organization.push({ label: key, value });
      }
    }
  }

  return {
    eyebrow: meta.eyebrow ?? "",
    title: meta.title ?? "",
    intro: meta.intro ?? "",
    allLabel: meta.allLabel ?? "",
    libraryTitle: meta.libraryTitle ?? "",
    coverLabel: meta.coverLabel ?? "",
    organization,
    library,
    blog: {
      title: meta.blogTitle ?? "",
      description: meta.blogDescription ?? "",
      href: links.blog,
      label: meta.blogLabel ?? "",
    },
  };
}

export const games = parseGames(gamesSource);

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: games.allLabel },
  ...gameStatuses.map(({ id, label }) => ({ id, label })),
];

const badge = (status: GameStatus) => gameStatuses.find((item) => item.id === status)?.badge;

export function GamesPage() {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible = games.library.filter((game) => filter === "todos" || game.status === filter);

  return (
    <PageLayout current="games">
      <PageHead eyebrow={games.eyebrow} title={games.title} intro={games.intro} />

      <dl className="game-organization">
        {games.organization.map((item) => (
          <div className="panel" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <section className="games-library" aria-labelledby="library-title">
        <div className="section-head">
          <h2 id="library-title">{games.libraryTitle}</h2>
          <div className="filters">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="game-grid">
          {visible.map((game, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static, non-reordered cards; placeholder title/platform can repeat
            <article className="game" key={`${game.title}-${game.platform}-${index}`}>
              <div className="game-cover" aria-hidden="true">
                {games.coverLabel}
              </div>
              <p className="game-meta">
                <span>{game.platform}</span>
                <span>{badge(game.status)}</span>
              </p>
              <h3>{game.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="cv">
        <div>
          <h2>{games.blog.title}</h2>
          <p>{games.blog.description}</p>
        </div>
        <ExternalLink className="button" href={games.blog.href}>
          {games.blog.label}
        </ExternalLink>
      </section>
    </PageLayout>
  );
}
