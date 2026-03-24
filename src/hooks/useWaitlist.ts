import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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

      } catch (shopifyErr) {
        // silently fail — Supabase insert succeeded, don't block user
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return { joinWaitlist, submitting, success, error };
}
