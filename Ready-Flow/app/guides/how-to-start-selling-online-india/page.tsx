"use client";

import React, { useState } from 'react';
import { 
  Rocket, ShoppingBag, IndianRupee, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Zap, 
  Calculator, FileText, MessageCircle, Youtube, Star, X, Info,
  TrendingUp, Truck, CreditCard, Lock
} from 'lucide-react';
import Link from 'next/link';

export default function SellingOnlineGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState('');

  const steps = [
    { id: 1, title: "Niche Selection", desc: "Aap kya bechna chahte hain?" },
    { id: 2, title: "Business Model", desc: "Amazon vs Own Brand" },
    { id: 3, title: "Profit Check", desc: "Margin calculation" },
    { id: 4, title: "Compliance", desc: "Legal & RTO strategy" },
    { id: 5, title: "Launch", desc: "Start selling in 5 days" }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start an Online Selling Business in India",
    "description": "Complete 2026 guide on how to start selling online in India using Shopify and D2C strategies.",
    "step": [
      { "@type": "HowToStep", "name": "Niche Selection", "text": "Identify high-demand categories like Home Decor or Apparel in the Indian market." },
      { "@type": "HowToStep", "name": "Channel Choice", "text": "Choose between Shopify (D2C) for brand building or marketplaces for quick sales." },
      { "@type": "HowToStep", "name": "Profit Audit", "text": "Calculate Net Profit after Facebook Ads and RTO losses." }
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 overflow-x-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Rocket size={14} /> 2026 E-commerce Roadmap
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tighter">
            Shopify pe bechna <br/> <span className="text-orange-500">kese shuru karein?</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            India mein online business shuru karna asaan hai, par profit banana mushkil. 
            Ye guide aapko batayegi ki bina cash jalaye apna **D2C Brand** kaise launch karein.
          </p>
        </div>

        {/* --- INTERACTIVE ROADMAP --- */}
        <div className="flex justify-between mb-20 relative max-w-3xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <button 
              key={s.id} 
              onClick={() => setCurrentStep(s.id)}
              className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${currentStep >= s.id ? 'bg-orange-500 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-black border-white/20 text-gray-500'}`}
            >
              <span className="font-bold text-sm text-white">{s.id}</span>
            </button>
          ))}
        </div>

        {/* --- DYNAMIC INTERACTIVE CONTENT --- */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-20">
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-3xl font-bold mb-4">Step 01: High-Demand Niche Selection</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Indian market is price sensitive. Aapko aisa product dhundna hai jiski "Perceived Value" high ho par cost kam. 
                Trending niches like **Sustainable Fashion** and **Home Tech** are booming in 2026.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NicheCard icon={<ShoppingBag />} title="Handmade Decor" active={selectedNiche === 'decor'} onClick={() => setSelectedNiche('decor')} />
                <NicheCard icon={<Zap />} title="Smart Gadgets" active={selectedNiche === 'tech'} onClick={() => setSelectedNiche('tech')} />
                <NicheCard icon={<IndianRupee />} title="Organic Snacks" active={selectedNiche === 'food'} onClick={() => setSelectedNiche('food')} />
              </div>
            </div>
          )}
          {/* ... Steps 2-5 follow similar logic ... */}
          {currentStep === 5 && (
            <div className="text-center">
              <h2 className="text-4xl font-black mb-6">Start Your Journey with ReadyFlow</h2>
              <Link href="https://wa.me/918602555840" className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all">
                Get Your Store Setup <ArrowRight />
              </Link>
            </div>
          )}
        </div>

        {/* --- THE "PILLAR" CONTENT (This fixes Thin Content) --- */}
        <div className="space-y-20 text-gray-300 border-t border-white/10 pt-20">
          
          <article>
            <h2 className="text-4xl font-bold text-white mb-8">Detailed Roadmap: Selling Online in India</h2>
            <p className="text-lg leading-relaxed mb-6">
              When you search for **Shopify pe bechna kese shuru karein**, you often find generic advice. 
              But the Indian eCommerce landscape is unique because of **Cash on Delivery (COD)** and **RTO (Return to Origin)**.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                  <TrendingUp /> The Margin Trap
                </h3>
                <p>
                  Most beginners fail because they only look at ROAS (Return on Ad Spend). 
                  In India, if your gross margin isn't at least 3x of your product cost, you will lose money. 
                  Marketing costs (Facebook/Instagram Ads) usually take up 20-30% of your revenue.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                  <Truck /> The RTO Challenge
                </h3>
                <p>
                  RTO is the biggest profit killer. In India, COD orders have a 25-40% RTO rate if not managed. 
                  ReadyFlow specializes in **RTO reduction strategies** by integrating WhatsApp verification 
                  and address validation tools into your Shopify store.
                </p>
              </div>
            </div>
          </article>

          <section className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Why D2C Brand over Amazon/Flipkart?</h2>
            <div className="space-y-4">
              <p>1. **Data Ownership:** On your own site, you own the email and phone number of the customer.</p>
              <p>2. **No Commission:** Marketplaces take 15-35% commission on every sale. Shopify takes 0% commission (only a small monthly fee).</p>
              <p>3. **Brand Authority:** Customers remember your brand name, not just the product.</p>
            </div>
          </section>

          {/* --- FAQ SECTION (Semantic SEO) --- */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              <FaqItem 
                q="India mein online bechna shuru karne ke liye kya GST zaroori hai?" 
                a="Initially, agar aapka turnover 40 lakhs se kam hai, toh marketplaces par GST mandatory hai. Par Shopify (D2C) par aap bina GST ke test kar sakte hain (check local state laws). Par scaling ke liye GST mandatory ho jayega." 
              />
              <FaqItem 
                q="Ek Shopify store setup karne mein kitna kharcha aata hai?" 
                a="Shopify ka basic plan $25-30/mo se shuru hota hai. ReadyFlow ka professional setup plan ₹9,999 se shuru hota hai, jo aapko ek industry-standard conversion ready store deta hai." 
              />
              <FaqItem 
                q="RTO loss ko kaise control karein?" 
                a="RTO control karne ke liye automated WhatsApp confirmations aur advanced fraud detection apps use karein. Isse aapka net profit 15-20% tak badh sakta hai." 
              />
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// --- HELPERS ---

function NicheCard({ icon, title, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${active ? 'bg-orange-500/10 border-orange-500 text-white shadow-[0_10px_30px_rgba(249,115,22,0.2)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
    >
      <div className={`mb-4 ${active ? 'text-orange-500' : 'text-gray-600'}`}>{React.cloneElement(icon, { size: 32 })}</div>
      <h4 className="font-bold text-sm">{title}</h4>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
      <h4 className="text-lg font-bold text-orange-500 mb-3 flex items-center gap-2"><Info size={18}/> {q}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
    </div>
  );
}