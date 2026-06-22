/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLeadFormModal } from "../components/LeadFormModalContext";
import { trackCTAClick, trackViewContent } from "../lib/metaPixel";
import { getSeoRoute } from "../lib/seoRoutes";

const SEO_ROUTE = getSeoRoute("/ecommerce-website-development-india");
const PAGE_PATH = SEO_ROUTE.path;
const CTA_SOURCE = SEO_ROUTE.ctaSource!;
const PRIMARY_CTA = "Get My Store Launch Plan";

const SHOPIFY_BUILDER_URL = "https://www.shopify.com/in/website/builder";
const SHOPIFY_PRICING_URL = "https://www.shopify.com/in/pricing";
const SHOPIFY_PRODUCTS_URL = "https://help.shopify.com/en/manual/products";
const SHOPIFY_SHIPPING_URL =
  "https://help.shopify.com/en/manual/fulfillment/setup";
const WOOCOMMERCE_URL = "https://woocommerce.com/";
const WHATSAPP_CLICK_TO_CHAT_URL =
  "https://faq.whatsapp.com/5913398998672934";

const INCLUDED = [
  "Homepage shaped around products and collections",
  "Collection and category setup",
  "Product-page structure and catalogue setup within scope",
  "Basic policy, contact, and trust sections",
  "Payment gateway and checkout setup guidance",
  "Shipping settings and delivery-flow guidance",
  "Mobile-first navigation and product browsing",
  "WhatsApp or contact CTA",
  "Launch review and basic on-page SEO",
];

const NOT_INCLUDED = [
  "Custom marketplace or multi-vendor development",
  "Custom backend or enterprise architecture",
  "Mobile app development",
  "ERP, CRM, warehouse, or complex accounting integrations",
  "Advanced custom Shopify apps",
  "Advertising, photography, or content production unless agreed",
  "Shopify subscription, domain, paid themes, or paid apps",
  "Gateway processing and courier charges",
];

export const FAQS = [
  {
    question: "How much does ecommerce website development cost in India?",
    answer:
      "It depends on the platform, catalogue, design depth, content readiness, apps, and integrations. Readyflow’s focused Shopify launch setup is ₹14,999, with platform and third-party costs separate.",
  },
  {
    question: "What is included in ecommerce website development?",
    answer:
      "For a small product brand, it usually includes the homepage, collections, product pages, navigation, checkout setup, payment and shipping settings, policy pages, contact options, and mobile usability.",
  },
  {
    question: "Is Shopify good for ecommerce websites?",
    answer:
      "Yes, for many small product brands. It provides hosted infrastructure, checkout, catalogue tools, themes, and store management without requiring a custom backend.",
  },
  {
    question: "Should I choose Shopify or custom development?",
    answer:
      "Choose Shopify for a standard product, collection, checkout, and shipping flow. Consider custom development only when unusual workflows or integrations genuinely require it.",
  },
  {
    question: "How long does an ecommerce website take to build?",
    answer:
      "Readyflow’s focused Shopify setup typically takes 3–5 days after products, photos, prices, policies, and access are ready.",
  },
  {
    question: "Can Readyflow build a store for Instagram sellers?",
    answer:
      "Yes. The core offer is designed for product brands moving from Instagram, WhatsApp, DMs, or offline selling into a cleaner catalogue and checkout flow.",
  },
  {
    question: "Are domain and hosting included?",
    answer:
      "The domain is separate. Shopify plans include hosted platform infrastructure and SSL, while the Shopify subscription is also paid separately.",
  },
  {
    question: "Can payment and shipping be set up?",
    answer:
      "Readyflow can guide and configure the basic store-side setup. Provider processing, courier accounts, and per-shipment charges stay separate.",
  },
  {
    question: "Do I need product photos before starting?",
    answer:
      "Ideally, yes. Product photos, names, prices, variants, and categories are the main inputs for a useful store.",
  },
  {
    question: "Can I use WhatsApp with my ecommerce website?",
    answer:
      "Yes. WhatsApp can remain in the journey for sizing, delivery, customisation, and pre-purchase questions.",
  },
  {
    question: "Is this suitable for clothing or jewellery brands?",
    answer:
      "Yes. Visual product brands benefit from clear collections, strong imagery, variants, trust information, and a simple mobile route from social content to products.",
  },
  {
    question: "When is custom ecommerce development actually needed?",
    answer:
      "Usually for marketplace logic, deep integrations, complex inventory or pricing workflows, advanced B2B rules, or multiple connected operational systems.",
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
    const id = "ecommerce-development-india-schema";
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
          name: "Ecommerce Website Development in India for Small Brands",
          description:
            "Ecommerce website development in India for small product brands, with practical Shopify setup, platform guidance, scope clarity, and launch support.",
          inLanguage: "en-IN",
          breadcrumb: { "@id": `https://www.readyflow.site${PAGE_PATH}#breadcrumb` },
          about: { "@id": `https://www.readyflow.site${PAGE_PATH}#service` },
        },
        {
          "@type": "Service",
          "@id": `https://www.readyflow.site${PAGE_PATH}#service`,
          name: "Ecommerce Website Development for Small Product Brands",
          serviceType: "Shopify-focused ecommerce website setup",
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
              name: "Ecommerce Website Development in India",
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

export default function EcommerceWebsiteDevelopmentIndia() {
  const offerRef = useRef<HTMLElement | null>(null);
  const viewed = useRef(false);
  const inView = useInView(offerRef, { once: true, margin: "-120px" });

  useEffect(() => {
    if (!inView || viewed.current) return;
    viewed.current = true;
    trackViewContent({
      content_name: "Ecommerce Website Development in India",
      value: 11999,
      currency: "INR",
      section: "included_scope",
      cta_source: CTA_SOURCE,
    });
  }, [inView]);

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

      <article className="editorial-shell">
        <header className="mx-auto max-w-6xl px-5 pb-12 pt-36 sm:px-6 md:pb-16 md:pt-44">
          <p className="editorial-kicker">Small business &amp; ecommerce</p>
          <h1 className="editorial-headline mt-5 max-w-5xl">
            Ecommerce Website Development in India for Small Product Brands
          </h1>
          <p className="editorial-deck mt-7">
            What should a small Indian product brand actually build—and when is
            a practical Shopify store more sensible than custom ecommerce
            development?
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-black/10 py-4 text-xs font-semibold text-black/48">
            <span>By Readyflow Editorial Desk</span>
            <span>Updated June 20, 2026</span>
            <span>11 min read</span>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedCTA section="hero" />
            <TrackedCTA
              section="hero"
              label="Check if Shopify Fits My Brand"
              light
            />
          </div>
        </header>

        <figure className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="aspect-[16/8.5] overflow-hidden bg-black/5">
            <img
              src="/seo/confelion-store.jpg"
              alt="Clothing ecommerce collection page designed for mobile and catalogue browsing"
              width="900"
              height="506"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="editorial-caption">
            A useful small-brand ecommerce site is primarily a clear catalogue,
            product-information, checkout, and contact system. Image: existing
            Readyflow portfolio.
          </figcaption>
        </figure>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[190px_minmax(0,760px)] lg:justify-center">
          <aside className="hidden lg:block">
            <nav className="sticky top-32 border-t-2 border-black pt-4 text-xs">
              <p className="font-black uppercase tracking-[0.18em]">In this guide</p>
              <div className="mt-4 space-y-3 font-semibold leading-5 text-black/48">
                <a href="#meaning" className="block hover:text-[#087746]">What development means</a>
                <a href="#platform-choice" className="block hover:text-[#087746]">Platform choice</a>
                <a href="#readyflow-builds" className="block hover:text-[#087746]">Readyflow scope</a>
                <a href="#cost" className="block hover:text-[#087746]">Cost clarity</a>
                <a href="#proof" className="block hover:text-[#087746]">Relevant work</a>
                <a href="#faq" className="block hover:text-[#087746]">FAQs</a>
              </div>
            </nav>
          </aside>

          <div className="editorial-copy">
            <section id="meaning" className="scroll-mt-28">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.82]">
                For a small product brand, ecommerce website development usually
                means organising products into a store that customers can
                understand and use. The essential pieces are a homepage,
                collections, product pages, navigation, checkout, payments,
                shipping settings, policies, trust information, and a mobile
                path to contact or WhatsApp.
              </p>
              <p>
                It does not automatically mean engineering a marketplace,
                custom backend, mobile app, or enterprise system. Many
                businesses search for a developer when what they really need is
                a platform chosen well and configured with care.
              </p>
              <div className="editorial-note">
                <strong>The practical definition:</strong> ecommerce
                development for a small brand is the work of turning its product
                catalogue and operating rules into a usable online buying flow.
              </div>
            </section>

            <section>
              <h2>Who this route is designed for</h2>
              <p>
                Readyflow’s lane is deliberately narrower than a full-service
                enterprise ecommerce agency. It is intended for Instagram
                sellers, clothing and jewellery brands, accessories and perfume
                businesses, boutiques, handmade sellers, and small offline
                shops moving a repeatable catalogue online.
              </p>
              <ul>
                <li>Products, prices, and categories are becoming stable.</li>
                <li>Customers currently browse through posts, highlights, DMs, or WhatsApp.</li>
                <li>The brand needs a proper mobile catalogue and checkout path.</li>
                <li>The business does not require a marketplace or custom operational software.</li>
              </ul>
              <blockquote className="editorial-pullquote">
                A small brand does not need enterprise architecture to stop
                selling through scattered screenshots and messages.
              </blockquote>
            </section>

            <figure className="my-12">
              <img
                src="/seo/pearll-store.jpg"
                alt="Jewellery and accessories ecommerce homepage with product-led visual presentation"
                loading="lazy"
                width="900"
                height="506"
                className="w-full"
              />
              <figcaption className="editorial-caption">
                Visual product brands benefit from strong imagery, but the
                store still needs clear collections, product facts, policies,
                and contact routes. Image: existing Readyflow portfolio.
              </figcaption>
            </figure>

            <section>
              <h2>What each part of the website is supposed to do</h2>
              <h3>Homepage</h3>
              <p>
                Explain what the brand sells, introduce the strongest
                collections, and give a mobile visitor an obvious route into
                the catalogue. It should not make the buyer decode an art
                project before seeing a product.
              </p>
              <h3>Collections and product pages</h3>
              <p>
                Collections reduce the mental size of a catalogue. Product
                pages then answer price, variant, sizing, material,
                availability, and delivery questions. Shopify documents these
                catalogue foundations in its{" "}
                <ExternalTextLink href={SHOPIFY_PRODUCTS_URL}>
                  official product guidance
                </ExternalTextLink>
                .
              </p>
              <h3>Checkout, shipping, and policies</h3>
              <p>
                Checkout should feel dependable. Shipping areas, rates, return
                expectations, privacy, and terms should be understandable before
                purchase. Shopify’s{" "}
                <ExternalTextLink href={SHOPIFY_SHIPPING_URL}>
                  shipping setup guidance
                </ExternalTextLink>{" "}
                explains how delivery settings affect what customers see at
                checkout.
              </p>
            </section>

            <hr className="editorial-rule" />

            <section id="platform-choice" className="scroll-mt-28">
              <p className="editorial-kicker">Platform decision</p>
              <h2 className="!mt-4">Shopify, WooCommerce, or custom ecommerce?</h2>
              <p>
                This is not a full comparison article. It is a short filter for
                deciding how much technology the business needs to own and
                maintain.
              </p>
              <div className="my-8 divide-y divide-black/12 border-y border-black/12">
                <div className="py-7">
                  <h3 className="!mt-0">Shopify-based ecommerce setup</h3>
                  <p className="!mb-0">
                    Usually the best fit for small product brands, quick
                    launches, standard catalogues, clean checkout, and owners
                    who do not want to manage hosting and plugins. Shopify’s{" "}
                    <ExternalTextLink href={SHOPIFY_BUILDER_URL}>
                      official ecommerce builder overview
                    </ExternalTextLink>{" "}
                    describes its hosted store tools, products, payments, and
                    security.
                  </p>
                </div>
                <div className="py-7">
                  <h3 className="!mt-0">WooCommerce and WordPress</h3>
                  <p className="!mb-0">
                    More suitable for content-heavy businesses, teams that want
                    the WordPress ecosystem, and owners comfortable with
                    hosting, plugins, updates, and technical control.
                    WooCommerce describes itself as an open-source platform
                    where the owner chooses the host and feature stack; see its{" "}
                    <ExternalTextLink href={WOOCOMMERCE_URL}>
                      official overview
                    </ExternalTextLink>
                    .
                  </p>
                </div>
                <div className="py-7">
                  <h3 className="!mt-0">Custom ecommerce development</h3>
                  <p className="!mb-0">
                    Appropriate when the business has unusual workflows,
                    marketplace logic, deep integrations, advanced B2B rules,
                    or multiple operational systems. This is a different
                    engineering project—not Readyflow’s ₹14,999 service lane.
                  </p>
                </div>
              </div>
              <TrackedCTA
                section="platform_choice"
                label="Check if Shopify Fits My Brand"
                className="w-full sm:w-auto"
              />
            </section>

            <section id="readyflow-builds" ref={offerRef} className="scroll-mt-28">
              <h2>What Readyflow builds for product brands</h2>
              <p>
                Readyflow builds a focused, mobile-first Shopify store around
                the brand’s current catalogue. The present Instagram Brand
                Shopify Launch starts at ₹14,999 for setup work.
              </p>
              <div className="my-8 grid gap-8 border-y border-black/12 py-8 md:grid-cols-2">
                <div>
                  <h3 className="!mt-0">Included</h3>
                  <ul>
                    {INCLUDED.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="!mt-0">Not included</h3>
                  <ul>
                    {NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <p>
                When the current bonus is active, confirming within the
                48-hour window can include up to five simple brand-specific
                Shopify sections at no extra setup fee. That is a scoped launch
                bonus, not unlimited custom development.
              </p>
              <p>
                The focused service route is explained in more detail in{" "}
                <Link
                  to="/shopify-store-setup-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  Shopify store setup for Instagram brands
                </Link>
                .
              </p>
              <TrackedCTA
                section="included_scope"
                className="my-5 w-full sm:w-auto"
              />
            </section>

            <section id="cost" className="scroll-mt-28">
              <h2>What ecommerce website cost actually includes</h2>
              <p>
                Readyflow’s ₹14,999 is the service fee, not the lifetime cost
                of operating the store. The wider budget includes the Shopify
                subscription, a domain, optional themes or apps, payment
                processing, shipping charges, photography or content, and any
                work beyond the agreed scope.
              </p>
              <p>
                Shopify’s prices change, so use the{" "}
                <ExternalTextLink href={SHOPIFY_PRICING_URL}>
                  official Shopify pricing page
                </ExternalTextLink>{" "}
                before purchasing a plan. For a detailed budget model, read the{" "}
                <Link
                  to="/shopify-store-setup-cost-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  Shopify setup cost breakdown
                </Link>
                .
              </p>
              <div className="editorial-note">
                Cost increases mainly when the catalogue is large, content is
                missing, custom design is deep, or the business needs
                integrations and paid tools.
              </div>
              <TrackedCTA section="cost_clarity" className="w-full sm:w-auto" />
            </section>

            <figure className="my-12">
              <img
                src="/seo/lkprint-store.jpg"
                alt="Printed clothing ecommerce homepage showing a mobile-oriented product brand visual"
                loading="lazy"
                width="900"
                height="506"
                className="w-full"
              />
              <figcaption className="editorial-caption">
                Social traffic arrives with little patience. Strong mobile
                hierarchy and an obvious product route matter more than adding
                every possible feature. Image: existing Readyflow portfolio.
              </figcaption>
            </figure>

            <section>
              <h2>Why mobile and WhatsApp belong in the same buying flow</h2>
              <p>
                Instagram, WhatsApp, and ad traffic commonly opens the store on
                a phone. Product cards must be readable, navigation must be
                simple, calls to action must be thumb-friendly, and trust
                information should appear before checkout.
              </p>
              <p>
                The website does not need to replace WhatsApp. For many Indian
                product brands, the practical route is Instagram or content →
                store browsing → checkout or WhatsApp questions. Buyers can ask
                about size, delivery, customisation, or availability before
                ordering.
              </p>
              <p>
                WhatsApp’s{" "}
                <ExternalTextLink href={WHATSAPP_CLICK_TO_CHAT_URL}>
                  official click-to-chat guidance
                </ExternalTextLink>{" "}
                confirms that a link can open a conversation without requiring
                the customer to save the number first.
              </p>
            </section>

            <section>
              <h2>Process and timeline</h2>
              <ol>
                <li>Share the brand, catalogue, and current sales flow.</li>
                <li>Readyflow reviews whether the focused Shopify scope fits.</li>
                <li>Provide photos, products, prices, policies, and access.</li>
                <li>The homepage, catalogue, product flow, and settings are built.</li>
                <li>Review the store on mobile and desktop.</li>
                <li>Launch after approval.</li>
              </ol>
              <p>
                A focused store typically launches in 3–5 days after content
                and access are ready. Missing photos, changing prices,
                incomplete variants, or unclear policies are the most common
                reasons the timeline moves.
              </p>
              <TrackedCTA
                section="process"
                label="Plan My Ecommerce Store"
                className="w-full sm:w-auto"
              />
            </section>

            <hr className="editorial-rule" />

            <section id="proof" className="scroll-mt-28">
              <p className="editorial-kicker">Relevant work</p>
              <h2 className="!mt-4">Product-brand storefront examples</h2>
              <p>
                The examples below show clothing, jewellery, and printed
                product use cases from the existing Readyflow portfolio. They
                are presented as design and catalogue examples—not as claims
                about revenue or conversion uplift.
              </p>
              <div className="my-8 grid gap-5 sm:grid-cols-2">
                <figure>
                  <img
                    src="/seo/deazy-store.jpg"
                    alt="Deazy fashion ecommerce homepage"
                    loading="lazy"
                    width="1100"
                    height="619"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <figcaption className="editorial-caption">Deazy · Fashion and streetwear</figcaption>
                </figure>
                <figure>
                  <img
                    src="/seo/haelo-store.jpg"
                    alt="Haelo product ecommerce homepage"
                    loading="lazy"
                    width="1100"
                    height="619"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <figcaption className="editorial-caption">Haelo · Product storefront</figcaption>
                </figure>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 font-bold text-[#087746] underline underline-offset-4"
              >
                View the full work archive <ArrowRight className="h-4 w-4" />
              </Link>
              <TrackedCTA
                section="proof"
                label="Build My Product Brand Store"
                className="mt-7 w-full sm:w-auto"
              />
            </section>

            <hr className="editorial-rule" />

            <section id="faq" className="scroll-mt-28">
              <p className="editorial-kicker">Frequently asked questions</p>
              <h2 className="!mt-4">Choosing the practical ecommerce route</h2>
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
                label="Plan My Ecommerce Store"
                className="mt-8 w-full sm:w-auto"
              />
            </section>
          </div>
        </div>

        <section className="border-y border-black/12 bg-[#eef8f1] px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="editorial-kicker">A practical recommendation</p>
            <h2 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Not sure whether you need Shopify setup or custom development?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-black/62">
              Share your brand details. Readyflow will suggest the simpler route
              when it fits—and say so when the project needs a different
              specialist.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedCTA section="final_cta" />
              <TrackedCTA
                section="final_cta"
                label="Check if Shopify Fits My Brand"
                light
              />
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
}
