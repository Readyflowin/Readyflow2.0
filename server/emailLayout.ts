export type ReadyflowEmailLayoutOptions = {
  previewText: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
  signature?: string;
  footerNote?: string;
  logoUrl?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function emailParagraph(value: string): string {
  return `<p style="margin:0 0 16px">${escapeHtml(value)}</p>`;
}

export function emailBox(title: string, bodyHtml: string): string {
  return `
    <div style="margin:20px 0">
      <p style="margin:0 0 8px;font-weight:600">${escapeHtml(title)}</p>
      ${bodyHtml}
    </div>
  `;
}

export function emailBulletList(items: string[]): string {
  return `
    <ul style="margin:0 0 16px;padding:0 0 0 22px">
      ${items
        .map(
          (item) =>
            `<li style="margin:0 0 6px">${escapeHtml(item)}</li>`,
        )
        .join("")}
    </ul>
  `;
}

export function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #edf0ed;color:#6b7280;font-size:13px;line-height:1.45;vertical-align:top;width:36%">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #edf0ed;color:#111827;font-size:14px;line-height:1.55;font-weight:700;vertical-align:top">${value ? escapeHtml(value) : "&mdash;"}</td>
    </tr>
  `;
}

export function createReadyflowEmailLayout(
  options: ReadyflowEmailLayoutOptions,
): string {
  const {
    title,
    bodyHtml,
    ctaLabel,
    ctaUrl,
    signature,
    footerNote,
  } = options;
  const safeCtaUrl = ctaUrl ? escapeHtml(ctaUrl) : "";

  return `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#222222;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;-webkit-text-size-adjust:100%;text-size-adjust:100%">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse">
      <tr>
        <td align="left" style="padding:24px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:620px;border-collapse:collapse">
            <tr>
              <td>
                ${bodyHtml}
                ${
                  ctaLabel && safeCtaUrl
                    ? `<p style="margin:20px 0 16px"><a href="${safeCtaUrl}" style="color:#1155cc;text-decoration:underline">${escapeHtml(ctaLabel)}</a></p>`
                    : ""
                }
                ${
                  signature
                    ? `<p style="margin:20px 0 0">${escapeHtml(signature)}</p>`
                    : ""
                }
              </td>
            </tr>
            ${
              footerNote
                ? `<tr>
                    <td style="padding-top:20px">
                      <p style="margin:0;color:#777777;font-size:12px;line-height:1.5">${escapeHtml(footerNote)}</p>
                    </td>
                  </tr>`
                : ""
            }
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
