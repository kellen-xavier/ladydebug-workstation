# LadyDebug Workstation

Landing page pessoal de Kellen Xavier (LadyDebug), com projetos de engenharia de software, qualidade, automação de testes e documentação.

## Visual

Estética de homepage dos anos 2000–2009, ilustração em pixel art e paleta do blog LadyDebug: creme, bege, marrom e rosa. Layout responsivo, navegação por teclado e fonte hospedada localmente.

## Tecnologias

- [Bun](https://bun.com/) — runtime, gerenciador de pacotes, servidor de desenvolvimento (com hot reload) e bundler.
- [React 19](https://react.dev/) + TypeScript.
- CSS puro (sem framework), com variáveis de cor em `:root`.
- [Biome](https://biomejs.dev/) — lint e formatação de TS/TSX, CSS e JSON (inclui regras de React e acessibilidade).

## Estrutura

```txt
ladydebug-workstation/
├── src/
│   ├── index.html          # HTML de entrada (metatags, favicon, CSS, script)
│   ├── main.tsx            # monta o React em #root
│   ├── App.tsx             # composição da página
│   ├── components/         # uma seção por componente
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Topics.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── About.tsx
│   │   ├── Closing.tsx
│   │   ├── Footer.tsx
│   │   ├── Brand.tsx
│   │   └── ExternalLink.tsx
│   ├── data/site.ts        # links, tópicos e lista de projetos
│   ├── styles/global.css   # todos os estilos
│   └── assets/
│       ├── pixel-desk.png
│       └── fonts/          # pixelify.woff2 + OFL.txt
├── scripts/preview.ts      # servidor estático para testar o build
├── dist/                   # saída do build (gerada, não versionada)
├── biome.json            # configuração do lint/formatação
├── bun-env.d.ts            # tipos para importar .png e .css
├── package.json
└── tsconfig.json
```

## Executar localmente

Requer [Bun](https://bun.com/docs/installation) 1.3 ou superior.

```sh
bun install        # instala as dependências
bun run dev        # desenvolvimento em http://localhost:3000 (hot reload)
bun run build      # gera o site estático em dist/
bun run preview    # build + serve dist/ em http://localhost:4173
bun run typecheck  # verificação de tipos com TypeScript
bun run lint       # lint + checagem de formatação (Biome)
bun run lint:fix   # corrige automaticamente o que for possível
```

## Editar

- **Projetos, links e tópicos:** `src/data/site.ts` — adicione um item em `projects` para criar um novo card.
- **Textos das seções:** o componente correspondente em `src/components/`.
- **Cores e estilos:** `src/styles/global.css`.

## Publicação

`bun run build` gera em `dist/` arquivos estáticos com caminhos relativos, que podem ser publicados em qualquer hospedagem estática (GitHub Pages, Netlify, etc.). Nenhuma integração de publicação automática está configurada neste repositório.

## Créditos

- Paleta e fonte utilizadas no [blog LadyDebug](https://kellen-xavier.github.io/ladydebug.github.io/).
- Pixelify Sans distribuída sob SIL Open Font License 1.1; consulte `src/assets/fonts/OFL.txt`.
- Ilustração do computador gerada com IA para este projeto.
