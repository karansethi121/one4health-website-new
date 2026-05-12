import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/types';
import { faqs as fallbackFAQs } from '@/data/products';

export interface SupabaseFAQ {
  position?: number | null;
  question?: string;
  answer?: string;
}

// Module-level cache — one fetch per session
let _faqsCache: { data: FAQ[]; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export function useFAQs() {
  const hasCache = _faqsCache !== null && (Date.now() - _faqsCache.ts) < CACHE_TTL;
  const [faqs, setFaqs] = useState<FAQ[]>(hasCache ? _faqsCache!.data : []);
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    if (_faqsCache && (Date.now() - _faqsCache.ts) < CACHE_TTL) {
      setFaqs(_faqsCache.data);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;

      const mapped: FAQ[] = (data || []).map((f: SupabaseFAQ) => ({
        question: f.question || '',
        answer: f.answer || '',
      }));

      _faqsCache = { data: mapped, ts: Date.now() };
      setFaqs(mapped);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setFaqs(fallbackFAQs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const refetch = () => {
    _faqsCache = null;
    fetchFAQs();
  };

  return { faqs, loading, error, refetch };
}
