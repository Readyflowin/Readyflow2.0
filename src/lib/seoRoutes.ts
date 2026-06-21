export const SITE_ORIGIN = "https://www.readyflow.site";

export type SeoPageType = "article" | "article-service" | "website";

export type SeoRoute = {
  path: string;
  pageId: string;
  title: string;
  description: string;
  h1: string;
  pageType: SeoPageType;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  sitemapInclude: boolean;
  indexable: boolean;
  ogImage: string;
  ctaSource?: string;
  schemaId: string;
  relatedPaths: string[];
};

export type PlannedSeoRoute = Pick<
  SeoRoute,
  "path" | "pageId" | "pageType" | "sitemapInclude" | "indexable"
>;

const route = (input: Omit<SeoRoute, "path"> & { path: string }): SeoRoute => input;

export const HOME_STATIC_ROUTE = route({
  path: "/",
  pageId: "home",
  title: "Mobile-First Shopify Stores for Social-First Brands | Readyflow",
  description:
    "Readyflow helps product brands selling through Instagram, WhatsApp, Facebook or offline launch clean mobile-first Shopify stores with product pages, policies and checkout guidance.",
  h1: "Mobile-first Shopify stores for growing brands",
  pageType: "website",
  category: "Shopify",
  author: "Readyflow Team",
  publishedDate: "2026-06-20",
  updatedDate: "2026-06-20",
  readingTime: "",
  sitemapInclude: false,
  indexable: true,
  ogImage: "/icon.png",
  schemaId: "readyflow-home-schema",
  relatedPaths: [
    "/shopify-store-setup-india",
    "/shopify-store-setup-cost-india",
    "/ecommerce-website-development-india",
  ],
});

export const PUBLISHED_SEO_ROUTES = [
  route({
    path: "/shopify-store-setup-india",
    pageId: "shopify_store_setup_india",
    title: "Shopify Store Setup in India for Instagram Brands | Readyflow",
    description:
      "Readyflow helps Indian Instagram-first brands launch mobile-first Shopify stores. Get theme setup, products, payments, policies, WhatsApp flow and more for ₹11,999.",
    h1: "Shopify Store Setup in India for Instagram Brands",
    pageType: "article-service",
    category: "Shopify / Ecommerce",
    author: "Readyflow Team",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "12 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/deazy-store.jpg",
    ctaSource: "seo_shopify_store_setup_india",
    schemaId: "shopify-store-setup-india-schema",
    relatedPaths: [
      "/shopify-store-setup-cost-india",
      "/ecommerce-website-development-india",
    ],
  }),
  route({
    path: "/shopify-store-setup-cost-india",
    pageId: "shopify_store_setup_cost_india",
    title: "Shopify Store Setup Cost in India | Readyflow",
    description:
      "Understand Shopify store setup cost in India. Readyflow's launch setup fee is ₹11,999, while Shopify plan, domain, apps, and third-party costs stay separate.",
    h1: "Shopify Store Setup Cost in India Explained Clearly",
    pageType: "article-service",
    category: "Money & Ecommerce / India",
    author: "Readyflow Editorial Desk",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "10 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/deazy-store.jpg",
    ctaSource: "seo_shopify_store_setup_cost_india",
    schemaId: "shopify-cost-india-schema",
    relatedPaths: [
      "/shopify-store-setup-india",
      "/ecommerce-website-development-india",
    ],
  }),
  route({
    path: "/ecommerce-website-development-india",
    pageId: "ecommerce_website_development_india",
    title: "Ecommerce Website Development in India for Small Brands | Readyflow",
    description:
      "Ecommerce website development in India for small product brands. Readyflow builds clean Shopify stores for Instagram-first sellers and growing businesses.",
    h1: "Ecommerce Website Development in India for Small Product Brands",
    pageType: "article-service",
    category: "Small Business & Ecommerce",
    author: "Readyflow Editorial Desk",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "11 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/confelion-store.jpg",
    ctaSource: "seo_ecommerce_website_development_india",
    schemaId: "ecommerce-development-india-schema",
    relatedPaths: [
      "/shopify-store-setup-india",
      "/shopify-store-setup-cost-india",
    ],
  }),
  route({
    path: "/clothing-brand-website",
    pageId: "clothing_brand_website",
    title: "Clothing Brand Website Design in India for Shopify Stores | Readyflow",
    description:
      "Explore what a clothing brand website in India should include, from collections and size charts to trust pages and mobile-first Shopify setup with Readyflow.",
    h1: "Clothing Brand Website Design for Indian Shopify Brands",
    pageType: "article-service",
    category: "Clothing Brand Ecommerce",
    author: "Readyflow Team",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "13 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/clothing-brand-storefront.svg",
    ctaSource: "seo_clothing_brand_website",
    schemaId: "clothing-brand-website-schema",
    relatedPaths: [
      "/shopify-store-setup-india",
      "/shopify-store-setup-cost-india",
      "/ecommerce-website-development-india",
    ],
  }),
  route({
    path: "/jewellery-ecommerce-website",
    pageId: "jewellery_ecommerce_website",
    title: "Jewellery Ecommerce Website Design for Indian Brands | Readyflow",
    description:
      "See what a jewellery ecommerce website should include for Indian brands, from product details and trust sections to Shopify setup with Readyflow.",
    h1: "Jewellery Ecommerce Website Design for Indian Shopify Brands",
    pageType: "article-service",
    category: "Jewellery Ecommerce",
    author: "Readyflow Team",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "12 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/jewellery-storefront.svg",
    ctaSource: "seo_jewellery_ecommerce_website",
    schemaId: "jewellery-ecommerce-website-schema",
    relatedPaths: [
      "/shopify-store-setup-india",
      "/shopify-store-setup-cost-india",
      "/ecommerce-website-development-india",
      "/clothing-brand-website",
    ],
  }),
  route({
    path: "/instagram-brand-shopify-store",
    pageId: "instagram_brand_shopify_store",
    title: "Turn Your Instagram Brand Into a Shopify Store in India | Readyflow",
    description:
      "Turn your Instagram brand into a proper Shopify store. Readyflow helps Indian product businesses launch mobile-first stores with product pages, WhatsApp flow and ₹11,999 setup.",
    h1: "Turn Your Instagram Brand Into a Shopify Store",
    pageType: "article-service",
    category: "Ecommerce Advice",
    author: "Readyflow Team",
    publishedDate: "2026-06-20",
    updatedDate: "2026-06-20",
    readingTime: "11 min read",
    sitemapInclude: true,
    indexable: true,
    ogImage: "/seo/instagram-to-shopify-store.svg",
    ctaSource: "seo_instagram_brand_shopify_store",
    schemaId: "instagram-brand-shopify-store-schema",
    relatedPaths: [
      "/shopify-store-setup-india",
      "/shopify-store-setup-cost-india",
      "/ecommerce-website-development-india",
      "/clothing-brand-website",
      "/jewellery-ecommerce-website",
    ],
  }),
] as const satisfies readonly SeoRoute[];

export const PLANNED_SEO_ROUTES = [
  "/shopify-vs-woocommerce-india",
  "/shopify-vs-wordpress-ecommerce-india",
  "/how-to-setup-shopify-store-india",
  "/shopify-store-launch-checklist-india",
].map(
  (path): PlannedSeoRoute => ({
    path,
    pageId: path.slice(1).replaceAll("-", "_"),
    pageType: "article",
    sitemapInclude: false,
    indexable: false,
  }),
);

export const CORE_SITEMAP_PATHS = [
  "/",
  "/work",
  "/pricing",
  "/privacy-policy",
  "/terms",
  "/refund-cancellation-policy",
  "/delivery-scope-policy",
] as const;

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}

export function getSeoRoute(path: string): SeoRoute {
  const found = PUBLISHED_SEO_ROUTES.find((route) => route.path === path);
  if (!found) throw new Error(`No published SEO route registered for ${path}`);
  return found;
}

export function isPublishedSeoPath(path: string): boolean {
  return PUBLISHED_SEO_ROUTES.some((route) => route.path === path);
}
