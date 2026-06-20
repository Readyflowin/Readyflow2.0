import { randomUUID } from "node:crypto";
import { ServerConfigurationError, requireServerEnv } from "../server/env.js";
import { sendLeadEmails } from "../server/emails.js";
import {
  GoogleSheetsError,
  saveLeadToGoogleSheets,
} from "../server/googleSheets.js";
import { checkLeadProtection } from "../server/leadProtection.js";
import {
  getHeader,
  parseRequestBody,
  type ApiRequest,
  type ApiResponse,
} from "../server/apiTypes.js";
import type { StoredLead } from "../server/leadTypes.js";
import { validateLeadPayload } from "../server/validateLead.js";
import { buildWhatsAppUrl } from "../server/whatsapp.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  let payload: unknown;
  try {
    payload = parseRequestBody(req.body);
  } catch {
    res.status(400).json({ ok: false, message: "Invalid request body." });
    return;
  }

  const protection = checkLeadProtection(req, payload);
  if (protection.ok === false) {
    console.warn("[api/leads] Rejected lead submission:", protection.reason);
    res
      .status(protection.status)
      .json({ ok: false, message: protection.message });
    return;
  }

  const validation = validateLeadPayload(payload);
  if (validation.ok === false) {
    res.status(400).json({ ok: false, message: validation.message });
    return;
  }

  const timestamp = new Date().toISOString();
  const lead: StoredLead = {
    ...validation.data,
    timestamp,
    userAgent: getHeader(req.headers, "user-agent"),
    status: "New",
    internalNote: "",
    followup24hSent: "No",
    followup72hSent: "No",
    followup7dSent: "No",
    leadId: randomUUID(),
    lastContactedAt: "",
    closedAt: "",
    lostReason: "",
  };

  try {
    const whatsappUrl = buildWhatsAppUrl(
      requireServerEnv("WHATSAPP_NUMBER"),
      validation.data,
    );

    const saveResult = await saveLeadToGoogleSheets(lead);
    let emailWarning = "";

    if (!saveResult.duplicate) {
      try {
        await sendLeadEmails(lead, whatsappUrl);
      } catch (emailError) {
        emailWarning =
          "Your request was saved. If email does not arrive, continue on WhatsApp.";
        console.error("[api/leads] Lead saved but email failed:", emailError);
      }
    } else {
      console.info(
        "[api/leads] Duplicate lead updated without resending immediate emails.",
      );
    }

    res.status(200).json({
      ok: true,
      whatsappUrl,
      duplicate: saveResult.duplicate,
      message: emailWarning,
    });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/leads] Server configuration error:", error.message);
    } else if (error instanceof GoogleSheetsError && error.status === 403) {
      console.error(
        "[api/leads] Google Sheets permission denied. Share the sheet with GOOGLE_SHEETS_CLIENT_EMAIL as Editor.",
      );
      res.status(500).json({
        ok: false,
        message:
          "We could not save your request right now. Please message us on WhatsApp.",
      });
      return;
    } else {
      console.error("[api/leads] Lead processing failed:", error);
    }

    res.status(500).json({
      ok: false,
      message:
        "Something went wrong. Please try again or message us on WhatsApp.",
    });
  }
}
