import { Sparkles } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA({ site }: { site: SiteContent }) {
  const content = site.contactCta;

  return (
    <section id="contato" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <div className="contact-panel">
            <div className="contact-orbit" aria-hidden="true" />
            <Sparkles className="contact-spark" size={28} strokeWidth={1.3} aria-hidden="true" />
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="contact-title">{content.title}<br /><span className="text-accent">{content.highlight}</span></h2>
            <p className="contact-description">{content.description}</p>
            <WhatsAppButton site={site} label={site.ui.quoteWhatsApp} />
            <p className="contact-note">
              {getWhatsAppLink(site.contact.whatsappMessage) ? content.note : site.contact.unavailable}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
