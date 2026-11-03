import { useEffect, useRef, useState } from "react";

export function CopyButton({
  text,
  label,
  copyLabel,
  copiedLabel,
}: {
  text: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
}) {
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
      aria-label={`${copyLabel}: ${label}`}
    >
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
