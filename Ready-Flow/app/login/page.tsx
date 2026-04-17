"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase"; 
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createUserProfile } from "@/lib/db"; 
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        if (user) router.push("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      
      // AWAIT ensures the profile is created before moving to dashboard
      await createUserProfile(result.user);
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 text-sm transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to access your tools and dashboard.</p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-6 h-6" 
              alt="Google Logo" 
            />
          )}
          {loading ? "Setting up..." : "Sign in with Google"}
        </button>

        <p className="text-center text-xs text-gray-600 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}