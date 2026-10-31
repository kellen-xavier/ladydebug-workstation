export function Topics() {
  return (
    <ul className="topics">
      {topics.map((topic) => (
        <li key={topic}>{topic}</li>
      ))}
    </ul>
  );
}

import { topics } from "../content/site";
