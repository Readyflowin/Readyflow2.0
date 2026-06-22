import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, LayoutGrid, Smartphone, Store } from "lucide-react";
import { trackCTAClick } from "../lib/metaPixel";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLeadFormModal } from "./LeadFormModalContext";

const EXPO = [0.16, 1, 0.3, 1] as const;

const PROOF_POINTS = [
  { value: "30+", label: "Real deployments", icon: Store },
  { value: "India", label: "Product-brand focus", icon: Smartphone },
  { value: "1:1", label: "Founder-led process", icon: WhatsAppIcon },
  { value: "Shopify", label: "Focused setup", icon: LayoutGrid },
];

function BrandFitCTA() {
  const [hovered, setHovered] = useState(false);
  const { openLeadFormModal } = useLeadFormModal();

  return (
    <motion.button
      type="button"
      onClick={() => {
        const ctaParams = {
          cta_label: "Check My Brand Fit",
          section: "hero",
          destination: "lead_form_modal",
        };
        trackCTAClick(ctaParams);
        openLeadFormModal({
          cta_label: ctaParams.cta_label,
          source_section: ctaParams.section,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-4 overflow-hidden rounded-full bg-[#070707] px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#F4EFE6]"
    >
      <motion.span className="absolute inset-0 bg-[#1DFF8A]" initial={{ x: "-101%" }} animate={{ x: hovered ? "0%" : "-101%" }} transition={{ duration: 0.34, ease: EXPO }} />
      <motion.span className="relative z-10" animate={{ color: hovered ? "#070707" : "#F4EFE6" }}>Check My Brand Fit</motion.span>
      <motion.span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full" animate={{ background: hovered ? "#070707" : "#1DFF8A", rotate: hovered ? 45 : 0 }}>
        <ArrowUpRight size={14} color={hovered ? "#1DFF8A" : "#070707"} />
      </motion.span>
    </motion.button>
  );
}

export default function HomepageHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4EFE6] text-[#070707]">
      <div className="pointer-events-none absolute left-[-8%] top-[-14%] h-[66vw] w-[66vw] rounded-full bg-[#1DFF8A]/12 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#7da7a7]/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070707]/[0.035] to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-center px-6 pb-12 pt-32 md:px-12 md:pb-16">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.55, ease: EXPO }} className="mb-8 flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0A8F50]" />
          <span className="text-[9px] font-black uppercase tracking-[0.28em] text-black/58">Mobile-first Shopify stores for social-first brands</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: EXPO }} className="max-w-6xl text-[clamp(42px,7vw,96px)] font-black uppercase leading-[0.9] tracking-tighter">
          Mobile-first Shopify stores for{" "}
          <span className="bg-gradient-to-r from-[#243447] via-[#4B7F80] to-[#0A8F50] bg-clip-text text-transparent">growing brands.</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: EXPO }} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-base font-medium leading-relaxed text-black/68 md:text-xl">
              We help brands selling through Instagram, WhatsApp, Facebook or offline launch a clean Shopify store customers can browse, trust and order from.
            </p>
            <p className="mt-5 text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-black/56">
              For brands with product photos, prices and basic content ready.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <BrandFitCTA />
            <a href="#work" onClick={() => trackCTAClick({ cta_label: "View Real Stores", section: "hero", destination: "work_section" })} className="flex items-center justify-center gap-3 rounded-full border border-black/14 bg-white/78 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:border-black/30 hover:bg-white">
              View Real Stores <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72, duration: 0.5 }} className="mt-5 text-[12px] font-bold leading-relaxed text-black/62">
          Focused launches start at ₹14,999 after content is ready.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.65, ease: EXPO }} className="relative z-10 mx-auto w-full max-w-[1380px] px-6 pb-20 md:px-12 md:pb-24">
        <div className="mb-7 h-px bg-black/14" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {PROOF_POINTS.map((point) => <div key={point.label} className="flex items-start gap-3"><point.icon size={17} className="mt-0.5 text-[#087746]" /><div><p className="text-xl font-black tracking-tight md:text-2xl">{point.value}</p><p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-black/52">{point.label}</p></div></div>)}
        </div>
      </motion.div>

      <div className="relative z-20 overflow-hidden bg-[#070707] py-3.5">
        <div className="flex w-max animate-marquee whitespace-nowrap text-[9px] font-black uppercase tracking-[0.25em] text-[#d7f4dd]">
          {["Social-first product brands", "Mobile-first Shopify store", "Product and collection setup", "WhatsApp contact flow", "Focused launches start at ₹14,999", "Founder-led process", "Social-first product brands", "Mobile-first Shopify store", "Product and collection setup", "WhatsApp contact flow"].map((item, index) => <span key={`${item}-${index}`} className="inline-flex items-center gap-3 px-8"><span className="h-1 w-1 rounded-full bg-[#1DFF8A]" />{item}</span>)}
        </div>
      </div>
    </section>
  );
}
