"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PopupBuilder from '../PopupBuilder'; // Ensure path is correct
import {
  ArrowLeft, Zap, MousePointer2, Code2, Rocket,
  Settings, ArrowRight, Calendar as CalendarIcon, Clock, X, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// --- DATABASE SIMULATION (SEO & GEO OPTIMIZED) ---
const PAGE_DATA = {
  id: "popup-builder",
  slug: "popup-builder",
  hero: {
    badge: "Mobile-First Conversion Tool",
    title: "Convert <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600'>COD to Prepaid</span> Without Slowing Your Store",
    subtitle: "No monthly apps. No heavy jQuery. Generate pure, speed-optimized <strong>Vanilla JS popups</strong> that load asynchronously after your content.",
    stats: "Generated 12,000+ Popups"
  },
  seo: {
    title: "Lightweight Popup Builder for Shopify India - Zero Speed Impact (Vanilla JS)",
    desc: "Create exit-intent & COD-to-Prepaid nudges for Shopify. <5KB script size, loads async to keep Core Web Vitals green. No monthly fees.",
    schemaType: "SoftwareApplication",
    rating: "4.8",
    reviewCount: "128"
  },
  features: [
    { 
      icon: <Zap size={24} className="text-orange-500" />, 
      title: "Zero Speed Impact (LCP)", 
      desc: "5KB Vanilla JS script injected via Shopify ScriptTags. Loads asynchronously to ensure green Core Web Vitals." 
    },
    { 
      icon: <MousePointer2 size={24} className="text-blue-500" />, 
      title: "Mobile Exit Intent", 
      desc: "Detects 'Back Button' behavior on mobile devices to trigger popups, recovering 15% of abandoned carts." 
    },
    { 
      icon: <Code2 size={24} className="text-green-500" />, 
      title: "Razorpay Compatible", 
      desc: "Triggers on Cart page before checkout redirect. Works perfectly with Razorpay, Cashfree, and UPI flows." 
    }
  ],
  faq: [
    { 
      q: "Will this slow down my mobile site speed (LCP)?", 
      a: "No. Unlike apps like Privy (150KB+), our script is <5KB and uses the 'defer' attribute. It only loads after your product images are visible." 
    },
    { 
      q: "Can I target specific Indian pincodes?", 
      a: "No. This is a lightweight frontend code snippet (Vanilla JS) that runs on the consumer's browser, so it does not conflict with any backend payment logic." 
    },
    { 
      q: "Does it work with Razorpay/Cashfree checkout?", 
      a: "This code only works at frontend, At the consumer side and donot dispute with any backend functionality." 
    }
  ],
  // --- UPDATED STICKY BANNER SETTINGS ---
  stickyCta: {
    show: true,
    text: "Sales dropping?",
    btnText: "GET AI POWERED API BASED CHATBOTS",
    price: "FROM ₹4999 ONE TIME PAYMENT"
  }
};

export default function PopupBuilderPage() {
  // --- STATE MANAGEMENT ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Dynamic city personalization (client-side only). IMPORTANT: base page must remain crawlable.
  const [cityName, setCityName] = useState<string | null>(null);
  useEffect(() => {
    try {
      const qp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('city') : null;
      if (qp) setCityName(qp);
      // Optionally you can add logic to read a simple cookie or localStorage if user selected a city earlier.
    } catch (e) {
      // ignore
    }
  }, []);

  // --- HANDLER: WHATSAPP SCHEDULING ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;

    const dateStr = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const cityPart = cityName ? ` (${cityName})` : '';

    const msg = `Hi ReadyFlow! I'm interested in *${PAGE_DATA.stickyCta.btnText}*${cityPart}.\nI'd like to book a strategy call.\n\n*Date:* ${dateStr}\n*Time Slot:* ${selectedTime}\n\nMy site / store: `;

    // open with noopener and noreferrer to avoid security issues
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }

    setIsSchedulerOpen(false);
  };

  // --- SEO SCHEMAS (Enhanced for GEO) ---
  // SoftwareApplication + FAQPage + Organization
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": PAGE_DATA.seo.schemaType,
    "name": PAGE_DATA.seo.title,
    "description": PAGE_DATA.seo.desc,
    "applicationCategory": "MarketingApplication",
    "operatingSystem": "Shopify Online Store 2.0",
    "fileSize": "5KB", // Technical signal for AI
    "featureList": [
      "Exit-Intent Technology",
      "COD-to-Prepaid Nudges",
      "Async Loading",
      "Mobile-First Templates"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Indian D2C Merchants"
    },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": PAGE_DATA.seo.rating, "ratingCount": PAGE_DATA.seo.reviewCount }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": PAGE_DATA.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ReadyFlow",
    "url": "https://readyflow.in",
    "logo": "https://readyflow.in/logo.png",
    "sameAs": ["https://www.youtube.com/@readyflow", "https://instagram.com/readyflow"]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 overflow-x-hidden font-sans selection:bg-blue-500/30">

      <Head>
        <title>{PAGE_DATA.seo.title}</title>
        <meta name="description" content={PAGE_DATA.seo.desc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`https://readyflow.in/tools/${PAGE_DATA.slug}`} />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors text-xs font-bold uppercase tracking-[0.2em]" aria-label="Back to toolkit">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* --- HERO --- */}
        <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-wider mb-6">
                <Settings size={14} /> {PAGE_DATA.hero.badge}
            </div>

            {/* Note: Keep H1 static for crawlability. We also show a small personalized line if cityName is present (client-side only). */}
            <h1 
                className="text-5xl md:text-7xl font-black mb-6 text-white leading-[1.1] tracking-tight"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.title }} 
            />

            <p 
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.subtitle }}
            />

            {/* client-side personalization: low-impact addition, not replacing base H1 or core content */}
            {cityName && (
              <p className="text-blue-200 text-sm">Optimized for stores in <strong>{cityName}</strong></p>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-black" />)}
                </div>
                <span>{PAGE_DATA.hero.stats}</span>
            </div>
        </div>

        {/* --- MAIN TOOL --- */}
        <div className="relative z-20 mb-24">
            <PopupBuilder />
        </div>

        {/* --- CONTENT WING --- */}
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-20">

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {PAGE_DATA.features.map((feature, idx) => (
                    <FeatureCard key={idx} icon={feature.icon} title={feature.title} desc={feature.desc} />
                ))}
            </div>

            {/* --- CTA / UPSELL BOX --- */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden group mb-32">
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-transform duration-700 hidden md:block">
                    <Rocket size={300} />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Bhai, itna manual <br className="hidden md:block" /> setup kyun?
                        </h3>
                        <p className="text-blue-200/60 text-lg mb-8 leading-relaxed">
                            Agar aap popup ya store khud configure nahi kar paa rahe, toh hamara <strong className="text-white font-bold">Expert Setup</strong> package dekhein. Hum sab automate kar dete hain.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setIsSchedulerOpen(true)}
                                className="px-8 py-4 bg-blue-600 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                aria-label="Book strategy call"
                            >
                                Book Strategy Call <ArrowRight size={18} />
                            </button>
                            <Link href="/portfolio" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all" aria-label="View portfolio">
                                View Portfolio
                            </Link>
                        </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                        <ul className="space-y-4">
                            <CheckItem text="WhatsApp Order Verification" />
                            <CheckItem text="RTO Safety Filter" />
                            <CheckItem text="Custom Hero & UI Design" />
                            <CheckItem text="Full Shopify Optimization" />
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- INSTALLATION GUIDE --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 className="text-2xl font-bold mb-8 text-white">How to install?</h2>
                    <div className="space-y-8">
                        <StepItem step="01" text="Generate your custom popup code using the builder above." />
                        <StepItem step="02" text="Go to Online Store &gt; Themes and click Edit Code in Shopify." />
                        <StepItem step="03" text="Open theme.liquid and paste the code right before the </body> tag." />
                    </div>
                </div>
                <div>
                      <h2 className="text-2xl font-bold mb-8 text-white">Founder's Note</h2>
                      <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative">
                        <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">"</div>
                        <p className="text-gray-400 text-sm leading-relaxed italic mb-4 relative z-10">
                            Unlike heavy apps that load 2MB of JS, this script is only 5KB. It ensures your store remains fast while still capturing every lead. Measure the impact with our <Link href="/tools/profit-calculator" className="text-blue-400 font-bold hover:underline">Profit Calculator</Link>.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">AR</div>
                            <div>
                                <div className="text-white font-bold text-sm">Aditya</div>
                                <div className="text-gray-600 text-xs uppercase tracking-wider">ReadyFlow Founder</div>
                            </div>
                        </div>
                      </div>
                </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-10 text-center text-white">Common Doubts</h2>
                <div className="space-y-4">
                    {PAGE_DATA.faq.map((item, idx) => (
                        <FaqBox key={idx} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* --- STICKY BANNER --- */}
      <StickyBanner 
        data={PAGE_DATA.stickyCta} 
        onOpenScheduler={() => setIsSchedulerOpen(true)} 
      />

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2rem] w-full max-w-md overflow-hidden p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors" aria-label="Close scheduler"><X size={24} /></button>

            {meetingStep === 1 ? (
              <div className="animate-in slide-in-from-right">
                <CalendarIcon className="text-blue-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-6 text-white">Select Date</h3>
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-4">
                    <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right text-center">
                <h3 className="text-2xl font-bold mb-8 text-white">Choose Time Slot</h3>
                <div className="flex justify-center mb-6">
                    <button onClick={() => setMeetingStep(1)} className="text-xs text-gray-500 underline uppercase tracking-widest">Change Date</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"].map(slot => (
                    <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-3 rounded-xl font-bold text-xs border ${selectedTime === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-500'}`}>{slot}</button>
                  ))}
                </div>
                <button onClick={handleScheduleSubmit} disabled={!selectedTime} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50" aria-disabled={!selectedTime}>CONFIRM ON WHATSAPP</button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: meetingStep === 1 ? '50%' : '100%' }}></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- REUSABLE COMPONENTS ---

function StickyBanner({ data, onOpenScheduler }: { data: any, onOpenScheduler: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500 && !isDismissed) setIsVisible(true);
            else setIsVisible(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    if (!isVisible || isDismissed) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[99] animate-in slide-in-from-right duration-500">
            <div 
                onClick={onOpenScheduler} 
                className="bg-[#111] backdrop-blur-xl border border-white/20 p-2 pr-6 rounded-[1.5rem] shadow-2xl flex items-center gap-4 cursor-pointer hover:border-blue-500/50 transition-all group max-w-[400px]"
                role="button"
                aria-label="Open booking widget"
            >
                <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-white/10 p-1 overflow-hidden">
                    <img 
                        src="/logo.png" 
                        alt="ReadyFlow logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-blue-500 text-xs font-bold">LOGO</span>';
                        }} 
                    />
                </div>
                {/* Modified Layout for Long Text */}
                <div className="flex flex-col">
                    <p className="text-white font-black text-sm leading-tight mb-1">{data.text}</p>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-blue-500 font-bold text-[10px] tracking-widest uppercase hover:underline decoration-blue-500 underline-offset-2 leading-tight">
                            {data.btnText}
                        </span>
                        <span className="text-[9px] font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                            {data.price}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
                    className="absolute -top-2 -right-2 bg-[#222] text-gray-400 hover:text-white rounded-full p-1 border border-white/10 shadow-lg z-20"
                    aria-label="Dismiss banner"
                >
                    <X size={12} />
                </button>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:bg-white/[0.04] transition-all group hover:border-white/20">
            <div className="mb-6 group-hover:scale-110 transition-transform bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</div>
            <h4 className="font-bold text-lg mb-3 text-white">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function StepItem({ step, text }: { step: string, text: string }) {
    return (
        <li className="relative pb-8 last:pb-0 pl-8 border-l border-white/10 last:border-0">
            <span className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[#111] border border-blue-500 text-blue-500 flex items-center justify-center text-[10px] font-bold z-10">{step}</span>
            <span className="text-gray-300 text-sm leading-relaxed block -mt-1">{text}</span>
        </li>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 size={16} className="text-blue-500 shrink-0" /> {text}
        </li>
    );
}

function FaqBox({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors" aria-expanded={isOpen} aria-controls={`faq-${q}`}>
                <span className="font-bold text-gray-200 text-sm">{q}</span>
                <ArrowRight size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-270' : 'rotate-90'}`} />
            </button>
            {isOpen && <div id={`faq-${q}`} className="p-5 pt-0 text-gray-500 text-sm border-t border-white/5 mt-2">{a}</div>}
        </div>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = Array.from({length: 8}, (_, i) => {
        const d = new Date(); d.setDate(new Date().getDate() + i + 1); return d;
    });
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => (
                <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${selected?.toDateString() === d.toDateString() ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`} aria-pressed={selected?.toDateString() === d.toDateString()} aria-label={`Select ${d.toDateString()}`}>
                    <span className="text-[9px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-sm font-black">{d.getDate()}</span>
                </button>
            ))}
        </div>
    );
}