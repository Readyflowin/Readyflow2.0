// Hero.tsx — smoother, conversion-focused, no mouse-follow motion

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowUpRight, Star, BarChart3, Zap, Award, Globe } from "lucide-react";

// ─── Constants
const EXPO = [0.16, 1, 0.3, 1] as const;

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
  { value: 33, suffix: "+", label: "Real Deployments", icon: Zap, decimals: 0 },
  { value: 4.9, suffix: "★", label: "Client Rating", icon: Award, decimals: 1 },
  { value: 3.2, suffix: "×", label: "Avg. ROI Lift", icon: BarChart3, decimals: 1 },
  { value: null, suffix: "", label: "Shopify Partner", icon: Globe, text: "Expert" },
];

const PARTNERS = [
  { file: "logo1.png", name: "Brand A", bg: "#E8D5C4" },
  { file: "logo2.png", name: "Brand B", bg: "#D4E8C4" },
  { file: "logo3.png", name: "Brand C", bg: "#C4D4E8" },
  { file: "logo4.png", name: "Brand D", bg: "#E8C4D4" },
  { file: "logo5.png", name: "Brand E", bg: "#E8E4C4" },
];

// ─── THREE.JS: optimized wave mesh (no mouse movement)
function useWaveMesh(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vw = window.innerWidth;
    const { COLS, ROWS } =
      vw < 768 ? { COLS: 50, ROWS: 30 } :
      vw < 1280 ? { COLS: 70, ROWS: 42 } :
      { COLS: 90, ROWS: 60 };

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const POS = new Float32Array(COLS * ROWS * 3);
    const COL = new Float32Array(COLS * ROWS * 3);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = (r * COLS + c) * 3;
        POS[i] = (c / (COLS - 1) - 0.5) * 72;
        POS[i + 1] = (r / (ROWS - 1) - 0.5) * 48;
        POS[i + 2] = 0;

        COL[i] = 0.04;
        COL[i + 1] = 0.04;
        COL[i + 2] = 0.04;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(POS, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(COL, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    const g = new THREE.Color("#1DFF8A");
    const ink = new THREE.Color(0.04, 0.04, 0.04);

    const gR = g.r;
    const gG = g.g;
    const gB = g.b;
    const iR = ink.r;
    const iG = ink.g;
    const iB = ink.b;

    let t = 0;
    let rafId: number | null = null;
    let running = true;

    const posArr = geo.attributes.position.array as Float32Array;
    const colArr = geo.attributes.color.array as Float32Array;

    const tick = () => {
      if (!running) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      t += 0.007;

      const rows = ROWS;
      const cols = COLS;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 3;
          const nx = c / cols;
          const ny = r / rows;

          const wave =
            Math.sin(nx * 6 + t) * Math.cos(ny * 4 + t * 0.7) * 2.2 +
            Math.sin(t * 0.8 + nx * 2.0) * 0.55 +
            Math.cos(t * 0.6 + ny * 2.5) * 0.35;

          posArr[i + 2] = wave;

          const s = Math.max(0, (wave + 2.2) / 4.4);
          const factor = s * 0.55;

          colArr[i] = iR + (gR - iR) * factor;
          colArr[i + 1] = iG + (gG - iG) * factor;
          colArr[i + 2] = iB + (gB - iB) * factor;
        }
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      mesh.rotation.z = Math.sin(t * 0.09) * 0.025;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    let resizeTimer: any = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        const newDPR = Math.min(window.devicePixelRatio || 1, 1.25);
        if (Math.abs(newDPR - (renderer.getPixelRatio() || 1)) > 0.01) {
          renderer.setPixelRatio(newDPR);
        }

        renderer.setSize(w, h);
      }, 120);
    };

    window.addEventListener("resize", onResize, { passive: true });

    const onVisibility = () => {
      running = !document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (resizeTimer) clearTimeout(resizeTimer);

      try {
        mat.dispose();
        geo.dispose();
        mesh.geometry?.dispose?.();
        renderer.dispose();
      } catch {
        // ignore cleanup errors
      }

      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [ref]);
}

// ─── CTA (no mouse tracking)
function MagneticCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/#pricing"
      style={{ background: "#070707", color: "#F4EFE6" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="relative flex items-center gap-4 px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] overflow-hidden cursor-pointer shrink-0"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "#1DFF8A" }}
        initial={{ x: "-101%" }}
        animate={{ x: hovered ? "0%" : "-101%" }}
        transition={{ duration: 0.34, ease: EXPO }}
      />
      <motion.span
        className="relative z-10 font-black"
        animate={{ color: hovered ? "#070707" : "#F4EFE6" }}
        transition={{ duration: 0.18 }}
      >
        Start Your Project
      </motion.span>
      <motion.div
        className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
        animate={{
          background: hovered ? "#070707" : "#1DFF8A",
          rotate: hovered ? 45 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight size={14} style={{ color: hovered ? "#1DFF8A" : "#070707" }} />
      </motion.div>
    </motion.a>
  );
}

// ─── Count-up number
function CountUp({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1600;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((ease * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [to, decimals]);

  return (
    <>
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
}

// ─── Words reveal
function Words({
  text,
  delay = 0,
  className = "",
  serif = false,
  outline = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  serif?: boolean;
  outline?: boolean;
}) {
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.2em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: delay + i * 0.07, duration: 0.72, ease: EXPO }}
            style={
              serif
                ? { fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300 }
                : outline
                  ? { WebkitTextStroke: "2.5px #070707", color: "transparent" }
                  : {}
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Logo avatar with fallback
function Logo({ p, size = 44 }: { p: typeof PARTNERS[number]; size?: number }) {
  const [err, setErr] = useState(false);

  return (
    <div
      className="rounded-full overflow-hidden shrink-0 shadow-sm"
      style={{ width: size, height: size, border: "2.5px solid #F4EFE6", background: p.bg }}
    >
      {!err ? (
        <img
          src={`/${p.file}`}
          alt={p.name}
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-black text-[10px]"
          style={{ color: "#070707" }}
        >
          {p.name[0]}
        </div>
      )}
    </div>
  );
}

// ─── Hero
export default function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useWaveMesh(canvasRef);

  const statsRef = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCounting(true);
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
      style={{ background: "#F4EFE6" }}
    >
      <style>{`
        @keyframes shopifyGlow {
          0% {
            text-shadow: 0 8px 20px rgba(29,255,138,0.03), 0 0 0 rgba(29,255,138,0);
            filter: drop-shadow(0 8px 20px rgba(29,255,138,0.02));
          }
          50% {
            text-shadow: 0 18px 46px rgba(29,255,138,0.08), 0 0 12px rgba(29,255,138,0.03);
            filter: drop-shadow(0 18px 46px rgba(29,255,138,0.05));
          }
          100% {
            text-shadow: 0 8px 20px rgba(29,255,138,0.03), 0 0 0 rgba(29,255,138,0);
            filter: drop-shadow(0 8px 20px rgba(29,255,138,0.02));
          }
        }
        .shopify-glow {
          animation: shopifyGlow 2.8s ease-in-out infinite;
          will-change: transform, text-shadow, filter;
        }
      `}</style>

      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.2 }}
      />

      <svg
        className="absolute inset-0 z-[1] w-full h-full pointer-events-none"
        style={{ opacity: 0.032 }}
        aria-hidden="true"
      >
        <filter id="hg">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hg)" />
      </svg>

      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: "-12%",
          left: "-6%",
          width: "62vw",
          height: "62vw",
          background: "radial-gradient(circle, rgba(29,255,138,0.08) 0%, transparent 68%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          bottom: "-8%",
          right: "-4%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(255,165,70,0.06) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />

      <motion.div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1380px] mx-auto px-6 md:px-12 pt-28 pb-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EXPO }}
          className="flex items-center gap-2.5 mb-9"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#1DFF8A] animate-pulse" />
          <span
            className="text-[9px] font-black tracking-[0.32em] uppercase"
            style={{ color: "rgba(7,7,7,0.38)" }}
          >
            Fast Launch Websites
          </span>
        </motion.div>

        {/* HEADLINE */}
        <div className="mb-8">
          {/* Line 1 */}
          <div
            className="font-black uppercase tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(48px, 9vw, 130px)", color: "#070707" }}
          >
            <Words text="Get Your Website" delay={0.22} />
          </div>

          {/* Line 2 (highlight) */}
          <div
            className="relative inline-block leading-[0.88]"
            style={{ fontSize: "clamp(48px, 9vw, 130px)" }}
          >
            <motion.div
              className="shopify-glow"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
              style={{
                display: "inline-block",
                color: "transparent",
                background: "linear-gradient(90deg, #243447 0%, #4B7F80 50%, #1DFF8A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontWeight: 900,
              }}
            >
              <Words text="Live in 72 Hours" delay={0.34} />
            </motion.div>
          </div>

          {/* Line 3 */}
          <div
            className="font-black uppercase tracking-tighter leading-[0.88] flex flex-wrap items-baseline gap-x-[0.2em] gap-y-0"
            style={{ fontSize: "clamp(42px, 8vw, 120px)", color: "#070707" }}
          >
            <Words text="Plans Starting" delay={0.46} />
            <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
              <Words text="From ₹6999" delay={0.58} />
              <motion.span
                className="inline-block font-black uppercase"
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.66, duration: 0.72, ease: EXPO }}
                style={{ WebkitTextStroke: "2.5px #070707", color: "transparent", whiteSpace: "nowrap" }}
              >
                
              </motion.span>
            </span>
          </div>
        </div>

        {/* Subheading & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.65, ease: EXPO }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
        >
          <p
            className="max-w-md text-sm md:text-base font-medium leading-relaxed"
            style={{ color: "rgba(7,7,7,0.5)" }}
          >
            We build <span className="font-black text-[#070707]">Premium Storefronts</span> for brands that want speed, trust, and more sales.
          </p>
          <MagneticCTA />
        </motion.div>
      </motion.div>

      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.65, ease: EXPO }}
        className="relative z-10 w-full max-w-[1380px] mx-auto px-6 md:px-12 pb-24"
      >
        <div className="w-full mb-8" style={{ height: "1px", background: "rgba(7,7,7,0.08)" }} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-14 flex-1">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.09, ease: EXPO, duration: 0.5 }}
              >
                <p
                  className="font-black tabular-nums leading-none mb-1.5"
                  style={{ fontSize: "clamp(22px, 3vw, 34px)", color: "#070707" }}
                >
                  {s.value !== null
                    ? counting
                      ? <CountUp to={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                      : `${s.value}${s.suffix}`
                    : s.text}
                </p>
                <p
                  className="text-[9px] font-black tracking-[0.22em] uppercase"
                  style={{ color: "rgba(7,7,7,0.3)" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.55, ease: EXPO }}
            className="flex items-center gap-4 shrink-0"
          >
            <div className="flex -space-x-3">
              {PARTNERS.map((p, i) => (
                <div key={i} style={{ zIndex: PARTNERS.length - i }}>
                  <Logo p={p} />
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="#1DFF8A" color="#1DFF8A" />
                ))}
              </div>
              <p
                className="text-[9px] font-black tracking-[0.22em] uppercase"
                style={{ color: "rgba(7,7,7,0.35)" }}
              >
                Trusted by 33+ Indian Brands
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: EXPO }}
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-3.5"
        style={{ background: "#070707" }}
      >
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-8 text-[9px] font-black tracking-[0.3em] uppercase"
              style={{ color: "#1DFF8A" }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "rgba(29,255,138,0.35)" }}
              />
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}