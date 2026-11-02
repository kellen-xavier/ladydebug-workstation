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
  intro: "Escolha um lugar da vila conforme a sua dúvida.",
  places: [
    { icon: "⌂", name: "A casa", destination: "Quem sou eu", question: "Certo, quem é ela?", href: `${pageHref.home}#sobre` },
    { icon: "≡", name: "O museu", destination: "Trajetória", question: "Por onde ela já passou?", href: pageHref.trajetoria },
    { icon: "✿", name: "A plantação", destination: "Na prática", question: "O que ela já entregou?", href: pageHref.pratica },
    { icon: "[#]", name: "A oficina", destination: "Workflow", question: "Como ela trabalha?", href: pageHref.workflow },
    { icon: "▣", name: "A escrivaninha", destination: "Setup", question: "Qual o PC dela?", href: pageHref.setup },
    { icon: "▤", name: "O galpão", destination: "Ferramentas", question: "Ela trabalha com isso?", href: pageHref.ferramentas },
    { icon: "◈", name: "O fliperama", destination: "Games", question: "Ela joga e estuda isso?", href: pageHref.games },
    { icon: "✎", name: "O mural", destination: "Blog", question: "O que ela anda estudando?", href: links.blog },
    { icon: "[@]", name: "A caixa de correio", destination: "CV em PDF", question: "Tem como baixar em PDF?", href: `${pageHref.home}#cv` },
  ] satisfies MapPlace[],
};
