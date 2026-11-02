import { type ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";

/** Mounts a page component in the #root element of its HTML entry. */
export function mount(page: ReactNode) {
  const root = document.getElementById("root");
  if (!root) throw new Error("Missing #root element");
  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}
