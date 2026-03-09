import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; //

// ─── Configuration ────────────────────────────────────────────────────────────

const WA_NUMBER = "918602555840"; 
const INSTA_URL = "https://www.instagram.com/ready_flow_/";
const MAPS_URL = "https://maps.app.goo.gl/YourActualGMBLink"; //

const OFFER_MSG = encodeURIComponent("Hi ReadyFlow! I'm interested in the Founder's Launch Offer for ₹7,499. Let's build my Shopify store!");
const GENERAL_MSG = encodeURIComponent("Hii, I came from your website and would like to discuss a project.");

export default function Footer() {
  const [time, setTime] = useState("");
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-IN", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F4EFE6] text-[#070707] pt-24 md:pt-32 pb-12 px-6 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. Top Section: Header & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 md:mb-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-2 h-2 rounded-full bg-[#1DFF8A] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Active Studio Status</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-10">
              Ready to <br /> <span className="text-black/10">Scale</span> Your Brand?
            </h2>
            {/* SEO Identity Description */}
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40 max-w-md leading-relaxed">
              ReadyFlow is a high-performance e-commerce engineering studio based in Indore. We architect Shopify environments that convert.
            </p>
          </div>

          <motion.a 
            href={`https://wa.me/${WA_NUMBER}?text=${OFFER_MSG}`}
            target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center 
              w-full md:w-64 h-20 md:h-64 
              bg-[#070707] text-[#1DFF8A] 
              rounded-2xl md:rounded-full 
              shadow-2xl transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#1DFF8A] translate-y-full md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <div className="relative z-10 flex flex-row md:flex-col items-center gap-3 md:gap-0">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-black transition-colors md:mb-2">Initiate Project</span>
              <ArrowUpRight size={24} className="md:w-8 md:h-8 group-hover:rotate-45 group-hover:text-black transition-all duration-500" />
            </div>
          </motion.a>
        </div>

        {/* 2. Middle Grid */}
        <div className="relative mb-24 md:mb-32">
          
          {/* Background Signature Text - This is HUGE for brand recognition */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
            <h3 className="text-[18vw] font-black uppercase tracking-tighter leading-none text-black/[0.04] whitespace-nowrap">
              ReadyFlow
            </h3>
          </div>

          {/* Grid Content */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-black/5">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Navigation</p>
              <ul className="space-y-4">
                <li><a href={location.pathname === "/" ? "#services" : "/#services"} className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#1DFF8A] transition-colors">Services</a></li>
                {/* Linked to Work Route */}
                <li><Link to="/work" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#1DFF8A] transition-colors">Work</Link></li>
                <li><a href={location.pathname === "/" ? "#pricing" : "/#pricing"} className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#1DFF8A] transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Social Connect</p>
              <ul className="space-y-4">
                <li><a href={INSTA_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-[#1DFF8A] transition-colors"><Instagram size={14}/> Instagram</a></li>
                <li><a href={`https://wa.me/${WA_NUMBER}?text=${GENERAL_MSG}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-[#1DFF8A] transition-colors"><MessageCircle size={14}/> WhatsApp</a></li>
              </ul>
            </div>

            <div className="space-y-6 sm:col-span-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Logistics // Indore Studio</p>
              <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <MapPin size={16} className="text-[#1DFF8A] shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-[11px] font-black uppercase tracking-widest leading-loose group-hover:text-[#1DFF8A] transition-colors">
                    Indore, Madhya Pradesh <br />
                    India 452001
                  </p>
                </a>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#1DFF8A] shrink-0" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 mb-1">Local Time (IST)</p>
                    <p className="text-xs font-black tracking-widest tabular-nums uppercase">{time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">© {currentYear} ReadyFlow</span>
            {/* Added keywords for footer SEO crawling */}
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/10 hidden md:block">E-commerce Studio Indore</span>
          </div>
          
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">
            Engineered in Indore, India // 2026
          </div>
        </div>

      </div>
    </footer>
  );
}