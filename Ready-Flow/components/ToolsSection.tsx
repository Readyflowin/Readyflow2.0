"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Calculator, 
  FileText, 
  Layout, 
  ArrowRight, 
  Lock,
  Sparkles,
  Zap,
  ShieldAlert, // 👈 New Icon for RTO Shield
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function ToolsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const tools = [
    {
      id: 0, // 🚀 NEW SECTION ADDED
      title: "RTO Shield",
      description: "Block high-risk pincodes and fake orders instantly to save shipping costs.",
      icon: ShieldAlert,
      href: "/tools/rto-shield",
      badge: "Security",
      active: true,
      color: "indigo",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      id: 1,
      title: "Smart Chatbot",
      description: "Auto-reply to customer queries with a custom coded chatbot script.",
      icon: Bot,
      href: "/tools/smart-chatbot",
      badge: "Free",
      active: true,
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Profit & ROI Calculator",
      description: "Calculate your break-even point and real profit after ad spends.",
      icon: Calculator,
      href: "/tools/profit-calculator",
      badge: "Utility",
      active: true,
      color: "green",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 3,
      title: "Policy Generator",
      description: "Generate Razorpay-approved privacy, refund, and shipping policies.",
      icon: FileText,
      href: "/tools/policy-generator",
      badge: "Essential",
      active: true,
      color: "purple",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 4,
      title: "Pop-up Builder",
      description: "Create exit-intent and sales pop-ups to boost conversion rates.",
      icon: Layout,
      href: "/tools/popup-builder",
      badge: "New",
      active: true,
      color: "orange",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 5,
      title: "WhatsApp CRM",
      description: "Manage leads and automate follow-ups directly from WhatsApp.",
      icon: Zap,
      href: "#",
      badge: "Coming Soon",
      active: false,
      color: "gray",
      gradient: "from-gray-500/10 to-gray-600/10"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getColorClasses = (color: string, active: boolean) => {
    if (!active) return 'text-gray-500';
    const colors: Record<string, string> = {
      blue: 'text-blue-400',
      green: 'text-green-400',
      purple: 'text-purple-400',
      orange: 'text-orange-400',
      indigo: 'text-indigo-400', // 👈 Added Indigo support
      gray: 'text-gray-500'
    };
    return colors[color] || 'text-gray-400';
  };

  const getBadgeClasses = (badge: string) => {
    const badges: Record<string, string> = {
      'New': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Free': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Utility': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Essential': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Security': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', // 👈 Added Security badge
      'Coming Soon': 'bg-gray-500/20 text-gray-500 border-gray-500/30'
    };
    return badges[badge] || 'bg-white/10 text-gray-400 border-white/10';
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-opacity duration-300 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          opacity: hoveredId !== null ? 1 : 0
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slideUp">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Growth Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-fadeIn">
            Tools designed to replace expensive monthly apps. One-time setup, lifetime use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isHovered = hoveredId === tool.id;
            
            return (
              <div 
                key={tool.id} 
                className="group relative animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
                onMouseEnter={() => setHoveredId(tool.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {tool.active ? (
                  <Link href={tool.href} className="block h-full">
                    <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl p-6 h-full transition-all duration-500 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col overflow-hidden">
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                      
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`relative p-4 bg-gradient-to-br ${tool.gradient} rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-500 ${isHovered ? 'scale-110 rotate-6 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : ''}`}>
                            <Icon className={`w-6 h-6 ${getColorClasses(tool.color, tool.active)} transition-colors duration-300`} />
                            
                            {isHovered && (
                              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tool.gradient} blur-xl opacity-50 animate-pulse`} />
                            )}
                          </div>
                          
                          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${getBadgeClasses(tool.badge)} backdrop-blur-sm`}>
                            {tool.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                          {tool.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 group-hover:text-gray-300 transition-colors duration-300">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-sm font-bold text-white group-hover:text-orange-400 transition-all duration-300 mt-auto">
                          <span className="mr-2">Launch Tool</span>
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>
                ) : (
                  <div className="relative bg-gradient-to-br from-[#050505] to-black border border-white/5 rounded-2xl p-6 h-full flex flex-col overflow-hidden cursor-not-allowed">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    
                    <div className="relative z-10 flex flex-col h-full opacity-50">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-white/5 rounded-xl grayscale backdrop-blur-sm">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${getBadgeClasses(tool.badge)}`}>
                          {tool.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-600 mb-3">
                        {tool.title}
                      </h3>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center text-sm font-bold text-gray-600 mt-auto">
                        <Lock className="w-4 h-4 mr-2" />
                        <span>Locked</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm rounded-2xl">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm font-medium">Available Soon</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center animate-fadeIn">
          <p className="text-gray-400 mb-6">
            More tools launching every month. Join 100+ entrepreneurs already saving on SaaS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1">
              Request a Tool
            </button>
            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              View Roadmap
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}