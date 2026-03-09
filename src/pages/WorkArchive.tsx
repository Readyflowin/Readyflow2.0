import { motion } from "framer-motion";
import { Instagram, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const PROJECTS = [
  {
    id: "01",
    name: "Deazy.in",
    niche: "Clothing / Streetwear",
    status: "Under Development",
    followers: "154K+",
    insta: "https://www.instagram.com/crazysha01/",
    web: "https://deazy.in/",
    highlight: "Engineered for massive influencer-led traffic spikes."
  },
  {
    id: "02",
    name: "Hopup Clothing",
    niche: "Clothing / Urban",
    status: "Live Deployment",
    followers: "34K+",
    insta: "https://www.instagram.com/hopup__/",
    web: "https://hopupclothing.in/",
    highlight: "High-conversion storefront for high-volume sales."
  },
  {
    id: "03",
    name: "Zain Aesthetics",
    niche: "Clothing / Fashion",
    status: "Live Deployment",
    followers: "13.6K+",
    insta: "https://www.instagram.com/zainaesthetics.in/",
    web: "https://zainaesthetics.in/",
    highlight: "Premium layout tailored for aesthetic brand identity."
  },
  {
    id: "04",
    name: "Confelion",
    niche: "Clothing / Premium",
    status: "Live Deployment",
    followers: "3K+",
    insta: "https://www.instagram.com/confelion_/",
    web: "https://confelion.store/",
    highlight: "Luxury-focused e-commerce deployment."
  },
  {
    id: "05",
    name: "Haelo",
    niche: "Dropshipping",
    status: "Live Deployment",
    web: "https://haelo.shop/",
    highlight: "Performance-first store for rapid product testing."
  },
  {
    id: "06",
    name: "TrulyEco",
    niche: "D2C Brand / Sustainable",
    status: "Legacy Deployment",
    web: "https://trulyeco.org/",
    highlight: "Scalable architecture for direct-to-consumer retail."
  },
  {
    id: "07",
    name: "Mera Printers",
    niche: "Printing Business",
    status: "Legacy Deployment",
    web: "https://meraprinters.com/",
    highlight: "Industrial B2B platform for custom order management."
  },
  {
    id: "08",
    name: "Devsocs",
    niche: "Digital Product",
    status: "Legacy Deployment",
    web: "https://devsocs.store/",
    highlight: "High-performance technical landing page."
  },
  {
    id: "09",
    name: "Mimito",
    niche: "Kidswear",
    status: "Legacy Deployment",
    web: "https://mimito.in/",
    highlight: "Clean, conversion-focused niche clothing store."
  },
  {
    id: "10",
    name: "Dharmiq Hub",
    niche: "Pujan Path Items",
    status: "Legacy Deployment",
    web: "https://dharmiqhub.in/",
    highlight: "Specialized spiritual e-commerce experience."
  }
];

export default function WorkArchive() {
  return (
    <main className="bg-[#F4EFE6] min-h-screen text-[#070707] pt-32 pb-12 px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 mb-8 transition-opacity">
              <ArrowLeft size={12} /> Back to Studio
            </Link>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
              Work <br /> <span className="text-black/10">Archive</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">ReadyFlow Build Ledger // 2026</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">Scroll to Explore</p>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-0 border-t border-black/10">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group py-12 md:py-16 border-b border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative hover:bg-black/[0.01] transition-colors"
            >
              <div className="flex gap-6 md:gap-12 items-start max-w-2xl">
                <span className="text-[10px] md:text-xs font-black text-black/20 mt-1">{project.id}</span>
                <div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#1DFF8A] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full border border-black/5 text-[9px] font-black uppercase tracking-widest bg-white/50">{project.niche}</span>
                    <span className="px-3 py-1 rounded-full border border-black/5 text-[9px] font-black uppercase tracking-widest text-black/40 italic">{project.status}</span>
                    {project.followers && (
                      <span className="px-3 py-1 rounded-full bg-black text-[#1DFF8A] text-[9px] font-black uppercase tracking-widest">{project.followers} Followers</span>
                    )}
                  </div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40 leading-relaxed max-w-md">
                    {project.highlight}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <a 
                  href={project.web} target="_blank" rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#070707] text-[#F4EFE6] rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#1DFF8A] hover:text-[#070707] transition-all"
                >
                  Visit <Globe size={14} />
                </a>
                {project.insta && (
                  <a 
                    href={project.insta} target="_blank" rel="noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 border border-black/5 bg-white/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:border-black transition-all"
                  >
                    Insta <Instagram size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}