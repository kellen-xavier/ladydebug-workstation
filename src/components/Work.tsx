export function Work() {
  return (
    <section className="practice" id="pratica">
      <div className="section-head">
        <div>
          <p className="eyebrow">worklog / contribuições</p>
          <h2>O que faço, na prática.</h2>
        </div>
        <span className="badge">IMPLEMENTAÇÃO · EVIDÊNCIA · LIMITES</span>
      </div>
      <p className="section-copy">
        Os exemplos abaixo vêm de relatórios de contribuições com referências a código, histórico
        Git e registros de execução. Cada caso explicita o que foi feito e até onde a evidência
        permite afirmar.
      </p>
      <details className="case" id="mobile">
        <summary>
          Mobile: implementação, testes e verificação de estado
          <span className="case-label">React Native · TypeScript · Detox · Jest</span>
        </summary>
        <div className="case-body">
          <p>
            Desenvolvi e corrigi fluxos em uma aplicação mobile de mobilidade e pagamentos, junto
            com a infraestrutura e os cenários de teste.
          </p>
          <h3>O que fiz</h3>
          <ul>
            <li>
              Implantei Detox com Jest, helpers, seletores de teste, fixtures e coleta de vídeos,
              capturas e resultados.
            </li>
            <li>
              Implementei e ajustei cadastro, localização, duração, consulta de multas e tratamento
              de respostas de negócio.
            </li>
            <li>
              Construí verificações que comparam interface, estado anterior e posterior retornado
              pela API e débito nos cenários contemplados.
            </li>
            <li>
              Mapeei requisitos e lacunas de cobertura; configurei verificações antes do commit e
              automação de changelog e releases.
            </li>
          </ul>
          <h3>Referências para conferência</h3>
          <p className="trace">
            O relatório registra execução bem-sucedida de login e continuidade de sessão em Android
            físico. A matriz distingue cenários implementados de estruturas pendentes e execuções
            bloqueadas.
          </p>
          <p className="case-limit">
            <strong>Alcance da evidência:</strong> O relatório não apresenta homologação de todos os
            fluxos de pagamento, execução em iOS, publicação em lojas ou ativação integral dos
            pipelines. Não fornece hashes individuais para os exemplos resumidos aqui.
          </p>
          <details className="provenance">
            <summary>Origem e referências do relatório</summary>
            <p>
              Esta ficha é uma síntese do relatório fornecido por Kellen Xavier. A revisão da página
              leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git
              ou execução de testes.
            </p>
            <p>
              <strong>Documento:</strong> relatorio-contribuicoes-mobile(2).md
            </p>
            <p>
              <strong>Localizadores:</strong> §§ 1–2, 5, 7–12 e Resultados e limites de comprovação
            </p>
            <p className="meta">
              SHA-256 do anexo lido:
              <br />
              6e84f4c7895f46d3b3f778f2367e3b0192cac345edb6b48625d844b47d292efd
            </p>
            <p>
              O hash identifica a cópia consultada; não valida por si só a autoria ou o conteúdo. As
              referências de commits permitem conferência por quem tem acesso ao repositório
              original. Esta ficha não disponibiliza o código nem os relatórios internos completos.
            </p>
            <p>Fonte: relatório de análise de 29/10/2026. Síntese para o portfólio: 30/10/2026.</p>
          </details>
        </div>
      </details>
      <details className="case" id="backend">
        <summary>
          Backend: regras transacionais e contratos HTTP
          <span className="case-label">C# · .NET 10 · xUnit · Moq</span>
        </summary>
        <div className="case-body">
          <p>
            Criei testes e documentação para um backend de estacionamento. A contribuição
            identificada está nos testes das regras existentes e na explicação técnica do sistema.
          </p>
          <h3>O que fiz</h3>
          <ul>
            <li>
              Estruturei um projeto de testes com mocks estritos, fakes em memória e serviços reais
              sob teste.
            </li>
            <li>
              Escrevi cenários de consulta e renovação, associação de preços, taxa de uso, imposto,
              isenção e arredondamento.
            </li>
            <li>
              Capturei requisições HTTP simuladas para verificar método, JSON, datas, tokens e
              identificadores.
            </li>
            <li>Documentei arquitetura, modelo de dados, fluxos tarifários e integrações.</li>
          </ul>
          <h3>Referências para conferência</h3>
          <p className="trace">
            Referências do relatório: cd2def8 (base e oito métodos), 3d40620 (seis métodos), 812b437
            (cenário adicional de extensão). Total atribuído: 15 métodos introduzidos, sem somar
            reorganizações novamente.
          </p>
          <p className="case-limit">
            <strong>Alcance da evidência:</strong> Análise estática e documental: não foram
            reexecutados testes nem verificados resultados de CI. HTTP simulado não equivale a
            integração real com fornecedor. A documentação não atribui autoria das funcionalidades
            descritas.
          </p>
          <details className="provenance">
            <summary>Origem e referências do relatório</summary>
            <p>
              Esta ficha é uma síntese do relatório fornecido por Kellen Xavier. A revisão da página
              leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git
              ou execução de testes.
            </p>
            <p>
              <strong>Documento:</strong> relatorio-contribuicoes-projeto-backend(1).md
            </p>
            <p>
              <strong>Localizadores:</strong> §§ 1–5, 9–11, Resultados e anexos B–D
            </p>
            <p className="meta">
              SHA-256 do anexo lido:
              <br />
              58f82f5f2ac87f63fa123e1c90a1c539ac9a2ccb26acbf32659ef4377171674a
            </p>
            <p>
              O hash identifica a cópia consultada; não valida por si só a autoria ou o conteúdo. As
              referências de commits permitem conferência por quem tem acesso ao repositório
              original. Esta ficha não disponibiliza o código nem os relatórios internos completos.
            </p>
            <p>Fonte: relatório de análise de 29/10/2026. Síntese para o portfólio: 30/10/2026.</p>
          </details>
        </div>
      </details>
      <details className="case" id="cadastro">
        <summary>
          Cadastro: regras fiscais extraídas do legado
          <span className="case-label">C# · .NET · NUnit · Contratos HTTP</span>
        </summary>
        <div className="case-body">
          <p>
            Extraí validações fiscais do legado para um módulo de domínio e integrei o serviço aos
            endpoints e modelos de cadastro de pessoas e empresas.
          </p>
          <h3>O que fiz</h3>
          <ul>
            <li>
              Organizei interfaces, catálogo por país e tipo de titular e regras de normalização.
            </li>
            <li>
              Implementei regras de controle e integrei definições de formato preexistentes,
              preservando a distinção entre formato, checksum e heurística.
            </li>
            <li>
              Desenvolvi testes de domínio, serviço e contrato HTTP em host isolado; mantive o
              comportamento padrão do endpoint existente.
            </li>
            <li>
              Acrescentei cenários de equivalência com exemplos do aplicativo e configuração
              versionada de execução e publicação de resultados.
            </li>
          </ul>
          <h3>Referências para conferência</h3>
          <p className="trace">
            Referências do relatório: b607c1c (extração inicial), c51813a (avaliação detalhada),
            c9a0347 e 3de14ce (consolidação). O catálogo reúne 114 pares país/titular: 44 registros
            de checksum e 70 definições de formato.
          </p>
          <p className="case-limit">
            <strong>Alcance da evidência:</strong> Esses registros não são 114 algoritmos originais
            ou países homologados. A validação local não comprova existência cadastral. O
            levantamento é estático, com histórico shallow; não confirma deploy nem ativação remota
            do pipeline.
          </p>
          <details className="provenance">
            <summary>Origem e referências do relatório</summary>
            <p>
              Esta ficha é uma síntese do relatório fornecido por Kellen Xavier. A revisão da página
              leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git
              ou execução de testes.
            </p>
            <p>
              <strong>Documento:</strong> relatorio-contribuicoes-projeto-customer-sheet(1).md
            </p>
            <p>
              <strong>Localizadores:</strong> §§ 1–7, 10–14, Resultados e anexos C–E
            </p>
            <p className="meta">
              SHA-256 do anexo lido:
              <br />
              6533eda14db2c56a44b672187a7cfce417f669cfea1338c00e07f6eac71acaed
            </p>
            <p>
              O hash identifica a cópia consultada; não valida por si só a autoria ou o conteúdo. As
              referências de commits permitem conferência por quem tem acesso ao repositório
              original. Esta ficha não disponibiliza o código nem os relatórios internos completos.
            </p>
            <p>Fonte: relatório de análise de 29/10/2026. Síntese para o portfólio: 30/10/2026.</p>
          </details>
        </div>
      </details>
      <details className="case" id="unity">
        <summary>
          Unity: jornadas de simulação automatizadas
          <span className="case-label">C# · Unity Test Framework · NUnit · Zenject</span>
        </summary>
        <div className="case-body">
          <p>
            Criei e mantive testes de aceitação de um simulador educacional em Unity, reproduzindo
            jornadas do aluno e decisões alternativas.
          </p>
          <h3>O que fiz</h3>
          <ul>
            <li>
              Automatizei sequências de interação com interfaces, seleção de procedimentos e
              acompanhamento de timelines.
            </li>
            <li>
              Ampliei fluxos principais, negativos e alternativos, com verificações explícitas de
              orientações e mensagens em alguns cenários.
            </li>
            <li>
              Reorganizei testes e evoluí sua nomenclatura para distinguir a intenção dos fluxos.
            </li>
            <li>
              Os registros também relacionam contribuições à documentação e à configuração de
              conteúdo de simulação.
            </li>
          </ul>
          <h3>Referências para conferência</h3>
          <p className="trace">
            Exemplos com objeto de autoria identificado no relatório: 001cde8262 (nomenclatura),
            3963165353 (organização), 5dacd00bd4 e 9cc2e28a5d (expansão de fluxos). Os registros
            encontrados abrangem setembro de 2023 a março de 2024.
          </p>
          <p className="case-limit">
            <strong>Alcance da evidência:</strong> Histórico Git incompleto; parte das evidências
            depende de reflog. Não houve execução Unity na análise, nem relatório de aprovação ou
            cobertura. Os testes acionam componentes da cena; não comprovam entrada física ou
            execução em dispositivos. A autoria de toda a suíte não é atribuída a mim.
          </p>
          <details className="provenance">
            <summary>Origem e referências do relatório</summary>
            <p>
              Esta ficha é uma síntese do relatório fornecido por Kellen Xavier. A revisão da página
              leu esse documento; não teve acesso ao checkout privado nem repetiu sua coleta de Git
              ou execução de testes.
            </p>
            <p>
              <strong>Documento:</strong> report-testing-unity-simulador(2).md
            </p>
            <p>
              <strong>Localizadores:</strong> Trabalhos identificados; Estratégia de automação;
              Execução, cobertura e integração contínua; Histórico de commits
            </p>
            <p className="meta">
              SHA-256 do anexo lido:
              <br />
              d46819db8ee2d7b5baf0a75d938ee965426a4591c7797950f5bfe1520e7f3d23
            </p>
            <p>
              O hash identifica a cópia consultada; não valida por si só a autoria ou o conteúdo. As
              referências de commits permitem conferência por quem tem acesso ao repositório
              original. Esta ficha não disponibiliza o código nem os relatórios internos completos.
            </p>
            <p>Fonte: relatório de análise de 29/10/2026. Síntese para o portfólio: 30/10/2026.</p>
          </details>
        </div>
      </details>
      <p className="method">
        <strong>Como ler:</strong> os casos profissionais são sínteses dos relatórios fornecidos,
        não uma auditoria independente dos repositórios privados. As fichas identificam a fonte e os
        localizadores para conferência com acesso ao original. Os projetos abertos, abaixo, podem
        ser inspecionados diretamente no GitHub.
      </p>
    </section>
  );
}
