# Cadastro: regras fiscais extraídas do legado

Extraí validações fiscais do legado para um módulo de domínio e integrei o serviço aos endpoints e modelos de cadastro de pessoas e empresas.

### O que fiz

- Organizei interfaces, catálogo por país e tipo de titular e regras de normalização.
- Implementei regras de controle e integrei definições de formato preexistentes, preservando a distinção entre formato, checksum e heurística.
- Desenvolvi testes de domínio, serviço e contrato HTTP em host isolado; mantive o comportamento padrão do endpoint existente.
- Acrescentei cenários de equivalência com exemplos do aplicativo e configuração versionada de execução e publicação de resultados.

### Referências para conferência

Referências do relatório: b607c1c (extração inicial), c51813a (avaliação detalhada), c9a0347 e 3de14ce (consolidação). O catálogo reúne 114 pares país/titular: 44 registros de checksum e 70 definições de formato.

> **Alcance da evidência:** Esses registros não são 114 algoritmos originais ou países homologados. A validação local não comprova existência cadastral. O levantamento é estático, com histórico shallow; não confirma deploy nem ativação remota do pipeline.

## Origem e referências do relatório

Esta ficha é uma síntese do relatório fornecida por mim onde analisei o git (git blame) dos repositório e extrai as devidas informações. . A revisão da página leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git ou execução de testes.

**Documento:** relatorio-contribuicoes-projeto-customer-sheet(1).md

**Localizadores:** §§ 1–7, 10–14, Resultados e anexos C–E

SHA-256 do anexo lido:  
`6533eda14db2c56a44b672187a7cfce417f669cfea1338c00e07f6eac71acaed`

O hash identifica a cópia consultada; não valida por si só a autoria ou o conteúdo. As referências de commits permitem conferência por quem tem acesso ao repositório original. Esta ficha não disponibiliza o código nem os relatórios internos completos.

Fonte: relatório de análise de 29/10/2026. Síntese para o portfólio: 30/10/2026.
