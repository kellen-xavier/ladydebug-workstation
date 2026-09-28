import { Brand } from "./Brand";

const badges = [
  ["HANDCODED", "WITH CARE"],
  ["PIXELS &", "PULL REQUESTS"],
  ["KEEP THE", "WEB PERSONAL"],
];

export function Footer() {
  return (
    <footer>
      <Brand />
      <span className="copyright">© {new Date().getFullYear()} Kellen Xavier</span>
      <span>Built with intent. Shared with curiosity.</span>
      <ul className="web-badges" aria-label="Interests">
        {badges.map(([first, second]) => (
          <li key={first}>
            {first}
            <br />
            {second}
          </li>
        ))}
      </ul>
    </footer>
  );
}
