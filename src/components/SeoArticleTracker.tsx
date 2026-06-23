import { useEffect } from "react";
import { captureTrafficAttribution } from "../lib/attribution";
import { isPublicTrackablePath } from "../lib/publicRoutes";
import { trackArticleScroll, trackQualifiedReader, trackViewContent } from "../lib/metaPixel";

type SeoArticleTrackerProps = {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  section?: string;
  value?: number;
  currency?: string;
};

export default function SeoArticleTracker({ articleSlug, articleTitle, articleCategory, section = "article_view", value = 14999, currency = "INR" }: SeoArticleTrackerProps) {
  useEffect(() => {
    if (!isPublicTrackablePath(window.location.pathname)) return;
    const attribution = captureTrafficAttribution();
    const context = {
      article_slug: articleSlug,
      article_title: articleTitle,
      article_category: articleCategory,
      section,
      value,
      currency,
      traffic_source_group: attribution?.traffic_source_group,
      traffic_source_label: attribution?.traffic_source_label,
    };
    trackViewContent(context);

    const article = document.querySelector<HTMLElement>("article.editorial-shell");
    const seenDepths = new Set<number>();
    const checkDepth = () => {
      if (!article || document.hidden) return;
      const rect = article.getBoundingClientRect();
      const visibleProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / Math.max(article.offsetHeight, 1)));
      [50, 90].forEach((depth) => {
        if (visibleProgress >= depth / 100 && !seenDepths.has(depth)) {
          seenDepths.add(depth);
          trackArticleScroll({ ...context, scroll_depth: depth });
        }
      });
    };
    let visibleStartedAt = document.hidden ? 0 : Date.now();
    let visibleElapsedMs = 0;
    let qualified = false;
    const checkQualifiedReader = () => {
      if (qualified || document.hidden || !visibleStartedAt) return;
      if (visibleElapsedMs + Date.now() - visibleStartedAt >= 60000) {
        qualified = true;
        trackQualifiedReader({ ...context, active_time_seconds: 60 });
      }
    };
    const interval = window.setInterval(checkQualifiedReader, 1000);
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (visibleStartedAt) visibleElapsedMs += Date.now() - visibleStartedAt;
        visibleStartedAt = 0;
      } else {
        visibleStartedAt = Date.now();
        checkDepth();
      }
    };
    window.addEventListener("scroll", checkDepth, { passive: true });
    window.addEventListener("resize", checkDepth);
    document.addEventListener("visibilitychange", onVisibilityChange);
    checkDepth();
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", checkDepth);
      window.removeEventListener("resize", checkDepth);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [articleCategory, articleSlug, articleTitle, currency, section, value]);
  return null;
}
