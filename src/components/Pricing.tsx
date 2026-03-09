import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowUpRight, X, ChevronLeft, Sparkles, Check
} from "lucide-react";

// ─── Configuration ────────────────────────────────────────────────────────────

const WA_NUMBER = "918602555840"; 
const ENTRY_PRICE = " 7,499";
const SPRING_UI = { type: "spring" as const, stiffness: 400, damping: 30 } as const;

const PARTNERS = [
  { name: "Zain Aesthetics", url: "https://zainaesthetics.in/" },
  { name: "Confelion", url: "https://confelion.store/" },
  { name: "Hopup Clothing", url: "https://hopupclothing.in/" },
  { name: "Haelo Shop", url: "https://haelo.shop/" }
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getNextDays(count: number) {
  const days: { label: string; dayShort: string; full: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      dayShort: d.toLocaleDateString("en-IN", { weekday: "short" }),
      full: d.toLocaleDateString("en-IN", { dateStyle: "full" })
    });
  }
  return days;
}

// ─── Strategy Modal ──────────────────────────────────────────────────────────

function StrategyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<0 | 1>(0);
  const [date, setDate] = useState<any>(null);
  const days = getNextDays(8);

  const handleFinalConfirm = (time: string) => {
    const msg = `Hi ReadyFlow! I'm claiming the ₹${ENTRY_PRICE} Shopify Store Launch Offer.\n\n📅 Requested: ${date.full} at ${time}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={SPRING_UI}
            className="relative w-full max-w-sm bg-[#F4EFE6] rounded-[2.5rem] p-10 shadow-2xl border border-black/5">
            <button onClick={onClose} className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors"><X size={20} /></button>
            <h3 className="text-2xl font-black text-[#070707] uppercase tracking-tighter mb-8">{step === 0 ? "Which date are you available for discussion" : "Pick Time"}</h3>
            <div className="min-h-[220px]">
              {step === 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {days.map((d, i) => (
                    <button key={i} onClick={() => { setDate(d); setStep(1); }} className="py-4 rounded-xl border bg-white border-black/5 flex flex-col items-center hover:border-[#1DFF8A] transition-all active:scale-95">
                      <span className="text-[7px] font-black uppercase opacity-30">{d.dayShort}</span>
                      <span className="text-xs font-black">{d.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {["11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"].map(t => (
                      <button key={t} onClick={() => handleFinalConfirm(t)} className="py-4 rounded-xl border bg-white border-black/5 font-black text-[10px] hover:bg-black hover:text-[#1DFF8A] transition-all">{t}</button>
                    ))}
                  </div>
                  <button onClick={() => setStep(0)} className="w-full text-[9px] font-black uppercase opacity-30 flex items-center justify-center gap-1 mt-4"> <ChevronLeft size={12}/> Back</button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-12 md:py-28 bg-[#F4EFE6] overflow-hidden" id="pricing">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Urgent Header - Optimized for Mobile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-[#070707] mb-6">
            Complete <br /> <span className="animate-text-gradient bg-gradient-to-r from-[#070707] via-slate-600 to-[#1DFF8A] bg-clip-text text-transparent">Shopify Store</span>
          </h2>
          <p className="text-sm md:text-lg font-bold uppercase tracking-tight text-black/40 max-w-xl mx-auto leading-relaxed px-4">
            "A website without visibility is just a <span className="text-blackc">Billboard in desert.</span>"
          </p>
        </motion.div>

        {/* Main Offer Card - Urgency Indicator moved INSIDE */}
        <motion.div 
          whileHover={{ y: -5 }} transition={SPRING_UI}
          className="relative p-6 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-[#070707] text-white border border-[#1DFF8A]/30 shadow-2xl overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1DFF8A]/5 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Status Indicator (Now Inside) */}
            <div className="mb-10 flex flex-col items-center w-full">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                 <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1DFF8A] border-2 border-[#070707] flex items-center justify-center shadow-lg">
                        <Check size={14} className="text-[#070707]" strokeWidth={4} />
                     </div>
                   ))}
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
                      <span className="text-xs font-black text-white/20">?</span>
                   </div>
                 </div>
                 <div className="text-center sm:text-left">
                    <p className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-[#1DFF8A] leading-none">4 of 10 Slots Secured</p>
                    <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Exclusive Founder's Cohort</p>
                 </div>
              </div>
              <div className="w-full max-w-xs md:max-w-md h-2 md:h-3 bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5">
                <motion.div initial={{ width: 0 }} animate={inView ? { width: '40%' } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                  className="h-full bg-gradient-to-r from-[#1DFF8A] to-[#1DFF8A]/50 rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              <Sparkles size={14} className="text-[#1DFF8A]" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white">Limited Launch Offer</span>
            </div>

            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] opacity-30 mb-2">Investment Price</p>
            <h3 className="text-6xl sm:text-8xl md:text-[130px] font-black tracking-tighter leading-none mb-8 md:mb-10">
              ₹{ENTRY_PRICE}
            </h3>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-10 md:mb-12 w-full md:w-auto">
              {["Custom Theme", "Payment Ready", "Sub-2s Speed"].map((feat) => (
                <div key={feat} className="flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5">
                  <Check size={12} className="text-[#1DFF8A]" strokeWidth={4} />
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">{feat}</span>
                </div>
              ))}
            </div>

            <motion.button 
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#070707" }} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-[#1DFF8A] text-[#070707] rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(29,255,138,0.2)] transition-all"
            >
              Secure My Slot
            </motion.button>
          </div>
        </motion.div>

        {/* Social Proof Strip - Balanced for mobile */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Brands powering ahead with us</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 group">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em]">{p.name}</span>
                <ArrowUpRight size={8} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

      </div>

      <StrategyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}