# UI/UX Site

A home está carregando localmente; conferi a primeira dobra em 1440 px e 390 px, além da navegação e do texto acessível. A hierarquia visual e os contrastes parecem fortes; os principais pontos de revisão estão na prioridade do CTA, na repetição do texto entre Hero e Sobre e em alguns rótulos do mapa.

## Revisão de UI/UX

A página inicial tem uma identidade visual consistente com a estética de workstation retrô. O título, a ilustração e a chamada profissional deixam claro quem é a autora e qual é sua área. Em desktop, a composição tem boa hierarquia; em mobile, o conteúdo se reorganiza sem sobreposição nem rolagem horizontal.

Prioridade alta — tornar o CTA principal mais direto. “Explorar o mapa” leva a uma seção com vários caminhos, embora visitantes profissionais possam querer ver primeiro contribuições ou trajetória. Considere trocar o botão por “Ver contribuições”, com link para a página de prática, e manter o mapa como navegação secundária.

Prioridade média — reduzir a extensão do mapa no celular. Os nove cartões funcionam como um elemento de identidade, mas ocupam bastante espaço e repetem destinos que já aparecem no menu. Considere dar destaque a “Na prática”, “Trajetória”, “Workflow” e “CV”, mantendo os demais destinos acessíveis.

Acessibilidade: nos estilos revisados, os contrastes de texto medidos superam o mínimo AA para texto normal. Os controles têm alvos de pelo menos 44 px, há indicação visível de foco e a ilustração tem texto alternativo descritivo. Não identifiquei um problema de acessibilidade prioritário nesta revisão.

## Revisão da escrita da home

O principal ajuste recomendado é evitar repetir no Hero informações que aparecem logo em “Sobre”. O título já apresenta Kellen, e o parágrafo do Hero repete nome, trajetória e escopo profissional. Uma versão mais enxuta poderia ser:

> Atuo com desenvolvimento, integrações, testes e documentação técnica.

Deixe a seção “Sobre” explicar a trajetória, incluindo a experiência em suporte, a atuação formal em QA desde 2021 e a ampliação para desenvolvimento e integração. Isso ajuda cada bloco a cumprir uma função diferente.

Outros ajustes pontuais:

- Em projetos.md (src/content/projetos.md), corrigir “Projetos pessois” para “Projetos pessoais”.
- Em site.ts (src/content/site.ts), traduzir “Download CV in English” para “Baixar CV em inglês”, mantendo o idioma da interface consistente.
- Em mapa.md (src/content/mapa.md), simplificar o texto de apresentação para “Escolha uma seção para conhecer meu trabalho.”
- No mesmo arquivo, trocar “Quais minhas ferramentas de trabalho no uso diário?” por “Quais ferramentas uso no dia a dia?” e corrigir “As vezes” para “Às vezes”. “Isso” em “Eu jogo e estudo isso?” também pode ficar mais específico, como “O que estudo sobre jogos?”
- O cartão do CV diz “é só clicar aqui”, embora leve a outra seção antes do download. Um rótulo como “Onde baixo meu CV?” descreve melhor o destino.

A expressão “Software & Quality Engineering” no cartão de formação mistura inglês com o restante da interface em português. Pode ser localizada como “Engenharia de Software e Qualidade” para maior consistência.
