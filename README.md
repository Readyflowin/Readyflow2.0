# React + TypeScript + Vite

## Readyflow serverless lead flow

The lead form posts to the Vercel serverless endpoint `POST /api/leads`.
Run the full frontend + API locally with:

```bash
vercel dev
```

The plain Vite command (`npm run dev`) serves the frontend only and does not
execute files inside `/api`.

Required server environment variables belong in `.env.local` and must not use
the `VITE_` prefix:

```text
ADMIN_USERNAME
ADMIN_PASSWORD
ADMIN_SECRET_SLUG
CRON_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
REPLY_TO_EMAIL
ADMIN_NOTIFY_EMAIL
SITE_URL
WHATSAPP_NUMBER
GOOGLE_SHEETS_PRIVATE_KEY
GOOGLE_SHEETS_CLIENT_EMAIL
GOOGLE_SHEETS_ID
```

The Google service-account email must have editor access to the configured
spreadsheet.

## Hidden admin dashboard

The dashboard is only resolved at:

```text
http://localhost:3000/[ADMIN_SECRET_SLUG]
```

There is no public admin link. The login request checks `ADMIN_USERNAME` and
`ADMIN_PASSWORD` server-side and creates a signed, HTTP-only, SameSite=Strict
cookie that expires after 24 hours. Use the Logout button to clear it.

The dashboard supports:

- Lead totals and status summary
- Search and status filtering
- Desktop table and mobile lead cards
- Status, internal-note and lost-reason updates
- WhatsApp, email and copy-details actions
- Closed timestamps and last-contacted timestamps

## Google Sheets columns

The API preserves existing headers and appends these columns when missing:

- Lead ID
- Last Contacted At
- Closed At
- Lost Reason

Existing rows without a Lead ID remain usable through their sheet row number.
Saving an old lead assigns it a stable Lead ID.

## Follow-up automation

`vercel.json` runs `/api/cron/followups` daily at `05:00 UTC` (`10:30 IST`).
The endpoint requires `CRON_SECRET` through an `Authorization: Bearer ...`
header or the protected `?secret=` fallback for manual testing. Do not commit
the actual secret into `vercel.json` or frontend code.

The endpoint:

- Sends the 24-hour, 72-hour and 7-day templates when due
- Skips Closed and Lost leads
- Skips missing/invalid timestamps and missing email addresses
- Skips stages already marked `Yes`
- Marks each follow-up column only after Resend succeeds
- Sends at most one outstanding follow-up per lead per daily run, preventing
  older imported leads from receiving multiple catch-up emails at once

Test manually with an authorization header:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/followups
```

Query authentication is also supported for environments that cannot send
headers:

```text
/api/cron/followups?secret=YOUR_CRON_SECRET
```

Do not put the secret into public links or frontend code.

## Local test flow

1. Install or run the Vercel CLI, then start `vercel dev`.
2. Submit a lead through the public form modal.
3. Confirm the row appears in Google Sheets.
4. Visit `/[ADMIN_SECRET_SLUG]` and log in.
5. Confirm the lead appears, update its status/note, and save.
6. Backdate a test row timestamp by at least 24 hours.
7. Call the cron endpoint with `CRON_SECRET`.
8. Verify the Resend delivery and the matching follow-up column becoming `Yes`.
9. Set the lead to Closed or Lost and verify later cron calls skip it.

Avoid using a real customer email for cron testing.

## Production checklist

Before running ads:

- Replace exposed Resend API key if it was ever shared or committed.
- Change the admin password.
- Set all Vercel env variables.
- Verify the Resend sender domain.
- Share Google Sheet with the service account email as Editor.
- Submit one test lead.
- Confirm Google Sheet row.
- Confirm admin email.
- Confirm lead email.
- Confirm WhatsApp prefilled message.
- Confirm admin dashboard login.
- Mark test lead Closed.
- Confirm follow-up cron skips Closed leads.
- Test Meta Pixel events in Events Manager.
- Check mobile page at 390px width.
- Confirm policy links work.
- Confirm no broken CTA links.

## Phase 4 hardening notes

- The public form uses a hidden honeypot field, minimum completion-time check,
  best-effort in-memory rate limiting and short-window repeated submission
  rejection.
- Duplicate handling checks existing Google Sheet rows by email or cleaned
  WhatsApp number. Open leads are updated instead of appending another row.
  Closed/Lost leads are not overwritten.
- Serverless in-memory rate limiting is best-effort only. It can reset between
  cold starts or across regions. It is intentionally lightweight to avoid
  hurting mobile ad conversions.
- Google Sheets `403` errors should be fixed by sharing the configured sheet
  with `GOOGLE_SHEETS_CLIENT_EMAIL` as Editor.
- Legal/scope details live on `/privacy-policy`, `/terms`,
  `/refund-cancellation-policy` and `/delivery-scope-policy` instead of the
  hero, CTA, success screen or follow-up emails.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
