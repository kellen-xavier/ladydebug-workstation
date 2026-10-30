export function Brand({ label }: { label?: string }) {
  return (
    <a className="brand" href="./" aria-label={label}>
      {site.brand}
    </a>
  );
}

import { site } from "../content/site";
