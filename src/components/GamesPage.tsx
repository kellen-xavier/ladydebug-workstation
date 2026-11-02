import { useState } from "react";
import { type GameStatus, gameStatuses, games } from "../content/games";
import { ExternalLink } from "./ExternalLink";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type Filter = GameStatus | "todos";

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
