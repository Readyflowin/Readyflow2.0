"use client";

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { 
  MapPin, CheckCircle, Zap, ExternalLink, 
  HelpCircle, MessageCircle, Youtube, Star,
  Briefcase, ChevronRight, X, Calendar as CalendarIcon, 
  IndianRupee, UserCheck, ArrowRight, Clock,
  // New Icons for Tools
  Shield, Bot, FileText, Calculator, MousePointer2, Wrench
} from 'lucide-react';
import Link from 'next/link';
import { cities, portfolioItems } from '@/lib/cityData'; 

export default function CityPage({ params }: { params: Promise<{ city: string }> }) {
  // --- LOGIC: NEXT.JS 15+ PARAMS ---
  const resolvedParams = use(params);
  
  const cityKey = decodeURIComponent(resolvedParams.city).toLowerCase();
  const data = cities[cityKey as keyof typeof cities] as any;

  // --- STATE: LEAD FILTER MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState({
    persona: '',
    service: '',
    budget: '',
    date: null as Date | null,
    time: ''
  });

  if (!data) return notFound();

  // --- FREE TOOLS DATA ---
  const freeTools = [
    { name: "RTO Shield", url: "/tools/rto-shield", icon: <Shield size={16} className="text-green-500"/>, desc: "Stop fake orders" },
    { name: "Smart Chatbot", url: "/tools/smart-chatbot", icon: <Bot size={16} className="text-blue-500"/>, desc: "Automate support" },
    { name: "Policy Generator", url: "/tools/policy-generator", icon: <FileText size={16} className="text-yellow-500"/>, desc: "Legal pages" },
    { name: "Popup Builder", url: "/tools/popup-builder", icon: <MousePointer2 size={16} className="text-purple-500"/>, desc: "Capture leads" },
    { name: "Profit Calc", url: "/tools/profit-calculator", icon: <Calculator size={16} className="text-orange-500"/>, desc: "Calculate margins" },
  ];

  // --- SEO: SCHEMA MARKUP ---
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `ReadyFlow Shopify Services ${data.name}`,
    "description": data.description,
    "url": `https://readyflow.in/locations/${cityKey}`,
    "telephone": "+918602555840",
    "areaServed": {
      "@type": "City",
      "name": data.name
    },
    "priceRange": "INR 4999 - 50000"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs?.map((f: any) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    })) || []
  };

  const timeSlots = ["10 AM - 12 PM", "12 PM - 02 PM", "02 PM - 04 PM", "04 PM - 06 PM", "06 PM - 08 PM"];

  const handleFinalSubmit = () => {
    if (!leadData.date || !leadData.time) return;
    const dateStr = leadData.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const message = `Hi ReadyFlow! I'm looking for Shopify help in ${data.name}.

*1. Profile:* ${leadData.persona}
*2. Requirement:* ${leadData.service}
*3. Budget:* ${leadData.budget}
*4. Scheduled Call:* ${dateStr} during ${leadData.time}

Please confirm if this slot is available.`;

    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(message)}`, '_blank');
    setIsModalOpen(false);
    setStep(1);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 overflow-x-hidden relative">
      {/* SEO Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- SECTION: TOP HINGLISH HOOK --- */}
        <div className="mb-12 bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl inline-block">
            <p className="text-orange-500 font-bold text-sm md:text-base flex items-center gap-2">
                <Zap size={16} fill="currentColor"/> {data.name} me apni dukaan ko online kaise le jayein?
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: SEO CONTENT */}
            <div className="lg:col-span-8">
                <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                    {data.name} me Shopify Store Setup
                </h1>
                
                <p className="text-gray-400 text-xl mb-12 leading-relaxed">
                    {data.description} <br/><br/>
                    <span className="text-white font-medium italic italic">Looking for a local expert?</span> Hum unke business ki local logistics aur customer psychology ko samajhte hain.
                </p>

                {/* SPECIALIZATION */}
                <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureItem text="Razorpay Approved Policies" />
                    <FeatureItem text="Hinglish Support Bot" />
                    <FeatureItem text="3-5 Days Launch" />
                    <FeatureItem text="RTO Safety Systems" />
                </div>

                {/* SUCCESS STORIES */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                        <Briefcase className="text-blue-500" /> Success Stories ({data.name})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portfolioItems.slice(0, 6).map((item) => (
                            <a key={item.name} href={item.url} target="_blank" className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded mb-2 block w-fit">{item.tag}</span>
                                        <h4 className="font-bold text-lg">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                    </div>
                                    <ExternalLink size={16} className="text-gray-600 group-hover:text-blue-400" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* FAQS */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                        <HelpCircle className="text-green-500" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {data.faqs?.map((faq: any, idx: number) => (
                            <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                                <h4 className="font-bold text-white mb-2">Q: {faq.q}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">A: {faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: STICKY SIDEBAR */}
            <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                    
                    {/* 1. YOUTUBE VIDEO CARD */}
                    <div className="bg-[#0a0a0a] border border-red-500/30 rounded-[2rem] p-6 mb-6 shadow-2xl">
                        <div className="flex items-center gap-2 text-red-500 mb-4 font-bold uppercase text-[10px]">
                            <Youtube size={16} /> Technical Expert Advice
                        </div>
                        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                            <iframe className="w-full h-full opacity-90" src={`https://www.youtube.com/embed/${data.youtubeId}`} allowFullScreen></iframe>
                        </div>
                    </div>

                    {/* 2. SCALE YOUR BRAND (MAIN CTA) */}
                    <div className="bg-white text-black p-8 rounded-[2.5rem] shadow-2xl mb-6">
                        <div className="flex items-center gap-1 mb-3">
                            {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="black" />)}
                        </div>
                        <h4 className="font-bold text-2xl mb-1 tracking-tight">Scale your Brand</h4>
                        <p className="text-xs text-gray-500 mb-8 font-medium">ReadyFlow professional setup in {data.name}.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                            GET A CUSTOM QUOTE <ArrowRight size={18}/>
                        </button>
                    </div>

                    {/* 3. FREE TOOLS WIDGET (NEW ADDITION) */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6">
                         <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Wrench size={14} className="text-purple-500"/> Free Shopify Tools
                         </h4>
                         <div className="grid grid-cols-1 gap-3">
                            {freeTools.map((tool) => (
                                <Link href={tool.url} key={tool.name} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-white group-hover:text-purple-400 transition-colors">{tool.name}</p>
                                        <p className="text-[10px] text-gray-500">{tool.desc}</p>
                                    </div>
                                    <ChevronRight size={14} className="ml-auto text-gray-600 group-hover:text-white" />
                                </Link>
                            ))}
                         </div>
                    </div>

                </div>
            </div>
        </div>

        {/* COVERAGE FOOTER */}
        <div className="mt-32 text-center border-t border-white/5 pt-16">
            <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Serviceable across {data.name} Landmarks</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {data.landmarks?.split(', ').map((loc: string) => (
                    <span key={loc} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-500">
                        {loc}
                    </span>
                ))}
            </div>
        </div>

      </div>

      {/* --- LEAD QUALIFICATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-[#111] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
                <button onClick={() => {setIsModalOpen(false); setStep(1);}} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X /></button>
                <div className="w-full h-1 bg-white/5 mb-8 rounded-full">
                    <div className="h-full bg-orange-500 transition-all duration-500" style={{width: `${(step/5)*100}%`}}></div>
                </div>

                {step === 1 && (
                    <div className="animate-in slide-in-from-right duration-300 text-white">
                        <UserCheck className="text-orange-500 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-6">Aapka business kis category mein aata hai?</h3>
                        <div className="space-y-3">
                            <OptionBtn active={leadData.persona === 'Existing Offline'} onClick={() => {setLeadData({...leadData, persona: 'Existing Offline'}); setStep(2);}}>I have an offline shop/factory</OptionBtn>
                            <OptionBtn active={leadData.persona === 'New D2C'} onClick={() => {setLeadData({...leadData, persona: 'New D2C'}); setStep(2);}}>Starting a new D2C brand</OptionBtn>
                            <OptionBtn active={leadData.persona === 'Exploring'} onClick={() => {setLeadData({...leadData, persona: 'Exploring'}); setStep(2);}}>Just exploring for now</OptionBtn>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in slide-in-from-right duration-300 text-white">
                        <Zap className="text-blue-500 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-6">What do you need help with?</h3>
                        <div className="space-y-3">
                            <OptionBtn active={leadData.service === 'Setup'} onClick={() => {setLeadData({...leadData, service: 'Full Shopify Setup'}); setStep(3);}}>Full Store Setup (₹9,999+)</OptionBtn>
                            <OptionBtn active={leadData.service === 'Audit'} onClick={() => {setLeadData({...leadData, service: 'RTO Audit'}); setStep(3);}}>RTO Reduction & Audit</OptionBtn>
                            <OptionBtn active={leadData.service === 'Custom'} onClick={() => {setLeadData({...leadData, service: 'Custom Dev'}); setStep(3);}}>Custom Feature Development</OptionBtn>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in slide-in-from-right duration-300 text-white">
                        <IndianRupee className="text-green-500 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">Your estimated budget?</h3>
                        <p className="text-gray-500 text-[10px] mb-6 tracking-tight uppercase font-bold">Basic Theme stores start from ₹9,999.</p>
                        <div className="grid grid-cols-1 gap-3">
                            <OptionBtn active={leadData.budget === '5k-15k'} onClick={() => {setLeadData({...leadData, budget: '₹5,000 - ₹15,000'}); setStep(4);}}>₹5,000 - ₹15,000</OptionBtn>
                            <OptionBtn active={leadData.budget === '15k-50k'} onClick={() => {setLeadData({...leadData, budget: '₹15,000 - ₹50,000'}); setStep(4);}}>₹15,000 - ₹50,000</OptionBtn>
                            <OptionBtn active={leadData.budget === '50k+'} onClick={() => {setLeadData({...leadData, budget: '₹50,000+'}); setStep(4);}}>₹50,000 + (Enterprise)</OptionBtn>
                        </div>
                        <button onClick={() => setStep(2)} className="mt-4 text-xs text-gray-500 underline">Back</button>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in slide-in-from-right duration-300 text-white">
                        <CalendarIcon className="text-purple-500 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-6">Choose a Date</h3>
                        <div className="bg-white/5 rounded-2xl p-4">
                            <SimpleCalendar selected={leadData.date} onSelect={(d) => {setLeadData({...leadData, date: d}); setStep(5);}} />
                        </div>
                        <button onClick={() => setStep(3)} className="mt-4 text-xs text-gray-500 underline">Back</button>
                    </div>
                )}

                {step === 5 && (
                    <div className="animate-in slide-in-from-right duration-300 text-center text-white">
                        <Clock className="text-pink-500 mb-4 mx-auto" size={40} />
                        <h3 className="text-2xl font-bold mb-6">Select a Time Slot</h3>
                        <div className="grid grid-cols-1 gap-2 mb-8">
                            {timeSlots.map(slot => (
                                <button 
                                    key={slot}
                                    onClick={() => setLeadData({...leadData, time: slot})}
                                    className={`p-4 rounded-xl text-sm font-bold border transition-all ${leadData.time === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <button 
                            disabled={!leadData.time}
                            onClick={handleFinalSubmit} 
                            className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-500 transition-all disabled:opacity-50"
                        >
                            FINISH & SEND TO WHATSAPP
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* --- MOBILE STICKY BANNER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white text-black p-4 z-[40] lg:hidden flex items-center justify-between border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div>
            <p className="font-bold text-sm">Shopify in {data.name}</p>
            <p className="text-[10px] text-gray-500 font-medium tracking-tight uppercase">Basic Theme setup from ₹9,999</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-transform">Get Quote</button>
      </div>

    </main>
  );
}

// --- HELPER COMPONENTS ---

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle size={16} className="text-green-500" />
        </div>
        <span className="text-gray-300 font-bold text-sm">{text}</span>
    </div>
  );
}

function OptionBtn({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active: boolean }) {
    return (
        <button onClick={onClick} className={`w-full p-4 rounded-xl text-left border transition-all ${active ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
            <span className="text-sm font-bold">{children}</span>
        </button>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[8px] uppercase font-bold">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-sm font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}