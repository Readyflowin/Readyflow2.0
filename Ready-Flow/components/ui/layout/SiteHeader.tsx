"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { Button } from '../button'; 
import { useAuth } from '@/app/context/AuthContext'; 
import { User, Loader2, Menu } from 'lucide-react';
// If you use a Sheet/Drawer for mobile, import it here. 
// For now, I'll focus on the "Get Started" logic you requested.

export function SiteHeader() {
  const { user, loading } = useAuth();

  // Helper to determine where "Get Started" should go
  const getStartedHref = user ? "/dashboard" : "/login";

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group"> 
            <div className="relative w-12 h-12">
                <Image 
                    src="/logo.png"
                    alt="ReadyFlow Logo"
                    fill                   
                    className="object-contain" 
                    priority 
                />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
                ReadyFlow
            </span>
        </Link>

        {/* Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/#tools" className="hover:text-white transition-colors">All Tools</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        </nav>

        {/* RIGHT SIDE - AUTH LOGIC */}
        <div className="flex items-center gap-4">
            
            {loading ? (
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
            ) : user ? (
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white hidden sm:block">
                        Dashboard
                    </Link>
                    
                    <Link href="/dashboard">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg shadow-orange-500/20 overflow-hidden">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span>{user.displayName ? user.displayName[0].toUpperCase() : <User size={16}/>}</span>
                            )}
                        </div>
                    </Link>
                </div>
            ) : (
                <>
                    <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white hidden sm:block">
                        Login
                    </Link>
                    
                    {/* 👇 This link now dynamically points to login or dashboard */}
                    <Link href={getStartedHref}>
                        <Button className="bg-white text-black hover:bg-gray-200 text-xs px-4 py-2 h-9">
                            {user ? "Dashboard" : "Get Started"}
                        </Button>
                    </Link>
                </>
            )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;