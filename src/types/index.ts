export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  badge?: string;
  inStock: boolean;
  quantity: number;
  packageSize: string;
  servingSize: string;
  supplyDuration: string;
  benefits: string[];
  ingredients: Ingredient[];
  howToUse: string[];
  whoItsFor: string[];
  whoShouldAvoid: string[];
  shopifyVariantId?: string;
  sellingPlanId15?: string;
  sellingPlanId30?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  dailyAmount: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
  subscriptionLevel?: '1month' | '3month';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ShopifyVariant {
  id: string | number;
  title?: string;
  price?: number;
  compare_at_price?: number | null;
  available?: boolean;
  sku?: string | null;
}

export interface ShopifyProduct {
  id?: string | number;
  handle?: string;
  title?: string;
  type?: string;
  vendor?: string;
  featured_image?: string;
  images?: string[];
  variants?: ShopifyVariant[];
}

export interface ShopifyCartItem {
  key: string;
  id: string | number;
  variant_id: string | number;
  quantity: number;
  title: string;
  product_title?: string;
  variant_title?: string;
  product_type?: string;
  price: number;
  line_price: number;
  final_line_price: number;
  original_line_price: number;
  final_price: number;
  original_price: number;
  image?: string;
  properties?: Record<string, string>;
}

export interface ShopifyCart {
  items?: ShopifyCartItem[];
  item_count?: number;
  total_price?: number;
}

declare global {
  interface Window {
    ShopifyData: {
      product: ShopifyProduct;
      all_products: Record<string, ShopifyProduct>;
      cart: ShopifyCart;
      routes: {
        root: string;
        cart_add_url: string;
        cart_change_url: string;
        cart_update_url: string;
        cart_url: string;
        predictive_search_url: string;
      };
    };
    ShopifyAssetsUrl: string;
  }
}
