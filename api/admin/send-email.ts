import { isAdminAuthenticated } from "../../server/adminAuth.js";
import {
  getSequenceDefinition,
  isSequenceEmailType,
  sendSequenceEmail,
} from "../../server/emailSequences.js";
import {
  parseRequestBody,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes.js";
import { ServerConfigurationError } from "../../server/env.js";
import {
  findLeadInGoogleSheets,
  GoogleSheetsError,
  markSequenceEmailSent,
  recordSequenceEmailError,
} from "../../server/googleSheets.js";

type SendEmailBody = {
  leadId?: unknown;
  rowIndex?: unknown;
  emailType?: unknown;
  force?: unknown;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  try {
    if (!isAdminAuthenticated(req)) {
      res.status(401).json({ ok: false, message: "Unauthorized." });
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ ok: false, message: "Method not allowed." });
      return;
    }

    const body = parseRequestBody(req.body) as SendEmailBody | null;
    const leadId = typeof body?.leadId === "string" ? body.leadId.trim() : "";
    const rowIndex =
      typeof body?.rowIndex === "number" &&
      Number.isInteger(body.rowIndex) &&
      body.rowIndex >= 2
        ? body.rowIndex
        : undefined;
    const emailType =
      typeof body?.emailType === "string" &&
      isSequenceEmailType(body.emailType)
        ? body.emailType
        : "";
    const force = body?.force === true;

    if ((!leadId && !rowIndex) || !emailType) {
      res.status(400).json({ ok: false, message: "Invalid email request." });
      return;
    }

    const lead = await findLeadInGoogleSheets({
      leadId: leadId || undefined,
      rowIndex,
    });

    if (!lead) {
      res.status(404).json({ ok: false, message: "Lead not found." });
      return;
    }

    if (!lead.email) {
      res.status(400).json({ ok: false, message: "Lead has no email." });
      return;
    }

    if (lead.emailPaused === "Yes" && !force) {
      res.status(409).json({
        ok: false,
        message: "Emails are paused for this lead. Resume or force send.",
      });
      return;
    }

    const definition = getSequenceDefinition(emailType);
    if (definition.status !== lead.status) {
      res.status(409).json({
        ok: false,
        message: `This email belongs to ${definition.status} leads.`,
      });
      return;
    }

    try {
      await sendSequenceEmail(lead, emailType);
    } catch (error) {
      await recordSequenceEmailError(
        { leadId: lead.leadId, rowIndex: lead.rowIndex },
        emailType,
        error,
      ).catch(() => undefined);
      throw error;
    }

    const updatedLead =
      (await markSequenceEmailSent(
        { leadId: lead.leadId, rowIndex: lead.rowIndex },
        emailType,
      )) || lead;

    res.status(200).json({ ok: true, lead: updatedLead });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/admin/send-email] Configuration error:", error.message);
    } else if (error instanceof GoogleSheetsError && error.status === 403) {
      console.error(
        "[api/admin/send-email] Google Sheets permission denied. Share the sheet with GOOGLE_SHEETS_CLIENT_EMAIL as Editor.",
      );
      res.status(500).json({
        ok: false,
        message:
          "Google Sheets permission denied. Share the sheet with the service account as Editor.",
      });
      return;
    } else {
      console.error("[api/admin/send-email] Request failed:", error);
    }

    res.status(500).json({
      ok: false,
      message: "Unable to send this email. Check Resend and server logs.",
    });
  }
}
