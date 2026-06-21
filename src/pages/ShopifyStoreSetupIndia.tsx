/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLeadFormModal } from "../components/LeadFormModalContext";
import { trackCTAClick, trackViewContent } from "../lib/metaPixel";
import { getSeoRoute } from "../lib/seoRoutes";

const SEO_ROUTE = getSeoRoute("/shopify-store-setup-india");
const PAGE_PATH = SEO_ROUTE.path;
const CTA_SOURCE = SEO_ROUTE.ctaSource!;

const SHOPIFY_PRICING_URL = "https://www.shopify.com/in/pricing";
const SHOPIFY_DOMAINS_URL = "https://help.shopify.com/en/manual/domains";
const SHOPIFY_PAYMENTS_URL =
  "https://help.shopify.com/en/manual/payments/third-party-providers";
const WHATSAPP_CLICK_TO_CHAT_URL =
  "https://faq.whatsapp.com/5913398998672934";

const INCLUDED = [
  "Shopify theme setup and a mobile-first store design",
  "Homepage structure, menus, collection pages, and product-page format",
  "Initial product setup of up to 10 products within the agreed launch scope",
  "Essential policy pages using approved business details",
  "Payment gateway, UPI, Razorpay, and COD setup guidance where applicable",
  "Shipping settings guidance for the store-side checkout flow",
  "WhatsApp button or contact flow, plus Instagram link-in-bio destination",
  "Basic SEO titles, meta descriptions, trust sections, and launch review",
];

export const FAQS = [
  {
    question: "How much does Shopify store setup cost in India?",
    answer:
      "Readyflow's focused Shopify launch setup is a one-time ₹11,999. The Shopify plan, domain, optional paid apps or themes, payment processing, shipping, photography, and advanced custom work are separate.",
  },
  {
    question: "What is included in Readyflow's ₹11,999 Shopify setup?",
    answer:
      "The launch covers theme and mobile store setup, homepage, collections, initial product setup within scope, policy pages, payment and shipping guidance, WhatsApp flow, basic SEO, trust sections, and launch review.",
  },
  {
    question: "Is the Shopify subscription included?",
    answer:
      "No. Readyflow's fee pays for the launch work. Your Shopify subscription is paid directly to Shopify and stays in your business account.",
  },
  {
    question: "Is a domain included?",
    answer:
      "No. A custom domain is a separate purchase and should remain in your business account. We can guide its connection to the store.",
  },
  {
    question: "How long does Shopify setup take?",
    answer:
      "A focused launch typically takes 3–5 days after the product content, policies, and account access are ready. Incomplete photos, changing prices, or unclear variants can extend the timeline.",
  },
  {
    question: "Do I need product photos before starting?",
    answer:
      "Yes, usable product photos, names, prices, descriptions, and variants make the build faster and the final store more useful. Product photography itself is separate from setup.",
  },
  {
    question: "Can you set up payment gateways and shipping rules?",
    answer:
      "Readyflow can configure the store-side flow and guide the setup of supported options such as Razorpay, UPI, COD, shipping zones, and rates. Provider approval, transaction fees, and courier charges stay separate.",
  },
  {
    question: "Is this good for clothing or jewellery brands?",
    answer:
      "Yes. The package is designed for visual product brands with a focused catalogue, including clothing, jewellery, accessories, perfume, watches, handmade products, and boutiques.",
  },
  {
    question: "Can I still use WhatsApp with Shopify?",
    answer:
      "Yes. Shopify should work alongside WhatsApp. Customers can browse and buy on the store, then use WhatsApp for sizing, customisation, delivery, or product questions.",
  },
  {
    question: "What if I only sell on Instagram right now?",
    answer:
      "That is exactly the starting point this launch is designed around. Your Instagram can keep attracting attention while the store becomes the clean destination for products, policies, and checkout.",
  },
];

function ExternalTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
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
  label,
  light = false,
  className = "",
}: {
  section: string;
  label: string;
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

function HeroVisual() {
  return (
    <svg
      viewBox="0 0 1200 650"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of an Instagram-first Indian product brand moving to a mobile Shopify storefront"
    >
      <rect width="1200" height="650" fill="#E8F1EB" />
      <circle cx="1090" cy="80" r="230" fill="#D3E5D8" />
      <circle cx="105" cy="590" r="185" fill="#F3D2B2" opacity=".62" />
      <path
        d="M690 80C770 150 800 255 775 362C750 470 656 560 548 588"
        fill="none"
        stroke="#087746"
        strokeWidth="2"
        strokeDasharray="8 10"
        opacity=".5"
      />
      <g transform="translate(75 130)">
        <rect width="270" height="282" rx="26" fill="#FFFCF5" stroke="#111" strokeWidth="3" />
        <rect x="22" y="22" width="226" height="64" rx="13" fill="#ECE7DC" />
        <circle cx="54" cy="54" r="18" fill="#E6A06A" />
        <path d="M45 58c12-17 18-17 31 0" fill="none" stroke="#6D3724" strokeWidth="4" strokeLinecap="round" />
        <rect x="87" y="38" width="105" height="9" rx="4.5" fill="#171717" opacity=".75" />
        <rect x="87" y="57" width="77" height="7" rx="3.5" fill="#171717" opacity=".26" />
        <rect x="22" y="105" width="226" height="108" rx="13" fill="#D6C2AE" />
        <path d="M78 179c10-44 28-65 57-65s46 21 57 65" fill="#A36348" />
        <path d="M91 178c9-30 25-47 44-47s35 17 44 47" fill="#FAE7CE" />
        <rect x="22" y="232" width="138" height="14" rx="7" fill="#171717" opacity=".78" />
        <rect x="22" y="255" width="88" height="9" rx="4.5" fill="#171717" opacity=".24" />
      </g>
      <g transform="translate(365 76)">
        <rect width="350" height="500" rx="49" fill="#121212" />
        <rect x="14" y="14" width="322" height="472" rx="39" fill="#FFFDF9" />
        <rect x="128" y="28" width="94" height="10" rx="5" fill="#171717" />
        <text x="41" y="79" fill="#087746" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">
          MUSE GOODS
        </text>
        <rect x="40" y="100" width="270" height="202" rx="18" fill="#D8B89C" />
        <path d="M114 265c19-80 47-122 89-122s71 42 89 122" fill="#5E4033" />
        <path d="M128 264c17-55 42-83 75-83s58 28 75 83" fill="#F4E1C8" />
        <rect x="41" y="327" width="184" height="16" rx="8" fill="#171717" />
        <rect x="41" y="354" width="119" height="11" rx="5.5" fill="#171717" opacity=".35" />
        <rect x="41" y="389" width="269" height="54" rx="27" fill="#087746" />
        <text x="98" y="422" fill="#FFFDF9" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">
          SHOP THE EDIT
        </text>
      </g>
      <g transform="translate(787 144)">
        <rect width="319" height="180" rx="25" fill="#FFFDF9" stroke="#111" strokeWidth="3" />
        <text x="31" y="43" fill="#171717" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">
          Store-ready essentials
        </text>
        {[
          ["Products", 77],
          ["Payment + COD", 108],
          ["Shipping", 139],
        ].map(([label, y]) => (
          <g key={label}>
            <circle cx="40" cy={Number(y) - 5} r="8" fill="#087746" />
            <path d={`M36 ${Number(y) - 5}l3 3 6-7`} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <text x="60" y={Number(y)} fill="#171717" fontFamily="Arial, sans-serif" fontSize="14">
              {label}
            </text>
          </g>
        ))}
      </g>
      <g transform="translate(810 381)">
        <rect width="248" height="118" rx="24" fill="#087746" />
        <circle cx="43" cy="42" r="18" fill="#D2F0D9" />
        <path d="M34 44c4-11 14-17 24-15 7 2 12 8 13 15-2 11-11 21-24 28l-12-5 3-11z" fill="none" stroke="#087746" strokeWidth="3" />
        <text x="76" y="42" fill="white" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">
          Instagram attention
        </text>
        <text x="28" y="87" fill="#D2F0D9" fontFamily="Arial, sans-serif" fontSize="15">
          becomes a place to buy.
        </text>
      </g>
    </svg>
  );
}

function StoreStructureVisual() {
  const steps = ["Homepage", "Collections", "Product pages", "Checkout / WhatsApp"];

  return (
    <svg
      viewBox="0 0 900 260"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram showing a Shopify store flow from homepage through collections and product pages to checkout or WhatsApp"
    >
      <rect width="900" height="260" rx="18" fill="#F1F5EF" />
      {steps.map((step, index) => {
        const x = 47 + index * 215;
        return (
          <g key={step}>
            {index < steps.length - 1 && (
              <path
                d={`M${x + 156} 130h48`}
                stroke="#087746"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
            <rect x={x} y="81" width="156" height="98" rx="18" fill="#FFFDF9" stroke="#171717" strokeWidth="2" />
            <circle cx={x + 30} cy="112" r="12" fill={index === 3 ? "#087746" : "#D8E8D8"} />
            <text x={x + 25} y="151" fill="#171717" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">
              {step === "Checkout / WhatsApp" ? "Checkout" : step}
            </text>
            {step === "Checkout / WhatsApp" && (
              <text x={x + 25} y="169" fill="#087746" fontFamily="Arial, sans-serif" fontSize="11">
                or WhatsApp question
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ProcessVisual() {
  const stages = ["Share", "Scope", "Build", "Review", "Launch"];
  return (
    <svg
      viewBox="0 0 900 190"
      className="h-auto w-full"
      role="img"
      aria-label="Five-stage Readyflow Shopify launch timeline: share, scope, build, review, launch"
    >
      <rect width="900" height="190" rx="18" fill="#171717" />
      <path d="M110 87H790" stroke="#6ECF8C" strokeWidth="2" />
      {stages.map((stage, index) => {
        const x = 110 + index * 170;
        return (
          <g key={stage}>
            <circle cx={x} cy="87" r="23" fill={index === stages.length - 1 ? "#1DFF8A" : "#FFFDF9"} />
            <text x={x} y="93" fill="#171717" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
              {index + 1}
            </text>
            <text x={x} y="139" fill="#FFFDF9" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">
              {stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function InstagramFlowVisual() {
  const nodes = [
    { label: "Instagram", sublabel: "attention", color: "#E9B7BD" },
    { label: "Shopify store", sublabel: "browse + trust", color: "#CFE9D5" },
    { label: "Checkout", sublabel: "or a question", color: "#F1D3B5" },
  ];

  return (
    <svg
      viewBox="0 0 900 250"
      className="h-auto w-full"
      role="img"
      aria-label="Flow diagram from Instagram to a Shopify store and then checkout or a WhatsApp question"
    >
      <rect width="900" height="250" rx="18" fill="#FFF7F0" />
      {nodes.map((node, index) => {
        const x = 77 + index * 285;
        return (
          <g key={node.label}>
            {index < nodes.length - 1 && (
              <path
                d={`M${x + 180} 125h75`}
                stroke="#171717"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
            <rect x={x} y="69" width="180" height="112" rx="24" fill={node.color} stroke="#171717" strokeWidth="2" />
            <text x={x + 90} y="117" fill="#171717" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" textAnchor="middle">
              {node.label}
            </text>
            <text x={x + 90} y="145" fill="#171717" fontFamily="Arial, sans-serif" fontSize="13" textAnchor="middle">
              {node.sublabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StructuredData() {
  useEffect(() => {
    const id = "shopify-store-setup-india-schema";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `https://www.readyflow.site${PAGE_PATH}#article`,
          headline: "Shopify Store Setup in India for Instagram Brands",
          description:
            "A practical guide to Readyflow's mobile-first Shopify store setup for Indian Instagram and WhatsApp product brands.",
          url: `https://www.readyflow.site${PAGE_PATH}`,
          dateModified: "2026-06-20",
          datePublished: "2026-06-20",
          inLanguage: "en-IN",
          author: {
            "@type": "Organization",
            name: "Readyflow Team",
          },
          publisher: { "@id": "https://www.readyflow.site/#organization" },
          mainEntityOfPage: {
            "@id": `https://www.readyflow.site${PAGE_PATH}#webpage`,
          },
        },
        {
          "@type": "WebPage",
          "@id": `https://www.readyflow.site${PAGE_PATH}#webpage`,
          url: `https://www.readyflow.site${PAGE_PATH}`,
          name: "Shopify Store Setup in India for Instagram Brands | Readyflow",
          description:
            "Readyflow helps Indian Instagram-first brands launch mobile-first Shopify stores with theme, products, payments, policies, WhatsApp flow and more.",
          inLanguage: "en-IN",
          breadcrumb: { "@id": `https://www.readyflow.site${PAGE_PATH}#breadcrumb` },
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
              name: "Shopify Store Setup in India",
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

export default function ShopifyStoreSetupIndia() {
  const pricingRef = useRef<HTMLElement | null>(null);
  const viewedOffer = useRef(false);
  const pricingInView = useInView(pricingRef, {
    once: true,
    margin: "-120px",
  });

  useEffect(() => {
    if (!pricingInView || viewedOffer.current) return;
    viewedOffer.current = true;
    trackViewContent({
      content_name: "Shopify Store Setup India launch offer",
      value: 11999,
      currency: "INR",
      section: "pricing_scope",
      cta_source: CTA_SOURCE,
    });
  }, [pricingInView]);

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
          <p className="editorial-kicker">Shopify / Ecommerce</p>
          <h1 className="editorial-headline mt-5 max-w-5xl">
            Shopify Store Setup in India for Instagram Brands
          </h1>
          <p className="editorial-deck mt-7">
            If your brand is still taking orders through DMs, highlights, and
            WhatsApp chats, a Shopify store gives customers a cleaner way to
            browse, trust, and buy.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-black/10 py-4 text-xs font-semibold text-black/48">
            <span>By Readyflow Team</span>
            <span>Updated June 20, 2026</span>
            <span>12 min read</span>
            <span>For Indian product brands selling through Instagram, WhatsApp, or offline</span>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedCTA section="hero" label="Plan My Shopify Store" />
            <TrackedCTA
              section="hero"
              label="Check My Brand Fit"
              light
            />
          </div>
        </header>

        <figure className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#e8f1eb]">
            <HeroVisual />
          </div>
          <figcaption className="editorial-caption">
            An Instagram-first brand does not need to abandon conversation; it
            needs one reliable destination for product discovery and buying.
            Illustration: Readyflow, created for this guide.
          </figcaption>
        </figure>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[190px_minmax(0,760px)] lg:justify-center">
          <aside className="hidden lg:block">
            <nav className="sticky top-32 border-t-2 border-black pt-4 text-xs" aria-label="Table of contents">
              <p className="font-black uppercase tracking-[0.18em]">In this guide</p>
              <div className="mt-4 space-y-3 font-semibold leading-5 text-black/48">
                <a href="#meaning" className="block hover:text-[#087746]">What setup means</a>
                <a href="#fit" className="block hover:text-[#087746]">Who this is for</a>
                <a href="#included" className="block hover:text-[#087746]">What Readyflow includes</a>
                <a href="#pricing" className="block hover:text-[#087746]">Pricing and separate costs</a>
                <a href="#process" className="block hover:text-[#087746]">Setup process</a>
                <a href="#prepare" className="block hover:text-[#087746]">What to prepare</a>
                <a href="#instagram" className="block hover:text-[#087746]">Why Instagram sellers need it</a>
                <a href="#faq" className="block hover:text-[#087746]">FAQs</a>
              </div>
            </nav>
          </aside>

          <div className="editorial-copy">
            <nav className="mb-12 border-y border-black/12 py-5 lg:hidden" aria-label="Table of contents">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/55">In this guide</p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-semibold leading-5 text-[#087746]">
                <a href="#meaning">What setup means</a>
                <a href="#fit">Who this is for</a>
                <a href="#included">What Readyflow includes</a>
                <a href="#pricing">Pricing and costs</a>
                <a href="#process">Setup process</a>
                <a href="#prepare">What to prepare</a>
                <a href="#instagram">Why Instagram sellers need it</a>
                <a href="#faq">FAQs</a>
              </div>
            </nav>

            <section id="meaning" className="scroll-mt-28">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.82]">
                Instagram and WhatsApp are excellent places to begin. They let
                a product brand meet people where attention already lives. But
                they become difficult to manage when a customer wants to browse
                a full range, compare prices, understand delivery, check a
                return policy, and order without waiting for a reply.
              </p>
              <p>
                Shopify store setup is the work of turning those scattered
                pieces into one usable online store. It covers the storefront
                design, product information, collections, checkout, payment and
                shipping settings, policy pages, trust information, and the
                routes that bring a buyer back to WhatsApp when a conversation
                is useful.
              </p>
              <p>
                Readyflow's <strong>Instagram Brand Shopify Launch</strong> is
                a focused, done-for-you setup for Indian product brands. The
                one-time launch fee is ₹11,999; the recurring Shopify plan and
                third-party business costs remain separate.
              </p>
              <div className="editorial-note">
                <strong>A Shopify store is not a replacement for WhatsApp.</strong>{" "}
                It gives the product and checkout journey a home, so WhatsApp
                can stay useful for real questions instead of carrying the
                whole catalogue.
              </div>
            </section>

            <section>
              <h2>What a Shopify store setup actually includes</h2>
              <p>
                A proper launch is more than choosing a theme and adding a link
                to Instagram. Customers need a clear route from the homepage
                to collections, product detail, confidence-building
                information, and then checkout or a quick WhatsApp question.
              </p>
              <figure className="my-9">
                <div className="overflow-hidden rounded-2xl border border-black/10">
                  <StoreStructureVisual />
                </div>
                <figcaption className="editorial-caption">
                  A focused store structure keeps product browsing clear on a
                  phone. Illustration: Readyflow, created for this guide.
                </figcaption>
              </figure>
              <p>
                The practical building blocks include theme and Shopify website
                design decisions, homepage hierarchy, product pages,
                collections, checkout configuration, payment setup, shipping
                rules, policy pages, trust sections, basic meta setup, and
                mobile optimisation. Shopify web development is most useful
                when these pieces work as one system rather than as a list of
                add-ons.
              </p>
            </section>

            <section id="fit" className="scroll-mt-28">
              <h2>Who this is for</h2>
              <p>
                This Shopify store setup in India is designed for small,
                product-led brands that already have something real to sell and
                need a more professional buying experience than DMs and
                screenshots can provide.
              </p>
              <ul className="checklist-list">
                <li>Instagram-first clothing brands with sizes, colours, or collections</li>
                <li>Jewellery, accessories, watch, perfume, and beauty sellers</li>
                <li>Handmade and boutique businesses with a focused catalogue</li>
                <li>Offline sellers ready to give customers a mobile store link</li>
                <li>Businesses taking orders through DMs or WhatsApp today</li>
                <li>Owners who have products ready but no proper ecommerce website</li>
              </ul>
              <p>
                It is not for enterprise ecommerce, marketplaces, custom
                backends, or brands expecting a website alone to guarantee
                sales. Those projects need a different technical and commercial
                scope.
              </p>
              <blockquote className="editorial-pullquote">
                The best first store feels like a clear next chapter for the
                brand—not a big-agency project wearing a small business logo.
              </blockquote>
            </section>

            <aside className="my-11 border-y-2 border-[#087746] bg-[#eef8f1] px-6 py-7 sm:px-8">
              <p className="editorial-kicker">A quick fit check</p>
              <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#171717]">
                Want to know if your Instagram brand is ready for Shopify?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-black/62">
                Share what you sell and how you take orders today. We will tell
                you whether this focused launch is the sensible next step.
              </p>
              <TrackedCTA
                section="article_mid_intro"
                label="Check My Brand Fit"
                className="mt-6 w-full sm:w-auto"
              />
            </aside>

            <section id="included" className="scroll-mt-28">
              <p className="editorial-kicker">The focused launch scope</p>
              <h2 className="!mt-4">What Readyflow's ₹11,999 Shopify setup includes</h2>
              <p>
                The launch is deliberately practical: a ready-to-review
                Shopify store shaped around your current product catalogue and
                brand inputs, rather than a vague promise of unlimited Shopify
                development.
              </p>
              <ul className="checklist-list">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                For payments, the setup considers the Indian checkout context:
                the appropriate gateway flow, UPI, and COD can be configured
                or guided according to the available provider setup and the
                agreed scope. Shopify's{" "}
                <ExternalTextLink href={SHOPIFY_PAYMENTS_URL}>
                  payment-provider guidance
                </ExternalTextLink>{" "}
                is a useful reference when choosing a provider.
              </p>
              <div className="editorial-note">
                <strong>48-Hour Launch Bonus:</strong> confirm within 48 hours
                after the plan is shared and unlock up to 5 custom Shopify
                sections coded just for your brand—at no extra setup fee.
                <span className="block mt-1 text-xs font-bold text-black/50">
                  Simple brand-specific launch sections only.
                </span>
              </div>
              <TrackedCTA
                section="included_scope"
                label="Get My Store Plan"
                className="w-full sm:w-auto"
              />
            </section>

            <hr className="editorial-rule" />

            <section id="pricing" ref={pricingRef} className="scroll-mt-28">
              <h2>Pricing and what stays separate</h2>
              <p>
                Readyflow's ₹11,999 is a one-time setup fee for the focused
                launch work above. A useful Shopify quote makes the other costs
                visible instead of quietly blending them into one number.
              </p>
              <div className="my-8 overflow-hidden border-y border-black/15">
                <table className="scope-table w-full border-collapse text-left text-sm">
                  <thead className="hidden bg-[#f3f0e9] sm:table-header-group">
                    <tr className="border-b-2 border-black">
                      <th className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Item</th>
                      <th className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Included in ₹11,999?</th>
                      <th className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="block divide-y divide-black/10 sm:table-row-group">
                    {[
                      ["Readyflow launch setup", "Yes", "Store build and launch scope described above"],
                      ["Shopify subscription", "No", "Paid directly to Shopify; plan pricing can change"],
                      ["Custom domain", "No", "Purchased and renewed in your business account"],
                      ["Paid themes or apps", "No", "Optional third-party tools, only when genuinely needed"],
                      ["Payment gateway charges", "No", "Provider charges and approval are separate"],
                      ["Shipping and courier costs", "No", "Charged by the courier or shipping provider"],
                      ["Photography, ads, advanced custom development", "No", "Separate service or scope"],
                    ].map(([item, included, notes]) => (
                      <tr key={item} className="block p-4 sm:table-row sm:p-0">
                        <th scope="row" className="block pb-2 font-bold sm:table-cell sm:px-4 sm:py-4">
                          <span className="mr-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/42 sm:hidden">Item</span>
                          {item}
                        </th>
                        <td className="block pb-2 font-bold text-[#087746] sm:table-cell sm:px-4 sm:py-4">
                          <span className="mr-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/42 sm:hidden">Included?</span>
                          {included}
                        </td>
                        <td className="block text-black/58 sm:table-cell sm:px-4 sm:py-4">
                          <span className="mr-2 text-[9px] font-black uppercase tracking-[0.14em] text-black/42 sm:hidden">Notes</span>
                          {notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Shopify subscription pricing changes from time to time, so
                confirm the current plan on the{" "}
                <ExternalTextLink href={SHOPIFY_PRICING_URL}>
                  official Shopify pricing page
                </ExternalTextLink>{" "}
                before you buy. For the fuller budget picture, read{" "}
                <Link
                  to="/shopify-store-setup-cost-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  Shopify store setup cost in India
                </Link>
                .
              </p>
              <p>
                Shopify gives every new store a myshopify.com address; a custom
                domain is a separate brand asset. Shopify explains the options
                in its{" "}
                <ExternalTextLink href={SHOPIFY_DOMAINS_URL}>
                  official domain guidance
                </ExternalTextLink>
                .
              </p>
              <TrackedCTA
                section="pricing_scope"
                label="Plan My Shopify Store"
                className="w-full sm:w-auto"
              />
            </section>

            <section>
              <h2>Readyflow vs DIY vs hiring a developer</h2>
              <p>
                A DIY Shopify setup is possible, and it can be sensible when
                you have the time to learn the platform. The difficult parts
                tend not to be the first clicks: they are the product
                structure, mobile hierarchy, payment and shipping decisions,
                policies, and the final review that make a buyer feel
                comfortable proceeding.
              </p>
              <p>
                Hiring a Shopify developer or agency can make sense for a
                larger custom build. For an early product brand, though, a
                large build can be more scope than the store needs. Readyflow
                sits in the practical middle: done-for-you, clearly scoped,
                and launch-focused.
              </p>
              <p>
                If the project needs a broader platform or custom feature
                decision, see our guide to{" "}
                <Link
                  to="/ecommerce-website-development-india"
                  className="font-bold text-[#087746] underline underline-offset-4"
                >
                  ecommerce website development in India
                </Link>
                .
              </p>
            </section>

            <section id="process" className="scroll-mt-28">
              <h2>How the setup process works</h2>
              <p>
                A simple process keeps the setup moving. Once content and
                access are ready, the usual launch timeline is 3–5 days.
              </p>
              <figure className="my-9">
                <div className="overflow-hidden rounded-2xl border border-black/10">
                  <ProcessVisual />
                </div>
                <figcaption className="editorial-caption">
                  The launch sequence is intentionally short and review-led.
                  Illustration: Readyflow, created for this guide.
                </figcaption>
              </figure>
              <ol>
                <li>Share your brand and product details.</li>
                <li>Readyflow reviews brand fit and agrees the launch scope.</li>
                <li>Provide content, assets, and the required account access.</li>
                <li>We build the Shopify store structure and product flow.</li>
                <li>Payments, shipping, policies, and WhatsApp flow are configured or guided.</li>
                <li>The store is reviewed on mobile before approval and launch.</li>
              </ol>
              <TrackedCTA
                section="process"
                label="Start My Shopify Launch"
                className="w-full sm:w-auto"
              />
            </section>

            <section id="prepare" className="scroll-mt-28">
              <h2>What you need to prepare before we start</h2>
              <p>
                The quality of the store begins with the source material. A
                polished photo and clear product information do more for a
                buyer than an extra decorative section ever will.
              </p>
              <ul className="checklist-list">
                <li>Logo and brand name</li>
                <li>Product photos, names, prices, descriptions, and variants or sizes</li>
                <li>Category or collection list, including any size chart</li>
                <li>Shipping preferences and return-policy notes</li>
                <li>Business and payment details needed for the gateway</li>
                <li>WhatsApp/contact number, Instagram handle, and domain preference</li>
              </ul>
              <p>
                A complete pre-launch list helps prevent last-minute delays.
                The dedicated checklist page is planned but not yet published,
                so we have not added a link that would send visitors to a
                dead-end.
              </p>
            </section>

            <section id="instagram" className="scroll-mt-28">
              <p className="editorial-kicker">The practical shift</p>
              <h2 className="!mt-4">Why Instagram sellers need a Shopify store</h2>
              <p>
                Instagram is where a product catches the eye. WhatsApp is
                where many good conversations happen. Shopify gives those
                channels a shared destination: a place where the buyer can
                browse products, see prices, read policies, understand
                delivery, and move toward checkout on their own phone.
              </p>
              <figure className="my-9">
                <div className="overflow-hidden rounded-2xl border border-black/10">
                  <InstagramFlowVisual />
                </div>
                <figcaption className="editorial-caption">
                  Social attention, store browsing, checkout, and questions can
                  work together instead of competing. Illustration: Readyflow,
                  created for this guide.
                </figcaption>
              </figure>
              <p>
                This means clearer pricing, stronger trust signals, product
                sharing, a useful link-in-bio destination, and a mobile buying
                flow that does not depend on a reply arriving at exactly the
                right moment. WhatsApp can remain available for questions; its{" "}
                <ExternalTextLink href={WHATSAPP_CLICK_TO_CHAT_URL}>
                  official click-to-chat guidance
                </ExternalTextLink>{" "}
                explains how a link can begin a conversation without requiring
                a customer to save the number first.
              </p>
              <TrackedCTA
                section="instagram_seller_section"
                label="Check My Brand Fit"
                className="w-full sm:w-auto"
              />
            </section>

            <section>
              <h2>Common store use cases</h2>
              <p>
                These are not case studies or outcome claims. They are common
                ways a focused Shopify store can organise different product
                businesses.
              </p>
              <div className="my-8 grid divide-y divide-black/12 border-y border-black/12 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {[
                  ["Clothing brand", "Collections, size variants, size-chart guidance, and a clear route to bestsellers."],
                  ["Jewellery brand", "Product detail, material and care information, gifting context, and a WhatsApp route for questions."],
                  ["Perfume or accessories brand", "Product storytelling, concise product cards, and easy sharing from a mobile catalogue."],
                  ["Boutique seller", "A move from WhatsApp catalogue sharing to a stable product link with checkout and policies."],
                ].map(([title, text]) => (
                  <div key={title} className="py-6 sm:px-6 first:sm:pl-0 nth-[3]:sm:pl-0">
                    <p className="text-lg font-extrabold tracking-tight">{title}</p>
                    <p className="mt-2 text-[15px] leading-7 text-black/60">{text}</p>
                  </div>
                ))}
              </div>
              <aside className="border-l-4 border-[#087746] bg-[#f3f0e9] px-5 py-5 text-[15px] font-semibold leading-7 text-black/65">
                Looking for visual proof? The current public portfolio is
                available in the{" "}
                <Link to="/work" className="font-bold text-[#087746] underline underline-offset-4">
                  Readyflow work archive
                </Link>
                . It is presented as design work, not as a claim about
                revenue, sales, or conversion results.
              </aside>
            </section>

            <aside className="my-12 border-y border-black/12 bg-[#f3f0e9] px-6 py-7">
              <p className="editorial-kicker">Related reading</p>
              <h2 className="mt-3 font-serif text-2xl font-extrabold tracking-tight">
                Go deeper where it matters
              </h2>
              <ul className="mt-5 space-y-3 text-[15px] font-semibold">
                <li>
                  <Link to="/shopify-store-setup-cost-india" className="text-[#087746] underline underline-offset-4">
                    Shopify store setup cost in India
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-website-development-india" className="text-[#087746] underline underline-offset-4">
                    Ecommerce website development in India
                  </Link>
                </li>
              </ul>
            </aside>

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
                label="Ask About My Store"
                className="mt-8 w-full sm:w-auto"
              />
            </section>
          </div>
        </div>

        <section className="border-y border-black/12 bg-[#eef8f1] px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="editorial-kicker">The next practical move</p>
            <h2 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Ready to turn your Instagram brand into a proper Shopify store?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-black/62">
              Start with the catalogue you have. We will help you decide
              whether the focused ₹11,999 launch is the right fit before
              anything is built.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedCTA section="final_cta" label="Plan My Shopify Store" />
              <TrackedCTA
                section="final_cta"
                label="Check My Brand Fit"
                light
              />
            </div>
          </div>
        </section>
      </article>
      <Footer />

      <div className="fixed inset-x-0 bottom-3 z-[110] px-4 sm:hidden">
        <TrackedCTA
          section="final_cta"
          label="Plan My Shopify Store"
          className="w-full shadow-[0_14px_40px_rgba(0,0,0,0.2)]"
        />
      </div>
    </>
  );
}
