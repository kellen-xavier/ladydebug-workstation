# Web: integração, sessão e comportamento assíncrono

Contribuí para uma área de cliente existente em Vue.js e JavaScript, implementando funcionalidades e corrigindo comportamentos de integração com APIs, com testes de serviços, componentes e contratos.

## Problema e decisões técnicas

As mudanças trataram validação fiscal nos cadastros, requisições simultâneas diante de sessão expirada e respostas que poderiam chegar depois de uma alteração da seleção do usuário. Extraí a coordenação desses comportamentos dos componentes para módulos compartilhados e testáveis.

### O que fiz

- Implementei validação fiscal compartilhada entre cadastros, reaproveitando consultas pendentes, descartando respostas obsoletas e impedindo submissões concorrentes.
- Criei um coordenador de renovação de sessão, com atualização das credenciais, repetição controlada de chamadas e tratamento de falhas de autenticação.
- Coordenei consultas do dashboard e carregamento de idiomas, com deduplicação, verificação da seleção atual e mensagens locais de contingência.
- Corrigi contratos e fluxos de estacionamento para conferir o resultado de negócio antes de apresentar sucesso; ampliei consulta de multas, notificações e correlação com movimentos financeiros.
- Criei testes com Node.js Test Runner e cenários de cadastro com Playwright, acompanhados de fixtures, helpers e documentação.
