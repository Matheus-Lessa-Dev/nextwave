import { ArrowUp } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Brand } from "@/components/ui/Brand";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div><Brand site={site} /><p>{site.footer.description}</p><WhatsAppButton site={site} variant="text" className="mt-3" /></div>
          <nav aria-label={site.ui.menu}>
            {site.navigation.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <a className="back-to-top" href="#inicio" aria-label={site.ui.backToTop}>
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {site.footer.copyright}</p>
          <p>{site.footer.signature}</p>
        </div>
      </div>
    </footer>
  );
}
