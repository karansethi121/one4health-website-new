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

declare global {
  interface Window {
    ShopifyData: {
      product: any;
      cart: any;
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
