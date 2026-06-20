import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { getHeader, type ApiRequest } from "./apiTypes.js";
import { requireServerEnv } from "./env.js";

const COOKIE_NAME = "readyflow_admin_session";
const SESSION_DURATION_SECONDS = 24 * 60 * 60;

type SessionPayload = {
  exp: number;
  nonce: string;
  usernameHash: string;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function secureEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function getSessionSecret(): string {
  return createHash("sha256")
    .update(requireServerEnv("ADMIN_USERNAME"))
    .update("\0")
    .update(requireServerEnv("ADMIN_PASSWORD"))
    .update("\0")
    .update(requireServerEnv("ADMIN_SECRET_SLUG"))
    .digest("hex");
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader.split(";").reduce<Record<string, string>>(
    (cookies, cookie) => {
      const separator = cookie.indexOf("=");
      if (separator === -1) return cookies;
      const name = cookie.slice(0, separator).trim();
      const value = cookie.slice(separator + 1).trim();
      if (name) cookies[name] = value;
      return cookies;
    },
    {},
  );
}

function isSecureRequest(req: ApiRequest): boolean {
  return getHeader(req.headers, "x-forwarded-proto")
    .split(",")[0]
    ?.trim() === "https";
}

export function isAdminRoute(pathname: string): boolean {
  const slug = requireServerEnv("ADMIN_SECRET_SLUG").replace(
    /^\/+|\/+$/g,
    "",
  );
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath === `/${slug}`;
}

export function validateAdminCredentials(
  username: string,
  password: string,
): boolean {
  return (
    secureEqual(username, requireServerEnv("ADMIN_USERNAME")) &&
    secureEqual(password, requireServerEnv("ADMIN_PASSWORD"))
  );
}

export function createAdminSessionToken(): string {
  const username = requireServerEnv("ADMIN_USERNAME");
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    nonce: randomBytes(16).toString("hex"),
    usernameHash: createHash("sha256").update(username).digest("hex"),
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function isAdminAuthenticated(req: ApiRequest): boolean {
  const cookieHeader = getHeader(req.headers, "cookie");
  const token = parseCookies(cookieHeader)[COOKIE_NAME];
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;
  if (!secureEqual(signature, signPayload(encodedPayload))) return false;

  try {
    const payload = JSON.parse(
      base64UrlDecode(encodedPayload),
    ) as SessionPayload;
    const expectedUsernameHash = createHash("sha256")
      .update(requireServerEnv("ADMIN_USERNAME"))
      .digest("hex");
    return (
      payload.exp > Math.floor(Date.now() / 1000) &&
      secureEqual(payload.usernameHash, expectedUsernameHash)
    );
  } catch {
    return false;
  }
}

export function buildAdminSessionCookie(
  req: ApiRequest,
  token: string,
): string {
  const secure = isSecureRequest(req) ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}${secure}`;
}

export function buildClearedAdminSessionCookie(req: ApiRequest): string {
  const secure = isSecureRequest(req) ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
