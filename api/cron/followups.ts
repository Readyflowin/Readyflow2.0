import { timingSafeEqual } from "node:crypto";
import {
  getHeader,
  getQueryValue,
  type ApiRequest,
  type ApiResponse,
} from "../../server/apiTypes.js";
import { ServerConfigurationError, requireServerEnv } from "../../server/env.js";
import {
  sendFollowupEmail,
  type FollowupStage,
} from "../../server/followupEmails.js";
import {
  markFollowupSent,
  readLeadsFromGoogleSheets,
} from "../../server/googleSheets.js";
import type { DashboardLead } from "../../server/leadTypes.js";

const HOUR_MS = 60 * 60 * 1000;

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

function dueStages(lead: DashboardLead, ageMs: number): FollowupStage[] {
  const stages: FollowupStage[] = [];
  if (ageMs >= 24 * HOUR_MS && lead.followup24hSent !== "Yes") {
    stages.push("24h");
  }
  if (ageMs >= 72 * HOUR_MS && lead.followup72hSent !== "Yes") {
    stages.push("72h");
  }
  if (ageMs >= 7 * 24 * HOUR_MS && lead.followup7dSent !== "Yes") {
    stages.push("7d");
  }
  // Avoid sending multiple catch-up emails to an older lead in one cron run.
  return stages.slice(0, 1);
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
      sent24h: 0,
      sent72h: 0,
      sent7d: 0,
      skipped: 0,
      skippedClosed: 0,
      skippedLost: 0,
      errors: 0,
    };

    for (const lead of leads) {
      if (lead.status === "Closed") {
        summary.skippedClosed += 1;
        summary.skipped += 1;
        continue;
      }

      if (lead.status === "Lost") {
        summary.skippedLost += 1;
        summary.skipped += 1;
        continue;
      }

      if (!lead.email) {
        summary.skipped += 1;
        continue;
      }

      const timestamp = Date.parse(lead.timestamp);
      if (!Number.isFinite(timestamp)) {
        summary.skipped += 1;
        continue;
      }

      const stages = dueStages(lead, Date.now() - timestamp);
      if (stages.length === 0) {
        summary.skipped += 1;
        continue;
      }

      for (const stage of stages) {
        try {
          await sendFollowupEmail(lead, stage);
        } catch (error) {
          summary.errors += 1;
          console.error(
            `[api/cron/followups] ${stage} follow-up email failed for row ${lead.rowIndex}:`,
            error,
          );
          continue;
        }

        try {
          await markFollowupSent(lead.rowIndex, stage);
          if (stage === "24h") summary.sent24h += 1;
          if (stage === "72h") summary.sent72h += 1;
          if (stage === "7d") summary.sent7d += 1;
        } catch (error) {
          summary.errors += 1;
          console.error(
            `[api/cron/followups] ${stage} follow-up sent but Sheet update failed for row ${lead.rowIndex}:`,
            error,
          );
        }
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
