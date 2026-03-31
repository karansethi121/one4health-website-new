import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

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
  const [orders, setOrders] = useState<Order[]>([]);
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
      const normalizedEmail = email.trim().toLowerCase();
      const rawOrderNum = orderNumber.trim();
      const unhashedOrderNum = rawOrderNum.replace(/^#/, '');
      const searchTerms = [rawOrderNum, unhashedOrderNum, `#${unhashedOrderNum}`];
      // Filter unique terms to avoid redundant query parameters
      const uniqueSearchTerms = [...new Set(searchTerms)];

      const { data, error: queryError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('email', normalizedEmail)
        .in('order_number', uniqueSearchTerms)
        .maybeSingle();

      if (queryError) {
        console.error('Order query error:', queryError);
        setError('Something went wrong while searching. Please try again later.');
        return null;
      }

      if (!data) {
        setError(`No order found for ${email} with number #${orderNumber}. Please check the details in your confirmation email.`);
        return null;
      }

      setSelectedOrder(data as Order);
      return data as Order;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get all orders for an email address
   */
  const getOrdersByEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    setOrders([]);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const { data, error: queryError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('email', normalizedEmail)
        .order('created_at', { ascending: false });

      if (queryError) {
        setError('Failed to fetch orders. Please try again.');
        return [];
      }

      if (!data || data.length === 0) {
        setError('No orders found for this email address.');
        return [];
      }

      setOrders(data as Order[]);
      return data as Order[];
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear the current state
   */
  const reset = useCallback(() => {
    setOrders([]);
    setSelectedOrder(null);
    setError(null);
  }, []);

  return {
    orders,
    selectedOrder,
    loading,
    error,
    lookupOrder,
    getOrdersByEmail,
    setSelectedOrder,
    reset,
  };
}
