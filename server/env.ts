import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export class ServerConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerConfigurationError";
  }
}

const PLACEHOLDER_PATTERN =
  /^(your[-_ ]|replace[-_ ]|placeholder|changeme|change[-_ ]me|example|xxx)/i;

let localEnvLoaded = false;

function countUnescapedQuotes(value: string, quote: string) {
  let count = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== quote) continue;

    let backslashCount = 0;
    for (
      let cursor = index - 1;
      cursor >= 0 && value[cursor] === "\\";
      cursor -= 1
    ) {
      backslashCount += 1;
    }

    if (backslashCount % 2 === 0) count += 1;
  }

  return count;
}

function readEnvAssignments(contents: string) {
  const lines = contents.split(/\r?\n/);
  const assignments: Array<{ name: string; rawValue: string }> = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;

    const [, name, firstRawValue] = match;
    let rawValue = firstRawValue;
    const openingQuote = rawValue.trimStart()[0];

    if (openingQuote === '"' || openingQuote === "'") {
      let quoteCount = countUnescapedQuotes(rawValue, openingQuote);

      while (quoteCount % 2 !== 0 && index + 1 < lines.length) {
        index += 1;
        rawValue += `\n${lines[index]}`;
        quoteCount += countUnescapedQuotes(lines[index], openingQuote);
      }
    }

    assignments.push({ name, rawValue });
  }

  return assignments;
}

function loadLocalEnvFallback() {
  if (localEnvLoaded) return;
  localEnvLoaded = true;

  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  for (const { name, rawValue } of readEnvAssignments(
    readFileSync(envPath, "utf8"),
  )) {
    if (process.env[name] !== undefined) continue;

    process.env[name] = unwrap(rawValue);
  }
}

function unwrap(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function requireServerEnv(name: string): string {
  loadLocalEnvFallback();

  const rawValue = process.env[name];
  const value = rawValue ? unwrap(rawValue) : "";

  if (!value || PLACEHOLDER_PATTERN.test(value)) {
    throw new ServerConfigurationError(
      `Required server environment variable ${name} is missing or invalid.`,
    );
  }

  return value;
}

export function optionalServerEnv(name: string): string {
  loadLocalEnvFallback();

  const rawValue = process.env[name];
  return rawValue ? unwrap(rawValue) : "";
}
