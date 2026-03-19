import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Testimonial, FAQ } from '@/types';

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/images/')) {
    const filename = url.replace('/images/', '');
    // @ts-ignore
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

      const mappedProducts: Product[] = productsData.map((p: any) => ({
        id: p.handle || 'unknown',
        name: p.name || 'Unknown Product',
        subtitle: p.subtitle || '',
        description: p.description || '',
        price: p.price || 0,
        originalPrice: p.compare_at_price || undefined,
        image: resolveImageUrl(p.featured_image || ''),
        images: p.product_images && p.product_images.length > 0
          ? p.product_images.sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).map((img: any) => resolveImageUrl(img.image_url))
          : [resolveImageUrl(p.featured_image || '')],
        badge: p.badge,
        inStock: p.in_stock ?? true,
        quantity: p.quantity || 0,
        packageSize: p.package_size || '',
        servingSize: p.serving_size || '',
        supplyDuration: p.supply_duration || '',
        benefits: p.benefits
          ? p.benefits.sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).map((b: any) => b.benefit)
          : [],
        ingredients: p.ingredients
          ? p.ingredients.sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).map((i: any) => ({
              name: i.name || '',
              amount: i.amount || '',
              dailyAmount: i.daily_amount || '',
              description: i.description || '',
            }))
          : [],
        howToUse: p.usage_instructions
          ? p.usage_instructions.sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).map((u: any) => u.instruction)
          : [],
        whoItsFor: p.target_audience
          ? p.target_audience
              .filter((t: any) => !t.is_avoid)
              .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
              .map((t: any) => t.description)
          : [],
        whoShouldAvoid: p.target_audience
          ? p.target_audience
              .filter((t: any) => t.is_avoid)
              .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
              .map((t: any) => t.description)
          : [],
        shopifyVariantId: p.shopify_variant_id,
        sellingPlanId15: p.selling_plan_id_15,
        sellingPlanId30: p.selling_plan_id_30,
      }));

      setProducts(mappedProducts);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]); // Fallback to empty array
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

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data) {
        setTestimonials([]);
        return;
      }

      setTestimonials(data.map((t: any) => ({
        id: t.id,
        name: t.name || 'Anonymous',
        role: t.role || 'Customer',
        quote: t.quote || '',
        image: t.image_url || '',
      })));
    } catch (err: any) {
      console.error('Error fetching testimonials:', err);
      setError(err.message);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const refetch = () => {
    fetchTestimonials();
  };

  return { testimonials, loading, error, refetch };
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;

      if (!data) {
        setFaqs([]);
        return;
      }

      setFaqs(data.map((f: any) => ({
        question: f.question || '',
        answer: f.answer || '',
      })));
    } catch (err: any) {
      console.error('Error fetching FAQs:', err);
      setError(err.message);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const refetch = () => {
    fetchFAQs();
  };

  return { faqs, loading, error, refetch };
}

export function useWaitlist() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinWaitlist = async (email: string, source?: string) => {
    try {
      setSubmitting(true);
      setError(null);

      // 1. Save to Supabase waitlist table
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source }]);

      if (error) throw error;

      // 2. Sync to Shopify Customers via Edge Function (non-blocking)
      try {
        const { data: session } = await supabase.auth.getSession();
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

        await fetch(`${supabaseUrl}/functions/v1/shopify-sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.session?.access_token || anonKey}`,
            'apikey': anonKey,
          },
          body: JSON.stringify({ email, source, type: 'waitlist' }),
        });
        console.log('[Waitlist] Shopify sync triggered for', email);
      } catch (shopifyErr) {
        // Silently fail — Supabase insert succeeded, don't block user
        console.warn('[Waitlist] Shopify sync failed (non-blocking):', shopifyErr);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return { joinWaitlist, submitting, success, error };
}

export function useContact() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      // 1. Save to Supabase contact_messages table
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (dbError) throw dbError;

      // 2. Sync to Shopify Customers via Edge Function (non-blocking)
      try {
        const { data: session } = await supabase.auth.getSession();
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

        await fetch(`${supabaseUrl}/functions/v1/shopify-sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.session?.access_token || anonKey}`,
            'apikey': anonKey,
          },
          body: JSON.stringify({ 
            ...data, 
            type: 'contact',
            source: 'Contact Page'
          }),
        });
        console.log('[Contact] Shopify sync triggered for', data.email);
      } catch (shopifyErr) {
        console.warn('[Contact] Shopify sync failed (non-blocking):', shopifyErr);
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('[Contact] Submission error:', err);
      setError(err.message);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return { sendMessage, submitting, success, error };
}
