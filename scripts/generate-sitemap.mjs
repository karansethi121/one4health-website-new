import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://one4health.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Main SPA routes
const routes = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/shop', changefreq: 'weekly', priority: '0.9' },
  { path: '/product/ashwagandha-gummies-ksm66', changefreq: 'weekly', priority: '0.9' },
  { path: '/science', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
  { path: '/shipping', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.3' },
  { path: '/terms', changefreq: 'monthly', priority: '0.3' },
];

// Blog routes (rendered natively by Shopify)
const blogRoutes = [
  { path: '/blogs/science-wellness', changefreq: 'weekly', priority: '0.8' },
  { path: '/blogs/science-wellness/what-is-ashwagandha-a-complete-guide-to-the-herb-that-s-everywhere-right-now', changefreq: 'monthly', priority: '0.7' },
  { path: '/blogs/science-wellness/5-signs-your-body-is-running-on-cortisol-fumes-and-what-to-do', changefreq: 'monthly', priority: '0.7' },
  { path: '/blogs/science-wellness/ksm-66-vs-other-ashwagandha-extracts-why-the-difference-is-bigger-than-you-think', changefreq: 'monthly', priority: '0.7' },
  { path: '/blogs/science-wellness/the-real-reason-you-can-t-sleep-and-why-it-s-not-a-melatonin-deficiency', changefreq: 'monthly', priority: '0.7' },
  { path: '/blogs/science-wellness/burnout-isn-t-just-tiredness-the-physiological-reality-behind-i-can-t-anymore', changefreq: 'monthly', priority: '0.7' },
  { path: '/blogs/science-wellness/why-we-made-our-ashwagandha-sugar-free-and-why-it-actually-matters', changefreq: 'monthly', priority: '0.7' },
];

function generateSitemap() {
  const allRoutes = [...routes, ...blogRoutes];

  const xmlUrls = allRoutes.map(route => {
    return `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

  console.log(`🤖 Sitemap generated successfully at: ${sitemapPath}`);
}

generateSitemap();
