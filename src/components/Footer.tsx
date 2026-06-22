import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Instagram,
  MapPin,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  trackCTAClick,
  trackInstagramClick,
  trackWhatsAppClick,
} from "../lib/metaPixel";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLeadFormModal } from "./LeadFormModalContext";

const WA_NUMBER = "918602555840";
const INSTA_URL = "https://www.instagram.com/ready_flow_/";
const OFFER_MSG = encodeURIComponent(
  "Hi Readyflow, I’m interested in the ₹14,999 Instagram Brand Shopify Launch. My brand sells ______ and I want to know the next steps.",
);

const POLICY_LINKS = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms" },
  { label: "Refund/Cancellation Policy", path: "/refund-cancellation-policy" },
  { label: "Delivery & Scope Policy", path: "/delivery-scope-policy" },
];

export default function Footer() {
  const [time, setTime] = useState("");
  const location = useLocation();
  const { openLeadFormModal } = useLeadFormModal();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const homeAnchor = (anchor: string) =>
    location.pathname === "/" ? anchor : `/${anchor}`;

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[#F4EFE6] px-6 pb-12 pt-24 text-[#070707] md:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end md:mb-36">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1DFF8A]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
                Social-first Shopify Launch
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl">
              Ready for a clean <br />
              <span className="text-black/20">store customers can trust?</span>
            </h2>
            <p className="mt-8 max-w-xl text-sm font-semibold leading-relaxed text-black/45">
              Focused Shopify launches start at ₹14,999 when product photos,
              prices and basic content are ready. Shopify subscription, domain,
              paid apps, product photos and ad management stay separate.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => {
              const ctaParams = {
                cta_label: "Check My Brand Fit",
                section: "footer",
                destination: "lead_form_modal",
              };
              trackCTAClick(ctaParams);
              openLeadFormModal({
                cta_label: ctaParams.cta_label,
                source_section: ctaParams.section,
              });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#070707] text-[#1DFF8A] shadow-2xl md:h-64 md:w-64 md:rounded-full"
          >
            <span className="absolute inset-0 translate-y-full bg-[#1DFF8A] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
            <span className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] group-hover:text-black md:flex-col">
              Check My Brand Fit
              <ArrowUpRight size={28} className="transition group-hover:rotate-45" />
            </span>
          </motion.button>
        </div>

        <div className="relative mb-20 border-y border-black/5 py-16">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter text-black/[0.035]">
              ReadyFlow
            </span>
          </div>

          <div className="relative z-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-black/20">
                Explore
              </p>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
                <li><a href={homeAnchor("#offer")} className="hover:text-[#0A8F50]">The Offer</a></li>
                <li><a href={homeAnchor("#fit")} className="hover:text-[#0A8F50]">Who It’s For</a></li>
                <li><Link to="/shopify-store-setup-india" className="hover:text-[#0A8F50]">Shopify Setup Guide</Link></li>
                <li><Link to="/clothing-brand-website" className="hover:text-[#0A8F50]">Clothing Brand Website Guide</Link></li>
                <li><Link to="/jewellery-ecommerce-website" className="hover:text-[#0A8F50]">Jewellery Ecommerce Guide</Link></li>
                <li><Link to="/instagram-brand-shopify-store" className="hover:text-[#0A8F50]">Instagram Store Guide</Link></li>
                <li><Link to="/work" className="hover:text-[#0A8F50]">Work Archive</Link></li>
                <li><a href={homeAnchor("#faq")} className="hover:text-[#0A8F50]">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-black/20">
                Connect
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={INSTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackInstagramClick({
                        source_section: "footer",
                        destination_type: "instagram",
                      })
                    }
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-[#0A8F50]"
                  >
                    <Instagram size={14} /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${OFFER_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick({
                        source_section: "footer_social",
                        cta_label: "WhatsApp",
                        channel: "whatsapp",
                      })
                    }
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-[#0A8F50]"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" /> WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-black/20">
                Studio
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#0A8F50]" />
                  <p className="text-[11px] font-black uppercase leading-loose tracking-widest">
                    Indore, Madhya Pradesh
                    <br />
                    India 452001
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="shrink-0 text-[#0A8F50]" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/30">
                      Local Time (IST)
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-widest tabular-nums">
                      {time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="policy-links">
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-black/20">
                Policies
              </p>
              <ul className="space-y-3">
                {POLICY_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-black/35 transition hover:text-[#0A8F50]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="text-[9px] font-black uppercase tracking-[0.45em] text-black/25">
            © {new Date().getFullYear()} ReadyFlow
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-black/20">
            Founder-led Shopify storefront setup · Indore, India
          </span>
        </div>
      </div>
    </footer>
  );
}
