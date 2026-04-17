"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ProfitCalculator from '../ProfitCalculator'; // Ensure path is correct
import {
  ArrowLeft, TrendingUp, BarChart3, ArrowRight,
  Calendar as CalendarIcon, Clock, X, ShieldAlert, Zap, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// --- DATABASE SIMULATION (SEO & GEO OPTIMIZED) ---
const PAGE_DATA = {
  id: "profit-calculator",
  slug: "profit-calculator",
  hero: {
    badge: "Unit Economics Engine",
    title: "Shopify Profit & <br /> <span class='text-teal-500'>RTO Calculator</span> India",
    subtitle: "Stop scaling on Gross Revenue. Calculate your <strong class='text-white'>True Net Margin</strong> after deducting <span class='text-white font-bold'>Shiprocket Shipping</span>, Razorpay Fees, and RTO Losses. Reveal your actual Break-even ROAS."
  },
  seo: {
    title: "Shopify Profit & RTO Calculator India - True Net Margin Analysis (GST Included)",
    desc: "Calculate real profit after Shiprocket shipping, Razorpay fees (2%), and RTO losses. Reveal your Breakeven ROAS instantly. Essential for Indian D2C scaling.",
    schemaType: "FinanceApplication",
    rating: "4.9",
    reviewCount: "188"
  },
  faq: [
    { 
      q: "Does this account for Forward + Reverse shipping on RTO?", 
      a: "Yes. In India, an RTO order costs you double (Forward + Reverse Charge). This calculator deducts ₹100-₹150 per RTO order to show your true loss." 
    },
    { 
      q: "How do you calculate Break-even ROAS?", 
      a: "We use the formula: Average Order Value / (Gross Margin - Shipping - Payment Fees). This tells you exactly how much you can spend on Facebook Ads to make ₹0 profit." 
    },
    { 
      q: "Does it handle GST Input Credit?", 
      a: "Yes. It separates GST collected on products vs. GST paid on services (Shipping/Ads), giving you a clearer picture of your tax liability." 
    }
  ],
  // --- STICKY BANNER SETTINGS ---
  stickyCta: {
    show: true,
    text: "Bleeding money on RTO?",
    btnText: "BOOK PROFIT AUDIT",
    price: "₹1999"
  }
};

export default function CalculatorPage() {
  // --- STATE MANAGEMENT ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- HANDLER: WHATSAPP SCHEDULING ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;

    const dateStr = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const msg = `Hi ReadyFlow! I'm interested in the *${PAGE_DATA.stickyCta.btnText}*.
I used the Profit Calculator and want to fix my margins.

*Date:* ${dateStr}
*Time Slot:* ${selectedTime}

Please let me know if this time slot is available.`;

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }

    setIsSchedulerOpen(false);
  };


  // --- SEO SCHEMAS (Enhanced for GEO) ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": PAGE_DATA.seo.schemaType,
    "name": PAGE_DATA.seo.title,
    "description": PAGE_DATA.seo.desc,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, Shopify",
    "variableMeasured": [
      "Net Profit Margin",
      "Return on Ad Spend (ROAS)", 
      "RTO Loss Impact",
      "GST Input Credit"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Indian D2C Merchants"
    },
    "offers": { "@type": "Offer", "price": "1999", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": PAGE_DATA.seo.rating, "ratingCount": PAGE_DATA.seo.reviewCount }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": PAGE_DATA.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <main className="min-h-screen bg-black text-white pt-16 md:pt-24 pb-24 md:pb-40 overflow-x-hidden font-sans">

      <Head>
        <title>{PAGE_DATA.seo.title}</title>
        <meta name="description" content={PAGE_DATA.seo.desc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`https://readyflow.in/tools/${PAGE_DATA.slug}`} />
      </Head>
      
      {/* SEO SCRIPTS */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-6 md:mb-8 transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest" aria-label="Back to toolkit">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* --- HERO SECTION --- */}
        <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-teal-500 text-[10px] md:text-xs font-bold mb-4 md:mb-6 uppercase tracking-tight">
                <BarChart3 size={14} /> {PAGE_DATA.hero.badge}
            </div>
            
            <h1 
                className="text-4xl md:text-7xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight md:leading-[1.1] tracking-tight"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.title }}
            />
            
            <p 
                className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.subtitle }}
            />
        </div>

        {/* --- CALCULATOR TOOL --- */}
        <div className="relative z-20 px-2 md:px-0">
            <ProfitCalculator />
        </div>

        {/* --- DETAILED STRATEGY CONTENT --- */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto px-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16 md:mb-24">
                <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem]">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                        <ShieldAlert className="text-red-500" /> The RTO Reality
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Most calculators ignore RTO costs. But if your RTO is 30%, you are paying double shipping on 3 out of 10 orders. Use our <Link href="/tools/rto-shield" className="text-teal-400 font-bold hover:underline">RTO Shield</Link> to fix this leakage.
                    </p>
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 text-[11px] md:text-xs text-red-200/60">
                        <strong>Fact:</strong> High RTO kills net margin faster than low ROAS.
                    </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem]">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                        <TrendingUp className="text-teal-500" /> Delivered GMV Focus
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                         Don't scale based on Dashboard Sales. Scale based on <strong className="text-white">Delivered GMV</strong>. This tool reveals your actual bank settlement amount after all deductions.
                    </p>
                    <div className="p-4 bg-teal-500/5 rounded-2xl border border-teal-500/10 text-[11px] md:text-xs text-teal-200/60">
                        <strong>Benchmark:</strong> Aim for 20-25% Net Margin in India.
                    </div>
                </div>
            </div>

            {/* --- MAIN CTA BLOCK --- */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group mb-20 md:mb-32">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Numbers dekh ke <br className="hidden md:block" /> tension ho rahi hai?
                        </h3>
                        <button 
                            onClick={() => setIsSchedulerOpen(true)}
                            className="px-8 py-4 bg-white text-teal-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl text-sm"
                        >
                            Book Profit Audit <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <CheckItem text="Custom RTO Reduction Scripts" />
                        <CheckItem text="High-Conversion Landing Pages" />
                        <CheckItem text="Ad Creative Strategy" />
                        <CheckItem text="Backend Ops Optimization" />
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

      {/* --- STICKY BANNER (Reusable Component) --- */}
      <StickyBanner 
        data={PAGE_DATA.stickyCta} 
        onOpenScheduler={() => setIsSchedulerOpen(true)} 
      />

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors" aria-label="Close scheduler">
              <X size={24} />
            </button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-teal-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold mb-2 text-white">Select Audit Date</h3>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest font-bold italic">Standard Audit Fee: ₹1999</p>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center text-white">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-bold mb-6">Select a Time Slot</h3>
                    <div className="flex justify-center mb-6">
                        <button onClick={() => setMeetingStep(1)} className="text-xs text-gray-500 underline uppercase tracking-widest">Change Date</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"].map(slot => (
                            <button 
                                key={slot} 
                                onClick={() => setSelectedTime(slot)} 
                                className={`p-4 rounded-xl text-xs font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    <button 
                        disabled={!selectedTime}
                        onClick={handleScheduleSubmit} 
                        className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl shadow-xl hover:bg-teal-500 transition-all disabled:opacity-50 text-sm tracking-widest"
                    >
                        CONFIRM ON WHATSAPP
                    </button>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                    <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: meetingStep === 1 ? '50%' : '100%' }}></div>
                </div>
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
            if (window.scrollY > 400 && !isDismissed) setIsVisible(true);
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
                className="bg-[#111] backdrop-blur-xl border border-white/20 p-2 pr-6 rounded-[1.5rem] shadow-2xl flex items-center gap-4 cursor-pointer hover:border-teal-500/50 transition-all group max-w-[400px]"
            >
                <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-white/10 p-1 overflow-hidden">
                    <img 
                        src="/logo.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-teal-500 text-xs font-bold">LOGO</span>';
                        }} 
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-white font-black text-sm leading-tight mb-1">{data.text}</p>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-teal-500 font-bold text-[10px] tracking-widest uppercase hover:underline decoration-teal-500 underline-offset-2 leading-tight">
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
                >
                    <X size={12} />
                </button>
            </div>
        </div>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-teal-100/70">
            <Zap size={16} className="text-teal-400 shrink-0" />
            <span className="text-xs md:text-sm font-medium">{text}</span>
        </div>
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
                <button 
                    key={i} 
                    onClick={() => onSelect(d)} 
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                        selected?.toDateString() === d.toDateString() 
                        ? 'bg-teal-500 border-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]' 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                    aria-pressed={selected?.toDateString() === d.toDateString()}
                    aria-label={`Select ${d.toDateString()}`}
                >
                    <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-sm font-black">{d.getDate()}</span>
                </button>
            ))}
        </div>
    );
}