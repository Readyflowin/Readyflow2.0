import { canonicalUrl, SITE_ORIGIN, type SeoRoute } from "./seoRoutes";

export type SeoFaq = {
  question: string;
  answer: string;
};

export function buildSeoStructuredData(
  route: SeoRoute,
  faqs: readonly SeoFaq[],
) {
  const pageUrl = canonicalUrl(route.path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: route.title,
      description: route.description,
      inLanguage: "en-IN",
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: route.h1, item: pageUrl },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "Readyflow",
      url: `${SITE_ORIGIN}/`,
      logo: `${SITE_ORIGIN}/icon.png`,
    },
  ];

  if (route.pageType !== "website") {
    graph.splice(1, 0, {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      headline: route.h1,
      description: route.description,
      url: pageUrl,
      datePublished: route.publishedDate,
      dateModified: route.updatedDate,
      inLanguage: "en-IN",
      author: { "@type": "Organization", name: route.author },
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      image: canonicalUrl(route.ogImage),
    });
  }

  if (route.pageType === "article-service") {
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Readyflow Shopify Launch Setup",
      serviceType: "Shopify store setup for small product brands",
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@id": `${SITE_ORIGIN}/#organization` },
    });
  }

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
