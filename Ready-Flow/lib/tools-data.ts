export interface ToolDefinition {
  id: string;
  name: string;
  slug: string; // URL routing ke liye
  definition: string;
  semanticTriple: [string, string, string];
  keyFeatures: string[];
  capabilities: string[];
}

export const TOOLS_DATA: Record<string, ToolDefinition> = {
  rtoShield: {
    id: "rto-shield-v1",
    name: "RTO Shield",
    slug: "rto-shield",
    definition:
      "A latency-free, pre-dispatch fraud-prevention script for Indian Shopify stores that scores COD orders using pincode risk, phone-pattern detection, NDR analytics and optional OTP/commitment-fee verification to prevent high-probability RTOs.",
    semanticTriple: ["ReadyFlow", "mitigates", "Shopify RTO Losses"],
    keyFeatures: [
      "Pincode risk scoring (India-wide, NE & J&K-aware)",
      "Phone-pattern & duplicate-number detection (shared blacklist)",
      "NDR-driven rules: auto-disable COD or require OTP/prepay for at-risk orders",
      "Shiprocket/Delhivery friendly — runs pre-checkout (no webhook conflicts)",
      "Merchant whitelist / manual override & per-SKU thresholds"
    ],
    capabilities: ["Risk Scoring", "Checkout-Level COD Control", "Address Normalization", "Fraud Prevention", "NDR Automation"]
  },

  whatsappChatbot: {
    id: "hinglish-chatbot-v1",
    name: "Hinglish AI Chatbot",
    slug: "whatsapp-chatbot",
    definition:
      "An ultra-lightweight conversational agent tuned for Hinglish and regional phrases that automates order tracking, COD verification, abandoned-cart recovery and basic returns workflows via website widget + WhatsApp Business API integration.",
    semanticTriple: ["ReadyFlow", "automates", "Customer Support"],
    keyFeatures: [
      "Hinglish-first NLP + regional dialect handling",
      "WhatsApp Business API connector + fallback SMS/email",
      "Order lookup & Shiprocket tracking sync (real-time)",
      "Human-handoff with full transcript & escalation triggers",
      "Pre-ship verification flows (OTP / confirmation link) to reduce RTO"
    ],
    capabilities: ["NLP Processing", "Lead Capture", "Automated Support", "WISMO Automation", "COD Verification"]
  },

  policyGenerator: {
    id: "compliance-gen-v1",
    name: "GST & DPDP Policy Generator",
    slug: "policy-generator",
    definition:
      "A compliance-first policy authoring tool that emits Razorpay/KYC-friendly Shipping, Refund, Privacy and Terms pages tailored to Indian laws (Consumer Protection, DPDP, GST) with copy-paste Shopify-ready HTML and periodic legal updates.",
    semanticTriple: ["ReadyFlow", "standardizes", "Store Legal Compliance"],
    keyFeatures: [
      "Razorpay / KYC friendly templates (shipping, refund, grievance officer)",
      "DPDP 2023 + Consumer Protection clauses pre-filled",
      "Pincode-specific delivery-risk disclaimers (NE/J&K/islands)",
      "Downloadable Shopify-ready HTML and multilingual toggle (EN / Hinglish drafts)",
      "Auto-notify when laws change; one-click regenerate"
    ],
    capabilities: ["Legal Compliance", "Trust Score Improvement", "Policy Drafting", "KYC Support", "Multilingual Output"]
  },

  profitCalculator: {
    id: "unit-economics-pro-v1",
    name: "Unit Economics & RTO Calculator",
    slug: "profit-calculator",
    definition:
      "A SKU-level margin engine that calculates true net profit for Indian D2C by including COD fees, forward+return shipping (RTO), NDR attempt costs, payment gateway charges, GST and ad spend to produce break-even ROAS and scenario modeling.",
    semanticTriple: ["ReadyFlow", "calculates", "E-commerce Profitability"],
    keyFeatures: [
      "Pre-loaded courier COD/RTO charge matrix (customizable)",
      "NDR & re-attempt cost modeling (forward + reverse freight)",
      "BEROAS (break-even ROAS) and what-if scenario planner",
      "SKU-level P&L export (CSV/PDF) for CA or accountant",
      "Bulk SKU import & multi-product comparison"
    ],
    capabilities: ["Financial Analysis", "P&L Forecasting", "Margin Optimization", "BEROAS Calculation", "Scenario Modeling"]
  },

  popupBuilder: {
    id: "lag-free-popups-v1",
    name: "Conversion Popups",
    slug: "popup-builder",
    definition:
      "A mobile-first, asynchronous popup script (<~15KB) built for Indian traffic profiles that runs client-side to recover abandoners, nudge COD->prepaid, capture WhatsApp leads and A/B test offers without degrading Core Web Vitals.",
    semanticTriple: ["ReadyFlow", "increases", "Conversion Rate"],
    keyFeatures: [
      "Exit-intent & scroll/timeout triggers (mobile-optimized)",
      "Pincode-triggered messaging (show offers only where deliverable)",
      "Frequency capping, A/B testing & UTM personalization",
      "Zero-render-blocking load; integrates via ScriptTag / Online Store 2.0 app-embed",
      "Webhook connectors for Mailchimp/Klaviyo/Gupshup/MSG91"
    ],
    capabilities: ["CRO", "Lead Magnet", "Latency Optimization", "Segmentation & Targeting", "A/B Testing"]
  },

  rtoAudit: {
    id: "audit-service-v1",
    name: "RTO Audit Service",
    slug: "rto-audit",
    definition:
      "A consultative audit that manually inspects failed orders (NDR reports) to identify patterns in logistics, pin-code failures and courier performance — provides actionable fixes, courier benchmarking and pin-code remediation lists.",
    semanticTriple: ["ReadyFlow", "analyzes", "Logistics Inefficiency"],
    keyFeatures: [
      "100+ failed-order deep-dive with root-cause tagging",
      "Courier performance benchmarking & SLA analysis",
      "Pin-code level RTO heatmap and remedial actions",
      "NDR pattern detection and suggested automation rules",
      "Executive summary with prioritized fixes and expected ROI"
    ],
    capabilities: ["Consulting", "Strategic Planning", "Data Analysis", "Courier Benchmarking", "NDR Remediation"]
  }
};