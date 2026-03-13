import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Testimonial, FAQ } from '@/types';

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

      const mappedProducts: Product[] = productsData.map((p: any) => ({
        id: p.handle,
        name: p.name,
        subtitle: p.subtitle,
        description: p.description,
        price: p.price / 100,
        originalPrice: p.compare_at_price ? p.compare_at_price / 100 : undefined,
        image: p.featured_image,
        images: p.product_images
          ? p.product_images.sort((a: any, b: any) => a.position - b.position).map((img: any) => img.image_url)
          : [p.featured_image],
        badge: p.badge,
        inStock: p.in_stock,
        quantity: p.quantity,
        packageSize: p.package_size,
        servingSize: p.serving_size,
        supplyDuration: p.supply_duration,
        benefits: p.benefits
          ? p.benefits.sort((a: any, b: any) => a.position - b.position).map((b: any) => b.benefit)
          : [],
        ingredients: p.ingredients
          ? p.ingredients.sort((a: any, b: any) => a.position - b.position).map((i: any) => ({
              name: i.name,
              amount: i.amount,
              dailyAmount: i.daily_amount,
              description: i.description,
            }))
          : [],
        howToUse: p.usage_instructions
          ? p.usage_instructions.sort((a: any, b: any) => a.position - b.position).map((u: any) => u.instruction)
          : [],
        whoItsFor: p.target_audience
          ? p.target_audience
              .filter((t: any) => !t.is_avoid)
              .sort((a: any, b: any) => a.position - b.position)
              .map((t: any) => t.description)
          : [],
        whoShouldAvoid: p.target_audience
          ? p.target_audience
              .filter((t: any) => t.is_avoid)
              .sort((a: any, b: any) => a.position - b.position)
              .map((t: any) => t.description)
          : [],
      }));

      setProducts(mappedProducts);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message);
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

      setTestimonials(data.map((t: any) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        quote: t.quote,
        image: t.image_url,
      })));
    } catch (err: any) {
      setError(err.message);
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

      setFaqs(data.map((f: any) => ({
        question: f.question,
        answer: f.answer,
      })));
    } catch (err: any) {
      setError(err.message);
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
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source }]);

      if (error) throw error;
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
