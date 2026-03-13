const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ylzhcpbrovizfyxuzkrh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsemhjcGJyb3ZpemZ5eHV6a3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTIzMTQsImV4cCI6MjA4ODk4ODMxNH0.nkXorpdLNN8Sh55n08ECAVj1EOOK8dzQV10-vH0Klqs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debug() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

debug();
