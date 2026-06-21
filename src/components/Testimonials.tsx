import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackCTAClick, trackExternalProjectClick } from "../lib/metaPixel";

const PROJECTS = [
  {
    name: "Confelion",
    category: "Premium clothing",
    status: "Live deployment",
    url: "https://confelion.store/",
    image: "/Pastwork/confelion.png",
  },
  {
    name: "Deazy.in",
    category: "Streetwear",
    status: "Under development",
    url: "https://deazy.in/",
    image: "/Pastwork/deazy%20(2).png",
  },
  {
    name: "Manish Fashion Hub",
    category: "Fashion",
    status: "Live deployment",
    url: "https://manishfashionhub.in/",
    image: "/Pastwork/manishfasion.png",
  },
  {
    name: "LK Print Nation",
    category: "Printed clothing",
    status: "Live deployment",
    url: "https://lkprintnation.in/",
    image: "/Pastwork/lkprint.png",
  },
  {
    name: "Pearll.in",
    category: "Artificial jewellery",
    status: "Live deployment",
    url: "https://pearll.in/",
    image: "/Pastwork/pearll.png",
  },
  {
    name: "Haelo",
    category: "Product store",
    status: "Live deployment",
    url: "https://haelo.shop/",
    image: "/Pastwork/haeloo.png",
  },
  {
    name: "TrulyEco",
    category: "Sustainable D2C",
    status: "Legacy deployment",
    url: "https://trulyeco.org/",
    image: "/Pastwork/Screenshot%202026-06-20%20011242.png",
  },
  {
    name: "Devsocs",
    category: "Digital product",
    status: "Legacy deployment",
    url: "https://devsocs.store/",
    image: "/Pastwork/devsocs.png",
  },
  {
    name: "Dharmiq Hub",
    category: "Pujan products",
    status: "Legacy deployment",
    url: "https://dharmiqhub.in/",
    image: "/Pastwork/dharmiqhub.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Testimonials() {
  return (
    <section
      className="relative scroll-mt-32 overflow-hidden bg-[#F4EFE6] py-24 md:scroll-mt-36 md:py-32"
      id="work"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6"
      >
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <motion.p
              variants={itemVariants}
              className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-black/35"
            >
              Existing Readyflow project archive
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-black uppercase leading-[0.92] tracking-tighter text-[#070707] md:text-7xl"
            >
              Real stores built for{" "}
              <span className="text-black/32">social-first product brands</span>
            </motion.h2>
          </div>
          <motion.p
            variants={itemVariants}
            className="max-w-sm text-sm font-medium leading-relaxed text-black/45"
          >
            Project screenshots from Readyflow’s product-brand archive —
            fashion, jewellery, product stores and social-first brands.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <motion.a
              key={project.name}
              variants={itemVariants}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackExternalProjectClick({
                  source_section: "homepage_work",
                  project_category: project.category,
                  destination_type: "live_site",
                })
              }
              className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white text-[#070707] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden bg-black/5">
                <img
                  src={project.image}
                  alt={`${project.name} storefront screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#070707]/85 px-3 py-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#1DFF8A] backdrop-blur">
                  {project.status}
                </span>
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1DFF8A] text-[#070707] shadow-lg transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  {project.name}
                </h3>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-black/35">
                  {project.category}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <Link
            to="/work"
            onClick={() =>
              trackCTAClick({
                cta_label: "View Full Work Archive",
                section: "work_preview",
                destination: "/work",
              })
            }
            className="inline-flex items-center gap-3 rounded-full bg-[#070707] px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#F4EFE6] transition hover:bg-[#1DFF8A] hover:text-[#070707]"
          >
            View Full Work Archive <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
