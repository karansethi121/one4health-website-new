import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../_lib/supabaseService';

// ─── Shopify Admin API helper ─────────────────────────────────────────────────

interface ShopifyLineItem {
  id: number;
  title: string;
  variant_title: string | null;
  quantity: number;
  price: string;
  sku: string | null;
  image?: { src: string } | null;
}

interface ShopifyFulfillment {
  tracking_number: string | null;
  tracking_company: string | null;
  tracking_url: string | null;
}

interface ShopifyOrder {
  id: number;
  order_number: number;
  name: string;
  email: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  subtotal_price: string;
  currency: string;
  created_at: string;
  order_status_url: string | null;
  shipping_address: {
    first_name?: string;
    last_name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
    phone?: string;
  } | null;
  fulfillments: ShopifyFulfillment[];
  line_items: ShopifyLineItem[];
}

function mapShopifyOrder(order: ShopifyOrder) {
  const fulfillment = order.fulfillments?.[0] ?? null;
  return {
    id: String(order.id),
    shopify_order_id: String(order.id),
    order_number: String(order.order_number),
    email: order.email,
    financial_status: order.financial_status,
    fulfillment_status: order.fulfillment_status ?? 'unfulfilled',
    total_price: parseFloat(order.total_price),
    subtotal_price: parseFloat(order.subtotal_price),
    currency: order.currency,
    created_at: order.created_at,
    order_status_url: order.order_status_url,
    shipping_address: order.shipping_address,
    tracking_number: fulfillment?.tracking_number ?? null,
    tracking_company: fulfillment?.tracking_company ?? null,
    tracking_url: fulfillment?.tracking_url ?? null,
    estimated_delivery: null,
    order_items: order.line_items.map((item) => ({
      id: String(item.id),
      title: item.title,
      variant_title: item.variant_title,
      quantity: item.quantity,
      price: parseFloat(item.price),
      sku: item.sku,
      image_url: item.image?.src ?? null,
    })),
  };
}

async function lookupViaShopify(email: string, orderNumber: string) {
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!shopDomain || !adminToken) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const orderName = orderNumber.trim().startsWith('#')
    ? orderNumber.trim()
    : `#${orderNumber.trim()}`;

  const url =
    `https://${shopDomain}/admin/api/2024-01/orders.json` +
    `?name=${encodeURIComponent(orderName)}&status=any` +
    `&fields=id,order_number,name,email,financial_status,fulfillment_status,` +
    `total_price,subtotal_price,currency,created_at,order_status_url,` +
    `shipping_address,fulfillments,line_items`;

  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': adminToken,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Shopify API error:', res.status, await res.text());
    return null;
  }

  const { orders } = (await res.json()) as { orders: ShopifyOrder[] };

  const match = orders.find(
    (o) => o.email.toLowerCase() === normalizedEmail
  );

  return match ? mapShopifyOrder(match) : null;
}

// ─── Supabase fallback ────────────────────────────────────────────────────────

async function lookupViaSupabase(email: string, orderNumber: string) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const rawOrderNum = String(orderNumber).trim();
  const unhashedOrderNum = rawOrderNum.replace(/^#/, '');
  const searchTerms = [...new Set([rawOrderNum, unhashedOrderNum, `#${unhashedOrderNum}`])];

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*, order_items (*)')
    .eq('email', normalizedEmail)
    .in('order_number', searchTerms)
    .maybeSingle();

  if (error) {
    console.error('Order query error:', error);
    throw new Error('Database query failed');
  }

  return data ?? null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, orderNumber } = req.body || {};
  if (!email || !orderNumber) {
    res.status(400).json({ error: 'Email and Order Number are required' });
    return;
  }

  try {
    // Try Shopify first (real-time ShipRocket tracking), fall back to Supabase
    const order =
      (await lookupViaShopify(email, orderNumber)) ??
      (await lookupViaSupabase(email, orderNumber));

    if (!order) {
      res.status(404).json({
        error: `No order found for ${email} with number #${orderNumber}. Please check the details in your confirmation email.`,
      });
      return;
    }

    res.status(200).json(order);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ error: msg });
  }
}
