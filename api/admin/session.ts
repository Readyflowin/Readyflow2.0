import {
  isAdminAuthenticated,
  isAdminRoute,
} from "../../server/adminAuth";
import {
  getQueryValue,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes";
import { ServerConfigurationError } from "../../server/env";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    const adminRoute = isAdminRoute(getQueryValue(req.query, "path"));
    res.status(200).json({
      ok: true,
      adminRoute,
      authenticated: adminRoute && isAdminAuthenticated(req),
    });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/admin/session] Configuration error:", error.message);
    } else {
      console.error("[api/admin/session] Session check failed:", error);
    }
    res.status(500).json({ ok: false, message: "Unable to check session." });
  }
}
