import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../_lib/supabaseService';

// ─── Shopify Admin API helper ─────────────────────────────────────────────────

async function shopifyFetch(path: string, method = 'GET', body?: unknown) {
  const domain = process.env.SHOPIFY_SHOP_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!domain || !token) throw new Error('SHOPIFY_SHOP_DOMAIN or SHOPIFY_ADMIN_API_TOKEN not set');

  const res = await fetch(`https://${domain}/admin/api/2024-01${path}`, {
    method,
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Shopify API ${method} ${path} failed: ${JSON.stringify(data)}`);
  return data;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const {
    awb,
    order_id,       // our Shopify order number, e.g. "1001"
    courier,
    tracking_url,
    current_status,
  } = req.body || {};

  if (!awb || !order_id) {
    res.status(400).json({ error: 'awb and order_id are required' });
    return;
  }

  // Only create Shopify fulfillment when ShipRocket ships the package
  const shippedStatuses = ['SHIPPED', 'Shipped', 'OUT FOR DELIVERY', 'DELIVERED'];
  if (!shippedStatuses.includes(current_status)) {
    console.log(`ShipRocket status "${current_status}" for order ${order_id} — no action needed`);
    res.status(200).json({ message: 'Status acknowledged, no action needed' });
    return;
  }

  try {
    // ── 1. Find the Shopify order by order number ───────────────────────────
    const orderName = String(order_id).startsWith('#') ? order_id : `#${order_id}`;
    const ordersData = await shopifyFetch(
      `/orders.json?name=${encodeURIComponent(orderName)}&status=any`
    );

    const shopifyOrder = ordersData.orders?.[0];
    if (!shopifyOrder) {
      res.status(404).json({ error: `Shopify order ${orderName} not found` });
      return;
    }

    // ── 2. Get open fulfillment orders ──────────────────────────────────────
    const foData = await shopifyFetch(
      `/orders/${shopifyOrder.id}/fulfillment_orders.json`
    );

    const openFulfillmentOrders = (foData.fulfillment_orders || []).filter(
      // deno-lint-ignore no-explicit-any
      (fo: any) => fo.status === 'open'
    );

    if (openFulfillmentOrders.length === 0) {
      console.log(`Order ${orderName} already fulfilled or no open fulfillment orders`);
      res.status(200).json({ message: 'No open fulfillment orders to fulfill' });
      return;
    }

    // ── 3. Create Shopify fulfillment with ShipRocket tracking ─────────────
    const trackingLink = tracking_url || `https://shiprocket.co/tracking/${awb}`;

    await shopifyFetch('/fulfillments.json', 'POST', {
      fulfillment: {
        message: 'Your order has been shipped via ShipRocket',
        notify_customer: true,
        tracking_info: {
          number: awb,
          url: trackingLink,
          company: courier || 'ShipRocket',
        },
        line_items_by_fulfillment_order: openFulfillmentOrders.map(
          // deno-lint-ignore no-explicit-any
          (fo: any) => ({ fulfillment_order_id: fo.id })
        ),
      },
    });

    console.log(`✅ Shopify order ${orderName} fulfilled with AWB ${awb}`);

    // ── 4. Update Supabase with tracking info ───────────────────────────────
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        tracking_number: awb,
        tracking_url: trackingLink,
        tracking_company: courier || 'ShipRocket',
        fulfillment_status: 'fulfilled',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', String(order_id).replace(/^#/, ''));

    if (updateError) {
      console.error('Supabase update error:', updateError);
    }

    res.status(200).json({ success: true, awb, order: orderName });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('ShipRocket webhook error:', msg);
    res.status(500).json({ error: msg });
  }
}
