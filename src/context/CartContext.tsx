import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface CartContextType {
  items: any[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (variantId: number, quantity?: number, attributes?: Record<string, string>) => Promise<void>;
  removeFromCart: (key: string) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Detect if we are running on a live Shopify store (cart routes will be present)
const isShopifyEnv = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.ShopifyData?.routes?.cart_add_url === 'string' &&
  window.ShopifyData.routes.cart_add_url !== '/cart/add.js'; // mocked routes point to /cart/add.js

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const refreshCart = useCallback(async () => {
    if (!isShopifyEnv()) return; // Skip in dev/mock mode
    setLoading(true);
    try {
      const response = await fetch('/cart.js');
      if (!response.ok) throw new Error('Failed to fetch Shopify cart');
      const cart = await response.json();
      setItems(cart.items);
      setTotalItems(cart.item_count);
      setTotalPrice(cart.total_price);
    } catch (error) {
      console.error('Failed to fetch Shopify cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize cart
  useEffect(() => {
    // 1. Check if we have mock data in localStorage
    if (!isShopifyEnv()) {
      const savedCart = localStorage.getItem('o4h_mock_cart');
      if (savedCart) {
        try {
          const { items: savedItems, totalItems: savedCount, totalPrice: savedTotal } = JSON.parse(savedCart);
          setItems(savedItems);
          setTotalItems(savedCount);
          setTotalPrice(savedTotal);
          console.info('[Dev] Restored mock cart from localStorage.');
          return;
        } catch (e) {
          console.error('[Dev] Failed to parse saved cart:', e);
        }
      }
    }

    // 2. Otherwise fall back to ShopifyData or refresh
    if (window.ShopifyData?.cart?.items?.length) {
      setItems(window.ShopifyData.cart.items);
      setTotalItems(window.ShopifyData.cart.item_count);
      setTotalPrice(window.ShopifyData.cart.total_price);
    } else {
      refreshCart();
    }
  }, [refreshCart]);

  // Persist mock cart to localStorage
  useEffect(() => {
    if (!isShopifyEnv()) {
      localStorage.setItem('o4h_mock_cart', JSON.stringify({
        items,
        totalItems,
        totalPrice
      }));
    }
  }, [items, totalItems, totalPrice]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const addToCart = useCallback(async (variantId: number, quantity = 1, attributes?: Record<string, string>) => {
    setIsOpen(true);
    setLoading(true);

    // Dev/mock mode – use in-memory cart state
    if (!isShopifyEnv()) {
      const product = window.ShopifyData?.all_products?.['ashwagandha-gummies-ksm66'];
      const price = product?.variants?.[0]?.price ?? 34900;
      const newItem = {
        id: variantId,
        key: String(variantId),
        variant_id: variantId,
        quantity,
        title: product?.title ?? 'Ashwagandha Gummies',
        product_title: product?.title ?? 'Ashwagandha Gummies',
        variant_title: 'Default Title',
        product_type: product?.type ?? 'Supplement',
        price,
        line_price: price * quantity,
        final_line_price: price * quantity,
        original_line_price: price * quantity,
        image: product?.featured_image ?? '/images/product_transparent.webp',
        properties: attributes ?? {},
      };
      setItems(prev => {
        const existing = prev.find((i: any) => i.key === String(variantId));
        if (existing) {
          return prev.map((i: any) =>
            i.key === String(variantId)
              ? { ...i, quantity: i.quantity + quantity, line_price: i.price * (i.quantity + quantity), final_line_price: i.price * (i.quantity + quantity) }
              : i
          );
        }
        return [...prev, newItem];
      });
      setTotalItems(prev => prev + quantity);
      setTotalPrice(prev => prev + price * quantity);
      setLoading(false);
      return;
    }

    // Live Shopify mode
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: variantId, quantity, properties: attributes }],
        }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const removeFromCart = useCallback(async (key: string) => {
    const previousItems = [...items];
    const itemToRemove = items.find((item: any) => item.key === key || item.id === key);

    if (itemToRemove) {
      setItems(items.filter((item: any) => item.key !== key && item.id !== key));
      setTotalItems(prev => prev - itemToRemove.quantity);
      setTotalPrice(prev => prev - itemToRemove.line_price);
    }

    // Dev mode – done (already updated local state)
    if (!isShopifyEnv()) return;

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 }),
      });
      if (!response.ok) throw new Error('Failed to remove from cart');
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      setItems(previousItems);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [items, refreshCart]);

  const updateQuantity = useCallback(async (key: string, quantity: number) => {
    const previousItems = [...items];
    const newItems = items.map((item: any) => {
      if (item.key === key || item.id === key) {
        const diff = quantity - item.quantity;
        const unitPrice = item.line_price / item.quantity;
        setTotalItems((prev: number) => prev + diff);
        setTotalPrice((prev: number) => prev + diff * unitPrice);
        return { ...item, quantity, line_price: quantity * unitPrice };
      }
      return item;
    });
    setItems(newItems);

    // Dev mode – done (already updated local state)
    if (!isShopifyEnv()) return;

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity }),
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setItems(previousItems);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [items, refreshCart]);

  const clearCart = useCallback(async () => {
    setItems([]);
    setTotalItems(0);
    setTotalPrice(0);

    // Dev mode – done
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
      console.error('Error clearing cart:', error);
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
