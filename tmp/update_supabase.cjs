const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ylzhcpbrovizfyxuzkrh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsemhjcGJyb3ZpemZ5eHV6a3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTIzMTQsImV4cCI6MjA4ODk4ODMxNH0.nkXorpdLNN8Sh55n08ECAVj1EOOK8dzQV10-vH0Klqs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateData() {
  console.log('Updating products...');
  
  // 1. Update the main product
  const { data: pData, error: pError } = await supabase
    .from('products')
    .update({ 
      shopify_variant_id: '44489789997135',
      selling_plan_id_15: '1698070607',
      selling_plan_id_30: '1698037839',
      featured_image: 'https://one4health.com/cdn/shop/files/Gemini_Generated_Image_3rwek93rwek93rwe-Photoroom_d41753a8-02bc-4a2b-adb5-0fcb13f1684c.png?v=1771419062'
    })
    .eq('handle', 'ashwagandha-gummies-ksm66')
    .select('id')
    .single();

  if (pError) {
    console.error('Error updating products:', pError);
  } else {
    console.log('Successfully updated product!', pData);
    
    // 2. Update product images
    const { error: iError } = await supabase
      .from('product_images')
      .update({
        image_url: 'https://one4health.com/cdn/shop/files/Gemini_Generated_Image_3rwek93rwek93rwe-Photoroom_d41753a8-02bc-4a2b-adb5-0fcb13f1684c.png?v=1771419062'
      })
      .eq('product_id', pData.id)
      .eq('position', 0);
      
    if (iError) {
      console.error('Error updating images:', iError);
    } else {
      console.log('Successfully updated product images');
    }
  }
}

updateData();
