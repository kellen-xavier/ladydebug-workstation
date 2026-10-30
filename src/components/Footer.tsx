export function Footer() {
  return (
    <footer>
      <a className="brand" href="#main">
        ladydebug
      </a>
      <span>© {new Date().getFullYear()} Kellen Xavier</span>
      <span>
        <a
          className=""
          href="https://github.com/kellen-xavier"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>{" "}
        ·{" "}
        <a
          className=""
          href="https://www.linkedin.com/in/kellen-xavier/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </span>
      <ul className="web-badges" aria-label="Interesses">
        <li>
          CODE &<br />
          TESTS
        </li>
        <li>
          PIXELS &<br />
          PULL REQUESTS
        </li>
        <li>
          KEEP THE
          <br />
          WEB PERSONAL
        </li>
      </ul>
    </footer>
  );
}
