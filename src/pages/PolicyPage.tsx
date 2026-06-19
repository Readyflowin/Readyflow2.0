import SEO from "../components/SEO";
import Footer from "../components/Footer";

type PolicySection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

type PolicyContent = {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  updated: string;
  sections: PolicySection[];
};

type PolicyKey = "privacy" | "terms" | "refund" | "delivery";

const CONTACT_COPY =
  "Contact email: use the reply-to/contact email shown in Readyflow emails. For correction or deletion requests, contact Readyflow using that email address, or message us through the WhatsApp/contact link on the website.";

const POLICIES: Record<PolicyKey, PolicyContent> = {
  privacy: {
    title: "Privacy Policy | Readyflow",
    description:
      "How Readyflow collects and uses lead details for Shopify launch enquiries, follow-up, tracking and ad measurement.",
    path: "/privacy-policy",
    eyebrow: "Privacy Policy",
    updated: "Last updated: 20 June 2026",
    sections: [
      {
        heading: "Details we collect",
        bullets: [
          "Name, brand Instagram handle, product type, WhatsApp number and email.",
          "Any requirement details you choose to share with us in future form versions or direct messages.",
          "UTM/source data, FBCLID, page URL and user agent for lead tracking and ad measurement.",
        ],
      },
      {
        heading: "Why we collect these details",
        bullets: [
          "To respond to your Shopify Launch request and check fit for the ₹11,999 package.",
          "To send package details, confirmation emails and WhatsApp/email follow-up.",
          "To track leads, understand ad performance and improve the landing page funnel.",
        ],
      },
      {
        heading: "Tools used",
        body:
          "Readyflow may use Google Sheets for lead storage, Resend for email sending, Meta Pixel for ad measurement and Google Analytics if installed. Secrets and private keys are handled server-side only.",
      },
      {
        heading: "Correction or deletion",
        body: CONTACT_COPY,
      },
    ],
  },
  terms: {
    title: "Terms | Readyflow",
    description:
      "Terms for Readyflow website/store setup services and the ₹11,999 Instagram Brand Shopify Launch package.",
    path: "/terms",
    eyebrow: "Terms",
    updated: "Last updated: 20 June 2026",
    sections: [
      {
        heading: "Service scope",
        body:
          "Readyflow provides website and store setup services. The Instagram Brand Shopify Launch is a focused setup package for Instagram-first product brands.",
      },
      {
        heading: "Package fee and separate costs",
        body:
          "The ₹11,999 package is Readyflow’s setup fee. Shopify subscription, domain, paid apps, product photos and ad management are separate.",
      },
      {
        heading: "Client responsibilities",
        bullets: [
          "Provide accurate brand, product, pricing and content details.",
          "Provide required Shopify access and approvals on time.",
          "Confirm scope before work starts and respond to review requests during handoff.",
        ],
      },
      {
        heading: "Timeline and suitability",
        body:
          "Timelines begin only after required content, products, brand details and access are ready. Readyflow may refuse projects that are outside package scope or not suitable for this setup.",
      },
    ],
  },
  refund: {
    title: "Refund & Cancellation Policy | Readyflow",
    description:
      "Fair refund and cancellation terms for Readyflow Shopify launch setup work.",
    path: "/refund-cancellation-policy",
    eyebrow: "Refund & Cancellation Policy",
    updated: "Last updated: 20 June 2026",
    sections: [
      {
        heading: "Payment terms",
        body:
          "Final payment structure is confirmed before project start. If an upfront payment or milestone payment is agreed, it will be shared clearly before work begins.",
      },
      {
        heading: "Cancellation before work starts",
        body:
          "If you cancel before setup work begins, refund or cancellation options can be discussed based on payment status and preparation already completed.",
      },
      {
        heading: "After work begins",
        body:
          "Once setup work has started, refunds are not automatic because time, planning and implementation effort may already be used.",
      },
      {
        heading: "Extra scope",
        body:
          "Requests outside the package scope, additional products, custom sections or extra revisions may cost extra and will be discussed before being added.",
      },
    ],
  },
  delivery: {
    title: "Delivery & Scope Policy | Readyflow",
    description:
      "What is included and separate in the ₹11,999 Instagram Brand Shopify Launch package.",
    path: "/delivery-scope-policy",
    eyebrow: "Delivery & Scope Policy",
    updated: "Last updated: 20 June 2026",
    sections: [
      {
        heading: "Included in the ₹11,999 setup",
        bullets: [
          "Shopify theme setup and homepage setup.",
          "Collection setup and up to 10 products uploaded.",
          "Product page layout, size chart section and WhatsApp/contact button.",
          "Basic policy pages, payment/shipping setup guidance, mobile-first layout and basic SEO setup.",
          "7 days of basic post-delivery support for small fixes and guidance.",
        ],
      },
      {
        heading: "Outside this setup fee",
        bullets: [
          "Shopify subscription, domain and paid apps.",
          "Product photos, ad management and custom-coded platforms.",
          "Unlimited revisions or large scope changes after handoff.",
        ],
      },
      {
        heading: "Timeline",
        body:
          "The usual timeline is 3–5 days after content, products, Shopify access and brand details are ready.",
      },
      {
        heading: "Results clarity",
        body:
          "Readyflow sets up the store structure, product flow and trust-building layout. Sales, revenue, rankings, ad performance and business results depend on your products, pricing, content, traffic and follow-up.",
      },
    ],
  },
};

export default function PolicyPage({ type }: { type: PolicyKey }) {
  const policy = POLICIES[type];

  return (
    <>
      <SEO
        title={policy.title}
        description={policy.description}
        canonicalPath={policy.path}
      />
      <section className="bg-[#F4EFE6] px-6 pb-20 pt-36 text-[#070707] md:pb-28 md:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#0A8F50]">
            {policy.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            {policy.eyebrow}
          </h1>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-black/35">
            {policy.updated}
          </p>

          <div className="mt-12 space-y-5">
            {policy.sections.map((section) => (
              <article
                key={section.heading}
                className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-sm md:p-9"
              >
                <h2 className="text-2xl font-black tracking-tight">
                  {section.heading}
                </h2>
                {section.body && (
                  <p className="mt-4 text-sm font-medium leading-relaxed text-black/60 md:text-base">
                    {section.body}
                  </p>
                )}
                {section.bullets && (
                  <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-black/60 md:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1DFF8A]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
