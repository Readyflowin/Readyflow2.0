import { getHeader, type ApiRequest } from "./apiTypes";

type UnknownRecord = Record<string, unknown>;

const MIN_COMPLETION_MS = 2500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 8;
const REPEAT_WINDOW_MS = 2 * 60 * 1000;

const rateLimitStore = new Map<string, number[]>();
const repeatSubmissionStore = new Map<string, number>();

const DISPOSABLE_EMAIL_PATTERNS = [
  /10minutemail/i,
  /guerrillamail/i,
  /mailinator/i,
  /tempmail/i,
  /throwaway/i,
  /yopmail/i,
];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function clientKey(req: ApiRequest): string {
  const forwardedFor = getHeader(req.headers, "x-forwarded-for")
    .split(",")[0]
    ?.trim();
  const realIp = getHeader(req.headers, "x-real-ip");
  const userAgent = getHeader(req.headers, "user-agent").slice(0, 180);
  return `${forwardedFor || realIp || "unknown-ip"}|${userAgent || "unknown-ua"}`;
}

function normalizeRepeatKey(payload: UnknownRecord): string {
  return [
    getString(payload.email).toLowerCase(),
    getString(payload.whatsapp).replace(/\D/g, ""),
    getString(payload.instagram).toLowerCase(),
  ].join("|");
}

function rateLimitOk(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitStore.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  rateLimitStore.set(key, recent);
  return recent.length <= RATE_LIMIT_MAX_ATTEMPTS;
}

function repeatOk(key: string): boolean {
  if (!key.replace(/\|/g, "")) return true;
  const now = Date.now();
  const lastSeen = repeatSubmissionStore.get(key);
  repeatSubmissionStore.set(key, now);
  return !lastSeen || now - lastSeen > REPEAT_WINDOW_MS;
}

function completionTimeOk(payload: UnknownRecord): boolean {
  const startedAt =
    typeof payload.formStartedAt === "number"
      ? payload.formStartedAt
      : Number(getString(payload.formStartedAt));
  return Number.isFinite(startedAt) && Date.now() - startedAt >= MIN_COMPLETION_MS;
}

function emailLooksFake(email: string): boolean {
  if (!email) return false;
  const [localPart = "", domain = ""] = email.toLowerCase().split("@");
  if (!domain || localPart.length < 2) return true;
  if (/(.)\1{5,}/.test(localPart)) return true;
  if (/^(test|asdf|qwerty|fake|none|nope)(\d+)?$/.test(localPart)) {
    return true;
  }
  return DISPOSABLE_EMAIL_PATTERNS.some((pattern) => pattern.test(domain));
}

export type LeadProtectionResult =
  | { ok: true }
  | { ok: false; status: number; message: string; reason: string };

export function checkLeadProtection(
  req: ApiRequest,
  payload: unknown,
): LeadProtectionResult {
  if (!isRecord(payload)) {
    return {
      ok: false,
      status: 400,
      message: "Invalid request body.",
      reason: "invalid_body",
    };
  }

  const honeypot = getString(payload.companyWebsite || payload.website || "");
  if (honeypot) {
    return {
      ok: false,
      status: 400,
      message: "Something went wrong. Please try again.",
      reason: "honeypot_filled",
    };
  }

  if (!completionTimeOk(payload)) {
    return {
      ok: false,
      status: 400,
      message: "Please wait a moment and try again.",
      reason: "submitted_too_fast",
    };
  }

  if (!rateLimitOk(clientKey(req))) {
    return {
      ok: false,
      status: 429,
      message: "Too many attempts. Please wait a few minutes and try again.",
      reason: "rate_limited",
    };
  }

  if (emailLooksFake(getString(payload.email))) {
    return {
      ok: false,
      status: 400,
      message: "Please enter a valid email address.",
      reason: "fake_email",
    };
  }

  if (!repeatOk(normalizeRepeatKey(payload))) {
    return {
      ok: false,
      status: 429,
      message: "Your request was already received. Please continue on WhatsApp.",
      reason: "repeated_submission",
    };
  }

  return { ok: true };
}
