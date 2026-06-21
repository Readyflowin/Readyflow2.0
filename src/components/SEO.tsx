import { useEffect } from "react";
import { SITE_ORIGIN } from "../lib/seoRoutes";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string | null;
  image?: string;
  type?: "article" | "website";
  noindex?: boolean;
};

function setMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOg(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(path: string | null) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (path === null) {
    element?.remove();
    return;
  }
  const url = `${SITE_ORIGIN}${path}`;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
  setOg("og:url", url);
}

export default function SEO({
  title,
  description,
  canonicalPath = "/",
  image,
  type = "website",
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    setOg("og:type", type);
    setCanonical(canonicalPath);
    if (image) {
      setOg("og:image", `${SITE_ORIGIN}${image}`);
      setMeta("twitter:card", "summary_large_image");
      setMeta("twitter:title", title);
      setMeta("twitter:description", description);
      setMeta("twitter:image", `${SITE_ORIGIN}${image}`);
    }
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }
  }, [canonicalPath, description, image, noindex, title, type]);

  return null;
}
