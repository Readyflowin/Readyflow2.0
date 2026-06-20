# Readyflow Ads QA Checklist

Use this checklist before Meta ads, SEO launches, or major funnel changes. Do not paste secrets, lead personal data, or private dashboard URLs into public tools.

## Local Prerequisites

- Run from `C:\Users\aadit\Desktop\Readyflow2.0`.
- Use `npx vercel dev --listen 127.0.0.1:3000` for API tests. Plain `npm run dev` only serves Vite and will not mount `/api/*`.
- Confirm local `.env.local` has server variables and `VITE_GA_MEASUREMENT_ID=G-FPK8SLV3E7`.
- Use a clearly fake test lead, for example `Readyflow QA Test`, with an inbox you control.

## Automated Checks

Run:

```powershell
npm run typecheck:server
npm run lint
npm run build
```

Expected:

- Typecheck passes.
- Lint passes.
- Build passes.
- A Vite chunk-size warning is acceptable if it is the only warning.

## Lead Form Browser Test

1. Open the homepage through Vercel dev or production.
2. Click each meaningful public CTA: hero, navbar, offer, final CTA, footer.
3. Confirm the lead modal opens with the correct CTA source behavior.
4. Try an invalid email and confirm the form shows a friendly validation state.
5. Try a too-fast submission and confirm spam protection fails safely.
6. Submit a valid test lead after waiting a few seconds.
7. Confirm `/api/leads` returns success JSON.
8. Confirm the success screen appears with the 48-Hour Launch Bonus.
9. Click `Continue on WhatsApp` and confirm the prefilled message opens.
10. Confirm no personal values are sent to Meta Pixel or GA4 events.

## Google Sheets QA

For a new lead, verify:

- Row is created.
- `Status` defaults to `Open`.
- `Email Sequence` is `Open`.
- `Email Paused` is `No`.
- `Open Instant Sent` changes to `Yes` after the instant email succeeds.
- `Last Email Sent`, `Last Email Sent At`, and `Next Email Due At` are updated.
- `Last Email Error` is blank unless an email failure occurred.

For a duplicate lead, verify:

- Existing sent flags are preserved.
- Existing `Interested`, `Closed Won`, or `Closed Lost` status is not reset to `Open`.
- Open instant email is not repeatedly resent.
- No destructive column migration occurs.

## Resend Email QA

Check Resend logs after the test lead:

- Admin notification attempted.
- Open Instant email attempted.
- HTML email is readable and about 600px wide on desktop.
- Mobile email is readable.
- Plain-text fallback exists.
- Email failure does not prevent Sheet save.

Sequence coverage:

- Open: Instant, 8h, 24h, Bonus Final Reminder, 7d.
- Interested: Immediate, 8h, 24h, Bonus Final Reminder, 72h, 7d.
- Closed Won: project confirmed/onboarding emails or manual actions.
- Closed Lost: closing email and optional reactivation only when intended.

Copy safety:

- No guaranteed-sales claims.
- No fake countdown timers.
- No “free custom development.”
- No email tracking pixels.

## Admin Dashboard QA

1. Open the secret admin slug.
2. Confirm wrong login fails safely.
3. Confirm correct login creates an admin session.
4. Confirm leads load and newest leads are visible.
5. Confirm status, email pause, last email, next email, last error, notes, and WhatsApp action display.
6. Update `Open` to `Interested`; confirm Open sequence stops and Interested Immediate sends once.
7. Update to `Closed Won`; confirm sales follow-ups stop and onboarding email/action becomes available.
8. Update to `Closed Lost`; confirm sales follow-ups stop and closing email/action becomes available.
9. Save notes and confirm status is not accidentally reset.
10. Re-save the same status and confirm `Status Changed At` is not repeatedly reset.
11. Confirm manual email buttons are admin-only and update sent flags after success.
12. Confirm logout works.

## Cron QA

Security:

- Request without `CRON_SECRET` returns unauthorized.
- Request with wrong secret returns unauthorized.
- Request with correct `Authorization: Bearer ...` works.
- Query-string fallback works only if intentionally supported.
- Secret is never exposed to frontend code.

Behavior:

- Reads leads.
- Skips missing email.
- Skips `Email Paused = Yes`.
- Skips Closed Won/Lost for sales emails.
- Sends only one due email per lead per run.
- Updates sent flag only after Resend succeeds.
- Updates `Last Email Sent`, `Last Email Sent At`, and `Next Email Due At`.
- Writes `Last Email Error` on failure.
- Open cron never sends Interested emails.
- Interested cron never sends Open emails.

Timing note:

- Current Vercel cron is daily at `0 5 * * *`.
- Daily cron makes 8h and 44h reminders approximate. For exact bonus timing, switch to hourly only if the Vercel plan/cost is acceptable.
- Hot leads should be handled manually from the admin dashboard while cron remains daily.
- If hourly cron is enabled later, the 8h and 44h follow-up timing becomes more accurate.

## Meta Events Manager Test

1. Open Meta Events Manager > Data Sources > Pixel > Test Events.
2. Enter `https://readyflow.site`.
3. Load homepage and confirm `PageView`.
4. Scroll to offer section and confirm `ViewContent`.
5. Click hero CTA and confirm `Readyflow_CTA_Click`.
6. Confirm `Readyflow_FormModalOpen`.
7. Type the first field and confirm `Readyflow_FormStart`.
8. Submit invalid form and confirm `Readyflow_FormSubmitError`.
9. Submit valid test lead and confirm `Readyflow_FormSubmitAttempt` then `Lead`.
10. Click final WhatsApp CTA and confirm `Contact` plus `Readyflow_WhatsAppClick`.
11. Click a generic WhatsApp link and confirm only `Readyflow_WhatsAppClick`, not `Contact`.
12. Open `/work`, click a project/live-store link, and confirm `Readyflow_ExternalProjectClick`.
13. Open the admin route and confirm no Pixel events fire.

Meta optimization:

- Primary optimization event: `Lead`.
- Secondary high-intent signal: `Contact` from the success-screen WhatsApp click.
- Diagnostic events: CTA clicks, form modal opens, form starts, offer views, project clicks.

## GA4 Realtime / DebugView Test

1. Confirm `VITE_GA_MEASUREMENT_ID=G-FPK8SLV3E7` is configured in local `.env.local`, Vercel Production, Vercel Preview and Vercel Development, then redeploy.
2. Open GA4 > Reports > Realtime.
3. Visit `https://readyflow.site` and confirm `page_view`.
4. Click a CTA and confirm `cta_click` and `form_modal_open`.
5. Submit a test lead and confirm `generate_lead`.
6. Click final WhatsApp CTA and confirm `contact` and `whatsapp_click`.
7. Open `/work` and click a project link; confirm `external_project_click`.
8. Open admin route and confirm no GA4 activity from admin actions.
9. Use DebugView with the GA Debugger browser extension or `debug_mode` tooling if needed.

Expected GA4 events:

- `page_view`
- `view_offer`
- `cta_click`
- `form_modal_open`
- `form_modal_close`
- `form_start`
- `form_submit_attempt`
- `generate_lead`
- `form_submit_error`
- `whatsapp_click`
- `contact`
- `external_project_click`
- `instagram_click`

## Production Readiness

- Vercel Production env vars are configured, including `VITE_GA_MEASUREMENT_ID=G-FPK8SLV3E7`.
- Vercel Preview env vars are configured, including `VITE_GA_MEASUREMENT_ID=G-FPK8SLV3E7`.
- Vercel Development env vars are configured, including `VITE_GA_MEASUREMENT_ID=G-FPK8SLV3E7`.
- Redeploy after env changes.
- `https://readyflow.site` loads over HTTPS.
- `/api/leads` works in production.
- Google Sheet is shared with the service account as Editor.
- Resend sender/domain is verified.
- Resend logs show delivery attempts.
- Secret admin slug works.
- Cron deployment exists.
- `robots.txt` and `sitemap.xml` are present.
- Policy pages work.
- 404/private route behavior is intentional.
- No homepage console errors.
- No failed JS chunks.
- No broken Pixel or GA scripts.

## Privacy Safety Rules

- Do not send name, email, phone, WhatsApp number, Instagram handle, requirement text, product free text, `fbclid`, or full URLs with query strings to Meta Pixel or GA4.
- Only use safe analytics params such as page path, section, CTA label, offer, package price, value, currency, channel, status, and fixed category fields.
- Admin dashboard must not fire Meta Pixel or GA4.
- Admin WhatsApp/status buttons must not fire ad analytics events.
- No visitor identification, scraping, enrichment, or email tracking pixels.

## SEO Readiness

- React Router supports adding public SEO routes.
- SEO component supports title, description, and canonical path.
- Future public pages will inherit Meta/GA4 route tracking when wrapped in `PublicRoute`.
- Future SEO CTAs can pass source context into the lead modal.
- Sitemap must be updated when new SEO pages are added.
- Avoid duplicate titles/descriptions and doorway-page patterns.

## Final Ads-Readiness Checklist

- Build/typecheck/lint pass.
- Production env vars are complete.
- GA4 env var is set and redeployed.
- Lead form saves to Google Sheets.
- Admin and user emails send through Resend.
- Success WhatsApp CTA works.
- Admin dashboard login/status updates work.
- Cron is secured and follow-up timing is understood.
- Meta `Lead` fires only after successful API response.
- Meta `Contact` fires only on success-screen WhatsApp CTA.
- GA4 `generate_lead` fires only after successful API response.
- Admin/private routes fire no ads analytics.
- Privacy rules are preserved.
