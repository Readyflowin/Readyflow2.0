import { PUBLISHED_SEO_ROUTES } from "./seoRoutes";

export const PUBLIC_CORE_ROUTES = ["/", "/pricing", "/work"] as const;

export const PUBLIC_POLICY_ROUTES = [
  "/privacy-policy",
  "/terms",
  "/refund-cancellation-policy",
  "/delivery-scope-policy",
] as const;

export const PUBLIC_SEO_ROUTES = PUBLISHED_SEO_ROUTES.map(
  (route) => route.path,
);

export const PUBLIC_TRACKABLE_ROUTES = [
  ...PUBLIC_CORE_ROUTES,
  ...PUBLIC_POLICY_ROUTES,
  ...PUBLIC_SEO_ROUTES,
];

export function normalizePublicPath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function isPublicTrackablePath(pathname: string): boolean {
  return PUBLIC_TRACKABLE_ROUTES.includes(
    normalizePublicPath(pathname),
  );
}
