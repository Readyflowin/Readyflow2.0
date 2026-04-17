"use client";

import React, { useState, useEffect } from 'react';
import { 
  Type, MessageCircle, Bell, 
  Disc, Cookie, Lock, Copy, Check, ThumbsUp, X, Smartphone, 
  MapPin, ShoppingBag, Loader2, 
  Palette, Clock, TrendingUp, 
  Shield, Code2, Monitor, ImageIcon, ArrowRight, Zap
} from 'lucide-react';
import { Switch } from '@/components/ui/switch'; 
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase"; 
import { trackToolUsage } from "@/lib/db"; 
import { doc, getDoc } from "firebase/firestore"; 

// --- TYPES ---
type TemplateType = 'simple' | 'image' | 'whatsapp' | 'sales' | 'spin' | 'cookie' | 'countdown' | 'exit';

export default function PopupBuilder() {
  const router = useRouter();

  // --- STATE ---
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('simple');
  const [isMounted, setIsMounted] = useState(false); // Fix for Hydration
  
  // Logic State
  const [hasPremiumPlan, setHasPremiumPlan] = useState(false); 
  const [isPro, setIsPro] = useState(false); 
  const [loadingPlan, setLoadingPlan] = useState(true);

  // UI State
  const [copied, setCopied] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'idle' | 'loading' | 'voted'>('idle');
  const [spinRotation, setSpinRotation] = useState(0);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  
  // Custom Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 45 });
  
  // --- 1. SECURE SUBSCRIPTION CHECK & HYDRATION FIX ---
  useEffect(() => {
    setIsMounted(true);
    const checkPlan = async () => {
        if (!auth.currentUser) {
            setLoadingPlan(false);
            return;
        }
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                if (data.plan === "Premium") {
                    let expiryTime = 0;
                    if (data.premiumUntil) {
                        if (typeof data.premiumUntil === 'string') {
                            expiryTime = new Date(data.premiumUntil).getTime();
                        } else if (data.premiumUntil.seconds) {
                            expiryTime = data.premiumUntil.seconds * 1000;
                        }
                    } else if (data.updatedAt?.seconds) {
                        const updatedTime = data.updatedAt.seconds * 1000;
                        expiryTime = updatedTime + (28 * 24 * 60 * 60 * 1000); 
                    }
                    if (expiryTime > Date.now()) {
                        setHasPremiumPlan(true);
                    } else {
                        setHasPremiumPlan(false);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching plan:", error);
        }
        setLoadingPlan(false);
    };
    checkPlan();
  }, []);

  useEffect(() => {
    if (activeTemplate === 'countdown') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
          if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTemplate]);
  
  const [content, setContent] = useState({
    headline: "Unlock 15% Off",
    subheadline: "Join our VIP list and get a special discount code instantly.",
    color: "#FF6B6B",
    delay: 2,
    buttonText: "GET CODE",
    couponCode: "SAVE15",
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop",
    whatsappNumber: "919876543210",
    customerName: "Amit",
    customerLocation: "Delhi",
    productName: "Smart Watch",
    timeAgo: "2 minutes ago",
    segments: ["10% OFF", "Try Again", "Free Ship", "20% OFF", "No Luck", "Jackpot"],
    winChance: 50,
    countdownTitle: "Flash Sale Ends In:",
    countdownOffer: "50% OFF Everything",
    exitHeadline: "Wait! Don't Miss Out",
    exitOffer: "Get 20% off your first order",
  });

  const templates = [
    { id: 'simple', name: 'Simple Text', icon: Type, status: 'live', color: 'text-blue-400' },
    { id: 'image', name: 'Image Modal', icon: ImageIcon, status: 'live', color: 'text-purple-400' },
    { id: 'whatsapp', name: 'WhatsApp Bot', icon: MessageCircle, status: 'soon', color: 'text-green-400' },
    { id: 'sales', name: 'Sales Pop', icon: Bell, status: 'soon', color: 'text-orange-400' },
    { id: 'spin', name: 'Spin Wheel', icon: Disc, status: 'soon', color: 'text-pink-400' },
    { id: 'cookie', name: 'Cookie Bar', icon: Cookie, status: 'soon', color: 'text-yellow-400' },
    { id: 'countdown', name: 'Countdown', icon: Clock, status: 'soon', color: 'text-red-400' },
    { id: 'exit', name: 'Exit Intent', icon: TrendingUp, status: 'soon', color: 'text-cyan-400' },
  ];

  const currentTemplateStatus = templates.find(t => t.id === activeTemplate)?.status;
  const isLive = currentTemplateStatus === 'live';

  const handleSpin = () => {
    const newRotation = spinRotation + 1080 + Math.random() * 360;
    setSpinRotation(newRotation);
  };

  const handleVote = () => {
    setVoteStatus('loading');
    setTimeout(() => {
      setVoteStatus('voted');
    }, 1500);
  };

  const handleProSwitch = (checked: boolean) => {
      if (checked && !hasPremiumPlan) {
          setShowUpgradeModal(true);
          return; 
      }
      setIsPro(checked);
  };

  const handleCopy = async () => {
    if (isPro && !hasPremiumPlan) {
        setShowUpgradeModal(true);
        return;
    }
    const code = generateCode();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (auth.currentUser) {
          await trackToolUsage(auth.currentUser.uid, 'popupBuilder');
      }
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const generateCode = () => {
    const watermarkHTML = isPro ? "" : `
    <a href="https://readyflow.in" target="_blank" style="display:block; margin-top:15px; font-size:11px; color:#cbd5e1; text-decoration:none; font-weight:500; font-family:sans-serif;">
      ⚡ Powered by ReadyFlow
    </a>`;

    const copyScript = `
      function rfCopy(text, btn) {
        var originalText = btn.innerText;
        function fallback() {
          var textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed"; textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.select();
          try { document.execCommand('copy'); } catch (err) { console.error(err); }
          document.body.removeChild(textArea);
          btn.innerText = 'COPIED!';
          setTimeout(function() { btn.innerText = originalText; }, 2000);
        }
        if (!navigator.clipboard) { fallback(); }
        else {
          navigator.clipboard.writeText(text).then(function() {
            btn.innerText = 'COPIED!';
            setTimeout(function() { btn.innerText = originalText; }, 2000);
          }).catch(function() { fallback(); });
        }
      }
    `;

    if (activeTemplate === 'simple') {
      return `<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  #rf-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999999; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: opacity 0.3s ease; backdrop-filter: blur(3px); font-family: 'Inter', sans-serif; }
  #rf-box { background: #fff; width: 90%; max-width: 380px; padding: 40px 30px 20px 30px; border-radius: 16px; text-align: center; position: relative; border-top: 6px solid ${content.color}; box-shadow: 0 20px 60px rgba(0,0,0,0.15); transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  #rf-overlay.show { opacity: 1; visibility: visible; }
  #rf-overlay.show #rf-box { transform: scale(1); }
  .rf-close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 28px; color: #999; cursor: pointer; }
  .rf-title { font-size: 26px; font-weight: 800; color: #1a1a1a; margin: 0 0 10px 0; letter-spacing: -1px; }
  .rf-text { font-size: 16px; color: #666; line-height: 1.5; margin: 0 0 25px 0; }
  .rf-btn { display: block; width: 100%; background: ${content.color}; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; text-transform: uppercase; }
</style>
<div id="rf-overlay">
  <div id="rf-box">
    <button class="rf-close" onclick="document.getElementById('rf-overlay').classList.remove('show')">×</button>
    <span style="font-size:40px; display:block; margin-bottom:15px;">🎁</span>
    <h2 class="rf-title">${content.headline}</h2>
    <p class="rf-text">${content.subheadline}</p>
    <button class="rf-btn" onclick="rfCopy('${content.couponCode}', this)">${content.buttonText}</button>
    ${watermarkHTML}
  </div>
</div>
<script>
  ${copyScript}
  setTimeout(() => { document.getElementById('rf-overlay').classList.add('show'); }, ${content.delay * 1000});
</script>`;
    }

    if (activeTemplate === 'image') {
      return `<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  #rf-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.75); z-index: 9999999; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s; backdrop-filter: blur(4px); font-family: 'Inter', sans-serif; }
  #rf-box { background: #fff; width: 90%; max-width: 400px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); text-align: center; position: relative; overflow: hidden; transform: scale(0.95); transition: all 0.3s; }
  #rf-overlay.show { opacity: 1; visibility: visible; }
  #rf-overlay.show #rf-box { transform: scale(1); }
  .rf-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: rgba(255,255,255,0.9); border-radius: 50%; border: none; font-size: 20px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; }
  .rf-img { width: 100%; height: 220px; object-fit: cover; display: block; }
  .rf-content { padding: 24px 28px 32px; }
  .rf-title { margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111; }
  .rf-sub { margin: 0 0 24px 0; font-size: 15px; color: #555; line-height: 1.6; }
  .rf-coupon { background: #F3F4F6; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; }
  .rf-code { font-family: monospace; font-size: 18px; font-weight: 700; color: #111; }
  .rf-copy { background: #111; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>
<div id="rf-overlay">
  <div id="rf-box">
    <button class="rf-close" onclick="document.getElementById('rf-overlay').classList.remove('show')">×</button>
    <img src="${content.imageUrl}" class="rf-img" alt="Offer">
    <div class="rf-content">
      <h2 class="rf-title">${content.headline}</h2>
      <p class="rf-sub">${content.subheadline}</p>
      <div class="rf-coupon">
        <span class="rf-code">${content.couponCode}</span>
        <button class="rf-copy" onclick="rfCopy('${content.couponCode}', this)">${content.buttonText}</button>
      </div>
      ${watermarkHTML}
    </div>
  </div>
</div>
<script>
  ${copyScript}
  setTimeout(() => { document.getElementById('rf-overlay').classList.add('show'); }, ${content.delay * 1000});
</script>`;
    }

    return "";
  };

  const updateSegment = (index: number, value: string) => {
    const newSegments = [...content.segments];
    newSegments[index] = value;
    setContent({ ...content, segments: newSegments });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Container Standardized to max-w-6xl for Border Alignment */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        
        
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-24">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-5 shadow-xl">
              <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4 px-2">Library</h3>
              <div className="space-y-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setActiveTemplate(t.id as TemplateType); setVoteStatus('idle'); }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm transition-all group ${activeTemplate === t.id ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-[#111] border-white/5 text-gray-400 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-white/5 ${activeTemplate === t.id ? 'bg-orange-500/20' : ''}`}><t.icon size={16} className={activeTemplate === t.id ? 'text-orange-500' : t.color} /></div>
                      <span className="font-bold">{t.name}</span>
                    </div>
                    {t.status === 'soon' && <Lock size={12} className="opacity-30" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-400" /><span className="text-xs font-black uppercase text-blue-400 tracking-widest">Pro Mode</span></div>
                <Switch checked={isPro} onCheckedChange={handleProSwitch} className="scale-75" />
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Remove watermarks and unlock advanced templates.</p>
            </div>
          </div>

          {/* --- MIDDLE & RIGHT COLUMN (Standard Editor Layout) --- */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
            
            {/* 1. EDITOR */}
            <div className="space-y-6">
              <div className="bg-[#0a0a0a] border border-white/10 p-7 rounded-[2rem] space-y-6 shadow-2xl">
                <h2 className="text-xl font-black text-white flex items-center gap-2 tracking-tight"><Palette size={20} className="text-orange-500" /> Editor</h2>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Headline</label>
                        <input value={activeTemplate === 'countdown' ? content.countdownTitle : activeTemplate === 'exit' ? content.exitHeadline : content.headline} onChange={(e) => activeTemplate === 'countdown' ? setContent({...content, countdownTitle: e.target.value}) : activeTemplate === 'exit' ? setContent({...content, exitHeadline: e.target.value}) : setContent({...content, headline: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Description</label>
                        <textarea value={activeTemplate === 'exit' ? content.exitOffer : content.subheadline} onChange={(e) => activeTemplate === 'exit' ? setContent({...content, exitOffer: e.target.value}) : setContent({...content, subheadline: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none min-h-[80px]" />
                    </div>
                    
                    {/* 👇 UPGRADE: IMAGE URL ONLY FOR IMAGE MODAL 👇 */}
                    {activeTemplate === 'image' && (
                      <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Image URL</label>
                        <input value={content.imageUrl} onChange={(e) => setContent({...content, imageUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none" />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Button Text</label>
                        <input value={content.buttonText} onChange={(e) => setContent({...content, buttonText: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Coupon Code</label>
                        <input value={content.couponCode} onChange={(e) => setContent({...content, couponCode: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-mono" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-end">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Palette size={12} /> Color</label>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden relative"><input type="color" value={content.color} onChange={(e) => setContent({...content, color: e.target.value})} className="absolute -inset-2 w-14 h-14 cursor-pointer border-none" /></div>
                          <span className="text-xs font-mono text-gray-400 uppercase">{content.color}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> Delay ({content.delay}s)</label>
                        <input type="range" min="0" max="15" value={content.delay} onChange={(e) => setContent({...content, delay: parseInt(e.target.value)})} className="w-full accent-orange-500" />
                      </div>
                    </div>
                </div>
              </div>

              {/* ACTION: INSTALLATION CODE */}
              {isLive ? (
                <div className="p-7 bg-[#0a0a0a] border border-white/10 rounded-[2rem] space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between"><h3 className="font-black text-white flex items-center gap-2 tracking-tighter text-sm"><Code2 size={16} className="text-orange-500" /> CODE SNIPPET</h3>{isPro && <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Pro License</span>}</div>
                  <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-[10px] text-gray-500 max-h-32 overflow-y-auto mb-4">{isMounted ? generateCode() : 'Loading...'}</div>
                  <button suppressHydrationWarning onClick={handleCopy} className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 text-xs tracking-widest uppercase">
                    {copied ? <><Check size={16}/> Copied!</> : <><Copy size={16}/> Copy Integration Code</>}
                  </button>
                </div>
              ) : (
                <div className="p-10 bg-[#0a0a0a] border border-orange-500/20 rounded-[2.5rem] text-center flex flex-col justify-center items-center min-h-[220px]">
                  {voteStatus === 'voted' ? (
                    <div className="animate-in fade-in zoom-in"><div className="h-14 w-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-green-500"><Check size={28} /></div><h3 className="text-lg font-black tracking-tight">Vote Recorded</h3></div>
                  ) : voteStatus === 'loading' ? (
                    <Loader2 size={32} className="text-orange-500 animate-spin" />
                  ) : (
                    <div className="flex flex-col items-center"><Lock size={32} className="text-orange-500 mb-4" /><h3 className="text-xl font-black mb-2 tracking-tight uppercase">Template Locked</h3><Button suppressHydrationWarning onClick={handleVote} className="bg-orange-600 hover:bg-orange-500 px-8 py-6 rounded-2xl font-black tracking-widest mt-4">VOTE TO UNLOCK</Button></div>
                  )}
                </div>
              )}
            </div>

            {/* 2. PREVIEW AREA */}
            <div className="relative flex flex-col gap-4">
                <div className="flex justify-end gap-2 px-2">
                    <button suppressHydrationWarning onClick={() => setDevicePreview('desktop')} className={`p-2.5 rounded-xl transition-all ${devicePreview === 'desktop' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-600'}`}><Monitor size={18} /></button>
                    <button suppressHydrationWarning onClick={() => setDevicePreview('mobile')} className={`p-2.5 rounded-xl transition-all ${devicePreview === 'mobile' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-600'}`}><Smartphone size={18} /></button>
                </div>

                <div className="flex justify-center">
                    <div className={`transition-all duration-500 ease-in-out bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative border-8 border-gray-900 flex items-center justify-center
                        ${devicePreview === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-[600px]'}`}
                    >
                        {!isLive && isMounted && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                <div className="w-full bg-orange-500/90 py-3 text-center transform -rotate-3 shadow-xl"><p className="text-white font-black text-xl uppercase tracking-widest drop-shadow-md">Coming Soon</p></div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gray-50 opacity-10 bg-[url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png')] bg-cover grayscale"></div>
                        
                        {isMounted && (
                          <>
                            {activeTemplate === 'simple' && (
                                <div className="relative bg-white w-[85%] max-w-[320px] p-8 rounded-3xl text-center shadow-2xl border-t-[6px] animate-in fade-in duration-500" style={{ borderColor: content.color }}>
                                    <div className="absolute top-3 right-4 text-gray-300"><X size={20}/></div>
                                    <div className="text-5xl mb-5">🎁</div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">{content.headline}</h2>
                                    <p className="text-sm text-gray-500 my-4 leading-relaxed">{content.subheadline}</p>
                                    <button suppressHydrationWarning className="w-full py-4 rounded-2xl text-white font-black text-xs tracking-widest shadow-lg" style={{ background: content.color }}>{content.buttonText}</button>
                                    {!isPro && <div className="mt-5 text-[10px] text-gray-300 font-bold uppercase">⚡ Powered by ReadyFlow</div>}
                                </div>
                            )}

                            {activeTemplate === 'image' && (
                                <div className="relative bg-white w-[90%] max-w-[340px] rounded-[2rem] text-center shadow-2xl overflow-hidden animate-in fade-in duration-500">
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 shadow-lg cursor-pointer pb-0.5 font-bold">×</div>
                                    {/* Image logic ensured */}
                                    <img src={content.imageUrl} className="w-full h-44 object-cover" alt="Preview"/>
                                    <div className="p-7">
                                        <h2 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{content.headline}</h2>
                                        <p className="text-xs text-gray-500 my-3 leading-relaxed">{content.subheadline}</p>
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 flex justify-between items-center"><span className="font-mono font-black text-gray-800 text-base">{content.couponCode}</span><button suppressHydrationWarning className="bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase">COPY</button></div>
                                        {!isPro && <div className="mt-5 text-[9px] text-gray-300 font-bold uppercase tracking-widest">⚡ Powered by ReadyFlow</div>}
                                    </div>
                                </div>
                            )}

                            {activeTemplate === 'spin' && (
                                <div className="relative flex flex-col items-center scale-90 animate-in zoom-in duration-500">
                                    <h3 className="mb-6 text-2xl font-black text-gray-900 tracking-tighter uppercase">{content.headline}</h3>
                                    <div className="relative"><div className="w-72 h-72 rounded-full border-8 border-gray-900 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1)" style={{ transform: `rotate(${spinRotation}deg)` }}>
                                        {content.segments.map((seg, i) => (
                                            <div key={i} className="absolute w-full h-full top-0 left-0" style={{ transform: `rotate(${i * (360 / content.segments.length)}deg)` }}>
                                                <div className="absolute w-full h-1/2 top-0 origin-bottom" style={{ backgroundColor: i % 2 === 0 ? content.color : '#f3f4f6', transform: `rotate(${360 / content.segments.length}deg) skewY(-${90 - (360/content.segments.length)}deg)` }}></div>
                                                <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center" style={{ transform: `rotate(${180/content.segments.length}deg)`, width: '70px' }}><span className={`text-[10px] font-black uppercase block leading-none ${i % 2 === 0 ? 'text-white' : 'text-gray-900'}`}>{seg}</span></div>
                                            </div>
                                        ))}
                                    </div><div onClick={handleSpin} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg z-20 flex items-center justify-center font-black text-[10px] text-gray-900 cursor-pointer border-4 border-gray-100">SPIN</div><div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-gray-900 z-30"></div></div>
                                    {!isPro && <div className="mt-8 text-[10px] text-gray-300 font-bold uppercase tracking-widest">⚡ Powered by ReadyFlow</div>}
                                </div>
                            )}

                            {activeTemplate === 'whatsapp' && (
                                <div className="relative bg-white w-[85%] max-w-[320px] p-7 rounded-[2rem] shadow-2xl border-l-[10px] border-green-500 animate-in fade-in duration-500">
                                    <div className="flex items-center gap-4 mb-5"><div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600"><MessageCircle size={28}/></div><div className="text-left"><h4 className="text-base font-black text-gray-900">Live Support</h4><p className="text-[10px] text-green-500 font-bold">Agents Online</p></div></div>
                                    <p className="text-xs text-gray-600 mb-6 text-left leading-relaxed bg-gray-50 p-4 rounded-2xl italic">&quot;{content.subheadline}&quot;</p>
                                    <button className="w-full bg-green-500 py-4 rounded-2xl text-white font-black text-xs tracking-widest shadow-lg flex items-center justify-center gap-2"><Smartphone size={16}/> START CHAT</button>
                                </div>
                            )}
                          </>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>
      {/* --- UPGRADE MODAL --- */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-md text-center relative animate-in zoom-in-95 duration-300">
                <button suppressHydrationWarning onClick={() => setShowUpgradeModal(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors"><X size={24}/></button>
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8"><Lock size={40} className="text-blue-500" /></div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Premium Locked</h3>
                <p className="text-gray-400 mb-10 leading-relaxed font-medium">Advanced features like <strong className="text-white">No Watermark</strong>, <strong className="text-white">Exit Intent</strong>, and <strong className="text-white">Pro Templates</strong> are only for Pro Plan.</p>
                <button suppressHydrationWarning onClick={() => router.push('/pricing')} className="w-full py-5 bg-orange-500 text-black font-black rounded-2xl hover:bg-orange-400 transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest text-sm">Upgrade Now — ₹29</button>
            </div>
        </div>
      )}
    </div>
  );
}

// --- HELPERS ---
function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 hover:border-orange-500/20 transition-all group">
      <h4 className="font-black text-orange-500 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2"><Check size={12} /> {title}</h4>
      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, text }: { num: string, text: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-5xl font-black text-white/5 group-hover:text-orange-500/20 transition-colors duration-500">{num}</div>
      <p className="text-sm text-gray-400 font-bold leading-relaxed pt-2">{text}</p>
    </div>
  );
}