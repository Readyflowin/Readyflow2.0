export const PHOTOS_READY_OPTIONS = ["Yes", "Some", "Not yet"] as const;
export const SHOPIFY_COST_OPTIONS = [
  "Yes",
  "Need explanation",
  "No",
] as const;

export type PhotosReady = (typeof PHOTOS_READY_OPTIONS)[number];
export type ShopifyCostOkay = (typeof SHOPIFY_COST_OPTIONS)[number];
export const LEAD_STATUSES = [
  "Open",
  "Interested",
  "Closed Won",
  "Closed Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type YesNo = "Yes" | "No";
export type EmailSequence =
  | "Open"
  | "Interested"
  | "Closed Won Onboarding"
  | "Closed Lost";

export type LeadInput = {
  name: string;
  instagram: string;
  productType: string;
  photosReady: PhotosReady | "";
  shopifyCostOkay: ShopifyCostOkay | "";
  whatsapp: string;
  email: string;
  requirement: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  pageUrl: string;
  trafficSourceGroup: string;
  trafficSourceLabel: string;
  landingPage: string;
  currentPage: string;
  referrerDomain: string;
};

export type StoredLead = LeadInput & {
  timestamp: string;
  userAgent: string;
  status: LeadStatus;
  statusChangedAt: string;
  emailSequence: EmailSequence;
  emailPaused: YesNo;
  lastEmailSent: string;
  lastEmailSentAt: string;
  nextEmailDueAt: string;
  lastEmailError: string;
  emailNotes: string;
  internalNote: string;
  openInstantSent: YesNo;
  open8hSent: YesNo;
  open24hSent: YesNo;
  open72hSent: YesNo;
  openBonusFinalReminderSent: YesNo;
  open7dSent: YesNo;
  interestedImmediateSent: YesNo;
  interested8hSent: YesNo;
  interested24hSent: YesNo;
  interestedBonusFinalReminderSent: YesNo;
  interested72hSent: YesNo;
  interested7dSent: YesNo;
  closedWonProjectConfirmedSent: YesNo;
  closedWonContentChecklistSent: YesNo;
  closedWonBuildStartedSent: YesNo;
  closedWonReviewHandoffSent: YesNo;
  closedWonSupportReminderSent: YesNo;
  closedWonReviewRequestSent: YesNo;
  closedLostClosingEmailSent: YesNo;
  closedLostReactivationEmailSent: YesNo;
  followup24hSent: YesNo;
  followup72hSent: YesNo;
  followup7dSent: YesNo;
  leadId: string;
  lastContactedAt: string;
  closedAt: string;
  lostReason: string;
  projectConfirmedAt: string;
  contentReceivedAt: string;
  buildStartedAt: string;
  projectDeliveredAt: string;
  supportEndsAt: string;
  reviewRequestedAt: string;
  bonusStartedAt: string;
  bonusExpiresAt: string;
};

export type DashboardLead = StoredLead & {
  rowIndex: number;
};

export type ValidationResult =
  | { ok: true; data: LeadInput }
  | { ok: false; message: string };
