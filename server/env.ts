export class ServerConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerConfigurationError";
  }
}

const PLACEHOLDER_PATTERN =
  /^(your[-_ ]|replace[-_ ]|placeholder|changeme|change[-_ ]me|example|xxx)/i;

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
  const rawValue = process.env[name];
  return rawValue ? unwrap(rawValue) : "";
}
