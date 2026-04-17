import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Existing Imports
import { SiteHeader } from "@/components/ui/layout/SiteHeader";
import { SiteFooter } from "@/components/ui/layout/SiteFooter";
import { AuthProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"] });

// 👇 1. ADVANCED SEO METADATA (Updated with Icons)
export const metadata: Metadata = {
  metadataBase: new URL('https://readyflow.in'),
  title: {
    default: "Free Shopify Tools & eCommerce Resources India | ReadyFlow",
    template: "%s | ReadyFlow"
  },
  description: "Launch your online business with ReadyFlow's free Shopify tools. From Profit Calculators to RTO Reduction strategies, we help Indian eCommerce brands scale.",
  keywords: ["Shopify India", "eCommerce Tools", "RTO Reduction", "Shopify Developer India", "Shopify pe bechna kese shuru karein"],
  
  // ✅ ADDED: Icons Configuration (Links your icon.png)
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png', // High-res 1024x1024 is perfect for Apple devices
  },

  // Canonical Tag Fix
  alternates: {
    canonical: '/',
  },

  // Open Graph (Facebook/LinkedIn)
  openGraph: {
    title: "ReadyFlow | Professional Shopify Tools & Services",
    description: "Launch and scale your Indian eCommerce brand with expert tools and store setup services.",
    url: 'https://readyflow.in',
    siteName: 'ReadyFlow',
    locale: 'en_IN',
    type: 'website',
    images: [
        {
          url: '/icon.png', // Using your logo as OG Image fallback
          width: 1024,
          height: 1024,
          alt: 'ReadyFlow Logo',
        },
    ],
  },

  // X (Twitter) Cards
  twitter: {
    card: 'summary_large_image',
    title: 'ReadyFlow | Shopify eCommerce Tools India',
    description: 'Stop burning cash on RTO. Scale your Shopify profit with ReadyFlow.',
    images: ['/icon.png'], // Twitter fallback image
  },

  // Verification for Search Console
  verification: {
    google: 'your-google-verification-code', // Paste actual code here if you have it
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 👇 2. JSON-LD IDENTITY SCHEMA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ReadyFlow",
    "url": "https://readyflow.in",
    "logo": "https://readyflow.in/icon.png", // Updated to point to the new icon
    "description": "Premium Shopify and WordPress development agency in India focusing on RTO reduction and profit optimization.",
    "sameAs": [
      "https://youtube.com/@readyflow", 
      "https://linkedin.com/in/your-profile",
      "https://instagram.com/readyflow"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "MP",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8602555840",
      "contactType": "customer service"
    }
  };

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* Injecting Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}