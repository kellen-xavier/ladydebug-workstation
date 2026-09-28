export function Brand({ label }: { label?: string }) {
  return (
    <a className="brand" href="#" aria-label={label}>
      <span>&lt;</span>ladydebug<span>/&gt;</span>
    </a>
  );
}
