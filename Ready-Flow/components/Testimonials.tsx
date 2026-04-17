"use client";
import React, { useState } from 'react';
import { Star, User, Send, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

// --- EXPANDED FAKE DATA (Mixed Ratings for Realism) ---
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Dropshipper, Delhi",
    rating: 5,
    text: "The Policy Generator literally saved me 2 days. My Razorpay KYC got approved in the first attempt after using these policies. ₹29 is a joke for this value.",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Vikram Singh",
    role: "D2C Brand Owner",
    rating: 5,
    text: "I was skeptical about the custom code service for ₹4999, but the team delivered a stunning hero section. My conversion rate went up by 1.2%. Highly recommend.",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    role: "Jewellery Store",
    rating: 4,
    text: "Tools are great, especially the ROI calculator. Would love to see a WhatsApp automation tool next. Support is very responsive though.",
    date: "2 weeks ago"
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Freelance Developer",
    rating: 5,
    text: "I use ReadyFlow tools for my clients. Instead of writing policies from scratch, I just generate them here. Saves me hours of manual work.",
    date: "3 weeks ago"
  },
  {
    id: 5,
    name: "Priya Das",
    role: "Home Decor Brand",
    rating: 5,
    text: "Finally a tool built for Indian e-commerce. The shipping policy templates cover RTO clauses perfectly, which is a huge headache for us usually.",
    date: "1 month ago"
  },
  {
    id: 6,
    name: "Karan Wagh",
    role: "Shopify Starter",
    rating: 4,
    text: "Good collection of tools. The Profit Calculator helped me realize I was pricing my products too low. Good eye-opener.",
    date: "1 month ago"
  },
  {
    id: 7,
    name: "Mohd. Zeeshan",
    role: "Clothing Brand",
    rating: 5,
    text: "Bhai maza aa gaya. The custom header code you guys gave me looks premium. Worth every penny of the ₹4999 package.",
    date: "2 months ago"
  },
  {
    id: 8,
    name: "Ananya Roy",
    role: "Reseller",
    rating: 5,
    text: "Simple, clean, and fast. No ads, no nonsense. Just pure utility tools. Love the dark mode UI too.",
    date: "2 months ago"
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for "Show More"
  
  // Form State
  const [newReview, setNewReview] = useState({ name: '', role: '', text: '', rating: 5 });

  // Stats Calculation
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  // Logic: Show only 3 initially, or all if expanded
  const visibleReviews = isExpanded ? reviews : reviews.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewToAdd = {
      id: Date.now(),
      name: newReview.name,
      role: newReview.role || "Verified User",
      rating: newReview.rating,
      text: newReview.text,
      date: "Just now"
    };

    setReviews([reviewToAdd, ...reviews]); // Add to top
    setNewReview({ name: '', role: '', text: '', rating: 5 }); // Reset form
    setShowForm(false); // Close form
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* HEADER AREA with STATS */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Trusted by <span className="text-orange-500">Builders.</span>
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Star className="fill-orange-500 text-orange-500" size={24} />
                        <span className="text-3xl font-bold text-white">{averageRating}</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/20"></div>
                    <p className="text-gray-400 text-sm">Based on {totalReviews} verified reviews</p>
                </div>
            </div>

            <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
                {showForm ? "Cancel Review" : <><Plus size={16} className="mr-2"/> Write a Review</>}
            </Button>
        </div>

        {/* --- WRITE REVIEW FORM (Collapsible) --- */}
        {showForm && (
            <div className="mb-12 bg-[#111] border border-orange-500/30 rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold text-white mb-6">Share your experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            placeholder="Your Name" 
                            className="bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
                            value={newReview.name}
                            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                            required
                        />
                        <input 
                            placeholder="Your Role (e.g. Shopify Owner)" 
                            className="bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
                            value={newReview.role}
                            onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                        />
                    </div>
                    
                    {/* Star Rating Selector */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-400">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star} 
                                type="button"
                                onClick={() => setNewReview({...newReview, rating: star})}
                                className="transition-transform hover:scale-110"
                            >
                                <Star 
                                    size={20} 
                                    className={`${star <= newReview.rating ? "fill-orange-500 text-orange-500" : "text-gray-600"}`} 
                                />
                            </button>
                        ))}
                    </div>

                    <textarea 
                        placeholder="How did ReadyFlow help you?" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none min-h-[100px]"
                        value={newReview.text}
                        onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                        required
                    />
                    
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white w-full md:w-auto">
                        Submit Review <Send size={16} className="ml-2"/>
                    </Button>
                </form>
            </div>
        )}

        {/* --- REVIEWS GRID (Dynamic) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {visibleReviews.map((review) => (
                <div key={review.id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            {/* Initials Avatar */}
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white font-bold border border-white/10">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.role}</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-600 font-mono">{review.date}</span>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={14} 
                                className={`${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-800"}`} 
                            />
                        ))}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                        "{review.text}"
                    </p>
                </div>
            ))}
        </div>

        {/* --- SHOW MORE BUTTON --- */}
        {reviews.length > 3 && (
            <div className="flex justify-center">
                <Button 
                    variant="ghost" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-white hover:bg-white/5 gap-2"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={16}/></>
                    ) : (
                        <>Read {reviews.length - 3} More Reviews <ChevronDown size={16}/></>
                    )}
                </Button>
            </div>
        )}

      </div>
    </section>
  );
}