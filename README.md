# React + TypeScript + Vite

## Readyflow serverless lead flow

The lead form posts to the Vercel serverless endpoint `POST /api/leads`.
Run the full frontend + API locally with:

```bash
vercel dev
```

The plain Vite command (`npm run dev`) serves the frontend only and does not
execute files inside `/api`.

## Static SEO rendering

`npm run build` now runs Vite and then pre-renders the homepage plus published
SEO registry routes into physical HTML files under `dist/<slug>/index.html`.
This keeps the existing React client, lead modal, Vercel APIs, analytics, and
hidden admin route intact while shipping article HTML, route-specific metadata,
JSON-LD, and internal links before JavaScript runs.

The source of truth is `src/lib/seoRoutes.ts`. Only registry entries marked
published and indexable are pre-rendered and written to the generated
`dist/sitemap.xml`; planned routes remain out of the sitemap and have no
generated page. The deployed canonical host is currently
`https://www.readyflow.site` because the apex host redirects there in Vercel.
Set server-side `SITE_URL` to that same host for email assets and links.

## SEO pricing page

Readyflow's Shopify pricing-intent landing page is available at:

```text
/shopify-store-setup-cost-india
```

SEO configuration:

- Title: `Shopify Store Setup Cost in India | Readyflow`
- Meta description explains the ₹14,999 Readyflow setup fee and separate
  Shopify, domain, app, and third-party costs.
- Canonical: `https://www.readyflow.site/shopify-store-setup-cost-india`
- Sitemap entry: generated as `dist/sitemap.xml`
- CTA source: `seo_shopify_store_setup_cost_india`
- CTA section labels: `hero`, `quick_cost_answer`, `cost_table`,
  `included_scope`, `separate_costs`, `faq`, and `final_cta`
- Structured data: `WebPage`, `Service`, `FAQPage`, `BreadcrumbList`, and
  `Organization`
- Layout strategy: editorial article presentation with a narrow reading column,
  serif headlines, portfolio figures and captions; commercial utilities such
  as the cost table and lead CTAs remain embedded where purchase intent needs
  them.

The planned cluster pages referenced in the research brief are not linked until
their routes exist, preventing broken navigation and duplicate placeholder
pages.

## SEO Shopify store setup article

Readyflow's Shopify setup service-intent article is available at:

```text
/shopify-store-setup-india
```

SEO configuration:

- Title: `Shopify Store Setup in India for Instagram Brands | Readyflow`
- Meta description: `Readyflow helps Indian Instagram-first brands launch
  mobile-first Shopify stores. Get theme setup, products, payments, policies,
  WhatsApp flow and more for ₹14,999.`
- Canonical: `https://www.readyflow.site/shopify-store-setup-india`
- Internal links: `/shopify-store-setup-cost-india`,
  `/ecommerce-website-development-india`, and `/work`. Other brief-specified
  cluster routes are deliberately omitted until those routes exist.
- Trusted external links: official Shopify pricing, domain, and
  payment-provider guidance; official WhatsApp click-to-chat documentation.
- Sitemap entry: generated as `dist/sitemap.xml`
- CTA source: `seo_shopify_store_setup_india`
- CTA section labels: `hero`, `article_mid_intro`, `included_scope`,
  `pricing_scope`, `process`, `instagram_seller_section`, `faq`, and
  `final_cta`
- Tracking: the pricing/scope section fires the existing `ViewContent` /
  `view_offer` path once it enters view. CTAs use the existing modal and
  privacy-safe Meta/GA4 event plumbing.
- Structured data: `BlogPosting`, `WebPage`, `FAQPage`, `BreadcrumbList`, and
  `Organization`. No ratings, reviews, Product, or Offer claims are added.
- Visuals: the page uses four responsive, inline SVG editorial illustrations
  created for this article (hero, store structure, setup process, social-to-
  store flow). They have accessible labels and captions, carry no third-party
  license burden, and do not repeat existing portfolio images.

## SEO ecommerce development page

Readyflow's broad ecommerce service-intent page is available at:

```text
/ecommerce-website-development-india
```

SEO configuration:

- Title: `Ecommerce Website Development in India for Small Brands`
- Meta description positions Readyflow around Shopify-focused ecommerce setup
  for small product brands and Instagram-first sellers.
- Canonical: `https://www.readyflow.site/ecommerce-website-development-india`
- Internal link: `/shopify-store-setup-cost-india`
- Trusted sources: official Shopify builder, pricing, product and shipping
  guidance; official WooCommerce overview; official WhatsApp click-to-chat
  guidance.
- Proof visuals: optimized derivatives of approved assets already in
  `public/Pastwork`, stored in `public/seo`.
- Sitemap entry: generated as `dist/sitemap.xml`
- CTA source: `seo_ecommerce_website_development_india`
- CTA section labels: `hero`, `platform_choice`, `included_scope`,
  `cost_clarity`, `process`, `proof`, `faq`, and `final_cta`
- Structured data: `WebPage`, `Service`, `FAQPage`, `BreadcrumbList`, and
  `Organization`
- Layout strategy: article-first service guide with a lead image, byline,
  in-flow platform analysis, portfolio figures and captions; qualification
  CTAs remain available without turning every section into a card.

Unbuilt cluster routes such as the Shopify setup service, platform comparison,
Instagram transition, launch checklist, and niche pages remain unlinked to
avoid broken navigation.

## SEO clothing brand website article

Readyflow's apparel-specific editorial article is available at:

```text
/clothing-brand-website
```

SEO configuration:

- Title: `Clothing Brand Website Design in India for Shopify Stores | Readyflow`
- Meta description: `Explore what a clothing brand website in India should
  include, from collections and size charts to trust pages and mobile-first
  Shopify setup with Readyflow.`
- Canonical: `https://www.readyflow.site/clothing-brand-website`
- Sitemap entry: generated from the published route registry into
  `dist/sitemap.xml`.
- CTA source: `seo_clothing_brand_website`
- CTA section labels: `hero`, `article_mid_intro`,
  `clothing_website_essentials`, `product_page_anatomy`, `included_scope`,
  `content_prep`, `faq`, and `final_cta`.
- Internal links: the three published Shopify/ecommerce article routes. Planned
  Instagram, checklist, comparison, and jewellery routes remain unlinked until
  they are actually published.
- Trusted external links: official Shopify documentation for collections,
  product variants, store policies, and manual payments.
- Structured data: generated `BlogPosting`, `WebPage`, `BreadcrumbList`,
  `FAQPage`, `Organization`, and a bounded service graph that matches the
  visible launch scope. No rating, review, Product, or Offer claims are used.
- Visuals: five original SVG visuals (hero, store structure, product-page
  anatomy, Instagram flow, and apparel-content checklist), authored in the
  project with accessible labels and captions. `public/seo/clothing-brand-
  storefront.svg` is the stable social-preview asset; no third-party or scraped
  images are used.

## SEO jewellery ecommerce website article

Readyflow's jewellery-specific editorial article is available at:

```text
/jewellery-ecommerce-website
```

SEO configuration:

- Title: `Jewellery Ecommerce Website Design for Indian Brands | Readyflow`
- Meta description: `See what a jewellery ecommerce website should include for
  Indian brands, from product details and trust sections to Shopify setup with
  Readyflow.`
- Canonical: `https://www.readyflow.site/jewellery-ecommerce-website`
- Sitemap entry: generated from the published route registry into
  `dist/sitemap.xml`.
- CTA source: `seo_jewellery_ecommerce_website`
- CTA section labels: `hero`, `article_mid_intro`,
  `jewellery_website_essentials`, `product_page_anatomy`, `included_scope`,
  `content_prep`, `faq`, and `final_cta`.
- Internal links: published Shopify setup, pricing, ecommerce development, and
  clothing-brand articles. Planned pages remain unlinked to avoid dead ends.
- Trusted external links: official Shopify documentation for products,
  variants, collections, policies, and manual payments.
- Structured data: generated `BlogPosting`, `WebPage`, `BreadcrumbList`,
  `FAQPage`, `Organization`, and a bounded service graph matching the visible
  launch scope. No rating, review, Product, or Offer claims are used.
- Visuals: five original SVG illustrations—hero, site architecture,
  product-confidence anatomy, mobile social-to-store flow, and a content
  checklist. The stable social-preview asset is
  `public/seo/jewellery-storefront.svg`; no third-party or scraped images are
  used.

## SEO Instagram Brand Shopify Store article

Readyflow's Instagram-to-Shopify transition guide is available at:

```text
/instagram-brand-shopify-store
```

SEO configuration:

- Title: `Turn Your Instagram Brand Into a Shopify Store in India | Readyflow`
- Meta description: `Turn your Instagram brand into a proper Shopify store.
  Readyflow helps Indian product businesses launch mobile-first stores with
  product pages, WhatsApp flow and ₹14,999 setup.`
- Canonical: `https://www.readyflow.site/instagram-brand-shopify-store`
- Sitemap entry: generated from the published route registry into
  `dist/sitemap.xml`.
- CTA source: `seo_instagram_brand_shopify_store`
- CTA section labels: `hero`, `instagram_problem`, `article_mid_intro`,
  `channel_flow`, `included_scope`, `cost_clarity`, `process`,
  `content_prep`, `faq`, and `final_cta`.
- Internal links: published Shopify setup, pricing, ecommerce development,
  clothing, and jewellery guides. Planned checklist and comparison routes stay
  unlinked until published.
- Trusted external links: official Shopify collections and manual-payments
  documentation, plus official WhatsApp click-to-chat guidance.
- Structured data: generated `BlogPosting`, `WebPage`, `BreadcrumbList`,
  `FAQPage`, `Organization`, and a bounded service graph matching visible
  launch scope. No rating, review, Product, or Offer claims are used.
- Visuals: four original SVG illustrations—Instagram-to-store hero, channel
  flow, product-page example, and content-prep checklist—with accessible labels
  and captions. `public/seo/instagram-to-shopify-store.svg` is the stable
  social-preview asset; no third-party or scraped images are used.

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

## Plain-text SMTP confirmation script

[`scripts/send_confirmation_email.py`](scripts/send_confirmation_email.py)
sends a personalized form confirmation as strict plain text. It contains no
HTML, CSS, images, tracking pixels, or attachments, and includes only the URL
configured in `CONFIRMATION_URL`.

Set the SMTP variables shown in `.env.example`, then run:

```bash
python scripts/send_confirmation_email.py customer@example.com "Customer"
```

Use `SMTP_USE_SSL=true` for implicit TLS, usually on port 465. Leave it false
for STARTTLS, usually on port 587. The sender address must be verified by the
SMTP provider.

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

- Sends the next due email for the lead's current status and sequence.
- Skips paused leads and leads with missing email addresses.
- Never sends Open emails to Interested, Closed Won or Closed Lost leads.
- Never sends sales emails after Closed Won or Closed Lost.
- Skips emails whose sent flag is already `Yes`.
- Marks each sent flag only after Resend succeeds.
- Sends at most one outstanding email per lead per cron run, preventing older
  imported leads from receiving multiple catch-up emails at once.
- Stores Resend failures in `Last Email Error` where possible.

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
8. Verify the Resend delivery and the matching sequence column becoming `Yes`.
9. Set the lead to Interested, Closed Won and Closed Lost in test rows and
   verify later cron calls send only the correct status-based emails.

Avoid using a real customer email for cron testing.

## Resend email templates

Reusable email layout lives in `server/emailLayout.ts`. The lead confirmation,
admin notification and follow-up emails all use the same centered 600px
Readyflow layout with inline email-safe CSS, readable body text, a large CTA
button and plain-text fallbacks.

The email header uses `${SITE_URL}/icon.png` when `SITE_URL` is configured and
keeps a text `READYFLOW` brand fallback beside it. Add a full horizontal email
logo later if you want a more polished header image.

Preview without sending real email by calling the exported builders in a local
dev scratch file or server log:

- `buildLeadEmail(lead, whatsappUrl, siteUrl)` in `server/emails.ts`
- `buildAdminEmail(lead, dashboardUrl, siteUrl)` in `server/emails.ts`
- `buildFollowupEmailHtml(template, whatsappUrl, siteUrl)` in
  `server/followupEmails.ts`

Copy the returned HTML into a browser or email preview tool. Keep all customer
details out of screenshots and logs when previewing with real leads.

## Status-based email automation

Readyflow uses four lead statuses:

- `Open` - default for every new form submission. Legacy `New` and `Contacted`
  rows are treated as `Open` when read.
- `Interested` - starts the warm decision-support sequence.
- `Closed Won` - stops sales follow-ups and starts client onboarding emails.
- `Closed Lost` - stops sales follow-ups and sends a polite closing email.

Changing status from the hidden admin dashboard also updates `Status Changed At`
and `Email Sequence`. Closed Won/Lost leads never restart the Open sequence from
a duplicate form submission.

The Google Sheet adds these email automation columns when missing:

- Core: `Status`, `Status Changed At`, `Email Sequence`, `Email Paused`,
  `Last Email Sent`, `Last Email Sent At`, `Next Email Due At`,
  `Last Email Error`, `Email Notes`
- Open: `Open Instant Sent`, `Open 8h Sent`, `Open 24h Sent`,
  `Open Bonus Final Reminder Sent`, `Open 7d Sent`
- Legacy compatibility: `Open 72h Sent` and old `Followup ... Sent` columns may
  remain in existing Sheets but are not part of the active Open sequence.
- Interested: `Interested Immediate Sent`, `Interested 8h Sent`,
  `Interested 24h Sent`, `Interested Bonus Final Reminder Sent`,
  `Interested 72h Sent`, `Interested 7d Sent`
- Closed Won: `Closed Won Project Confirmed Sent`,
  `Closed Won Content Checklist Sent`, `Closed Won Build Started Sent`,
  `Closed Won Review Handoff Sent`, `Closed Won Support Reminder Sent`,
  `Closed Won Review Request Sent`
- Closed Lost: `Closed Lost Closing Email Sent`,
  `Closed Lost Reactivation Email Sent`
- Operational: `Project Confirmed At`, `Content Received At`,
  `Build Started At`, `Project Delivered At`, `Support Ends At`,
  `Review Requested At`, `Bonus Started At`, `Bonus Expires At`,
  `Lost Reason`

Open sequence:

- Instant after successful lead save: `Your launch bonus is reserved`
- 8 hours: `Don't miss your custom sections bonus`
- 24 hours: `Make your Shopify store feel more unique`
- 44 hours: `Your custom-section bonus ends soon`
- 7 days: `Should I close this for now`

The 48-Hour Launch Bonus message is: up to 5 custom Shopify sections coded just
for your brand at no extra setup fee. Keep the scope note attached: simple
brand-specific launch sections only. Do not use fake countdowns, guaranteed
sales language, free custom development, unlimited claims or example section
lists in the bonus copy.

Interested sequence starts from `Status Changed At`. When a lead enters
Interested, `Bonus Started At` is set to that moment and `Bonus Expires At` is
set 48 hours later. Saving an already-Interested lead again does not reset the
bonus window.

- Immediate: `Your store plan is ready`
- 8 hours: `Don't miss your custom sections bonus`
- 24 hours: `Make your store stand out`
- 44 hours: `Your custom-section bonus ends soon`
- 72 hours: `Want to continue without the bonus?`
- 7 days: `Should I close this for now?`

The Interested 72-hour email must not imply the bonus is still active. It should
say the bonus window has passed and the standard Rs. 14,999 setup can still move
ahead.

Closed Won behavior:

- Stops Open and Interested sales emails.
- Sets `Email Sequence` to `Closed Won Onboarding`.
- Sends `Your Readyflow Shopify Launch is Confirmed` once.
- Other onboarding emails are manual dashboard actions: content checklist,
  build started, handoff, support reminder and review request.

Closed Lost behavior:

- Stops Open and Interested sales emails.
- Sets `Email Sequence` to `Closed Lost`.
- Sends `Closing the loop on [Brand Instagram]` once unless emails are paused.
- The 30-day reactivation email is manual only.

Dashboard actions:

- Save status, internal note, email notes and lost reason.
- Mark Open, Interested, Closed Won or Closed Lost.
- Pause or resume emails per lead.
- Send the next relevant Open, Interested, Closed Won or Closed Lost email from
  protected admin-only actions.
- View sent flags, bonus status, last email, next due email and last email
  error.

Cron behavior:

- `/api/cron/followups` reads all leads, skips paused/missing-email leads,
  sends at most one due email per lead per run, marks the matching sent flag
  only after Resend succeeds, and writes failures to `Last Email Error`.
- The current Vercel cron remains daily at `05:00 UTC`, so 8-hour, 24-hour and
  44-hour reminders are approximate and send on the next cron run. Switch to
  hourly only if your Vercel plan and quota comfortably support it.
- Because cron is daily, hot leads should still be handled manually from the
  admin dashboard. If hourly cron is enabled later, the 8-hour and 44-hour
  follow-up timing becomes much more accurate.

Manual send behavior:

- `POST /api/admin/send-email` is protected by the existing admin session.
- Public visitors cannot trigger emails.
- The endpoint validates the lead, email type and status before sending.
- Paused leads are blocked from manual sends unless a future override is added.

Privacy and delivery rules:

- Only first-party form-submitted lead data is used.
- No visitor identification, scraping, enrichment or email tracking pixels are
  added.
- No secrets are exposed to the frontend.
- Every HTML email keeps a plain-text fallback.
- Lead save does not fail just because a Resend email fails; the error is
  logged and stored in the Sheet where possible.

## Meta Pixel tracking

Readyflow tracks the public lead funnel only. The hidden admin dashboard is not
wrapped in public Pixel tracking and admin actions must not send Meta events.

Primary ad optimization event:

- `Lead` — fires only after the lead API accepts the form submission.

Secondary high-intent conversion:

- `Contact` — fires only when a submitted lead clicks the success-screen
  WhatsApp CTA.

Warm and diagnostic events:

- `PageView` — initial public page load and public SPA route changes.
- `ViewContent` — first view of the Instagram Brand Shopify Launch offer
  section.
- `Readyflow_CTA_Click` — meaningful public CTA clicks.
- `Readyflow_FormModalOpen` — lead modal opened, with CTA source context.
- `Readyflow_FormModalClose` — lead modal abandoned before successful lead.
- `Readyflow_FormStart` — first form interaction per modal session.
- `Readyflow_FormSubmitAttempt` — submit attempt before the API request.
- `Readyflow_FormSubmitError` — validation, network, API or non-JSON errors.
- `Readyflow_WhatsAppClick` — WhatsApp clicks. Generic WhatsApp clicks are
  diagnostic only; they do not fire `Contact`.
- `Readyflow_ExternalProjectClick` — public project/live-site clicks.
- `Readyflow_InstagramClick` — public Instagram outbound clicks.
- `Readyflow_DuplicateLead` — duplicate/update response from the lead API.

Privacy rule: never send personal data to Meta Pixel. Do not send name, email,
phone, WhatsApp number, Instagram handle, free-text product type, requirement
text, `fbclid`, or full URLs with query strings. Pixel params should stay to
safe funnel metadata such as `page_path`, `section`, `cta_label`, `channel`,
`status`, `error_type`, `value`, `currency`, `offer` and `package_price`.

## GA4 tracking

GA4 is used for privacy-safe analytics, SEO page tracking and funnel diagnostics.
Meta Pixel remains the ad-optimization tracker for Meta campaigns.

Configure GA4 with a public Vite env variable:

```text
VITE_GA_MEASUREMENT_ID=<your-ga4-measurement-id>
```

Add this exact variable in:

- Local `.env.local`
- Vercel Production environment
- Vercel Preview environment
- Vercel Development environment

The app loads GA4 from `src/lib/ga4.ts` only when the env var exists and the
current route is public. It uses `send_page_view: false` and sends explicit
SPA `page_view` events through `GA4RouteTracker`, so route changes are tracked
without relying on full URLs.

Tracked GA4 events:

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

Allowed GA4 params are limited to safe funnel metadata: `page_path`,
`page_title`, `offer`, `package_price`, `value`, `currency`, `section`,
`cta_label`, `destination`, `source_section`, `channel`, `form_name`,
`error_type`, `status`, `destination_type` and `project_category`.

Privacy rules:

- Do not send name, email, phone, WhatsApp number, Instagram handle,
  requirement text, product free-text, `fbclid`, query strings or full URLs.
- `page_path` is always taken from `window.location.pathname`.
- Admin/private dashboard routes are excluded.
- Admin WhatsApp buttons, status changes and email actions are not tracked.
- No Google Tag Manager, heavy analytics library, visitor identification,
  scraping, enrichment or email tracking pixels are used.

Test in GA4 Realtime:

1. Set `VITE_GA_MEASUREMENT_ID` in local `.env.local` and the
   relevant Vercel Production, Preview and Development environments.
2. Deploy or run the public site locally.
3. Open the public homepage, navigate to `/work`, open the lead modal, and click
   a public CTA.
4. In GA4, open Reports > Realtime and confirm events appear.

Test in GA4 DebugView:

1. Use the Google Analytics Debugger browser extension or add GA debug mode in
   the browser tooling.
2. Repeat the public funnel actions.
3. Open Admin > DebugView and confirm only safe event params appear.

## SEO route and article tracking

- Register published SEO metadata in `src/lib/seoRoutes.ts`, then map the page
  component in `src/App.tsx` and `src/ssg.ts`. The registry drives the sitemap
  and the browser-side SEO tracking allowlist.
- `src/lib/publicRoutes.ts` derives the browser-side public SEO route list used
  by Meta and GA4. Keep the two static lists in `index.html` aligned with it,
  because the HTML shell cannot import TypeScript.
- Render `SeoArticleTracker` on every editorial page. It sends safe
  `ViewContent` / `view_offer` context plus separate engagement events:
  `Readyflow_ArticleScroll` / `article_scroll` at 50% and 90%, and
  `Readyflow_QualifiedReader` / `qualified_reader` after 60 visible seconds.
- Conversion events remain the existing CTA → modal → form flow. Reuse the
  existing tracked CTA/modal components; do not create article-specific forms
  or raw lead buttons.
- Never send form values, raw UTMs, `fbclid`, or other personal data to Meta or
  GA4. Article events use only route, article, section, safe source-group, and
  offer context.

## Production checklist

Before running ads:

- Replace exposed Resend API key if it was ever shared or committed.
- Change the admin password.
- Set all Vercel env variables for Production, Preview and Development,
  including `VITE_GA_MEASUREMENT_ID`.
- Verify the Resend sender domain.
- Share Google Sheet with the service account email as Editor.
- Submit one test lead.
- Confirm Google Sheet row.
- Confirm admin email.
- Confirm lead email.
- Confirm WhatsApp prefilled message.
- Confirm admin dashboard login.
- Mark a test lead Interested and confirm the immediate Interested email.
- Mark a test lead Closed Won and confirm sales follow-ups stop.
- Mark a test lead Closed Lost and confirm sales follow-ups stop.
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
