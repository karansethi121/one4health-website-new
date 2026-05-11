import { useEffect } from 'react';

interface SEOMetaOptions {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  jsonLd?: object | object[];
}

export function useSEOMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  canonical,
  jsonLd,
}: SEOMetaOptions) {
  useEffect(() => {
    const prev = {
      title: document.title,
      description: getMeta('name', 'description'),
      ogTitle: getMeta('property', 'og:title'),
      ogDescription: getMeta('property', 'og:description'),
      ogImage: getMeta('property', 'og:image'),
      ogType: getMeta('property', 'og:type'),
      canonical: getCanonical(),
    };

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', ogTitle ?? title);
    setMeta('property', 'og:description', ogDescription ?? description);
    if (ogImage) setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', ogType);
    if (canonical) setCanonical(canonical);

    const scriptTag = injectJsonLd(jsonLd);

    return () => {
      document.title = prev.title;
      setMeta('name', 'description', prev.description);
      setMeta('property', 'og:title', prev.ogTitle);
      setMeta('property', 'og:description', prev.ogDescription);
      if (ogImage && prev.ogImage) setMeta('property', 'og:image', prev.ogImage);
      setMeta('property', 'og:type', prev.ogType);
      if (canonical && prev.canonical) setCanonical(prev.canonical);
      scriptTag?.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, canonical, jsonLd]);
}

function getMeta(attr: string, value: string): string {
  return document.querySelector(`meta[${attr}="${value}"]`)?.getAttribute('content') ?? '';
}

function setMeta(attr: string, value: string, content: string) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function getCanonical(): string {
  return document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(schema: object | object[] | undefined): HTMLScriptElement | null {
  if (!schema) return null;
  document.querySelector('script[data-seo-page]')?.remove();
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-seo-page', 'true');
  script.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
  document.head.appendChild(script);
  return script;
}
