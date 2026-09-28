import { topics } from "../data/site";

export function Topics() {
  return (
    <ul className="topics" aria-label="Areas of focus">
      {topics.map((topic) => (
        <li key={topic}>{topic}</li>
      ))}
    </ul>
  );
}
