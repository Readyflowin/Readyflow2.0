import { createSign, randomUUID } from "node:crypto";
import { requireServerEnv } from "./env";
import {
  LEAD_STATUSES,
  type DashboardLead,
  type LeadStatus,
  type PhotosReady,
  type ShopifyCostOkay,
  type StoredLead,
} from "./leadTypes";

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
  "User Agent",
  "Followup 24h Sent",
  "Followup 72h Sent",
  "Followup 7d Sent",
] as const;

const ADMIN_HEADERS = [
  "Lead ID",
  "Last Contacted At",
  "Closed At",
  "Lost Reason",
] as const;

const REQUIRED_HEADERS = [...BASE_HEADERS, ...ADMIN_HEADERS] as const;
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
  return LEAD_STATUSES.includes(value as LeadStatus)
    ? (value as LeadStatus)
    : "New";
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function isDuplicateCandidate(
  existingLead: DashboardLead,
  newLead: StoredLead,
): boolean {
  if (existingLead.status === "Closed" || existingLead.status === "Lost") {
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
    status: normalizeStatus(cell(row, headerIndex, "Status")),
    internalNote: cell(row, headerIndex, "Internal Note"),
    source: cell(row, headerIndex, "Source"),
    utm_source: cell(row, headerIndex, "UTM Source"),
    utm_medium: cell(row, headerIndex, "UTM Medium"),
    utm_campaign: cell(row, headerIndex, "UTM Campaign"),
    utm_content: cell(row, headerIndex, "UTM Content"),
    utm_term: cell(row, headerIndex, "UTM Term"),
    fbclid: cell(row, headerIndex, "FBCLID"),
    pageUrl: cell(row, headerIndex, "Page URL"),
    userAgent: cell(row, headerIndex, "User Agent"),
    followup24hSent:
      cell(row, headerIndex, "Followup 24h Sent") === "Yes" ? "Yes" : "No",
    followup72hSent:
      cell(row, headerIndex, "Followup 72h Sent") === "Yes" ? "Yes" : "No",
    followup7dSent:
      cell(row, headerIndex, "Followup 7d Sent") === "Yes" ? "Yes" : "No",
    leadId: cell(row, headerIndex, "Lead ID"),
    lastContactedAt: cell(row, headerIndex, "Last Contacted At"),
    closedAt: cell(row, headerIndex, "Closed At"),
    lostReason: cell(row, headerIndex, "Lost Reason"),
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
    "User Agent": lead.userAgent,
    "Followup 24h Sent": lead.followup24hSent,
    "Followup 72h Sent": lead.followup72hSent,
    "Followup 7d Sent": lead.followup7dSent,
    "Lead ID": lead.leadId,
    "Last Contacted At": lead.lastContactedAt,
    "Closed At": lead.closedAt,
    "Lost Reason": lead.lostReason,
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
      internalNote: existingLead.internalNote,
      followup24hSent: existingLead.followup24hSent,
      followup72hSent: existingLead.followup72hSent,
      followup7dSent: existingLead.followup7dSent,
      lastContactedAt: existingLead.lastContactedAt,
      closedAt: existingLead.closedAt,
      lostReason: existingLead.lostReason,
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

  const now = new Date().toISOString();
  const leadId = lead.leadId || randomUUID();
  const status = updates.status || lead.status;
  const internalNote =
    updates.internalNote === undefined
      ? lead.internalNote
      : updates.internalNote.trim().slice(0, 5000);
  const lostReason =
    updates.lostReason === undefined
      ? lead.lostReason
      : updates.lostReason.trim().slice(0, 1000);
  const lastContactedAt =
    updates.markContacted ||
    (status !== lead.status && ["Contacted", "Interested"].includes(status))
      ? now
      : lead.lastContactedAt;
  const closedAt =
    status === "Closed"
      ? lead.closedAt || now
      : lead.status === "Closed"
        ? ""
        : lead.closedAt;

  await updateRowCells(context, lead.rowIndex, {
    "Lead ID": leadId,
    Status: status,
    "Internal Note": internalNote,
    "Lost Reason": status === "Lost" ? lostReason : "",
    "Last Contacted At": lastContactedAt,
    "Closed At": closedAt,
  });

  return {
    ...lead,
    leadId,
    status,
    internalNote,
    lostReason: status === "Lost" ? lostReason : "",
    lastContactedAt,
    closedAt,
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
