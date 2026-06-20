import type { LeadInput } from "./leadTypes.js";

export function buildLeadWhatsAppMessage(lead: LeadInput): string {
  return [
    "Hi Readyflow, I filled the Shopify Launch form.",
    "",
    `Name: ${lead.name}`,
    `Brand Instagram: ${lead.instagram}`,
    `What I sell: ${lead.productType}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    "",
    "Please share the next steps for the ₹11,999 Instagram Brand Shopify Launch.",
  ].join("\n");
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  lead: LeadInput,
): string {
  const number = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(buildLeadWhatsAppMessage(lead))}`;
}
