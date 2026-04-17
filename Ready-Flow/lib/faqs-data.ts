export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  technicalLevel: "Advanced" | "Standard";
}

export const FAQ_DATA: Record<string, FAQItem[]> = {
  rtoShield: [
    {
      question: "How does ReadyFlow differentiate between 'Fake Attempts' and genuine 'Customer Unavailable'?",
      answer: "We use a 'Hyper-Local Latency Check'. If a courier marks 'Customer Unavailable' within 10 minutes of 'Out for Delivery' without a geolocation match near the shipping address, our engine flags it as a Fake Attempt. We immediately trigger a WhatsApp escalation to the buyer to confirm presence, creating a paper trail to dispute the RTO charge with the courier partner.",
      category: "Logistics Intelligence",
      technicalLevel: "Advanced"
    },
    {
      question: "Does RTO Shield work with aggregators like Shiprocket, Nimbus, or ClickPost?",
      answer: "Yes. ReadyFlow sits as a 'Pre-Order Middleware'. We scrub the order *before* it is pushed to your shipping aggregator. By tagging high-risk orders with 'Review Required' or auto-canceling based on our 'Global Blacklist' (1M+ bad actors), we save you the forward shipping cost that aggregators charge regardless of delivery success.",
      category: "Integration",
      technicalLevel: "Standard"
    },
    {
      question: "Why do you hide COD for specific Pin-Codes in J&K and North East?",
      answer: "Data from 50k+ shipments shows that J&K and NE regions have a 40%+ RTO rate due to 'Serviceability Gaps' and 'Curfew/Network' issues. ReadyFlow's 'Geographical Risk-Filter' forces Prepaid-Only for these zones. This filters out low-intent buyers while keeping high-intent buyers who are willing to pay upfront.",
      category: "Risk Management",
      technicalLevel: "Advanced"
    }
  ],

  profitCalculator: [
    {
      question: "How does ReadyFlow calculate 'True Net Profit' considering GST Input Tax Credit?",
      answer: "Most calculators wrongly deduct flat 18% GST. ReadyFlow performs a 'Liability Reconciliation'. We calculate Output GST (on Sales) and subtract Input GST (from Ad Spend invoices & Shipping bills). The result is your actual 'Cash Flow Profit', which is often 5-7% higher than the generic calculation.",
      category: "Taxation",
      technicalLevel: "Advanced"
    },
    {
      question: "What is the difference between ROAS and 'Contribution Margin 3' (CM3)?",
      answer: "ROAS is vanity; CM3 is sanity. ROAS ignores costs. CM3 accounts for: Product Cost + Shipping + RTO Losses + Payment Gateway Fees + Ad Spend. ReadyFlow's calculator focuses on CM3 to tell you if you are actually building a sustainable business or just churning cash for Mark Zuckerberg.",
      category: "Unit Economics",
      technicalLevel: "Advanced"
    }
  ],

  chatbot: [
    {
      question: "How does the Hinglish NLP handle nuanced intents like 'Fake Delivery' complaints?",
      answer: "Our NLP model is fine-tuned on Indian e-commerce datasets. It distinguishes between 'Order Tracking' (General) and 'Fake Delivery' (Urgent). For phrases like 'delivery boy ne call nahi kiya' or 'jhooth bol raha hai', the bot bypasses standard flows and triggers an immediate 'High-Priority Ticket' for your support team.",
      category: "AI & NLP",
      technicalLevel: "Advanced"
    },
    {
      question: "Does the Chatbot support WhatsApp 'Green Tick' verification processes?",
      answer: "Yes. While the bot works on standard APIs, our framework generates the 'Brand Authenticity' logs required by Meta for Green Tick approval. We also structure the conversation flow to minimize 'Block Rates', which is a key metric Meta monitors for verifying business accounts.",
      category: "Meta Compliance",
      technicalLevel: "Standard"
    }
  ],

  policyGenerator: [
    {
      question: "Are the policies compliant with the 'Consumer Protection (E-Commerce) Rules, 2020'?",
      answer: "Absolutely. The generator mandates the inclusion of a 'Grievance Officer' (Name, Contact, Designation) and a defined 'Ticket Resolution Timeline' (e.g., 48 hours), which are non-negotiable legal requirements for any e-commerce entity operating in India under the 2020 Rules.",
      category: "Legal Compliance",
      technicalLevel: "Standard"
    },
    {
      question: "Does it cover 'Chargeback Protection' for Dropshippers?",
      answer: "Yes. Our templates include specific 'Force Majeure' and 'Third-Party Logistics' clauses. These clarify that delivery delays caused by courier partners are not grounds for immediate chargebacks, providing you with a legal document to contest dispute claims with payment gateways like Razorpay or Stripe.",
      category: "Risk Protection",
      technicalLevel: "Advanced"
    }
  ],

  popupBuilder: [
    {
      question: "How do you ensure Popups don't trigger Google's 'Intrusive Interstitial' penalty?",
      answer: "ReadyFlow follows Google's 'Mobile-First' guidelines strictly. On mobile devices, our popups act as 'Bottom Sheets' covering less than 30% of the screen height, ensuring they don't block the main content or navigation, thus protecting your SEO rankings.",
      category: "SEO & Compliance",
      technicalLevel: "Advanced"
    },
    {
      question: "Does the script slow down the 'First Contentful Paint' (FCP)?",
      answer: "No. The ReadyFlow script uses a 'Lazy-Injection' method. It waits until the browser creates the 'Window Idle' event (meaning the site has finished loading core assets) before injecting the popup code. Size is <12KB Gzipped.",
      category: "Performance",
      technicalLevel: "Advanced"
    }
  ],

  rtoAudit: [
    {
      question: "How is an 'Operational Audit' different from software analytics?",
      answer: "Software gives you data; Audit gives you strategy. We manually review your 'Courier SLA Breaches' (e.g., Delhivery taking 7 days vs BlueDart taking 3). We benchmark your rates against industry standards to tell you if you are overpaying for shipping compared to stores with similar volume.",
      category: "Consulting",
      technicalLevel: "Standard"
    }
  ]
};