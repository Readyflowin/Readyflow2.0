"use client";

import React, { useState } from 'react';
import { 
  Check, ArrowRight, ShieldCheck, 
  Zap, MessageCircle, Calendar as CalendarIcon, 
  Store, Layout, Search, AlertTriangle, HelpCircle 
} from 'lucide-react';

export default function ShopifySetupPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // --- SEO SCHEMA ---
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Shopify Store Setup India",
    "provider": { "@type": "Organization", "name": "ReadyFlow" },
    "offers": [
      { "@type": "Offer", "name": "Kickstarter", "price": "4999", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "Growth", "price": "8999", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "Premium Brand", "price": "19999", "priceCurrency": "INR" }
    ]
  };

  const handleContact = (plan: string) => {
    const msg = `Hi ReadyFlow! I'm interested in the *${plan} Setup Plan*. \n\nI want to know *Shopify pe bechna kese shuru karein* properly. Let's discuss!`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 font-sans overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-500 text-[10px] md:text-xs font-bold mb-6 uppercase tracking-[0.2em]">
            <Store size={14} /> Shopify India Experts
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-[1.1] tracking-tighter">
            Shopify pe bechna <br className="hidden md:block" /> <span className="text-teal-500 text-italic">kese shuru karein?</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stop searching for a partner to build your website, Because you just found one with readyflow.
          </p>
        </div>

        {/* --- PRICING CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          
          {/* KICKSTARTER */}
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all">
            <h2 className="text-xl font-black mb-2 italic">Kickstarter</h2>
            <p className="text-gray-500 text-xs mb-8">Best for beginners testing the waters.</p>
            <div className="mb-8">
              <span className="text-4xl font-black">₹9,999</span>
              <span className="text-gray-500 text-sm ml-2">/one-time</span>
            </div>
            <div className="space-y-4 mb-10">
              <FeatureItem text="Free Theme Setup" />
              <FeatureItem text="10 Products Upload" />
              <FeatureItem text="Basic Payment Integration" />
              <FeatureItem text="7 Days Support" />
            </div>
            <button onClick={() => handleContact('Kickstarter')} className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-teal-500 hover:text-white transition-all text-xs uppercase tracking-widest">
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          {/* GROWTH (Alpha Card) */}
          <div className="bg-gradient-to-br from-teal-950/20 to-black border-2 border-teal-500 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-5 right-5 bg-teal-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
            <h2 className="text-xl font-black mb-2 italic text-teal-400">Growth Plan</h2>
            <p className="text-gray-400 text-xs mb-8">For serious dropshippers scaling up.</p>
            <div className="mb-8">
              <span className="text-4xl font-black">₹8,999</span>
              <span className="text-gray-500 text-sm ml-2">/one-time</span>
            </div>
            <div className="space-y-4 mb-10 text-gray-200">
              <FeatureItem text="Premium Theme Customization" isTeal />
              <FeatureItem text="50 Products Upload" isTeal />
              <FeatureItem text="WhatsApp Order Automation" isTeal />
              <FeatureItem text="RTO Reduction Strategy" isTeal />
              <FeatureItem text="15 Days Support" isTeal />
            </div>
            <button onClick={() => handleContact('Growth')} className="w-full py-4 bg-teal-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_10px_40px_rgba(20,184,166,0.3)] text-xs uppercase tracking-widest">
              Choose Growth <Zap size={16} fill="currentColor" />
            </button>
          </div>

          {/* PREMIUM BRAND */}
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all">
            <h2 className="text-xl font-black mb-2 italic">Premium Brand</h2>
            <p className="text-gray-500 text-xs mb-8">End-to-end custom brand building.</p>
            <div className="mb-8">
              <span className="text-4xl font-black">₹9,999</span>
              <span className="text-gray-500 text-sm ml-2">/one-time</span>
            </div>
            <div className="space-y-4 mb-10">
              <FeatureItem text="Custom UI/UX Development" />
              <FeatureItem text="Unlimited Product Upload" />
              <FeatureItem text="Advanced Marketing Funnels" />
              <FeatureItem text="Priority 30-Day Support" />
            </div>
            <button onClick={() => handleContact('Premium')} className="w-full py-4 bg-white/10 text-white border border-white/10 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-widest">
              Book Call <CalendarIcon size={16} />
            </button>
          </div>

        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 flex items-center justify-center gap-4 italic">
            <HelpCircle className="text-teal-500" size={32} /> Setup Queries
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <FaqItem 
              q="Shopify pe bechna kese shuru karein if I'm a complete beginner?" 
              a="Don't worry! Humara Kickstarter plan unhi ke liye hai. Hum aapka store setup karenge aur aapko basics sikhayenge taaki aap pehle din se ads run kar sakein." 
            />
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                <Search size={18} className="text-teal-500 mt-1 shrink-0" /> Are you a Website in India developer for local businesses?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pl-8 italic">Yes, ReadyFlow handles everything from local SEO optimization to GST-compliant checkout for Indian merchants.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- HELPERS ---

function FeatureItem({ text, isTeal = false }: { text: string; isTeal?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Check size={14} className={isTeal ? "text-teal-400" : "text-gray-600"} />
      <span className="text-xs font-medium">{text}</span>
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