import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Methodology from "./components/Methodology";
import Testimonials from "./components/Testimonials";
import { FitSection, OfferSection } from "./components/Pricing";
import PainOutcome from "./components/PainOutcome";
import Footer from "./components/Footer";
import MetaPixelRouteTracker from "./components/MetaPixelRouteTracker";
import FAQAndCTA from "./components/FAQAndCTA";
import { LeadFormModalProvider } from "./components/LeadFormModal";
import SEO from "./components/SEO";

// Pages
import PricingPage from "./pages/pricingpage"; 
import WorkArchive from "./pages/WorkArchive"; //
import AdminDashboard from "./pages/AdminDashboard";
import PolicyPage from "./pages/PolicyPage";

// Global Scroll Reset Component
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
  }, [hash, pathname]);

  return null;
}

// ─── Landing Page Component ──────────────────────────────────────────────────
function LandingPage() {
  return (
    <>
      <SEO
        title="Instagram Brand Shopify Launch | Readyflow"
        description="Readyflow builds focused Shopify launch stores for Instagram-first product brands with product setup, mobile-first layout, WhatsApp/contact flow and checkout setup guidance."
        canonicalPath="/"
      />
      <Hero />
      <Testimonials />
      <PainOutcome />
      <OfferSection />
      <Methodology />
      <FitSection />
      <FAQAndCTA />
      <Footer />
    </>
  );
}

// ─── Root App Component ──────────────────────────────────────────────────────
function PublicRoute({ children }: { children: React.ReactNode }) {
  return (
    <LeadFormModalProvider>
      <ScrollToTop />
      <MetaPixelRouteTracker />
      <main className="relative min-h-screen bg-[#F4EFE6] font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        {children}
      </main>
    </LeadFormModalProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
        <Route path="/work" element={<PublicRoute><WorkArchive /></PublicRoute>} />
        <Route path="/privacy-policy" element={<PublicRoute><PolicyPage type="privacy" /></PublicRoute>} />
        <Route path="/terms" element={<PublicRoute><PolicyPage type="terms" /></PublicRoute>} />
        <Route path="/refund-cancellation-policy" element={<PublicRoute><PolicyPage type="refund" /></PublicRoute>} />
        <Route path="/delivery-scope-policy" element={<PublicRoute><PolicyPage type="delivery" /></PublicRoute>} />
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
