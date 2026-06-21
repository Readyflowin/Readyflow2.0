import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import PublicShell from "./components/PublicShell";
import { canonicalUrl, CORE_SITEMAP_PATHS, HOME_STATIC_ROUTE, PUBLISHED_SEO_ROUTES, SITE_ORIGIN, type SeoRoute } from "./lib/seoRoutes";
import { buildSeoStructuredData, type SeoFaq } from "./lib/seoStructuredData";
import EcommerceWebsiteDevelopmentIndia, { FAQS as ecommerceFaqs } from "./pages/EcommerceWebsiteDevelopmentIndia";
import ShopifyStoreSetupCostIndia, { FAQS as costFaqs } from "./pages/ShopifyStoreSetupCostIndia";
import ShopifyStoreSetupIndia, { FAQS as setupFaqs } from "./pages/ShopifyStoreSetupIndia";
import ClothingBrandWebsite, { FAQS as clothingFaqs } from "./pages/ClothingBrandWebsite";
import JewelleryEcommerceWebsite, { FAQS as jewelleryFaqs } from "./pages/JewelleryEcommerceWebsite";
import InstagramBrandShopifyStore, { FAQS as instagramFaqs } from "./pages/InstagramBrandShopifyStore";
import HomePage from "./pages/HomePage";

const PAGE_COMPONENTS = {
  home: HomePage,
  shopify_store_setup_india: ShopifyStoreSetupIndia,
  shopify_store_setup_cost_india: ShopifyStoreSetupCostIndia,
  ecommerce_website_development_india: EcommerceWebsiteDevelopmentIndia,
  clothing_brand_website: ClothingBrandWebsite,
  jewellery_ecommerce_website: JewelleryEcommerceWebsite,
  instagram_brand_shopify_store: InstagramBrandShopifyStore,
} as const;

const PAGE_FAQS: Record<string, readonly SeoFaq[]> = {
  shopify_store_setup_india: setupFaqs,
  shopify_store_setup_cost_india: costFaqs,
  ecommerce_website_development_india: ecommerceFaqs,
  clothing_brand_website: clothingFaqs,
  jewellery_ecommerce_website: jewelleryFaqs,
  instagram_brand_shopify_store: instagramFaqs,
};

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function structuredDataScript(route: SeoRoute): string {
  const json = JSON.stringify(buildSeoStructuredData(route, PAGE_FAQS[route.pageId] || [])).replaceAll("<", "\\u003c");
  return `<script id="${route.schemaId}" type="application/ld+json">${json}</script>`;
}

export function renderSeoHead(route: SeoRoute): string {
  const canonical = canonicalUrl(route.path);
  const image = canonicalUrl(route.ogImage);
  const type = route.pageType === "article" || route.pageType === "article-service" ? "article" : "website";

  return [
    "<!--seo-head:start-->",
    `<title>${escapeAttribute(route.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(route.description)}" />`,
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeAttribute(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttribute(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    structuredDataScript(route),
    "<!--seo-head:end-->",
  ].join("\n    ");
}

export function renderSeoRoute(route: SeoRoute): string {
  const Page = PAGE_COMPONENTS[route.pageId as keyof typeof PAGE_COMPONENTS];
  if (!Page) throw new Error(`No static page component registered for ${route.pageId}`);
  const page = createElement(Page);
  const shell = createElement(PublicShell, null, page);
  return renderToString(createElement(StaticRouter, { location: route.path }, shell));
}

export function getStaticRoutes(): readonly SeoRoute[] {
  return [HOME_STATIC_ROUTE, ...PUBLISHED_SEO_ROUTES];
}

export function buildSitemapXml(): string {
  const coreEntries = CORE_SITEMAP_PATHS.map((path) => ({ path, lastmod: "2026-06-20", priority: path === "/" ? "1.0" : "0.6" }));
  const articleEntries = PUBLISHED_SEO_ROUTES.filter((route) => route.sitemapInclude && route.indexable).map((route) => ({
    path: route.path,
    lastmod: route.updatedDate,
    priority: "0.9",
  }));
  const entries = [...coreEntries, ...articleEntries];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => [
      "  <url>",
      `    <loc>${canonicalUrl(entry.path)}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n")),
    "</urlset>",
  ].join("\n");
}

export { SITE_ORIGIN };
