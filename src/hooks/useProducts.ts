import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

// --- Types ---
interface PositionedItem { position?: number | null }
interface SupabaseBenefit extends PositionedItem { benefit: string }
interface SupabaseIngredient extends PositionedItem { name: string; amount: string; daily_amount: string; description: string }
interface SupabaseInstruction extends PositionedItem { instruction: string }
interface SupabaseTarget extends PositionedItem { description: string; is_avoid: boolean }
interface SupabaseImage extends PositionedItem { image_url: string }

export interface SupabaseProduct {
  handle?: string;
  name?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  compare_at_price?: number;
  featured_image?: string;
  badge?: string;
  in_stock?: boolean;
  quantity?: number;
  package_size?: string;
  serving_size?: string;
  supply_duration?: string;
  shopify_variant_id?: string;
  selling_plan_id_15?: string;
  selling_plan_id_30?: string;
  benefits?: SupabaseBenefit[];
  ingredients?: SupabaseIngredient[];
  usage_instructions?: SupabaseInstruction[];
  target_audience?: SupabaseTarget[];
  product_images?: SupabaseImage[];
}

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/images/')) {
    const filename = url.replace('/images/', '');
    // @ts-ignore - ShopifyAssetsUrl injected dynamically
    return (typeof window !== 'undefined' && window.ShopifyAssetsUrl) 
      ? window.ShopifyAssetsUrl + filename 
      : url;
  }
  return url;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          benefits (benefit, position),
          ingredients (name, amount, daily_amount, description, position),
          usage_instructions (instruction, position),
          target_audience (description, is_avoid, position),
          product_images (image_url, position)
        `);

      if (productsError) throw productsError;

      if (!productsData) {
        setProducts([]);
        return;
      }

      const mappedProducts: Product[] = productsData.map((p: SupabaseProduct) => ({
        id: p.handle || 'unknown',
        name: p.name || 'Unknown Product',
        subtitle: p.subtitle || '',
        description: p.description || '',
        price: p.price || 0,
        originalPrice: p.compare_at_price || undefined,
        image: resolveImageUrl(p.featured_image || ''),
        images: p.product_images && p.product_images.length > 1
          ? p.product_images.sort((a, b) => (a.position || 0) - (b.position || 0)).map((img) => resolveImageUrl(img.image_url))
          : (p.handle === 'ashwagandha-gummies-ksm66' 
              ? [
                  '/images/p1.png',
                  '/images/p2.png',
                  '/images/p3.png',
                  '/images/p4.png',
                  '/images/p5.png',
                  '/images/p6.png'
                ]
              : [resolveImageUrl(p.featured_image || '')]),
        badge: p.badge,
        inStock: p.in_stock ?? true,
        quantity: p.quantity || 0,
        packageSize: p.package_size || '',
        servingSize: p.serving_size || '',
        supplyDuration: p.supply_duration || '',
        benefits: p.benefits
          ? p.benefits.sort((a, b) => (a.position || 0) - (b.position || 0)).map((b) => b.benefit)
          : [],
        ingredients: p.ingredients
          ? p.ingredients.sort((a, b) => (a.position || 0) - (b.position || 0)).map((i) => ({
              name: i.name || '',
              amount: i.amount || '',
              dailyAmount: i.daily_amount || '',
              description: i.description || '',
            }))
          : [],
        howToUse: p.usage_instructions
          ? p.usage_instructions.sort((a, b) => (a.position || 0) - (b.position || 0)).map((u) => u.instruction)
          : [],
        whoItsFor: p.target_audience
          ? p.target_audience
              .filter((t) => !t.is_avoid)
              .sort((a, b) => (a.position || 0) - (b.position || 0))
              .map((t) => t.description)
          : [],
        whoShouldAvoid: p.target_audience
          ? p.target_audience
              .filter((t) => t.is_avoid)
              .sort((a, b) => (a.position || 0) - (b.position || 0))
              .map((t) => t.description)
          : [],
        shopifyVariantId: p.shopify_variant_id,
        sellingPlanId15: p.selling_plan_id_15,
        sellingPlanId30: p.selling_plan_id_30,
      }));

      setProducts(mappedProducts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = () => {
    fetchProducts();
  };

  return { products, loading, error, refetch };
}
