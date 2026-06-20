import {
  createReadyflowEmailLayout,
  emailParagraph,
} from "./emailLayout.js";
import { requireServerEnv } from "./env.js";
import { sendEmail } from "./emails.js";
import type { DashboardLead } from "./leadTypes.js";

export type FollowupStage = "24h" | "72h" | "7d";

type FollowupTemplate = {
  subject: string;
  heading: string;
  paragraphs: string[];
  cta: string;
};

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
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
      subject: `Quick question about ${brand}`,
      heading: "Should I review your brand?",
      paragraphs: [
        `Hey ${name},`,
        `Just checking in - you filled the Readyflow Shopify Launch form for ${brand}.`,
        "If your products/photos are ready, I can help you understand the next steps for getting your Shopify store live.",
        "The Rs. 11,999 package covers the store setup. Shopify subscription, domain, paid apps, product photos and ad management stay separate, so there is no confusion later.",
        "The goal is simple: make your Instagram brand look more organised, easier to browse, and ready for a smoother buying flow.",
      ],
      cta: "Continue on WhatsApp",
    };
  }

  if (stage === "72h") {
    return {
      subject: `Still thinking about the store for ${brand}?`,
      heading: "Your store plan is still open",
      paragraphs: [
        `Hey ${name},`,
        `Your Readyflow store request for ${brand} is still open.`,
        "If you are still planning the store, send your Instagram page and product details on WhatsApp. I will check whether the Rs. 11,999 Shopify Launch package fits your current stage or if you should wait until your content is more ready.",
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
      "I do not want to keep bothering you if this is not needed.",
      `If you are still planning your Shopify store for ${brand}, continue on WhatsApp and I will share the next step.`,
      "If now is not the right time, no worries - I will close the request from my side.",
    ],
    cta: "Continue on WhatsApp",
  };
}

export function buildFollowupEmailHtml(
  template: FollowupTemplate,
  whatsappUrl: string,
  siteUrl: string,
): string {
  const paragraphs = template.paragraphs
    .map((paragraph) => emailParagraph(paragraph))
    .join("");

  return createReadyflowEmailLayout({
    previewText: template.heading,
    eyebrow: "Readyflow follow-up",
    title: template.heading,
    bodyHtml: paragraphs,
    ctaLabel: template.cta,
    ctaUrl: whatsappUrl,
    signature: "Aditya",
    footerNote:
      "You received this because you submitted a Readyflow store request. Reply to this email or continue on WhatsApp.",
    logoUrl: `${normalizeSiteUrl(siteUrl)}/icon.png`,
  });
}

export async function sendFollowupEmail(
  lead: DashboardLead,
  stage: FollowupStage,
) {
  const template = templateFor(stage, lead);
  const whatsappUrl = buildFollowupWhatsAppUrl(lead);
  const siteUrl = normalizeSiteUrl(requireServerEnv("SITE_URL"));

  await sendEmail({
    to: lead.email,
    subject: template.subject,
    html: buildFollowupEmailHtml(template, whatsappUrl, siteUrl),
    text: [
      ...template.paragraphs,
      "",
      `${template.cta}: ${whatsappUrl}`,
      "",
      "- Aditya, Readyflow",
    ].join("\n"),
  });
}
