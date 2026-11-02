import { links, pageHref } from "./site";

export type MapPlace = {
  icon: string;
  name: string;
  destination: string;
  question: string;
  href: string;
};

export const siteMap = {
  eyebrow: "map.sav / dia 1, primavera",
  title: "Mapa do site",
  intro: "Escolha um lugar da Vila conforme a sua dúvida.",
  places: [
    {
      icon: "⌂",
      name: "A casa",
      destination: "Quem sou eu",
      question: "Certo, quem é?",
      href: `${pageHref.home}#sobre`,
    },
    {
      icon: "≡",
      name: "O museu",
      destination: "Trajetória",
      question: "Por onde passei?",
      href: pageHref.trajetoria,
    },
    {
      icon: "✿",
      name: "A plantação",
      destination: "Na prática",
      question: "O que já entreguei?",
      href: pageHref.pratica,
    },
    {
      icon: "[#]",
      name: "A oficina",
      destination: "Workflow",
      question: "Como eu trabalho?",
      href: pageHref.workflow,
    },
    {
      icon: "▣",
      name: "A escrivaninha",
      destination: "Setup",
      question: "Qual o meu PC?",
      href: pageHref.setup,
    },
    {
      icon: "▤",
      name: "O galpão",
      destination: "Ferramentas",
      question: "Quais minhas ferramentas de trabalho no uso diário?",
      href: pageHref.ferramentas,
    },
    {
      icon: "◈",
      name: "O fliperama",
      destination: "Games",
      question: "Eu jogo e estudo isso? As vezes jogo (ou tento)",
      href: pageHref.games,
    },
    {
      icon: "✎",
      name: "O mural",
      destination: "Blog",
      question: "O que eu ando estudando?",
      href: links.blog,
    },
    {
      icon: "[@]",
      name: "A caixa de correio",
      destination: "CV em PDF",
      question: "Tem como baixar em PDF? Sim, é só clicar aqui.",
      href: `${pageHref.home}#cv`,
    },
  ] satisfies MapPlace[],
};
