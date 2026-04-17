"use client";
import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, AlertTriangle, FileText } from 'lucide-react';

// --- FIREBASE IMPORTS (Added for Tracking) ---
import { auth } from "@/lib/firebase"; 
import { trackToolUsage } from "@/lib/db"; 

const PolicyGenerator = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'shipping'>('privacy');
  const [copied, setCopied] = useState(false);

  // Form Inputs
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    website: "",
    address: "",
    city: "",
    officerName: "",
    returnDays: "7",        // Default value
    cancellationHours: "24", // Default value
    processTime: "1-2",
    shipTime: "5-7",
    phone: "" 
  });

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- UPDATED COPY HANDLER WITH TRACKING ---
  const handleCopy = async () => {
    let textToCopy = "";
    if (activeTab === 'privacy') textToCopy = generatePrivacy();
    if (activeTab === 'terms') textToCopy = generateTerms();
    if (activeTab === 'refund') textToCopy = generateRefund();
    if (activeTab === 'shipping') textToCopy = generateShipping();

    // 1. Copy to Clipboard
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // 2. Track Usage (Logs to Firebase)
    if (auth.currentUser) {
        try {
            await trackToolUsage(auth.currentUser.uid, 'policyGenerator');
        } catch (error) {
            console.error("Tracking error:", error);
        }
    }
  };

  // --- GENERATORS ---
  const generatePrivacy = () => {
    return `
PRIVACY POLICY

This Privacy Policy describes how ${formData.storeName || "[Store Name]"} collects, uses, and discloses your personal information when you visit or make a purchase from our website.

1. INFORMATION WE COLLECT
When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.

2. HOW WE USE YOUR INFORMATION
We use the collected information to:
- Process and fulfill orders (including shipping, delivery, and returns).
- Communicate with you regarding orders and service updates.
- Screen our orders for potential risk or fraud.
- Comply with legal obligations under Indian law.

3. DATA SHARING
We share your Personal Information with service providers to help us fulfill our contracts with you, such as:
- Payment Gateways (Razorpay, PhonePe) for secure payment processing.
- Logistics Partners for delivering your orders.
- We do not sell or rent your personal data to third parties.

4. USER RIGHTS
You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.

5. CONTACT & GRIEVANCE OFFICER
For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at ${formData.email || "[Email]"}.

Grievance Officer:
Name: ${formData.officerName || "[Officer Name]"}
Address: ${formData.address || "[Business Address]"}
    `.trim();
  };

  const generateTerms = () => {
    return `
TERMS OF SERVICE

1. OVERVIEW
This website is operated by ${formData.storeName || "[Store Name]"}. Throughout the site, the terms “we”, “us” and “our” refer to ${formData.storeName || "[Store Name]"}. By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions.

2. GOVERNING LAW
These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in ${formData.city || "[City]"}, India.

3. ACCURACY OF INFORMATION
We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only. Prices for our products are subject to change without notice.

4. THIRD-PARTY LINKS
Certain content, products, and services available via our Service may include materials from third-parties. We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites.

5. CONTACT INFORMATION
Questions about the Terms of Service should be sent to us at ${formData.email || "[Email]"}.
    `.trim();
  };

  const generateRefund = () => {
    return `
REFUND & CANCELLATION POLICY

1. ELIGIBILITY FOR RETURNS
To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You will also need the receipt or proof of purchase.
- Return Window: You have ${formData.returnDays} days after receiving your item to request a return.

2. HOW TO INITIATE A RETURN
To start a return, you can contact us at ${formData.email || "[Email]"}. If your return is accepted, we will send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.

3. REFUNDS
We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 5-7 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.

4. DAMAGES AND ISSUES
Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.

5. CANCELLATION POLICY
Orders can be cancelled within ${formData.cancellationHours} hours of placement or before the order has been dispatched, whichever is earlier. Once shipped, the order cannot be cancelled.
    `.trim();
  };

  const generateShipping = () => {
    return `
SHIPPING POLICY

1. PROCESSING TIME
All orders are processed within ${formData.processTime} business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.

2. SHIPPING RATES & DELIVERY ESTIMATES
Shipping charges for your order will be calculated and displayed at checkout.
- Standard Shipping: Estimated delivery time is ${formData.shipTime} business days.
- Delivery delays can occasionally occur due to logistics partners.

3. SHIPMENT CONFIRMATION & ORDER TRACKING
You will receive a Shipment Confirmation email/SMS once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.

4. INTERNATIONAL SHIPPING
We currently do not ship outside India. (Edit this section if you ship internationally).
    `.trim();
  };

  // Helper to get current text
  const getCurrentText = () => {
    if (activeTab === 'privacy') return generatePrivacy();
    if (activeTab === 'terms') return generateTerms();
    if (activeTab === 'refund') return generateRefund();
    return generateShipping();
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* --- LEFT: EDITOR --- */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8">
            
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="p-2 rounded-lg bg-orange-500/20">
                    <FileText className="text-orange-500" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Store Details</h2>
                    <p className="text-xs text-gray-400">Fill once, generate all policies.</p>
                </div>
            </div>

            <div className="space-y-5">
                {/* 1. Identity */}
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3 block">Basic Info</label>
                    <div className="space-y-3">
                        <input name="storeName" placeholder="Store Name (e.g. UrbanKick)" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                        <input name="email" placeholder="Support Email" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                        <input name="website" placeholder="Website URL (Optional)" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                    </div>
                </div>

                {/* 2. Legal */}
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3 block flex items-center gap-2">
                        Legal Compliance <ShieldCheck size={12} className="text-green-500"/>
                    </label>
                    <div className="space-y-3">
                        <input name="officerName" placeholder="Grievance Officer Name (Your Name)" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                        <input name="address" placeholder="Business Address (Full)" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                        
                        {/* CHANGED: Removed flex container, now they stack vertically */}
                        <input name="city" placeholder="City (For Jurisdiction)" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                        
                        {/* CHANGED: Made mandatory and moved below city */}
                        <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm" />
                    </div>
                </div>

                {/* 3. Logic - FIXED DROPDOWNS HERE */}
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3 block">Operational Logic</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] text-gray-400 mb-1 block">Return Window</label>
                            <select 
                                name="returnDays" 
                                value={formData.returnDays} // CONTROLLED INPUT
                                onChange={handleChange} 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:border-orange-500 outline-none text-sm cursor-pointer"
                            >
                                <option value="5" className="text-black">5 Days</option>
                                <option value="7" className="text-black">7 Days</option>
                                <option value="15" className="text-black">15 Days</option>
                                <option value="30" className="text-black">30 Days</option>
                                <option value="0" className="text-black">No Returns</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-400 mb-1 block">Cancel Time</label>
                            <select 
                                name="cancellationHours" 
                                value={formData.cancellationHours} // CONTROLLED INPUT
                                onChange={handleChange} 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:border-orange-500 outline-none text-sm cursor-pointer"
                            >
                                <option value="12" className="text-black">12 Hours</option>
                                <option value="24" className="text-black">24 Hours</option>
                                <option value="0" className="text-black">Until Dispatched</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-400 mb-1 block">Dispatch Time</label>
                            <input name="processTime" placeholder="e.g. 1-2" defaultValue="1-2" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm" />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-400 mb-1 block">Delivery Time</label>
                            <input name="shipTime" placeholder="e.g. 5-7" defaultValue="5-7" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- RIGHT: PREVIEW --- */}
      <div className="lg:col-span-7 space-y-6 sticky top-24">
        
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['privacy', 'terms', 'refund', 'shipping'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}
                >
                    {tab} Policy
                </button>
            ))}
        </div>

        {/* Preview Box */}
        <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden min-h-[600px] flex flex-col relative">
            
            {/* Disclaimer Bar */}
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center gap-2 text-xs text-yellow-500">
                <AlertTriangle size={14} />
                <span><b>Disclaimer:</b> Not legal advice. Customize before using.</span>
            </div>

            {/* Toolbar */}
            <div className="bg-[#1a1a1a] border-b border-white/5 px-6 py-3 flex justify-between items-center">
                <div className="text-gray-400 text-xs font-mono uppercase">Preview: {activeTab} Policy</div>
                <button 
                    onClick={handleCopy} 
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                    {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? "Copied!" : "Copy Text"}
                </button>
            </div>

            {/* Text Area */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[600px] custom-scrollbar">
                <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm leading-relaxed">
                    {getCurrentText()}
                </pre>
            </div>

            {/* Watermark */}
            <div className="p-4 text-center border-t border-white/5">
                <p className="text-xs text-gray-600">Generated by <span className="text-orange-500">ReadyFlow</span> • Razorpay Compliant</p>
            </div>
        </div>

      </div>

    </div>
  );
};

export default PolicyGenerator;