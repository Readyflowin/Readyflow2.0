"use client";

import React from 'react';
import {
  Check, X, IndianRupee, Zap,
  ShieldCheck, BarChart3, MessageCircle,
  ArrowUpRight, Layers, MousePointerClick, TrendingUp,
  Info, HelpCircle, Server, Globe, Search
} from 'lucide-react';
import Link from 'next/link';

export default function ShopifyVsWooCommerce() {

  // --- SEO: FAQ SCHEMA (SEO Gold for Ranking) ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Shopify better than WooCommerce for Indian dropshipping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Shopify is generally better for Indian dropshipping due to its integrated RTO reduction tools, localized payment gateways like Razorpay, and zero maintenance servers which are crucial for scaling."
        }
      },
      {
        "@type": "Question",
        "name": "What is the total cost of starting a Shopify store in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A professional Shopify setup starts at ₹9,999 with ReadyFlow, plus a monthly subscription of approx ₹2,100 ($25). WooCommerce might look cheaper but hidden costs of hosting and security often exceed this."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 selection:bg-orange-500/30 font-sans">
      {/* --- SEO: JSON-LD Injection --- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-6 max-w-6xl relative">

        {/* --- HERO --- */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-[0.2em] uppercase mb-6">
            <Layers size={16} /> 2026 Platform Comparison
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            Shopify vs <span className="text-gray-600">WordPress.</span> <br />
            <span className="italic font-serif font-light text-gray-400">The ROI Reality.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-3xl">
             India mein <strong className="text-white font-bold">Shopify vs WooCommerce India</strong> ki bahas purani hai. Sasta hosting setup aksar long-term mein mehenga padta hai. Let's break down the math for Indian D2C brands.
          </p>
        </div>

        {/* --- COMPARISON BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <div className="md:col-span-7 bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 group">
            <div className="flex justify-between items-center mb-12">

              {/* 👇 LOGO & PILL SPACING FIXED 👇 */}
              <div className="bg-black p-3 rounded-2xl shadow-[0_0_40px_rgba(249,115,22,0.2)] border border-white/10">
                <img src="/logo.png" alt="ReadyFlow Logo" className="w-10 h-10 object-contain" />
              </div>

              <span className="text-orange-500 font-black text-[10px] border border-orange-500/30 px-6 py-2.5 rounded-full uppercase tracking-widest ml-6"> {/* Added ml-6 and more padding */}
                Recommended for Scale
              </span>

            </div>
            <h2 className="text-4xl font-bold mb-6 italic font-serif tracking-tight">Shopify: "Build, Not Maintain"</h2>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              Designed for merchants who value time. <strong className="text-white font-bold">Shopify India</strong> provides a closed ecosystem where security and performance are managed for you.
              Aapko server patches ya plugin conflicts ki tension nahi leni.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Point text="Native RTO Reduction Tools" type="pos" />
              <Point text="AWS Powered 99.99% Uptime" type="pos" />
              <Point text="PCI Level 1 Security" type="pos" />
              <Point text="One-Click Checkout (Shop Pay)" type="pos" />
            </div>
          </div>

          <div className="md:col-span-5 bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 flex flex-col">
            <div className="bg-white/10 w-fit p-4 rounded-2xl mb-12">
              <Server size={28} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-300 italic font-serif">WooCommerce</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Open source lagta sasta hai, par <strong className="text-gray-300 font-bold italic">hidden costs</strong> aapka budget kha jati hain. Professional scale ke liye ye "Technical Debt" ban jata hai.
            </p>
            <div className="space-y-6 mt-auto">
              <Point text="Manual Hosting Management" type="neg" />
              <Point text="Slow Checkout Experience" type="neg" />
              <Point text="Frequent Plugin Crashes" type="neg" />
            </div>
          </div>
        </div>

        {/* --- PILLAR SECTION: THE DEEP DIVE --- */}
        <div className="prose prose-invert max-w-none mb-32 border-t border-white/10 pt-24">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-16">
              <section>
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter">Why Indian D2C Brands are Migrating to Shopify</h2>
                <p className="text-gray-400 text-xl leading-relaxed">
                  In the last 2 years, we have seen a massive shift in the Indian market. Brands starting on WooCommerce often hit a "Glass Ceiling" once they cross 50 orders a day.
                  The reason isn't the platform, it's the **Maintenance Trap**. When you are running Meta Ads, a 2-second delay in page load can increase your <strong className="text-orange-500 font-bold italic">Customer Acquisition Cost (CAC)</strong> by 40%.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-2"><Globe size={20}/> Global Speed, Local Ease</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Shopify has localized its servers for India. Whether your customer is in <strong className="text-white font-bold">Indore</strong> or <strong className="text-white font-bold">Bangalore</strong>, the store setup by <strong className="text-white font-bold">ReadyFlow</strong> ensures sub-second loading.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-2"><ShieldCheck size={20}/> RTO & COD Security</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Unlike WooCommerce where you need 5 different plugins for WhatsApp verification, Shopify offers integrated solutions that work out of the box.
                  </p>
                </div>
              </div>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">The "Free" Myth of WordPress</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                   WordPress is free, but <strong className="text-white font-bold uppercase tracking-widest">Business isn't.</strong> To match Shopify's standard performance on WordPress, you will need:
                </p>
                <ul className="space-y-4 text-gray-500 list-disc pl-6">
                  <li>Premium Managed Hosting (₹1,500/mo)</li>
                  <li>Security & Firewall (₹800/mo)</li>
                  <li>Speed Optimization Plugins (₹500/mo)</li>
                  <li><strong className="text-orange-500">Total: ₹2,800/mo</strong> — which is already more than Shopify's basic plan.</li>
                </ul>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="bg-orange-500 p-8 rounded-[2.5rem] sticky top-32 text-black">
                <h4 className="text-2xl font-black mb-4">Start Right.</h4>
                <p className="text-sm font-bold mb-8 leading-tight">Don't waste 6 months fixing bugs on WordPress. Launch on Shopify in 5 days.</p>
                <Link href="https://wa.me/918602555840" className="w-full py-4 bg-black text-white font-black rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                  Setup My Store <ArrowUpRight size={16}/>
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* --- COST TABLE (MOBILE FIXED) --- */}
        <div className="mb-32">
           <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden">
            {/* Header hidden on mobile */}
            <div className="hidden md:grid grid-cols-3 p-10 border-b border-white/10 bg-white/[0.02] text-xs font-black tracking-[0.3em] uppercase text-gray-500">
              <div>Expense</div>
              <div className="text-orange-500">Shopify (D2C)</div>
              <div>WooCommerce</div>
            </div>
            <Row label="Server Uptime" val1="99.9% (Included)" val2="Depends on Host" />
            <Row label="Checkout Speed" val1="Optimized" val2="Plugin Dependent" />
            <Row label="App Ecosystem" val1="Professional" val2="Fragmented" />
            <Row label="Maintenance" val1="₹0" val2="₹2,000+/mo" last />
          </div>
        </div>

        {/* --- FINAL CTA --- */}
        <div className="bg-white text-black rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
          <h3 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85]">
            Stop playing dev. <br /> Start being CEO.
          </h3>
          <p className="text-gray-500 font-bold mb-16 uppercase text-xs tracking-[0.5em]">Scalability is a choice. Choose ReadyFlow.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="https://wa.me/918602555840" className="px-12 py-6 bg-orange-500 text-black font-black rounded-2xl text-xl hover:scale-105 transition-all">
               Launch Store (₹9,999)
            </Link>
            <Link href="/tools/profit-calculator" className="px-12 py-6 bg-black text-white font-black rounded-2xl text-xl hover:bg-gray-900 transition-all flex items-center gap-2">
              <BarChart3 size={20}/> Check Margins
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- HELPERS ---

function Point({ text, type }: { text: string, type: 'pos' | 'neg' }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${type === 'pos' ? 'bg-orange-500/20' : 'bg-red-500/20'}`}>
        {type === 'pos' ? <Check size={12} className="text-orange-500" /> : <X size={12} className="text-red-500" />}
      </div>
      <span className="text-sm font-bold text-gray-300">{text}</span>
    </div>
  );
}

// --- ROW COMPONENT (MOBILE RESPONSIVE) ---
function Row({ label, val1, val2, last = false }: any) {
  return (
    // Grid changes from 1 column (mobile) to 3 columns (desktop)
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 p-8 md:p-10 ${!last ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>

      {/* Label */}
      <div className="font-bold text-gray-500 text-xs md:text-sm uppercase tracking-widest flex items-center">
        <span className="md:hidden mr-2 text-gray-600">Expense:</span> {label}
      </div>

      {/* Shopify Value */}
      <div className="flex flex-col md:block">
        <span className="md:hidden text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Shopify (D2C)</span>
        <div className="font-black text-white text-base">{val1}</div>
      </div>

      {/* WooCommerce Value */}
      <div className="flex flex-col md:block">
        <span className="md:hidden text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WooCommerce</span>
        <div className="font-medium text-gray-600 text-sm italic">{val2}</div>
      </div>
    </div>
  );
}