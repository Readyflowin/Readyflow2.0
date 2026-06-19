import { isAdminAuthenticated } from "../../server/adminAuth";
import {
  parseRequestBody,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes";
import { ServerConfigurationError } from "../../server/env";
import {
  GoogleSheetsError,
  readLeadsFromGoogleSheets,
  updateLeadInGoogleSheets,
} from "../../server/googleSheets";
import {
  LEAD_STATUSES,
  type LeadStatus,
} from "../../server/leadTypes";

type UpdateBody = {
  leadId?: unknown;
  rowIndex?: unknown;
  status?: unknown;
  internalNote?: unknown;
  lostReason?: unknown;
  markContacted?: unknown;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  try {
    if (!isAdminAuthenticated(req)) {
      res.status(401).json({ ok: false, message: "Unauthorized." });
      return;
    }

    if (req.method === "GET") {
      const leads = await readLeadsFromGoogleSheets();
      res.status(200).json({ ok: true, leads });
      return;
    }

    if (req.method === "PATCH") {
      const body = parseRequestBody(req.body) as UpdateBody | null;
      const leadId =
        typeof body?.leadId === "string" ? body.leadId.trim() : "";
      const rowIndex =
        typeof body?.rowIndex === "number" &&
        Number.isInteger(body.rowIndex) &&
        body.rowIndex >= 2
          ? body.rowIndex
          : undefined;
      const status =
        typeof body?.status === "string" &&
        LEAD_STATUSES.includes(body.status as LeadStatus)
          ? (body.status as LeadStatus)
          : undefined;
      const internalNote =
        typeof body?.internalNote === "string"
          ? body.internalNote
          : undefined;
      const lostReason =
        typeof body?.lostReason === "string" ? body.lostReason : undefined;
      const markContacted = body?.markContacted === true;

      if (
        (!leadId && !rowIndex) ||
        (!status &&
          internalNote === undefined &&
          lostReason === undefined &&
          !markContacted)
      ) {
        res.status(400).json({ ok: false, message: "Invalid lead update." });
        return;
      }

      const lead = await updateLeadInGoogleSheets(
        { leadId: leadId || undefined, rowIndex },
        { status, internalNote, lostReason, markContacted },
      );

      if (!lead) {
        res.status(404).json({ ok: false, message: "Lead not found." });
        return;
      }

      res.status(200).json({ ok: true, lead });
      return;
    }

    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).json({ ok: false, message: "Method not allowed." });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/admin/leads] Configuration error:", error.message);
    } else if (error instanceof GoogleSheetsError && error.status === 403) {
      console.error(
        "[api/admin/leads] Google Sheets permission denied. Share the sheet with GOOGLE_SHEETS_CLIENT_EMAIL as Editor.",
      );
      res.status(500).json({
        ok: false,
        message:
          "Google Sheets permission denied. Share the sheet with the service account as Editor.",
      });
      return;
    } else {
      console.error("[api/admin/leads] Request failed:", error);
    }
    res.status(500).json({
      ok: false,
      message:
        "Unable to process leads. Check Sheets permissions and server configuration.",
    });
  }
}
