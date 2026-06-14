import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic, x-shopify-shop-domain",
};

// ─── HMAC verification ────────────────────────────────────────────────────────

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

// ─── ShipRocket helpers ───────────────────────────────────────────────────────

async function getShipRocketToken(email: string, password: string): Promise<string> {
  const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.token) {
    throw new Error(`ShipRocket auth failed: ${JSON.stringify(data)}`);
  }
  return data.token;
}

// deno-lint-ignore no-explicit-any
async function createShipRocketOrder(order: any): Promise<void> {
  const srEmail = Deno.env.get("SHIPROCKET_EMAIL");
  const srPassword = Deno.env.get("SHIPROCKET_PASSWORD");
  const pickupLocation = Deno.env.get("SHIPROCKET_PICKUP_LOCATION") || "Primary";

  if (!srEmail || !srPassword) {
    console.warn("ShipRocket credentials not configured — skipping ShipRocket sync.");
    return;
  }

  const token = await getShipRocketToken(srEmail, srPassword);

  const addr = order.shipping_address || order.billing_address || {};
  const customerEmail = order.email || order.contact_email || "";

  // Clean phone: take last 10 digits (handles +91 prefix and spaces)
  const rawPhone = addr.phone || order.customer?.phone || "";
  const phone = rawPhone.replace(/\D/g, "").slice(-10);

  const payload = {
    order_id: String(order.order_number || order.name || order.id),
    order_date: new Date(order.created_at || Date.now())
      .toISOString()
      .replace("T", " ")
      .slice(0, 19),
    pickup_location: pickupLocation,
    billing_customer_name: addr.first_name || "Customer",
    billing_last_name: addr.last_name || "",
    billing_address: addr.address1 || "",
    billing_address_2: addr.address2 || "",
    billing_city: addr.city || "",
    billing_pincode: addr.zip || "",
    billing_state: addr.province || "",
    billing_country: addr.country || "India",
    billing_email: customerEmail,
    billing_phone: phone,
    shipping_is_billing: true,
    // deno-lint-ignore no-explicit-any
    order_items: (order.line_items || []).map((item: any) => ({
      name: item.title || "Product",
      sku: item.sku || String(item.id),
      units: item.quantity,
      selling_price: parseFloat(item.price || "0"),
    })),
    payment_method:
      (order.gateway || "").toLowerCase().includes("cod") ? "COD" : "Prepaid",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: parseFloat(order.subtotal_price || "0"),
    length: parseInt(Deno.env.get("SHIPROCKET_PKG_LENGTH") || "10"),
    breadth: parseInt(Deno.env.get("SHIPROCKET_PKG_BREADTH") || "8"),
    height: parseInt(Deno.env.get("SHIPROCKET_PKG_HEIGHT") || "8"),
    weight: parseFloat(Deno.env.get("SHIPROCKET_PKG_WEIGHT") || "0.3"),
  };

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("ShipRocket order creation failed:", JSON.stringify(data));
  } else {
    console.log(
      `✅ ShipRocket order created: SR order ID ${data.order_id}, shipment ID ${data.shipment_id}`
    );
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables.");
    }

    const rawBody = await req.text();

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

    const order = JSON.parse(rawBody);
    console.log(`Processing order #${order.order_number || order.name} (Shopify ID: ${order.id})`);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ── 1. Upsert Customer ──────────────────────────────────────────────────

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

    // ── 2. Extract existing tracking info from Shopify fulfillments ─────────

    let trackingNumber: string | null = null;
    let trackingUrl: string | null = null;
    let trackingCompany: string | null = null;

    if (order.fulfillments && order.fulfillments.length > 0) {
      const latestFulfillment = order.fulfillments[order.fulfillments.length - 1];
      trackingNumber = latestFulfillment.tracking_number || null;
      trackingUrl = latestFulfillment.tracking_url || null;
      trackingCompany = latestFulfillment.tracking_company || null;
    }

    // ── 3. Calculate estimated delivery ────────────────────────────────────

    const orderDate = new Date(order.created_at || Date.now());
    const estimatedMin = new Date(orderDate);
    estimatedMin.setDate(estimatedMin.getDate() + 5);
    const estimatedMax = new Date(orderDate);
    estimatedMax.setDate(estimatedMax.getDate() + 7);
    const estimatedDelivery = `${estimatedMin.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${estimatedMax.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;

    // ── 4. Upsert Order to Supabase ─────────────────────────────────────────

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
    console.log(`Order upserted to Supabase: ${dbOrderId}`);

    // ── 5. Sync Line Items ──────────────────────────────────────────────────

    if (order.line_items && order.line_items.length > 0) {
      await supabase.from("order_items").delete().eq("order_id", dbOrderId);

      // deno-lint-ignore no-explicit-any
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

    // ── 6. Forward to ShipRocket (non-blocking — errors don't fail webhook) ─

    try {
      // Only create in ShipRocket if order is new (unfulfilled) and paid
      const topic = req.headers.get("x-shopify-topic") || "";
      const isNewOrder = topic === "orders/create" || !topic;
      const isPaid = (order.financial_status || "paid") !== "pending";

      if (isNewOrder && isPaid) {
        await createShipRocketOrder(order);
      }
    } catch (srError) {
      // Log but don't fail — Supabase sync already succeeded
      console.error("ShipRocket sync error (non-fatal):", srError);
    }

    console.log(`✅ Order #${order.order_number || order.name} processed successfully`);

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
