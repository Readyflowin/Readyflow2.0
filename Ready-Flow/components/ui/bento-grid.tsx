"use client";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  cta,
  href = "#", // Default value
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  cta?: string;
  href?: string;
}) => {
  return (
    // CHANGE: Main wrapper ko 'div' ki jagah 'Link' bana diya hai
    <Link
      href={href}
      className={cn(
        // Glassmorphism Base Styles
        "row-span-1 relative rounded-3xl group/bento hover:shadow-2xl transition duration-200 shadow-none p-6 justify-between flex flex-col space-y-4",
        "bg-[#0a0a0a] border border-white/10 hover:border-orange-500/50 backdrop-blur-sm cursor-pointer", // cursor-pointer add kiya
        className
      )}
    >
      {/* Background Gradient Mesh (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-0 group-hover/bento:opacity-100 transition-opacity rounded-3xl" />

      {/* Visual Header Area */}
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
         {header}
      </div>
      
      {/* Text Content */}
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="font-bold text-slate-100 text-lg">
              {title}
            </div>
        </div>
        <div className="font-normal text-slate-400 text-sm leading-relaxed mb-4">
          {description}
        </div>
        
        {cta && (
            <div className="text-sm text-orange-400 font-bold flex items-center gap-1 hover:text-orange-300 transition-colors">
                 {cta} <ArrowRight className="w-4 h-4" />
            </div>
        )}
      </div>
    </Link>
  );
};