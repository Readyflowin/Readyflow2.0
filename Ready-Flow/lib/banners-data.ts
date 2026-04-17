// Define the structure for Type Safety
export interface BannerService {
  id: string;
  badge: string;
  title: string;
  subTitle: string;
  price: string;     // Display price
  ctaText: string;   // Button text (e.g., "Book Now")
  waIntent: string;  // The starting text for the WhatsApp message
}

// 1. Time Slots Logic (2-Hour Gaps as requested)
export const BOOKING_SLOTS = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM"
];

// 2. Services Data (Used by Banners & Scheduler)
export const BANNERS_DATA: Record<string, BannerService> = {
  
  // Service 1: The Main Store Setup (₹9,999)
  shopifySetup: {
    id: "svc_setup_pro",
    badge: "Best Seller",
    title: "Professional Shopify Store Setup",
    subTitle: "Complete store setup with premium theme, speed optimization, and necessary plugins for Indian Dropshipping.",
    price: "₹9,999",
    ctaText: "Book Setup Slot",
    waIntent: "Hi ReadyFlow, I want to book the *Professional Shopify Store Setup*"
  },

  // Service 2: RTO Audit (₹1,999)
  rtoAudit: {
    id: "svc_audit_rto",
    badge: "High ROI",
    title: "1-on-1 RTO Reduction Audit",
    subTitle: "We analyze your last 100 failed orders, courier reports, and settings to fix your RTO leaks.",
    price: "₹1,999",
    ctaText: "Book Audit",
    waIntent: "Hi ReadyFlow, I want to book the *1-on-1 RTO Reduction Audit*"
  },

  // Service 3: Custom Coding / App Dev
  customDev: {
    id: "svc_custom_dev",
    badge: "Developer Access",
    title: "Custom Shopify App/Script",
    subTitle: "Need a custom feature? We code custom apps and scripts to automate your unique business logic.",
    price: "Starting ₹2,499",
    ctaText: "Discuss Requirement",
    waIntent: "Hi ReadyFlow, I need a *Custom Script/App* developed"
  },

  // Service 4: Supplier Network Access (Free Lead Magnet)
  supplierGroup: {
    id: "svc_supplier_net",
    badge: "Community",
    title: "Verified Supplier Network",
    subTitle: "Get access to our list of verified Indian dropshipping suppliers (No Middlemen).",
    price: "Free Access",
    ctaText: "Join Now",
    waIntent: "Hi ReadyFlow, I want to join the *Verified Supplier Network*"
  }
};