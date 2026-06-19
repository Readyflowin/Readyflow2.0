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

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function callMetaPixel(
  command: MetaPixelCommand,
  eventName: string,
  params?: MetaPixelParams,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq(command, eventName, { ...SAFE_DEFAULT_PARAMS, ...params });
}

export function trackPageView(params?: MetaPixelParams) {
  callMetaPixel("track", "PageView", params);
}

export function trackEvent(eventName: string, params?: MetaPixelParams) {
  callMetaPixel("trackCustom", eventName, params);
}

export function trackLead(params?: MetaPixelParams) {
  callMetaPixel("track", "Lead", params);
}

export function trackWhatsAppClick(params?: MetaPixelParams) {
  trackEvent("WhatsAppClick", params);
}
