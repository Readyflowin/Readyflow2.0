"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, Smartphone, MessageSquare, 
  MapPin, CheckCircle2, TrendingDown, ArrowUpRight, 
  Zap, Info, Youtube, X, Calendar as CalendarIcon, Clock, Sparkles,
  Search, ShieldAlert, BarChart3, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function RTOReductionGuide() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isBannerDismissed) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBannerDismissed]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "RTO Reduction Strategy India: The Ultimate Shopify Guide",
    "description": "Learn the best RTO reduction strategy for India. Fix high COD returns on Shopify using WhatsApp verification and AI tools.",
    "author": { "@type": "Person", "name": "Aditya - ReadyFlow" }
  };
const handleCloseBanner = () => {
  setIsBannerDismissed(true);
  setShowStickyBanner(false);
};
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I want to book the *Profit Audit (₹1999)* to fix my store's RTO.\n\n*Date:* ${dateStr}\n*Time:* ${selectedTime}`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 selection:bg-orange-500/30 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        
        {/* --- HERO --- */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-6">
            <ShieldAlert size={16} /> Profit Leakage Alert
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Stop losing money to <br />
            <span className="text-orange-500">RTO & Fake Orders.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
            In India, 30% of COD orders never get delivered. Our <strong className="font-bold text-white">RTO reduction strategy</strong> turns these losses into net profit.
          </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <div className="md:col-span-8 bg-white/[0.03] border border-white/10 rounded-[3rem] p-10">
            <h2 className="text-3xl font-bold mb-8 text-orange-400">The Verification-First Framework</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <StrategyPoint title="WhatsApp OTP Verification" desc="Confirm COD orders instantly to filter non-serious buyers." />
              <StrategyPoint title="AI Address Correction" desc="Automatically fix 'Near Pipal Ka Ped' style addresses." />
              <StrategyPoint title="Prepaid Conversions" desc="Incentivize users to pay online and eliminate RTO risk." />
              <StrategyPoint title="Historical Risk Scoring" desc="Block high-risk pin codes and previous RTO offenders." />
            </div>
          </div>
          <div className="md:col-span-4 bg-orange-500 text-black rounded-[3rem] p-10 flex flex-col justify-between">
            <BarChart3 size={48} />
            <div>
              <p className="text-6xl font-black tracking-tighter">-15%</p>
              <p className="font-bold uppercase text-xs tracking-widest opacity-70">Average RTO Drop</p>
            </div>
          </div>
        </div>

        {/* --- THE PILLAR CONTENT --- */}
        <div className="prose prose-invert max-w-none mb-32 border-t border-white/10 pt-20">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-4xl font-bold mb-6">Why RTO is an Indian eCommerce "Tax"</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  If you are selling on Shopify in India, you already know that <strong className="font-bold text-white">Cash on Delivery (COD)</strong> is a double-edged sword. While it brings 70-80% of your orders, it also brings a massive hidden cost: <strong className="font-bold text-white">RTO (Return to Origin)</strong>. 
                  When an order returns, you lose forward shipping fees, reverse shipping fees, and most importantly, your <strong className="font-bold text-white">Facebook Ad Spend</strong>.
                </p>
              </section>

              <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-orange-500 mb-4">The Psychology of Fake Orders</h3>
                <p className="text-gray-400">
                  Most RTOs happen because of "Impulse Buying" without intent. A user clicks an ad at 11 PM, orders COD, and forgets about it by morning. 
                  By implementing a <strong className="font-bold text-white">WhatsApp confirmation bot</strong>, you force the user to acknowledge the order, which increases the "Perceived Commitment".
                </p>
              </section>

              <section>
                <h2 className="text-4xl font-bold mb-6">Technical Solutions to Reduce COD Returns</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 font-bold">1</div>
                    <p><strong className="text-white">Address Validation:</strong> Use Regex or AI tools to ensure landmarks and house numbers are present. Incomplete addresses account for 40% of RTOs in India.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 font-bold">2</div>
                    <p><strong className="text-white">NDR Management:</strong> Non-Delivery Reports (NDR) must be handled in real-time. If a courier fails to deliver, an automated IVR call or WhatsApp should reach the customer immediately.</p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="bg-[#111] p-8 rounded-3xl border border-white/10 sticky top-32">
                <h4 className="text-xl font-bold mb-4">Audit Your Store</h4>
                <p className="text-sm text-gray-500 mb-6">Is your RTO higher than 20%? You are literally burning cash. Get a professional audit today.</p>
                <button onClick={() => setIsSchedulerOpen(true)} className="w-full py-4 bg-white text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                  Book Audit (₹1999)
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-16 italic">RTO Reduction FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              q="What is a good RTO percentage for Indian Dropshipping?" 
              a="For a healthy business, your RTO should be below 15-18%. If it crosses 25%, your ad spend will likely consume all your margins." 
            />
            <FaqItem 
              q="Does WhatsApp verification actually work?" 
              a="Yes, data shows that stores using WhatsApp confirmation see a 15-20% drop in RTO because it verifies the phone number and buyer intent instantly." 
            />
            <FaqItem 
              q="How can ReadyFlow help with RTO?" 
              a="We build 'RTO-Safe' stores. We integrate address correction, automated NDR management, and WhatsApp flows directly into your Shopify setup starting at ₹9,999." 
            />
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <div className="bg-white text-black rounded-[4rem] p-16 md:p-24 text-center">
          <h3 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">Fix your bottom line.</h3>
          <p className="text-gray-500 font-bold mb-12 uppercase text-xs tracking-[0.3em]">Built-in RTO Protection with ReadyFlow.</p>
          <Link href="https://wa.me/918602555840" className="px-12 py-6 bg-black text-white font-black rounded-2xl text-xl hover:scale-105 transition-all inline-flex items-center gap-4">
            Get RTO-Safe Setup <ArrowUpRight />
          </Link>
        </div>
      </div>

      {/* --- STICKY BANNER (Updated with Logo) --- */}
      {showStickyBanner && !isBannerDismissed && !isSchedulerOpen && (
        <div className="fixed bottom-8 right-8 z-[60] animate-in slide-in-from-right duration-500">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-[2rem] shadow-2xl flex items-center gap-5 max-w-sm relative">
            
            {/* Logo Container Rendered */}
            <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-white/10 p-1">
              <img src="/logo.png" alt="ReadyFlow Logo" className="w-full h-full object-contain" />
            </div>
            
            <div>
              <p className="text-white font-black text-sm">RTO killing profits?</p>
              <button onClick={() => setIsSchedulerOpen(true)} className="text-orange-500 font-bold text-xs hover:underline uppercase tracking-widest mt-1">Book Audit @ ₹1999</button>
            </div>
            <button onClick={handleCloseBanner} className="absolute -top-2 -right-2 bg-gray-900 text-gray-400 rounded-full p-1.5 border border-white/10"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] border border-white/10 rounded-[3rem] w-full max-w-md overflow-hidden p-10 relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            {meetingStep === 1 ? (
              <div className="animate-in slide-in-from-bottom duration-300">
                <CalendarIcon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-2">Select Audit Date</h3>
                <p className="text-gray-500 text-xs mb-8 uppercase font-bold italic tracking-widest">Fee: ₹1999</p>
                <SimpleCalendar selected={selectedDate} onSelect={(d: Date) => {setSelectedDate(d); setMeetingStep(2);}} />
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom duration-300 text-center">
                <Clock className="text-blue-500 mb-6 mx-auto" size={40} />
                <h3 className="text-2xl font-bold mb-8">Choose Time Slot</h3>
                <div className="grid gap-3 mb-8">
                  {["11:00 AM", "03:00 PM", "07:00 PM"].map(slot => (
                    <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-4 rounded-2xl font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black' : 'bg-white/5 border-white/10 text-gray-500'}`}>{slot}</button>
                  ))}
                </div>
                <button onClick={handleScheduleSubmit} disabled={!selectedTime} className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl disabled:opacity-50">CONFIRM ON WHATSAPP</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// --- HELPERS ---
function StrategyPoint({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <CheckCircle2 size={18} className="text-orange-500" /> {title}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed pl-7">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
      <h4 className="text-xl font-bold text-orange-400 mb-4 flex gap-3"><Info size={24} className="shrink-0" /> {q}</h4>
      <p className="text-gray-400 leading-relaxed pl-9">{a}</p>
    </div>
  );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
    const today = new Date();
    for (let i = 1; i < 9; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-3">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} type="button" onClick={() => onSelect(d)} className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[8px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-sm font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}