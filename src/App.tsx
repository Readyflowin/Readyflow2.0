import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicShell from "./components/PublicShell";
import EcommerceWebsiteDevelopmentIndia from "./pages/EcommerceWebsiteDevelopmentIndia";
import ShopifyStoreSetupCostIndia from "./pages/ShopifyStoreSetupCostIndia";
import ShopifyStoreSetupIndia from "./pages/ShopifyStoreSetupIndia";
import ClothingBrandWebsite from "./pages/ClothingBrandWebsite";
import JewelleryEcommerceWebsite from "./pages/JewelleryEcommerceWebsite";
import InstagramBrandShopifyStore from "./pages/InstagramBrandShopifyStore";
import ShopifyVsWooCommerceIndia from "./pages/ShopifyVsWooCommerceIndia";

const HomePage = lazy(() => import("./pages/HomePage"));
const PricingPage = lazy(() => import("./pages/pricingpage"));
const WorkArchive = lazy(() => import("./pages/WorkArchive"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function RouteFallback() {
  return <div className="min-h-screen bg-[#F4EFE6]" aria-busy="true" />;
}

function PublicRoute({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}

function DeferredRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><DeferredRoute><HomePage /></DeferredRoute></PublicRoute>} />
      <Route path="/pricing" element={<PublicRoute><DeferredRoute><PricingPage /></DeferredRoute></PublicRoute>} />
      <Route path="/work" element={<PublicRoute><DeferredRoute><WorkArchive /></DeferredRoute></PublicRoute>} />
      <Route path="/privacy-policy" element={<PublicRoute><DeferredRoute><PolicyPage type="privacy" /></DeferredRoute></PublicRoute>} />
      <Route path="/terms" element={<PublicRoute><DeferredRoute><PolicyPage type="terms" /></DeferredRoute></PublicRoute>} />
      <Route path="/refund-cancellation-policy" element={<PublicRoute><DeferredRoute><PolicyPage type="refund" /></DeferredRoute></PublicRoute>} />
      <Route path="/delivery-scope-policy" element={<PublicRoute><DeferredRoute><PolicyPage type="delivery" /></DeferredRoute></PublicRoute>} />
      <Route path="/shopify-store-setup-india" element={<PublicRoute><ShopifyStoreSetupIndia /></PublicRoute>} />
      <Route path="/shopify-store-setup-cost-india" element={<PublicRoute><ShopifyStoreSetupCostIndia /></PublicRoute>} />
      <Route path="/ecommerce-website-development-india" element={<PublicRoute><EcommerceWebsiteDevelopmentIndia /></PublicRoute>} />
      <Route path="/clothing-brand-website" element={<PublicRoute><ClothingBrandWebsite /></PublicRoute>} />
      <Route path="/jewellery-ecommerce-website" element={<PublicRoute><JewelleryEcommerceWebsite /></PublicRoute>} />
      <Route path="/instagram-brand-shopify-store" element={<PublicRoute><InstagramBrandShopifyStore /></PublicRoute>} />
      <Route path="/shopify-vs-woocommerce-india" element={<PublicRoute><ShopifyVsWooCommerceIndia /></PublicRoute>} />
      <Route path="*" element={<DeferredRoute><AdminDashboard /></DeferredRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
