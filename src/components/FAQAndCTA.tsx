import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { trackCTAClick } from "../lib/metaPixel";
import { useLeadFormModal } from "./LeadFormModalContext";

const FAQS = [
  {
    question: "Is ₹11,999 the final price for every store?",
    answer:
      "₹11,999 is for focused Shopify launches where product photos, prices and core content are ready. Larger catalogues, custom sections, advanced features or unfinished content can change the final scope.",
  },
  {
    question: "Do I need to sell only on Instagram?",
    answer:
      "No. Readyflow is for product brands selling through Instagram, WhatsApp, Facebook, offline or any social channel. The store gives customers one clean place to browse and order.",
  },
  {
    question: "Why do you say Check My Brand Fit?",
    answer:
      "Not every product brand needs the same setup. We check product count, content readiness and required sections before confirming whether the focused launch scope is right for you.",
  },
  {
    question: "What do I get for ₹11,999?",
    answer:
      "The launch package includes Shopify theme setup, homepage setup, collections, up to 10 products, product-page layout, size chart section, WhatsApp/contact button, basic policy pages, payment/shipping setup guidance, mobile-first layout, basic SEO setup and 7 days of basic post-delivery support.",
  },
  {
    question: "Is Shopify/domain included?",
    answer:
      "₹11,999 is Readyflow’s setup fee. Shopify subscription, domain, paid apps if needed, product photos and ad management are arranged separately.",
  },
  {
    question: "How long does it take?",
    answer:
      "Usually 3–5 days after products, content, pricing, brand details and Shopify access are ready.",
  },
  {
    question: "How many products are included?",
    answer:
      "Up to 10 products are included in the ₹11,999 launch package. More products can be discussed separately if needed.",
  },
  {
    question: "Do I need product photos?",
    answer:
      "Yes. Product photos should be ready or almost ready before the build begins. Product photography is not included in this package.",
  },
  {
    question: "What result should I expect from this setup?",
    answer:
      "This setup gives your Instagram brand a cleaner product browsing flow, mobile-first storefront, clearer product structure and smoother enquiry/order path. Your actual growth depends on your products, pricing, content, traffic and follow-up.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "We send the package details to your email and prepare a WhatsApp message with your submitted details, so the next conversation starts with full context.",
  },
];

export default function FAQAndCTA() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openLeadFormModal } = useLeadFormModal();

  return (
    <>
      <section
        id="faq"
        className="scroll-mt-32 bg-[#0B100E] py-24 text-[#F4EFE6] md:scroll-mt-36 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#b9f6ca]">
              Before you enquire
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl">
              Clear answers.{" "}
              <span className="text-white/42">Easy next steps.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-white/72">
              The package is deliberately focused. These answers clarify its
              scope before you share your brand details.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-base font-black tracking-tight md:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      className="shrink-0 text-[#1DFF8A]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm font-medium leading-relaxed text-white/76">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="store-plan"
        className="relative scroll-mt-32 overflow-hidden bg-[#F4EFE6] py-24 md:scroll-mt-36 md:py-32"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1DFF8A]/10 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-black/35">
            Your next step
          </p>
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-[#070707] md:text-8xl">
            Want to check if <span className="text-black/20">your brand fits?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm font-medium leading-relaxed text-black/50 md:text-base">
            Share your Instagram page, products and contact details. We’ll send
            the package breakdown and next step.
          </p>

          <button
            type="button"
            onClick={() => {
              const ctaParams = {
                cta_label: "Check My Brand Fit",
                section: "final_cta",
                destination: "lead_form_modal",
              };
              trackCTAClick(ctaParams);
              openLeadFormModal({
                cta_label: ctaParams.cta_label,
                source_section: ctaParams.section,
              });
            }}
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-[#070707] px-8 py-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#F4EFE6] transition hover:bg-[#1DFF8A] hover:text-[#070707]"
          >
            Check My Brand Fit <ArrowUpRight size={16} />
          </button>
          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
            Takes less than 60 seconds · WhatsApp next step included
          </p>
        </div>
      </section>
    </>
  );
}
