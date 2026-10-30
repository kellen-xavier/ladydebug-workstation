import pixelDesk from "../assets/pixel-desk.png";

export function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">★ Kellen Xavier — LadyDebug ★</p>
        <h1>
          Meu trabalho,
          <br />
          <em>por dentro.</em>
        </h1>
        <p className="intro">
          <strong>Engenharia de Software & Qualidade.</strong>
          <br />
          Desenvolvo, escrevo testes, investigo comportamentos e documento o que encontro. Este é
          meu espaço para apresentar contribuições, decisões e os registros que ajudam a conferir o
          trabalho.
        </p>
        <div className="actions">
          <a className="button" href="#pratica">
            Explorar a prática ↓
          </a>
          <a
            className="text-link"
            href="https://github.com/kellen-xavier"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meu GitHub ↗
          </a>
        </div>
      </div>
      <figure className="pixel-scene">
        <img
          src={pixelDesk}
          width="1536"
          height="1024"
          alt="Estação de trabalho retrô em pixel art, com computador e caneca rosa"
        />
        <figcaption>code · test · document · repeat</figcaption>
      </figure>
    </section>
  );
}
