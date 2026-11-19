# Ladydebug Workstation

Landing page pessoal minha (Ladydebug), com projetos de engenharia de software, qualidade e o pouco que já trabalhei.
Ainda estou desenvolvendo, tem alguns achado que preciso colocar aqui.

## Tecnologias

- [Bun](https://bun.com/) — runtime, gerenciador de pacotes, servidor de desenvolvimento (com hot reload) e bundler.
- [React 19](https://react.dev/) + TypeScript.
- [react-markdown](https://github.com/remarkjs/react-markdown) — renderização dos textos em Markdown.
- CSS puro (sem framework), com variáveis de cor em `:root`.
- Ícones sociais sem biblioteca: GitHub e LinkedIn são SVGs no componente; o Blog usa `src/assets/icons-blog.svg` com cor herdada do tema.
- Os cartões de projetos usam uma versão enxuta do [ClickSpark do React Bits](https://reactbits.dev/animations/click-spark), desenhada em canvas com a cor de destaque do site. O efeito respeita a preferência por movimento reduzido.
- [Biome](https://biomejs.dev/) — lint e formatação de TS/TSX, CSS e JSON (inclui regras de React e acessibilidade).

## Estrutura

```txt
ladydebug-workstation/
├── src/
│   ├── pages.ts            # registro único das páginas (slug, título, descrição, componente)
│   ├── components/         # componentes: páginas (*Page/HomePage) e seções compartilhadas
│   │   ├── HomePage.tsx     # composição da home
│   │   ├── CareerPage.tsx   # página de trajetória
│   │   ├── PracticePage.tsx # página Trabalhos
│   │   ├── WorkflowPage.tsx # página de workflow (relato completo do processo)
│   │   ├── SetupPage.tsx
│   │   ├── ToolsPage.tsx
│   │   ├── GamesPage.tsx
│   │   ├── UnderDevelopmentPage.tsx # mensagem temporária em games.html
│   │   ├── ContactPage.tsx # contato por e-mail e redes sociais
│   │   ├── Header.tsx       # navegação principal + links sociais
│   │   ├── BackToTop.tsx    # botão de retorno ao topo após rolar a página
│   │   ├── SocialLinks.tsx  # ícones GitHub, LinkedIn e Blog
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SiteMap.tsx      # mapa do site, atualmente fora da home
│   │   ├── HowIWork.tsx     # resumo de workflow e setup na home
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ClickSpark.tsx  # efeito de clique nos cartões de projetos
│   │   ├── CvDownload.tsx   # bloco de download do CV
│   │   ├── Closing.tsx
│   │   ├── Footer.tsx
│   │   ├── Brand.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── CopyButton.tsx   # botão de copiar (ferramentas)
│   │   ├── Work.tsx
│   │   ├── Workflow.tsx
│   │   ├── PageHead.tsx     # cabeçalho de página interna
│   │   ├── PageLayout.tsx   # cabeçalho e rodapé compartilhados
│   │   └── MarkdownContent.tsx # renderização compartilhada de Markdown
│   ├── hooks/
│   │   └── useHashReveal.ts # abre o caso/seção indicado pela âncora da URL
│   ├── content/            # conteúdo editável, separado do layout
│   │   ├── apresentacao.md
│   │   ├── sobre.md
│   │   ├── trabalhos/
│   │   │   ├── index.ts    # ordem, IDs e tecnologias dos relatos
│   │   │   ├── web.md
│   │   │   ├── site-web.md
│   │   │   ├── mobile.md
│   │   │   ├── backend.md
│   │   │   ├── cadastro.md
│   │   │   └── unity.md
│   │   ├── fluxo.md        # breve apresentação do processo de trabalho
│   │   ├── fluxo-completo.md # relato e critérios de conclusão dos estudos
│   │   ├── fluxo-passos.md # etapas, rótulos e ciclo do fluxo (seção da home)
│   │   ├── mapa.md         # lugares do mapa do site
│   │   ├── trajetoria.md   # linha do tempo da trajetória
│   │   ├── setup.md        # painéis do setup
│   │   ├── ferramentas.md  # lista de ferramentas e comandos
│   │   ├── games.md         # rascunho de games, preservado para depois
│   │   ├── em-desenvolvimento.md # mensagem temporária da rota games.html
│   │   ├── contato.md       # apresentação e rótulos da página de contato
│   │   ├── projetos.md     # cartões dos projetos
│   │   └── site.ts         # navegação, rótulos, links e textos auxiliares
│   ├── styles/
│   │   ├── foundation.css  # tokens, reset e estrutura compartilhada
│   │   ├── home.css        # apresentação e blocos da home
│   │   ├── practice.css    # relatos de contribuições
│   │   ├── workflow.css    # fluxo e página de workflow
│   │   ├── theme.css       # tipografia e aparência compartilhadas
│   │   ├── sections.css    # mapa, painéis e CV
│   │   ├── internal-pages.css # trajetória, setup, ferramentas e games
│   │   ├── responsive.css  # ajustes responsivos das páginas internas
│   │   ├── editorial-layout.css # refinamentos de layout editorial
│   │   ├── contact.css     # página de contato
│   │   └── click-spark.css # camada visual dos cliques nos projetos
│   └── assets/
│       ├── pixel-desk.png
│       ├── icons-blog.svg   # ícone do Blog adaptável às cores do menu
│       ├── workflow.png
│       ├── cv-kellen-xavier-pt-br.pdf # CV em português
│       ├── cv-kellen-xavier-en.pdf    # CV em inglês
│       └── fonts/          # pixelify.woff2 + OFL.txt
├── scripts/
│   ├── generate-pages.ts   # gera, a partir de src/pages.ts, o HTML e a entrada de cada página
│   ├── dev.ts              # servidor de desenvolvimento (gera as páginas e usa o bundler do Bun)
│   ├── build.ts            # build estático com imagens referenciadas no Markdown
│   ├── preview.ts          # servidor estático para testar o build
│   └── markdown-text.ts    # leitura de Markdown como texto no desenvolvimento
├── tests/                  # testes de conteúdo, renderização e navegação
├── bunfig.toml             # plugin de Markdown do servidor de desenvolvimento
├── .generated/             # HTML e entradas geradas (temporário, não versionado)
├── dist/                   # saída do build (gerada, não versionada)
├── biome.json            # configuração do lint/formatação
├── bun-env.d.ts            # tipos para importar .png e .css
├── package.json
└── tsconfig.json
```

## Commands

Requer [Bun](https://bun.com/docs/installation) 1.3 ou superior.

```sh
bun install        # instala as dependências
bun test           # testes de regressão e integração
bunx playwright install chromium # instala o navegador dos testes (uma vez)
bun run test:browser # testes de interface em desktop, tablet e celular
bun run test:browser:production # os mesmos testes sobre o build estático
bun run dev        # desenvolvimento em http://localhost:3000 (hot reload)
bun run build      # gera o site estático em dist/
bun run preview    # build + serve dist/ em http://localhost:4173
bun run typecheck  # verificação de tipos com TypeScript
bun run lint       # lint + checagem de formatação (Biome)
bun run lint:fix   # corrige automaticamente o que for possível
```

`bun run test:browser` executa cenários Playwright em 1440, 768, 390 e 320 px de largura, usando um servidor próprio na porta 4174. Os cenários ficam separados por fluxo em `e2e/navigation.e2e.ts`, `home.e2e.ts`, `contact.e2e.ts`, `practice.e2e.ts`, `workflow.e2e.ts`, `tools-and-games.e2e.ts` e `responsive.e2e.ts`; helpers compartilhados ficam em `e2e/support/`. A suíte cobre navegação, cliques, downloads, contato, abertura de relatórios, cópia para a área de transferência, a rota temporária de Games, âncoras e usabilidade responsiva.

## Publicação

`bun run build` gera em `dist/` as páginas `index.html`, `trajetoria.html`, `pratica.html`, `workflow.html`, `setup.html`, `ferramentas.html`, `games.html` e `contato.html`, além dos CVs em português e inglês e dos arquivos estáticos, com caminhos relativos. O build falha se algum dos PDFs em `src/assets/` não existir. Publique todo o diretório para que o acesso direto a cada página funcione sem redirecionamentos de SPA. Os arquivos podem ser hospedados no GitHub Pages, Netlify ou outra hospedagem estática.

### GitHub Pages

O workflow `.github/workflows/pages.yml` valida pull requests destinados à `main`. Ele instala as dependências com o lockfile, executa lint, TypeScript, testes Bun e testes de navegador sobre o build de produção em quatro larguras.

Após um push na `main`, os mesmos testes são executados e o diretório `dist/` validado é publicado no ambiente `github-pages`. A publicação também pode ser iniciada manualmente na aba Actions, selecionando a `main`. Pull requests e outras branches não publicam o site.

Publicado: [kellen-xavier.github.io/ladydebug-workstation](https://kellen-xavier.github.io/ladydebug-workstation/).

## Créditos

- Paleta e fonte utilizadas no [blog Ladydebug](https://kellen-xavier.github.io/ladydebug.github.io/).
- Pixelify Sans distribuída sob SIL Open Font License 1.1; consulte `src/assets/fonts/OFL.txt`.
- Ilustração do computador gerada com IA para este projeto.

## Portfólio de contribuições

A página não publica código privado ou relatórios internos completos.

- `src/content/trabalhos/`: casos e origem documental
- `src/content/fluxo-passos.md`: etapas do fluxo com links para os casos.
- `src/content/projetos.md`: projetos abertos, incluindo Ladydebug Bot Planner.
