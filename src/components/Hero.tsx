import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  LayoutGrid,
  Smartphone,
  Store,
} from "lucide-react";
import { trackCTAClick } from "../lib/metaPixel";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLeadFormModal } from "./LeadFormModalContext";

const EXPO = [0.16, 1, 0.3, 1] as const;

const TICKER = [
  "Instagram Product Brands",
  "Mobile-first Shopify Store",
  "Product & Collection Setup",
  "Checkout Setup Guidance",
  "WhatsApp Contact Flow",
  "Policy Page Setup",
  "3–5 Day Build",
  "Founder-led Process",
];

const PROOF_POINTS = [
  { value: "30+", label: "Real deployments", icon: Store },
  { value: "India", label: "Product-brand focus", icon: Smartphone },
  { value: "1:1", label: "Founder-led process", icon: WhatsAppIcon },
  { value: "Shopify", label: "Focused setup", icon: LayoutGrid },
];

function useWaveMesh(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const viewportWidth = window.innerWidth;
    const { cols, rows } =
      viewportWidth < 768
        ? { cols: 44, rows: 26 }
        : viewportWidth < 1280
          ? { cols: 64, rows: 38 }
          : { cols: 82, rows: 52 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const positions = new Float32Array(cols * rows * 3);
    const colors = new Float32Array(cols * rows * 3);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = (row * cols + col) * 3;
        positions[index] = (col / (cols - 1) - 0.5) * 72;
        positions[index + 1] = (row / (rows - 1) - 0.5) * 48;
        colors[index] = 0.04;
        colors[index + 1] = 0.04;
        colors[index + 2] = 0.04;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    const green = new THREE.Color("#1DFF8A");
    const ink = new THREE.Color(0.04, 0.04, 0.04);
    let time = 0;
    let frameId = 0;
    let running = true;

    const positionArray = geometry.attributes.position.array as Float32Array;
    const colorArray = geometry.attributes.color.array as Float32Array;

    const tick = () => {
      if (running) {
        time += 0.007;

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const index = (row * cols + col) * 3;
            const normalizedX = col / cols;
            const normalizedY = row / rows;
            const wave =
              Math.sin(normalizedX * 6 + time) *
                Math.cos(normalizedY * 4 + time * 0.7) *
                2.2 +
              Math.sin(time * 0.8 + normalizedX * 2) * 0.55;

            positionArray[index + 2] = wave;
            const blend = Math.max(0, (wave + 2.2) / 4.4) * 0.55;
            colorArray[index] = ink.r + (green.r - ink.r) * blend;
            colorArray[index + 1] = ink.g + (green.g - ink.g) * blend;
            colorArray[index + 2] = ink.b + (green.b - ink.b) * blend;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(tick);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onVisibilityChange = () => {
      running = !document.hidden;
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [ref]);
}

function PrimaryCTA() {
  const [hovered, setHovered] = useState(false);
  const { openLeadFormModal } = useLeadFormModal();

  return (
    <motion.button
      type="button"
      onClick={() => {
        const ctaParams = {
          cta_label: "Check My Brand Fit",
          section: "hero",
          destination: "lead_form_modal",
        };
        trackCTAClick(ctaParams);
        openLeadFormModal({
          cta_label: ctaParams.cta_label,
          source_section: ctaParams.section,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-4 overflow-hidden rounded-full bg-[#070707] px-7 py-4 text-xs font-black uppercase tracking-[0.22em] text-[#F4EFE6]"
    >
      <motion.span
        className="absolute inset-0 bg-[#1DFF8A]"
        initial={{ x: "-101%" }}
        animate={{ x: hovered ? "0%" : "-101%" }}
        transition={{ duration: 0.34, ease: EXPO }}
      />
      <motion.span
        className="relative z-10"
        animate={{ color: hovered ? "#070707" : "#F4EFE6" }}
      >
        Check My Brand Fit
      </motion.span>
      <motion.span
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
        animate={{
          background: hovered ? "#070707" : "#1DFF8A",
          rotate: hovered ? 45 : 0,
        }}
      >
        <ArrowUpRight size={14} color={hovered ? "#1DFF8A" : "#070707"} />
      </motion.span>
    </motion.button>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useWaveMesh(canvasRef);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4EFE6]">
      <div
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
      />

      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.032]"
        aria-hidden="true"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <div className="pointer-events-none absolute left-[-6%] top-[-12%] z-[1] h-[62vw] w-[62vw] rounded-full bg-[#1DFF8A]/10 blur-[90px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-center px-6 pb-12 pt-32 md:px-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: EXPO }}
          className="mb-8 flex items-center gap-2.5"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1DFF8A]" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/45">
            Fast Shopify Launch for Instagram Brands
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EXPO }}
          className="max-w-6xl text-[clamp(42px,7vw,96px)] font-black uppercase leading-[0.9] tracking-tighter text-[#070707]"
        >
          Turn Your Instagram Brand{" "}
          <span className="bg-gradient-to-r from-[#243447] via-[#4B7F80] to-[#1DFF8A] bg-clip-text text-transparent">
            Into a Clean Shopify Store
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: EXPO }}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-medium leading-relaxed text-black/60 md:text-lg">
              We build mobile-first Shopify stores for Instagram product brands
              — with product browsing, collections, size chart,
              WhatsApp/contact flow, policy pages and checkout setup guidance.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <CheckCircle2 size={16} className="shrink-0 text-[#0A8F50]" />
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#070707] md:text-sm">
                ₹14,999 setup fee · 3–5 day launch after content is ready
              </p>
            </div>

            <p className="mt-4 max-w-2xl text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-black/40">
              For product brands with photos ready · Shopify subscription &
              domain separate
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <PrimaryCTA />
            <a
              href="#work"
              onClick={() =>
                trackCTAClick({
                  cta_label: "View Real Stores",
                  section: "hero",
                  destination: "work_section",
                })
              }
              className="flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white/70 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#070707] transition hover:border-black/25 hover:bg-white"
            >
              View Real Stores <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.65, ease: EXPO }}
        className="relative z-10 mx-auto w-full max-w-[1380px] px-6 pb-20 md:px-12 md:pb-24"
      >
        <div className="mb-7 h-px bg-black/10" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="flex items-start gap-3">
              <point.icon size={17} className="mt-0.5 text-[#0A8F50]" />
              <div>
                <p className="text-xl font-black tracking-tight text-[#070707] md:text-2xl">
                  {point.value}
                </p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
                  {point.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden bg-[#070707] py-3.5">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-3 px-8 text-[9px] font-black uppercase tracking-[0.28em] text-[#1DFF8A]"
            >
              <span className="h-1 w-1 rounded-full bg-[#1DFF8A]/35" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
