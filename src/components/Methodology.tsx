import { motion, type Variants } from "framer-motion";
import { Laptop, Search, MapPin, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; //

// ─── Constants (SEO-Engineered & Brand Neutral) ──────────────────────────────

const PILLARS = [
  {
    title: "Development",
    hook: "Custom Shopify & React",
    desc: "We engineer high-performance Shopify stores and Headless React storefronts optimized for speed and Core Web Vitals. Our architecture ensures your site loads in under 2 seconds, ready to scale.",
    icon: Laptop,
    color: "bg-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-100"
  },
  {
    title: "Search Strategy",
    hook: "Technical SEO & GSC Setup",
    desc: "Visibility is a byproduct of precision. We utilize Google Search Console (GSC) analytics and technical SEO to eliminate crawl errors and optimize metadata for long-term organic dominance.",
    icon: Search,
    color: "bg-sky-50",
    accent: "text-sky-600",
    border: "border-sky-100"
  },
  {
    title: "Local Authority",
    hook: "Hyper-Local GMB Optimization",
    desc: "In the Indian market, digital trust is built locally. We provide comprehensive Google My Business (GMB) optimization to maximize your visibility in local search results and drive brand authority.",
    icon: MapPin,
    color: "bg-violet-50",
    accent: "text-violet-600",
    border: "border-violet-100"
  },
  {
    title: "Proven Growth",
    hook: "Data-Driven Performance",
    desc: "Our methodology is validated by measurable growth metrics. We deliver high-converting technical solutions that turn browsers into loyal customers through strategic engineering.",
    icon: BarChart3,
    color: "bg-rose-50",
    accent: "text-rose-600",
    border: "border-rose-100"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Methodology() {
  return (
    <section className="relative pt-4 pb-0 bg-[#F4EFE6] overflow-hidden" id="services">
      
      <motion.div 
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p variants={itemVariants} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
            The ReadyFlow Growth Stack
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-black text-[#070707] uppercase tracking-tighter leading-[0.9]">
            How we Engineer <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
              Your Digital Success.
            </span>
          </motion.h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              transition={{ duration: 0.1, ease: "easeOut" }}
              whileHover={{ y: -12 }}
              className={`group p-8 rounded-[2.5rem] border ${pillar.border} ${pillar.color} flex flex-col h-full cursor-default hover:shadow-xl hover:shadow-black/5`}
            >
              <motion.div 
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm"
              >
                <pillar.icon size={28} className={pillar.accent} />
              </motion.div>

              <div className="flex-grow">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-2xl font-black text-[#070707] mb-6 tracking-tight">
                  {pillar.hook}
                </p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* */}
              <Link 
                to="/work"
                className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#070707] opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-pointer"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* */}
        <motion.div variants={itemVariants} className="mt-20 mb-24 flex justify-center">
          <Link 
            to="/work"
            className="px-10 py-5 bg-[#070707] text-[#F4EFE6] rounded-full font-black text-[10px] uppercase tracking-[0.25em] shadow-2xl hover:bg-[#1DFF8A] hover:text-[#070707] transition-all duration-200 inline-block text-center"
          >
            View Success Stories
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Blobs */}
      <div className="absolute top-1/2 left-[-10%] w-[50vw] h-[50vw] bg-emerald-100/20 blur-[120px] rounded-full -z-10 animate-melt" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-sky-100/20 blur-[120px] rounded-full -z-10 animate-melt [animation-delay:5s]" />
    </section>
  );
}