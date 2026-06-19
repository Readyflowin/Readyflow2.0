import { motion } from "framer-motion";
import { Instagram, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const PROJECTS = [
  {
    id: "01",
    name: "Confelion",
    niche: "Clothing / Premium",
    status: "Live Deployment",
    insta: "https://www.instagram.com/confelion_/",
    web: "https://confelion.store/",
    highlight: "Premium clothing storefront with a clean catalogue structure.",
    image: "/Pastwork/confelion.png",
  },
  {
    id: "02",
    name: "Deazy.in",
    niche: "Clothing / Streetwear",
    status: "Under Development",
    insta: "https://www.instagram.com/crazysha01/",
    web: "https://deazy.in/",
    highlight: "Storefront structure for an Instagram-led streetwear brand.",
    image: "/Pastwork/deazy%20(2).png",
  },
  {
    id: "03",
    name: "Manish Fashion Hub",
    niche: "Clothing / Fashion",
    status: "Live Deployment",
    insta: "https://www.instagram.com/vickydewangan.29?igsh=cm9reGowZWtjOHVn",
    web: "https://manishfashionhub.in/",
    highlight: "Fashion storefront organised for product browsing and social traffic.",
    image: "/Pastwork/manishfasion.png",
  },
  {
    id: "04",
    name: "LK Print Nation",
    niche: "Clothing / Print",
    status: "Live Deployment",
    insta: "https://www.instagram.com/lkprintnation/",
    web: "https://lkprintnation.in/",
    highlight: "Printed clothing store organised for catalogue-led browsing.",
    image: "/Pastwork/lkprint.png",
  },
  {
    id: "05",
    name: "Pearll.in",
    niche: "Artificial Jewellery",
    status: "Live Deployment",
    web: "https://pearll.in/",
    highlight: "Elegant jewellery storefront designed for premium presentation.",
    image: "/Pastwork/pearll.png",
  },
  {
    id: "06",
    name: "Haelo",
    niche: "Dropshipping",
    status: "Live Deployment",
    web: "https://haelo.shop/",
    highlight: "Product store structured for clear browsing and catalogue updates.",
    image: "/Pastwork/haeloo.png",
  },
  {
    id: "07",
    name: "TrulyEco",
    niche: "D2C Brand / Sustainable",
    status: "Legacy Deployment",
    web: "https://trulyeco.org/",
    highlight: "Direct-to-consumer storefront for a sustainable product brand.",
    image: "/Pastwork/Screenshot%202026-06-20%20011242.png",
  },
  {
    id: "08",
    name: "Devsocs",
    niche: "Digital Product",
    status: "Legacy Deployment",
    web: "https://devsocs.store/",
    highlight: "Technical storefront for a digital product project.",
    image: "/Pastwork/devsocs.png",
  },
  {
    id: "09",
    name: "Dharmiq Hub",
    niche: "Pujan Path Items",
    status: "Legacy Deployment",
    web: "https://dharmiqhub.in/",
    highlight: "Specialized spiritual e-commerce experience.",
    image: "/Pastwork/dharmiqhub.png",
  },
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
                  </div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40 leading-relaxed max-w-md">
                    {project.highlight}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[22rem]">
                <a
                  href={project.web}
                  target="_blank"
                  rel="noreferrer"
                  className="group/image block aspect-video overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm"
                >
                  <img
                    src={project.image}
                    alt={`${project.name} storefront screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-700 group-hover/image:scale-[1.035]"
                  />
                </a>
                <div className="mt-4 flex gap-3">
                  <a 
                    href={project.web} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#070707] text-[#F4EFE6] rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#1DFF8A] hover:text-[#070707] transition-all"
                  >
                    Visit <Globe size={14} />
                  </a>
                  {project.insta && (
                    <a 
                      href={project.insta} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-black/5 bg-white/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:border-black transition-all"
                    >
                      Insta <Instagram size={14} />
                    </a>
                  )}
                </div>
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
