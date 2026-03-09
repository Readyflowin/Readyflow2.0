import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Methodology from "./components/Methodology";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing"; 
import Footer from "./components/Footer";

// Pages
import PricingPage from "./pages/pricingpage"; 
import WorkArchive from "./pages/WorkArchive"; //

// Global Scroll Reset Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ─── Landing Page Component ──────────────────────────────────────────────────
function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Methodology />
      <Testimonials /> {/* Linked to #work via Navbar */}
      <Pricing />      {/* Linked to #pricing via Navbar */}
      <Footer />
    </>
  );
}

// ─── Root App Component ──────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Global Reset Trigger */}
      <main className="relative min-h-screen bg-[#F4EFE6] font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* ─── ADDED THE WORK ROUTE HERE ─── */}
          <Route path="/work" element={<WorkArchive />} /> 
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;