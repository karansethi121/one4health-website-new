import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use secret service role key on backend to bypass RLS policies
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable.');
}

if (!supabaseServiceKey) {
  console.warn(
    'Warning: SUPABASE_SERVICE_ROLE_KEY is missing. In local development, please add SUPABASE_SERVICE_ROLE_KEY to your .env file.'
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || process.env.VITE_SUPABASE_ANON_KEY || 'local-dev-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
