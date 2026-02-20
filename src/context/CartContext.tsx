import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface CartContextType {
  items: any[]; // Changed to any[] to accommodate Shopify's cart item structure
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const refreshCart = useCallback(async () => {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      setItems(cart.items);
      setTotalItems(cart.item_count);
      setTotalPrice(cart.total_price);
    } catch (error) {
      console.error('Failed to fetch Shopify cart:', error);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    if (window.ShopifyData?.cart) {
      setItems(window.ShopifyData.cart.items);
      setTotalItems(window.ShopifyData.cart.item_count);
      setTotalPrice(window.ShopifyData.cart.total_price);
    } else {
      refreshCart();
    }
  }, [refreshCart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const addToCart = useCallback(async (variantId: number, quantity = 1, attributes?: Record<string, string>) => {
    // Optimistic Update: Open cart immediately
    setIsOpen(true);
    setLoading(true);

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: variantId,
            quantity: quantity,
            properties: attributes
          }]
        })
      });

      if (!response.ok) throw new Error('Failed to add to cart');

      // Refresh to ensure we have the correct Shopify-assigned IDs/metadata
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Re-fetch true state on error
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const removeFromCart = useCallback(async (key: string) => {
    // Optimistic Update: Remove from local state immediately
    const previousItems = [...items];
    const itemToRemove = items.find(item => item.key === key || item.id === key);

    if (itemToRemove) {
      const newItems = items.filter(item => item.key !== key && item.id !== key);
      setItems(newItems);
      setTotalItems(prev => prev - itemToRemove.quantity);
      setTotalPrice(prev => prev - itemToRemove.line_price);
    }

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: key,
          quantity: 0
        })
      });

      if (!response.ok) throw new Error('Failed to remove from cart');

      // Refresh to sync everything (discounts, shipping estimates, etc)
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      setItems(previousItems); // Rollback
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [items, refreshCart]);

  const updateQuantity = useCallback(async (key: string, quantity: number) => {
    // Optimistic Update: Update quantity immediately
    const previousItems = [...items];
    const newItems = items.map(item => {
      if (item.key === key || item.id === key) {
        const diff = quantity - item.quantity;
        const unitPrice = item.line_price / item.quantity;

        // Update local stats
        setTotalItems(prev => prev + diff);
        setTotalPrice(prev => prev + (diff * unitPrice));

        return { ...item, quantity, line_price: quantity * unitPrice };
      }
      return item;
    });
    setItems(newItems);

    setLoading(true);
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
      });

      if (!response.ok) throw new Error('Failed to update quantity');

      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setItems(previousItems); // Rollback
      await refreshCart();
    } finally {
      setLoading(false);
    }
  }, [items, refreshCart]);

  const clearCart = useCallback(async () => {
    // Optimistic Update
    setItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    setLoading(true);

    try {
      const response = await fetch('/cart/clear.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
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
