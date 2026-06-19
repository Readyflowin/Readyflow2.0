import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
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

function setCanonical(path: string) {
  const url = `https://readyflow.in${path}`;
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
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
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    setCanonical(canonicalPath);
  }, [canonicalPath, description, title]);

  return null;
}
