import { trackGA4Event } from "./ga4";

export type MetaPixelParams = Record<string, unknown>;

type MetaPixelCommand = "track" | "trackCustom";

type MetaPixelFunction = (
  command: MetaPixelCommand,
  eventName: string,
  params?: MetaPixelParams,
) => void;

const SAFE_DEFAULT_PARAMS: MetaPixelParams = {
  source: "landing_page",
  offer: "instagram_brand_shopify_launch",
  package_price: "11999",
};

const STANDARD_EVENTS = new Set(["PageView", "ViewContent", "Lead", "Contact"]);

const PUBLIC_PATHS = new Set([
  "/",
  "/pricing",
  "/work",
  "/privacy-policy",
  "/terms",
  "/refund-cancellation-policy",
  "/delivery-scope-policy",
]);

const SAFE_PARAM_KEYS = new Set([
  "source",
  "offer",
  "package_price",
  "page_path",
  "section",
  "cta_label",
  "destination",
  "content_name",
  "value",
  "currency",
  "channel",
  "error_type",
  "status",
  "project_category",
  "source_section",
  "destination_type",
  "form",
]);

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function currentPathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.has(pathname.replace(/\/+$/, "") || "/");
}

function safeParams(params?: MetaPixelParams): MetaPixelParams {
  const merged = {
    ...SAFE_DEFAULT_PARAMS,
    page_path: currentPathname(),
    ...params,
  };
  const safe: MetaPixelParams = {};

  for (const [key, value] of Object.entries(merged)) {
    if (SAFE_PARAM_KEYS.has(key)) {
      safe[key] = value;
    }
  }

  return safe;
}

function callMetaPixel(eventName: string, params?: MetaPixelParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (!isPublicPath(currentPathname())) {
    return;
  }

  const command: MetaPixelCommand = STANDARD_EVENTS.has(eventName)
    ? "track"
    : "trackCustom";
  const eventParams = safeParams(params);

  if (import.meta.env.DEV) {
    console.debug("[Meta Pixel]", eventName, eventParams);
  }

  window.fbq(command, eventName, eventParams);
}

export function trackPixelEvent(eventName: string, params?: MetaPixelParams) {
  callMetaPixel(eventName, params);
}

export function trackPageView(params?: MetaPixelParams) {
  trackPixelEvent("PageView", params);
}

export function trackCTAClick(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_CTA_Click", params);
  trackGA4Event("cta_click", params);
}

export function trackFormModalOpen(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_FormModalOpen", params);
  trackGA4Event("form_modal_open", params);
}

export function trackFormModalClose(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_FormModalClose", params);
  trackGA4Event("form_modal_close", params);
}

export function trackFormStart(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_FormStart", params);
  trackGA4Event("form_start", {
    ...params,
    form_name: params?.form || params?.form_name,
  });
}

export function trackFormSubmitAttempt(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_FormSubmitAttempt", params);
  trackGA4Event("form_submit_attempt", {
    ...params,
    form_name: params?.form || params?.form_name,
  });
}

export function trackFormSubmitError(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_FormSubmitError", params);
  trackGA4Event("form_submit_error", {
    ...params,
    form_name: params?.form || params?.form_name,
  });
}

export function trackLead(params?: MetaPixelParams) {
  trackPixelEvent("Lead", params);
  trackGA4Event("generate_lead", {
    ...params,
    form_name: params?.form || params?.form_name,
  });
}

export function trackContact(params?: MetaPixelParams) {
  trackPixelEvent("Contact", params);
  trackGA4Event("contact", params);
}

export function trackWhatsAppClick(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_WhatsAppClick", params);
  trackGA4Event("whatsapp_click", params);
}

export function trackExternalProjectClick(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_ExternalProjectClick", params);
  trackGA4Event("external_project_click", params);
}

export function trackInstagramClick(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_InstagramClick", params);
  trackGA4Event("instagram_click", params);
}

export function trackViewContent(params?: MetaPixelParams) {
  trackPixelEvent("ViewContent", params);
  trackGA4Event("view_offer", params);
}

export function trackDuplicateLead(params?: MetaPixelParams) {
  trackPixelEvent("Readyflow_DuplicateLead", params);
}
