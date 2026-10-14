import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { WhatsAppCopy } from "@/i18n/types";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Props = {
  site: WhatsAppCopy;
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

export function WhatsAppButton({
  site,
  label = site.ui.quote,
  message,
  variant = "primary",
  className = "",
}: Props) {
  const href = getWhatsAppLink(message ?? site.contact.whatsappMessage);
  const classes = `button button-${variant} ${className}`;
  const content = (
    <>
      <MessageCircle size={18} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight className="button-arrow" size={17} aria-hidden="true" />
    </>
  );

  if (!href) {
    return (
      <button
        type="button"
        className={classes}
        aria-disabled="true"
        title={site.contact.unavailable}
        aria-label={`${label}. ${site.contact.unavailable}`}
      >
        {content}
      </button>
    );
  }

  return (
    <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
      {content}
      <span className="sr-only"> ({site.ui.newTab})</span>
    </a>
  );
}
