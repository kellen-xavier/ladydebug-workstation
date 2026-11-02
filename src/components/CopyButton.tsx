import { useEffect, useRef, useState } from "react";
import { toolsPage } from "../content/ferramentas";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="copy-button"
      onClick={copy}
      aria-label={`${toolsPage.copyLabel}: ${label}`}
    >
      <span aria-live="polite">{copied ? toolsPage.copiedLabel : toolsPage.copyLabel}</span>
    </button>
  );
}
