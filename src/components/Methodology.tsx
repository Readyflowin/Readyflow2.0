import { motion, type Variants } from "framer-motion";
import {
  Boxes,
  CheckCircle2,
  MessageSquareText,
  Smartphone,
} from "lucide-react";

const STEPS = [
  {
    title: "Content & access",
    hook: "You share products & access",
    desc: "Products, photos, pricing, brand details and Shopify access are collected before the build timeline begins.",
    icon: MessageSquareText,
    color: "bg-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    title: "Store structure",
    hook: "We organise your catalogue",
    desc: "Homepage, collections, up to 10 products, product-page layout and size-chart structure are set up clearly.",
    icon: Boxes,
    color: "bg-sky-50",
    accent: "text-sky-600",
    border: "border-sky-100",
  },
  {
    title: "Mobile-first setup",
    hook: "We build the mobile store flow",
    desc: "The layout is prepared for mobile browsing, product discovery and a clear WhatsApp/contact path.",
    icon: Smartphone,
    color: "bg-violet-50",
    accent: "text-violet-600",
    border: "border-violet-100",
  },
  {
    title: "Launch & support",
    hook: "You review, launch & get support",
    desc: "We guide payment and shipping setup, complete the handoff and include 7 days of basic post-delivery support.",
    icon: CheckCircle2,
    color: "bg-amber-50",
    accent: "text-amber-600",
    border: "border-amber-100",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
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

export default function Methodology() {
  return (
    <section
      className="relative scroll-mt-32 overflow-hidden bg-[#F4EFE6] pb-24 pt-8 md:scroll-mt-36 md:pb-32"
      id="process"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6"
      >
        <div className="mb-14 text-center">
          <motion.p
            variants={itemVariants}
            className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-black/35"
          >
            A simple founder-led process
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black uppercase leading-[0.92] tracking-tighter text-[#070707] md:text-7xl"
          >
            From product catalogue <br />
            <span className="text-black/25">to a structured Shopify store</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`rounded-[2rem] border p-7 ${step.border} ${step.color}`}
            >
              <div className="mb-9 flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <step.icon size={25} className={step.accent} />
                </span>
                <span className="text-[10px] font-black tracking-[0.22em] text-black/20">
                  0{index + 1}
                </span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-black/35">
                {step.title}
              </p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-[#070707]">
                {step.hook}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-black/50">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
