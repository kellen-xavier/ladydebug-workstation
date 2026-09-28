# LadyDebug Workstation

Landing page pessoal de Kellen Xavier (LadyDebug), com projetos de engenharia de software, qualidade, automação de testes e documentação.

## Visual

Estética de homepage dos anos 2000–2009, ilustração em pixel art e paleta do blog LadyDebug: creme, bege, marrom e rosa. Layout responsivo, navegação por teclado e fonte hospedada localmente.

## Estrutura

- `dist/index.html`: página e estilos CSS.
- `dist/pixel-desk.png`: ilustração em pixel art.
- `dist/pixelify.woff2`: fonte Pixelify Sans.
- `dist/OFL.txt`: licença da fonte.

## Executar localmente

Requer Python 3. Na raiz do repositório:

```sh
python3 -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Não há instalação de dependências nem etapa de build.

## Editar

Edite `dist/index.html` para alterar textos, links ou estilos. Os arquivos em `dist/` são o site completo e devem permanecer juntos.

## Créditos

- Paleta e fonte utilizadas no [blog LadyDebug](https://kellen-xavier.github.io/ladydebug.github.io/).
- Pixelify Sans distribuída sob SIL Open Font License 1.1; consulte `dist/OFL.txt`.
- Ilustração do computador gerada com IA para este projeto.

## Publicação

Este repositório contém o código da versão retrô. Nenhuma integração de publicação automática está configurada neste repositório.
