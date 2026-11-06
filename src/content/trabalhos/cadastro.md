# Baeckend: Cadastro de regras fiscais extraídas do legado

Qual é o fluxo? Usuário ao realizar o cadastro via plataforma mobile - ou seja criar nova conta no aplicativo - quando clicar em cadastrar
então deve validar no cadastro se o NIF é válido ou não. Então extraí as validações fiscais de uma regra do backend legado
e criei um módulo de domínio, integrando o serviço aos endpoints e modelos de cadastro de pessoas e empresas.

## O que fiz

- Criei primeiro os testes na aplicação backend para validar se suportava criar o módulo (parte crítica da aplicação) primeiro com as validações por região
específica da Europa, Portugal e Espanha.
- Após os testes passarem, organizei interfaces, catálogo por país (não segregando mais por Portugal e Espanha) e tipo de titular e regras de normalização. 
O catálogo documentado reúne 57 códigos de países e territórios e 114 pares país/titular: 44 registros de checksum e 70 definições de formato preexistentes integradas ao módulo.
- Implementei regras de controle e integrei definições de formato preexistentes, preservando a distinção entre formato, checksum e heurística.
- Desenvolvi testes de domínio, serviço e contrato HTTP em host isolado; mantive o comportamento padrão do endpoint existente.
- Acrescentei cenários de equivalência com exemplos do aplicativo e configuração versionada de execução e publicação de resultados.

> **Alcance da evidência:** Esses registros não são 114 algoritmos originais ou países homologados. A validação local não comprova existência cadastral. O levantamento é estático, com histórico shallow;

[Pesquisa realizada aqui](#link)

## Origem e referências do relatório

Esta ficha é uma síntese do relatório fornecida por mim onde analisei o git (git blame) dos repositório e extrai as devidas informações. . A revisão da página leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git ou execução de testes.
