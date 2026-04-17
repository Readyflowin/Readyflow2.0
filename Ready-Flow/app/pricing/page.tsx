"use client";

import React, { useState } from 'react';
import Script from "next/script";
import { useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase"; 
import { 
  Check, 
  Zap, 
  Hammer, 
  Code2, 
  ArrowRight, 
  Network, 
  Database,
  ChevronDown,
  Calendar as CalendarIcon,
  Clock,
  X,
  ChevronRight,
  Lock,   // Added
  LogIn   // Added
} from 'lucide-react';

// --- CONFIG ---
const WHATSAPP_NUMBER = "918602555840"; 

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  
  // Scheduler State
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1); 
  const [meetingReason, setMeetingReason] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- NEW: Login Modal State ---
  const [showLoginModal, setShowLoginModal] = useState(false);

  const yearlyDiscount = 0.3; 
  const monthlyPrice = 29;
  const yearlyPrice = Math.round(monthlyPrice * 12 * (1 - yearlyDiscount));

  // --- 1. PAYMENT SUCCESS HANDLER ---
  const handlePaymentSuccess = async (response: any, orderId: string) => {
    try {
        if (!auth.currentUser) return;

        const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderCreationId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                userId: auth.currentUser.uid, 
            }),
        });

        const data = await verifyRes.json();

        if (data.isPro) {
            alert("Payment Successful! Welcome to Premium.");
            router.push("/dashboard"); 
        } else {
            alert("Payment verification failed. Please contact support.");
        }
    } catch (error) {
        console.error("Verification Error:", error);
        alert("Error verifying payment. Please check your dashboard or contact support.");
    }
  };

  // --- 2. TRIGGER PAYMENT ---
  const handleRazorpay = async () => {
    // A. Check Auth - UPDATED LOGIC
    if (!auth.currentUser) {
        setShowLoginModal(true); // Show the custom modal instead of alert
        return;
    }

    try {
        // B. Create Order on Server
        const res = await fetch("/api/razorpay/order", { method: "POST" });
        const order = await res.json();

        if (!order.id) {
            console.error("Order creation failed:", order);
            alert("System Error: Could not initiate payment.");
            return;
        }

        // C. Open Razorpay Popup
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
            amount: order.amount,
            currency: "INR",
            name: "ReadyFlow",
            description: "Premium Toolkit Access",
            order_id: order.id, 
            handler: function (response: any) {
                handlePaymentSuccess(response, order.id);
            },
            prefill: {
                name: auth.currentUser.displayName || "",
                email: auth.currentUser.email || "",
                contact: "", 
            },
            theme: { color: "#ea580c" }, 
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();

    } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong initializing payment.");
    }
  };

  // --- OTHER HANDLERS ---
  const handleStoreSetupWhatsApp = () => {
    const msg = "Hello, I am interested in the ₹9,999 Store Setup plan. I want to build a professional Shopify store and would like to proceed.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime || !meetingReason) return;
    
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hello, I'd like to schedule a meeting on *${dateStr}* at *${selectedTime}*.\n\n*Agenda:* ${meetingReason}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsSchedulerOpen(false); 
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden font-sans">
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            One Price for Tools. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              One Fee for Service.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you want to DIY with our scripts or hire us to build your entire store, we have a simple plan for you.
          </p>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          
          {/* CARD 1: THE TOOLKIT */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
            
            <div className="relative bg-[#0a0a0a] border-2 border-orange-500/30 rounded-3xl p-8 h-full flex flex-col hover:border-orange-500 transition-colors duration-300">
              <div className="absolute -top-4 left-8 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Self-Serve
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Toolkit</h3>
                  <p className="text-gray-400 text-sm">Instant access to all our conversion scripts.</p>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              {/* Price Toggle Area */}
              <div className="mb-8">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black text-white">
                    ₹{billingCycle === 'monthly' ? monthlyPrice : yearlyPrice}
                  </span>
                  <span className="text-gray-500 font-medium mb-2">
                    / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-4 text-xs font-medium">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 rounded-full transition-colors ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-3 py-1 rounded-full transition-colors relative ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-6 text-[9px] bg-green-500 text-white px-1.5 rounded">SAVE 30%</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">What You Get Instant Access To:</p>
                <ListItem text="Pop-up Builder (Spin Wheel, Exit Intent)" />
                <ListItem text="Policy Generator (Razorpay Approved)" />
                <ListItem text="ROI & Profit Calculator" />
                <ListItem text="Smart Chatbot Script" />
                <ListItem text="1 New Tool Added Every Month" highlight />
              </div>

              <button 
                onClick={handleRazorpay}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Get Instant Access <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* CARD 2: STORE SETUP */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-30"></div>
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:border-white/30 transition-colors duration-300">
              <div className="absolute -top-4 left-8 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Done-For-You
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Store Setup</h3>
                  <p className="text-gray-400 text-sm">We build your store while you focus on product.</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-xl">
                  <Hammer className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black text-white">₹9,999</span>
                  <span className="text-gray-500 font-medium mb-2">one-time</span>
                </div>
                <p className="text-xs text-blue-400 mt-2">Delivery in 5-7 Days • Hand-Coded Setup upto 3 secotions</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">We Will Configure:</p>
                <ListItem text="Complete Shopify Theme Installation" />
                <ListItem text="Payment Gateway & Shipping Setup" />
                <ListItem text="Legal Pages & Policies" />
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm font-bold text-white flex items-center gap-2 mb-2"><Code2 size={14} className="text-orange-500"/> Custom Coding Included for upto 3 sections:</span>
                  <ul className="text-xs text-gray-400 space-y-1 pl-6 list-disc">
                    <li>Custom Header/Footer Design</li>
                    <li>Sticky 'Add to Cart' Button</li>
                    <li>Trust Badges on Product Page</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={handleStoreSetupWhatsApp}
                className="w-full py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Book My Setup Slot <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* --- CUSTOM DEVELOPMENT SHOWCASE --- */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-20 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Custom Engineering?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              For brands that need logic beyond standard Shopify/WordPress features. 
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Example 1 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                  <Network size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">MLM / Referral System</h3>
                  <p className="text-xs text-gray-500">Project Reference</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                A custom-built system where users can invite friends and earn commissions. We handle the tracking logic, database storage, and payout calculation.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                  <Database size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Custom Private Apps</h3>
                  <p className="text-xs text-gray-500">Project Reference</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Need a feature that no app on the store provides? We code custom logic specific to your business needs (e.g., custom checkout flows, pincode validators).
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsSchedulerOpen(true)}
              className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 text-white font-bold rounded-xl transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <CalendarIcon size={18} className="text-orange-500" />
                Schedule a Meeting
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
            <p className="text-xs text-gray-500 mt-3">Discuss your custom requirements with a developer</p>
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
             <FaqItem q="Can I cancel my ReadyFlow Tools subscription anytime?" a="Yes, absolutely. You can cancel your ₹29 subscription instantly from your dashboard." idx={0} showFAQ={showFAQ} setShowFAQ={setShowFAQ} />
             <FaqItem q="Is the ₹9,999 Store Setup really a one-time fee?" a="Yes. We do not charge monthly retainers for store setup." idx={1} showFAQ={showFAQ} setShowFAQ={setShowFAQ} />
             <FaqItem q="How does the custom MLM/Referral system work?" a="For custom requirements, we build a private app connected to your store via API." idx={3} showFAQ={showFAQ} setShowFAQ={setShowFAQ} />
          </div>
        </div>

      </div>

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#161616]">
              <h3 className="font-bold text-white flex items-center gap-2">
                <CalendarIcon size={16} className="text-orange-500"/> Schedule Meeting
              </h3>
              <button onClick={() => setIsSchedulerOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {meetingStep === 1 && (
                <div className="animate-in slide-in-from-right duration-300">
                  <label className="text-sm text-gray-400 block mb-2">What is the agenda of this meeting?</label>
                  <textarea 
                    autoFocus
                    placeholder="E.g. I need a custom app for my jewelry store..." 
                    value={meetingReason}
                    onChange={(e) => setMeetingReason(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none min-h-[120px] resize-none mb-6"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => meetingReason.trim() && setMeetingStep(2)}
                      disabled={!meetingReason.trim()}
                      className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next <ChevronRight size={16}/>
                    </button>
                  </div>
                </div>
              )}
              {meetingStep === 2 && (
                <div className="animate-in slide-in-from-right duration-300">
                  <div className="mb-6">
                    <label className="text-sm text-gray-400 block mb-3 flex items-center gap-2"><CalendarIcon size={14}/> Select Date</label>
                    <div className="bg-black border border-white/10 rounded-xl p-3">
                        <SimpleCalendar selected={selectedDate} onSelect={setSelectedDate} />
                    </div>
                  </div>
                  {selectedDate && (
                    <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                      <label className="text-sm text-gray-400 block mb-3 flex items-center gap-2"><Clock size={14}/> Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"].map((time) => (
                          <button 
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 text-xs rounded-lg border transition-all ${selectedTime === time ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <button onClick={() => setMeetingStep(1)} className="text-sm text-gray-500 hover:text-white">Back</button>
                    <button 
                      onClick={handleScheduleSubmit}
                      disabled={!selectedDate || !selectedTime}
                      className="bg-orange-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Confirm & Schedule <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- NEW: LOGIN REQUIRED MODAL --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111] border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center relative animate-in zoom-in-95 duration-200">
                <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
                
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} className="text-orange-500" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Account Required</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    To access the premium toolkit and manage your subscription, you need to be logged in.
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => router.push('/login')} 
                        className="w-full py-3 bg-white hover:bg-gray-200 text-black rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} />
                        Log In / Sign Up
                    </button>
                    <button 
                        onClick={() => setShowLoginModal(false)}
                        className="w-full py-3 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}

    </main>
  );
}

// --- HELPER COMPONENTS ---

function ListItem({ text, highlight = false }: { text: string, highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${highlight ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400'}`}>
        <Check size={12} />
      </div>
      <span className={`text-sm ${highlight ? 'text-white font-medium' : 'text-gray-400'}`}>{text}</span>
    </div>
  );
}

function FaqItem({ q, a, idx, showFAQ, setShowFAQ }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all">
      <button onClick={() => setShowFAQ(showFAQ === idx ? null : idx)} className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors">
        <h3 className="font-bold text-white pr-4 text-sm md:text-base">{q}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${showFAQ === idx ? 'rotate-180' : ''}`} />
      </button>
      {showFAQ === idx && <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</div>}
    </div>
  )
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
      {days.map((d, i) => {
        const isSelected = selected && d.toDateString() === selected.toDateString();
        return (
          <button 
            key={i} 
            onClick={() => onSelect(d)}
            className={`flex flex-col items-center p-2 rounded-lg border transition-all ${isSelected ? 'bg-white text-black border-white' : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="text-[10px] uppercase font-bold opacity-60">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <span className="text-sm font-bold">{d.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}