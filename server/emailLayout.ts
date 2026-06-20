export type ReadyflowEmailLayoutOptions = {
  previewText: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
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
  return `<p style="margin:0 0 16px;font-size:16px;line-height:1.72;color:#374151">${escapeHtml(value)}</p>`;
}

export function emailBox(title: string, bodyHtml: string): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;border-collapse:separate;border-spacing:0;background:#f7f3ec;border:1px solid #ece3d5;border-radius:18px">
      <tr>
        <td style="padding:22px 22px 20px">
          <p style="margin:0 0 10px;font-size:12px;line-height:1.4;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:#047857">${escapeHtml(title)}</p>
          ${bodyHtml}
        </td>
      </tr>
    </table>
  `;
}

export function emailBulletList(items: string[]): string {
  return `
    <ul style="margin:0;padding:0 0 0 20px;color:#374151;font-size:15px;line-height:1.85">
      ${items
        .map(
          (item) =>
            `<li style="margin:0 0 7px;padding-left:3px">${escapeHtml(item)}</li>`,
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

export function createReadyflowEmailLayout({
  previewText,
  eyebrow,
  title,
  bodyHtml,
  ctaLabel,
  ctaUrl,
  footerNote,
  logoUrl,
}: ReadyflowEmailLayoutOptions): string {
  const safeCtaUrl = ctaUrl ? escapeHtml(ctaUrl) : "";

  return `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4efe6;color:#070707;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;text-size-adjust:100%">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;line-height:1px">${escapeHtml(previewText)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f4efe6;border-collapse:collapse">
      <tr>
        <td align="center" style="padding:28px 14px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0">
            <tr>
              <td style="padding:0 0 14px">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                  <tr>
                    <td style="vertical-align:middle">
                      ${
                        logoUrl
                          ? `<img src="${escapeHtml(logoUrl)}" width="44" height="44" alt="Readyflow" style="display:inline-block;width:44px;height:44px;border:0;border-radius:12px;vertical-align:middle;margin-right:10px" />`
                          : `<span style="display:inline-block;width:12px;height:12px;background:#1dff8a;border-radius:999px;margin-right:10px;vertical-align:middle"></span>`
                      }
                      <span style="display:inline-block;vertical-align:middle;font-size:14px;font-weight:900;letter-spacing:2.8px;color:#070707">READYFLOW</span>
                    </td>
                    <td align="right" style="vertical-align:middle;color:#0a8f50;font-size:11px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase">
                      Shopify launch
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="width:100%;background:#ffffff;border:1px solid #eadfce;border-radius:26px;box-shadow:0 22px 60px rgba(7,7,7,0.08);overflow:hidden">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="padding:34px 30px 30px">
                      <p style="margin:0 0 12px;font-size:11px;line-height:1.4;font-weight:900;letter-spacing:2.4px;text-transform:uppercase;color:#0a8f50">${escapeHtml(eyebrow)}</p>
                      <h1 style="margin:0 0 20px;font-size:34px;line-height:1.08;font-weight:900;letter-spacing:0;color:#070707">${escapeHtml(title)}</h1>
                      ${bodyHtml}
                      ${
                        ctaLabel && safeCtaUrl
                          ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:26px;border-collapse:collapse">
                              <tr>
                                <td>
                                  <a href="${safeCtaUrl}" style="display:block;width:100%;box-sizing:border-box;background:#070707;color:#1dff8a;text-decoration:none;text-align:center;padding:17px 22px;border-radius:999px;font-size:13px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase">${escapeHtml(ctaLabel)}</a>
                                </td>
                              </tr>
                            </table>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 8px 0;text-align:center">
                <p style="margin:0;color:#7a736b;font-size:12px;line-height:1.65">${escapeHtml(
                  footerNote ||
                    "You received this because you submitted a Readyflow store request.",
                )}</p>
                <p style="margin:8px 0 0;color:#a39a90;font-size:11px;line-height:1.55">Readyflow &middot; Founder-led Shopify storefront setup</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
