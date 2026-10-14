import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/i18n/types";
import { Brand } from "@/components/ui/Brand";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { NavbarSurface } from "@/components/ui/NavbarSurface";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Navbar({ site, locale }: { site: SiteContent; locale: Locale }) {
  const links = site.navigation.map((link) => (
    <a key={link.href} href={link.href}>{link.label}</a>
  ));

  return (
    <NavbarSurface>
      <div className="container navbar-inner">
        <Brand site={site} />
        <nav className="desktop-navigation" aria-label={site.ui.menu}>{links}</nav>
        <div className="nw-language-desktop"><LanguageSwitcher locale={locale} labels={site.ui} /></div>
        <WhatsAppButton site={site} className="navbar-cta" variant="secondary" />
        <MobileMenu label={site.ui.menu}>
          <nav aria-label={site.ui.menu}>{links}<WhatsAppButton site={site} /></nav>
          <LanguageSwitcher locale={locale} labels={site.ui} />
        </MobileMenu>
      </div>
    </NavbarSurface>
  );
}
