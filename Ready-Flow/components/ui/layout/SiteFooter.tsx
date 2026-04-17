"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Youtube, Mail, Instagram, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-10 w-10 flex items-center">
                <Image
                  src="/logo.png"
                  alt="ReadyFlow Logo"
                  width={40}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-white uppercase">
                ReadyFlow
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The ultimate operating system for Indian Dropshippers. Stop chasing revenue, start scaling{" "}
              <b className="text-white">Net Profit</b>.
            </p>

            <div className="flex gap-4 pt-2">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="ReadyFlow on Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </Link>

              <Link href="https://www.instagram.com/readyflow.in" target="_blank" rel="noopener noreferrer" aria-label="ReadyFlow on Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </Link>

              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="ReadyFlow on YouTube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={18} />
              </Link>

              <Link href="mailto:support@readyflow.in" aria-label="Email ReadyFlow" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* TOOLS COLUMN */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Utility Tools</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/tools/rto-shield" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-indigo-500" /> RTO Shield
                </Link>
              </li>
              <li>
                <Link href="/tools/profit-calculator" className="hover:text-orange-500 transition-colors">
                  Profit Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/policy-generator" className="hover:text-orange-500 transition-colors">
                  Policy Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/popup-builder" className="hover:text-orange-500 transition-colors">
                  Conversion Popups
                </Link>
              </li>
              <li>
                <Link href="/tools/smart-chatbot" className="hover:text-orange-500 transition-colors">
                  AI Support Bot
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES & SERVICES */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Growth & Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/services/shopify-store-setup" className="hover:text-white transition-colors font-bold text-white/70 italic">
                  Shopify Setup Service
                </Link>
              </li>
              <li>
                <Link href="/guides/rto-reduction-strategy-india" className="hover:text-white transition-colors">
                  RTO Reduction Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-start-selling-online-india" className="hover:text-white transition-colors">
                  E-com Startup Guide
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Transparency</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Support & Audit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <p>© 2025 ReadyFlow™ | All Rights Reserved.</p>
          <p className="flex items-center gap-1">Architected And Developed by <span className="text-white">Aditya</span> | Made with <span className="text-indigo-500">⚡and ❤️</span> in India.</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
