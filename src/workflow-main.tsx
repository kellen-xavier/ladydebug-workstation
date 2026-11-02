import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WorkflowPage } from "./components/WorkflowPage";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element in workflow.html");

createRoot(root).render(
  <StrictMode>
    <WorkflowPage />
  </StrictMode>,
);
