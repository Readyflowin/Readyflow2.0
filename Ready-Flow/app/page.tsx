"use client";

import React from 'react';
import Head from 'next/head'; // <--- IMPORT ADDED
import HeroSection from '../components/HeroSection';
import ToolsSection from '../components/ToolsSection';
import Testimonials from '../components/Testimonials';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  BookOpen, 
  Globe, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      
      {/* --- SEO & FAVICON HEAD (ADDED) --- */}
      <Head>
        <title>ReadyFlow | Shopify Tools for India</title>
        <meta name="description" content="Free Shopify tools for Indian Dropshipping: RTO Shield, Profit Calculator, and Policy Generator." />
        <link rel="icon" href="/favicon.ico" /> {/* <--- THIS IS THE KEY LINE */}
      </Head>

      {/* 1. Hero Section (Introduction) */}
      <HeroSection />

      {/* 2. AUTHORITY SECTION: GUIDES & SERVICES */}
      <section className="py-24 md:py-32 bg-[#050505] relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Strategy that scales <br />
                <span className="text-gray-500 underline decoration-orange-500/30">Indian Brands.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Website setup se lekar RTO reduction tak—hum wahi gap fill karte hain jo standard agencies miss kar deti hain.
              </p>
            </div>
            <Link href="/portfolio" className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
              VIEW PORTFOLIO <ChevronRight size={18}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guide Card: RTO */}
            <Link href="/guides/rto-reduction-strategy-india" className="group p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:border-orange-500/50 transition-all relative overflow-hidden">
              <ShieldCheck className="text-orange-500 mb-8" size={40} />
              <h3 className="text-2xl font-bold mb-4 text-white leading-tight">RTO Reduction <br/>Blueprint</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">India ke COD market mein loss kaise bachayein? Read our verified blueprint.</p>
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">Explore Guide <ArrowUpRight size={14}/></span>
            </Link>

            {/* Guide Card: Comparison */}
            <Link href="/guides/shopify-vs-woocommerce-india-cost" className="group p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:border-blue-500/50 transition-all relative overflow-hidden">
              <BookOpen className="text-blue-500 mb-8" size={40} />
              <h3 className="text-2xl font-bold mb-4 text-white leading-tight">Shopify vs <br/>WordPress</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">Detailed cost comparison for Indian sellers. Sasta aur tikau kaunsa hai?</p>
              <span className="text-blue-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">Explore Comparison <ArrowUpRight size={14}/></span>
            </Link>

            {/* CTA Card: Near Me */}
            <Link href="/locations/shopify-developer-near-me" className="group p-10 bg-orange-600 rounded-[2.5rem] hover:scale-[1.02] transition-all relative shadow-2xl shadow-orange-600/20">
              <Globe className="text-black mb-8" size={40} />
              <h3 className="text-3xl font-black text-black mb-4">Find an Expert <br/> Near You</h3>
              <p className="text-black/70 text-sm font-bold mb-8">Custom setup for 10+ cities. Remote & Local support available.</p>
              <div className="bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2">
                Launch My Store <ArrowUpRight size={14}/>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 3. Tools Grid (The Product) */}
      <ToolsSection />

      {/* 4. SEO MARQUEE: LOCAL TRUST */}
      <div className="py-16 md:py-24 bg-black overflow-hidden border-y border-white/5 select-none relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {['Indore', 'Mumbai', 'Bhopal', 'Surat', 'Jaipur', 'Bangalore', 'Ahmedabad', 'Delhi', 'Hyderabad', 'Kolkata'].map((city) => (
            <Link key={city} href={`/locations/${city.toLowerCase()}`} className="text-gray-800 hover:text-orange-500 mx-12 text-2xl font-black uppercase tracking-tighter transition-colors flex items-center gap-2 group">
              Shopify {city} <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
            </Link>
          ))}
          {/* Loop repeat for seamless scrolling */}
          {['Indore', 'Mumbai', 'Bhopal', 'Surat', 'Jaipur', 'Bangalore', 'Ahmedabad', 'Delhi', 'Hyderabad', 'Kolkata'].map((city) => (
            <Link key={`${city}-repeat`} href={`/locations/${city.toLowerCase()}`} className="text-gray-800 hover:text-orange-500 mx-12 text-2xl font-black uppercase tracking-tighter transition-colors">
              Shopify {city}
            </Link>
          ))}
        </div>
      </div>
      
      {/* 5. Reviews (Social Proof) */}
      <div className="pt-10">
        <Testimonials />
      </div>

      {/* --- MARQUEE CSS ANIMATION --- */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      
    </main>
  );
}