"use client";

import React, { useState } from 'react';
import { 
  ExternalLink, Layers, ArrowUpRight, 
  Smartphone, Monitor, Globe, Code2, Sparkles 
} from 'lucide-react';
import { portfolioItems } from '@/lib/cityData';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const platforms = ['All', 'Shopify', 'WordPress', 'Custom'];

  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.platform === filter);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-40 font-sans selection:bg-orange-500/30">
      
      {/* --- HEADER --- */}
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-[0.3em] uppercase mb-8">
            <Sparkles size={16} /> Selected Works
          </div>
          <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-12">
            Brands we <br /> <span className="italic font-serif text-gray-500 underline decoration-orange-500/30">build to scale.</span>
          </h1>
          
          {/* Platform Filters */}
          <div className="flex flex-wrap gap-4 mt-12">
            {platforms.map((p) => (
              <button 
                key={p}
                onClick={() => setFilter(p)}
                className={`px-8 py-3 rounded-full text-xs font-bold transition-all border ${filter === p ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PORTFOLIO GRID --- */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredItems.map((item, idx) => (
            <div key={item.name} className="group relative">
              <div className="aspect-[16/10] bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden relative mb-8 group-hover:border-orange-500/50 transition-all duration-500">
                {/* Mockup Placeholder - In future you can replace with real screenshots */}
                <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-8xl md:text-9xl select-none uppercase tracking-tighter">
                  {item.name}
                </div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-110 transition-transform shadow-2xl"
                  >
                    View Live Site <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-end px-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded">
                      {item.platform}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">{item.name}</h3>
                  <p className="text-gray-500 max-w-sm text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="hidden md:flex gap-2">
                   {item.platform === 'Shopify' ? <Smartphone size={16} className="text-gray-700"/> : <Monitor size={16} className="text-gray-700"/>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="container mx-auto px-6 mt-40">
        <div className="bg-orange-500 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-black mb-8 leading-tight tracking-tighter">
              Your vision, <br /> our code.
            </h2>
            <p className="text-black/60 font-bold mb-12 max-w-xl mx-auto uppercase text-xs tracking-[0.2em]">
              Currently taking projects for Jan 2026.
            </p>
            <a 
              href="https://wa.me/918602555840?text=I saw your portfolio, want to discuss a project" 
              className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl"
            >
              Start Your Project <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}