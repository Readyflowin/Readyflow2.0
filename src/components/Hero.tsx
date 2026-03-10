import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import * as THREE from "three";
import { ArrowUpRight, Star, BarChart3, Zap, Award, Globe } from "lucide-react";

const TICKER = [
  "Shopify Development",
  "Custom React Storefronts",
  "E-commerce Growth",
  "Conversion Rate Optimisation",
  "Performance Audits",
  "Store Migration",
  "Custom Web Apps",
  "UI/UX for E-commerce",
];

const STATS = [
  { value: "33+", label: "Real Deployments", icon: Zap },
  { value: "4.9★", label: "Client Rating",    icon: Award },
  { value: "3.2×",  label: "Avg. ROI Lift",    icon: BarChart3 },
  { value: "Shopify", label: "Partner Expert", icon: Globe },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

function useWaveMesh(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 32);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const COLS = 80, ROWS = 50;
    const geo = new THREE.BufferGeometry();
    const POS = new Float32Array(COLS * ROWS * 3);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = (r * COLS + c) * 3;
        POS[i] = (c / (COLS - 1) - 0.5) * 75;
        POS[i + 1] = (r / (ROWS - 1) - 0.5) * 50;
      }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(POS, 3));
    const mat = new THREE.PointsMaterial({ size: 0.08, color: 0x070707, transparent: true, opacity: 0.15 });
    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    let t = 0;
    const tick = () => {
      t += 0.005;
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 2] = Math.sin(pos[i] / 5 + t) * Math.cos(pos[i+1] / 5 + t) * 2;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
    return () => { if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);
}

function PremiumCTA() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="/#pricing"
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-5 px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.25em] overflow-hidden bg-[#070707] text-[#F4EFE6] cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 bg-[#1DFF8A]" 
        initial={{ y: "100%" }} animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] } as any}
      />
      <span className="relative z-10 transition-colors duration-300" style={{ color: hovered ? "#070707" : "#F4EFE6" }}>
        Start Your Project
      </span>
      <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-black/10">
        <ArrowUpRight size={18} className={hovered ? "text-black" : "text-[#1DFF8A]"} />
      </div>
    </motion.a>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useWaveMesh(canvasRef);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F4EFE6] pt-36 md:pt-40">
      
      {/* Background Layers */}
      <div className="absolute top-[-5%] left-[-5%] w-[70vw] h-[70vw] bg-[#1DFF8A]/10 blur-[120px] rounded-full animate-melt" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-orange-100/30 blur-[150px] rounded-full animate-melt [animation-delay:5s]" />
      <div ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />

      <motion.div 
        variants={containerVariants} initial="hidden" animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* SEO BRAND TAG: Switched to high-contrast black/slate for visibility */}
        <motion.span 
          variants={itemVariants} 
          className="text-[#070707] font-black uppercase tracking-[0.4em] text-[9px] md:text-xs mb-6 px-4 py-2 rounded-full border border-black/5 bg-black/5 block"
        >
          ReadyFlow Studio <span className="text-slate-400 mx-2">—</span> <span className="text-slate-500">India's Trusted Shopify Partner</span>
        </motion.span>

        <h1 className="text-5xl md:text-8xl lg:text-[130px] font-black text-[#070707] tracking-tighter leading-[0.85] mb-6 md:mb-8 uppercase">
          <motion.span variants={itemVariants} className="block">Scale Your</motion.span>
          <motion.span variants={itemVariants} className="block animate-text-gradient bg-gradient-to-r from-[#070707] via-slate-600 to-[#1DFF8A] bg-clip-text text-transparent">
            eCommerce
          </motion.span>
          <motion.span variants={itemVariants} className="block">Without Bleeding Cash</motion.span>
        </h1>

        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-8 md:mb-12 font-medium leading-relaxed">
          We architect high-performance <span className="text-[#070707] font-bold">Shopify stores</span> and custom <span className="text-[#070707] font-bold">React websites</span> that turn browsers into buyers — profitably
        </motion.p>

        {/* Action Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 mb-16 md:mb-20">
          <PremiumCTA />
          
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <div className="flex -space-x-4">
              {["logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo5.png"].map((file, i) => (
                <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-[#F4EFE6] overflow-hidden shadow-lg bg-white">
                    <img src={`/${file}`} alt={`ReadyFlow Partner Logo ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              {/* GOLD STARS: Using high-contrast Amber/Gold and Lucide Icons */}
              <div className="flex text-[#F59E0B] gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-[#070707]/60 uppercase">Trusted by 33+ Indian Brands</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-30 grid grid-cols-4 gap-2 md:gap-12 py-8 md:py-12 border-t border-black/5 mb-12 md:mb-16 w-full">
          {STATS.map((s, idx) => (
            <motion.div 
              key={idx} variants={itemVariants}
              whileHover={{ y: -18, scale: 1.05 }}
              className="group flex flex-col items-center cursor-default"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white shadow-sm border border-black/5 rounded-xl md:rounded-[2rem] flex items-center justify-center mb-3 md:mb-6 icon-glow transition-all duration-500">
                <s.icon size={22} strokeWidth={2.5} className="text-slate-400 group-hover:text-[#1DFF8A] transition-colors duration-300" />
              </div>
              <span className="text-sm md:text-4xl font-black text-[#070707]">{s.value}</span>
              <span className="text-[7px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] text-slate-400 uppercase mt-1 md:mt-2 text-center px-1">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#070707] py-5 z-20 overflow-hidden shadow-[0_-15px_50px_rgba(0,0,0,0.2)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="px-12 text-[10px] font-black tracking-[0.4em] uppercase text-[#1DFF8A] flex items-center gap-5">
              <div className="w-1.5 h-1.5 bg-[#1DFF8A]/30 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}