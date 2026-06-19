import { motion } from "framer-motion";

const BRANDS = [
  "Confelion",
  "Deazy.in",
  "Manish Fashion Hub",
  "LK Print Nation",
  "Pearll.in",
  "Haelo",
  "TrulyEco",
  "Devsocs",
  "Dharmiq Hub",
];

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-black/5 bg-[#F4EFE6] py-20">
      <p className="mb-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-black/35">
        Real client stores and project names from the Readyflow archive
      </p>

      <div className="relative flex items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[#F4EFE6] to-transparent md:w-40" />
        <div className="absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[#F4EFE6] to-transparent md:w-40" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-16 px-8 md:gap-24 md:px-12"
        >
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="whitespace-nowrap text-3xl font-black uppercase tracking-tighter text-[#070707]/15 transition hover:text-[#070707] md:text-5xl"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
