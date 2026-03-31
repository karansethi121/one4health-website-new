import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

/**
 * Shopify Order Webhook Handler
 * Receives orders/create and orders/updated webhooks from Shopify,
 * syncs customer + order + line item data to Supabase.
 *
 * Security: HMAC signature verification using SHOPIFY_WEBHOOK_SECRET.
 * JWT verification is disabled since Shopify sends raw HTTP.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic, x-shopify-shop-domain",
};

// HMAC verification
async function verifyShopifyHmac(body: string, hmacHeader: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const computedHmac = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return computedHmac === hmacHeader;
  } catch (err) {
    console.error("HMAC verification error:", err);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // --- Environment Variables ---
    const WEBHOOK_SECRET = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables.");
    }

    // --- Read the raw body ---
    const rawBody = await req.text();

    // --- Verify HMAC (if secret is configured) ---
    if (WEBHOOK_SECRET) {
      const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";
      const isValid = await verifyShopifyHmac(rawBody, hmacHeader, WEBHOOK_SECRET);
      if (!isValid) {
        console.error("HMAC verification failed");
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      console.warn("SHOPIFY_WEBHOOK_SECRET not set — skipping HMAC verification.");
    }

    // --- Parse the order payload ---
    const order = JSON.parse(rawBody);
    console.log(`Processing order #${order.order_number || order.name} (Shopify ID: ${order.id})`);

    // --- Initialize Supabase client with service_role ---
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // --- 1. Upsert Customer ---
    let customerId: string | null = null;
    const customerEmail = order.email || order.contact_email;

    if (customerEmail) {
      const customerData = {
        email: customerEmail.toLowerCase(),
        first_name: order.customer?.first_name || order.shipping_address?.first_name || null,
        last_name: order.customer?.last_name || order.shipping_address?.last_name || null,
        phone: order.customer?.phone || order.shipping_address?.phone || order.phone || null,
        shopify_customer_id: order.customer?.id ? String(order.customer.id) : null,
        updated_at: new Date().toISOString(),
      };

      const { data: customerResult, error: customerError } = await supabase
        .from("customers")
        .upsert(customerData, { onConflict: "email" })
        .select("id")
        .single();

      if (customerError) {
        console.error("Customer upsert error:", customerError);
      } else {
        customerId = customerResult.id;
        console.log(`Customer upserted: ${customerId}`);
      }
    }

    // --- 2. Extract tracking info from fulfillments ---
    let trackingNumber: string | null = null;
    let trackingUrl: string | null = null;
    let trackingCompany: string | null = null;

    if (order.fulfillments && order.fulfillments.length > 0) {
      const latestFulfillment = order.fulfillments[order.fulfillments.length - 1];
      trackingNumber = latestFulfillment.tracking_number || null;
      trackingUrl = latestFulfillment.tracking_url || null;
      trackingCompany = latestFulfillment.tracking_company || null;
    }

    // --- 3. Calculate estimated delivery (5-7 business days from order) ---
    const orderDate = new Date(order.created_at || Date.now());
    const estimatedMin = new Date(orderDate);
    estimatedMin.setDate(estimatedMin.getDate() + 5);
    const estimatedMax = new Date(orderDate);
    estimatedMax.setDate(estimatedMax.getDate() + 7);
    const estimatedDelivery = `${estimatedMin.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${estimatedMax.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;

    // --- 4. Upsert Order ---
    const orderData = {
      customer_id: customerId,
      shopify_order_id: String(order.id),
      order_number: String(order.order_number || order.name || order.id),
      email: (customerEmail || "").toLowerCase(),
      financial_status: order.financial_status || "paid",
      fulfillment_status: order.fulfillment_status || "unfulfilled",
      total_price: parseFloat(order.total_price || "0"),
      subtotal_price: parseFloat(order.subtotal_price || "0"),
      currency: order.currency || "INR",
      shipping_address: order.shipping_address || null,
      billing_address: order.billing_address || null,
      tracking_number: trackingNumber,
      tracking_url: trackingUrl,
      tracking_company: trackingCompany,
      estimated_delivery: estimatedDelivery,
      order_status_url: order.order_status_url || null,
      note: order.note || null,
      updated_at: new Date().toISOString(),
    };

    const { data: orderResult, error: orderError } = await supabase
      .from("orders")
      .upsert(orderData, { onConflict: "shopify_order_id" })
      .select("id")
      .single();

    if (orderError) {
      console.error("Order upsert error:", orderError);
      throw new Error(`Order upsert failed: ${orderError.message}`);
    }

    const dbOrderId = orderResult.id;
    console.log(`Order upserted: ${dbOrderId}`);

    // --- 5. Sync Line Items ---
    if (order.line_items && order.line_items.length > 0) {
      // Delete existing items for this order (idempotent re-sync)
      await supabase.from("order_items").delete().eq("order_id", dbOrderId);

      const lineItems = order.line_items.map((item: any) => ({
        order_id: dbOrderId,
        shopify_line_item_id: item.id ? String(item.id) : null,
        title: item.title || item.name || "Unknown Item",
        variant_title: item.variant_title || null,
        quantity: item.quantity || 1,
        price: parseFloat(item.price || "0"),
        image_url: item.image?.src || null,
        sku: item.sku || null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(lineItems);

      if (itemsError) {
        console.error("Line items insert error:", itemsError);
      } else {
        console.log(`Inserted ${lineItems.length} line items`);
      }
    }

    console.log(`✅ Order #${order.order_number || order.name} synced successfully`);

    return new Response(
      JSON.stringify({ success: true, order_id: dbOrderId }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
