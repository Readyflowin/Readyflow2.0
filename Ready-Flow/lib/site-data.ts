export const SITE_CONFIG = {
  name: "ReadyFlow",
  domain: "readyflow.in",
  whatsapp: "918602555840",
  email: "support@readyflow.in", // Placeholder text for policies
  scarcityLine: "\n\n⚠️ *High Demand:* Please confirm availability.",
  
  // Footer / Meta Info
  tagline: "Indian E-commerce Intelligence Layer",
  description: "Advanced tools to reduce RTO, automate support, and calculate true profitability for Indian Shopify brands.",
  
  // Navigation Links
  navLinks: [
    { name: "RTO Shield", href: "/tools/rto-shield" },
    { name: "Profit Calc", href: "/tools/profit-calculator" },
    { name: "Policy Gen", href: "/tools/policy-generator" },
    { name: "Chatbot", href: "/tools/whatsapp-chatbot" },
    { name: "Services", href: "/services" }, // Leads to Audit/Dev services
  ]
};

// Research Data Points (To be used in Comparison Tables & Hero Sections)
// Sources: Internal Aggregated Data, Shiprocket Reports, ET Retail
export const MARKET_STATS = {
  avgRTO: {
    value: "30-35%",
    context: "Average RTO rate for COD orders in India (Fashion/Electronics)",
    source: "Industry Benchmark 2024"
  },
  codPreference: {
    value: "65%",
    context: "Percentage of Indian shoppers preferring Cash on Delivery",
    source: "RBI Digital Payments Report"
  },
  ndrCost: {
    value: "₹45 - ₹90",
    context: "Average loss per RTO order (Forward + Reverse + Packaging)",
    source: "ReadyFlow Aggregated Data"
  },
  latencyImpact: {
    value: "7%",
    context: "Drop in conversion for every 100ms delay in page load",
    source: "Google Web Vitals Study"
  }
};

// Global default settings for tools (e.g. Policy Generator defaults)
export const DEFAULT_TOOL_SETTINGS = {
  currency: "INR",
  country: "India",
  jurisdiction: "New Delhi", // Default jurisdiction for legal policies
  grievanceOfficer: "[Name of Officer]",
  supportHours: "10:00 AM - 06:00 PM (Mon-Fri)"
};