import {
  createReadyflowEmailLayout,
  detailRow,
  emailBox,
  emailBulletList,
  emailParagraph,
  htmlToText,
} from "./emailLayout.js";
import { optionalServerEnv, requireServerEnv } from "./env.js";
import type { StoredLead } from "./leadTypes.js";

type ResendResponse = {
  id?: string;
  message?: string;
  name?: string;
};

function textDisplay(value: string): string {
  return value || "-";
}

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

async function sendResendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const apiKey = requireServerEnv("RESEND_API_KEY");
  const from = requireServerEnv("RESEND_FROM_EMAIL");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text || htmlToText(input.html),
      reply_to: optionalServerEnv("REPLY_TO_EMAIL") || undefined,
    }),
  });

  const result = (await response.json()) as ResendResponse;
  if (!response.ok || !result.id) {
    throw new Error(
      `Resend request failed (${response.status}): ${result.message || result.name || "Unknown error"}`,
    );
  }
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  await sendResendEmail(input);
}

export async function sendAdminLeadNotification(lead: StoredLead) {
  const adminEmail = requireServerEnv("ADMIN_NOTIFY_EMAIL");
  const siteUrl = normalizeSiteUrl(requireServerEnv("SITE_URL"));
  const adminSlug = requireServerEnv("ADMIN_SECRET_SLUG").replace(
    /^\/+|\/+$/g,
    "",
  );
  const dashboardUrl = `${siteUrl}/${adminSlug}`;

  await sendResendEmail({
    to: adminEmail,
    subject: `New Readyflow Lead - ${lead.instagram}`,
    html: buildAdminEmail(lead, dashboardUrl, siteUrl),
    text: buildAdminText(lead, dashboardUrl),
  });
}

export function buildAdminEmail(
  lead: StoredLead,
  dashboardUrl: string,
  siteUrl: string,
): string {
  const bodyHtml = `
    ${emailBox(
      "Lead summary",
      `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #edf0ed;border-radius:14px;overflow:hidden">
        ${detailRow("Name", lead.name)}
        ${detailRow("Brand Instagram", lead.instagram)}
        ${detailRow("Product type", lead.productType)}
        ${detailRow("Photos ready", lead.photosReady)}
        ${detailRow("Shopify/domain separate answer", lead.shopifyCostOkay)}
        ${detailRow("WhatsApp", lead.whatsapp)}
        ${detailRow("Email", lead.email)}
        ${detailRow("Requirement", lead.requirement)}
        ${detailRow("Source", lead.source)}
        ${detailRow("UTM campaign", lead.utm_campaign)}
        ${detailRow("Timestamp", lead.timestamp)}
      </table>`,
    )}
    ${emailBox(
      "Suggested admin action",
      `<p style="margin:0;color:#374151;font-size:15px;line-height:1.68">Reply fast on WhatsApp while intent is warm. Check if products/photos are ready and whether they understand Shopify/domain costs are separate.</p>`,
    )}
  `;

  return createReadyflowEmailLayout({
    previewText: `New Readyflow lead from ${lead.instagram || lead.name || "website"}.`,
    eyebrow: "Readyflow lead notification",
    title: "New Readyflow lead",
    bodyHtml,
    ctaLabel: "Open Dashboard",
    ctaUrl: dashboardUrl,
    footerNote: "Private admin notification for Readyflow lead follow-up.",
    logoUrl: `${siteUrl}/icon.png`,
  });
}

function buildAdminText(lead: StoredLead, dashboardUrl: string): string {
  return [
    "New Readyflow Lead",
    "",
    `Name: ${textDisplay(lead.name)}`,
    `Brand Instagram: ${textDisplay(lead.instagram)}`,
    `Product type: ${textDisplay(lead.productType)}`,
    `Photos ready: ${textDisplay(lead.photosReady)}`,
    `Shopify/domain separate answer: ${textDisplay(lead.shopifyCostOkay)}`,
    `WhatsApp: ${textDisplay(lead.whatsapp)}`,
    `Email: ${textDisplay(lead.email)}`,
    `Requirement: ${textDisplay(lead.requirement)}`,
    `Source: ${textDisplay(lead.source)}`,
    `UTM campaign: ${textDisplay(lead.utm_campaign)}`,
    `Timestamp: ${textDisplay(lead.timestamp)}`,
    "",
    "Suggested admin action: Reply fast on WhatsApp while intent is warm. Check if products/photos are ready and whether they understand Shopify/domain costs are separate.",
    "",
    `Open Dashboard: ${dashboardUrl}`,
  ].join("\n");
}

export function buildLeadEmail(
  lead: StoredLead,
  whatsappUrl: string,
  siteUrl: string,
): string {
  const bodyHtml = `
    ${emailParagraph(`Hey ${lead.name || "there"},`)}
    ${emailParagraph(
      `Thanks for filling the Readyflow Shopify Launch form for ${lead.instagram || "your brand"}. I've received your details.`,
    )}
    ${emailBox(
      "Rs. 11,999 Shopify Launch Setup",
      emailBulletList([
        "Mobile-first Shopify store setup",
        "Homepage, collections and up to 10 products",
        "Product page, size chart and policy pages",
        "WhatsApp/contact flow and checkout setup guidance",
        "3-5 day build after content/access is ready",
      ]),
    )}
    ${emailBox(
      "Quick clarity",
      `<p style="margin:0;color:#374151;font-size:15px;line-height:1.68">The &#8377;11,999 fee covers Readyflow's setup work. Shopify subscription, domain, paid apps, product photos and ad management are arranged separately.</p>`,
    )}
    ${emailBox(
      "Next step",
      `<p style="margin:0;color:#374151;font-size:15px;line-height:1.68">For the fastest response, continue on WhatsApp using the button below. Your submitted details will already be included in the message.</p>`,
    )}
  `;

  return createReadyflowEmailLayout({
    previewText: "Your Readyflow Shopify Launch request is received.",
    eyebrow: "Instagram Brand Shopify Launch",
    title: "Your store request is received",
    bodyHtml,
    ctaLabel: "Send My Details on WhatsApp",
    ctaUrl: whatsappUrl,
    signature: "Aditya",
    footerNote:
      "You received this because you submitted a Readyflow store request. Reply to this email or continue on WhatsApp.",
    logoUrl: `${siteUrl}/icon.png`,
  });
}

function buildLeadText(lead: StoredLead, whatsappUrl: string): string {
  return [
    `Hey ${lead.name || "there"},`,
    "",
    `Thanks for filling the Readyflow Shopify Launch form for ${lead.instagram || "your brand"}. I've received your details.`,
    "",
    "Your store request is received.",
    "",
    "Rs. 11,999 Shopify Launch Setup:",
    "- Mobile-first Shopify store setup",
    "- Homepage, collections and up to 10 products",
    "- Product page, size chart and policy pages",
    "- WhatsApp/contact flow and checkout setup guidance",
    "- 3-5 day build after content/access is ready",
    "",
    "Quick clarity: The Rs. 11,999 fee covers Readyflow's setup work. Shopify subscription, domain, paid apps, product photos and ad management are arranged separately.",
    "",
    "For the fastest response, continue on WhatsApp using the button below. Your submitted details will already be included in the message.",
    "",
    `Send My Details on WhatsApp: ${whatsappUrl}`,
    "",
    "You received this because you submitted a Readyflow store request. Reply to this email or continue on WhatsApp.",
    "",
    "- Aditya, Readyflow",
  ].join("\n");
}

export async function sendLeadEmails(lead: StoredLead, whatsappUrl: string) {
  const adminEmail = requireServerEnv("ADMIN_NOTIFY_EMAIL");
  const siteUrl = normalizeSiteUrl(requireServerEnv("SITE_URL"));
  const adminSlug = requireServerEnv("ADMIN_SECRET_SLUG").replace(
    /^\/+|\/+$/g,
    "",
  );
  const dashboardUrl = `${siteUrl}/${adminSlug}`;

  await Promise.all([
    sendResendEmail({
      to: adminEmail,
      subject: `New Readyflow Lead - ${lead.instagram}`,
      html: buildAdminEmail(lead, dashboardUrl, siteUrl),
      text: buildAdminText(lead, dashboardUrl),
    }),
    sendResendEmail({
      to: lead.email,
      subject: "Got your Shopify store request",
      html: buildLeadEmail(lead, whatsappUrl, siteUrl),
      text: buildLeadText(lead, whatsappUrl),
    }),
  ]);
}
