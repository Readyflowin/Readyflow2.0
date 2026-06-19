import {
  PHOTOS_READY_OPTIONS,
  SHOPIFY_COST_OPTIONS,
  type LeadInput,
  type PhotosReady,
  type ShopifyCostOkay,
  type ValidationResult,
} from "./leadTypes";

type UnknownRecord = Record<string, unknown>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(
  value: unknown,
  maxLength: number,
  fallback = "",
): string {
  if (typeof value !== "string") return fallback;
  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}

function isPhotosReady(value: string): value is PhotosReady {
  return PHOTOS_READY_OPTIONS.some((option) => option === value);
}

function isShopifyCostOkay(value: string): value is ShopifyCostOkay {
  return SHOPIFY_COST_OPTIONS.some((option) => option === value);
}

export function validateLeadPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, message: "Invalid request body." };
  }

  const name = cleanText(payload.name, 120);
  const instagram = cleanText(payload.instagram, 200);
  const productType = cleanText(payload.productType, 200);
  const photosReady = cleanText(payload.photosReady, 40);
  const shopifyCostOkay = cleanText(payload.shopifyCostOkay, 40);
  const whatsapp = cleanText(payload.whatsapp, 40);
  const email = cleanText(payload.email, 254).toLowerCase();

  if (
    !name ||
    !instagram ||
    !productType ||
    !whatsapp ||
    !email
  ) {
    return { ok: false, message: "Please complete all required fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (photosReady && !isPhotosReady(photosReady)) {
    return { ok: false, message: "Invalid product-photo selection." };
  }

  if (shopifyCostOkay && !isShopifyCostOkay(shopifyCostOkay)) {
    return { ok: false, message: "Invalid Shopify-cost selection." };
  }

  const data: LeadInput = {
    name,
    instagram,
    productType,
    photosReady: photosReady as PhotosReady | "",
    shopifyCostOkay: shopifyCostOkay as ShopifyCostOkay | "",
    whatsapp,
    email,
    requirement: cleanText(payload.requirement, 2000),
    source: cleanText(payload.source, 120, "website"),
    utm_source: cleanText(payload.utm_source, 250),
    utm_medium: cleanText(payload.utm_medium, 250),
    utm_campaign: cleanText(payload.utm_campaign, 250),
    utm_content: cleanText(payload.utm_content, 250),
    utm_term: cleanText(payload.utm_term, 250),
    fbclid: cleanText(payload.fbclid, 500),
    pageUrl: cleanText(payload.pageUrl, 2000),
  };

  return { ok: true, data };
}
