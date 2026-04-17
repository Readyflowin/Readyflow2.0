"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import RTOShieldBuilder from '../RTOShieldBuilder'; // Ensure path is correct
import {
  ArrowLeft, ShieldAlert, Lock, Ban, Search,
  ArrowRight, Calendar as CalendarIcon, Clock, X, Zap, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// --- DATABASE SIMULATION (SEO & GEO OPTIMIZED) ---
const PAGE_DATA = {
  id: "rto-shield",
  slug: "rto-shield",
  hero: {
    badge: "Latency-Free Security",
    title: "RTO <br /> <span class='text-indigo-500'>Shield India.</span>",
    subtitle: "Stop fake orders using <strong>Predictive Pin code strategy</strong>. Block high-risk pincodes <span class='text-indigo-400 font-bold'>From all over INDIA</span> without slowing down your site."
  },
  seo: {
    title: "RTO Shield for Shopify India: Block Fake COD Orders & Blacklist Pincodes (2025)",
    desc: "Lightweight Shopify script to block high-risk RTO pincodes (J&K, Northeast). Automated COD-to-Prepaid conversion. Works with Shiprocket & Razorpay. No monthly fees.",
    schemaType: "SoftwareApplication",
    rating: "4.9",
    reviewCount: "215"
  },
  features: [
    { 
      icon: <Ban size={24} className="text-red-500" />, 
      title: "Block 25,000+ Blacklisted Zones", 
      desc: "Instantly blocks delivery to high-RTO districts in UP, Bihar, Assam & J&K based on our 2025 fraud dataset." 
    },
    { 
      icon: <Search size={24} className="text-indigo-500" />, 
      title: "Predictive Pattern Detection", 
      desc: "Detects fake patterns like '111111', 'abcde', or sequential numbers instantly using Client-Side Logic." 
    },
    { 
      icon: <Lock size={24} className="text-green-500" />, 
      title: "COD to Prepaid Nudges", 
      desc: "When combined with our Pop Ups, users reported a huge drop in COD orders and RTO rates." 
    }
  ],
  faq: [
    { 
      q: "Does this conflict with Shiprocket or Delhivery automation?", 
      a: "No. RTO Shield filters Scammers before they even scroll your website," 
    },
    { 
      q: "Is the database updated for Northeast & J&K?", 
      a: "Yes. We update our pincode blacklist weekly based on data from major Indian logistics partners to block 'high-intent' fraud zones specifically in remote areas." 
    },
    { 
      q: "Will it slow down my site speed?", 
      a: "Zero latency. Unlike heavy apps that load external iframes, this is a lightweight Vanilla JS script that executes locally in the user's browser." 
    }
  ],
  // --- STICKY BANNER SETTINGS ---
  stickyCta: {
    show: true,
    text: "RTO killing profits?",
    btnText: "BOOK RTO AUDIT",
    price: "₹1999"
  }
};

export default function RTOShieldPage() {
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

    const msg = `Hi ReadyFlow! I'm using *${PAGE_DATA.hero.badge}*.
I need help reducing my RTO.

*Date:* ${dateStr}
*Time Slot:* ${selectedTime}

Please let me know if this time slot is available.`;

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }

    setIsSchedulerOpen(false);
  };


  // --- SEO SCHEMAS (Enhanced for GEO & Entity Linking) ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": PAGE_DATA.seo.schemaType,
    "name": PAGE_DATA.seo.title,
    "description": PAGE_DATA.seo.desc,
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Shopify, Web",
    "fileSize": "Lightweight",
    "knowsAbout": [
        "Return to Origin",
        "Fraud Detection", 
        "COD Verification",
        "E-commerce Logistics"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Indian Shopify Merchants"
    },
    "featureList": [
        "Blacklisted Pincode Database 2025",
        "Fake Order Pattern Detection",
        "COD to Prepaid Conversion"
    ],
    "sameAs": [
        "https://www.shiprocket.in/", // Entity Link: Shiprocket
        "https://www.delhivery.com/", // Entity Link: Delhivery
        "https://www.shopify.in/"     // Entity Link: Shopify India
    ],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": PAGE_DATA.seo.rating, "ratingCount": PAGE_DATA.seo.reviewCount }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-16 md:pt-24 pb-48 selection:bg-indigo-500/30 overflow-x-hidden font-sans">

      <Head>
        <title>{PAGE_DATA.seo.title}</title>
        <meta name="description" content={PAGE_DATA.seo.desc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`https://readyflow.in/tools/${PAGE_DATA.slug}`} />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />

      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/[0.04] rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[140px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest" aria-label="Back to toolkit">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* --- HERO SECTION --- */}
        <div className="mb-16 md:mb-24 text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <ShieldAlert size={14} /> {PAGE_DATA.hero.badge}
            </div>
            <h1 
                className="text-5xl md:text-8xl font-black mb-6 leading-tight md:leading-[0.85] tracking-tighter uppercase"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.title }}
            />
            <p 
                className="text-gray-400 text-lg md:text-2xl max-w-2xl leading-tight font-medium"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.subtitle }}
            />
        </div>

        {/* --- MAIN TOOL --- */}
        <div className="relative z-20 mb-24">
            <RTOShieldBuilder />
        </div>

        {/* --- CONTENT WING (Features & CTA) --- */}
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-20">
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {PAGE_DATA.features.map((feature, idx) => (
                    <FeatureCard key={idx} icon={feature.icon} title={feature.title} desc={feature.desc} />
                ))}
            </div>

            {/* --- CTA / UPSELL BOX --- */}
            <div className="bg-gradient-to-br from-[#0f0c29] to-[#302b63] border border-white/10 p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden group mb-32">
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-transform duration-700 hidden md:block">
                    <ShieldAlert size={300} />
                </div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Manual checking se <br className="hidden md:block" /> thak gaye?
                        </h3>
                        <p className="text-indigo-200/60 text-lg mb-8 leading-relaxed">
                            Blocking fake orders manually is impossible at scale. Let us automate your entire RTO protection workflow with our API integration.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setIsSchedulerOpen(true)}
                                className="px-8 py-4 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                aria-label="Get RTO protection"
                            >
                                Get RTO Protection <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                        <ul className="space-y-4">
                            <CheckItem text="WhatsApp OTP Verification" />
                            <CheckItem text="Blacklist Database Access" />
                            <CheckItem text="Automated NDR Calls" />
                            <CheckItem text="Prepaid-Only Logic" />
                        </ul>
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
                <CalendarIcon className="text-indigo-500 mb-4" size={32} />
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
                <button onClick={handleScheduleSubmit} disabled={!selectedTime} className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50">CONFIRM ON WHATSAPP</button>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: meetingStep === 1 ? '50%' : '100%' }}></div>
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
                className="bg-[#111] backdrop-blur-xl border border-white/20 p-2 pr-6 rounded-[1.5rem] shadow-2xl flex items-center gap-4 cursor-pointer hover:border-indigo-500/50 transition-all group max-w-[400px]"
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
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-indigo-500 text-xs font-bold">LOGO</span>';
                        }} 
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-white font-black text-sm leading-tight mb-1">{data.text}</p>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-indigo-500 font-bold text-[10px] tracking-widest uppercase hover:underline decoration-indigo-500 underline-offset-2 leading-tight">
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

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 size={16} className="text-indigo-500 shrink-0" /> {text}
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
                <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${selected?.toDateString() === d.toDateString() ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}>
                    <span className="text-[9px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-sm font-black">{d.getDate()}</span>
                </button>
            ))}
        </div>
    );
}