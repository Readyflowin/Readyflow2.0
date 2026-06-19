export const PHOTOS_READY_OPTIONS = ["Yes", "Some", "Not yet"] as const;
export const SHOPIFY_COST_OPTIONS = [
  "Yes",
  "Need explanation",
  "No",
] as const;

export type PhotosReady = (typeof PHOTOS_READY_OPTIONS)[number];
export type ShopifyCostOkay = (typeof SHOPIFY_COST_OPTIONS)[number];
export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Interested",
  "Closed",
  "Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

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
};

export type StoredLead = LeadInput & {
  timestamp: string;
  userAgent: string;
  status: LeadStatus;
  internalNote: string;
  followup24hSent: "Yes" | "No";
  followup72hSent: "Yes" | "No";
  followup7dSent: "Yes" | "No";
  leadId: string;
  lastContactedAt: string;
  closedAt: string;
  lostReason: string;
};

export type DashboardLead = StoredLead & {
  rowIndex: number;
};

export type ValidationResult =
  | { ok: true; data: LeadInput }
  | { ok: false; message: string };
