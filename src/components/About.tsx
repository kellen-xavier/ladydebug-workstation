export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div>
        <p className="eyebrow">readme.txt / About me</p>
        <h2 id="about-title">
          A quality mindset.
          <br />
          An engineer's curiosity.
        </h2>
      </div>
      <div className="about-text">
        <p>
          My path has taken me from support and front-end work to software testing. Today, I bring
          those perspectives together through{" "}
          <strong>development, manual and automated testing, and technical documentation.</strong>
        </p>
        <p>
          These repositories are where I explore tools, organize what I learn, and make practical
          knowledge available to others.
        </p>
        <div className="education">
          Systems Analysis &amp; Development · UNINTER
          <br />
          Postgraduate studies in Software Engineering · Unisinos
        </div>
      </div>
    </section>
  );
}
