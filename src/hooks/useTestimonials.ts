import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';

export interface SupabaseTestimonial {
  id: string;
  name?: string;
  role?: string;
  quote?: string;
  image_url?: string;
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

      setTestimonials(data.map((t: SupabaseTestimonial) => ({
        id: t.id,
        name: t.name || 'Anonymous',
        role: t.role || 'Customer',
        quote: t.quote || '',
        image: t.image_url || '',
      })));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
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
