export function PageHead({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  className?: string;
}) {
  return (
    <div className={className ? `page-head ${className}` : "page-head"}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="section-intro">{intro}</p>
    </div>
  );
}
