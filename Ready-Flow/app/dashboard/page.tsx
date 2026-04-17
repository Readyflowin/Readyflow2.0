"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  CreditCard, 
  LogOut, 
  LayoutDashboard, 
  Zap, 
  Clock, 
  ChevronRight,
  Shield,
  Crown
} from 'lucide-react';
import { useRouter } from "next/navigation";

// Firebase Imports
import { auth, db } from "@/lib/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { trackToolUsage } from "@/lib/db"; 

// Payment Import
import { initializePayment } from "@/lib/payment";

export default function UserDashboard() {
  const router = useRouter();
  
  // DEFAULT TAB STATE
  const [activeTab, setActiveTab] = useState('overview');
  
  // DATA STATE
  const [user, setUser] = useState<any>(null); 
  const [userData, setUserData] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  // 1. LISTEN FOR AUTH & DB CHANGES
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Listen to Firestore Real-time
        const userRef = doc(db, "users", currentUser.uid);
        const unsubDoc = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        });
        setLoading(false);
        return () => unsubDoc();
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. TOOL CLICK HANDLER
  const handleToolClick = async (toolKey: string, path: string) => {
    if (!user) return;
    await trackToolUsage(user.uid, toolKey);
    router.push(path);
  };

  // 3. SIGN OUT HANDLER
  const handleSignOut = async () => {
      await signOut(auth);
      router.push("/login");
  };

  // 4. DATE FORMATTER
  const getMemberSince = () => {
      if (!userData?.memberSince) return "Just now";
      // Handle timestamp if it exists
      if (userData.memberSince.seconds) {
          return new Date(userData.memberSince.seconds * 1000).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
      }
      return "Just now";
  };

  // 5. CALCULATE DAYS REMAINING (ROBUST FIX)
  const getDaysRemaining = () => {
    // Basic check: if not premium, 0 days.
    if (userData?.plan !== 'Premium') return 0;

    let expiryTime = 0;

    // A. Check for 'premiumUntil' (The new correct field)
    if (userData.premiumUntil) {
        if (typeof userData.premiumUntil === 'string') {
            expiryTime = new Date(userData.premiumUntil).getTime();
        } else if (userData.premiumUntil?.seconds) {
            expiryTime = userData.premiumUntil.seconds * 1000;
        }
    } 
    // B. Fallback: If 'premiumUntil' is missing but user IS Premium (Legacy Data Fix)
    // We use the 'updatedAt' time + 28 Days
    else if (userData.updatedAt?.seconds) {
        const updatedTime = userData.updatedAt.seconds * 1000;
        expiryTime = updatedTime + (28 * 24 * 60 * 60 * 1000); // Add 28 days in ms
    } else {
        return 0;
    }

    const now = Date.now();
    const diff = expiryTime - now;
    
    // Convert ms to days
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = getDaysRemaining();

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-900/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full mb-4 shadow-lg shadow-orange-500/20 overflow-hidden border-2 border-orange-500/50">
                <img 
                    src={userData?.photoURL || "https://via.placeholder.com/80"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white">{userData?.name || "User"}</h2>
              <p className="text-gray-500 text-xs mb-4">{userData?.email}</p>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                <span className={`w-2 h-2 rounded-full ${userData?.plan === 'Premium' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                {userData?.plan || "Free Starter"}
              </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
              <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-2 ${
                    activeTab === 'overview' 
                      ? 'bg-white/5 border-orange-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                  <LayoutDashboard size={18} />
                  Overview
              </button>

              <button
                  onClick={() => setActiveTab('subscription')}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-2 ${
                    activeTab === 'subscription' 
                      ? 'bg-white/5 border-orange-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                  <CreditCard size={18} />
                  Subscription
              </button>

              <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-2 ${
                    activeTab === 'settings' 
                      ? 'bg-white/5 border-orange-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                  <Settings size={18} />
                  Settings
              </button>

              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-l-2 border-transparent"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Plan Status Card */}
                <div className="bg-gradient-to-r from-[#0f0f0f] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        Current Plan: <span className="text-gray-400 font-normal">{userData?.plan || "Free"}</span>
                      </h3>
                      <p className="text-gray-400 text-sm max-w-md">
                        {userData?.plan === 'Premium' 
                           ? "You have full access to all premium tools." 
                           : "Upgrade to unlock Premium Popups and unlimited tools."}
                      </p>
                    </div>
                    
                    {userData?.plan !== "Premium" ? (
                        <button 
                            onClick={() => initializePayment(() => router.refresh())}
                            className="group px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
                        >
                            <Crown size={18} className="text-orange-600" />
                            Upgrade to Pro (₹29)
                        </button>
                    ) : (
                        <button className="group px-6 py-3 bg-green-500/10 text-green-500 font-bold rounded-xl flex items-center gap-2 cursor-default border border-green-500/20">
                            <Shield size={18} />
                            Plan Active
                        </button>
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Zap size={18} />
                      <span className="text-xs uppercase tracking-wider font-bold">Tools Used</span>
                    </div>
                    <p className="text-3xl font-black text-white">{userData?.toolsUsedCount || 0}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Clock size={18} />
                      <span className="text-xs uppercase tracking-wider font-bold">Member Since</span>
                    </div>
                    <p className="text-xl font-bold text-white">{getMemberSince()}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Shield size={18} />
                      <span className="text-xs uppercase tracking-wider font-bold">Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <p className="text-xl font-bold text-white">{userData?.status || "Active"}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Access */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Quick Access</h3>
                  <div className="space-y-3">
                    <div 
                        onClick={() => handleToolClick('popupBuilder', '/tools/popup-builder')}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">1</div>
                          <div>
                            <h4 className="font-bold text-white">Pop-up Builder</h4>
                            <p className="text-xs text-gray-500">Used: {userData?.toolsUsage?.popupBuilder || 0} times</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs px-2 py-1 rounded border bg-orange-500/10 text-orange-500 border-orange-500/20">Premium</span>
                          <ChevronRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                    <div 
                        onClick={() => handleToolClick('policyGenerator', '/tools/policy-generator')}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">2</div>
                          <div>
                            <h4 className="font-bold text-white">Policy Generator</h4>
                            <p className="text-xs text-gray-500">Used: {userData?.toolsUsage?.policyGenerator || 0} times</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs px-2 py-1 rounded border bg-green-500/10 text-green-500 border-green-500/20">Free</span>
                          <ChevronRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                     <div 
                        onClick={() => handleToolClick('roiCalculator', '/tools/profit-calculator')}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">3</div>
                          <div>
                            <h4 className="font-bold text-white">ROI Calculator</h4>
                            <p className="text-xs text-gray-500">Used: {userData?.toolsUsage?.roiCalculator || 0} times</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs px-2 py-1 rounded border bg-green-500/10 text-green-500 border-green-500/20">Free</span>
                          <ChevronRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUBSCRIPTION TAB */}
            {activeTab === 'subscription' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="text-orange-500" /> Subscription Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Countdown Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <p className="text-gray-400 text-sm mb-2">Time Remaining</p>
                      {/* FIX: Check daysLeft directly instead of checking if the field exists */}
                      {userData?.plan === 'Premium' && daysLeft > 0 ? (
                        <>
                          <div className="text-4xl font-black text-white flex items-baseline gap-2">
                            {daysLeft} <span className="text-sm font-normal text-gray-500">Days Left</span>
                          </div>
                          {/* Progress Bar */}
                          <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-orange-500 transition-all duration-1000" 
                                style={{ width: `${(daysLeft / 28) * 100}%` }}
                             ></div>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500 font-bold mt-2">No Active Subscription</div>
                      )}
                    </div>

                    {/* Info Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <p className="text-gray-400 text-sm mb-2">Plan Status</p>
                      <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${userData?.plan === 'Premium' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                          <span className="text-xl font-bold text-white">{userData?.plan || "Free"}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Premium plans automatically expire after 28 days. You will need to renew manually to keep access.
                      </p>
                    </div>
                  </div>

                  {/* Renew Button */}
                  {(userData?.plan !== 'Premium' || daysLeft < 5) && (
                    <button 
                      onClick={() => initializePayment(() => router.refresh())}
                      className="w-full mt-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20"
                    >
                      {userData?.plan === 'Premium' ? "Extend Plan (₹29)" : "Upgrade Now (₹29)"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 3. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings className="text-orange-500" /> Account Settings
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        disabled 
                        value={userData?.name} 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="text" 
                        disabled 
                        value={userData?.email} 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <p className="text-sm text-orange-200/70 flex items-center gap-2">
                      <Shield size={16} /> For security, profile changes are synced with your Google Account.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}