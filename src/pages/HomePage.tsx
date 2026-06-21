import Footer from "../components/Footer";
import FAQAndCTA from "../components/FAQAndCTA";
import HomepageHero from "../components/HomepageHero";
import Methodology from "../components/Methodology";
import PainOutcome from "../components/PainOutcome";
import { FitSection, OfferSection } from "../components/Pricing";
import SEO from "../components/SEO";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Mobile-First Shopify Stores for Social-First Brands | Readyflow"
        description="Readyflow helps product brands selling through Instagram, WhatsApp, Facebook or offline launch clean mobile-first Shopify stores with product pages, policies and checkout guidance."
        canonicalPath="/"
      />
      <HomepageHero />
      <Testimonials />
      <PainOutcome />
      <FitSection />
      <OfferSection />
      <Methodology />
      <FAQAndCTA />
      <Footer />
    </>
  );
}
