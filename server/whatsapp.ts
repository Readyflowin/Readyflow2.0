import type { LeadInput } from "./leadTypes.js";

export function buildLeadWhatsAppMessage(lead: LeadInput): string {
  return `Hi Readyflow, I filled the form for ${lead.instagram || "my brand"}. Please review my brand and share the Shopify launch plan details.`;
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  lead: LeadInput,
): string {
  const number = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(buildLeadWhatsAppMessage(lead))}`;
}
