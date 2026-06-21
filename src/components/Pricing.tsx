import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowDown,
  Check,
  CheckCircle2,
  Clock3,
  X,
} from "lucide-react";
import { trackCTAClick, trackViewContent } from "../lib/metaPixel";
import { useLeadFormModal } from "./LeadFormModalContext";

const INCLUDED = [
  "Shopify theme setup",
  "Homepage setup",
  "Collection setup",
  "Up to 10 products uploaded",
  "Product page layout",
  "Size chart section",
  "WhatsApp/contact button",
  "Basic policy pages",
  "Payment/shipping setup guidance",
  "Mobile-first layout",
  "Basic SEO setup",
  "7 days post-delivery support",
];

const SEPARATE = [
  "Shopify subscription",
  "Domain",
  "Paid apps, only if needed",
  "Product photos",
  "Ad management",
];

const GOOD_FIT = [
  "You sell or plan to sell physical products through social channels or offline",
  "You have product photos ready or almost ready",
  "You want a clean product store instead of only chats, posts or highlights",
  "You are okay with Shopify subscription and domain being separate",
  "You want a fast, mobile-first launch",
];

const NOT_A_FIT = [
  "Your products are not final yet",
  "Your photos/content are not ready",
  "You need ad management, not store setup",
  "You want a custom-coded platform",
  "You expect Shopify subscription/domain inside the launch scope",
];

export function OfferSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const offerViewed = useRef(false);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const { openLeadFormModal } = useLeadFormModal();

  useEffect(() => {
    if (!inView || offerViewed.current) return;
    offerViewed.current = true;
    trackViewContent({
      content_name: "Instagram Brand Shopify Launch",
      value: 11999,
      currency: "INR",
    });
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="relative scroll-mt-32 overflow-hidden bg-[#0B100E] py-24 text-[#F4EFE6] md:scroll-mt-36 md:py-32"
    >
        <div className="pointer-events-none absolute right-[-12rem] top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[#1DFF8A]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#b9f6ca]">
              One focused launch package
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl">
              Social-first{" "}
              <span className="text-[#1DFF8A]">Shopify Launch</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-relaxed text-white/72 md:text-base">
              A focused Shopify setup for product brands with products, prices,
              photos and basic content ready for a clean buying flow.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="overflow-hidden rounded-[2rem] border border-white/18 bg-white/[0.075] shadow-2xl md:rounded-[3rem]"
          >
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="flex flex-col justify-between border-b border-white/16 p-7 md:p-10 lg:border-b-0 lg:border-r">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b9f6ca]">
                    Focused Readyflow launch
                  </p>
                  <h3 className="mt-5 text-3xl font-black leading-tight tracking-tighter md:text-5xl">
                    Social-first Shopify Launch
                  </h3>

                  <div className="mt-8 flex flex-col items-start gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
                      Focused launches start at
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-[#d7f4dd] md:text-5xl">
                      ₹11,999
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/74">
                    ₹11,999 fits focused Shopify launches where product photos, prices and basic content are ready.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-white/16 bg-white/[0.07] p-5">
                  <div className="flex items-start gap-3">
                    <Clock3 size={18} className="mt-0.5 shrink-0 text-[#1DFF8A]" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60">
                        Timeline
                      </p>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-white/90">
                        3–5 days after content, products and access are ready
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const ctaParams = {
                      cta_label: "Check My Brand Fit",
                      section: "offer",
                      destination: "lead_form_modal",
                    };
                    trackCTAClick(ctaParams);
                    openLeadFormModal({
                      cta_label: ctaParams.cta_label,
                      source_section: ctaParams.section,
                    });
                  }}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#1DFF8A] px-6 py-5 text-[11px] font-black uppercase tracking-[0.24em] text-[#070707] transition hover:scale-[1.01]"
                >
                  Check My Brand Fit <ArrowDown size={15} />
                </button>
              </div>

              <div className="grid gap-8 p-7 md:p-10 xl:grid-cols-2">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1DFF8A]/12 text-[#1DFF8A]">
                      <CheckCircle2 size={18} />
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-[0.18em]">
                      Included
                    </h4>
                  </div>
                  <div className="space-y-3.5">
                    {INCLUDED.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1DFF8A]/12">
                          <Check size={10} strokeWidth={4} className="text-[#1DFF8A]" />
                        </span>
                        <span className="text-sm font-medium leading-relaxed text-white/88">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/70">
                      <X size={18} />
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-[0.18em]">
                      Outside this setup fee
                    </h4>
                  </div>
                  <div className="space-y-3.5">
                    {SEPARATE.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                          <X size={10} strokeWidth={3} className="text-white/35" />
                        </span>
                        <span className="text-sm font-medium leading-relaxed text-white/78">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-[#b9f6ca]/25 bg-[#1DFF8A]/10 p-5">
                    <p className="text-xs font-medium leading-relaxed text-white/82">
                      Not every product brand needs the same setup. We check product count, content readiness and custom section needs before confirming final scope.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    </section>
  );
}

export function FitSection() {
  return (
    <section
      id="fit"
      className="scroll-mt-32 bg-[#F4EFE6] py-24 md:scroll-mt-36 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-4xl">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-black/35">
              Clear fit before we start
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tighter text-[#070707] md:text-7xl">
              Built for product brands that are{" "}
              <span className="text-black/32">ready to launch properly</span>
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-7 md:p-9"
            >
              <p className="mb-7 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
                A good fit if
              </p>
              <div className="space-y-4">
                {GOOD_FIT.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check size={12} strokeWidth={4} />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-[#070707]/75">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-black/5 bg-white p-7 md:p-9"
            >
              <p className="mb-7 text-[10px] font-black uppercase tracking-[0.3em] text-black/35">
                Better to wait if
              </p>
              <div className="space-y-4">
                {NOT_A_FIT.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/40">
                      <X size={12} strokeWidth={3} />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-[#070707]/60">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
      </div>
    </section>
  );
}

export default function PricingSection() {
  return (
    <>
      <OfferSection />
      <FitSection />
    </>
  );
}
