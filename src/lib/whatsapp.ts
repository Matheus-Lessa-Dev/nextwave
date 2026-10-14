/** Official commercial contact, shared by every quote CTA. */
export const WHATSAPP_NUMBER = "5544997341655";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
