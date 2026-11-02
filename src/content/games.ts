import { links } from "./site";

export const gameStatuses = [
  { id: "jogando", label: "Jogando", badge: "▶ jogando" },
  { id: "zerado", label: "Zerados", badge: "★ zerado" },
  { id: "fila", label: "Na fila", badge: "… fila" },
] as const;

export type GameStatus = (typeof gameStatuses)[number]["id"];
export type Game = { title: string; platform: string; status: GameStatus };

// Items in [brackets] are placeholders to be filled in.
export const games = {
  eyebrow: "games.exe / tu joga e estuda isso?",
  title: "Games",
  intro: "Como organizo meus jogos no setup e o que estou estudando sobre eles.",
  allLabel: "Todos",
  libraryTitle: "Biblioteca",
  coverLabel: "capa",
  organization: [
    { label: "Launcher", value: "[Steam / Heroic / Lutris]" },
    { label: "Plataformas", value: "[PC · console · portátil]" },
    { label: "Organização", value: "[coleções, saves, backups]" },
  ],
  library: [
    { title: "[Nome do jogo]", platform: "[PC]", status: "jogando" },
    { title: "[Nome do jogo]", platform: "[Switch]", status: "jogando" },
    { title: "[Nome do jogo]", platform: "[PC]", status: "zerado" },
    { title: "[Nome do jogo]", platform: "[PS5]", status: "zerado" },
    { title: "[Nome do jogo]", platform: "[PC]", status: "fila" },
    { title: "[Nome do jogo]", platform: "[Mobile]", status: "fila" },
  ] satisfies Game[],
  blog: {
    title: "Pesquisa & projetos em jogos",
    description: "Acompanhamento dos estudos e projetos com games no blog.",
    href: links.blog,
    label: "Ler no blog ↗",
  },
};
