import { optionalServerEnv, requireServerEnv } from "./env.js";
import type { StoredLead } from "./leadTypes.js";

type ResendResponse = {
  id?: string;
  message?: string;
  name?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function display(value: string): string {
  return value ? escapeHtml(value) : "—";
}

function textDisplay(value: string): string {
  return value || "—";
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;color:#6b7280;font-size:13px;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#111827;font-size:13px;font-weight:600;vertical-align:top">${display(value)}</td>
    </tr>
  `;
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

function buildAdminEmail(lead: StoredLead, dashboardUrl: string): string {
  return `
    <div style="font-family:Arial,sans-serif;background:#f4efe6;padding:32px;color:#070707">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 12px">Readyflow lead notification</p>
        <h1 style="font-size:28px;margin:0 0 24px">New Shopify Launch lead</h1>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:16px">
          ${detailRow("Name", lead.name)}
          ${detailRow("Brand Instagram", lead.instagram)}
          ${detailRow("Product type", lead.productType)}
          ${detailRow("WhatsApp", lead.whatsapp)}
          ${detailRow("Email", lead.email)}
          ${detailRow("Source", lead.source)}
          ${detailRow("UTM source", lead.utm_source)}
          ${detailRow("UTM medium", lead.utm_medium)}
          ${detailRow("UTM campaign", lead.utm_campaign)}
          ${detailRow("UTM content", lead.utm_content)}
          ${detailRow("UTM term", lead.utm_term)}
          ${detailRow("FBCLID", lead.fbclid)}
          ${detailRow("Page URL", lead.pageUrl)}
          ${detailRow("Timestamp", lead.timestamp)}
        </table>
        <div style="margin-top:20px;padding:18px;border-radius:16px;background:#ecfdf5;border:1px solid #d1fae5">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#047857">Suggested admin action</p>
          <p style="margin:0;color:#374151;line-height:1.65">Reply fast on WhatsApp while intent is warm. Check if products/photos are ready and whether they understand Shopify/domain costs are separate.</p>
        </div>
        <a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;margin-top:24px;background:#070707;color:#1dff8a;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:12px;font-weight:700">Open Dashboard</a>
      </div>
    </div>
  `;
}

function buildAdminText(lead: StoredLead, dashboardUrl: string): string {
  return [
    "New Readyflow Lead",
    "",
    `Name: ${textDisplay(lead.name)}`,
    `Brand Instagram: ${textDisplay(lead.instagram)}`,
    `Product type: ${textDisplay(lead.productType)}`,
    `WhatsApp: ${textDisplay(lead.whatsapp)}`,
    `Email: ${textDisplay(lead.email)}`,
    `Source: ${textDisplay(lead.source)}`,
    `UTM source: ${textDisplay(lead.utm_source)}`,
    `UTM medium: ${textDisplay(lead.utm_medium)}`,
    `UTM campaign: ${textDisplay(lead.utm_campaign)}`,
    `UTM content: ${textDisplay(lead.utm_content)}`,
    `UTM term: ${textDisplay(lead.utm_term)}`,
    `FBCLID: ${textDisplay(lead.fbclid)}`,
    `Page URL: ${textDisplay(lead.pageUrl)}`,
    `Timestamp: ${textDisplay(lead.timestamp)}`,
    "",
    "Suggested admin action: Reply fast on WhatsApp while intent is warm. Check if products/photos are ready and whether they understand Shopify/domain costs are separate.",
    "",
    `Open Dashboard: ${dashboardUrl}`,
  ].join("\n");
}

function buildLeadEmail(lead: StoredLead, whatsappUrl: string): string {
  return `
    <div style="font-family:Arial,sans-serif;background:#f4efe6;padding:32px;color:#070707">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 12px">Readyflow · Instagram Brand Shopify Launch</p>
        <h1 style="font-size:30px;line-height:1.15;margin:0 0 18px">Your Shopify Launch Plan</h1>
        <p style="font-size:15px;line-height:1.7;color:#374151">Hey ${escapeHtml(lead.name)},</p>
        <p style="font-size:15px;line-height:1.7;color:#374151">Thanks for filling the Readyflow Shopify Launch form for ${escapeHtml(lead.instagram)}.</p>
        <p style="font-size:15px;line-height:1.7;color:#374151;font-weight:700">Your request is received.</p>
        <p style="font-size:15px;line-height:1.7;color:#374151">The ₹11,999 Instagram Brand Shopify Launch is built for product brands that want a cleaner link-in-bio store, product browsing flow, WhatsApp/contact setup, and checkout-ready Shopify structure.</p>
        <div style="margin:22px 0;padding:18px;border-radius:16px;background:#f9fafb">
          <p style="margin:0 0 10px;font-weight:700">What’s included:</p>
          <ul style="margin:0;padding-left:20px;color:#4b5563;line-height:1.8">
            <li>Homepage setup</li>
            <li>Product and collection setup</li>
            <li>Up to 10 products</li>
            <li>Size chart section</li>
            <li>WhatsApp/contact button</li>
            <li>Basic policy pages</li>
            <li>Payment/shipping setup guidance</li>
            <li>Mobile-first layout</li>
          </ul>
        </div>
        <div style="margin:22px 0;padding:18px;border-radius:16px;background:#f9fafb">
          <p style="margin:0 0 8px;font-weight:700">Quick clarity:</p>
          <p style="margin:0;color:#4b5563;line-height:1.65">The ₹11,999 package covers the store setup. Shopify subscription, domain, paid apps, product photos and ad management stay separate, so there’s no confusion later.</p>
        </div>
        <p style="font-size:15px;line-height:1.7;color:#374151"><strong>Timeline:</strong><br>Usually 3–5 days after products, content, brand details and access are ready.</p>
        <p style="font-size:15px;line-height:1.7;color:#374151">Fastest response ke liye WhatsApp par continue karein using the button below.</p>
        <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;margin-top:16px;background:#25d366;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:999px;font-size:13px;font-weight:700">Send My Details on WhatsApp</a>
        <p style="margin-top:26px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.65;color:#6b7280">Built to give your brand a cleaner buying flow. Results depend on your products, pricing, content and traffic.</p>
        <p style="margin-top:28px;font-size:13px;color:#6b7280">— Aditya, Readyflow</p>
      </div>
    </div>
  `;
}

function buildLeadText(lead: StoredLead, whatsappUrl: string): string {
  return [
    `Hey ${lead.name},`,
    "",
    `Thanks for filling the Readyflow Shopify Launch form for ${lead.instagram}.`,
    "",
    "Your request is received.",
    "",
    "The ₹11,999 Instagram Brand Shopify Launch is built for product brands that want a cleaner link-in-bio store, product browsing flow, WhatsApp/contact setup, and checkout-ready Shopify structure.",
    "",
    "What’s included:",
    "- Homepage setup",
    "- Product and collection setup",
    "- Up to 10 products",
    "- Size chart section",
    "- WhatsApp/contact button",
    "- Basic policy pages",
    "- Payment/shipping setup guidance",
    "- Mobile-first layout",
    "",
    "Quick clarity: The ₹11,999 package covers the store setup. Shopify subscription, domain, paid apps, product photos and ad management stay separate, so there’s no confusion later.",
    "",
    "Timeline: Usually 3–5 days after products, content, brand details and access are ready.",
    "",
    `Send My Details on WhatsApp: ${whatsappUrl}`,
    "",
    "Built to give your brand a cleaner buying flow. Results depend on your products, pricing, content and traffic.",
    "",
    "— Aditya, Readyflow",
  ].join("\n");
}

export async function sendLeadEmails(
  lead: StoredLead,
  whatsappUrl: string,
) {
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
      subject: `New Readyflow Lead — ${lead.instagram}`,
      html: buildAdminEmail(lead, dashboardUrl),
      text: buildAdminText(lead, dashboardUrl),
    }),
    sendResendEmail({
      to: lead.email,
      subject: "Your Shopify Launch Plan from Readyflow",
      html: buildLeadEmail(lead, whatsappUrl),
      text: buildLeadText(lead, whatsappUrl),
    }),
  ]);
}
