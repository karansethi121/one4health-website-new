import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  appendSiteName?: boolean;
}

/**
 * Custom hook to update document title and SEO meta tags dynamically.
 */
export function useSEO({
  title,
  description,
  keywords,
  canonical,
  appendSiteName = true,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = appendSiteName ? `${title} | One4Health™` : title;
    document.title = fullTitle;

    // 2. Update Description
    if (description) {
      // Standard description
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);

      // OpenGraph Description
      let ogDescMeta = document.querySelector('meta[property="og:description"]');
      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', description);
      }

      // Twitter Description
      let twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescMeta) {
        twitterDescMeta.setAttribute('content', description);
      }
    }

    // 3. Update Keywords
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywords);
    }

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const currentUrl = canonical || window.location.href;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 5. Update OpenGraph & Twitter Titles and URL
    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', currentUrl);
    }

    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', fullTitle);
    }

    let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', fullTitle);
    }
  }, [title, description, keywords, canonical, appendSiteName]);
}
