export type TrafficSourceGroup =
  | "paid_social"
  | "organic_search"
  | "organic_social"
  | "referral"
  | "direct"
  | "unknown";

export type TrafficAttribution = {
  traffic_source_group: TrafficSourceGroup;
  traffic_source_label: string;
  landing_page: string;
  current_page: string;
  referrer_domain: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  captured_at: string;
};

type StoredAttribution = {
  first_touch: TrafficAttribution;
  current_touch: TrafficAttribution;
};

const STORAGE_KEY = "readyflow-attribution-v1";

function clean(value: string | null | undefined, maxLength = 120): string {
  return Array.from(value || "")
    .filter((character) => character.charCodeAt(0) >= 32)
    .join("")
    .trim()
    .slice(0, maxLength);
}

function referrerDomain(referrer: string): string {
  try {
    return clean(new URL(referrer).hostname.toLowerCase(), 180);
  } catch {
    return "";
  }
}

function sourceFrom(
  params: URLSearchParams,
  domain: string,
): Pick<TrafficAttribution, "traffic_source_group" | "traffic_source_label"> {
  const source = clean(params.get("utm_source")).toLowerCase();
  const hasPaidMetaSignal = ["meta", "facebook", "instagram"].includes(source) || params.has("fbclid");
  if (hasPaidMetaSignal) return { traffic_source_group: "paid_social", traffic_source_label: "Paid Meta Ad" };
  if (params.has("gclid")) return { traffic_source_group: "unknown", traffic_source_label: "Unknown" };
  if (domain.includes("google.")) return { traffic_source_group: "organic_search", traffic_source_label: "Organic Search - Google" };
  if (domain.includes("bing.")) return { traffic_source_group: "organic_search", traffic_source_label: "Organic Search - Bing" };
  if (domain.includes("instagram.com") || domain.includes("facebook.com") || domain.includes("fb.com")) return { traffic_source_group: "organic_social", traffic_source_label: "Organic Social" };
  if (domain) return { traffic_source_group: "referral", traffic_source_label: "Referral" };
  return { traffic_source_group: "direct", traffic_source_label: "Direct / Unknown" };
}

function readStored(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    return parsed?.first_touch && parsed?.current_touch ? parsed : null;
  } catch {
    return null;
  }
}

function writeStored(value: StoredAttribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

export function captureTrafficAttribution(pathname?: string): TrafficAttribution | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const currentPage = clean(pathname || window.location.pathname || "/", 300) || "/";
  const domain = referrerDomain(document.referrer);
  const incoming: TrafficAttribution = {
    ...sourceFrom(params, domain),
    landing_page: currentPage,
    current_page: currentPage,
    referrer_domain: domain,
    utm_source: clean(params.get("utm_source")),
    utm_medium: clean(params.get("utm_medium")),
    utm_campaign: clean(params.get("utm_campaign")),
    utm_content: clean(params.get("utm_content")),
    utm_term: clean(params.get("utm_term")),
    captured_at: new Date().toISOString(),
  };
  const stored = readStored();
  const hasNewAcquisitionSignal = Boolean(
    incoming.utm_source || incoming.utm_medium || incoming.utm_campaign || params.has("fbclid") || params.has("gclid") || domain,
  );
  const current = !hasNewAcquisitionSignal && stored
    ? { ...stored.current_touch, current_page: currentPage, captured_at: incoming.captured_at }
    : incoming;
  const next = { first_touch: stored?.first_touch || incoming, current_touch: current };
  writeStored(next);
  return next.current_touch;
}

export function getLeadAttribution(): TrafficAttribution | null {
  return captureTrafficAttribution();
}
