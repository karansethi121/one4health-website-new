import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/types';

export interface SupabaseFAQ {
  position?: number | null;
  question?: string;
  answer?: string;
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

      setFaqs(data.map((f: SupabaseFAQ) => ({
        question: f.question || '',
        answer: f.answer || '',
      })));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
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
