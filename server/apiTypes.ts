import type { IncomingHttpHeaders } from "node:http";

export type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: IncomingHttpHeaders;
  query?: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: Record<string, unknown>) => void;
  setHeader: (name: string, value: string | string[]) => void;
  end: () => void;
};

export function parseRequestBody(body: unknown): unknown {
  if (typeof body !== "string") return body;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

export function getHeader(
  headers: IncomingHttpHeaders,
  name: string,
): string {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function getQueryValue(
  query: ApiRequest["query"],
  name: string,
): string {
  const value = query?.[name];
  return Array.isArray(value) ? value[0] || "" : value || "";
}
