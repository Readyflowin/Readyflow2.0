import { MetadataRoute } from "next";
import { cities } from "@/lib/cityData";

const baseUrl = "https://readyflow.in";

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 }, // High priority (Lead Magnets)
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 }, // Hub page
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/refund`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // 2. Tool Routes (Matches your Sidebar & Navbar)
  const toolRoutes: MetadataRoute.Sitemap = [
    "/tools/rto-shield",
    "/tools/smart-chatbot",
    "/tools/policy-generator",
    "/tools/popup-builder",
    "/tools/profit-calculator",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9, // High priority because these are entry points
  }));

  // 3. Service Routes
  const serviceRoutes: MetadataRoute.Sitemap = [
    "/services/shopify-store-setup",
    // Agar future me aur services aayin toh yahan add karna
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. City-based SEO (Dynamic Generation)
  // NOTE: 'encodeURIComponent' is critical for cities like "Navi Mumbai" -> "navi%20mumbai"
  const cityRoutes: MetadataRoute.Sitemap = Object.keys(cities || {}).map((city) => ({
    url: `${baseUrl}/locations/${encodeURIComponent(city.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: "weekly", // Increased frequency because you are actively tweaking content
    priority: 0.8, // Increased priority as these are your main Landing Pages
  }));

  // 5. Guides / Blog Posts
  const guideRoutes: MetadataRoute.Sitemap = [
    "/guides/how-to-start-selling-online-india",
    "/guides/shopify-vs-woocommerce-india-cost",
    "/guides/rto-reduction-strategy-india",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...guideRoutes,
  ];
}