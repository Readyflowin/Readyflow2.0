import {
  createReadyflowEmailLayout,
  emailBox,
  emailBulletList,
  emailParagraph,
  htmlToText,
} from "./emailLayout.js";
import { requireServerEnv } from "./env.js";
import { sendEmail } from "./emails.js";
import type { DashboardLead, LeadStatus } from "./leadTypes.js";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const SEQUENCE_EMAIL_TYPES = [
  "open_instant",
  "open_8h",
  "open_24h",
  "open_bonus_final_reminder",
  "open_7d",
  "interested_immediate",
  "interested_8h",
  "interested_24h",
  "interested_bonus_final_reminder",
  "interested_72h",
  "interested_7d",
  "closed_won_project_confirmed",
  "closed_won_content_checklist",
  "closed_won_build_started",
  "closed_won_handoff",
  "closed_won_support_reminder",
  "closed_won_review_request",
  "closed_lost_closing",
  "closed_lost_reactivation",
] as const;

export type SequenceEmailType = (typeof SEQUENCE_EMAIL_TYPES)[number];

export type SequenceEmailDefinition = {
  type: SequenceEmailType;
  status: LeadStatus;
  flag:
    | "openInstantSent"
    | "open8hSent"
    | "open24hSent"
    | "open72hSent"
    | "openBonusFinalReminderSent"
    | "open7dSent"
    | "interestedImmediateSent"
    | "interested8hSent"
    | "interested24hSent"
    | "interestedBonusFinalReminderSent"
    | "interested72hSent"
    | "interested7dSent"
    | "closedWonProjectConfirmedSent"
    | "closedWonContentChecklistSent"
    | "closedWonBuildStartedSent"
    | "closedWonReviewHandoffSent"
    | "closedWonSupportReminderSent"
    | "closedWonReviewRequestSent"
    | "closedLostClosingEmailSent"
    | "closedLostReactivationEmailSent";
  label: string;
  delayMs: number;
  expiresAfterMs?: number;
  auto: boolean;
  subject: (lead: DashboardLead) => string;
  preheader?: (lead: DashboardLead) => string;
  ctaLabel?: string;
  whatsappMessage?: (lead: DashboardLead) => string;
  paragraphs: (lead: DashboardLead) => string[];
  bullets?: (lead: DashboardLead) => string[];
  bonusBlock?: boolean;
};

function brand(lead: DashboardLead): string {
  return lead.instagram || "your brand";
}

function name(lead: DashboardLead): string {
  return lead.name || "there";
}

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function whatsappUrl(message: string): string {
  const number = requireServerEnv("WHATSAPP_NUMBER").replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function commonWhatsAppQuestion(lead: DashboardLead): string {
  return `Hi Readyflow, I am ${lead.name || "interested"} and I have a question about my Shopify launch for ${brand(lead)}.`;
}

export const SEQUENCE_DEFINITIONS: SequenceEmailDefinition[] = [
  {
    type: "open_instant",
    status: "Open",
    flag: "openInstantSent",
    label: "Open Instant",
    delayMs: 0,
    auto: true,
    subject: (lead) => `Got your request for ${brand(lead)}`,
    preheader: () =>
      "We received your store request. Continue on WhatsApp to claim the next step.",
    ctaLabel: "Continue on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I filled the form for ${brand(lead)}. Please review my brand and share the ₹14,999 Shopify launch plan + 48-hour bonus details.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `Thank you for filling the Readyflow form for ${brand(lead)}.`,
      "We’ve received your store request. I’ll review your brand details and share the next step on WhatsApp.",
      "Your 48-Hour Launch Bonus is reserved: complete the WhatsApp step and confirm within 48 hours to unlock up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.",
      "The ₹14,999 package covers your Shopify launch setup. Shopify subscription and domain stay separate, and I’ll guide you on both.",
    ],
    bonusBlock: true,
  },
  {
    type: "open_8h",
    status: "Open",
    flag: "open8hSent",
    label: "Open 8h",
    delayMs: 8 * HOUR_MS,
    auto: true,
    subject: (lead) => `Quick question about ${brand(lead)}`,
    preheader: () => "Your Readyflow launch bonus is still available.",
    ctaLabel: "Claim bonus on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to continue with the ₹14,999 Shopify launch plan for ${brand(lead)}. Please explain the bonus and next step.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Just a quick reminder — your 48-Hour Launch Bonus is still available.",
      "If your brand fits the ₹14,999 Shopify Launch package, confirming within the bonus window unlocks up to 5 custom Shopify sections coded just for your brand at no extra setup fee.",
      "The easiest next step is to continue on WhatsApp. I’ll review your brand and explain the setup clearly.",
    ],
    bonusBlock: true,
  },
  {
    type: "open_24h",
    status: "Open",
    flag: "open24hSent",
    label: "Open 24h",
    delayMs: DAY_MS,
    auto: true,
    subject: (lead) => `An idea for ${brand(lead)}`,
    preheader: () =>
      "The bonus can help your store feel more brand-specific at launch.",
    ctaLabel: "See what fits my brand",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to know what custom sections would fit ${brand(lead)} under the 48-hour launch bonus.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "A normal Shopify setup can look basic if the sections do not match the brand.",
      "That’s why the 48-Hour Launch Bonus includes up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.",
      "It helps your launch store feel more complete, more brand-specific, and less like a default template.",
      `Continue on WhatsApp and I’ll share what makes sense for ${brand(lead)}.`,
    ],
    bonusBlock: true,
  },
  {
    type: "open_bonus_final_reminder",
    status: "Open",
    flag: "openBonusFinalReminderSent",
    label: "Open Bonus Final Reminder",
    delayMs: 44 * HOUR_MS,
    expiresAfterMs: 48 * HOUR_MS,
    auto: true,
    subject: (lead) => `Checking in about ${brand(lead)}`,
    preheader: () => "You’re close to missing the 48-hour launch bonus.",
    ctaLabel: "Complete WhatsApp step",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to complete the WhatsApp step before the 48-hour bonus ends. Please guide me for ${brand(lead)}.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Your 48-Hour Launch Bonus is close to ending.",
      "This is the chance to make your Shopify store feel more unique at launch with up to 5 custom sections coded just for your brand — at no extra setup fee.",
      "If you still want to move ahead, complete the WhatsApp step now and I’ll guide you from there.",
    ],
    bonusBlock: true,
  },
  {
    type: "open_7d",
    status: "Open",
    flag: "open7dSent",
    label: "Open 7d",
    delayMs: 7 * DAY_MS,
    auto: true,
    subject: () => "Should I close this for now?",
    preheader: () => "I’ll pause follow-ups unless you still want to continue.",
    ctaLabel: "Continue on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I’m still considering the Shopify launch for ${brand(lead)}. Can we continue from here?`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "I’ll close this from my side for now so I don’t keep filling your inbox.",
      "If you still want to launch your Shopify store, you can continue on WhatsApp and I’ll guide you from there.",
      "If now is not the right time, that’s completely fine too.",
    ],
  },
  {
    type: "interested_immediate",
    status: "Interested",
    flag: "interestedImmediateSent",
    label: "Interested Immediate",
    delayMs: 0,
    auto: true,
    subject: (lead) => `Next steps for ${brand(lead)}`,
    preheader: () => "The 48-Hour Launch Bonus is open for your brand.",
    ctaLabel: "Complete onboarding on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to continue with the ₹14,999 Shopify launch plan for ${brand(lead)}. Please guide me through onboarding and the 48-hour bonus.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `I’ve reviewed your details for ${brand(lead)}.`,
      "Your Readyflow Shopify Launch plan is ready. The setup fee is ₹14,999 for the store launch work.",
      "I’m also keeping the 48-Hour Launch Bonus open for you: confirm within 48 hours and I’ll include up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.",
      "Complete the WhatsApp/onboarding step and I’ll guide you from there.",
    ],
    bonusBlock: true,
  },
  {
    type: "interested_8h",
    status: "Interested",
    flag: "interested8hSent",
    label: "Interested 8h",
    delayMs: 8 * HOUR_MS,
    auto: true,
    subject: (lead) => `Quick follow-up on ${brand(lead)}`,
    preheader: () => "Your bonus is still active.",
    ctaLabel: "Claim bonus on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to claim the 48-hour custom sections bonus for ${brand(lead)}. Please send the next step.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Quick reminder — your 48-Hour Launch Bonus is still active.",
      "If you complete the onboarding step within the bonus window, I’ll include up to 5 custom Shopify sections coded just for your brand at no extra setup fee.",
      "This helps your launch store feel more brand-specific instead of looking like a basic template.",
    ],
    bonusBlock: true,
  },
  {
    type: "interested_24h",
    status: "Interested",
    flag: "interested24hSent",
    label: "Interested 24h",
    delayMs: DAY_MS,
    auto: true,
    subject: (lead) => `One thought for ${brand(lead)}`,
    preheader: () =>
      "Custom-coded sections can help your launch feel more unique.",
    ctaLabel: "Complete onboarding now",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to complete onboarding for ${brand(lead)} and use the 48-hour bonus before it ends.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "A Shopify store can work fine with normal sections, but it feels stronger when parts of the store are shaped around the brand.",
      "That’s the point of the 48-Hour Launch Bonus: up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.",
      `If you want ${brand(lead)} to feel more unique at launch, complete the WhatsApp/onboarding step and I’ll guide you.`,
    ],
    bonusBlock: true,
  },
  {
    type: "interested_bonus_final_reminder",
    status: "Interested",
    flag: "interestedBonusFinalReminderSent",
    label: "Interested Bonus Final Reminder",
    delayMs: 44 * HOUR_MS,
    expiresAfterMs: 48 * HOUR_MS,
    auto: true,
    subject: () => "Are you still interested in moving ahead?",
    preheader: () => "You’re close to losing the 48-hour bonus.",
    ctaLabel: "Complete onboarding now",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to complete onboarding before the 48-hour bonus ends for ${brand(lead)}. Please guide me now.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Your 48-Hour Launch Bonus is close to ending.",
      "This is the opportunity to make your Shopify store feel more unique with up to 5 custom sections coded just for your brand — at no extra setup fee.",
      "If you still want to use the bonus, complete the onboarding step now and I’ll take it forward.",
    ],
    bonusBlock: true,
  },
  {
    type: "interested_72h",
    status: "Interested",
    flag: "interested72hSent",
    label: "Interested 72h",
    delayMs: 3 * DAY_MS,
    auto: true,
    subject: () => "Do you still want to move ahead?",
    preheader: () =>
      "The bonus window has passed, but your store plan can still move ahead.",
    ctaLabel: "Continue with the store plan",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I still want to continue with the Shopify launch plan for ${brand(lead)}. Please guide me on the next step.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "The 48-Hour Launch Bonus window has passed, so I won’t keep pushing that.",
      "But if you still want to launch your Shopify store, the ₹14,999 Readyflow setup can still move ahead normally.",
      "Message me on WhatsApp and I’ll guide you with the cleanest next step.",
    ],
  },
  {
    type: "interested_7d",
    status: "Interested",
    flag: "interested7dSent",
    label: "Interested 7d",
    delayMs: 7 * DAY_MS,
    auto: true,
    subject: () => "Should I close this for now?",
    preheader: () => "I’ll pause this unless you still want to continue.",
    ctaLabel: "Keep this open on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I still want to keep the Shopify launch plan open for ${brand(lead)}. Can we continue from here?`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "I’ll close this from my side for now so I don’t keep filling your inbox.",
      "If you still want to move ahead with your Shopify launch, message me on WhatsApp and I’ll guide you from there.",
      "If now is not the right time, that’s completely fine too.",
    ],
  },
  {
    type: "closed_won_project_confirmed",
    status: "Closed Won",
    flag: "closedWonProjectConfirmedSent",
    label: "Project Confirmed",
    delayMs: 0,
    auto: true,
    subject: () => "Your Readyflow Shopify Launch is Confirmed",
    ctaLabel: "Ask a question on WhatsApp",
    whatsappMessage: commonWhatsAppQuestion,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Thank you for choosing Readyflow. Your Instagram Brand Shopify Launch project is confirmed.",
      `We are excited to help bring ${brand(lead)} into a cleaner Shopify buying flow.`,
      "Next, I will share the content and access checklist. The project timeline starts once the main brand assets, product details, photos, and access are ready.",
      "The Rs. 14,999 setup covers the agreed Readyflow setup work. Shopify subscription, domain, paid apps, extra products, and requests outside scope are handled separately and will be discussed before anything extra is done.",
      "Reply here or message on WhatsApp if you have any immediate questions.",
    ],
  },
  {
    type: "closed_won_content_checklist",
    status: "Closed Won",
    flag: "closedWonContentChecklistSent",
    label: "Content Checklist",
    delayMs: DAY_MS,
    auto: false,
    subject: () => "Content checklist for your Shopify launch",
    ctaLabel: "Send assets on WhatsApp",
    whatsappMessage: () =>
      "Hi Readyflow, I am sending the brand assets for my Shopify store.",
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "To start smoothly, please send the core assets below. You can reply to this email or share them on WhatsApp/Drive.",
      "Try to send as much as you have in one place. The timeline starts once the main content is ready.",
    ],
    bullets: () => [
      "Logo or brand name",
      "Product photos",
      "Product names, prices, variants, and short descriptions",
      "Category names",
      "Contact / WhatsApp details",
      "Payment and shipping preference",
      "Existing Shopify/domain details if you already have them",
    ],
  },
  {
    type: "closed_won_build_started",
    status: "Closed Won",
    flag: "closedWonBuildStartedSent",
    label: "Build Started",
    delayMs: 0,
    auto: false,
    subject: () => "We are building your store - here is the timeline",
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      "Good news - the main materials are in and your Shopify launch build has started.",
      "I will keep you updated as the store structure, products, pages, and checkout/contact flow come together.",
      "There is no action needed from you right now unless I ask for a quick clarification.",
    ],
  },
  {
    type: "closed_won_handoff",
    status: "Closed Won",
    flag: "closedWonReviewHandoffSent",
    label: "Review Handoff",
    delayMs: 0,
    auto: false,
    subject: () => "Your Shopify store is ready for review",
    ctaLabel: "Send feedback",
    whatsappMessage: () =>
      "Hi Readyflow, I am reviewing the store and have feedback/questions.",
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `Your Shopify store for ${brand(lead)} is ready for review.`,
      "Please check the pages, products, images, pricing, and contact/checkout flow. Send any small changes in one reply so I can clean them up quickly.",
      "Once approved, we can move to final launch/handoff.",
    ],
  },
  {
    type: "closed_won_support_reminder",
    status: "Closed Won",
    flag: "closedWonSupportReminderSent",
    label: "Support Reminder",
    delayMs: 7 * DAY_MS,
    auto: false,
    subject: () => "Your 7-day support window reminder",
    ctaLabel: "Send support request",
    whatsappMessage: () =>
      "Hi Readyflow, I need help with a small post-launch adjustment.",
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `Hope ${brand(lead)} is running smoothly.`,
      "This is a reminder to send any small post-launch fixes or adjustments while your included 7-day support window is active.",
      "Reply here or message on WhatsApp with anything that needs attention.",
    ],
  },
  {
    type: "closed_won_review_request",
    status: "Closed Won",
    flag: "closedWonReviewRequestSent",
    label: "Review Request",
    delayMs: 14 * DAY_MS,
    auto: false,
    subject: () => "Could you share quick feedback?",
    ctaLabel: "Send feedback",
    whatsappMessage: () =>
      "Hi Readyflow, I wanted to share feedback about the Shopify launch.",
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `It was a pleasure helping bring ${brand(lead)} online.`,
      "If you have a minute, I would love to know how the Readyflow experience was.",
      "You can simply reply with a short note. It helps us improve and helps future product brands decide with more confidence.",
    ],
  },
  {
    type: "closed_lost_closing",
    status: "Closed Lost",
    flag: "closedLostClosingEmailSent",
    label: "Closed Lost Closing",
    delayMs: 0,
    auto: true,
    subject: (lead) => `Closing the loop on ${brand(lead)}`,
    ctaLabel: "Continue later on WhatsApp",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I want to revisit the Shopify launch for ${brand(lead)}.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `Since there has not been movement on the Shopify launch for ${brand(lead)}, I will close this request from my side for now.`,
      "No worries at all - I understand timing and priorities can change.",
      "Thank you for considering Readyflow. If you want to revisit this later, just reply here or message on WhatsApp and we can pick it back up.",
      "I will not keep sending follow-ups unless you let me know.",
    ],
  },
  {
    type: "closed_lost_reactivation",
    status: "Closed Lost",
    flag: "closedLostReactivationEmailSent",
    label: "Closed Lost Reactivation",
    delayMs: 30 * DAY_MS,
    auto: false,
    subject: (lead) => `Any updates on ${brand(lead)}?`,
    ctaLabel: "Reply yes or no",
    whatsappMessage: (lead) =>
      `Hi Readyflow, I am still interested in the Shopify launch for ${brand(lead)}.`,
    paragraphs: (lead) => [
      `Hi ${name(lead)},`,
      `Just checking whether anything has changed for ${brand(lead)} since we paused the Shopify launch discussion.`,
      "If you are still planning to move forward, reply yes or message me on WhatsApp and we can resume.",
      "If now is still not the right time, that is completely fine - a simple no is enough and I will not continue contacting you.",
    ],
  },
];

export function getSequenceDefinition(
  type: SequenceEmailType,
): SequenceEmailDefinition {
  const definition = SEQUENCE_DEFINITIONS.find((item) => item.type === type);
  if (!definition) throw new Error(`Unsupported email type: ${type}`);
  return definition;
}

export function isSequenceEmailType(value: string): value is SequenceEmailType {
  return SEQUENCE_EMAIL_TYPES.includes(value as SequenceEmailType);
}

function buildSequenceBody(
  definition: SequenceEmailDefinition,
  lead: DashboardLead,
): string {
  const paragraphs = definition
    .paragraphs(lead)
    .map((paragraph) => emailParagraph(paragraph))
    .join("");
  const bullets = definition.bullets?.(lead);
  const bulletHtml =
    bullets && bullets.length > 0
      ? emailBox("Helpful details", emailBulletList(bullets))
      : "";
  const bonusHtml = definition.bonusBlock
    ? emailBox(
        "48-Hour Launch Bonus",
        `<p style="margin:0;color:#374151;font-size:15px;line-height:1.68">Up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.</p><p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.55">Simple brand-specific launch sections only.</p>`,
      )
    : "";

  return `${paragraphs}${bonusHtml}${bulletHtml}`;
}

export function buildSequenceEmailHtml(
  lead: DashboardLead,
  type: SequenceEmailType,
): string {
  const definition = getSequenceDefinition(type);
  const siteUrl = normalizeSiteUrl(requireServerEnv("SITE_URL"));
  const ctaUrl = definition.whatsappMessage
    ? whatsappUrl(definition.whatsappMessage(lead))
    : undefined;

  return createReadyflowEmailLayout({
    previewText: definition.preheader?.(lead) || definition.subject(lead),
    eyebrow: "Instagram Brand Shopify Launch",
    title: definition.subject(lead),
    bodyHtml: buildSequenceBody(definition, lead),
    ctaLabel: definition.ctaLabel,
    ctaUrl,
    signature: "Aditya",
    footerNote:
      "You received this because you submitted a Readyflow store request. Reply to this email or continue on WhatsApp.",
    logoUrl: `${siteUrl}/icon.png`,
  });
}

export function buildSequenceEmailText(
  lead: DashboardLead,
  type: SequenceEmailType,
): string {
  const definition = getSequenceDefinition(type);
  const ctaUrl = definition.whatsappMessage
    ? whatsappUrl(definition.whatsappMessage(lead))
    : "";
  const bullets = definition.bullets?.(lead) || [];
  return [
    ...definition.paragraphs(lead),
    ...(definition.bonusBlock
      ? [
          "",
          "48-Hour Launch Bonus",
          "Up to 5 custom Shopify sections coded just for your brand — at no extra setup fee.",
          "Simple brand-specific launch sections only.",
        ]
      : []),
    ...(bullets.length > 0 ? ["", ...bullets.map((item) => `- ${item}`)] : []),
    ...(definition.ctaLabel && ctaUrl ? ["", `${definition.ctaLabel}: ${ctaUrl}`] : []),
    "",
    "- Aditya, Readyflow",
  ].join("\n");
}

export async function sendSequenceEmail(
  lead: DashboardLead,
  type: SequenceEmailType,
) {
  const definition = getSequenceDefinition(type);
  await sendEmail({
    to: lead.email,
    subject: definition.subject(lead),
    html: buildSequenceEmailHtml(lead, type),
    text:
      buildSequenceEmailText(lead, type) ||
      htmlToText(buildSequenceEmailHtml(lead, type)),
  });
}

export function dueBaseTimestamp(lead: DashboardLead): string {
  if (
    lead.emailSequence === "Interested" ||
    lead.emailSequence === "Closed Won Onboarding" ||
    lead.emailSequence === "Closed Lost"
  ) {
    return lead.statusChangedAt || lead.timestamp;
  }
  return lead.timestamp;
}

export function nextDueEmailForLead(
  lead: DashboardLead,
  nowMs = Date.now(),
): SequenceEmailDefinition | null {
  if (lead.emailPaused === "Yes" || !lead.email) return null;

  const baseTimestamp = Date.parse(dueBaseTimestamp(lead));
  if (!Number.isFinite(baseTimestamp)) return null;

  const candidates = SEQUENCE_DEFINITIONS.filter(
    (definition) =>
      definition.auto &&
      definition.status === lead.status &&
      lead[definition.flag] !== "Yes" &&
      nowMs - baseTimestamp >= definition.delayMs &&
      (!definition.expiresAfterMs ||
        nowMs - baseTimestamp <= definition.expiresAfterMs),
  );

  return candidates[0] || null;
}

export function computeNextEmailDueAt(
  lead: DashboardLead,
  nowMs = Date.now(),
): string {
  if (lead.emailPaused === "Yes" || !lead.email) return "";

  const baseTimestamp = Date.parse(dueBaseTimestamp(lead));
  if (!Number.isFinite(baseTimestamp)) return "";

  const pending = SEQUENCE_DEFINITIONS.filter(
    (definition) =>
      definition.auto &&
      definition.status === lead.status &&
      lead[definition.flag] !== "Yes" &&
      (!definition.expiresAfterMs ||
        nowMs - baseTimestamp <= definition.expiresAfterMs),
  )
    .map((definition) => baseTimestamp + definition.delayMs)
    .filter((dueMs) => Number.isFinite(dueMs) && dueMs >= nowMs - 1000)
    .sort((left, right) => left - right);

  return pending.length > 0 ? new Date(pending[0]).toISOString() : "";
}
