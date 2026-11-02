# Ladydebug Workstation

Landing page pessoal minha (Ladydebug), com projetos de engenharia de software, qualidade, automação de testes e documentação.

## Visual

Estética de homepage dos anos 2000–2009, ilustração em pixel art e paleta do blog Ladydebug: creme, bege, marrom e rosa. Layout responsivo, navegação por teclado e fonte hospedada localmente.

## Tecnologias

- [Bun](https://bun.com/) — runtime, gerenciador de pacotes, servidor de desenvolvimento (com hot reload) e bundler.
- [React 19](https://react.dev/) + TypeScript.
- [react-markdown](https://github.com/remarkjs/react-markdown) — renderização dos textos em Markdown.
- CSS puro (sem framework), com variáveis de cor em `:root`.
- [Biome](https://biomejs.dev/) — lint e formatação de TS/TSX, CSS e JSON (inclui regras de React e acessibilidade).

## Estrutura

```txt
ladydebug-workstation/
├── src/
│   ├── pages.ts            # fonte única das entradas HTML (build, dev e testes)
│   ├── index.html          # home do portfólio (metatags, favicon, CSS, script)
│   ├── trajetoria.html     # página de trajetória profissional
│   ├── pratica.html        # página "Na prática" (casos e evidências)
│   ├── workflow.html       # página interna sobre o processo de trabalho
│   ├── setup.html          # página de setup
│   ├── ferramentas.html    # página de ferramentas
│   ├── games.html          # página de games
│   ├── main.tsx            # entrada React da home
│   ├── trajetoria-main.tsx # entrada React da trajetória
│   ├── pratica-main.tsx    # entrada React do "Na prática"
│   ├── workflow-main.tsx   # entrada React do workflow
│   ├── setup-main.tsx      # entrada React do setup
│   ├── ferramentas-main.tsx # entrada React das ferramentas
│   ├── games-main.tsx      # entrada React dos games
│   ├── mount.tsx           # monta um componente de página em #root
│   ├── App.tsx             # composição da home
│   ├── components/         # uma seção/página por componente
│   │   ├── Header.tsx       # navegação principal + links sociais
│   │   ├── SocialLinks.tsx  # ícones GitHub, LinkedIn e Blog
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SiteMap.tsx      # mapa do site na home
│   │   ├── HowIWork.tsx     # resumo de workflow e setup na home
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CvDownload.tsx   # bloco de download do CV
│   │   ├── Closing.tsx
│   │   ├── Footer.tsx
│   │   ├── Brand.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── CopyButton.tsx   # botão de copiar (ferramentas)
│   │   ├── CareerPage.tsx   # página de trajetória
│   │   ├── PracticePage.tsx # página "Na prática"
│   │   ├── SetupPage.tsx
│   │   ├── ToolsPage.tsx
│   │   ├── GamesPage.tsx
│   │   ├── Work.tsx
│   │   ├── Workflow.tsx
│   │   ├── WorkflowPage.tsx # relato completo do processo
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
│   │   │   ├── mobile.md
│   │   │   ├── backend.md
│   │   │   ├── cadastro.md
│   │   │   └── unity.md
│   │   ├── fluxo.md        # breve apresentação do processo de trabalho
│   │   ├── fluxo-completo.md # relato e critérios de conclusão dos estudos
│   │   ├── fluxo.ts        # etapas e links do fluxo
│   │   ├── mapa.ts         # itens do mapa do site
│   │   ├── trajetoria.ts   # linha do tempo da trajetória
│   │   ├── setup.ts        # painéis do setup
│   │   ├── ferramentas.ts  # lista de ferramentas e comandos
│   │   ├── games.ts        # lista de games e status
│   │   ├── projetos.ts     # cartões dos projetos
│   │   └── site.ts         # navegação, rótulos, links e textos auxiliares
│   ├── data/site.ts        # reexportações para compatibilidade
│   ├── styles/
│   │   ├── global.css      # estilos base e compartilhados
│   │   └── pages.css        # estilos das novas páginas (carregado após global.css)
│   └── assets/
│       ├── pixel-desk.png
│       ├── workflow.png
│       ├── cv-kellen-xavier.pdf # CV baixável (adicione o arquivo; o build exige)
│       └── fonts/          # pixelify.woff2 + OFL.txt
├── scripts/
│   ├── dev.ts              # servidor de desenvolvimento de todas as páginas
│   ├── build.ts            # build estático com imagens referenciadas no Markdown
│   ├── preview.ts          # servidor estático para testar o build
│   └── markdown-text.ts    # leitura de Markdown como texto no desenvolvimento
├── tests/                  # testes de conteúdo, renderização e navegação
├── bunfig.toml             # plugin de Markdown do servidor de desenvolvimento
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

## Editar

- **Apresentação e sobre:** `src/content/apresentacao.md` e `src/content/sobre.md`.
- **Relatos dos trabalhos:** `src/content/trabalhos/*.md`. A ordem, o ID da âncora, as tecnologias e o resumo visível de cada contribuição (`summary`) ficam em `src/content/trabalhos/index.ts`.
- **Texto de apresentação do fluxo:** `src/content/fluxo.md` — aceita parágrafos, ênfase e links Markdown.
- **Página completa do workflow:** `src/content/fluxo-completo.md` — conteúdo acessível pelo botão “Conhecer meu Workflow”, em `workflow.html`. Aceita listas de tarefas com `- [ ]` e `- [x]`.
- **Etapas do fluxo:** `src/content/fluxo.ts`. A ordem dos itens em `steps` define a ordem de exibição.
- **Projetos:** `src/content/projetos.ts` — adicione um item em `projects` para criar um novo cartão.
- **Mapa do site:** `src/content/mapa.ts`.
- **Trajetória:** `src/content/trajetoria.ts` — linha do tempo da página Trajetória.
- **Setup:** `src/content/setup.ts`.
- **Ferramentas:** `src/content/ferramentas.ts` — lista e comandos de instalação (os exemplos de Git e k6 assumem Linux/Homebrew).
- **Games:** `src/content/games.ts`.
- **Navegação, rótulos, links, tópicos e textos auxiliares:** `src/content/site.ts`.
- **Estrutura dos componentes:** `src/components/`.
- **Cores e estilos:** `src/styles/global.css`.

### Convenções do Markdown

O primeiro título de cada arquivo ocupa o espaço de título da seção; os demais blocos formam o corpo. Para preservar os títulos com várias linhas da apresentação e do sobre, eles usam a sintaxe Setext: uma linha de `===` ou `---` abaixo do título. Dois espaços ao final de uma linha inserem uma quebra de linha.

Nos relatos dos trabalhos, use `#` para o título do caso, `###` para os subtítulos e `>` para destacar os limites da evidência. Um título `##` inicia a área expansível de referências; os blocos seguintes ficam dentro dela. Os relatos aceitam parágrafos, listas, ênfase, código e links Markdown, sem JSX ou HTML no conteúdo.

Os arquivos são importados como texto e renderizados por `react-markdown`. Links externos recebem `target="_blank"` e `rel="noopener noreferrer"`; âncoras internas continuam na mesma página. HTML bruto não é renderizado.

Na apresentação do fluxo, os títulos Markdown são exibidos com um único estilo de subtítulo. A hierarquia dos títulos do relato completo é preservada na página interna. Essa página usa `remark-gfm` para apresentar a lista de critérios dos estudos.

O plugin em `scripts/markdown-text.ts`, registrado em `bunfig.toml`, preserva a leitura como texto também após editar um `.md` com o servidor aberto. Isso evita que o recarregamento do Bun converta o Markdown em HTML antes de chegar ao componente. No build, os imports usam `with { type: "text" }`.

### Imagens no Markdown

Use o caminho da imagem relativo ao arquivo Markdown:

```md
![Diagrama do workflow](../assets/workflow.png)
```

O exemplo funciona em `src/content/fluxo-completo.md`. Em arquivos dentro de `src/content/trabalhos/`, use `../../assets/` para chegar à mesma pasta. Caminhos existentes como `/src/assets/workflow.png` também são aceitos.

O plugin identifica as imagens locais e registra seus arquivos no empacotamento do Bun, preservando o texto alternativo e o título. `scripts/build.ts` aplica o mesmo plugin no build de produção. As URLs geradas são relativas, para funcionar também quando o site é publicado em uma subpasta. Não é necessário cadastrar cada imagem em um componente React. Imagens com URL externa permanecem externas; as imagens renderizadas se ajustam à largura do conteúdo.

### Testes de conteúdo

Os testes cobrem as âncoras existentes, os relatos e suas referências, a formatação Markdown e a inclusão de novos relatos e etapas sem alterar o layout. O teste do servidor de desenvolvimento edita uma cópia temporária do conteúdo e verifica o recarregamento.

`tests/fixtures/portfolio-text.txt` registra a redação revisada da página para detectar perdas acidentais. Ao alterar deliberadamente os textos, atualize também essa referência e as expectativas de conteúdo afetadas. Os nomes dos testes permanecem em inglês.

`bun run test:browser` executa os testes Playwright em 1440, 768, 390 e 320 px de largura, usando um servidor próprio na porta 4174. Eles verificam a navegação entre todas as páginas e a marcação da página atual (`aria-current`), as âncoras da home, os links sociais externos, o botão principal na primeira tela e o download do CV, os relatos de "Na prática" (recolhidos, expansão por teclado, abertura por âncora da URL), a página de Workflow (carregamento direto, recarga e imagem Markdown empacotada), o setup, as ferramentas (comando de instalação e botão de copiar) e o filtro de games. As invariantes de layout — ausência de rolagem horizontal, âncoras internas válidas e áreas de toque de pelo menos 44 px nos controles principais — rodam em todas as larguras (o toque, apenas nos perfis móveis). Os locators preferem papéis e rótulos acessíveis em vez de seletores frágeis.

## Publicação

`bun run build` gera em `dist/` as páginas `index.html`, `trajetoria.html`, `pratica.html`, `workflow.html`, `setup.html`, `ferramentas.html` e `games.html`, além do `cv-kellen-xavier.pdf` e dos arquivos estáticos, com caminhos relativos. O build falha de propósito se `src/assets/cv-kellen-xavier.pdf` não existir. Publique todo o diretório para que o acesso direto a cada página funcione sem redirecionamentos de SPA. Os arquivos podem ser hospedados no GitHub Pages, Netlify ou outra hospedagem estática.

### GitHub Pages

O workflow `.github/workflows/pages.yml` valida pull requests destinados à `main`. Ele instala as dependências com o lockfile, executa lint, TypeScript, testes Bun e testes de navegador sobre o build de produção em quatro larguras.

Após um push na `main`, os mesmos testes são executados e o diretório `dist/` validado é publicado no ambiente `github-pages`. A publicação também pode ser iniciada manualmente na aba Actions, selecionando a `main`. Pull requests e outras branches não publicam o site.

A pipeline usa Bun 1.3.14 e Node 24 para o Playwright, com as actions fixadas por commit. As permissões de publicação ficam restritas ao job de deploy. O Pages deve usar **Settings → Pages → Source → GitHub Actions**.

Endereço de publicação: [kellen-xavier.github.io/ladydebug-workstation](https://kellen-xavier.github.io/ladydebug-workstation/).

## Créditos

- Paleta e fonte utilizadas no [blog Ladydebug](https://kellen-xavier.github.io/ladydebug.github.io/).
- Pixelify Sans distribuída sob SIL Open Font License 1.1; consulte `src/assets/fonts/OFL.txt`.
- Ilustração do computador gerada com IA para este projeto.

## Portfólio de contribuições

A seção **Na prática** apresenta quatro casos a partir dos relatórios fornecidos pela autora (análise de 29/10/2026): mobile, backend de estacionamento, cadastro/identificadores fiscais e Unity. Cada caso identifica trabalho realizado, referências históricas e limites da evidência. A página não publica código privado ou relatórios internos completos.

- `src/content/trabalhos/`: casos e origem documental, com hashes SHA-256 das cópias consultadas. Os hashes identificam documentos e não certificam suas afirmações.
- `src/content/fluxo.ts`: fluxo de trabalho com links para os casos.
- `src/content/projetos.ts`: projetos abertos, incluindo Ladydebug Bot Planner.

A revisão da página não repetiu a coleta Git dos projetos privados nem a execução dos testes descritos. Implementação, configuração, execução documentada e implantação são apresentadas separadamente.
