import {
  buildAdminSessionCookie,
  createAdminSessionToken,
  isAdminRoute,
  validateAdminCredentials,
} from "../../server/adminAuth";
import {
  getHeader,
  parseRequestBody,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes";
import { ServerConfigurationError } from "../../server/env";

type LoginBody = {
  username?: unknown;
  password?: unknown;
  path?: unknown;
};

const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 6;
const loginAttempts = new Map<string, number[]>();

function loginKey(req: ApiRequest): string {
  const forwardedFor = getHeader(req.headers, "x-forwarded-for")
    .split(",")[0]
    ?.trim();
  const realIp = getHeader(req.headers, "x-real-ip");
  const userAgent = getHeader(req.headers, "user-agent").slice(0, 120);
  return `${forwardedFor || realIp || "unknown-ip"}|${userAgent}`;
}

function isLoginRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (loginAttempts.get(key) || []).filter(
    (timestamp) => now - timestamp < LOGIN_WINDOW_MS,
  );
  recent.push(now);
  loginAttempts.set(key, recent);
  return recent.length > LOGIN_MAX_ATTEMPTS;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    const key = loginKey(req);
    if (isLoginRateLimited(key)) {
      await delay(900);
      res.status(429).json({
        ok: false,
        message: "Too many attempts. Please wait and try again.",
      });
      return;
    }

    const body = parseRequestBody(req.body) as LoginBody | null;
    const username =
      typeof body?.username === "string" ? body.username.trim() : "";
    const password =
      typeof body?.password === "string" ? body.password : "";
    const path = typeof body?.path === "string" ? body.path : "";

    if (!username || !password || !isAdminRoute(path)) {
      await delay(350);
      res.status(401).json({ ok: false, message: "Invalid credentials." });
      return;
    }

    if (!validateAdminCredentials(username, password)) {
      await delay(600);
      res.status(401).json({ ok: false, message: "Invalid credentials." });
      return;
    }

    res.setHeader(
      "Set-Cookie",
      buildAdminSessionCookie(req, createAdminSessionToken()),
    );
    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/admin/login] Configuration error:", error.message);
    } else {
      console.error("[api/admin/login] Login failed:", error);
    }
    res.status(500).json({ ok: false, message: "Unable to sign in." });
  }
}
