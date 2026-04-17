import { motion } from "framer-motion";

// ─── Complete Project List (Updated from Ledger) ──────────────────────────────
const BRANDS = [
  "ReadyFlow",
  "Deazy.in",
  "Hopup Clothing",
  "Zain Aesthetics",
  "Confelion",
  "Haelo",
  "TrulyEco",
  "Mera Printers",
  "Devsocs",
  "Mimito",
  "Dharmiq Hub"
];

export default function Marquee() {
  return (
    <div className="py-24 bg-[#F4EFE6] border-y border-black/5 overflow-hidden">
      {/* Real & Authentic Header */}
      <p className="text-center text-[10px] font-black text-slate-400 mb-12 uppercase tracking-[0.3em]">
        Trusted by growing Indian brands we've helped scale
      </p>
      
      <div className="relative flex items-center overflow-hidden">
        {/* Subtle Side Fades for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10" />

        <div className="flex w-max">
          {/* Seamless Infinite Loop */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }} // Slightly slower for better readability
            className="flex items-center gap-24 px-12"
          >
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <span 
                key={index} 
                className="text-4xl md:text-6xl font-black text-[#070707]/10 hover:text-[#070707] hover:drop-shadow-[0_0_20px_rgba(29,255,138,0.4)] transition-all duration-500 cursor-default whitespace-nowrap uppercase tracking-tighter"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle Link to Case Studies Placeholder */}
      <div className="mt-16 flex justify-center">
        <div className="px-5 py-2 rounded-full border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Detailed Case Studies Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}