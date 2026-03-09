/**
 * ReadyFlow — /pricing  (dedicated page)
 *
 * Design philosophy:
 *   Exploration over transaction. Conversation over commerce.
 *   The visitor reads, reflects, and arrives at the CTA naturally —
 *   never nudged, never rushed, never sold to.
 *
 * Sections:
 *   1. Opening Manifesto    — dark, full-viewport, sets the tone
 *   2. "What's your situation?" — 3 entry-point cards (story, not SKUs)
 *   3. The Engineering Chapter  — craft narrative for each platform
 *   4. Billboard Divider    — the desert quote as a full-bleed moment
 *   5. The Visibility Chapter   — philosophy of discoverability
 *   6. How It Works         — process transparency
 *   7. The Conversation     — soft questionnaire → WhatsApp
 */

import { useState, useRef } from "react";
import type { ReactNode } from "react";
import {
  motion, AnimatePresence, useInView,
  useScroll, useTransform
} from "framer-motion";
import {
  ArrowUpRight, MessageCircle, Check,
  ShoppingBag, Globe, Zap,
  MapPin, BarChart2, Search, TrendingUp,
  ChevronDown, ArrowDown
} from "lucide-react";

// ─── Brand ────────────────────────────────────────────────────────────────────

const WA   = "918602555840";
const EXPO = [0.16, 1, 0.3, 1] as const;

// ─── Scroll-clip text reveal ──────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any; // string tag or component
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const Tag: any = as;

  return (
    <Tag ref={ref as any} className={`overflow-hidden ${className}`} style={style}>
      <motion.div
        initial={{ y: "102%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.72, delay, ease: EXPO }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EXPO }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <FadeUp className="flex items-center gap-3 mb-10">
      <div className="w-6 h-px" style={{ background: "#1DFF8A" }} />
      <span
        className="text-[9px] font-black tracking-[0.32em] uppercase"
        style={{ color: "rgba(7,7,7,0.32)" }}
      >
        {text}
      </span>
    </FadeUp>
  );
}

// ─── Grain overlay ────────────────────────────────────────────────────────────

function Grain({ id, opacity = 0.035 }: { id: string; opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      aria-hidden
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. OPENING MANIFESTO
// ═══════════════════════════════════════════════════════════════════════════════

function Opening() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#070707" }}
    >
      <Grain id="open-grain" opacity={0.04} />

      {/* Ambient green glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(29,255,138,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(29,255,138,0.25)", scaleX: scrollYProgress }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: EXPO }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#1DFF8A] animate-pulse" />
          <span
            className="text-[9px] font-black tracking-[0.35em] uppercase"
            style={{ color: "rgba(29,255,138,0.6)" }}
          >
            ReadyFlow · Investment Framework
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: EXPO }}
            className="font-black uppercase tracking-tighter"
            style={{
              fontSize: "clamp(52px, 9vw, 128px)",
              color: "#F4EFE6",
              lineHeight: 0.9,
            }}
          >
            This isn't
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-5">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.5, ease: EXPO }}
            className="font-light italic"
            style={{
              fontSize: "clamp(52px, 9vw, 128px)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1DFF8A",
              lineHeight: 0.9,
            }}
          >
            a price list.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: EXPO }}
          className="max-w-xl mx-auto text-base leading-relaxed font-medium mb-14"
          style={{ color: "rgba(244,239,230,0.45)" }}
        >
          It's a map of how we think about building for your business —
          what we build, why we build it, and what it costs to do it right.
          Take your time. Read it properly.
        </motion.p>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-[9px] font-black tracking-[0.28em] uppercase"
            style={{ color: "rgba(244,239,230,0.2)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} style={{ color: "rgba(29,255,138,0.4)" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SITUATION CARDS — "What brought you here?"
// ═══════════════════════════════════════════════════════════════════════════════

const SITUATIONS = [
  {
    id: "new",
    label: "Starting fresh",
    headline: "You have a product. You need a store.",
    body: "Your brand is ready. You need a storefront that converts from day one — fast to launch, built to sell, and designed like it cost five times as much.",
    anchor: "#engineering",
    cta: "See how we build it",
  },
  {
    id: "scale",
    label: "Ready to scale",
    headline: "Your store exists. Your growth doesn't.",
    body: "You're doing ₹1L a month and want ₹10L. That gap is almost never a traffic problem — it's usually a speed, trust, or conversion architecture problem.",
    anchor: "#engineering",
    cta: "See the upgrade path",
  },
  {
    id: "invisible",
    label: "Invisible online",
    headline: "You have a site. No one finds it.",
    body: "Thousands of people are searching for what you sell right now. They're going to your competitor because Google doesn't know you exist. That's fixable.",
    anchor: "#visibility",
    cta: "See the visibility stack",
  },
];

function SituationCards() {
  return (
    <section className="py-32" style={{ background: "#F4EFE6" }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel text="Where are you right now?" />

        <div className="mb-14">
          <Reveal>
            <h2
              className="font-black uppercase tracking-tighter leading-[0.88]"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#070707" }}
            >
              Most people arrive here
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="font-light italic leading-[0.88]"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(7,7,7,0.4)",
              }}
            >
              with one of three problems.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SITUATIONS.map((s, i) => (
            <FadeUp key={s.id} delay={i * 0.1} className="h-full">
              <a
                href={s.anchor}
                className="flex flex-col h-full group rounded-[2rem] p-8 transition-all duration-400 border"
                style={{
                  background: "#fff",
                  borderColor: "rgba(7,7,7,0.07)",
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "#070707";
                  t.style.borderColor = "rgba(29,255,138,0.2)";
                  t.style.transform = "translateY(-4px)";
                  t.style.boxShadow = "0 32px 64px rgba(7,7,7,0.25)";
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "#fff";
                  t.style.borderColor = "rgba(7,7,7,0.07)";
                  t.style.transform = "translateY(0)";
                  t.style.boxShadow = "none";
                }}
              >
                <span
                  className="text-[8px] font-black tracking-[0.28em] uppercase mb-4 inline-block px-3 py-1.5 rounded-full transition-colors duration-300"
                  style={{ background: "rgba(7,7,7,0.05)", color: "rgba(7,7,7,0.4)" }}
                >
                  {s.label}
                </span>

                <h3
                  className="font-black tracking-tight leading-snug mb-4 transition-colors duration-300"
                  style={{ fontSize: "clamp(18px, 2.2vw, 22px)", color: "#070707" }}
                >
                  {s.headline}
                </h3>

                <p
                  className="text-sm font-medium leading-relaxed flex-1 mb-8 transition-colors duration-300"
                  style={{ color: "rgba(7,7,7,0.48)" }}
                >
                  {s.body}
                </p>

                <div className="flex items-center gap-2 transition-colors duration-300">
                  <span className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "#1DFF8A" }}>
                    {s.cta}
                  </span>
                  <ArrowUpRight size={12} style={{ color: "#1DFF8A" }} />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ENGINEERING CHAPTER
// ═══════════════════════════════════════════════════════════════════════════════

const SOLUTIONS = [
  {
    id: "shopify",
    index: "01",
    label: "Shopify Storefront",
    icon: <ShoppingBag size={16} />,
    timeline: "5-day sprint",
    priceFrom: "₹14,999",
    headline: "A store that sells while you sleep.",
    body: `Most Shopify stores are templates with a logo slapped on top. They load slowly, look generic, and convert at 1%.

We build from scratch in Liquid — custom architecture, custom UX, optimised for your product category and your customer. Sub-2s load time isn't a nice-to-have. It's how you stop losing 40% of visitors before they see a single product.

The 5-day sprint is disciplined, not rushed. Day 1 is strategy. Days 2–4 are build. Day 5 is your launch.`,
    forWho: "The right choice if you're launching, rebuilding, or you've tried a template and know it's not working.",
    details: ["Custom Liquid theme architecture", "Conversion-first UX & mobile layout", "Razorpay / Stripe / COD integration", "Core Web Vitals optimisation", "GA4 + Meta Pixel setup"],
  },
  {
    id: "custom",
    index: "02",
    label: "Custom React Platform",
    icon: <Globe size={16} />,
    timeline: "10-day sprint",
    priceFrom: "₹29,999",
    headline: "When Shopify's ceiling isn't high enough.",
    body: `Shopify is excellent until it isn't. If you need complex product logic, custom checkout flows, deep OMS integration, or a frontend that moves and feels unlike anything else in your category — you need a custom build.

Next.js headless gives you the performance of a static site with the dynamism of a full application. Your IndiaSync OMS talks directly to your storefront. Your UI is yours, not a theme-marketplace compromise.

This is for brands that have outgrown templates or were never going to fit in one.`,
    forWho: "The right choice for D2C brands with complex catalogues, high transaction volume, or strong aesthetic requirements.",
    details: ["Next.js headless frontend (SSG + ISR)", "Bespoke interaction design", "IndiaSync OMS full integration", "Framer Motion premium animations", "CDN + edge deployment"],
  },
  {
    id: "master",
    index: "03",
    label: "The Master Suite",
    icon: <Zap size={16} />,
    timeline: "21-day build",
    priceFrom: "₹49,999",
    headline: "Your complete digital ecosystem.",
    body: `A website and a native Android app, built together, as one coherent system.

Your customers get a web experience that's fast and beautiful. They also get an app that keeps them coming back — push notifications, saved carts, loyalty features, the full stack of retention tools that brands with much larger budgets take for granted.

Everything in the Custom Platform, plus a Play Store-ready native Android application. One team. One vision. No handoffs.`,
    forWho: "The right choice for brands ready to compete at a national level and invest in long-term customer retention.",
    details: ["Everything in Custom Platform", "Native Android application", "Play Store submission & deployment", "Shared authentication system", "Zero vendor lock-in — your code, your servers"],
  },
];

function EngineeringChapter() {
  return (
    <section
      id="engineering"
      className="py-32 relative overflow-hidden"
      style={{ background: "#070707" }}
    >
      <Grain id="eng-grain" opacity={0.04} />
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vw] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(29,255,138,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <SectionLabel text="Core Engineering Stack" />

        <div className="mb-20">
          <Reveal>
            <h2
              className="font-black uppercase tracking-tighter leading-[0.88]"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#F4EFE6" }}
            >
              The Foundation.
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <h2
              className="font-light italic leading-[0.88]"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(29,255,138,0.5)",
              }}
            >
              What we actually build.
            </h2>
          </Reveal>
          <FadeUp delay={0.22} className="mt-6 max-w-lg">
            <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(244,239,230,0.38)" }}>
              Three platforms. Each one engineered for a specific situation.
              Read each one properly — the differences matter more than the prices.
            </p>
          </FadeUp>
        </div>

        <div className="space-y-px">
          {SOLUTIONS.map((sol, i) => (
            <SolutionRow key={sol.id} sol={sol} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionRow({ sol, index }: { sol: typeof SOLUTIONS[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EXPO }}
      className="rounded-[1.8rem] overflow-hidden"
      style={{
        border: open ? "1.5px solid rgba(29,255,138,0.18)" : "1.5px solid rgba(255,255,255,0.06)",
        background: open ? "rgba(29,255,138,0.03)" : "rgba(255,255,255,0.02)",
        marginBottom: "8px",
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-8 py-7 flex items-center gap-6 group"
      >
        {/* Index */}
        <span
          className="font-black tabular-nums shrink-0 transition-colors duration-300"
          style={{
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: open ? "#1DFF8A" : "rgba(255,255,255,0.2)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {sol.index}
        </span>

        {/* Icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: open ? "rgba(29,255,138,0.12)" : "rgba(255,255,255,0.05)",
            color: open ? "#1DFF8A" : "rgba(255,255,255,0.4)",
          }}
        >
          {sol.icon}
        </div>

        {/* Label + headline */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[9px] font-black tracking-[0.24em] uppercase mb-1 transition-colors duration-300"
            style={{ color: open ? "rgba(29,255,138,0.6)" : "rgba(255,255,255,0.28)" }}
          >
            {sol.label}
          </p>
          <h3
            className="font-black tracking-tight transition-colors duration-300"
            style={{
              fontSize: "clamp(17px, 2.5vw, 22px)",
              color: open ? "#F4EFE6" : "rgba(255,255,255,0.7)",
              lineHeight: 1.2,
            }}
          >
            {sol.headline}
          </h3>
        </div>

        {/* Meta */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <div className="text-right">
            <p className="text-[8px] font-black tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>from</p>
            <p className="font-black" style={{ color: open ? "#1DFF8A" : "rgba(255,255,255,0.55)", fontSize: "clamp(16px, 2vw, 20px)" }}>
              {sol.priceFrom}
            </p>
          </div>
          <span
            className="text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.28)" }}
          >
            {sol.timeline}
          </span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EXPO }}
          className="shrink-0"
          style={{ color: open ? "#1DFF8A" : "rgba(255,255,255,0.2)" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EXPO }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: narrative */}
              <div>
                <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />
                {sol.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-sm font-medium leading-[1.8] mb-5"
                    style={{ color: "rgba(244,239,230,0.52)" }}
                  >
                    {para}
                  </p>
                ))}
                <div
                  className="mt-6 p-5 rounded-2xl"
                  style={{ background: "rgba(29,255,138,0.06)", border: "1px solid rgba(29,255,138,0.1)" }}
                >
                  <p className="text-[9px] font-black tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(29,255,138,0.5)" }}>
                    Right for you?
                  </p>
                  <p className="text-[11px] font-medium leading-relaxed" style={{ color: "rgba(244,239,230,0.48)" }}>
                    {sol.forWho}
                  </p>
                </div>
              </div>

              {/* Right: details */}
              <div>
                <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />
                <p className="text-[9px] font-black tracking-[0.22em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.22)" }}>
                  What's included
                </p>
                <div className="space-y-3 mb-10">
                  {sol.details.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, ease: EXPO }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: "rgba(29,255,138,0.12)" }}
                      >
                        <Check size={8} strokeWidth={4} style={{ color: "#1DFF8A" }} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: "rgba(244,239,230,0.65)" }}>{d}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Price callout */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="text-[9px] font-black tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Investment starts from
                  </p>
                  <p
                    className="font-black mb-1"
                    style={{ fontSize: "clamp(28px, 4vw, 36px)", color: "#1DFF8A", lineHeight: 1 }}
                  >
                    {sol.priceFrom}
                  </p>
                  <p className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.2)" }}>
                    + GST if applicable · 50% upfront
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. BILLBOARD DIVIDER
// ═══════════════════════════════════════════════════════════════════════════════

function BillboardDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className="relative py-36 overflow-hidden flex items-center justify-center"
      style={{ background: "#F4EFE6" }}
    >
      <Grain id="bill-grain" opacity={0.025} />

      {/* Scrolling background text */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black uppercase tracking-tighter whitespace-nowrap opacity-[0.035]"
          style={{ fontSize: "clamp(120px, 18vw, 220px)", color: "#070707" }}
        >
          VISIBILITY VISIBILITY VISIBILITY
        </span>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <FadeUp>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-10"
            style={{ background: "#070707" }}
          >
            <Search size={18} style={{ color: "#1DFF8A" }} />
          </div>
        </FadeUp>

        <Reveal>
          <blockquote
            className="font-black tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(32px, 6vw, 72px)", color: "#070707" }}
          >
            "A website without
          </blockquote>
        </Reveal>
        <Reveal delay={0.07}>
          <blockquote
            className="font-light italic leading-[0.9]"
            style={{
              fontSize: "clamp(32px, 6vw, 72px)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(7,7,7,0.45)",
            }}
          >
            visibility
          </blockquote>
        </Reveal>
        <Reveal delay={0.14}>
          <blockquote
            className="font-black tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(32px, 6vw, 72px)", color: "#070707" }}
          >
            is just a billboard
          </blockquote>
        </Reveal>
        <Reveal delay={0.21}>
          <blockquote
            className="font-black tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(32px, 6vw, 72px)", color: "#070707" }}
          >
            in a desert."
          </blockquote>
        </Reveal>

        <FadeUp delay={0.4} className="mt-10">
          <p className="text-sm font-medium" style={{ color: "rgba(7,7,7,0.4)" }}>
            We engineer both. The site and its discoverability. Always.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. VISIBILITY CHAPTER
// ═══════════════════════════════════════════════════════════════════════════════

const VIS_MODULES = [
  {
    id: "gmb",
    label: "GMB Dominance",
    icon: <MapPin size={18} />,
    price: "₹5,000",
    tag: "One-time",
    headline: "Own your Google Maps presence.",
    body: "When someone searches 'best [your category] near me', your GMB profile determines whether you appear and what they see. A properly optimised GMB listing with verified information, categories, photos, and keyword-aligned description consistently outranks newer competitors in local search.",
    keywordTarget: 'Targets: "Local SEO", "GMB Optimization", "Google Maps ranking"',
  },
  {
    id: "gsc",
    label: "Search Console Intelligence",
    icon: <BarChart2 size={18} />,
    price: "₹3,000",
    tag: "One-time",
    headline: "Make Google trust your site.",
    body: "Search Console is Google's direct communication channel with your website. Without it properly set up, Google is guessing about your site structure, indexing random pages, and potentially missing your most important content entirely. We configure sitemaps, fix coverage errors, set up performance tracking, and establish the baseline that makes all future SEO work faster.",
    keywordTarget: 'Targets: "Technical SEO", "Google Search Console setup", "Site indexing"',
  },
  {
    id: "seo",
    label: "Technical SEO Audit",
    icon: <Search size={18} />,
    price: "₹5,000",
    tag: "One-time",
    headline: "Fix what's quietly killing your rankings.",
    body: "Most sites have technical problems they don't know about — slow load times on mobile, duplicate content, broken internal links, missing schema, pages blocking Google. A technical audit finds all of it, prioritises by impact, and gives you a clear action list. For new builds we do this pre-launch. For existing sites, it's often the fastest ROI we can deliver.",
    keywordTarget: 'Targets: "Technical SEO Audit India", "Shopify SEO", "Site speed optimisation"',
  },
  {
    id: "retainer",
    label: "Monthly SEO Retainer",
    icon: <TrendingUp size={18} />,
    price: "₹8,000",
    tag: "Monthly",
    headline: "Rankings compound. One-time fixes don't.",
    body: "Technical SEO gets your site healthy. The retainer makes it dominant. Every month: keyword research updates, content cluster expansion, backlink outreach, competitor gap analysis, and a report you can actually read. Most clients see meaningful ranking movement within 60–90 days. By month six, organic traffic is a serious acquisition channel.",
    keywordTarget: 'Targets: "SEO agency India", "Monthly SEO retainer", "Shopify SEO services"',
  },
];

function VisibilityChapter() {
  return (
    <section
      id="visibility"
      className="py-32 relative overflow-hidden"
      style={{ background: "#070707" }}
    >
      <Grain id="vis-grain" opacity={0.04} />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <SectionLabel text="Market Visibility Stack" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <Reveal>
              <h2
                className="font-black uppercase tracking-tighter leading-[0.88]"
                style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#F4EFE6" }}
              >
                The Distribution.
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <h2
                className="font-light italic leading-[0.88]"
                style={{
                  fontSize: "clamp(36px, 6vw, 72px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(29,255,138,0.5)",
                }}
              >
                Getting found.
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(244,239,230,0.4)" }}>
              Development is the body. Visibility is the soul.
              These modules are added to any engineering project or sold standalone
              for sites that already exist but aren't being found.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIS_MODULES.map((mod, i) => (
            <FadeUp key={mod.id} delay={i * 0.08}>
              <div
                className="h-full rounded-[2rem] p-8 flex flex-col transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1.5px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "rgba(29,255,138,0.04)";
                  t.style.borderColor = "rgba(29,255,138,0.15)";
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "rgba(255,255,255,0.03)";
                  t.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(29,255,138,0.1)", color: "#1DFF8A" }}
                  >
                    {mod.icon}
                  </div>
                  <span
                    className="text-[8px] font-black tracking-[0.22em] uppercase px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
                  >
                    {mod.tag}
                  </span>
                </div>

                <p
                  className="text-[9px] font-black tracking-[0.22em] uppercase mb-2"
                  style={{ color: "rgba(29,255,138,0.5)" }}
                >
                  {mod.label}
                </p>

                <h3
                  className="font-black tracking-tight mb-4"
                  style={{ fontSize: "clamp(17px, 2.2vw, 21px)", color: "#F4EFE6", lineHeight: 1.2 }}
                >
                  {mod.headline}
                </h3>

                <p
                  className="text-[12px] font-medium leading-[1.8] flex-1 mb-6"
                  style={{ color: "rgba(244,239,230,0.45)" }}
                >
                  {mod.body}
                </p>

                <div
                  className="p-3.5 rounded-xl mb-5"
                  style={{ background: "rgba(29,255,138,0.05)", border: "1px solid rgba(29,255,138,0.08)" }}
                >
                  <p className="text-[9px] font-bold leading-relaxed italic" style={{ color: "rgba(29,255,138,0.45)" }}>
                    {mod.keywordTarget}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[8px] font-black tracking-[0.2em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>Investment</p>
                    <p className="font-black" style={{ fontSize: "clamp(22px, 3vw, 28px)", color: "#1DFF8A", lineHeight: 1 }}>
                      {mod.price}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════════════

const STEPS = [
  {
    n: "01",
    title: "The call",
    duration: "30 minutes",
    body: "We talk. You tell us about your business, your customers, your timeline, your frustrations with the existing digital presence (or lack of one). We ask questions. Lots of them. No pitching.",
  },
  {
    n: "02",
    title: "The brief",
    duration: "Within 24 hours",
    body: "We write up what we heard and what we think makes sense. Scope, timeline, investment, and the reasoning behind every recommendation. You review it, push back, refine it.",
  },
  {
    n: "03",
    title: "The sprint",
    duration: "5–21 days",
    body: "Once the brief is agreed, we move fast. Daily progress updates. A shared workspace so you can see the build as it happens. No surprises at the end.",
  },
  {
    n: "04",
    title: "The handoff",
    duration: "Day of launch",
    body: "You get the full source code, all credentials, documentation, and a recorded walkthrough. It's yours. Entirely, permanently yours. We stay available for questions.",
  },
];

function HowItWorks() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "#F4EFE6" }}>
      <Grain id="how-grain" opacity={0.025} />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <SectionLabel text="The Process" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <h2
                className="font-black uppercase tracking-tighter leading-[0.88]"
                style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#070707" }}
              >
                What happens
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <h2
                className="font-light italic leading-[0.88]"
                style={{
                  fontSize: "clamp(36px, 6vw, 72px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(7,7,7,0.4)",
                }}
              >
                after you reach out.
              </h2>
            </Reveal>
            <FadeUp delay={0.22} className="mt-8">
              <p className="text-sm font-medium leading-relaxed max-w-sm" style={{ color: "rgba(7,7,7,0.45)" }}>
                No proposals sent blindly. No invoices raised until you've read the brief and agreed to every line of it.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div
                  className="flex gap-6 py-8"
                  style={{ borderBottom: i < STEPS.length - 1 ? "1px solid rgba(7,7,7,0.08)" : "none" }}
                >
                  <div className="shrink-0 pt-1">
                    <span
                      className="font-black tabular-nums"
                      style={{ fontSize: "11px", color: "#1DFF8A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3
                        className="font-black uppercase tracking-tight"
                        style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#070707" }}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="text-[9px] font-black tracking-[0.18em] uppercase"
                        style={{ color: "rgba(7,7,7,0.3)" }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium leading-relaxed"
                      style={{ color: "rgba(7,7,7,0.5)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. THE CONVERSATION STARTER
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS = [
  {
    id: "situation",
    prompt: "What describes your situation?",
    options: [
      "I'm launching something new",
      "My existing store isn't performing",
      "Nobody can find me on Google",
      "I want to scale what's already working",
      "Something else",
    ],
  },
  {
    id: "timeline",
    prompt: "How urgent is this for you?",
    options: [
      "This week if possible",
      "Within the next month",
      "I'm planning ahead (1–3 months)",
      "No hard deadline",
    ],
  },
  {
    id: "budget",
    prompt: "What's your approximate budget?",
    options: [
      "Under ₹15,000",
      "₹15,000 – ₹30,000",
      "₹30,000 – ₹60,000",
      "Above ₹60,000",
      "Still figuring that out",
    ],
  },
];

function ConversationStarter() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent,    setSent]    = useState(false);

  const answered = Object.keys(answers).length;
  const complete  = answered === QUESTIONS.length;

  const buildMessage = () => {
    const lines = QUESTIONS.map(q => `${q.prompt}\n→ ${answers[q.id] || "–"}`).join("\n\n");
    return `Hi ReadyFlow! I've been reading through your pricing page and wanted to start a conversation.\n\n${lines}\n\nLooking forward to talking.`;
  };

  const handleSend = () => {
    if (!complete) return;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(buildMessage())}`, "_blank");
    setSent(true);
  };

  return (
    <section
      className="relative py-36 overflow-hidden"
      style={{ background: "#070707" }}
    >
      <Grain id="conv-grain" opacity={0.04} />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(29,255,138,0.12)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <SectionLabel text="Start the conversation" />

        <div className="mb-16">
          <Reveal>
            <h2
              className="font-black uppercase tracking-tighter leading-[0.88]"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#F4EFE6" }}
            >
              Three questions.
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <h2
              className="font-light italic leading-[0.88]"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(29,255,138,0.5)",
              }}
            >
              Then we talk.
            </h2>
          </Reveal>
          <FadeUp delay={0.22} className="mt-6">
            <p className="text-sm font-medium leading-relaxed max-w-md" style={{ color: "rgba(244,239,230,0.38)" }}>
              No forms. No CRM. No sales sequence. Answer these three things
              and we'll continue the conversation on WhatsApp, at your pace.
            </p>
          </FadeUp>
        </div>

        {!sent ? (
          <div className="space-y-10">
            {QUESTIONS.map((q, qi) => (
              <FadeUp key={q.id} delay={qi * 0.1}>
                <div>
                  <p
                    className="text-base font-black tracking-tight mb-5"
                    style={{ color: answers[q.id] ? "#F4EFE6" : "rgba(244,239,230,0.55)" }}
                  >
                    <span style={{ color: "#1DFF8A", marginRight: "10px", fontSize: "13px" }}>{String(qi + 1).padStart(2, "0")}</span>
                    {q.prompt}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {q.options.map(opt => {
                      const active = answers[q.id] === opt;
                      return (
                        <motion.button
                          key={opt}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          whileTap={{ scale: 0.96 }}
                          className="px-5 py-3 rounded-full font-bold text-sm transition-all duration-200"
                          style={{
                            background:  active ? "#1DFF8A" : "rgba(255,255,255,0.05)",
                            color:       active ? "#070707" : "rgba(244,239,230,0.55)",
                            border:      active ? "1.5px solid #1DFF8A" : "1.5px solid rgba(255,255,255,0.1)",
                          }}
                          onMouseEnter={e => {
                            if (!active) {
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(29,255,138,0.3)";
                              (e.currentTarget as HTMLElement).style.color = "rgba(244,239,230,0.8)";
                            }
                          }}
                          onMouseLeave={e => {
                            if (!active) {
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                              (e.currentTarget as HTMLElement).style.color = "rgba(244,239,230,0.55)";
                            }
                          }}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </FadeUp>
            ))}

            {/* Progress + CTA */}
            <FadeUp delay={0.4}>
              <div
                className="mt-6 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div>
                  <div className="flex gap-1.5 mb-2">
                    {QUESTIONS.map((q) => (
                      <motion.div
                        key={q.id}
                        animate={{
                          background: answers[q.id] ? "#1DFF8A" : "rgba(255,255,255,0.1)",
                          width: answers[q.id] ? 20 : 6,
                        }}
                        transition={{ duration: 0.3, ease: EXPO }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold" style={{ color: "rgba(244,239,230,0.28)" }}>
                    {answered} of {QUESTIONS.length} answered
                    {complete && " · Ready to send"}
                  </p>
                </div>

                <motion.button
                  onClick={handleSend}
                  disabled={!complete}
                  whileHover={complete ? { scale: 1.02 } : {}}
                  whileTap={complete ? { scale: 0.97 } : {}}
                  className="flex items-center gap-3 px-8 py-5 rounded-full font-black text-[11px] tracking-[0.24em] uppercase transition-all duration-400"
                  style={{
                    background:  complete ? "#1DFF8A" : "rgba(255,255,255,0.06)",
                    color:       complete ? "#070707" : "rgba(255,255,255,0.22)",
                    border:      complete ? "none" : "1.5px solid rgba(255,255,255,0.08)",
                    cursor:      complete ? "pointer" : "not-allowed",
                    boxShadow:   complete ? "0 16px 48px rgba(29,255,138,0.2)" : "none",
                  }}
                >
                  <MessageCircle size={14} />
                  Start the conversation
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </motion.button>
              </div>
            </FadeUp>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ease: EXPO, duration: 0.55 }}
            className="py-16 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(29,255,138,0.12)" }}
            >
              <Check size={24} style={{ color: "#1DFF8A" }} strokeWidth={2.5} />
            </div>
            <h3
              className="font-black uppercase tracking-tighter mb-3"
              style={{ fontSize: "clamp(22px, 4vw, 32px)", color: "#F4EFE6" }}
            >
              WhatsApp opened.
            </h3>
            <p className="text-sm font-medium" style={{ color: "rgba(244,239,230,0.38)" }}>
              Your answers are pre-filled. Just hit send — we'll respond within a few hours.
            </p>
          </motion.div>
        )}

        {/* Bottom note */}
        <FadeUp delay={0.5} className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <p className="text-xs font-medium" style={{ color: "rgba(244,239,230,0.25)" }}>
              Prefer a direct call? We're on WhatsApp —{" "}
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 transition-colors duration-200"
                style={{ color: "rgba(29,255,138,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1DFF8A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(29,255,138,0.5)")}
              >
                message us directly
              </a>
              .
            </p>
            <div className="flex items-center gap-5">
              {["No cold proposals", "No upfront commitment", "No spam"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check size={9} style={{ color: "#1DFF8A" }} strokeWidth={3} />
                  <span className="text-[9px] font-black tracking-[0.16em] uppercase" style={{ color: "rgba(244,239,230,0.22)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function PricingPage() {
  return (
    <div style={{ background: "#070707" }}>
      <Opening />
      <SituationCards />
      <EngineeringChapter />
      <BillboardDivider />
      <VisibilityChapter />
      <HowItWorks />
      <ConversationStarter />
    </div>
  );
}