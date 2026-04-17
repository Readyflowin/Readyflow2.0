"use client";

import React, { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle, Zap, ExternalLink, 
  HelpCircle, MessageCircle, Youtube, Star,
  Briefcase, X, Calendar as CalendarIcon, IndianRupee, UserCheck, ArrowRight, Clock, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cities, portfolioItems, defaultLocation } from '@/lib/cityData'; 

export default function NearMePage() {
  const [cityData, setCityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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

  const timeSlots = ["10 AM - 12 PM", "12 PM - 02 PM", "02 PM - 04 PM", "04 PM - 06 PM", "06 PM - 08 PM"];

  // --- LOGIC: CITY DETECTION ---
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Using ipapi.co (HTTPS friendly)
        const res = await fetch('https://ipapi.co/json/');
        const json = await res.json();
        const detectedCity = json.city?.toLowerCase();
        
        if (detectedCity && cities[detectedCity as keyof typeof cities]) {
          setCityData(cities[detectedCity as keyof typeof cities]);
        } else {
          setCityData({ ...defaultLocation, name: json.city || "India" });
        }
      } catch (error) {
        setCityData(defaultLocation);
      } finally {
        setTimeout(() => setLoading(false), 1500); // 1.5s delay for 'Expert Scanning' feel
      }
    };
    fetchLocation();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="text-orange-500 animate-spin mb-4" size={60} strokeWidth={1} />
        <MapPin className="absolute top-5 left-5 text-orange-500 animate-pulse" size={20} />
      </div>
      <p className="text-gray-400 font-bold tracking-widest text-xs uppercase animate-pulse">Detecting local expertise near you...</p>
    </div>
  );

  const handleFinalSubmit = () => {
    if (!leadData.date || !leadData.time) return;
    const dateStr = leadData.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const message = `Hi ReadyFlow! I'm searching for Shopify help near ${cityData.name}.

*1. Profile:* ${leadData.persona}
*2. Requirement:* ${leadData.service}
*3. Budget:* ${leadData.budget}
*4. Scheduled Call:* ${dateStr} during ${leadData.time}

Please confirm availability at this time}.`;

    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(message)}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="mb-12 bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl inline-block">
            <p className="text-orange-500 font-bold text-sm flex items-center gap-2">
                <MapPin size={16} fill="currentColor"/> Verified Results for {cityData.name}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                    Shopify Developer <br/> <span className="text-orange-500">Near {cityData.name}</span>
                </h1>
                <p className="text-gray-400 text-xl mb-12 leading-relaxed">{cityData.description}</p>

                <div className="mb-16 bg-white/5 p-8 rounded-3xl border-l-4 border-orange-500 relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2"><Zap size={20} fill="orange" /> {cityData.hinglishHook}</h3>
                    <p className="text-gray-400 leading-relaxed italic">"{cityData.localProblem}"</p>
                </div>

                <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureItem text="Hyper-Local Logistics Sync" />
                    <FeatureItem text="RTO Safety for Local PINs" />
                    <FeatureItem text="Regional Language Support" />
                    <FeatureItem text="3-5 Days Live Guarantee" />
                </div>

                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Briefcase className="text-blue-500" /> Trust Verified Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {portfolioItems.slice(0, 4).map((item) => (
                        <div key={item.name} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-blue-500/30 transition-all">
                            <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded mb-2 block w-fit">{item.tag}</span>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="sticky top-24 bg-white text-black p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="flex items-center gap-1 mb-3">
                        {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="black" />)}
                    </div>
                    <h4 className="font-bold text-2xl mb-1 leading-tight text-black">Top Rated in {cityData.name}</h4>
                    <p className="text-xs text-gray-500 mb-8 font-medium italic">"Aditya helped us scale our local business to 50+ orders daily."</p>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl active:scale-95 uppercase tracking-wider">
                        Get Local Quote <ArrowRight size={18}/>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- LEAD FILTER MODAL --- */}
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
                    </div>
                )}
                {step === 4 && (
                    <div className="animate-in slide-in-from-right duration-300 text-white">
                        <CalendarIcon className="text-purple-500 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-6">Choose a Date</h3>
                        <div className="bg-white/5 rounded-2xl p-4">
                            <SimpleCalendar selected={leadData.date} onSelect={(d) => {setLeadData({...leadData, date: d}); setStep(5);}} />
                        </div>
                    </div>
                )}
                {step === 5 && (
                    <div className="animate-in slide-in-from-right duration-300 text-center">
                        <Clock className="text-pink-500 mb-4 mx-auto" size={40} />
                        <h3 className="text-2xl font-bold mb-6 text-white">Select a Time Slot</h3>
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
                            CONNECT IN {cityData.name.toUpperCase()}
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </main>
  );
}

// --- HELPERS ---
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={16} className="text-green-500" /></div>
        <span className="text-gray-300 font-bold text-sm">{text}</span>
    </div>
  );
}

function OptionBtn({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active: boolean }) {
    return (
        <button onClick={onClick} className={`w-full p-4 rounded-xl text-left border transition-all ${active ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
            <span className="text-sm font-medium">{children}</span>
        </button>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
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