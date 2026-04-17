"use client";
import React, { useState } from 'react';
import { 
  Bot, Zap, CheckCircle, ArrowRight, MessageSquare, 
  TrendingUp, ShieldCheck, Clock, X, Calendar as CalendarIcon 
} from 'lucide-react';

export default function AISalesBotPage() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SEO SCHEMAS ---
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Shopify AI Sales Chatbot Setup",
    "provider": { "@type": "LocalBusiness", "name": "ReadyFlow" },
    "areaServed": "India",
    "description": "Custom AI Chatbot training and setup for Shopify stores to automate sales and customer support.",
    "offers": { "@type": "Offer", "price": "4999", "priceCurrency": "INR" }
  };

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I'm interested in the AI Sales Bot Setup (₹9,999).\n\nDate: ${dateStr}\nSlot: ${selectedTime}\nPlease confirm the slot if available`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Stop Handling Chats. <br/>
            <span className="text-orange-500">Start Closing Sales.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Static scripts se dhanda nahi badhta. Hum aapke Shopify store ke liye ek custom trained <strong className="text-white">AI Sales Agent</strong> banate hain jo customers ke doubts clear karke 24/7 orders close karta hai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsSchedulerOpen(true)}
              className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              Book Setup Call <ArrowRight size={20}/>
            </button>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <ShieldCheck size={16} className="text-green-500" /> Trusted by 50+ Indian D2C Brands
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<TrendingUp className="text-orange-500" />}
                title="AI Sales Pitch"
                desc="Bot sirf reply nahi deta, ye customer ko sahi product suggest karke checkout link bhejta hai."
            />
            <FeatureCard 
                icon={<Clock className="text-orange-500" />}
                title="Zero Delay"
                desc="Customer ke sawalon ka jawab 2 seconds mein. No more losing sales due to late manual replies."
            />
            <FeatureCard 
                icon={<Bot className="text-orange-500" />}
                title="Product Knowledge"
                desc="Hum bot ko aapke products aur return policies par train karte hain—Expert level knowledge."
            />
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black mb-6 italic text-orange-500">Early Bird Offer</h2>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-6xl font-black italic">₹9,999</span>
                            <span className="text-gray-500 line-through">₹9,999</span>
                        </div>
                        <p className="text-gray-400 mb-8">One-time expert setup. No monthly fees. Limited to first 10 stores this month.</p>
                        
                        <ul className="space-y-4 mb-10">
                            <CheckListItem text="Custom Knowledge Base Training" />
                            <CheckListItem text="Shopify Theme Script Injection" />
                            <CheckListItem text="OpenAI API Integration" />
                            <CheckListItem text="WhatsApp Business API Support" />
                            <CheckListItem text="15 Days Free Maintenance" />
                        </ul>

                        <button 
                            onClick={() => setIsSchedulerOpen(true)}
                            className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl"
                        >
                            SECURE MY SLOT NOW
                        </button>
                    </div>
                    <div className="hidden lg:block relative">
                        <div className="aspect-square bg-orange-500/20 rounded-full blur-[100px] absolute inset-0 animate-pulse"></div>
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative z-10">
                            <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Setup Includes:</p>
                            <div className="space-y-4 text-xs leading-relaxed text-gray-500">
                                <p>• System deployment on Vercel/Netlify</p>
                                <p>• PDF/Website URL data scraping for AI training</p>
                                <p>• Custom brand voice personality setup</p>
                                <p>• Real-time testing on 50+ test queries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-orange-500 mb-4" size={32} />
                    <h3 className="text-2xl font-black mb-6">Select Date</h3>
                    <div className="bg-white/5 rounded-2xl p-4">
                        <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-black mb-6">Pick a Slot</h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                        {["10 AM - 12 PM", "02 PM - 04 PM", "06 PM - 08 PM"].map(slot => (
                            <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-4 rounded-xl text-sm font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black' : 'bg-white/5 border-white/10 text-gray-400'}`}>{slot}</button>
                        ))}
                    </div>
                    <button onClick={handleScheduleSubmit} className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl">CONFIRM BOOKING</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---
function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-orange-500/30 transition-all group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{icon}</div>
            <h4 className="text-xl font-bold mb-4">{title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function CheckListItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-400">
            <CheckCircle size={18} className="text-green-500 shrink-0" /> {text}
        </li>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
        const d = new Date(today); d.setDate(today.getDate() + i); days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}