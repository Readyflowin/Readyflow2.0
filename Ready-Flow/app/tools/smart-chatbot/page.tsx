"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SmartChatbot from '../SmartChatbot';
// --- IMPORT IMAGE FOR LOGO ---
import Image from 'next/image';
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  Calendar as CalendarIcon, Clock, X,
  Zap, MessageCircle, Bot, Code2, Smartphone
} from 'lucide-react';
import Link from 'next/link';

// --- DATA CONFIGURATION (SEO & GEO OPTIMIZED) ---
const PAGE_DATA = {
  hero: {
    badge: "Blocks Fake Orders + Support",
    title: "WhatsApp Chatbot — <br /> <span class='text-green-500'>Order Tracking & Support</span>",
    subtitle: "Don't just say 'Hello'. Automate <strong>'Where is my order?'</strong> queries using website rediretion and instant lead capture."
  },
  seo: {
    title: "Free WhatsApp Chatbot for Shopify India | Automate Order Tracking & COD Verification",
    desc: "Reduce support tickets by 80% with this free WhatsApp bot. Automates 'Where is my order?' queries, syncs with Shiprocket, and verifies COD orders via OTP.",
    keywords: "Shopify WhatsApp chatbot free, Shiprocket order tracking whatsapp, COD verification OTP, WhatsApp automation India"
  },
  features: [
    { 
      icon: <Zap size={24} className="text-yellow-500" />, 
      title: "Order tracking", 
      desc: "Redirect to order page for seamless experience for customers asking 'Where is my order?'" 
    },
    { 
      icon: <Smartphone size={24} className="text-green-500" />, 
      title: "Instant replies", 
      desc: "Instantly gives you the user query so the chances of loosing an order are minimized." 
    },
    { 
      icon: <Code2 size={24} className="text-blue-500" />, 
      title: "Hinglish Support", 
      desc: "You can feed question in any language of your choice and the bot will reply in the same language feeded in the answer." 
    }
  ],
  faq: [
    { 
      q: "Does it sync with Shiprocket for real-time tracking?", 
      a: "Yes. The advanced version which is custom developed fetches real-time status from Shiprocket/Delhivery and replies to the customer automatically." 
    },
    { 
      q: "Can I use this to block fake COD orders?", 
      a: "Yes. We recommend using it alongside our <a href='/tools/rto-shield' class='text-green-400 underline'>RTO Shield</a> block fake pin code users to access your website." 
    },
    { 
      q: "Will it slow down my site?", 
      a: "Zero impact. Our script loads asynchronously after your main content (LCP compliant), ensuring your store speed remains 90+ on mobile." 
    }
  ],
  stickyCta: {
    show: true,
    text: "Tired of manual replies?",
    btnText: "GET AI POWERED API CHATBOT",
    price: "FROM ₹4999 ONE TIME"
  }
};

export default function SmartBotPage() {
  // --- STATE ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [cityName, setCityName] = useState<string | null>(null);

  // --- SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- READ OPTIONAL city QUERY PARAM FOR CLIENT-SIDE PERSONALIZATION ---
  useEffect(() => {
    try {
      const qp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('city') : null;
      if (qp) setCityName(qp);
    } catch (e) {
      // ignore
    }
  }, []);

  // --- HANDLER ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const cityPart = cityName ? ` (${cityName})` : '';
    const msg = `Hi ReadyFlow! I'm interested in the *${PAGE_DATA.stickyCta.btnText}*${cityPart}.\nI want to automate my store's support.\n\n*Date:* ${dateStr}\n*Slot:* ${selectedTime}`;
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }
    setIsSchedulerOpen(false);
  };

  // --- SEO JSON-LD (Enhanced for GEO) ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": PAGE_DATA.seo.title,
    "description": PAGE_DATA.seo.desc,
    "keywords": PAGE_DATA.seo.keywords,
    "applicationCategory": "CustomerSupportApplication",
    "operatingSystem": "Shopify, WhatsApp",
    "featureList": [
        "Shiprocket Order Tracking", 
        "COD OTP Verification", 
        "Abandoned Cart Recovery",
        "Hinglish NLP Support"
    ],
    "knowsAbout": [
        "Customer Service Automation",
        "WhatsApp Business API",
        "E-commerce Logistics"
    ],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "342" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": PAGE_DATA.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a } // Note: HTML inside text is stripped by Google, but keeping raw text is fine
    }))
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-24 md:pb-40 overflow-x-hidden font-sans selection:bg-green-500/30">

      <Head>
        <title>{PAGE_DATA.seo.title}</title>
        <meta name="description" content={PAGE_DATA.seo.desc} />
        <meta name="keywords" content={PAGE_DATA.seo.keywords} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`https://readyflow.in/tools/whatsapp-chatbot`} />
      </Head>

      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-left">

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mt-4 mb-10 md:mb-12 transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest" aria-label="Back to toolkit">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-20 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-green-600/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-green-500 text-[10px] md:text-xs font-bold mb-4 md:mb-6 uppercase tracking-tight">
                <MessageCircle size={14} /> {PAGE_DATA.hero.badge}
            </div>

            <h1 
                className="text-4xl md:text-6xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight tracking-tight px-2"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.title }}
            />
            <p 
                className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
                dangerouslySetInnerHTML={{ __html: PAGE_DATA.hero.subtitle }}
            />

            {/* Client-side personalization */}
            {cityName && <p className="text-sm text-green-200 mt-2">Optimized for stores in <strong>{cityName}</strong></p>}
        </div>

        {/* Tool Component */}
        <div className="relative z-20 px-2 md:px-0">
            <SmartChatbot />
        </div>

        {/* Content Wing */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto px-2">

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
                {PAGE_DATA.features.map((feature, idx) => (
                    <FeatureCard key={idx} icon={feature.icon} title={feature.title} desc={feature.desc} />
                ))}
            </div>

            {/* Installation Guide */}
            <div className="mb-20 md:mb-32 border-t border-white/10 pt-16 md:pt-20">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-white">How to install?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <div className="space-y-8">
                        <StepItem step="01" text="Enter your WhatsApp Number and customize your welcome message above." />
                        <StepItem step="02" text="Copy the generated script and go to Online Store > Themes > Edit Code." />
                        <StepItem step="03" text="Open theme.liquid and paste the code right before the </body> tag." />
                    </div>

                    <div className="space-y-6">
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
                            <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Chatbot Tutorial" allowFullScreen></iframe>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center">Watch 2-Min Setup Video</p>
                    </div>
                </div>
            </div>

            {/* AI Upsell Block */}
            <div className="bg-gradient-to-br from-green-900/30 to-[#0a0a0a] border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden group mb-20">
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-transform duration-700 hidden md:block">
                    <Bot size={300} />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Get a Smart AI <br className="hidden md:block" /> Sales Agent
                        </h3>
                        <p className="text-green-100/60 text-base md:text-lg mb-8 leading-relaxed">
                            Agar aapko automated order tracking aur AI-driven sales bot chahiye, toh hamara <strong className="text-white font-bold">AI Setup</strong> package dekhein.
                        </p>
                        <button 
                            onClick={() => setIsSchedulerOpen(true)}
                            className="px-8 py-4 bg-green-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-green-500 hover:scale-105 transition-all text-sm shadow-lg"
                        >
                            Get AI Bot Demo <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                        <ul className="space-y-4">
                            <CheckItem text="AI Product Recommendations" />
                            <CheckItem text="Automated Order Tracking" />
                            <CheckItem text="Abandoned Cart Recovery" />
                            <CheckItem text="OpenAI (GPT-4) Integration" />
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20 px-2 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-white">Common Doubts</h2>
                <div className="space-y-4">
                    {PAGE_DATA.faq.map((item, idx) => (
                        <FaqBox key={idx} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* --- STICKY BANNER --- */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-md transition-all duration-700 ${showSticky && !isSchedulerOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#111]/90 backdrop-blur-xl border border-white/20 px-4 py-3 md:px-5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 group hover:border-green-500/50 transition-all">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative shrink-0 bg-black rounded-lg border border-white/10 overflow-hidden p-1">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                    <p className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest leading-tight">
                        {PAGE_DATA.stickyCta.text}
                    </p>
                    <p className="text-xs font-black text-white">{PAGE_DATA.stickyCta.btnText}</p>
                </div>
            </div>
            
            <button 
                onClick={() => setIsSchedulerOpen(true)}
                className="bg-white text-black text-[10px] font-black px-4 py-2.5 rounded-xl hover:bg-green-500 hover:text-white transition-all whitespace-nowrap shadow-lg uppercase tracking-tight"
                aria-label="Book demo"
            >
                BOOK DEMO
            </button>
        </div>
      </div>

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md relative shadow-2xl overflow-hidden">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10" aria-label="Close scheduler"><X size={24} /></button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-green-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold mb-2 text-white">Select Date</h3>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest font-bold italic">Check Availability</p>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center duration-300 text-white">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-bold mb-6">Select a Time Slot</h3>
                    <div className="flex justify-center mb-6">
                        <button onClick={() => setMeetingStep(1)} className="text-xs text-gray-500 underline uppercase tracking-widest">Change Date</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"].map(slot => (
                            <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-4 rounded-xl text-xs font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>{slot}</button>
                        ))}
                    </div>
                    <button disabled={!selectedTime} onClick={handleScheduleSubmit} className="w-full py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:bg-green-500 transition-all disabled:opacity-50 text-sm tracking-widest">
                        CONFIRM ON WHATSAPP
                    </button>
                  </div>
                )}
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: meetingStep === 1 ? '50%' : '100%' }}></div>
                </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- HELPER COMPONENTS ---

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
            <span className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[#111] border border-green-500 text-green-500 flex items-center justify-center text-[10px] font-bold z-10">{step}</span>
            <span className="text-gray-300 text-sm leading-relaxed block -mt-1">{text}</span>
        </li>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {text}
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
            {isOpen && <div id={`faq-${q}`} className="p-5 pt-0 text-gray-500 text-sm border-t border-white/5 mt-2" dangerouslySetInnerHTML={{__html: a}}></div>}
        </div>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = Array.from({length: 8}, (_, i) => { const d = new Date(); d.setDate(new Date().getDate() + i + 1); return d; });
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => (
                <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${selected?.toDateString() === d.toDateString() ? 'bg-green-600 border-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`} aria-pressed={selected?.toDateString() === d.toDateString()} aria-label={`Select ${d.toDateString()}`}>
                    <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-sm font-black">{d.getDate()}</span>
                </button>
            ))}
        </div>
    );
}