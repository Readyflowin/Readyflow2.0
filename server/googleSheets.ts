import { createSign, randomUUID } from "node:crypto";
import { requireServerEnv } from "./env.js";
import {
  LEAD_STATUSES,
  type DashboardLead,
  type EmailSequence,
  type LeadStatus,
  type PhotosReady,
  type ShopifyCostOkay,
  type StoredLead,
  type YesNo,
} from "./leadTypes.js";
import {
  computeNextEmailDueAt,
  getSequenceDefinition,
  type SequenceEmailType,
} from "./emailSequences.js";

const BASE_HEADERS = [
  "Timestamp",
  "Name",
  "Brand Instagram",
  "Product Type",
  "Photos Ready",
  "Shopify Cost Okay",
  "WhatsApp",
  "Email",
  "Requirement",
  "Status",
  "Internal Note",
  "Source",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "UTM Term",
  "FBCLID",
  "Page URL",
  "Traffic Source Group",
  "Traffic Source Label",
  "Landing Page",
  "Current Page",
  "Referrer Domain",
  "User Agent",
] as const;

const ADMIN_HEADERS = [
  "Lead ID",
  "Status Changed At",
  "Email Sequence",
  "Email Paused",
  "Last Email Sent",
  "Last Email Sent At",
  "Next Email Due At",
  "Last Email Error",
  "Email Notes",
  "Open Instant Sent",
  "Open 8h Sent",
  "Open 24h Sent",
  "Open 72h Sent",
  "Open Bonus Final Reminder Sent",
  "Open 7d Sent",
  "Interested Immediate Sent",
  "Interested 8h Sent",
  "Interested 24h Sent",
  "Interested Bonus Final Reminder Sent",
  "Interested 72h Sent",
  "Interested 7d Sent",
  "Closed Won Project Confirmed Sent",
  "Closed Won Content Checklist Sent",
  "Closed Won Build Started Sent",
  "Closed Won Review Handoff Sent",
  "Closed Won Support Reminder Sent",
  "Closed Won Review Request Sent",
  "Closed Lost Closing Email Sent",
  "Closed Lost Reactivation Email Sent",
  "Last Contacted At",
  "Closed At",
  "Lost Reason",
  "Project Confirmed At",
  "Content Received At",
  "Build Started At",
  "Project Delivered At",
  "Support Ends At",
  "Review Requested At",
  "Bonus Started At",
  "Bonus Expires At",
] as const;

const LEGACY_HEADERS = [
  "Followup 24h Sent",
  "Followup 72h Sent",
  "Followup 7d Sent",
] as const;

const REQUIRED_HEADERS = [
  ...BASE_HEADERS,
  ...LEGACY_HEADERS,
  ...ADMIN_HEADERS,
] as const;
const DUPLICATE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

type HeaderName = (typeof REQUIRED_HEADERS)[number];

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SpreadsheetMetadata = {
  sheets?: Array<{ properties?: { title?: string } }>;
};

type SheetValuesResponse = {
  values?: string[][];
};

type SheetContext = {
  spreadsheetId: string;
  accessToken: string;
  sheetTitle: string;
  headers: string[];
  headerIndex: Map<string, number>;
};

export type AdminLeadUpdate = {
  status?: LeadStatus;
  internalNote?: string;
  lostReason?: string;
  markContacted?: boolean;
  emailPaused?: YesNo;
  emailNotes?: string;
};

export type AdminLeadUpdateResult = {
  lead: DashboardLead;
  previousStatus: LeadStatus;
  statusChanged: boolean;
};

export class GoogleSheetsError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "GoogleSheetsError";
  }
}

export type SaveLeadResult =
  | { action: "created"; lead: StoredLead; duplicate: false }
  | { action: "updated"; lead: DashboardLead; duplicate: true };

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, "\n");
}

async function getGoogleAccessToken(): Promise<string> {
  const clientEmail = requireServerEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(
    requireServerEnv("GOOGLE_SHEETS_PRIVATE_KEY"),
  );
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(
    JSON.stringify({ alg: "RS256", typ: "JWT" }),
  );
  const claims = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(privateKey);
  const assertion = `${unsignedToken}.${base64UrlEncode(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const result = (await response.json()) as GoogleTokenResponse;
  if (!response.ok || !result.access_token) {
    throw new Error(
      `Google OAuth failed: ${result.error_description || result.error || response.status}`,
    );
  }

  return result.access_token;
}

async function googleRequest<T>(
  url: string,
  accessToken: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new GoogleSheetsError(
      `Google Sheets request failed (${response.status}): ${responseText.slice(0, 500)}`,
      response.status,
    );
  }

  if (response.status === 204) return {} as T;
  return (await response.json()) as T;
}

function escapeSheetTitle(title: string): string {
  return `'${title.replace(/'/g, "''")}'`;
}

function columnLetter(index: number): string {
  let result = "";
  let value = index + 1;

  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }

  return result;
}

async function getFirstSheetTitle(
  spreadsheetId: string,
  accessToken: string,
): Promise<string> {
  const metadata = await googleRequest<SpreadsheetMetadata>(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}?fields=sheets.properties.title`,
    accessToken,
  );
  const title = metadata.sheets?.[0]?.properties?.title;
  if (!title) throw new Error("The configured spreadsheet has no worksheet.");
  return title;
}

async function ensureHeaders(
  spreadsheetId: string,
  sheetTitle: string,
  accessToken: string,
): Promise<string[]> {
  const headerRange = `${escapeSheetTitle(sheetTitle)}!1:1`;
  const existing = await googleRequest<SheetValuesResponse>(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(headerRange)}`,
    accessToken,
  );
  const currentHeaders = (existing.values?.[0] || []).map((header) =>
    header.trim(),
  );
  const nextHeaders =
    currentHeaders.length === 0
      ? [...REQUIRED_HEADERS]
      : [
          ...currentHeaders,
          ...REQUIRED_HEADERS.filter(
            (requiredHeader) => !currentHeaders.includes(requiredHeader),
          ),
        ];

  if (
    nextHeaders.length === currentHeaders.length &&
    nextHeaders.every((header, index) => header === currentHeaders[index])
  ) {
    return currentHeaders;
  }

  const endColumn = columnLetter(nextHeaders.length - 1);
  const writeRange = `${escapeSheetTitle(sheetTitle)}!A1:${endColumn}1`;
  await googleRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(writeRange)}?valueInputOption=RAW`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify({ values: [nextHeaders] }),
    },
  );

  return nextHeaders;
}

async function getSheetContext(): Promise<SheetContext> {
  const spreadsheetId = requireServerEnv("GOOGLE_SHEETS_ID");
  const accessToken = await getGoogleAccessToken();
  const sheetTitle = await getFirstSheetTitle(spreadsheetId, accessToken);
  const headers = await ensureHeaders(
    spreadsheetId,
    sheetTitle,
    accessToken,
  );

  return {
    spreadsheetId,
    accessToken,
    sheetTitle,
    headers,
    headerIndex: new Map(headers.map((header, index) => [header, index])),
  };
}

function cell(
  row: string[],
  headerIndex: Map<string, number>,
  header: HeaderName,
): string {
  const index = headerIndex.get(header);
  return index === undefined ? "" : row[index] || "";
}

function normalizeStatus(value: string): LeadStatus {
  if (value === "New" || value === "Contacted") return "Open";
  if (value === "Closed" || value === "Lost") return "Closed Lost";
  return LEAD_STATUSES.includes(value as LeadStatus)
    ? (value as LeadStatus)
    : "Open";
}

function yesNo(value: string): YesNo {
  return value === "Yes" ? "Yes" : "No";
}

function sequenceForStatus(status: LeadStatus): EmailSequence {
  if (status === "Interested") return "Interested";
  if (status === "Closed Won") return "Closed Won Onboarding";
  if (status === "Closed Lost") return "Closed Lost";
  return "Open";
}

function normalizeEmailSequence(
  value: string,
  status: LeadStatus,
): EmailSequence {
  if (
    value === "Open" ||
    value === "Interested" ||
    value === "Closed Won Onboarding" ||
    value === "Closed Lost"
  ) {
    return value;
  }
  return sequenceForStatus(status);
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function isDuplicateCandidate(
  existingLead: DashboardLead,
  newLead: StoredLead,
): boolean {
  if (
    existingLead.status === "Closed Won" ||
    existingLead.status === "Closed Lost"
  ) {
    return false;
  }

  const existingTimestamp = Date.parse(existingLead.timestamp);
  if (
    Number.isFinite(existingTimestamp) &&
    Date.now() - existingTimestamp > DUPLICATE_WINDOW_MS
  ) {
    return false;
  }

  const existingEmail = existingLead.email.trim().toLowerCase();
  const newEmail = newLead.email.trim().toLowerCase();
  const existingPhone = normalizePhone(existingLead.whatsapp);
  const newPhone = normalizePhone(newLead.whatsapp);

  return Boolean(
    (existingEmail && newEmail && existingEmail === newEmail) ||
      (existingPhone &&
        newPhone &&
        existingPhone.length >= 10 &&
        newPhone.length >= 10 &&
        existingPhone === newPhone),
  );
}

function rowToLead(
  row: string[],
  rowIndex: number,
  headerIndex: Map<string, number>,
): DashboardLead {
  const status = normalizeStatus(cell(row, headerIndex, "Status"));
  const statusChangedAt =
    cell(row, headerIndex, "Status Changed At") ||
    cell(row, headerIndex, "Timestamp");
  const legacy24h = yesNo(cell(row, headerIndex, "Followup 24h Sent"));
  const legacy72h = yesNo(cell(row, headerIndex, "Followup 72h Sent"));
  const legacy7d = yesNo(cell(row, headerIndex, "Followup 7d Sent"));

  return {
    rowIndex,
    timestamp: cell(row, headerIndex, "Timestamp"),
    name: cell(row, headerIndex, "Name"),
    instagram: cell(row, headerIndex, "Brand Instagram"),
    productType: cell(row, headerIndex, "Product Type"),
    photosReady: cell(row, headerIndex, "Photos Ready") as PhotosReady | "",
    shopifyCostOkay: cell(
      row,
      headerIndex,
      "Shopify Cost Okay",
    ) as ShopifyCostOkay | "",
    whatsapp: cell(row, headerIndex, "WhatsApp"),
    email: cell(row, headerIndex, "Email"),
    requirement: cell(row, headerIndex, "Requirement"),
    status,
    statusChangedAt,
    emailSequence: normalizeEmailSequence(
      cell(row, headerIndex, "Email Sequence"),
      status,
    ),
    emailPaused: yesNo(cell(row, headerIndex, "Email Paused")),
    lastEmailSent: cell(row, headerIndex, "Last Email Sent"),
    lastEmailSentAt: cell(row, headerIndex, "Last Email Sent At"),
    nextEmailDueAt: cell(row, headerIndex, "Next Email Due At"),
    lastEmailError: cell(row, headerIndex, "Last Email Error"),
    emailNotes: cell(row, headerIndex, "Email Notes"),
    internalNote: cell(row, headerIndex, "Internal Note"),
    source: cell(row, headerIndex, "Source"),
    utm_source: cell(row, headerIndex, "UTM Source"),
    utm_medium: cell(row, headerIndex, "UTM Medium"),
    utm_campaign: cell(row, headerIndex, "UTM Campaign"),
    utm_content: cell(row, headerIndex, "UTM Content"),
    utm_term: cell(row, headerIndex, "UTM Term"),
    fbclid: cell(row, headerIndex, "FBCLID"),
    pageUrl: cell(row, headerIndex, "Page URL"),
    trafficSourceGroup: cell(row, headerIndex, "Traffic Source Group"),
    trafficSourceLabel: cell(row, headerIndex, "Traffic Source Label"),
    landingPage: cell(row, headerIndex, "Landing Page"),
    currentPage: cell(row, headerIndex, "Current Page"),
    referrerDomain: cell(row, headerIndex, "Referrer Domain"),
    userAgent: cell(row, headerIndex, "User Agent"),
    openInstantSent: yesNo(cell(row, headerIndex, "Open Instant Sent")),
    open8hSent: yesNo(cell(row, headerIndex, "Open 8h Sent")),
    open24hSent: yesNo(
      cell(row, headerIndex, "Open 24h Sent") ||
        cell(row, headerIndex, "Followup 24h Sent"),
    ),
    open72hSent: yesNo(
      cell(row, headerIndex, "Open 72h Sent") ||
        cell(row, headerIndex, "Followup 72h Sent"),
    ),
    openBonusFinalReminderSent: yesNo(
      cell(row, headerIndex, "Open Bonus Final Reminder Sent"),
    ),
    open7dSent: yesNo(
      cell(row, headerIndex, "Open 7d Sent") ||
        cell(row, headerIndex, "Followup 7d Sent"),
    ),
    interestedImmediateSent: yesNo(
      cell(row, headerIndex, "Interested Immediate Sent"),
    ),
    interested8hSent: yesNo(cell(row, headerIndex, "Interested 8h Sent")),
    interested24hSent: yesNo(cell(row, headerIndex, "Interested 24h Sent")),
    interestedBonusFinalReminderSent: yesNo(
      cell(row, headerIndex, "Interested Bonus Final Reminder Sent"),
    ),
    interested72hSent: yesNo(cell(row, headerIndex, "Interested 72h Sent")),
    interested7dSent: yesNo(cell(row, headerIndex, "Interested 7d Sent")),
    closedWonProjectConfirmedSent: yesNo(
      cell(row, headerIndex, "Closed Won Project Confirmed Sent"),
    ),
    closedWonContentChecklistSent: yesNo(
      cell(row, headerIndex, "Closed Won Content Checklist Sent"),
    ),
    closedWonBuildStartedSent: yesNo(
      cell(row, headerIndex, "Closed Won Build Started Sent"),
    ),
    closedWonReviewHandoffSent: yesNo(
      cell(row, headerIndex, "Closed Won Review Handoff Sent"),
    ),
    closedWonSupportReminderSent: yesNo(
      cell(row, headerIndex, "Closed Won Support Reminder Sent"),
    ),
    closedWonReviewRequestSent: yesNo(
      cell(row, headerIndex, "Closed Won Review Request Sent"),
    ),
    closedLostClosingEmailSent: yesNo(
      cell(row, headerIndex, "Closed Lost Closing Email Sent"),
    ),
    closedLostReactivationEmailSent: yesNo(
      cell(row, headerIndex, "Closed Lost Reactivation Email Sent"),
    ),
    followup24hSent: legacy24h,
    followup72hSent: legacy72h,
    followup7dSent: legacy7d,
    leadId: cell(row, headerIndex, "Lead ID"),
    lastContactedAt: cell(row, headerIndex, "Last Contacted At"),
    closedAt: cell(row, headerIndex, "Closed At"),
    lostReason: cell(row, headerIndex, "Lost Reason"),
    projectConfirmedAt: cell(row, headerIndex, "Project Confirmed At"),
    contentReceivedAt: cell(row, headerIndex, "Content Received At"),
    buildStartedAt: cell(row, headerIndex, "Build Started At"),
    projectDeliveredAt: cell(row, headerIndex, "Project Delivered At"),
    supportEndsAt: cell(row, headerIndex, "Support Ends At"),
    reviewRequestedAt: cell(row, headerIndex, "Review Requested At"),
    bonusStartedAt: cell(row, headerIndex, "Bonus Started At"),
    bonusExpiresAt: cell(row, headerIndex, "Bonus Expires At"),
  };
}

function leadToHeaderValues(lead: StoredLead): Record<HeaderName, string> {
  return {
    Timestamp: lead.timestamp,
    Name: lead.name,
    "Brand Instagram": lead.instagram,
    "Product Type": lead.productType,
    "Photos Ready": lead.photosReady,
    "Shopify Cost Okay": lead.shopifyCostOkay,
    WhatsApp: lead.whatsapp,
    Email: lead.email,
    Requirement: lead.requirement,
    Status: lead.status,
    "Internal Note": lead.internalNote,
    Source: lead.source,
    "UTM Source": lead.utm_source,
    "UTM Medium": lead.utm_medium,
    "UTM Campaign": lead.utm_campaign,
    "UTM Content": lead.utm_content,
    "UTM Term": lead.utm_term,
    FBCLID: lead.fbclid,
    "Page URL": lead.pageUrl,
    "Traffic Source Group": lead.trafficSourceGroup,
    "Traffic Source Label": lead.trafficSourceLabel,
    "Landing Page": lead.landingPage,
    "Current Page": lead.currentPage,
    "Referrer Domain": lead.referrerDomain,
    "User Agent": lead.userAgent,
    "Followup 24h Sent": lead.followup24hSent,
    "Followup 72h Sent": lead.followup72hSent,
    "Followup 7d Sent": lead.followup7dSent,
    "Lead ID": lead.leadId,
    "Status Changed At": lead.statusChangedAt,
    "Email Sequence": lead.emailSequence,
    "Email Paused": lead.emailPaused,
    "Last Email Sent": lead.lastEmailSent,
    "Last Email Sent At": lead.lastEmailSentAt,
    "Next Email Due At": lead.nextEmailDueAt,
    "Last Email Error": lead.lastEmailError,
    "Email Notes": lead.emailNotes,
    "Open Instant Sent": lead.openInstantSent,
    "Open 8h Sent": lead.open8hSent,
    "Open 24h Sent": lead.open24hSent,
    "Open 72h Sent": lead.open72hSent,
    "Open Bonus Final Reminder Sent": lead.openBonusFinalReminderSent,
    "Open 7d Sent": lead.open7dSent,
    "Interested Immediate Sent": lead.interestedImmediateSent,
    "Interested 8h Sent": lead.interested8hSent,
    "Interested 24h Sent": lead.interested24hSent,
    "Interested Bonus Final Reminder Sent":
      lead.interestedBonusFinalReminderSent,
    "Interested 72h Sent": lead.interested72hSent,
    "Interested 7d Sent": lead.interested7dSent,
    "Closed Won Project Confirmed Sent": lead.closedWonProjectConfirmedSent,
    "Closed Won Content Checklist Sent": lead.closedWonContentChecklistSent,
    "Closed Won Build Started Sent": lead.closedWonBuildStartedSent,
    "Closed Won Review Handoff Sent": lead.closedWonReviewHandoffSent,
    "Closed Won Support Reminder Sent": lead.closedWonSupportReminderSent,
    "Closed Won Review Request Sent": lead.closedWonReviewRequestSent,
    "Closed Lost Closing Email Sent": lead.closedLostClosingEmailSent,
    "Closed Lost Reactivation Email Sent": lead.closedLostReactivationEmailSent,
    "Last Contacted At": lead.lastContactedAt,
    "Closed At": lead.closedAt,
    "Lost Reason": lead.lostReason,
    "Project Confirmed At": lead.projectConfirmedAt,
    "Content Received At": lead.contentReceivedAt,
    "Build Started At": lead.buildStartedAt,
    "Project Delivered At": lead.projectDeliveredAt,
    "Support Ends At": lead.supportEndsAt,
    "Review Requested At": lead.reviewRequestedAt,
    "Bonus Started At": lead.bonusStartedAt,
    "Bonus Expires At": lead.bonusExpiresAt,
  };
}

async function readRows(context: SheetContext): Promise<string[][]> {
  const endColumn = columnLetter(context.headers.length - 1);
  const range = `${escapeSheetTitle(context.sheetTitle)}!A2:${endColumn}`;
  const result = await googleRequest<SheetValuesResponse>(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.spreadsheetId)}/values/${encodeURIComponent(range)}`,
    context.accessToken,
  );
  return result.values || [];
}

async function updateRowCells(
  context: SheetContext,
  rowIndex: number,
  updates: Partial<Record<HeaderName, string>>,
) {
  const data = Object.entries(updates).flatMap(([header, value]) => {
    const columnIndex = context.headerIndex.get(header);
    if (columnIndex === undefined) return [];
    const range = `${escapeSheetTitle(context.sheetTitle)}!${columnLetter(columnIndex)}${rowIndex}`;
    return [{ range, values: [[value || ""]] }];
  });

  if (data.length === 0) return;

  await googleRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.spreadsheetId)}/values:batchUpdate`,
    context.accessToken,
    {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data,
      }),
    },
  );
}

export async function appendLeadToGoogleSheets(lead: StoredLead) {
  const context = await getSheetContext();
  const values = leadToHeaderValues(lead);
  const row = context.headers.map(
    (header) => values[header as HeaderName] || "",
  );
  const range = encodeURIComponent(
    `${escapeSheetTitle(context.sheetTitle)}!A:${columnLetter(context.headers.length - 1)}`,
  );

  await googleRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    context.accessToken,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    },
  );
}

export async function saveLeadToGoogleSheets(
  lead: StoredLead,
): Promise<SaveLeadResult> {
  const context = await getSheetContext();
  const rows = await readRows(context);
  const existingLead = rows
    .map((row, index) => rowToLead(row, index + 2, context.headerIndex))
    .find((candidate) => isDuplicateCandidate(candidate, lead));

  if (!existingLead) {
    const values = leadToHeaderValues(lead);
    const row = context.headers.map(
      (header) => values[header as HeaderName] || "",
    );
    const range = encodeURIComponent(
      `${escapeSheetTitle(context.sheetTitle)}!A:${columnLetter(context.headers.length - 1)}`,
    );

    await googleRequest(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      context.accessToken,
      {
        method: "POST",
        body: JSON.stringify({ values: [row] }),
      },
    );

    return { action: "created", lead, duplicate: false };
  }

  const leadId = existingLead.leadId || lead.leadId;
  await updateRowCells(context, existingLead.rowIndex, {
    Timestamp: lead.timestamp,
    Name: lead.name,
    "Brand Instagram": lead.instagram,
    "Product Type": lead.productType,
    "Photos Ready": lead.photosReady,
    "Shopify Cost Okay": lead.shopifyCostOkay,
    WhatsApp: lead.whatsapp,
    Email: lead.email,
    Requirement: lead.requirement,
    Source: lead.source,
    "UTM Source": lead.utm_source,
    "UTM Medium": lead.utm_medium,
    "UTM Campaign": lead.utm_campaign,
    "UTM Content": lead.utm_content,
    "UTM Term": lead.utm_term,
    FBCLID: lead.fbclid,
    "Page URL": lead.pageUrl,
    "Traffic Source Group": lead.trafficSourceGroup,
    "Traffic Source Label": lead.trafficSourceLabel,
    "Landing Page": lead.landingPage,
    "Current Page": lead.currentPage,
    "Referrer Domain": lead.referrerDomain,
    "User Agent": lead.userAgent,
    "Lead ID": leadId,
  });

  return {
    action: "updated",
    duplicate: true,
    lead: {
      ...existingLead,
      ...lead,
      rowIndex: existingLead.rowIndex,
      leadId,
      status: existingLead.status,
      statusChangedAt: existingLead.statusChangedAt,
      emailSequence: existingLead.emailSequence,
      emailPaused: existingLead.emailPaused,
      lastEmailSent: existingLead.lastEmailSent,
      lastEmailSentAt: existingLead.lastEmailSentAt,
      nextEmailDueAt: existingLead.nextEmailDueAt,
      lastEmailError: existingLead.lastEmailError,
      emailNotes: existingLead.emailNotes,
      internalNote: existingLead.internalNote,
      openInstantSent: existingLead.openInstantSent,
      open8hSent: existingLead.open8hSent,
      open24hSent: existingLead.open24hSent,
      open72hSent: existingLead.open72hSent,
      openBonusFinalReminderSent: existingLead.openBonusFinalReminderSent,
      open7dSent: existingLead.open7dSent,
      interestedImmediateSent: existingLead.interestedImmediateSent,
      interested8hSent: existingLead.interested8hSent,
      interested24hSent: existingLead.interested24hSent,
      interestedBonusFinalReminderSent:
        existingLead.interestedBonusFinalReminderSent,
      interested72hSent: existingLead.interested72hSent,
      interested7dSent: existingLead.interested7dSent,
      closedWonProjectConfirmedSent:
        existingLead.closedWonProjectConfirmedSent,
      closedWonContentChecklistSent:
        existingLead.closedWonContentChecklistSent,
      closedWonBuildStartedSent: existingLead.closedWonBuildStartedSent,
      closedWonReviewHandoffSent: existingLead.closedWonReviewHandoffSent,
      closedWonSupportReminderSent: existingLead.closedWonSupportReminderSent,
      closedWonReviewRequestSent: existingLead.closedWonReviewRequestSent,
      closedLostClosingEmailSent: existingLead.closedLostClosingEmailSent,
      closedLostReactivationEmailSent:
        existingLead.closedLostReactivationEmailSent,
      followup24hSent: existingLead.followup24hSent,
      followup72hSent: existingLead.followup72hSent,
      followup7dSent: existingLead.followup7dSent,
      lastContactedAt: existingLead.lastContactedAt,
      closedAt: existingLead.closedAt,
      lostReason: existingLead.lostReason,
      projectConfirmedAt: existingLead.projectConfirmedAt,
      contentReceivedAt: existingLead.contentReceivedAt,
      buildStartedAt: existingLead.buildStartedAt,
      projectDeliveredAt: existingLead.projectDeliveredAt,
      supportEndsAt: existingLead.supportEndsAt,
      reviewRequestedAt: existingLead.reviewRequestedAt,
      bonusStartedAt: existingLead.bonusStartedAt,
      bonusExpiresAt: existingLead.bonusExpiresAt,
    },
  };
}

export async function readLeadsFromGoogleSheets(): Promise<DashboardLead[]> {
  const context = await getSheetContext();
  const rows = await readRows(context);

  return rows
    .map((row, index) => rowToLead(row, index + 2, context.headerIndex))
    .filter(
      (lead) =>
        lead.timestamp ||
        lead.name ||
        lead.email ||
        lead.instagram ||
        lead.whatsapp,
    )
    .reverse();
}

export async function updateLeadInGoogleSheets(
  identifier: { leadId?: string; rowIndex?: number },
  updates: AdminLeadUpdate,
): Promise<AdminLeadUpdateResult | null> {
  const context = await getSheetContext();
  const rows = await readRows(context);
  const leads = rows.map((row, index) =>
    rowToLead(row, index + 2, context.headerIndex),
  );
  const lead = identifier.leadId
    ? leads.find((item) => item.leadId === identifier.leadId)
    : leads.find((item) => item.rowIndex === identifier.rowIndex);

  if (!lead) return null;

  const now = new Date().toISOString();
  const leadId = lead.leadId || randomUUID();
  const status = updates.status || lead.status;
  const statusChanged = status !== lead.status;
  const statusChangedAt = statusChanged ? now : lead.statusChangedAt || now;
  const emailSequence = statusChanged
    ? sequenceForStatus(status)
    : lead.emailSequence;
  const emailPaused =
    updates.emailPaused === undefined ? lead.emailPaused : updates.emailPaused;
  const internalNote =
    updates.internalNote === undefined
      ? lead.internalNote
      : updates.internalNote.trim().slice(0, 5000);
  const emailNotes =
    updates.emailNotes === undefined
      ? lead.emailNotes
      : updates.emailNotes.trim().slice(0, 5000);
  const lostReason =
    updates.lostReason === undefined
      ? lead.lostReason
      : updates.lostReason.trim().slice(0, 1000);
  const lastContactedAt =
    updates.markContacted ||
    (statusChanged && ["Interested", "Closed Won", "Closed Lost"].includes(status))
      ? now
      : lead.lastContactedAt;
  const closedAt =
    status === "Closed Won" || status === "Closed Lost"
      ? lead.closedAt || now
      : lead.status === "Closed Won" || lead.status === "Closed Lost"
        ? ""
        : lead.closedAt;
  const projectConfirmedAt =
    status === "Closed Won" ? lead.projectConfirmedAt || now : lead.projectConfirmedAt;
  const enteredInterested = statusChanged && status === "Interested";
  const bonusStartedAt = enteredInterested
    ? now
    : lead.bonusStartedAt;
  const bonusExpiresAt = enteredInterested
    ? new Date(Date.parse(now) + 48 * 60 * 60 * 1000).toISOString()
    : lead.bonusExpiresAt;
  const nextLead: DashboardLead = {
    ...lead,
    leadId,
    status,
    statusChangedAt,
    emailSequence,
    emailPaused,
    internalNote,
    emailNotes,
    lostReason: status === "Closed Lost" ? lostReason : "",
    lastContactedAt,
    closedAt,
    projectConfirmedAt,
    bonusStartedAt,
    bonusExpiresAt,
    nextEmailDueAt: "",
  };
  const nextEmailDueAt = computeNextEmailDueAt(nextLead);

  await updateRowCells(context, lead.rowIndex, {
    "Lead ID": leadId,
    Status: status,
    "Status Changed At": statusChangedAt,
    "Email Sequence": emailSequence,
    "Email Paused": emailPaused,
    "Internal Note": internalNote,
    "Email Notes": emailNotes,
    "Lost Reason": status === "Closed Lost" ? lostReason : "",
    "Last Contacted At": lastContactedAt,
    "Closed At": closedAt,
    "Project Confirmed At": projectConfirmedAt,
    "Bonus Started At": bonusStartedAt,
    "Bonus Expires At": bonusExpiresAt,
    "Next Email Due At": nextEmailDueAt,
    "Last Email Error": statusChanged ? "" : lead.lastEmailError,
  });

  return {
    previousStatus: lead.status,
    statusChanged,
    lead: {
      ...nextLead,
      nextEmailDueAt,
      lastEmailError: statusChanged ? "" : lead.lastEmailError,
    },
  };
}

export async function markFollowupSent(
  rowIndex: number,
  stage: "24h" | "72h" | "7d",
) {
  const context = await getSheetContext();
  const headerByStage = {
    "24h": "Followup 24h Sent",
    "72h": "Followup 72h Sent",
    "7d": "Followup 7d Sent",
  } as const;
  await updateRowCells(context, rowIndex, {
    [headerByStage[stage]]: "Yes",
  });
}

export async function findLeadInGoogleSheets(identifier: {
  leadId?: string;
  rowIndex?: number;
}): Promise<DashboardLead | null> {
  const context = await getSheetContext();
  const rows = await readRows(context);
  const leads = rows.map((row, index) =>
    rowToLead(row, index + 2, context.headerIndex),
  );
  return identifier.leadId
    ? leads.find((lead) => lead.leadId === identifier.leadId) || null
    : leads.find((lead) => lead.rowIndex === identifier.rowIndex) || null;
}

function sequenceFlagHeader(type: SequenceEmailType): HeaderName {
  const definition = getSequenceDefinition(type);
  const headersByFlag = {
    openInstantSent: "Open Instant Sent",
    open8hSent: "Open 8h Sent",
    open24hSent: "Open 24h Sent",
    open72hSent: "Open 72h Sent",
    openBonusFinalReminderSent: "Open Bonus Final Reminder Sent",
    open7dSent: "Open 7d Sent",
    interestedImmediateSent: "Interested Immediate Sent",
    interested8hSent: "Interested 8h Sent",
    interested24hSent: "Interested 24h Sent",
    interestedBonusFinalReminderSent: "Interested Bonus Final Reminder Sent",
    interested72hSent: "Interested 72h Sent",
    interested7dSent: "Interested 7d Sent",
    closedWonProjectConfirmedSent: "Closed Won Project Confirmed Sent",
    closedWonContentChecklistSent: "Closed Won Content Checklist Sent",
    closedWonBuildStartedSent: "Closed Won Build Started Sent",
    closedWonReviewHandoffSent: "Closed Won Review Handoff Sent",
    closedWonSupportReminderSent: "Closed Won Support Reminder Sent",
    closedWonReviewRequestSent: "Closed Won Review Request Sent",
    closedLostClosingEmailSent: "Closed Lost Closing Email Sent",
    closedLostReactivationEmailSent: "Closed Lost Reactivation Email Sent",
  } as const satisfies Record<typeof definition.flag, HeaderName>;

  return headersByFlag[definition.flag];
}

export async function markSequenceEmailSent(
  identifier: { leadId?: string; rowIndex?: number },
  type: SequenceEmailType,
): Promise<DashboardLead | null> {
  const context = await getSheetContext();
  const rows = await readRows(context);
  const leads = rows.map((row, index) =>
    rowToLead(row, index + 2, context.headerIndex),
  );
  const lead = identifier.leadId
    ? leads.find((item) => item.leadId === identifier.leadId)
    : leads.find((item) => item.rowIndex === identifier.rowIndex);

  if (!lead) return null;

  const definition = getSequenceDefinition(type);
  const sentAt = new Date().toISOString();
  const nextLead = {
    ...lead,
    [definition.flag]: "Yes",
    lastEmailSent: type,
    lastEmailSentAt: sentAt,
    lastEmailError: "",
  } as DashboardLead;
  const nextEmailDueAt = computeNextEmailDueAt(nextLead);

  await updateRowCells(context, lead.rowIndex, {
    [sequenceFlagHeader(type)]: "Yes",
    "Last Email Sent": type,
    "Last Email Sent At": sentAt,
    "Last Email Error": "",
    "Next Email Due At": nextEmailDueAt,
  });

  return {
    ...nextLead,
    nextEmailDueAt,
  };
}

export async function recordSequenceEmailError(
  identifier: { leadId?: string; rowIndex?: number },
  type: SequenceEmailType,
  error: unknown,
) {
  const context = await getSheetContext();
  const rows = await readRows(context);
  const leads = rows.map((row, index) =>
    rowToLead(row, index + 2, context.headerIndex),
  );
  const lead = identifier.leadId
    ? leads.find((item) => item.leadId === identifier.leadId)
    : leads.find((item) => item.rowIndex === identifier.rowIndex);
  if (!lead) return;

  const message =
    error instanceof Error ? error.message : "Unknown email send error";
  await updateRowCells(context, lead.rowIndex, {
    "Last Email Error": `${type}: ${message}`.slice(0, 1000),
  });
}

export async function updateNextEmailDueInGoogleSheets(
  lead: DashboardLead,
): Promise<void> {
  const context = await getSheetContext();
  await updateRowCells(context, lead.rowIndex, {
    "Next Email Due At": computeNextEmailDueAt(lead),
  });
}
