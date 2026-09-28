import { topics } from "../data/site";

export function Topics() {
  return (
    <div className="topics" aria-label="Areas of focus">
      {topics.map(topic => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  );
}
