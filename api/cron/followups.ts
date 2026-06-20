import { timingSafeEqual } from "node:crypto";
import {
  getHeader,
  getQueryValue,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes.js";
import {
  nextDueEmailForLead,
  sendSequenceEmail,
} from "../../server/emailSequences.js";
import { ServerConfigurationError, requireServerEnv } from "../../server/env.js";
import {
  markSequenceEmailSent,
  readLeadsFromGoogleSheets,
  recordSequenceEmailError,
  updateNextEmailDueInGoogleSheets,
} from "../../server/googleSheets.js";

function secureEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function isAuthorized(req: ApiRequest): boolean {
  const expected = requireServerEnv("CRON_SECRET");
  const authorization = getHeader(req.headers, "authorization");
  const bearer = authorization.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : "";
  const querySecret = getQueryValue(req.query, "secret");
  return Boolean(
    (bearer && secureEqual(bearer, expected)) ||
      (querySecret && secureEqual(querySecret, expected)),
  );
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    if (!isAuthorized(req)) {
      res.status(401).json({ ok: false, message: "Unauthorized." });
      return;
    }

    const leads = await readLeadsFromGoogleSheets();
    const summary = {
      checked: leads.length,
      sent: 0,
      skipped: 0,
      skippedPaused: 0,
      skippedMissingEmail: 0,
      skippedNotDue: 0,
      errors: 0,
      sentTypes: {} as Record<string, number>,
    };

    for (const lead of leads) {
      if (lead.emailPaused === "Yes") {
        summary.skippedPaused += 1;
        summary.skipped += 1;
        continue;
      }

      if (!lead.email) {
        summary.skippedMissingEmail += 1;
        summary.skipped += 1;
        continue;
      }

      const dueEmail = nextDueEmailForLead(lead);
      if (!dueEmail) {
        summary.skippedNotDue += 1;
        summary.skipped += 1;
        await updateNextEmailDueInGoogleSheets(lead).catch(() => undefined);
        continue;
      }

      try {
        await sendSequenceEmail(lead, dueEmail.type);
        await markSequenceEmailSent(
          { leadId: lead.leadId, rowIndex: lead.rowIndex },
          dueEmail.type,
        );
        summary.sent += 1;
        summary.sentTypes[dueEmail.type] =
          (summary.sentTypes[dueEmail.type] || 0) + 1;
      } catch (error) {
        summary.errors += 1;
        console.error(
          `[api/cron/followups] ${dueEmail.type} failed for row ${lead.rowIndex}:`,
          error,
        );
        await recordSequenceEmailError(
          { leadId: lead.leadId, rowIndex: lead.rowIndex },
          dueEmail.type,
          error,
        ).catch(() => undefined);
      }
    }

    console.info("[api/cron/followups] Summary:", summary);
    res.status(200).json({ ok: true, ...summary });
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      console.error("[api/cron/followups] Configuration error:", error.message);
    } else {
      console.error("[api/cron/followups] Cron failed:", error);
    }
    res.status(500).json({
      ok: false,
      message: "Unable to process follow-up emails.",
    });
  }
}
