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

      await refreshCart();
      setIsOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const removeFromCart = useCallback(async (key: string) => {
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

      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const updateQuantity = useCallback(async (key: string, quantity: number) => {
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
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  const clearCart = useCallback(async () => {
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
