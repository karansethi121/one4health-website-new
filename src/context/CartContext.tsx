import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  key: string;
  variant_id: string;
  quantity: number;
  title: string;
  product_title: string;
  variant_title: string;
  product_type: string;
  // Prices stored in smallest currency unit (paise) to match Shopify
  price: number;           // unit price in paise
  line_price: number;      // price * qty
  final_line_price: number;
  original_line_price: number;
  final_price: number;
  original_price: number;
  image: string;
  properties: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    variantId: string,
    quantity?: number,
    attributes?: Record<string, string>,
    sellingPlanId?: string,
    overridePrice?: number,
    overrideTitle?: string
  ) => Promise<void>;
  removeFromCart: (key: string) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number; // in paise (smallest unit) - divide by 100 for display
  loading: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

const isShopifyEnv = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.ShopifyData?.routes?.cart_add_url === 'string' &&
  window.ShopifyData.routes.cart_add_url !== '/cart/add.js';

/** Derive totalItems and totalPrice from items array - single source of truth */
const deriveCartTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + (item.final_line_price || item.line_price || 0), 0),
});

const MOCK_PRODUCT_PRICE = 36900; // paise = ₹369 (Shopify format)
const MOCK_ORIGINAL_PRICE = 44900; // paise = ₹449 (Shopify format)
const MOCK_IMAGE = '/images/product_main_new.png';

// ─── Provider ─────────────────────────────────────────────────────────────────

const transformCartItems = (rawItems: CartItem[]): CartItem[] => {
  return rawItems.map(item => {
    const isAshwa = (item.title || item.product_title || '').toLowerCase().includes('ashwa');
    if (!isAshwa) return item;

    const isBundle = item.properties && item.properties._bundle === 'true';
    if (isBundle) {
      const bundlesCount = Math.max(1, Math.floor(item.quantity / 2));
      return {
        ...item,
        price: 34450,
        original_price: 44900,
        final_price: 34450,
        line_price: 68900 * bundlesCount,
        final_line_price: 68900 * bundlesCount,
        original_line_price: 89800 * bundlesCount
      };
    } else {
      return {
        ...item,
        price: 36900,
        original_price: 44900,
        final_price: 36900,
        line_price: 36900 * item.quantity,
        final_line_price: 36900 * item.quantity,
        original_line_price: 44900 * item.quantity
      };
    }
  });
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemsState, setItemsState] = useState<CartItem[]>([]);
  
  // Wrapper to globally intercept and forcibly convert stale pricing from the live backend
  const setItems = useCallback((action: React.SetStateAction<CartItem[]>) => {
    setItemsState(prev => {
      const nextItems = typeof action === 'function' ? action(prev) : action;
      return transformCartItems(nextItems) as CartItem[];
    });
  }, []);
  
  const items = itemsState;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Derived totals - always computed from `items` to prevent state drift / NaN bugs
  const { totalItems, totalPrice } = deriveCartTotals(items);

  // Ref to latest items for callbacks that capture stale closures
  const itemsRef = useRef<CartItem[]>(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  // ── Shopify live refresh ──
  const refreshCart = useCallback(async () => {
    if (!isShopifyEnv()) return;
    setLoading(true);
    try {
      const response = await fetch('/cart.js');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const cart = await response.json();
      setItems(cart.items || []);
    } catch (error) {
      // silently fail — cart will be refreshed on next interaction
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Initialize cart ──
  useEffect(() => {
    if (!isShopifyEnv()) {
      // Dev mode: restore from localStorage
      try {
        const saved = localStorage.getItem('o4h_mock_cart');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setItems(parsed);
            // restored mock cart from localStorage
            return;
          }
        }
      } catch (e) {
        // failed to parse saved cart — start fresh
      }
      return;
    }
    // Live Shopify: load from window data or refresh
    if (window.ShopifyData?.cart?.items?.length) {
      setItems(window.ShopifyData.cart.items);
    } else {
      refreshCart();
    }
  }, [refreshCart]);

  // ── Persist mock cart ──
  useEffect(() => {
    if (!isShopifyEnv()) {
      localStorage.setItem('o4h_mock_cart', JSON.stringify(items));
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  // ── Add to cart ──
  const addToCart = useCallback(async (
    variantId: string,
    quantity = 1,
    attributes?: Record<string, string>,
    sellingPlanId?: string,
    overridePrice?: number, // in paise
    overrideTitle?: string
  ) => {

    setIsOpen(true);
    setLoading(true);

    // Dev / mock mode
    if (!isShopifyEnv()) {
      // Try to find product/variant in mock data for more accurate price/title
      const mockProduct = Object.values(window.ShopifyData?.all_products || {}).find((p: any) => 
        p.variants?.some((v: any) => v.id === variantId)
      ) as any;
      const mockVariant = mockProduct?.variants?.find((v: any) => v.id === variantId);

      const price = overridePrice ?? mockVariant?.price ?? MOCK_PRODUCT_PRICE;
      const title = overrideTitle ?? mockProduct?.title ?? 'Ashwagandha Gummies';
      const variantTitle = mockVariant?.title ?? 'Default Title';

      const newItem: CartItem = {
        id: variantId,
        key: variantId,
        variant_id: variantId,
        quantity,
        title: title,
        product_title: title,
        variant_title: variantTitle,
        product_type: mockProduct?.type ?? 'Supplement',
        price,
        line_price: price * quantity,
        final_line_price: price * quantity,
        original_line_price: (mockVariant?.compare_at_price ?? MOCK_ORIGINAL_PRICE) * quantity,
        final_price: price,
        original_price: mockVariant?.compare_at_price ?? MOCK_ORIGINAL_PRICE,
        image: mockProduct?.featured_image ?? MOCK_IMAGE,
        properties: attributes ?? {},
      };

      setItems(prev => {
        const existingIdx = prev.findIndex(i => i.key === variantId);
        if (existingIdx >= 0) {
          return prev.map((item, idx) => {
            if (idx !== existingIdx) return item;
            const newQty = item.quantity + quantity;
            return {
              ...item,
              quantity: newQty,
              line_price: item.price * newQty,
              final_line_price: item.price * newQty,
              original_line_price: item.original_price * newQty,
            };
          });
        }
        return [...prev, newItem];
      });

      setLoading(false);
      toast.success('Added to cart!');
      return;
    }

    // Live Shopify mode
    try {
      const payload: any = {
        items: [{ id: variantId, quantity, properties: attributes }],
      };
      if (sellingPlanId) {
        payload.items[0].selling_plan = sellingPlanId;
      }
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.description || 'Failed to add to cart');
      }
      await refreshCart();
      toast.success('Added to cart!');
    } catch (error: any) {

      toast.error(error?.message || 'Failed to add to cart. Please try again.');
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  // ── Remove item ──
  const removeFromCart = useCallback(async (key: string) => {
    // Optimistic update using functional setState (no stale closure)
    setItems(prev => prev.filter(item => item.key !== key && item.id !== key));

    if (!isShopifyEnv()) {
      toast.success('Item removed');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 }),
      });
      if (!response.ok) throw new Error('Failed to remove item');
      await refreshCart();
    } catch (error) {

      // Restore from ref on failure
      setItems(itemsRef.current);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  // ── Update quantity ──
  const updateQuantity = useCallback(async (key: string, newQty: number) => {
    // If quantity drops to 0 or below, remove the item instead
    if (newQty <= 0) {
      await removeFromCart(key);
      return;
    }

    // Optimistic update
    setItems(prev =>
      prev.map(item => {
        if (item.key !== key && item.id !== key) return item;
        const unitPrice = item.price || 0; // use stored unit price, not derived
        return {
          ...item,
          quantity: newQty,
          line_price: unitPrice * newQty,
          final_line_price: unitPrice * newQty,
          original_line_price: item.original_price ? item.original_price * newQty : unitPrice * newQty,
        };
      })
    );

    if (!isShopifyEnv()) return;

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: newQty }),
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      await refreshCart();
    } catch (error) {

      setItems(itemsRef.current);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [removeFromCart, refreshCart]);

  // ── Clear cart ──
  const clearCart = useCallback(async () => {
    setItems([]);

    if (!isShopifyEnv()) return;

    setLoading(true);
    try {
      const response = await fetch('/cart/clear.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      await refreshCart();
    } catch (error) {

      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
