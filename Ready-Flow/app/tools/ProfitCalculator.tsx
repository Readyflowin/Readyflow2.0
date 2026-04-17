"use client";
import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle, PlayCircle, Package, TrendingUp, TrendingDown, Copy, Check } from 'lucide-react';
import Link from 'next/link';

// --- FIREBASE IMPORTS ---
import { auth } from "@/lib/firebase"; 
import { trackToolUsage } from "@/lib/db"; 
import { onAuthStateChanged } from "firebase/auth"; // Added this

const ProfitCalculator = () => {
  // --- STATE ---
  const [sellingPrice, setSellingPrice] = useState(1499);
  const [productCost, setProductCost] = useState(400);
  const [adCost, setAdCost] = useState(300); 
  const [shippingFwd, setShippingFwd] = useState(80);
  const [shippingRto, setShippingRto] = useState(60); 
  const [packaging, setPackaging] = useState(15);
  const [rtoPercent, setRtoPercent] = useState(20);
  const [numOrders, setNumOrders] = useState(100);
  
  // UI State
  const [copied, setCopied] = useState(false);

  // --- 1. TRACK USAGE ON PAGE LOAD ---
  useEffect(() => {
    // We use onAuthStateChanged to ensure we have the User UID even on a fresh reload
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            trackToolUsage(user.uid, 'roiCalculator');
        }
    });
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // --- RESULTS STATE ---
  const [stats, setStats] = useState({
    netProfitPerOrder: 0,
    totalRevenue: 0,
    totalInvestment: 0,
    totalProfit: 0,
    margin: 0,
    isLoss: false
  });

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    // 1. Deliver vs RTO counts
    const deliveredOrders = numOrders * ((100 - rtoPercent) / 100);
    const rtoOrders = numOrders * (rtoPercent / 100);

    // 2. Revenue (Only for Delivered)
    const revenue = deliveredOrders * sellingPrice;

    // 3. Investment (All Orders)
    const costOfGoods = numOrders * productCost; 
    const marketingSpend = numOrders * adCost; 
    const packagingCost = numOrders * packaging; 
    const logisticsCost = (numOrders * shippingFwd) + (rtoOrders * shippingRto);

    const totalExp = costOfGoods + marketingSpend + logisticsCost + packagingCost;
    
    // 4. Profit
    const totalProfit = revenue - totalExp;
    const profitPerOrder = numOrders > 0 ? totalProfit / numOrders : 0;
    const margin = revenue > 0 ? (totalProfit / revenue) * 100 : 0;

    setStats({
      netProfitPerOrder: profitPerOrder,
      totalRevenue: revenue,
      totalInvestment: totalExp,
      totalProfit: totalProfit,
      margin: isNaN(margin) ? 0 : margin,
      isLoss: totalProfit < 0
    });

  }, [sellingPrice, productCost, adCost, shippingFwd, shippingRto, packaging, rtoPercent, numOrders]);

  // --- COPY REPORT (Tracking Removed Here) ---
  const handleCopyReport = async () => {
    const report = `
📊 Profit Calculation Report
---------------------------
Orders: ${numOrders}
Selling Price: ₹${sellingPrice}
Ads/Order: ₹${adCost}
RTO: ${rtoPercent}%

💰 RESULTS:
Revenue: ₹${stats.totalRevenue.toLocaleString()}
Investment: ₹${stats.totalInvestment.toLocaleString()}
NET PROFIT: ₹${stats.totalProfit.toLocaleString()} (${stats.margin.toFixed(1)}% Margin)
---------------------------
⚡ Calculated by ReadyFlow
    `.trim();

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CSS Class to hide spinners
  const inputClass = "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 font-mono text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* --- LEFT: INPUTS --- */}
      <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8">
        
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Calculator className="text-teal-500" /> Input Data
            </h2>
            <Link 
                href="https://www.youtube.com" 
                target="_blank"
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full bg-white/5"
            >
                <PlayCircle size={14} /> Watch Tutorial
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Selling Price (₹)</label>
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Product Buying Cost (₹)</label>
                <input type="number" value={productCost} onChange={(e) => setProductCost(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">CAC (Ad Cost/Order)</label>
                <input type="number" value={adCost} onChange={(e) => setAdCost(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Packaging & Misc (₹)</label>
                <input type="number" value={packaging} onChange={(e) => setPackaging(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Forward Shipping (₹)</label>
                <input type="number" value={shippingFwd} onChange={(e) => setShippingFwd(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium text-red-400">RTO/Reverse Shipping (₹)</label>
                <input type="number" value={shippingRto} onChange={(e) => setShippingRto(Number(e.target.value))} className={`${inputClass} border-red-500/30 focus:border-red-500`} />
            </div>
        </div>

        <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-300">Expected RTO Percentage</label>
                <span className={`font-mono font-bold ${rtoPercent > 30 ? 'text-red-500' : 'text-teal-500'}`}>{rtoPercent}%</span>
            </div>
            <input type="range" min="0" max="100" value={rtoPercent} onChange={(e) => setRtoPercent(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0% (Impossible)</span>
                <span>20% (Good)</span>
                <span>50% (High Risk)</span>
            </div>
        </div>
      </div>

      {/* --- RIGHT: OUTPUT --- */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Main Score Card */}
        <div className={`rounded-3xl p-8 border relative overflow-hidden ${stats.isLoss ? 'bg-red-950/20 border-red-500/30' : 'bg-teal-950/20 border-teal-500/30'}`}>
            <div className={`absolute top-0 left-0 w-full h-2 ${stats.isLoss ? 'bg-red-500' : 'bg-teal-500'}`}></div>
            
            <div className="flex justify-between items-start">
                <h3 className="text-gray-400 font-medium mb-2">Net Profit Per Order</h3>
                <button 
                    onClick={handleCopyReport} 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                    title="Copy Report"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
                <span className={`text-5xl font-bold tracking-tighter ${stats.isLoss ? 'text-red-500' : 'text-teal-400'}`}>
                    ₹{stats.netProfitPerOrder.toFixed(0)}
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded ${stats.isLoss ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}>
                    {stats.margin.toFixed(1)}% Margin
                </span>
            </div>

            {/* --- SUMMARY CARD: Revenue vs Profit --- */}
            <div className="bg-black/40 rounded-xl p-5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                        <Package size={16} className="text-gray-500"/> If you get orders:
                    </label>
                    <input 
                        type="number" 
                        value={numOrders}
                        onChange={(e) => setNumOrders(Number(e.target.value))}
                        className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-teal-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Total Revenue</span>
                        <span className="text-white font-mono">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Total Investment</span>
                        <span className="text-red-400 font-mono">- ₹{stats.totalInvestment.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="font-bold text-gray-200">Total Net Profit</span>
                        <span className={`text-xl font-bold font-mono ${stats.isLoss ? 'text-red-500' : 'text-teal-400'}`}>
                            ₹{stats.totalProfit.toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
                {stats.isLoss 
                    ? "⚠️ You are losing money. Fix your metrics." 
                    : "🚀 You are profitable! Ready to scale."}
            </p>
        </div>

        {/* Tip Box */}
        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start">
            <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-blue-200/80 leading-relaxed">
                <strong>Pro Tip:</strong> Product Cost + Ads should be less than 60% of SP for a healthy business.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;