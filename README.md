# LadyDebug Workstation

Landing page pessoal minha (LadyDebug), com projetos de engenharia de software, qualidade, automação de testes e documentação.

## Visual

Estética de homepage dos anos 2000–2009, ilustração em pixel art e paleta do blog LadyDebug: creme, bege, marrom e rosa. Layout responsivo, navegação por teclado e fonte hospedada localmente.

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
│   │   ├── ExternalLink.tsx
│   │   ├── Work.tsx
│   │   ├── Workflow.tsx
│   │   └── MarkdownContent.tsx # renderização compartilhada de Markdown
│   ├── content/            # conteúdo editável, separado do layout
│   │   ├── apresentacao.md
│   │   ├── sobre.md
│   │   ├── trabalhos/
│   │   │   ├── index.ts    # ordem, IDs e tecnologias dos relatos
│   │   │   ├── mobile.md
│   │   │   ├── backend.md
│   │   │   ├── cadastro.md
│   │   │   └── unity.md
│   │   ├── fluxo.ts        # etapas e links do fluxo
│   │   ├── projetos.ts     # cartões dos projetos
│   │   └── site.ts         # navegação, rótulos, links e textos auxiliares
│   ├── data/site.ts        # reexportações para compatibilidade
│   ├── styles/global.css   # todos os estilos
│   └── assets/
│       ├── pixel-desk.png
│       └── fonts/          # pixelify.woff2 + OFL.txt
├── scripts/
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
bun run dev        # desenvolvimento em http://localhost:3000 (hot reload)
bun run build      # gera o site estático em dist/
bun run preview    # build + serve dist/ em http://localhost:4173
bun run typecheck  # verificação de tipos com TypeScript
bun run lint       # lint + checagem de formatação (Biome)
bun run lint:fix   # corrige automaticamente o que for possível
```

## Editar

- **Apresentação e sobre:** `src/content/apresentacao.md` e `src/content/sobre.md`.
- **Relatos dos trabalhos:** `src/content/trabalhos/*.md`. A ordem, o ID da âncora e as tecnologias ficam em `src/content/trabalhos/index.ts`.
- **Etapas do fluxo:** `src/content/fluxo.ts`. A ordem dos itens em `steps` define a ordem de exibição.
- **Projetos:** `src/content/projetos.ts` — adicione um item em `projects` para criar um novo cartão.
- **Navegação, rótulos, links, tópicos e textos auxiliares:** `src/content/site.ts`.
- **Estrutura dos componentes:** `src/components/`.
- **Cores e estilos:** `src/styles/global.css`.

### Convenções do Markdown

O primeiro título de cada arquivo ocupa o espaço de título da seção; os demais blocos formam o corpo. Para preservar os títulos com várias linhas da apresentação e do sobre, eles usam a sintaxe Setext: uma linha de `===` ou `---` abaixo do título. Dois espaços ao final de uma linha inserem uma quebra de linha.

Nos relatos dos trabalhos, use `#` para o título do caso, `###` para os subtítulos e `>` para destacar os limites da evidência. Um título `##` inicia a área expansível de referências; os blocos seguintes ficam dentro dela. Os relatos aceitam parágrafos, listas, ênfase, código e links Markdown, sem JSX ou HTML no conteúdo.

Os arquivos são importados como texto e renderizados por `react-markdown`. Links externos recebem `target="_blank"` e `rel="noopener noreferrer"`; âncoras internas continuam na mesma página. HTML bruto não é renderizado.

O plugin em `scripts/markdown-text.ts`, registrado em `bunfig.toml`, preserva a leitura como texto também após editar um `.md` com o servidor aberto. Isso evita que o recarregamento do Bun converta o Markdown em HTML antes de chegar ao componente. No build, os imports usam `with { type: "text" }`.

### Testes de conteúdo

Os testes cobrem as âncoras existentes, os relatos e suas referências, a formatação Markdown e a inclusão de novos relatos e etapas sem alterar o layout. O teste do servidor de desenvolvimento edita uma cópia temporária do conteúdo e verifica o recarregamento.

`tests/fixtures/portfolio-text.txt` registra os textos anteriores à separação para detectar perdas acidentais. Ao alterar deliberadamente a redação do site, atualize também essa referência e as expectativas de conteúdo afetadas. Os nomes dos testes permanecem em inglês.

## Publicação

`bun run build` gera em `dist/` arquivos estáticos com caminhos relativos, que podem ser publicados em qualquer hospedagem estática (GitHub Pages, Netlify, etc.). Nenhuma integração de publicação automática está configurada neste repositório.

## Créditos

- Paleta e fonte utilizadas no [blog LadyDebug](https://kellen-xavier.github.io/ladydebug.github.io/).
- Pixelify Sans distribuída sob SIL Open Font License 1.1; consulte `src/assets/fonts/OFL.txt`.
- Ilustração do computador gerada com IA para este projeto.

## Portfólio de contribuições

A seção **Na prática** apresenta quatro casos a partir dos relatórios fornecidos pela autora (análise de 29/10/2026): mobile, backend de estacionamento, cadastro/identificadores fiscais e Unity. Cada caso identifica trabalho realizado, referências históricas e limites da evidência. A página não publica código privado ou relatórios internos completos.

- `src/content/trabalhos/`: casos e origem documental, com hashes SHA-256 das cópias consultadas. Os hashes identificam documentos e não certificam suas afirmações.
- `src/content/fluxo.ts`: fluxo de trabalho com links para os casos.
- `src/content/projetos.ts`: projetos abertos, incluindo LadyDebug Bot Planner.

A revisão da página não repetiu a coleta Git dos projetos privados nem a execução dos testes descritos. Implementação, configuração, execução documentada e implantação são apresentadas separadamente.
