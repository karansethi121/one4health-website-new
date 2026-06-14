import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../_lib/supabaseService';

// ─── Security helpers ─────────────────────────────────────────────────────────

// ShipRocket doesn't send HMAC headers — we use a shared secret token
// embedded in the webhook URL as ?token=SECRET (set in ShipRocket dashboard).
// timingSafeEqual prevents brute-force timing attacks on the comparison.
function verifyToken(provided: string, expected: string): boolean {
  try {
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Allowlist of hostnames that ShipRocket and its courier partners
// use for tracking URLs. We validate before forwarding to Shopify
// (which emails the URL directly to customers with notify_customer:true).
const TRACKING_URL_ALLOWLIST = [
  'shiprocket.co',
  'shiprocket.in',
  'track.delhivery.com',
  'www.bluedart.com',
  'bluedart.com',
  'ekart.in',
  'www.dtdc.com',
  'dtdc.com',
  'xpressbees.com',
  'www.xpressbees.com',
  'ecomexpress.in',
  'www.ecomexpress.in',
  'shadowfax.in',
  'www.shadowfax.in',
  'dotzot.in',
];

function sanitizeTrackingUrl(rawUrl: string | undefined, awb: string): string {
  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      const isHttps = parsed.protocol === 'https:';
      const isAllowed = TRACKING_URL_ALLOWLIST.some(
        (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
      );
      if (isHttps && isAllowed) return rawUrl;
      console.warn(`tracking_url "${rawUrl}" rejected (not in allowlist) — using default`);
    } catch {
      console.warn(`tracking_url "${rawUrl}" is not a valid URL — using default`);
    }
  }
  return `https://shiprocket.co/tracking/${encodeURIComponent(awb)}`;
}

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

  // ── Auth: verify shared secret token ───────────────────────────────────────
  // In ShipRocket dashboard, set the webhook URL as:
  //   https://your-app.vercel.app/api/webhooks/shiprocket?token=<SHIPROCKET_WEBHOOK_TOKEN>
  // ShipRocket will include ?token= on every call; we validate it here.
  const expectedToken = process.env.SHIPROCKET_WEBHOOK_TOKEN;
  if (expectedToken) {
    const providedToken = String(req.query?.token || req.headers?.['x-webhook-token'] || '');
    if (!providedToken || !verifyToken(providedToken, expectedToken)) {
      console.warn('ShipRocket webhook: invalid or missing token');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  } else {
    console.warn('SHIPROCKET_WEBHOOK_TOKEN not set — skipping auth (not safe for production)');
  }

  const {
    awb,
    order_id,
    courier,
    tracking_url,
    current_status,
  } = req.body || {};

  if (!awb || !order_id) {
    res.status(400).json({ error: 'awb and order_id are required' });
    return;
  }

  // Only create a Shopify fulfillment when ShipRocket has actually shipped
  const shippedStatuses = ['SHIPPED', 'Shipped', 'OUT FOR DELIVERY', 'DELIVERED'];
  if (!shippedStatuses.includes(current_status)) {
    console.log(`ShipRocket status "${current_status}" for order ${order_id} — no action needed`);
    res.status(200).json({ message: 'Status acknowledged, no action needed' });
    return;
  }

  // Validate tracking URL against allowlist before it reaches customers
  const trackingLink = sanitizeTrackingUrl(tracking_url, String(awb));

  try {
    // ── 1. Find Shopify order by order number ───────────────────────────────
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fo: any) => fo.status === 'open'
    );

    if (openFulfillmentOrders.length === 0) {
      console.log(`Order ${orderName} already fulfilled or has no open fulfillment orders`);
      res.status(200).json({ message: 'No open fulfillment orders to fulfill' });
      return;
    }

    // ── 3. Create Shopify fulfillment with validated ShipRocket tracking ────
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (updateError) console.error('Supabase update error:', updateError);

    res.status(200).json({ success: true, awb, order: orderName });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('ShipRocket webhook error:', msg);
    res.status(500).json({ error: msg });
  }
}
