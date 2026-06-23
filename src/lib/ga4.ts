export type GA4Params = Record<string, unknown>;
import { isPublicTrackablePath } from "./publicRoutes";

type GtagCommand = "js" | "config" | "event";
type GtagFunction = (
  command: GtagCommand,
  target: string | Date,
  params?: GA4Params,
) => void;

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

const SAFE_DEFAULT_PARAMS: GA4Params = {
  offer: "instagram_brand_shopify_launch",
  package_price: "14999",
};

const SAFE_PARAM_KEYS = new Set([
  "page_path",
  "page_title",
  "offer",
  "package_price",
  "value",
  "currency",
  "section",
  "cta_label",
  "destination",
  "source_section",
  "cta_source",
  "channel",
  "form_name",
  "error_type",
  "status",
  "destination_type",
  "project_category",
  "article_slug",
  "article_title",
  "article_category",
  "scroll_depth",
  "active_time_seconds",
  "traffic_source_group",
  "traffic_source_label",
]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

function currentPathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

function isPublicPath(pathname: string): boolean {
  return isPublicTrackablePath(pathname);
}

function hasMeasurementId(): boolean {
  return Boolean(GA_MEASUREMENT_ID?.trim());
}

function safeParams(params?: GA4Params): GA4Params {
  const merged = {
    ...SAFE_DEFAULT_PARAMS,
    page_path: currentPathname(),
    ...params,
  };
  const safe: GA4Params = {};

  for (const [key, value] of Object.entries(merged)) {
    if (SAFE_PARAM_KEYS.has(key) && value !== undefined && value !== "") {
      safe[key] = key === "page_path" ? currentPathname() : value;
    }
  }

  return safe;
}

export function loadGA4() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (!hasMeasurementId() || !isPublicPath(currentPathname())) {
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args) {
      window.dataLayer?.push(args);
    } as GtagFunction;
  }

  const scriptId = "readyflow-ga4";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GA_MEASUREMENT_ID || "",
    )}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID || "", {
      send_page_view: false,
    });
  }
}

export function trackGA4PageView(pagePath?: string) {
  if (typeof window === "undefined" || !hasMeasurementId()) return;
  const pathname = pagePath || currentPathname();
  if (!isPublicPath(pathname) || typeof window.gtag !== "function") return;

  const eventParams = safeParams({
    page_path: pathname,
    page_title: document.title,
  });

  if (import.meta.env.DEV) {
    console.debug("[GA4]", "page_view", eventParams);
  }

  window.gtag("event", "page_view", eventParams);
}

export function trackGA4Event(eventName: string, params?: GA4Params) {
  if (typeof window === "undefined" || !hasMeasurementId()) return;
  if (!isPublicPath(currentPathname()) || typeof window.gtag !== "function") {
    return;
  }

  const eventParams = safeParams(params);

  if (import.meta.env.DEV) {
    console.debug("[GA4]", eventName, eventParams);
  }

  window.gtag("event", eventName, eventParams);
}
