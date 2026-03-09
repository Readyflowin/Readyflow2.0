import { motion, type Variants } from "framer-motion";
import { Star, Instagram, ArrowUpRight, ShieldCheck } from "lucide-react";

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

export default function Testimonials() {
  return (
    // FIX: Reduced pt-24 to pt-8 to remove the large empty gap
    <section className="relative pt-8 pb-24 bg-[#F4EFE6] overflow-hidden" id="work">
      <motion.div 
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Header */}
        {/* FIX: Reduced mb-20 to mb-12 for a tighter look */}
        <div className="mb-12 text-center">
          <motion.p variants={itemVariants} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
            Real People. Real Brands.
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-black text-[#070707] uppercase tracking-tighter leading-tight">
            Partners in growth <br /> 
            <span className="font-serif font-light lowercase text-slate-500">from vision to scale</span>
          </motion.h2>
        </div>

        {/* The Ultimate Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          
          {/* Card 1: Naveen - TrulyEco */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group cursor-default min-h-[460px]"
          >
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/50 transition-colors duration-300" />
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="TrulyEco Success"
            />
            <div className="relative z-20 h-full p-10 flex flex-col justify-end">
              <p className="text-[10px] font-black text-[#1DFF8A] uppercase tracking-[0.3em] mb-4">Founder's Choice</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                "Readyflow team especially Aditya helped us in almost everything, Local SEO, GMB Website har chiz me. Nice guy and Recommend working with them."
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white uppercase text-xs tracking-widest">Naveen</p>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Founder, TrulyEco</p>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[#1DFF8A] text-[9px] font-black uppercase tracking-widest">
                  SEO Leader
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Manish - Confelion */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.1 } }}
            className="md:col-span-2 bg-white rounded-[2.5rem] p-10 flex flex-col justify-between border border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-black/5">
                <Instagram size={16} className="text-pink-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">2.8K+ Followers</span>
              </div>
              <a href="https://www.instagram.com/confelion_/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#1DFF8A] hover:text-black transition-colors">
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#070707] leading-tight mb-4">
                "Ab me sirf content banane pe focus kar sakta hu, Thankyou Readyflow."
              </h3>
              <p className="font-black text-xs uppercase text-slate-400 tracking-wider">Manish — Founder, Confelion</p>
            </div>
          </motion.div>

          {/* Card 3: Abhi - Hopup */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.1 } }}
            className="bg-[#070707] rounded-[2.5rem] p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[10px] font-black text-[#1DFF8A] uppercase tracking-widest">36.2K Followers</span>
              <Instagram size={18} className="text-[#1DFF8A]" />
            </div>
            <h3 className="relative z-10 text-base font-bold text-[#F4EFE6] leading-snug">
              "Bhai, drop day par site crash hone ka darr hamesha rehta tha. ReadyFlow ne setup eysa kiya ki sab kuch makhan chalta hai."
            </h3>
            <div className="relative z-10 flex justify-between items-end">
              <p className="text-[9px] font-bold text-white/40 uppercase">Abhi — Founder, Hopup</p>
              <a href="https://www.instagram.com/hopup__/" target="_blank" rel="noreferrer">
                <ArrowUpRight size={14} className="text-[#1DFF8A]" />
              </a>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1DFF8A]/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Card 4: Mukesh Rajpurohit - Mimito */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.1 } }}
            className="md:col-span-1 bg-sky-50 rounded-[2.5rem] p-8 flex flex-col justify-between border border-sky-100"
          >
             <ShieldCheck size={24} className="text-sky-600" />
             <h4 className="text-[15px] font-bold text-slate-800 leading-tight">"Technical chizein hamesha mere sar ke upar se jati thi. Inhone itne simple tarike se samjhaya aur setup kiya."</h4>
             <p className="text-[9px] font-bold text-sky-700/60 uppercase tracking-widest">Mukesh Rajpurohit — Mimito.in</p>
          </motion.div>

          {/* Card 5: Raghav Gupta - Haelo */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.1 } }}
            className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 flex items-center justify-between border border-black/5"
          >
             <div className="max-w-[75%]">
               <p className="text-lg font-bold text-[#070707] leading-snug">"Launching fast was my priority. ReadyFlow delivered our storefront in record time. The UI quality exceeded expectations."</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase mt-4 tracking-wider">Raghav Gupta — Founder, Haelo.shop</p>
             </div>
             <div className="flex text-[#FFE580]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
             </div>
          </motion.div>

          {/* Card 6: Zain Aesthetics */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.1 } }}
            className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-black/5 shadow-sm"
          >
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <Instagram size={14} className="text-slate-400" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">13.2K Followers</span>
               </div>
               <a href="https://www.instagram.com/zainaesthetics.in/" target="_blank" rel="noreferrer">
                <ArrowUpRight size={16} className="text-slate-400" />
               </a>
             </div>
             <h3 className="text-xl font-black text-[#070707] leading-tight max-w-md mt-4">
               "Amazing work by Readyflow, DM's ka poora hassle hi khatam ho gya and superfast work."
             </h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">Founder, Zain Aesthetics</p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}