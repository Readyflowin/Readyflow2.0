"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import PolicyGenerator from "../PolicyGenerator"; // Path check kar lena
import {
  ArrowLeft,
  ShieldCheck,
  BookOpen,
  Settings,
  Zap,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";

// --- DATABASE SIMULATION (SEO & GEO OPTIMIZED) ---
const PAGE_DATA = {
  id: "policy-generator",
  slug: "policy-generator",
  hero: {
    badge: "Razorpay, Paytm & GST Compliant",
    title:
      "India's Only <span class='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600'>Razorpay Compliance Ready</span> Policy Generator",
    subtitle:
      "Stop using generic US/UK templates. Generate GST-ready Privacy, Shipping & Refund Policies. Includes mandatory Grievance Officer details for Razorpay approval.",
    stats: "Trusted by 340+ Indian D2C Brands",
  },
  seo: {
    title: "Shopify Policy Generator India - Razorpay, Paytm & Consumer Protection Act Compliant",
    desc:
      "Free GST-ready Policy Generator for Indian Shopify stores. Create Privacy, Refund & Shipping terms with Grievance Officer details. Compliant with Consumer Protection Rules 2020.",
    schemaType: "SoftwareApplication",
    rating: "4.9",
    reviewCount: "342",
    canonical: "https://readyflow.in/tools/policy-generator",
    ogImage: "https://readyflow.in/og/policy-generator.png",
  },
  faq: [
    {
      q: "Are these policies compliant with Consumer Protection Act 2019?",
      a: "Yes. Our generator includes mandatory disclosures like Country of Origin, Grievance Officer contact, and specific return windows required by Indian Law.",
    },
    { 
      q: "Do you include GST & DPIIT details for Razorpay approval?", 
      a: "No, GST is not mandatory for shopify stores making revenue less than 8 lakhs a year. We request if your revenue crossed such limits, Get your legal built policies over a call through us including all the details." 
    },
    { 
      q: "Can I set different return rules for COD vs Prepaid?", 
      a: "Absolutely. The generated text allows conditional logic (e.g., 'No Returns on COD' or '7-Day Return for Prepaid') to help reduce RTO fraud." 
    },
  ],
  // --- STICKY BANNER SETTINGS ---
  stickyCta: {
    show: true,
    text: "Legal pages rejected?",
    btnText: "GET APPROVED", // Button Text
    price: "FREE", // Price
  },
};

function buildJsonLd() {
  // SoftwareApplication schema (Enhanced for Entity Linking)
  const appSchema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PAGE_DATA.seo.title,
    url: PAGE_DATA.seo.canonical,
    description: PAGE_DATA.seo.desc,
    applicationCategory: "LegalComplianceApplication",
    operatingSystem: "Shopify, WooCommerce, Wix, Web",
    audience: {
      "@type": "Audience",
      audienceType: "Indian D2C Merchants"
    },
    featureList: [
      "GST Compliant Invoicing Clauses",
      "Grievance Officer Details for Razorpay",
      "RTO Dispute Protection Clauses",
      "Consumer Protection Act 2019 Alignment"
    ],
    about: {
      "@type": "Legislation",
      name: "Consumer Protection (E-Commerce) Rules, 2020",
      sameAs: "https://consumeraffairs.nic.in/"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PAGE_DATA.seo.rating,
      reviewCount: PAGE_DATA.seo.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    }
  };

  // FAQ schema
  const faqSchema: any = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PAGE_DATA.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  // Breadcrumbs (helps indexing)
  const breadcrumbSchema: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Toolkit",
        item: "https://readyflow.in/tools",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Indian Policy Generator",
        item: PAGE_DATA.seo.canonical,
      },
    ],
  };

  return JSON.stringify([appSchema, faqSchema, breadcrumbSchema]);
}

export default function PolicyPage() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- HANDLER ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;

    const dateStr = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const msg = `Hi ReadyFlow! I'm on the *${PAGE_DATA.seo.title}* page.
I'd like to schedule a call regarding compliance.

*Date:* ${dateStr}
*Time Slot:* ${selectedTime}

Please let me know if this time slot is available.`;

    window.open(
      `https://wa.me/918602555840?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );

    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 overflow-x-hidden font-sans selection:bg-orange-500/30">
      <Head>
        <title>{PAGE_DATA.seo.title}</title>
        <meta name="description" content={PAGE_DATA.seo.desc} />
        <link rel="canonical" href={PAGE_DATA.seo.canonical} />
        {/* Open Graph */}
        <meta property="og:title" content={PAGE_DATA.seo.title} />
        <meta property="og:description" content={PAGE_DATA.seo.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_DATA.seo.canonical} />
        <meta property="og:image" content={PAGE_DATA.seo.ogImage} />
        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_DATA.seo.title} />
        <meta name="twitter:description" content={PAGE_DATA.seo.desc} />
        <meta name="twitter:image" content={PAGE_DATA.seo.ogImage} />
        {/* Robots */}
        <meta name="robots" content="index,follow" />
        {/* Structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: buildJsonLd() }}
        />
      </Head>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-12 transition-colors text-xs font-bold uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* --- HERO --- */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-600/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-wider mb-6">
            <ShieldCheck size={14} /> {PAGE_DATA.hero.badge}
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-6 text-white leading-[1.1] tracking-tight"
            dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.title }}
          />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            {PAGE_DATA.hero.subtitle}
          </p>
        </div>

        {/* --- TOOL --- */}
        <div className="relative z-20">
          <PolicyGenerator />
        </div>

        {/* --- CONTENT --- */}
        <div className="mt-32 max-w-5xl mx-auto border-t border-white/5 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                How to use?
              </h2>
              <ul className="space-y-6 border-l border-white/10 pl-6 ml-5">
                <StepItem step="01" text="Enter your Official Business Name and Email (as per GST)." />
                <StepItem step="02" text="Add your registered physical address for Legal compliance." />
                <StepItem step="03" text="Click 'Generate' and paste the HTML into your Shopify Pages." />
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">Why this tool?</h2>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-4">
                  Standard Shopify templates often lack the <strong>"Indian Grievance Officer"</strong> and <strong>"Other mandatory"</strong> details required by law. Missing these can lead to payment gateway rejection.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Pro Tip:</strong> Combining these strict policies with our <Link href="/tools/rto-shield" className="text-orange-500 hover:underline font-bold">RTO Shield</Link> significantly helps Reducing your RTO's.
                </p>
              </div>
            </div>
          </div>

          {/* --- IN-PAGE CTA --- */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4">Manual Setup se pareshan?</h3>
              <button
                onClick={() => setIsSchedulerOpen(true)}
                className="px-8 py-4 bg-orange-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-orange-500 hover:scale-105 transition-all"
                aria-label="Book Compliance Strategy Call"
              >
                Book Compliance Call <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* --- FAQ --- */}
          <div className="mt-32 max-w-3xl mx-auto space-y-4">
            {PAGE_DATA.faq.map((item, idx) => (
              <FaqBox key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>

      {/* --- STICKY BANNER (Calling the Fixed Component) --- */}
      <StickyBanner data={PAGE_DATA.stickyCta} onOpenScheduler={() => setIsSchedulerOpen(true)} />

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2rem] w-full max-w-md overflow-hidden p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white" aria-label="Close scheduler">
              <X size={24} />
            </button>

            {meetingStep === 1 ? (
              <div className="animate-in slide-in-from-right">
                <CalendarIcon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-6 text-white">Select Date</h3>
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-4">
                  <SimpleCalendar
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      setMeetingStep(2);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right text-center">
                <h3 className="text-2xl font-bold mb-8 text-white">Choose Time Slot</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-3 rounded-xl font-bold text-xs border ${selectedTime === slot ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-gray-500"}`}
                      aria-pressed={selectedTime === slot}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleScheduleSubmit}
                  disabled={!selectedTime}
                  className="w-full py-4 bg-orange-600 text-white font-black rounded-xl hover:bg-orange-500 transition-all disabled:opacity-50"
                >
                  CONFIRM ON WHATSAPP
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// --- FIXED STICKY BANNER COMPONENT ---
function StickyBanner({ data, onOpenScheduler }: { data: any; onOpenScheduler: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] animate-in slide-in-from-right duration-500">
      <div
        onClick={onOpenScheduler} // Poora card clickable
        className="bg-[#111] backdrop-blur-xl border border-white/20 p-2 pr-6 rounded-[1.5rem] shadow-2xl flex items-center gap-4 cursor-pointer hover:border-orange-500/50 transition-all group max-w-[350px]"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpenScheduler(); }}
        aria-label="Open booking scheduler"
      >
        {/* Logo Image */}
        <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-white/10 p-1 overflow-hidden">
          <img
            src="/logo.png"
            alt="ReadyFlow logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback agar image na mile
              e.currentTarget.style.display = "none";
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.parentElement!.innerHTML = '<span class="text-orange-500 text-xs font-bold">LOGO</span>';
            }}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-white font-black text-sm leading-tight mb-1">{data.text}</p>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-[10px] tracking-widest uppercase hover:underline decoration-orange-500 underline-offset-2">
              {data.btnText}
            </span>
            <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">{data.price}</span>
          </div>
        </div>

        {/* Close Button (Ispe click karne se sirf band hoga, scheduler nahi khulega) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -top-2 -right-2 bg-[#222] text-gray-400 hover:text-white rounded-full p-1 border border-white/10 shadow-lg z-20"
          aria-label="Dismiss sticky banner"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function StepItem({ step, text }: { step: string; text: string }) {
  return (
    <li className="relative pb-6 last:pb-0">
      <span className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-[#111] border border-orange-500/50 text-orange-500 flex items-center justify-center text-[10px] font-bold z-10">
        {step}
      </span>
      <span className="text-gray-300 text-sm leading-relaxed block pt-0.5">{text}</span>
    </li>
  );
}
function FaqBox({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5" aria-expanded={isOpen}>
        <span className="font-bold text-gray-200 text-sm">{q}</span>
        <ArrowRight size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-270" : "rotate-90"}`} />
      </button>
      {isOpen && <div className="p-5 pt-0 text-gray-500 text-sm border-t border-white/5">{a}</div>}
    </div>
  );
}
function SimpleCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const days = Array.from({ length: 8 }, (_, i) => {
    const d = new Date();
    d.setDate(new Date().getDate() + i + 1);
    return d;
  });
  return (
    <div className="grid grid-cols-4 gap-2">
      {days.map((d, i) => (
        <button
          key={i}
          onClick={() => onSelect(d)}
          className={`flex flex-col items-center p-2 rounded-xl border ${selected?.toDateString() === d.toDateString() ? "bg-orange-500 border-orange-500 text-white" : "bg-white/5 border-white/10 text-gray-500"}`}
          aria-label={`Select ${d.toDateString()}`}
        >
          <span className="text-[9px] uppercase font-bold">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
          <span className="text-sm font-black">{d.getDate()}</span>
        </button>
      ))}
    </div>
  );
}