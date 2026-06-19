import { buildClearedAdminSessionCookie } from "../../server/adminAuth";
import type { ApiRequest, ApiResponse } from "../../server/apiTypes";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  res.setHeader("Set-Cookie", buildClearedAdminSessionCookie(req));
  res.status(200).json({ ok: true });
}
