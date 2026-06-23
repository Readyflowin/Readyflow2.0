import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MetaPixelRouteTracker from "./MetaPixelRouteTracker";
import GA4RouteTracker from "./GA4RouteTracker";
import AttributionRouteTracker from "./AttributionRouteTracker";
import { LeadFormModalProvider } from "./LeadFormModal";

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

export default function PublicShell({ children }: { children: ReactNode }) {
  return (
    <LeadFormModalProvider>
      <ScrollToTop />
      <MetaPixelRouteTracker />
      <GA4RouteTracker />
      <AttributionRouteTracker />
      <main className="relative min-h-screen bg-[#F4EFE6] font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        {children}
      </main>
    </LeadFormModalProvider>
  );
}
