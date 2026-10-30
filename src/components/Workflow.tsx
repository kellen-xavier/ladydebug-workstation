export function Workflow() {
  return (
    <section className="practice" id="fluxo">
      <div className="section-head">
        <div>
          <p className="eyebrow">03 / COMO TRABALHO</p>
          <h2>
            Entender. Construir.
            <br />
            <em>Aprender. Evoluir.</em>
          </h2>
        </div>
        <p className="flow-intro">
          Qualidade faz parte do desenvolvimento: os testes acompanham a implementação, e o que
          aprendemos orienta a próxima entrega.
        </p>
      </div>
      <ol className="workflow">
        <li>
          <span className="step-icon" aria-hidden="true">
            ⌕
          </span>
          <h3>Entender o contexto</h3>
          <p>
            Regras de negócio, integrações, riscos e critérios de aceite tornam o problema concreto.
          </p>
          <a className="flow-ref" href="#mobile">
            Requisitos e lacunas no mobile →
          </a>
        </li>
        <li>
          <span className="step-icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <h3>Construir e testar</h3>
          <p>Implementação e testes avançam juntos, em mudanças pequenas e revisáveis.</p>
          <a className="flow-ref" href="#cadastro">
            Regras e testes no cadastro →
          </a>
        </li>
        <li>
          <span className="step-icon" aria-hidden="true">
            [✓]
          </span>
          <h3>Revisar e evidenciar</h3>
          <p>Código, verificações e documentação apoiam a revisão e a decisão de entrega.</p>
          <a className="flow-ref" href="#backend">
            Contratos e documentação no backend →
          </a>
        </li>
        <li>
          <span className="step-icon" aria-hidden="true">
            ↻
          </span>
          <h3>Acompanhar e evoluir</h3>
          <p>Feedback e comportamento observado ajudam a ajustar o próximo incremento.</p>
          <a className="flow-ref" href="#unity">
            Evolução dos cenários em Unity →
          </a>
        </li>
      </ol>
      <p className="cycle">
        <span aria-hidden="true">↻</span>
        <strong>Um ciclo de colaboração e melhoria contínua.</strong>
        <a href="#fluxo">Voltar ao contexto ↑</a>
      </p>
    </section>
  );
}
