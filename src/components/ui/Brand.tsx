import Image from "next/image";
import type { SiteContent } from "@/i18n/types";

export function Brand({ site }: { site: Pick<SiteContent, "brand" | "ui"> }) {
  return (
    <a className="brand" href="#inicio" aria-label={site.ui.home}>
      <Image src="/logo.svg" alt="" width={42} height={42} className="brand-logo" />
      <span>
        {site.brand.prefix}<span className="text-accent">{site.brand.suffix}</span>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}
