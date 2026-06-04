import { useState, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  title: string;
  variant_title: string | null;
  quantity: number;
  price: number;
  image_url: string | null;
  sku: string | null;
}

export interface Order {
  id: string;
  shopify_order_id: string;
  order_number: string;
  email: string;
  financial_status: string;
  fulfillment_status: string;
  total_price: number;
  subtotal_price: number;
  currency: string;
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
  tracking_number: string | null;
  tracking_url: string | null;
  tracking_company: string | null;
  estimated_delivery: string | null;
  order_status_url: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Look up a single order by email + order number
   */
  const lookupOrder = useCallback(async (email: string, orderNumber: string) => {
    setLoading(true);
    setError(null);
    setSelectedOrder(null);

    try {
      const response = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, orderNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || `No order found for ${email} with number #${orderNumber}. Please check the details in your confirmation email.`);
        return null;
      }

      setSelectedOrder(data as Order);
      return data as Order;
    } catch {
      setError('Something went wrong while searching. Please try again later.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear the current state
   */
  const reset = useCallback(() => {
    setSelectedOrder(null);
    setError(null);
  }, []);

  return {
    selectedOrder,
    loading,
    error,
    lookupOrder,
    setSelectedOrder,
    reset,
  };
}
