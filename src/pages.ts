/** Every HTML entry of the static site. Used by the build, the dev server and tests. */
export const pageFiles = [
  "index.html",
  "trajetoria.html",
  "pratica.html",
  "workflow.html",
  "setup.html",
  "ferramentas.html",
  "games.html",
] as const;

export type PageFile = (typeof pageFiles)[number];
