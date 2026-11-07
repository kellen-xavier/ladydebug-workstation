# Backend: validação de identificadores fiscais no cadastro

## Fluxo do Usuário e Motivações

Quando o usuário (região Europa) realiza um cadastro via App (Android IOS/Web) ela precisa adicionar o NIF (equivalente ao CPF no Brasil) para validar que é uma pessoa com autenticidade da região (mora no local por exemplo).
Ao realizar a validação de NIF era feito somente na região de Portugal.

Motivação: o app estava em espação para demais regiões da Europa, e precisava
espandir.

Problemas encontrados: para cada região da europa existe um tipo de NIF - França, Espanha, Alemanha, entre outros, sem um padrão geral. - para manter a legibilidade de cadastro da aplicação, precisa validar os tipos de cada NIF. 

No fluxo de criação de conta pelo aplicativo, o backend precisava validar o identificador fiscal informado, considerando o país e o tipo de titular: pessoa ou empresa. Meu trabalho foi analisar as regras existentes, extraí-las do legado para um módulo de domínio e integrar essa estrutura aos pontos de cadastro, atualização e consulta.

## Entendimento do problema

Comecei pelo levantamento dos caminhos de validação existentes. As regras estavam concentradas em uma classe estática (um único Functions.cs), com verificações repetidas nos modelos de entrada. O cadastro e a consulta também usavam pontos de decisão diferentes, que podiam produzir respostas distintas para a mesma entrada.

Antes de alterar essa parte da aplicação, precisei entender quais comportamentos deveriam ser preservados e quais diferenças precisavam ficar explícitas nos testes.

### Como desenvolvi

- Criei testes para caracterizar as regras existentes antes da extração, começando por duas regiões: Portugal e Espanha.
- Separei os validadores por país e tipo de titular, com interfaces e um catálogo para selecionar a implementação correspondente.
- Centralizei a decisão em um serviço de validação e organizei a normalização das entradas e a heurística usada quando não havia algoritmo específico.
- Passei a representar o resultado com status, nível de validação e motivo. Isso permite diferenciar formato inválido, dígito de controle incorreto e país sem suporte, além de identificar quando o resultado vem de uma heurística.
- Integrei o serviço ao controlador e aos modelos de criação e atualização de pessoas e empresas. Preservei a restrição de países já aplicada pelo endpoint de consulta e registrei as diferenças deliberadas em relação ao legado.

### Como testei

Usei C#, .NET e NUnit para testar os algoritmos, a seleção dos validadores e os resultados retornados. Cobri entradas vazias, formatos incorretos, dígitos de controle inválidos e identificadores incompatíveis com o tipo de titular.

Também criei testes da integração entre controlador e domínio e testes de comparação com o comportamento anterior. Essa separação ajudou a verificar tanto as regras isoladas quanto os efeitos da substituição nos consumidores existentes.

### Resultado do trabalho

As regras passaram a ter responsabilidades separadas, um serviço central de decisão e testes de regressão para sustentar a migração, ou seja, agora temos um módulo na aplicação "Validador de NIFs". A estrutura permite acrescentar validadores sem continuar ampliando a classe estática do legado.

> **Alcance da validação:** conferir formato ou dígito de controle não comprova a existência de um registro fiscal. A extração descrita aqui cobre Portugal e Espanha; a ampliação para outros países é uma etapa distinta.

## Sobre este relato

Eu elaborei a partir da documentação técnica de desenvolvimento e do inventário de testes fornecidos e criados por mim. Nomes do produto, da organização, dos repositórios e de elementos específicos do negócio foram omitidos. Os documentos internos e o código privado não são publicados nesta página. O intuito é compartilhar o problema e como encontrei uma solução, aplicando ela no backend.

A documentação diferencia o levantamento de validações para outros países da extração das regras existentes para o novo módulo. Este caso descreve essa extração e seus testes; propostas de cobrança e definição de taxas ficam fora do escopo da entrega relatada. Os testes do backend privado não foram executados durante esta revisão do portfólio.
