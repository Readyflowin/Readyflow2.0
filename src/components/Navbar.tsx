import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Briefcase } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom"; 
import { trackCTAClick, trackWhatsAppClick } from "../lib/metaPixel";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLeadFormModal } from "./LeadFormModalContext";

// ─── Configuration ────────────────────────────────────────────────────────────

const WA_NUMBER = "918602555840"; 
const CONTACT_MSG = encodeURIComponent(
  "Hi Readyflow, I’m interested in the ₹11,999 Instagram Brand Shopify Launch. My brand sells ______ and I want to know the next steps.",
);

const NAV_LINKS = [
  { name: "Offer", path: "#offer", type: "anchor" },
  { name: "Who It's For", path: "#fit", type: "anchor" },
  { name: "Work", path: "#work", type: "anchor" },
  { name: "FAQ", path: "#faq", type: "anchor" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openLeadFormModal } = useLeadFormModal();
  const getHref = (path: string, type: string) => {
    if (type === "external") return path;
    return location.pathname === "/" ? path : `/${path}`;
  };

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
          pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 md:px-8 py-2.5 md:py-3 
          rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500
          ${isScrolled 
            ? "bg-white/90 backdrop-blur-2xl border-black/5 shadow-xl" 
            : "bg-white/10 backdrop-blur-md border-black/5 shadow-none"}
        `}
      >
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer pointer-events-auto">
          <div className="w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110">
            <img src="/icon.png" alt="ReadyFlow Logo" className="w-full h-full object-contain" />
          </div>
          <span className="hidden font-black uppercase tracking-tighter text-[#070707] sm:inline sm:text-base md:text-xl">
            ReadyFlow
          </span>
        </Link>

        {/* 2. DESKTOP NAV - Animated Underline Added */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a 
                href={getHref(link.path, link.type)}
                target={link.type === "external" ? "_blank" : "_self"}
                onClick={() => {
                  if (link.type === "external") {
                    trackWhatsAppClick({
                      source_section: "desktop_navigation",
                      cta_label: link.name,
                      channel: "whatsapp",
                    });
                  }
                }}
                className="group relative text-[10px] font-black uppercase tracking-[0.3em] text-[#070707]/40 hover:text-[#070707] transition-colors duration-300 pb-1"
              >
                {link.name}
                {/* The Green Line Animation */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1DFF8A] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* 3. ACTION GROUP */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={() => {
              const ctaParams = {
                cta_label: "Check My Brand Fit",
                section: "navbar",
                destination: "lead_form_modal",
              };
              trackCTAClick(ctaParams);
              openLeadFormModal({
                cta_label: ctaParams.cta_label,
                source_section: ctaParams.section,
              });
            }}
            className="flex whitespace-nowrap rounded-full bg-[#070707] px-3 py-2 text-[8px] font-black uppercase tracking-[0.08em] text-[#1DFF8A] transition-all active:scale-95 md:hidden"
          >
            Check My Brand Fit <ArrowRight size={10} />
          </button>

          <button
            type="button"
            onClick={() => {
              const ctaParams = {
                cta_label: "Check My Brand Fit",
                section: "navbar",
                destination: "lead_form_modal",
              };
              trackCTAClick(ctaParams);
              openLeadFormModal({
                cta_label: ctaParams.cta_label,
                source_section: ctaParams.section,
              });
            }}
            className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-[#070707] text-[#F4EFE6] rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-[#1DFF8A] hover:text-[#070707] group"
          >
            Check My Brand Fit
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button 
            className="md:hidden p-2 text-[#070707] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* 4. MOBILE MENU OVERLAY - Untouched as requested */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
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
                  href={getHref(link.path, link.type)}
                  target={link.type === "external" ? "_blank" : "_self"}
                  className="text-5xl font-black text-[#070707] uppercase tracking-tighter leading-none border-b border-black/5 pb-4 hover:text-[#1DFF8A] transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.type === "external") {
                      trackWhatsAppClick({
                        source_section: "mobile_navigation_menu",
                        cta_label: link.name,
                        channel: "whatsapp",
                      });
                    }
                  }}
                >
                  <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    {link.name}
                  </motion.span>
                </a>
              ))}
              
              <Link
                to="/work"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackCTAClick({
                    cta_label: "View Past Work",
                    section: "mobile_navigation_menu",
                    destination: "/work",
                  });
                }}
                className="w-full mt-8 py-6 bg-[#070707] text-[#1DFF8A] rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 shadow-2xl active:scale-95"
              >
                View Past Work <Briefcase size={13} />
              </Link>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${CONTACT_MSG}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source_section: "mobile_navigation_menu",
                    cta_label: "Continue on WhatsApp",
                    channel: "whatsapp",
                  })
                }
                className="w-full rounded-[2rem] border border-black/10 py-5 text-center text-[10px] font-black uppercase tracking-[0.24em] text-[#070707]"
              >
                <WhatsAppIcon className="mr-2 inline-block h-4 w-4 align-middle" />
                Continue on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
