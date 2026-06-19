import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Layers3, Route, ShoppingBag } from "lucide-react";
import { trackEvent } from "../lib/metaPixel";
import { useLeadFormModal } from "./LeadFormModalContext";

const CARDS = [
  {
    title: "Scattered browsing",
    copy: "Customers ask for prices, sizes, product details and availability again because everything is split across posts, highlights and chats.",
    icon: Layers3,
  },
  {
    title: "Structured product flow",
    copy: "Products, collections, size chart, policies and key details sit inside one clean mobile-first Shopify store.",
    icon: ShoppingBag,
  },
  {
    title: "Clear next step",
    copy: "Visitors can browse properly and continue through checkout or WhatsApp/contact without guessing what to do next.",
    icon: Route,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PainOutcome() {
  const { openLeadFormModal } = useLeadFormModal();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute right-[-10rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[#1DFF8A]/10 blur-[110px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <motion.p
            variants={itemVariants}
            className="mb-4 text-[10px] font-black uppercase tracking-[0.38em] text-[#0A8F50]"
          >
            From attention to a clearer buying flow
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black uppercase leading-[0.92] tracking-tighter text-[#070707] md:text-7xl"
          >
            Instagram gets attention.{" "}
            <span className="text-black/25">
              Your store should make buying feel simple.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-relaxed text-black/50 md:text-base"
          >
            Your page may already look good — the next step is making products,
            prices, sizes, policies and contact/order flow easier to understand.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card, index) => (
            <motion.article
              key={card.title}
              variants={itemVariants}
              className="rounded-[2rem] border border-black/5 bg-[#F4EFE6] p-7 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0A8F50] shadow-sm">
                  <card.icon size={23} />
                </span>
                <span className="text-[10px] font-black tracking-[0.22em] text-black/20">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-9 text-2xl font-black tracking-tight text-[#070707]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-black/50">
                {card.copy}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              trackEvent("OfferView", {
                action: "cta_click",
                source: "pain_outcome",
                value: 11999,
                currency: "INR",
              });
              openLeadFormModal();
            }}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#070707] px-8 py-5 text-[10px] font-black uppercase tracking-[0.23em] text-[#F4EFE6] transition hover:bg-[#1DFF8A] hover:text-[#070707]"
          >
            Check My Brand Fit <ArrowUpRight size={15} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
