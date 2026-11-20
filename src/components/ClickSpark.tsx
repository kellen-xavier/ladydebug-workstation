import { type ReactNode, useEffect, useRef } from "react";

type ClickSparkProps = {
  children: ReactNode;
  className?: string;
  sparkColor?: string;
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
};

/** A small, card-sized adaptation of React Bits' ClickSpark line effect. */
export function ClickSpark({
  children,
  className = "",
  sparkColor,
  sparkCount = 8,
  sparkSize = 12,
  sparkRadius = 28,
  duration = 480,
}: ClickSparkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);
  const framesRef = useRef(new Map<HTMLCanvasElement, number>());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const layer = layerRef.current;
      if (!layer) return;

      const rect = root.getBoundingClientRect();
      const target = event.target instanceof Element ? event.target : root;
      const targetRect = target.getBoundingClientRect();
      const clientX = event.detail === 0 ? targetRect.left + targetRect.width / 2 : event.clientX;
      const clientY = event.detail === 0 ? targetRect.top + targetRect.height / 2 : event.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(rect.width * ratio);
      canvas.height = Math.ceil(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.setAttribute("aria-hidden", "true");
      layer.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        canvas.remove();
        return;
      }
      ctx.scale(ratio, ratio);
      const color = sparkColor ?? getComputedStyle(root).getPropertyValue("--accent").trim();
      const count = Math.max(1, Math.min(64, Math.round(sparkCount)));
      const angles = Array.from(
        { length: count },
        (_, index) => (index * 2 * Math.PI) / count + (Math.random() - 0.5) * 0.15,
      );
      const start = performance.now();

      const draw = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        ctx.clearRect(0, 0, rect.width, rect.height);
        if (progress >= 1) {
          canvas.remove();
          framesRef.current.delete(canvas);
          return;
        }

        const distance = sparkRadius * (1 - (1 - progress) ** 3);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.globalAlpha = 1 - progress;
        for (const angle of angles) {
          const dx = Math.cos(angle);
          const dy = Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(x + dx * distance, y + dy * distance);
          ctx.lineTo(
            x + dx * (distance + sparkSize * (1 - progress)),
            y + dy * (distance + sparkSize * (1 - progress)),
          );
          ctx.stroke();
        }
        framesRef.current.set(canvas, requestAnimationFrame(draw));
      };

      framesRef.current.set(canvas, requestAnimationFrame(draw));
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
      for (const [canvas, frame] of framesRef.current) {
        cancelAnimationFrame(frame);
        canvas.remove();
      }
      framesRef.current.clear();
    };
  }, [duration, sparkColor, sparkCount, sparkRadius, sparkSize]);

  return (
    <article className={`click-spark ${className}`} ref={rootRef}>
      {children}
      <span className="click-spark-layer" ref={layerRef} aria-hidden="true" />
    </article>
  );
}
