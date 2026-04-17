/**
 * Mock Shopify product data for dev/standalone mode.
 * On a live Shopify store, window.ShopifyData is injected by theme.liquid.
 * This fallback ensures the product pages work during local development.
 */

const MOCK_PRODUCT = {
  id: 1,
  handle: 'ashwagandha-gummies-ksm66',
  title: 'Ashwagandha Gummies',
  type: 'Dietary Supplement',
  vendor: 'One4Health™',
  featured_image: '/images/shop.png',
  images: [
    '/images/first.png',
    '/images/gallery-bioavailability.png',
    '/images/gallery-stress-sleep.png',
    '/images/gallery-why-daily.png',
    '/images/gallery-design.png',
    '/images/gallery-creative.png'
  ],
  options: [{ name: 'Title', values: ['Default Title'] }],
  variants: [
    {
      id: 'ashwagandha-gummies-ksm66',
      title: '1 Jar',
      price: 36900,
      compare_at_price: 44900,
      available: true,
      sku: 'O4H-ASH-001',
      option1: '1 Jar',
      option2: null,
      option3: null,
    },
    {
      id: 'ashwagandha-gummies-bundle-2',
      title: '2 Jars (Bundle)',
      price: 68900,
      compare_at_price: 89800,
      available: true,
      sku: 'O4H-ASH-002',
      option1: '2 Jars',
      option2: null,
      option3: null,
    },
  ],
  description: 'Clinically studied KSM-66® Ashwagandha with Vitamin D2 and BioPerine® for daily stress support and relaxation.',
  published_at: '2026-01-01T00:00:00Z',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
  tags: ['ashwagandha', 'gummies', 'stress', 'wellness'],
};

const MOCK_SHOPIFY_ROUTES = {
  root: '/',
  cart_add_url: '/cart/add.js',
  cart_change_url: '/cart/change.js',
  cart_update_url: '/cart/update.js',
  cart_url: '/cart',
  predictive_search_url: '/search/suggest',
};

/**
 * Injects mock Shopify data into window if not already present.
 * Call this early in main.tsx (before any component renders).
 */
export function injectMockShopifyDataIfNeeded(): void {
  if (typeof window === 'undefined') return;

  // Only inject if ShopifyData is missing or empty
  if (!window.ShopifyData || !window.ShopifyData.all_products || Object.keys(window.ShopifyData.all_products).length === 0) {
    window.ShopifyData = {
      product: MOCK_PRODUCT,
      all_products: {
        'ashwagandha-gummies-ksm66': MOCK_PRODUCT,
      },
      cart: {
        items: [],
        item_count: 0,
        total_price: 0,
      },
      routes: MOCK_SHOPIFY_ROUTES,
    };
    console.info('[Dev] Injected mock ShopifyData for local development.');
  }
}
