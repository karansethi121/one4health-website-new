import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StickyAddToCart() {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [isVisible, setIsVisible] = useState(false);
  
  const mainProduct = products.find(p => p.id === 'ashwagandha-gummies-ksm66');

  useEffect(() => {
    const handleScroll = () => {
      // Show when user has scrolled past the main hero (approx 700px)
      const scrollThreshold = 700;
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mainProduct) return null;

  const handleQuickAdd = () => {
    if (mainProduct.shopifyVariantId) {
      addToCart(mainProduct.shopifyVariantId, 1);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 transform transition-transform duration-500 ease-out sm:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <img
            src={mainProduct.image}
            alt={mainProduct.name}
            className="w-12 h-12 object-contain bg-gray-50 rounded-lg"
          />
          <div>
            <p className="text-xs font-bold text-gray-900 truncate max-w-[120px]">
              {mainProduct.name}
            </p>
            <p className="text-sm font-bold text-[#144733]">
              ₹{(mainProduct.price / 100).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleQuickAdd}
          className="flex-1 bg-[#144733] text-white py-3 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-[#144733]/20"
        >
          <ShoppingBag size={18} />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
