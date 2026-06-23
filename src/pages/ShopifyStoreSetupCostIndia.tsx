/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLeadFormModal } from "../components/LeadFormModalContext";
import SeoArticleTracker from "../components/SeoArticleTracker";
import { trackCTAClick } from "../lib/metaPixel";
import { getSeoRoute } from "../lib/seoRoutes";

const SEO_ROUTE = getSeoRoute("/shopify-store-setup-cost-india");
const PAGE_PATH = SEO_ROUTE.path;
const CTA_SOURCE = SEO_ROUTE.ctaSource!;
const PRIMARY_CTA = "Check if ₹14,999 setup fits my brand";

const SHOPIFY_PRICING_URL = "https://www.shopify.com/in/pricing";
const SHOPIFY_DOMAINS_URL = "https://help.shopify.com/en/manual/domains";
const SHOPIFY_THEMES_URL = "https://themes.shopify.com/";
const SHOPIFY_APPS_URL = "https://apps.shopify.com/";
const RAZORPAY_PRICING_URL = "https://razorpay.com/pricing/";

const COST_ROWS = [
  ["Readyflow Shopify launch setup", "One-time", "Readyflow", "Yes"],
  ["Shopify plan", "Monthly or annual", "Shopify", "No"],
  ["Custom domain", "Annual", "Shopify or registrar", "No"],
  ["Paid theme", "Usually one-time", "Theme seller", "No"],
  ["Paid apps", "Recurring or usage-based", "App developer", "No"],
  ["Payment gateway processing", "Per transaction", "Gateway provider", "No"],
  ["Shipping provider charges", "Per shipment", "Courier or aggregator", "No"],
  ["Photography, content, or ads", "Project or ongoing", "Client or third party", "No"],
  ["Extra uploads or custom work", "Scope-based", "Readyflow or specialist", "Beyond scope"],
];

const INCLUDED = [
  "Shopify store structure and theme setup",
  "Homepage, collections, and category setup",
  "Product-page format and up to 10 product uploads",
  "Basic policy pages using approved business details",
  "Checkout, payment, and shipping setup guidance",
  "WhatsApp or contact flow",
  "Mobile-first storefront structure",
  "Basic on-page SEO setup",
  "Seven days of basic post-delivery support",
];

const NOT_INCLUDED = [
  "Shopify subscription or renewal charges",
  "Custom domain purchase or annual renewal",
  "Paid Shopify apps or a paid theme",
  "Product photography or content production",
  "Advertising or ad management",
  "Courier and shipping-aggregator charges",
  "Payment gateway processing fees",
  "Complex apps, custom backends, or advanced integrations",
  "Large catalogue uploads beyond the agreed scope",
];

export const FAQS = [
  {
    question: "How much does Shopify store setup cost in India?",
    answer:
      "For Readyflow’s focused offer, the setup work is ₹14,999. Your total launch budget also includes the Shopify plan, a domain, optional apps or theme, payment and shipping provider charges, and any separate content work.",
  },
  {
    question: "What does Readyflow’s ₹14,999 setup include?",
    answer:
      "It covers a focused Shopify launch: store structure, homepage, collections, product-page format, up to 10 product uploads, basic policies, WhatsApp/contact flow, setup guidance, mobile structure, and basic SEO.",
  },
  {
    question: "Is the Shopify subscription included?",
    answer:
      "No. Shopify is a recurring platform charge paid directly to Shopify. The ₹14,999 is Readyflow’s one-time setup fee.",
  },
  {
    question: "Is a domain included?",
    answer:
      "No. A custom domain is purchased separately, should remain in your business account, and normally renews annually.",
  },
  {
    question: "Are paid apps included?",
    answer:
      "No. Paid apps are optional third-party products. Many focused stores can launch with few or no paid apps.",
  },
  {
    question: "Do I need a paid Shopify theme?",
    answer:
      "Not necessarily. A free Shopify theme can work well for a small first launch when the catalogue, photos, and content are strong.",
  },
  {
    question: "Can I begin with a lower-cost Shopify setup?",
    answer:
      "Yes, when the catalogue is focused, the content is ready, and the business does not need advanced custom features or integrations.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Readyflow’s typical timeline is 3–5 days after the required product content, policies, brand details, and access are ready.",
  },
  {
    question: "Do product photos need to be ready?",
    answer:
      "Ideally, yes. Photography is separate, and a store cannot be reviewed properly without usable product images.",
  },
  {
    question: "Can Readyflow help with payment and shipping setup?",
    answer:
      "Yes, with the store-side configuration and guidance. Gateway processing, courier accounts, and provider charges stay separate.",
  },
  {
    question: "What costs can increase later?",
    answer:
      "Paid apps, premium themes, more products, custom sections, photography, copywriting, integrations, and higher payment or shipping usage.",
  },
];

function ExternalTextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#087746] underline decoration-black/20 underline-offset-4"
    >
      {children}
      <ExternalLink className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function TrackedCTA({
  section,
  label = PRIMARY_CTA,
  light = false,
  className = "",
}: {
  section: string;
  label?: string;
  light?: boolean;
  className?: string;
}) {
  const { openLeadFormModal } = useLeadFormModal();

  return (
    <button
      type="button"
      onClick={() => {
        const params = {
          cta_label: label,
          section,
          source_section: section,
          cta_source: CTA_SOURCE,
          destination: "lead_form_modal",
        };
        trackCTAClick(params);
        openLeadFormModal(params);
      }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-4 text-center text-[10px] font-black uppercase tracking-[0.14em] transition sm:text-[11px] ${
        light
          ? "border border-black/15 bg-white text-black hover:border-black/40"
          : "bg-[#087746] text-white hover:bg-[#065f39]"
      } ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  );
}

function StructuredData() {
  useEffect(() => {
    const id = "shopify-cost-india-schema";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://www.readyflow.site${PAGE_PATH}#webpage`,
          url: `https://www.readyflow.site${PAGE_PATH}`,
          name: "Shopify Store Setup Cost in India | Readyflow",
          description:
            "Understand Shopify store setup cost in India, including Readyflow setup, Shopify plan, domain, apps, payment, shipping, and content costs.",
          inLanguage: "en-IN",
          breadcrumb: { "@id": `https://www.readyflow.site${PAGE_PATH}#breadcrumb` },
          about: { "@id": `https://www.readyflow.site${PAGE_PATH}#service` },
        },
        {
          "@type": "Service",
          "@id": `https://www.readyflow.site${PAGE_PATH}#service`,
          name: "Readyflow Shopify Launch Setup",
          serviceType: "Shopify store setup for small product brands",
          areaServed: { "@type": "Country", name: "India" },
          provider: { "@id": "https://www.readyflow.site/#organization" },
        },
        {
          "@type": "FAQPage",
          "@id": `https://www.readyflow.site${PAGE_PATH}#faq`,
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://www.readyflow.site${PAGE_PATH}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.readyflow.site/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Shopify Store Setup Cost in India",
              item: `https://www.readyflow.site${PAGE_PATH}`,
            },
          ],
        },
        {
          "@type": "Organization",
          "@id": "https://www.readyflow.site/#organization",
          name: "Readyflow",
          url: "https://www.readyflow.site/",
          logo: "https://www.readyflow.site/icon.png",
        },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}

export default function ShopifyStoreSetupCostIndia() {
  return (
    <>
      <SEO
        title={SEO_ROUTE.title}
        description={SEO_ROUTE.description}
        canonicalPath={PAGE_PATH}
        type="article"
        image={SEO_ROUTE.ogImage}
      />
      <StructuredData />
      <SeoArticleTracker articleSlug={SEO_ROUTE.path} articleTitle={SEO_ROUTE.h1} articleCategory={SEO_ROUTE.category} section="included_scope" />

      <article className="editorial-shell">
        <header className="mx-auto max-w-6xl px-5 pb-12 pt-36 sm:px-6 md:pb-16 md:pt-44">
          <p className="editorial-kicker">Money &amp; ecommerce · India</p>
          <h1 className="editorial-headline mt-5 max-w-5xl">
            Shopify Store Setup Cost in India Explained Clearly
          </h1>
          <p className="editorial-deck mt-7">
            The real price of launching a Shopify store is not one bundled
            figure. Here is what goes to Readyflow, what goes to Shopify, and
            which operating costs remain separate.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-black/10 py-4 text-xs font-semibold text-black/48">
            <span>By Readyflow Editorial Desk</span>
            <span>Updated June 20, 2026</span>
            <span>10 min read</span>
          </div>
        </header>

        <figure className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="aspect-[16/8.5] overflow-hidden bg-black/5">
            <img
              src="/seo/deazy-store.jpg"
              alt="Fashion ecommerce storefront showing a product-led homepage"
              width="1100"
              height="619"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="editorial-caption">
            A focused product-brand store can begin with a standard Shopify
            structure; the budget rises when content, catalogue size, and custom
            requirements expand. Image: existing Readyflow portfolio.
          </figcaption>
        </figure>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[190px_minmax(0,760px)] lg:justify-center">
          <aside className="hidden lg:block">
            <nav className="sticky top-32 border-t-2 border-black pt-4 text-xs">
              <p className="font-black uppercase tracking-[0.18em]">In this guide</p>
              <div className="mt-4 space-y-3 font-semibold leading-5 text-black/48">
                <a href="#quick-answer" className="block hover:text-[#087746]">Quick answer</a>
                <a href="#cost-breakdown" className="block hover:text-[#087746]">Cost breakdown</a>
                <a href="#readyflow-fee" className="block hover:text-[#087746]">Readyflow fee</a>
                <a href="#separate-costs" className="block hover:text-[#087746]">Separate costs</a>
                <a href="#fit" className="block hover:text-[#087746]">When it is enough</a>
                <a href="#faq" className="block hover:text-[#087746]">FAQs</a>
              </div>
            </nav>
          </aside>

          <div className="editorial-copy">
            <section id="quick-answer" className="scroll-mt-28">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.82]">
                Confusion usually begins when a setup fee is presented as if it
                were the entire cost of owning an online store. It is not.
                Readyflow’s ₹14,999 covers the work of preparing a focused
                Shopify launch. The platform, domain, payment processing,
                shipping, and optional tools belong to different providers.
              </p>
              <div className="editorial-note">
                <strong>Quick formula:</strong> actual Shopify launch cost =
                Readyflow setup fee + Shopify plan + domain + optional
                themes/apps + payment and shipping charges + any separate
                content or photography work.
              </div>
              <p>
                This separation is useful, not a hidden catch. Your Shopify
                account, domain, gateway, and courier relationships remain in
                your business name. You can see who is billing you and decide
                which optional tools are worth keeping.
              </p>
              <div className="my-9 flex flex-col gap-3 border-y border-black/10 py-6 sm:flex-row">
                <TrackedCTA section="quick_cost_answer" className="w-full sm:w-auto" />
                <a
                  href="#cost-breakdown"
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-xs font-black uppercase tracking-[0.14em] text-black/55"
                >
                  See the breakdown <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </section>

            <section>
              <h2>Why two Shopify quotes can look completely different</h2>
              <p>
                A low quote may assume that product photos, descriptions,
                categories, and policies are already prepared. A higher quote
                may include content production, custom design, a large
                catalogue, paid tools, or technical integrations. Comparing
                only the headline number hides the work underneath it.
              </p>
              <p>
                For a small Instagram-first brand, the cheapest sensible route
                is often a lean platform setup with good product inputs. Buying
                premium themes and apps before the store has a proven need can
                create recurring cost without improving the launch.
              </p>
              <blockquote className="editorial-pullquote">
                The useful question is not “What is the cheapest Shopify
                website?” It is “Which costs help this brand launch, and which
                can wait?”
              </blockquote>
            </section>

            <section id="cost-breakdown" className="scroll-mt-28">
              <h2>The Shopify launch cost breakdown</h2>
              <p>
                The table below is the commercial utility part of this guide:
                one place to see who charges each item and whether it sits
                inside Readyflow’s setup fee.
              </p>
              <div className="-mx-5 my-8 overflow-x-auto border-y border-black/15 sm:mx-0">
                <table className="min-w-[720px] w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-black bg-[#f3f0e9]">
                      {["Cost item", "Timing", "Charged by", "In ₹14,999?"].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em]"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {COST_ROWS.map(([item, timing, owner, included]) => (
                      <tr key={item}>
                        <th scope="row" className="px-4 py-4 font-bold">{item}</th>
                        <td className="px-4 py-4 text-black/58">{timing}</td>
                        <td className="px-4 py-4 text-black/58">{owner}</td>
                        <td className="px-4 py-4 font-bold text-[#087746]">
                          {included}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                On mobile, the table can be swiped horizontally. It is kept as
                a real table because this is comparison information—not a set
                of decorative cards.
              </p>
            </section>

            <figure className="my-12">
              <img
                src="/seo/manish-fashion-store.jpg"
                alt="Fashion ecommerce collection page showing multiple product categories"
                loading="lazy"
                width="1100"
                height="619"
                className="w-full"
              />
              <figcaption className="editorial-caption">
                Catalogue size and content readiness affect setup effort more
                than the phrase “Shopify website” suggests. Image: existing
                Readyflow portfolio.
              </figcaption>
            </figure>

            <section id="readyflow-fee" className="scroll-mt-28">
              <h2>What Readyflow’s ₹14,999 fee actually pays for</h2>
              <p>
                The one-time fee pays for turning your approved brand and
                product inputs into a launch-ready Shopify structure. It is
                aimed at small product brands that need a clean first store,
                rather than a custom software project.
              </p>
              <div className="my-8 grid gap-8 border-y border-black/12 py-8 md:grid-cols-2">
                <div>
                  <h3 className="!mt-0">Included in the setup</h3>
                  <ul>
                    {INCLUDED.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="!mt-0">Kept separate</h3>
                  <ul>
                    {NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <p>
                When the current 48-Hour Launch Bonus is active, confirming
                within the window can include up to five simple,
                brand-specific Shopify sections at no extra setup fee. It does
                not mean unlimited custom development.
              </p>
              <TrackedCTA
                section="included_scope"
                label="Get my Shopify cost breakdown"
                className="my-5 w-full sm:w-auto"
              />
            </section>

            <hr className="editorial-rule" />

            <section id="separate-costs" className="scroll-mt-28">
              <h2>The recurring and third-party costs</h2>
              <h3>Shopify subscription</h3>
              <p>
                Shopify hosts and runs the store, so the plan is a recurring
                charge paid directly to Shopify. As checked on June 20, 2026,
                the India pricing page lists Basic from ₹1,499 per month when
                billed yearly. Promotions and standard rates change, so confirm
                the amount on the{" "}
                <ExternalTextLink href={SHOPIFY_PRICING_URL}>
                  official Shopify pricing page
                </ExternalTextLink>{" "}
                before purchase.
              </p>
              <h3>Domain</h3>
              <p>
                Every new store has a default myshopify.com address. A custom
                domain is normally better for brand trust, renews annually, and
                should remain in the client’s account. Shopify explains the
                options in its{" "}
                <ExternalTextLink href={SHOPIFY_DOMAINS_URL}>
                  official domain guidance
                </ExternalTextLink>
                .
              </p>
              <h3>Theme and apps</h3>
              <p>
                Many small stores can launch on a free theme. Paid themes and
                apps are optional choices when a real feature need appears.
                Compare the{" "}
                <ExternalTextLink href={SHOPIFY_THEMES_URL}>
                  official Theme Store
                </ExternalTextLink>{" "}
                and{" "}
                <ExternalTextLink href={SHOPIFY_APPS_URL}>
                  Shopify App Store
                </ExternalTextLink>{" "}
                rather than buying a stack of subscriptions before launch.
              </p>
              <h3>Payment gateway and shipping</h3>
              <p>
                Readyflow can guide the basic configuration, but transaction
                processing and courier costs belong to the providers. Razorpay
                is one common Indian example; its public standard pricing
                currently starts at 2% plus applicable GST. Verify current
                terms on the{" "}
                <ExternalTextLink href={RAZORPAY_PRICING_URL}>
                  official Razorpay pricing page
                </ExternalTextLink>
                .
              </p>
              <div className="editorial-note">
                Provider fees can change by plan, payment method, shipment,
                negotiated rate, and business profile. Treat official pricing
                pages as the final source before buying.
              </div>
              <TrackedCTA
                section="separate_costs"
                label="Ask what I’ll need to pay"
                className="w-full sm:w-auto"
              />
            </section>

            <figure className="my-12">
              <img
                src="/seo/haelo-store.jpg"
                alt="Product ecommerce storefront with a large visual hero and shop call to action"
                loading="lazy"
                width="1100"
                height="619"
                className="w-full"
              />
              <figcaption className="editorial-caption">
                A paid theme is not the only route to a visually distinctive
                store; strong product imagery and a clear hierarchy often do
                more of the work. Image: existing Readyflow portfolio.
              </figcaption>
            </figure>

            <section id="fit" className="scroll-mt-28">
              <h2>When ₹14,999 is enough—and when it is not</h2>
              <p>
                The focused setup is usually appropriate when the catalogue is
                small, product information is ready, the buying flow is
                conventional, and the brand does not need advanced integrations
                or a custom backend.
              </p>
              <p>
                A higher-budget build becomes more honest when the business
                needs a large catalogue, advanced filtering, subscriptions,
                custom apps, ERP or warehouse integrations, unusual shipping
                logic, or a heavily art-directed experience.
              </p>
              <p>
                That broader decision belongs to the guide on{" "}
                <Link
                  to="/ecommerce-website-development-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  ecommerce website development for small brands
                </Link>
                .
              </p>
              <p>
                For the practical launch scope behind the setup fee, read{" "}
                <Link
                  to="/shopify-store-setup-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  Shopify store setup for Instagram brands
                </Link>
                .
              </p>
            </section>

            <section>
              <h2>Process, timeline, and what to prepare</h2>
              <ol>
                <li>Submit your brand and product details.</li>
                <li>Readyflow reviews fit, scope, and separate costs.</li>
                <li>You provide products, photos, policies, and access.</li>
                <li>The store structure is built and reviewed.</li>
                <li>Launch follows approval.</li>
              </ol>
              <p>
                The typical timeline is 3–5 days after the main content and
                access are ready. Before setup, prepare the brand name, logo,
                product photos, names, prices, variants, categories, shipping
                preferences, policy notes, Instagram page, and contact details.
              </p>
            </section>

            <hr className="editorial-rule" />

            <section id="faq" className="scroll-mt-28">
              <p className="editorial-kicker">Frequently asked questions</p>
              <h2 className="!mt-4">Short answers before you decide</h2>
              <div className="divide-y divide-black/12 border-y border-black/12">
                {FAQS.map((faq, index) => (
                  <details key={faq.question} open={index === 0} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-bold">
                      {faq.question}
                      <span className="text-xl transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 !mb-0 text-[16px] leading-7 text-black/62">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
              <TrackedCTA
                section="faq"
                label="Ask what I’ll need to pay"
                className="mt-8 w-full sm:w-auto"
              />
            </section>
          </div>
        </div>

        <section className="border-y border-black/12 bg-[#eef8f1] px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="editorial-kicker">The practical next step</p>
            <h2 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Want to know whether ₹14,999 is enough for your brand?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-black/62">
              Share your catalogue and readiness. Readyflow will tell you
              whether the focused launch fits or whether a broader build would
              be more honest.
            </p>
            <TrackedCTA section="final_cta" className="mt-8 w-full sm:w-auto" />
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
}
