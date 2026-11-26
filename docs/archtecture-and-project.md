# Um pouco da Arquitetura para Esse Portfólio

## Visual

Curto Layout dos anos 2000–2009 (estou tentando reformular porém esta ainda um protótipo no Figma que compartilho depois), ilustração em pixel art e paleta do [blog Ladydebug](https://ladydebug.com.br/)

## Editar

- **Apresentação e sobre:** `src/content/apresentacao.md` e `src/content/sobre.md`.
- **Retrato no Sobre:** `src/content/retrato.md` contém o espaço reservado. Para mostrar sua foto, coloque o arquivo em `src/assets/` e substitua a linha de texto por `![Kellen Xavier](../assets/kellen-xavier.jpg)`. O texto alternativo e o caminho ficam no Markdown; o build copia a imagem automaticamente.
- **Página Trabalhos:** `src/content/trabalhos.md` guarda a introdução, os rótulos e a nota de leitura.
- **Relatos dos trabalhos:** `src/content/trabalhos/*.md`. Edite `stack`, `period` e `summary` no front matter de cada relato; o restante é Markdown. A ordem e o ID da âncora ficam em `src/content/trabalhos/index.ts`.
- **Texto de apresentação do fluxo:** `src/content/fluxo.md` — aceita parágrafos, ênfase e links Markdown.
- **Relato detalhado do workflow:** `src/content/fluxo-completo.md` — exibido em uma coluna de leitura abaixo dos quadros em `workflow.html`. A apresentação inicial fica em `src/content/fluxo.md`.
- **Etapas do fluxo:** `src/content/fluxo-passos.md` — cada `##` cria um quadro, sem limite fixo, na ordem do arquivo. Use `- subtitulo:` (ou `- titulo:`) para o texto abaixo do tema e `- descricao:` para a explicação. `- icon:` e os textos podem ficar vazios enquanto você edita. Para mostrar um link a Trabalhos, preencha `- caso:` (ID do relato) e `- link:` (rótulo); sem os dois, o link não aparece.
- **Projetos:** `src/content/projetos.md` — uma seção `## Nome do projeto` por cartão (tags separadas por `|`).
- **Página de projetos e estudos:** `src/content/page-projetos-e-estudos.md` — título e introdução da página interna; os cartões continuam em `src/content/projetos.md`.
- **Mapa do site:** `src/content/mapa.md` — conteúdo preservado; a seção está temporariamente fora da home.
- **Trajetória:** `src/content/trajetoria.md` — linha do tempo da página Trajetória.
- **Setup:** `src/content/setup.md`.
- **Ferramentas:** `src/content/ferramentas.md` — lista e comandos de instalação (os exemplos de Git e k6 assumem Linux/Homebrew).
- **Games:** `src/content/games.md` permanece como rascunho. A rota `games.html` mostra apenas a mensagem de `src/content/em-desenvolvimento.md` e está fora do menu.
- **Contato:** `src/content/contato.md` — apresentação e rótulos. O e-mail e os links sociais ficam em `src/content/site.ts`.

---

### Convenções do Markdown

O primeiro título de cada arquivo ocupa o espaço de título da seção; os demais blocos formam o corpo. Para preservar os títulos com várias linhas da apresentação e do sobre, eles usam a sintaxe Setext: uma linha de `===` ou `---` abaixo do título. Dois espaços ao final de uma linha inserem uma quebra de linha.

Nos relatos dos trabalhos, use `#` para o título do caso, `###` para os subtítulos e `>` para destacar os limites da evidência. Um título `##` inicia a área expansível de referências; os blocos seguintes ficam dentro dela. Os relatos aceitam parágrafos, listas, ênfase, código e links Markdown, sem JSX ou HTML no conteúdo.

Os arquivos são importados como texto e renderizados por `react-markdown`. Links externos recebem `target="_blank"` e `rel="noopener noreferrer"`; âncoras internas continuam na mesma página. HTML bruto não é renderizado.

Na apresentação do fluxo, os títulos Markdown são exibidos com um único estilo de subtítulo. O relato completo usa títulos de segundo nível para cada etapa e aceita extensões de Markdown do GitHub por meio de `remark-gfm`.

O plugin em `scripts/markdown-text.ts`, registrado em `bunfig.toml`, preserva a leitura como texto também após editar um `.md` com o servidor aberto. Isso evita que o recarregamento do Bun converta o Markdown em HTML antes de chegar ao componente. No build, os imports usam `with { type: "text" }`.

---


### Imagens no Markdown

Use o caminho da imagem relativo ao arquivo Markdown:

```md
![Diagrama do workflow](../assets/workflow.png)
```

O exemplo funciona em `src/content/fluxo-completo.md`. Em arquivos dentro de `src/content/trabalhos/`, use `../../assets/` para chegar à mesma pasta. Caminhos existentes como `/src/assets/workflow.png` também são aceitos.

O plugin identifica as imagens locais e registra seus arquivos no empacotamento do Bun, preservando o texto alternativo e o título. `scripts/build.ts` aplica o mesmo plugin no build de produção. As URLs geradas são relativas, para funcionar também quando o site é publicado em uma subpasta. Não é necessário cadastrar cada imagem em um componente React. Imagens com URL externa permanecem externas; as imagens renderizadas se ajustam à largura do conteúdo.
