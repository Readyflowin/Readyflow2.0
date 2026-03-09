import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; 

// ─── Configuration ────────────────────────────────────────────────────────────

const WA_NUMBER = "918602555840"; //
const CONTACT_MSG = encodeURIComponent("Hi! I came from your website and want to discuss a project.");

// Updated: Services, Reviews, Pricing, Contact
const NAV_LINKS = [
  { name: "Services", path: "#services", type: "anchor" },
  { name: "Reviews", path: "#work", type: "anchor" }, //
  { name: "Pricing", path: "#pricing", type: "anchor" },
  { name: "Contact", path: `https://wa.me/${WA_NUMBER}?text=${CONTACT_MSG}`, type: "external" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[120] flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`
          pointer-events-auto flex items-center justify-between w-full max-w-6xl px-5 md:px-8 py-3 
          rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500
          ${isScrolled 
            ? "bg-white/80 backdrop-blur-2xl border-black/5 shadow-xl" 
            : "bg-white/10 backdrop-blur-md border-black/5 shadow-none"}
        `}
      >
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer pointer-events-auto">
          <div className="w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110">
            <img src="/icon.png" alt="ReadyFlow Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-black tracking-tighter text-lg md:text-xl uppercase text-[#070707]">
            ReadyFlow
          </span>
        </Link>

        {/* 2. DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              {link.type === "external" ? (
                <a 
                  href={link.path} target="_blank" rel="noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-[#070707]/40 hover:text-[#070707] transition-colors duration-300 group relative"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1DFF8A] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <a 
                  href={location.pathname === "/" ? link.path : `/${link.path}`}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-[#070707]/40 hover:text-[#070707] transition-colors duration-300 group relative"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1DFF8A] transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* 3. PRIMARY CTA: View Work Archive (/work) */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link 
            to="/work"
            className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-[#070707] text-[#F4EFE6] rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#1DFF8A] hover:text-[#070707] group"
          >
            View Our Past Work
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <button 
            className="md:hidden p-2 text-[#070707]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* 4. MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#F4EFE6] z-[110] flex flex-col justify-center items-center p-8 md:hidden pointer-events-auto"
          >
            <div className="absolute top-8 right-8">
               <button onClick={() => setMobileMenuOpen(false)} className="p-4 text-[#070707]">
                 <X size={32} strokeWidth={3} />
               </button>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 text-center mb-4">Navigation Index</p>
              {NAV_LINKS.map((link, i) => (
                <a 
                  key={link.name} 
                  href={location.pathname === "/" ? link.path : `/${link.path}`}
                  target={link.type === "external" ? "_blank" : "_self"}
                  rel={link.type === "external" ? "noreferrer" : ""}
                  className="text-5xl font-black text-[#070707] uppercase tracking-tighter leading-none border-b border-black/5 pb-4 hover:text-[#1DFF8A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    {link.name}
                  </motion.span>
                </a>
              ))}
              
              <Link
                to="/work"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-8 py-6 bg-[#070707] text-[#1DFF8A] rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
              >
                View Past Work Archive
              </Link>
            </div>

          
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}