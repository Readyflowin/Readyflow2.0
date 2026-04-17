"use client";

import React, { useState } from 'react';
import { 
  Check, ArrowRight, ShieldCheck, 
  Target, BarChart, Zap, X, 
  Calendar as CalendarIcon, Clock, TrendingUp, Search,
  AlertTriangle, HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AuditServicesPage() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Standard' | 'Premium' | null>(null);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SEO: SERVICE & FAQ SCHEMA ---
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Shopify Store Audit & Profit Optimization",
    "provider": { "@type": "Organization", "name": "ReadyFlow India" },
    "offers": [
      { "@type": "Offer", "name": "Standard Audit", "price": "1999", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "Premium Competitor Audit", "price": "3499", "priceCurrency": "INR" }
    ],
    "description": "Expert Shopify audit for Indian e-commerce. Reduce RTO, fix low profit margins, and analyze competitors to scale dropshipping business."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why am I losing money in RTO despite high sales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RTO happens because of lack of order verification, slow shipping, and poor customer trust. Our audit identifies exactly where your RTO is leaking money."
        }
      },
      {
        "@type": "Question",
        "name": "How to increase profit in dropshipping India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Increasing dropshipping profit requires balancing ad spend (ROAS) with net margins after accounting for shipping and RTO. Competitor analysis helps in pricing your products better."
        }
      }
    ]
  };

  // --- HANDLER: WHATSAPP ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedPlan) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I want to book the *${selectedPlan} Audit Plan*. \n\n*Plan:* ${selectedPlan}\n*Date:* ${dateStr}\n*Time Slot:* ${selectedTime}\n\nI want to fix my RTO and scale profit.`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 font-sans overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- H1 HERO --- */}
        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-500 text-[10px] md:text-xs font-bold mb-6 uppercase tracking-[0.2em]">
                <ShieldCheck size={14} /> Stop Burning Cash
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-[1.1] tracking-tighter">
                Shopify Audit: Scale <br className="hidden md:block" /> <span className="text-teal-500">Net Profit,</span> Not Ads.
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
                India mein dropshipping sales se nahi, <span className="text-white font-bold italic underline decoration-teal-500/50">Efficiency</span> se chalti hai. Agar aapka RTO high hai aur profit nahi bach raha, toh humara manual audit aapka "Leaky Bucket" fix karega.
            </p>
        </div>

        {/* --- PRICING CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32 px-2">
            
            {/* STANDARD PLAN (H2 Tagged) */}
            <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all duration-500">
                <h2 className="text-2xl font-black mb-2 italic">Standard Profit Audit</h2>
                <p className="text-gray-500 text-sm mb-8">For stores doing 30-100 orders/day.</p>
                <div className="mb-8">
                    <span className="text-5xl font-black">₹1999</span>
                    <span className="text-gray-500 ml-2">/one-time</span>
                </div>
                <div className="space-y-4 mb-10">
                    <PlanFeature text="20-Point Checkout Audit" />
                    <PlanFeature text="RTO Root Cause Discovery" />
                    <PlanFeature text="Profit Margin Simulation" />
                    <PlanFeature text="Ad Creative Efficiency Check" />
                    <PlanFeature text="Standard Audit Report (PDF)" />
                </div>
                <button 
                    onClick={() => { setSelectedPlan('Standard'); setIsSchedulerOpen(true); }}
                    className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-teal-500 hover:text-white transition-all shadow-xl text-sm uppercase tracking-widest"
                >
                    Book @ ₹1999 <ArrowRight size={16} />
                </button>
            </div>

            {/* PREMIUM PLAN (H2 Tagged) */}
            <div className="bg-gradient-to-br from-teal-950/20 to-black border-2 border-teal-500 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-5 right-5 bg-teal-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Alpha Growth
                </div>
                <h2 className="text-2xl font-black mb-2 italic text-teal-400">Premium + Competitor Analysis</h2>
                <p className="text-gray-400 text-sm mb-8">For brands ready to crush the market.</p>
                <div className="mb-8 text-white">
                    <span className="text-5xl font-black">₹3499</span>
                    <span className="text-gray-500 ml-2">/one-time</span>
                </div>
                <div className="space-y-4 mb-10 text-gray-200">
                    <PlanFeature text="Everything in Standard" isPremium />
                    <PlanFeature text="Competitor Creative Spying" isPremium />
                    <PlanFeature text="Competitor Pricing & Offer Check" isPremium />
                    <PlanFeature text="Custom RTO Reduction Scripts" isPremium />
                    <PlanFeature text="1-on-1 Strategy Call (30 Min)" isPremium />
                </div>
                <button 
                    onClick={() => { setSelectedPlan('Premium'); setIsSchedulerOpen(true); }}
                    className="w-full py-4 bg-teal-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_10px_40px_rgba(20,184,166,0.3)] text-sm uppercase tracking-widest"
                >
                    Book @ ₹3499 <Zap size={16} fill="currentColor" />
                </button>
            </div>
        </div>

        {/* --- FAQ SECTION (SEO GOLD) --- */}
        <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-12 flex items-center justify-center gap-4 italic">
                <HelpCircle className="text-teal-500" size={32} /> Common Doubts
            </h2>
            <div className="grid grid-cols-1 gap-6">
                <FaqItem 
                    q="Why am I losing money in RTO despite having good ROAS?" 
                    a="Ye sabse bada trap hai. Good ROAS means people are clicking, but High RTO means they aren't paying. RTO parcels mein aapka forward shipping, reverse shipping aur ad spend teeno doobte hain. Humara audit yahi loop holes pakadta hai." 
                />
                <FaqItem 
                    q="How to increase profit in dropshipping India?" 
                    a="Dropshipping mein profit badhane ke liye aapko product pricing 'Competitor Benchmarking' se karni hogi. Plus, RTO ko 15-20% ke niche lana mandatory hai. Hum premium plan mein wahi competitor data analyze karte hain." 
                />
                <FaqItem 
                    q="Audit ke baad results kab tak dikhenge?" 
                    a="Audit report milne ke 48-72 hours ke andar jab aap hamari recovery strategies apply karte ho, toh conversion aur RTO improvement visible ho jata hai." 
                />
            </div>
        </div>
      </div>

      {/* --- SCHEDULER MODAL (SAME AS PREVIOUS) --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden relative shadow-2xl">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div>
                    <CalendarIcon className="text-teal-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold mb-4">Select Slot for {selectedPlan} Audit</h3>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d: Date) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-bold mb-6">Select Time</h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                        {["11 AM", "2 PM", "5 PM", "8 PM"].map(slot => (
                            <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-4 rounded-xl border font-bold ${selectedTime === slot ? 'bg-white text-black' : 'bg-white/5 text-gray-400'}`}>{slot}</button>
                        ))}
                    </div>
                    <button onClick={handleScheduleSubmit} disabled={!selectedTime} className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl disabled:opacity-50">CONFIRM ON WHATSAPP</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- HELPER COMPONENTS ---

function PlanFeature({ text, isPremium = false }: { text: string; isPremium?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <Check size={16} className={isPremium ? "text-teal-400" : "text-gray-500"} />
            <span className="text-xs md:text-sm font-medium">{text}</span>
        </div>
    );
}

function FaqItem({ q, a }: { q: string; a: string }) {
    return (
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                <AlertTriangle size={18} className="text-teal-500 mt-1 shrink-0" /> {q}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed pl-8">{a}</p>
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
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-teal-500 text-white border-teal-500' : 'bg-black text-gray-500 border-white/10'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}