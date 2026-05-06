import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  LayoutGrid,
  MessageCircle,
  Package,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";

const WA_NUMBER = "918602555840";
const SPRING_UI = { type: "spring" as const, stiffness: 360, damping: 30 } as const;

const PARTNERS = [
  { name: "Zain Aesthetics", url: "https://zainaesthetics.in/" },
  { name: "Confelion", url: "https://confelion.store/" },
  { name: "Hopup Clothing", url: "https://hopupclothing.in/" },
  { name: "Haelo Shop", url: "https://haelo.shop/" },
];

type PlatformKey = "shopify" | "wordpress" | "custom";

type Plan = {
  id: string;
  name: string;
  price: string;
  badge?: string;
  highlight?: boolean;
  subtitle: string;
  features: string[];
};

type Platform = {
  key: PlatformKey;
  label: string;
  icon: typeof Store;
  headline: string;
  pros: string[];
  cons: string[];
  plans: Plan[];
};

const PLATFORMS: Platform[] = [
  {
    key: "shopify",
    label: "Shopify",
    icon: Store,
    headline: "Best for beginners who want to launch fast and manage products easily.",
    pros: ["Fast setup", "Easy dashboard", "Great for product stores", "Useful app ecosystem"],
    cons: ["Monthly platform cost", "Less room for deep custom logic on basic plans"],
    plans: [
      {
        id: "shopify-starter",
        name: "Starter",
        price: "₹9,999",
        badge: "Start here",
        subtitle: ".store domain, ready to launch",
        features: [
          ".store domain",
          "Up to 15 products upload",
          "Payment setup",
          "Delivery app installation",
          "Up to 3 essential Shopify app integrations",
          "2 days post-delivery changes",
          "7 days support",
          "No custom coding",
        ],
      },
      {
        id: "shopify-growth",
        name: "Growth",
        price: "₹9,999",
        badge: "Most popular",
        highlight: true,
        subtitle: ".in domain with better launch balance",
        features: [
          ".in domain",
          "Up to 20 products with title + description",
          "Images to be provided by client",
          "Payment integration",
          "Shipping integration",
          "Partial payment enabled",
          "3 days post-delivery changes",
          "15 days support",
        ],
      },
      {
        id: "shopify-pro",
        name: "Pro",
        price: "₹14,999",
        badge: "Premium",
        subtitle: ".in or .com domain subject to availability",
        features: [
          ".in or .com domain subject to availability",
          "Everything in the ₹9,999 plan",
          "Up to 25 products",
          "Custom coding included for up to 5 sections",
          "30 days support",
          "7 days changes window post delivery",
        ],
      },
    ],
  },
  {
    key: "wordpress",
    label: "WordPress",
    icon: Globe,
    headline: "Best for service businesses, portfolios, and content-heavy websites.",
    pros: ["Flexible content management", "SEO-friendly", "Good ownership/control", "Scales well for content"],
    cons: ["Dashboard feels a little more complex", "Setup takes longer than Shopify"],
    plans: [
      {
        id: "wp-starter",
        name: "Starter",
        price: "₹9,999",
        badge: "Smart choice",
        subtitle: "Clean business site setup",
        features: [
          "Professional business website setup",
          "Mobile responsive design",
          "Contact form + WhatsApp button",
          "Basic SEO setup",
          "2 days post-delivery changes",
          "7 days support",
        ],
      },
      {
        id: "wp-growth",
        name: "Growth",
        price: "₹14,999",
        badge: "Most popular",
        highlight: true,
        subtitle: "More pages and stronger branding",
        features: [
          "Everything in Starter",
          "Up to 6–8 pages",
          "Better layout customization",
          "Blog setup",
          "Google Maps / social links integration",
          "3 days post-delivery changes",
          "15 days support",
        ],
      },
      {
        id: "wp-pro",
        name: "Pro",
        price: "₹19,999",
        badge: "Advanced",
        subtitle: "Premium business website",
        features: [
          "Everything in Growth",
          "Advanced design sections",
          "Custom page sections",
          "Speed optimization",
          "Lead capture setup",
          "30 days support",
          "7 days changes window post delivery",
        ],
      },
    ],
  },
  {
    key: "custom",
    label: "Custom Code",
    icon: Code2,
    headline: "Best when you want exact control, unique UI, and a custom build.",
    pros: ["Fully tailored to your brand", "No template limitations", "Best performance potential", "Built exactly how you want"],
    cons: ["Highest cost", "Needs a clear scope", "More time than Shopify/WordPress"],
    plans: [
      {
        id: "custom-start",
        name: "Custom Build",
        price: "₹24,999+",
        badge: "Discuss first",
        highlight: true,
        subtitle: "Final pricing depends on scope",
        features: [
          "Fully custom-coded website",
          "Exact layout as per your requirements",
          "Brand-specific UI/UX",
          "Custom interactions and sections",
          "Performance-focused build",
          "Pricing finalized after discussion",
        ],
      },
    ],
  },
];

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getPlatform(platformKey: PlatformKey | null) {
  return PLATFORMS.find((p) => p.key === platformKey) ?? null;
}

function getPlan(platform: Platform | null, planId: string | null) {
  if (!platform || !planId) return null;
  return platform.plans.find((plan) => plan.id === planId) ?? null;
}

function TickFeature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 text-left">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1DFF8A]/15 border border-[#1DFF8A]/25">
        <Check size={11} className="text-[#1DFF8A]" strokeWidth={4} />
      </div>
      <span className="text-sm md:text-[15px] leading-relaxed text-white/80">{text}</span>
    </div>
  );
}

function WhatsAppPreviewModal({
  open,
  onClose,
  platform,
  plan,
  projectType,
  name,
}: {
  open: boolean;
  onClose: () => void;
  platform: Platform | null;
  plan: Plan | null;
  projectType: string;
  name: string;
}) {
  const message = useMemo(() => {
    const intro = name.trim() ? `Hi, I'm ${name.trim()}.` : "Hi, I want to get a website built.";
    return [
      intro,
      "",
      "Here are my details:",
      `• Project Type: ${projectType || "Not selected"}`,
      `• Platform: ${platform?.label || "Not selected"}`,
      `• Plan: ${plan ? `${plan.name} — ${plan.price}` : "Not selected"}`,
      "",
      "Please guide me further.",
    ].join("\n");
  }, [name, plan, platform, projectType]);

  const openWhatsApp = () => {
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center px-3 sm:px-6 py-3 sm:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={SPRING_UI}
            className="relative w-full max-w-2xl overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#F4EFE6] shadow-2xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#1DFF8A]/10 blur-3xl pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4 border-b border-black/5 px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-black/30">Continue on WhatsApp</p>
                <h3 className="mt-2 text-xl sm:text-3xl font-black tracking-tighter text-[#070707]">Review your selection</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-black/10 bg-white px-3 py-3 text-black/50 transition-colors hover:text-black"
              >
                <ChevronLeft size={18} className="rotate-180" />
              </button>
            </div>

            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-0">
              <div className="p-5 sm:p-8">
                <div className="rounded-[1.3rem] bg-white p-4 sm:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-black/5">
                  <p className="text-[9px] font-black uppercase tracking-[0.35em] text-black/30">Message preview</p>
                  <pre className="mt-3 whitespace-pre-wrap break-words text-[13px] sm:text-[15px] leading-relaxed text-[#070707] font-medium font-sans">
                    {message}
                  </pre>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1DFF8A] px-5 py-3.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#070707] shadow-[0_0_50px_rgba(29,255,138,0.18)] transition-transform hover:scale-[1.01]"
                  >
                    <MessageCircle size={16} />
                    Open WhatsApp
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#070707] transition-colors hover:bg-black hover:text-white"
                  >
                    Edit Selection
                  </button>
                </div>
              </div>

              <div className="border-t border-black/5 bg-black px-5 py-5 text-white md:border-l md:border-t-0 md:px-7 md:py-7">
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/35">Selected details</p>

                <div className="mt-4 grid grid-cols-3 gap-2 md:block md:space-y-4">
                  <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3 md:px-0 md:py-0 md:border-0 md:bg-transparent">
                    <div className="text-[8px] font-black uppercase tracking-[0.25em] text-white/35">Project</div>
                    <div className="mt-1 text-sm sm:text-lg font-black leading-tight">{projectType || "Not selected"}</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3 md:px-0 md:py-0 md:border-0 md:bg-transparent">
                    <div className="text-[8px] font-black uppercase tracking-[0.25em] text-white/35">Platform</div>
                    <div className="mt-1 text-sm sm:text-lg font-black leading-tight">{platform?.label || "Not selected"}</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3 md:px-0 md:py-0 md:border-0 md:bg-transparent">
                    <div className="text-[8px] font-black uppercase tracking-[0.25em] text-white/35">Plan</div>
                    <div className="mt-1 text-sm sm:text-lg font-black leading-tight">{plan ? `${plan.name} — ${plan.price}` : "Not selected"}</div>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.1rem] border border-[#1DFF8A]/20 bg-[#1DFF8A]/10 p-3.5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1DFF8A]">Fast response flow</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/72">
                    Clean, short, and easy to read on mobile.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function PricingSection() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [projectType, setProjectType] = useState("Clothing brand");
  const [customProjectType, setCustomProjectType] = useState("");
  const [platformKey, setPlatformKey] = useState<PlatformKey | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const platform = getPlatform(platformKey);
  const selectedPlan = getPlan(platform, planId);
  const currentPlans = platform?.plans ?? [];

  const selectProjectType = (value: string) => {
    setProjectType(value);
    setStep(1);
  };

  const selectPlatform = (key: PlatformKey) => {
    setPlatformKey(key);
    const firstPlan = getPlatform(key)?.plans[0];
    setPlanId(firstPlan?.id ?? null);
    setStep(2);
  };

  const openSelection = () => {
    if (!platform || !selectedPlan) return;
    setModalOpen(true);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F4EFE6] py-12 md:py-24" id="pricing">
      <div className="absolute left-[-8rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#1DFF8A]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-8rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-black/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 shadow-sm">
            <Sparkles size={14} className="text-[#070707]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-black/60">Choose your best fit</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#070707]">
            Website plans <br />
            <span className="bg-gradient-to-r from-[#070707] via-slate-700 to-[#1DFF8A] bg-clip-text text-transparent">made simple</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm md:text-lg font-semibold uppercase tracking-tight text-black/45 leading-relaxed">
            Pick a platform, compare a clean plan, and continue on WhatsApp with your details already filled in.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_25px_70px_rgba(0,0,0,0.06)] md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black">
              <span className={`h-2.5 w-2.5 rounded-full ${step === 0 ? "bg-[#1DFF8A]" : "bg-black/10"}`} />
              Step {step + 1} of 3
            </div>
            <div className="rounded-full border border-black/5 bg-[#F8F7F3] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-black/40">
              Mobile first
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/30">Step 1</p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-black tracking-tighter text-[#070707]">What do you need?</h3>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { label: "Clothing brand", icon: Package },
                    { label: "Dropshipping store", icon: LayoutGrid },
                    { label: "Jewellery store", icon: Smartphone },
                    { label: "Something else", icon: ShieldCheck },
                  ].map((item) => {
                    const active = projectType === item.label;
                    const Icon = item.icon;
                    const isCustom = item.label === "Something else";

                    if (isCustom) {
                      return (
                        <div
                          key={item.label}
                          className={`flex items-center gap-3 rounded-[1.4rem] border px-4 py-4 text-left transition-all md:px-5 md:py-5 ${
                            active
                              ? "border-[#1DFF8A]/40 bg-[#1DFF8A]/12 shadow-[0_0_0_1px_rgba(29,255,138,0.12)]"
                              : "border-black/5 bg-[#F8F7F3] hover:bg-white"
                          }`}
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-4">
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-[#1DFF8A] text-[#070707]" : "bg-white text-[#070707] shadow-sm"}`}>
                              <Icon size={18} strokeWidth={2.4} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-sm md:text-base font-black tracking-tight text-[#070707]">{item.label}</div>
                              <input
                                value={customProjectType}
                                onChange={(e) => setCustomProjectType(e.target.value)}
                                placeholder="Type here"
                                className="mt-1 w-full border-0 bg-transparent p-0 text-[11px] md:text-xs text-black/45 outline-none placeholder:text-black/25"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const value = customProjectType.trim();
                              if (value) selectProjectType(value);
                            }}
                            className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#070707] text-white transition-transform hover:scale-[1.03]"
                            aria-label="Go to next step"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.label}
                        onClick={() => selectProjectType(item.label)}
                        className={`flex items-center justify-between rounded-[1.4rem] border px-4 py-4 text-left transition-all md:px-5 md:py-5 ${
                          active
                            ? "border-[#1DFF8A]/40 bg-[#1DFF8A]/12 shadow-[0_0_0_1px_rgba(29,255,138,0.12)]"
                            : "border-black/5 bg-[#F8F7F3] hover:bg-white"
                        }`}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-[#1DFF8A] text-[#070707]" : "bg-white text-[#070707] shadow-sm"}`}>
                            <Icon size={18} strokeWidth={2.4} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm md:text-base font-black tracking-tight text-[#070707]">{item.label}</div>
                            <div className="mt-1 text-[11px] md:text-xs text-black/45">Tap to continue</div>
                          </div>
                        </div>
                        {active ? <BadgeCheck size={18} className="text-[#1DFF8A]" /> : <ChevronRight size={18} className="text-black/20" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black">Step 2</p>
                    <h3 className="mt-2 text-2xl md:text-3xl font-black tracking-tighter text-[#070707]">Choose platform</h3>
                    <p className="mt-2 max-w-2xl text-sm md:text-base text-black/55 leading-relaxed">
                      Select one platform first. After that, the pricing plans appear cleanly.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="rounded-full border border-black/5 bg-[#F8F7F3] px-3 py-3 text-black/60 transition-colors hover:text-black"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {PLATFORMS.map((item) => {
                    const active = platformKey === item.key;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => selectPlatform(item.key)}
                        className={`group relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all md:p-5 ${
                          active
                            ? "border-[#1DFF8A]/50 bg-[#1DFF8A]/10 shadow-[0_0_0_1px_rgba(29,255,138,0.12)]"
                            : "border-black/5 bg-[#F8F7F3] hover:bg-white"
                        }`}
                      >
                        <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full bg-[#1DFF8A]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
                        <div className="relative flex items-center justify-between">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active ? "bg-[#1DFF8A] text-[#070707]" : "bg-white text-[#070707] shadow-sm"}`}>
                            <Icon size={20} strokeWidth={2.2} />
                          </div>
                          {active ? <Check size={16} className="text-[#1DFF8A]" /> : <ChevronRight size={16} className="text-black/20" />}
                        </div>
                        <div className="mt-5">
                          <div className="text-lg font-black tracking-tight text-[#070707]">{item.label}</div>
                          <p className="mt-2 text-xs leading-relaxed text-black/55">{item.headline}</p>
                        </div>
                        <div className="mt-4 text-[10px] font-black uppercase tracking-[0.32em] text-black/35">Tap to continue</div>
                      </button>
                    );
                  })}
                </div>

                {platform && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 grid gap-4 md:grid-cols-2"
                  >
                    <div className="rounded-[1.4rem] border border-black/5 bg-[#070707] p-4 text-white">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35">Pros</div>
                      <div className="mt-3 space-y-2.5">
                        {platform.pros.map((item) => (
                          <TickFeature key={item} text={item} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.4rem] border border-black/5 bg-[#070707] p-4 text-white">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35">Cons</div>
                      <div className="mt-3 space-y-2.5">
                        {platform.cons.map((item) => (
                          <TickFeature key={item} text={item} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && platform && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black">Step 3</p>
                    <h3 className="mt-2 text-2xl md:text-3xl font-black tracking-tighter text-[#070707]">Pick a plan</h3>
                    <p className="mt-2 max-w-2xl text-sm md:text-base text-black/55 leading-relaxed">
                      Choose one plan on the left. Details appear on the right. The WhatsApp message updates from there.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-full border border-black/5 bg-[#F8F7F3] px-3 py-3 text-black/60 transition-colors hover:text-black"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
                  <div className="space-y-3">
                    {currentPlans.map((plan) => {
                      const active = planId === plan.id;

                      return (
                        <button
                          key={plan.id}
                          onClick={() => setPlanId(plan.id)}
                          className={`w-full rounded-[1.4rem] border px-4 py-4 text-left transition-all ${
                            active
                              ? "border-[#1DFF8A]/40 bg-[#070707] text-white shadow-[0_0_0_1px_rgba(29,255,138,0.14)]"
                              : "border-black/5 bg-[#F8F7F3] text-[#070707] hover:border-black/10 hover:bg-white"
                          }`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="text-base font-black tracking-tight">{plan.name}</div>
                              <div className={`mt-1 text-[11px] leading-relaxed ${active ? "text-white/65" : "text-black/45"}`}>{plan.subtitle}</div>
                            </div>

                            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                              {plan.badge && (
                                <div className="inline-flex rounded-full border border-[#1DFF8A] bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.28em] text-[#070707]">
                                  {plan.badge}
                                </div>
                              )}
                              <div className="text-right">
                                <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${active ? "text-[#1DFF8A]" : "text-black/30"}`}>Price</div>
                                <div className="mt-1 text-lg font-black">{plan.price}</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPlan?.id ?? "empty"}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 18 }}
                      transition={{ duration: 0.22 }}
                      className={`rounded-[1.8rem] p-5 md:p-6 ${selectedPlan?.highlight ? "bg-[#070707] text-white" : "bg-[#F8F7F3] text-[#070707]"}`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.35em] ${
                              selectedPlan?.highlight ? "bg-[#1DFF8A] text-[#070707]" : "bg-black/5 text-black/45"
                            }`}
                          >
                            {selectedPlan?.badge ?? "Selected plan"}
                          </div>
                          <h4 className="mt-4 text-2xl md:text-3xl font-black tracking-tighter">
                            {selectedPlan ? `${selectedPlan.name} — ${selectedPlan.price}` : "Select a plan"}
                          </h4>
                        </div>

                        <div
                          className={`self-start rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] ${
                            selectedPlan?.highlight ? "border-white/10 bg-white/5 text-white/45" : "border-black/5 bg-white text-black/35"
                          }`}
                        >
                          details
                        </div>
                      </div>

                      <div className="mt-5 space-y-3.5">
                        {(selectedPlan?.features ?? ["Choose a plan to see inclusions."]).map((feature) => (
                          <div key={feature} className={`flex items-start gap-3 ${selectedPlan?.highlight ? "text-white/85" : "text-black/80"}`}>
                            <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${selectedPlan?.highlight ? "bg-[#1DFF8A]" : "bg-black/5"}`}>
                              <Check size={11} className={selectedPlan?.highlight ? "text-[#070707]" : "text-black/60"} strokeWidth={4} />
                            </div>
                            <span className="text-[13px] md:text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-[1.25rem] border border-current/10 bg-white/5 p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">WhatsApp preview</div>
                        <p className={`mt-2 text-sm leading-relaxed ${selectedPlan?.highlight ? "text-white/70" : "text-black/55"}`}>
                          Your WhatsApp message will include the selected platform, plan, and project type so the conversation starts with clarity.
                        </p>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                        <label className={`rounded-[1.2rem] border p-4 ${selectedPlan?.highlight ? "border-white/10 bg-white/5" : "border-black/5 bg-white"}`}>
                          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${selectedPlan?.highlight ? "text-white/35" : "text-black/30"}`}>Your name</span>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className={`mt-2 w-full bg-transparent text-base font-medium outline-none ${
                              selectedPlan?.highlight ? "text-white placeholder:text-white/20" : "text-[#070707] placeholder:text-black/25"
                            }`}
                          />
                        </label>

                        <button
                          onClick={openSelection}
                          disabled={!platform || !selectedPlan}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1DFF8A] px-6 py-4 text-[11px] md:text-xs font-black uppercase tracking-[0.28em] text-[#070707] transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <MessageCircle size={16} />
                          Continue on WhatsApp
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-6 md:gap-8"
        >
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Brands powering ahead with us</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-12 opacity-35 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100">
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 group">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em]">{p.name}</span>
                <ArrowUpRight size={8} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>

          <Link
            to="/work"
            className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/45 transition-all hover:text-[#070707]"
          >
            View Past Work <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <WhatsAppPreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        platform={platform}
        plan={selectedPlan}
        projectType={projectType}
        name={name}
      />
    </section>
  );
}