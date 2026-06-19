import { requireServerEnv } from "./env";
import { sendEmail } from "./emails";
import type { DashboardLead } from "./leadTypes";

export type FollowupStage = "24h" | "72h" | "7d";

type FollowupTemplate = {
  subject: string;
  heading: string;
  paragraphs: string[];
  cta: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildFollowupWhatsAppUrl(lead: DashboardLead): string {
  const number = requireServerEnv("WHATSAPP_NUMBER").replace(/\D/g, "");
  const message = [
    "Hi Readyflow, I filled the Shopify Launch form earlier.",
    `My brand is ${lead.instagram}.`,
    "I want to continue the discussion.",
  ].join(" ");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function templateFor(
  stage: FollowupStage,
  lead: DashboardLead,
): FollowupTemplate {
  const name = lead.name || "there";
  const brand = lead.instagram || "your brand";

  if (stage === "24h") {
    return {
      subject: "Quick check — should I review your brand?",
      heading: "Should I review your brand?",
      paragraphs: [
        `Hey ${name},`,
        `Just checking in — you filled the Readyflow Shopify Launch form for ${brand}.`,
        "If your products/photos are ready, I can help you understand the next steps for getting your Shopify store live.",
        "The ₹11,999 package covers the store setup. Shopify subscription, domain, paid apps, product photos and ad management stay separate, so there’s no confusion later.",
        "The goal is simple: make your Instagram brand look more organised, easier to browse, and ready for a smoother buying flow.",
      ],
      cta: "Continue on WhatsApp",
    };
  }

  if (stage === "72h") {
    return {
      subject: "Your store plan is still pending",
      heading: "Your store plan is still open",
      paragraphs: [
        `Hey ${name},`,
        `Your Readyflow store request for ${brand} is still open.`,
        "If you’re still planning the store, send your Instagram page and product details on WhatsApp. I’ll check whether the ₹11,999 Shopify Launch package fits your current stage or if you should wait until your content is more ready.",
        "The idea is to set up a clean Shopify structure that makes your products easier to browse, understand and order/enquire about.",
      ],
      cta: "Send My Brand Page",
    };
  }

  return {
    subject: "Should I keep this open?",
    heading: "Should I keep this open?",
    paragraphs: [
      `Hey ${name},`,
      "I don’t want to keep bothering you if this is not needed.",
      `If you’re still planning your Shopify store for ${brand}, continue on WhatsApp and I’ll share the next step.`,
      "If now is not the right time, no worries — I’ll close the request from my side.",
    ],
    cta: "Continue on WhatsApp",
  };
}

function buildHtml(
  template: FollowupTemplate,
  whatsappUrl: string,
): string {
  const paragraphs = template.paragraphs
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151">${escapeHtml(paragraph)}</p>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#f4efe6;padding:24px;color:#070707">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#047857;margin:0 0 12px">Readyflow · Shopify Launch</p>
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 22px">${escapeHtml(template.heading)}</h1>
        ${paragraphs}
        <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;margin-top:8px;background:#25d366;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:999px;font-size:13px;font-weight:700">${escapeHtml(template.cta)}</a>
        <p style="margin-top:28px;font-size:13px;color:#6b7280">— Aditya, Readyflow</p>
      </div>
    </div>
  `;
}

export async function sendFollowupEmail(
  lead: DashboardLead,
  stage: FollowupStage,
) {
  const template = templateFor(stage, lead);
  const whatsappUrl = buildFollowupWhatsAppUrl(lead);
  await sendEmail({
    to: lead.email,
    subject: template.subject,
    html: buildHtml(template, whatsappUrl),
    text: [
      ...template.paragraphs,
      "",
      `${template.cta}: ${whatsappUrl}`,
      "",
      "— Aditya, Readyflow",
    ].join("\n"),
  });
}
