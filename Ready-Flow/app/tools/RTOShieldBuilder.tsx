"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Code2, Check, Monitor, Smartphone, 
  Lock, Loader2, X, AlertCircle
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/lib/firebase"; 
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"; 

// ---------- PINCODE DATABASE ----------
const PINCODES_RAW = `
781127 835219 841238 212303 273201 303903 305802 342305 431107 484334 
484771 563128 591213 754029 788723 801108 843119 848203 209202 212201 
212655 221507 221507 303505 332718 385320 401102 444403 517588 782481 
805103 843128 845449 226101 251318 303120 303501 413216 458002 476224 
572107 600120 822116 828116 845106 175124 192102 847105 851205 203209 
281406 307022 783339 843109 854104 192304 305023 341509 781308 799104 
813213 822124 845301 192302 209101 221311 283105 412411 431105 534198 
732207 843313 203203 221304 233227 244242 563133 801110 321602 476229 
811213 825408 854329 301026 342307 490011 524345 841426 844506 243505 
244401 530047 801109 845433 852124 212107 486331 522414 733215 851134 
185202 192306 811101 841239 244402 251309 301022 303104 464668 782126 
244251 301025 331802 431204 783334 845454 847212 283202 303801 303901 
325220 343022 382427 443204 486881 784514 824211 202124 788119 812006 
821108 845101 854312 127046 344032 825405 852128 182201 192210 533435 
585328 782125 202150 301406 303106 825323 852127 192305 203135 389180 
811308 822110 845105 845412 261201 342023 342606 781136 788155 201302 
221104 301030 303806 591302 732206 752011 803212 848201 175029 250406 
283110 301024 824232 132113 247232 362225 733208 784115 244222 244925 
245205 303805 431123 531055 804452 845418 244301 301028 303008 591317 
453115 465674 583277 843329 303603 825322 182143 221011 303338 303712 
335704 412220 465441 476111 845437 281306 301408 783331 803202 246734 
413701 829202 852122 854202 208023 303328 313603 454660 764073 121102 
201102 191111 193101 193222 192301 185131 203207 193121 185101 193502 
193221 185121 193224 345001 122107 500003 182202 841226 508213 486886 
803101 476001 192201 302031 193501 800006 193411 185132 122508 193401 
121103 855107 190017 192121 121106 301707 303303 245304 821115 304001 
122108 303108 274304 474006 121107 123021 193103 247656 263152 301402 
301404 321205 332715 342037 501501 123023 422012 799103 335701 363530 
799045 811105 523226 344035 585310 334603 193504 281204 304502 508248 
185211 304021 342015 782445 203202 247341 301405 431133 464551 782440 
844122 244601 284204 821109 243202 332404 516101 824231 243123 484774 
782124 852219 125076 231208 321608 332402 332602 342802 431705 733210 
787054 825406 851214 221303 327022 344033 422303 444503 732103 782485 
788734 815316 829144 841227 852221 133004 205264 206245 243720 283102 
303005 413104 465661 476115 476444 480441 483220 486882 591311 755018 
825320 844114 845426 124108 182203 202138 324008 501508 474003 586128 
140501 343040 732125 782105 303103 835302 247663 193301 193303 201015 
803213 192129 475110 821101 244102 302027 344704 342303 502325 321203 
193225 283204 825401 283125 335803 345021 244241 250101 362268 844102 
303503 321023 783135 328021 335707 247774 799035 322241 281502 461775 
132107 344031 486889 782123 121105 203205 334803 342301 509301 147101 
322201 505301 855101 335804 185111 314001 182301 331023 193122 303702 
331803 803201 321022 322001 321024 272175 851204 732201 341510 476337 
328001 281403 303012 783129 122104 343041 364290 122105 303007 800027 
192125 342027 301411 302028 816109 185212 303301 486123 764036 121101 
203201 303313
`;

// Build the RTO list: extract 6-digit sequences and dedupe
const RTO_LIST = new Set((PINCODES_RAW.match(/\d{6}/g) || []).map(s => s.trim()));

// --- NEW HELPER FUNCTION: DETECTS ALL FAKE PATTERNS ---
// This checks for:
// 1. Repeated digits (111111, 555555)
// 2. Ascending sequences (123456, 234567, 456789)
// 3. Descending sequences (987654, 876543)
const isFakePattern = (pin: string) => {
  if (!pin || pin.length !== 6) return false;
  
  // Repeated (e.g., 111111)
  if (/^(\d)\1{5}$/.test(pin)) return true;
  
  // Sequential Check
  const ascending = "0123456789";
  const descending = "9876543210";
  
  if (ascending.includes(pin)) return true; // Catches 123456, 234567, etc.
  if (descending.includes(pin)) return true; // Catches 987654, 876543, etc.
  
  return false;
};
// -----------------------------------------------------

export default function RTOShieldBuilder() {
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);
  
  const [hasPremiumPlan, setHasPremiumPlan] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [copied, setCopied] = useState(false);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPro, setIsPro] = useState(false); 

  // --- PREVIEW INTERACTIVITY STATE ---
  const [previewPin, setPreviewPin] = useState("");
  const [previewStatus, setPreviewStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [previewErrorMsg, setPreviewErrorMsg] = useState("");
  
  // Settings State
  const [settings, setSettings] = useState({
    headline: "Verify delivery",
    subheadline: "SECURE CHECKOUT ENABLED", 
    color: "#6366f1", 
    badgeText: "RF", 
    buttonText: "CONTINUE TO BUY",
    delay: 2, 
  });

  useEffect(() => {
    setIsMounted(true);
    const checkPlan = async () => {
        const user = auth.currentUser;
        if (!user) { setLoadingPlan(false); return; }
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && (userSnap.data().plan === "Premium" || userSnap.data().plan === "Pro")) {
                setHasPremiumPlan(true);
            }
        } catch (err) { console.error(err); }
        setLoadingPlan(false);
    };
    checkPlan();
  }, []);

  const trackToolUsage = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          toolsUsed: increment(1),
          lastToolUsedAt: new Date()
        });
      } catch (err) {
        console.error("Firestore Tracking Error:", err);
      }
    }
  };

  // --- UPDATE 1: LIVE PREVIEW VERIFICATION LOGIC ---
  const handlePreviewVerify = () => {
    if (previewPin.length !== 6) return;
    
    setPreviewStatus('loading');

    // Simulate Network Delay 
    setTimeout(() => {
      // 1. Check if pincode exists in our RTO Database
      if (RTO_LIST.has(previewPin)) {
        setPreviewStatus('error');
        setPreviewErrorMsg("Sorry, we donot serve to that location yet.");
      } 
      // 2. Check for NEW Fake Patterns (using the helper function)
      else if (isFakePattern(previewPin)) {
        setPreviewStatus('error');
        setPreviewErrorMsg("Sorry, Location not serviceable.");
      } 
      // 3. Success (Safe Pincode)
      else {
        setPreviewStatus('success');
        setTimeout(() => {
          setPreviewStatus('idle');
          setPreviewPin("");
        }, 2000);
      }
    }, 1500); 
  };
  // ------------------------------------------------

  const generateSnippet = () => {
    const watermark = isPro ? "" : `<a href="https://readyflow.in" target="_blank" style="display:block; margin-top:20px; font-size:10px; color:#cbd5e1; text-decoration:none; text-align:center; font-family:sans-serif; font-weight:700; opacity:0.6;">⚡ PROTECTED BY READYFLOW</a>`;
    const rtoDataArray = Array.from(RTO_LIST);

    // --- UPDATE 2: THE GENERATED SCRIPT LOGIC ---
    // This injects the pattern matching logic directly into the customer's browser script
    return `<style>
  #rf-shield-wrapper { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 2147483647; font-family: 'Inter', sans-serif; backdrop-filter: blur(10px); visibility: hidden; opacity: 0; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  #rf-shield-wrapper.active { visibility: visible; opacity: 1; }
  .rf-card { width: 420px; max-width: 92%; background: #ffffff; border-radius: 28px; padding: 45px 35px; box-shadow: 0 40px 100px -10px rgba(0,0,0,0.6); color: #111; text-align: center; }
  .rf-badge { width: 65px; height: 65px; background: ${settings.color}; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; margin: 0 auto 30px; font-size: 26px; box-shadow: 0 20px 40px -8px ${settings.color}66; }
  .rf-title { font-size: 26px; font-weight: 900; margin: 0 0 12px; letter-spacing: -0.04em; color: #111; }
  .rf-sub { font-size: 11px; color: #888; margin-bottom: 35px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; }
  .rf-input { width: 100%; padding: 20px; border: 2px solid #f0f0f0; border-radius: 18px; margin-bottom: 20px; text-align: center; font-size: 22px; font-weight: 900; color: #111; letter-spacing: 0.3em; box-sizing: border-box; }
  .rf-btn { width: 100%; background: ${settings.color}; color: #fff; border: none; padding: 20px; border-radius: 18px; font-weight: 900; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.12em; font-size: 14px; }
  .rf-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .rf-error { color: #e11d48; font-size: 13px; margin-top: 18px; font-weight: 800; display: none; text-transform: uppercase; }
</style>
<div id="rf-shield-wrapper">
  <div class="rf-card">
    <div class="rf-badge">${settings.badgeText}</div>
    <h3 class="rf-title">${settings.headline}</h3>
    <p class="rf-sub">${settings.subheadline}</p>
    <input id="rf-pin-field" class="rf-input" type="text" inputmode="numeric" maxlength="6" placeholder="000000">
    <button id="rf-verify-btn" class="rf-btn" disabled>${settings.buttonText}</button>
    <div id="rf-error-msg" class="rf-error"></div>
    ${watermark}
  </div>
</div>
<script>
(function(){
  if(localStorage.getItem('rf_shield_verified')) return;
  const RTO_DB = new Set(${JSON.stringify(rtoDataArray)});

  function isFakePattern(pin) {
    if(!pin || pin.length !== 6) return false;
    // Repeated (111111)
    if(/^(\\d)\\1{5}$/.test(pin)) return true;
    // Sequential Check (Forward & Backward)
    var asc = "0123456789", desc = "9876543210";
    if(asc.includes(pin) || desc.includes(pin)) return true;
    return false;
  }

  setTimeout(() => {
    const wrap = document.getElementById('rf-shield-wrapper');
    const inp = document.getElementById('rf-pin-field');
    const btn = document.getElementById('rf-verify-btn');
    const err = document.getElementById('rf-error-msg');
    wrap.classList.add('active');
    inp.addEventListener('input', () => { 
        inp.value = inp.value.replace(/[^0-9]/g, '');
        btn.disabled = inp.value.length !== 6; 
        err.style.display = 'none'; 
    });
    btn.addEventListener('click', () => {
      const val = inp.value;
      if(RTO_DB.has(val) || isFakePattern(val)) {
        err.innerText = 'Sorry, we donot serve to that location yet.'; 
        err.style.display = 'block';
      } else {
        btn.innerText = 'VERIFYING...';
        setTimeout(() => { localStorage.setItem('rf_shield_verified', 'true'); wrap.remove(); }, 1200);
      }
    });
  }, ${settings.delay * 1000});
})();
</script>`;
  };

  return (
    <div className="w-full space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* --- CONTROLS PANEL --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-between">
                Shield Settings {loadingPlan && <Loader2 size={12} className="animate-spin text-indigo-500" />}
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 px-1">Main Heading</label>
                <input value={settings.headline} onChange={(e) => setSettings({...settings, headline: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 px-1">Sub-headline</label>
                <input value={settings.subheadline} onChange={(e) => setSettings({...settings, subheadline: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 px-1">Badge</label>
                  <input value={settings.badgeText} maxLength={2} onChange={(e) => setSettings({...settings, badgeText: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-black text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 px-1">Brand Color</label>
                  <input type="color" value={settings.color} onChange={(e) => setSettings({...settings, color: e.target.value})} className="w-full h-12 rounded-2xl cursor-pointer bg-white/[0.03] border border-white/10 p-1" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-black text-gray-500 px-1">
                  <span>Display Delay</span>
                  <span className="text-indigo-400 font-bold">{settings.delay}s</span>
                </div>
                <input type="range" min="0" max="30" value={settings.delay} onChange={(e) => setSettings({...settings, delay: parseInt(e.target.value)})} className="w-full accent-indigo-500" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2 text-blue-400">
                 <ShieldCheck size={18} />
                 <span className="text-[10px] font-black uppercase italic">White Label</span>
               </div>
               <Switch checked={isPro} onCheckedChange={(c) => { if(c && !hasPremiumPlan) setShowUpgradeModal(true); else setIsPro(c); }} className="scale-75" />
            </div>
          </div>

          <button 
            onClick={async () => { 
              await navigator.clipboard.writeText(generateSnippet()); 
              setCopied(true); 
              await trackToolUsage(); 
              setTimeout(()=>setCopied(false), 2000); 
            }} 
            className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-2xl"
          >
            {copied ? <Check size={20}/> : <Code2 size={20}/>} 
            {copied ? 'Code Copied!' : 'Copy Shield Code'}
          </button>
        </div>

        {/* --- LIVE PREVIEW AREA --- */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-end gap-3 px-2">
              <button onClick={() => setDevicePreview('desktop')} className={`p-4 rounded-2xl transition-all ${devicePreview === 'desktop' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-600 hover:text-gray-400'}`}><Monitor size={20} /></button>
              <button onClick={() => setDevicePreview('mobile')} className={`p-4 rounded-2xl transition-all ${devicePreview === 'mobile' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-600 hover:text-gray-400'}`}><Smartphone size={20} /></button>
          </div>

          <div className={`mx-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative border-[14px] border-gray-950 flex items-center justify-center
              ${devicePreview === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-[650px]'}`}
          >
              <div className="absolute inset-0 bg-gray-50 bg-[url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png')] bg-cover opacity-10 grayscale"></div>
              
              {isMounted && previewStatus !== 'success' && (
                <div className="relative z-30 w-full flex justify-center p-8 animate-in zoom-in duration-700">
                  <div className="bg-white w-full max-w-[360px] p-12 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-center">
                    <div className="w-16 h-16 rounded-[1.4rem] flex items-center justify-center text-white font-black text-2xl mb-8 mx-auto shadow-2xl" style={{ background: settings.color, boxShadow: `0 20px 40px -10px ${settings.color}88` }}>
                      {settings.badgeText}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight mb-3">{settings.headline}</h3>
                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-10">{settings.subheadline}</p>
                    
                    <input 
                      type="text" 
                      maxLength={6}
                      inputMode="numeric"
                      value={previewPin}
                      placeholder="000000"
                      onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setPreviewPin(val);
                          setPreviewStatus('idle'); // clear errors on typing
                          setPreviewErrorMsg("");
                      }}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.2rem] py-5 mb-5 text-gray-800 font-black tracking-[0.4em] text-xl text-center focus:border-indigo-500 outline-none transition-all placeholder:text-gray-200"
                    />
                    
                    <button 
                      onClick={handlePreviewVerify}
                      disabled={previewPin.length !== 6 || previewStatus === 'loading'}
                      className="w-full py-5 rounded-[1.2rem] text-white font-black text-xs tracking-widest shadow-2xl opacity-90 uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                      style={{ background: settings.color }}
                    >
                      {previewStatus === 'loading' ? <Loader2 size={16} className="animate-spin"/> : settings.buttonText}
                    </button>

                    {previewStatus === 'error' && (
                        <div className="mt-4 text-[10px] text-red-500 font-black uppercase tracking-wider animate-in slide-in-from-top-2 fade-in flex items-center justify-center gap-1">
                            <AlertCircle size={10} /> {previewErrorMsg}
                        </div>
                    )}

                    {!isPro && <div className="mt-8 text-[9px] text-gray-300 font-black uppercase tracking-[0.25em]">⚡ Powered by ReadyFlow</div>}
                  </div>
                </div>
              )}

              {previewStatus === 'success' && (
                  <div className="relative z-30 animate-in zoom-in duration-500">
                     <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
                        <Check size={18} /> Verified!
                     </div>
                  </div>
              )}
          </div>
        </div>
      </div>
      
       {/* --- UPGRADE MODAL --- */}
       {showUpgradeModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-12 rounded-[4rem] w-full max-w-md text-center animate-in zoom-in-95 duration-500 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                <button onClick={() => setShowUpgradeModal(false)} className="absolute top-8 right-8 text-gray-600 hover:text-white transition-all"><X size={28}/></button>
                <div className="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 rotate-12"><Lock size={45} className="text-blue-500" /></div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none uppercase">Premium Locked</h3>
                <p className="text-gray-400 mb-12 leading-relaxed text-sm font-medium italic">Advanced white-labeling and high-priority database updates are only for Premium partners.</p>
                <button onClick={() => router.push('/pricing')} className="w-full py-6 bg-orange-500 text-black font-black rounded-3xl hover:bg-orange-400 transition-all shadow-2xl shadow-orange-500/20 uppercase tracking-widest text-xs">Upgrade for ₹29</button>
            </div>
        </div>
      )}
    </div>
  );
}