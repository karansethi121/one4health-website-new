import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../_lib/supabaseService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Save to Supabase waitlist table
    const { error: insertError } = await supabaseAdmin
      .from('waitlist')
      .insert([{ email, source }]);

    if (insertError) {
      console.error('Waitlist insert error:', insertError);
      return res.status(500).json({ error: 'Failed to join waitlist' });
    }

    // 2. Sync to Shopify Customers via Edge Function (non-blocking)
    try {
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceRoleKey) {
        await fetch(`${supabaseUrl}/functions/v1/shopify-sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
            'apikey': serviceRoleKey,
          },
          body: JSON.stringify({ email, source, type: 'waitlist' }),
        });
      }
    } catch (syncError) {
      console.error('Shopify sync error:', syncError);
      // silently fail — Supabase insert succeeded, don't block user
    }

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return res.status(500).json({ error: errorMessage });
  }
}
