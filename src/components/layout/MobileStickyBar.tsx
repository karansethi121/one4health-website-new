import { useState, useEffect } from 'react';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MobileStickyBarProps {
  productName?: string;
  variantId?: number;
  quantity?: number;
}

export function MobileStickyBar({
  productName = 'Ashwagandha Gummies',
  variantId,
  quantity = 1
}: MobileStickyBarProps) {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 800px)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (variantId) {
      addToCart(variantId, quantity);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi One4Health team! I'm interested in the ${productName}. Can you help me with more information?`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  // Removed formatPrice as it is no longer used in the button

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-sage-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 z-50 lg:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
    >
      <div className="flex items-center gap-2 p-3">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 bg-sage-700 hover:bg-sage-800 text-white font-medium py-3.5 px-4 rounded-full transition-all duration-300 active:scale-95 min-h-[52px]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">WhatsApp</span>
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-sage-700 hover:bg-sage-800 text-white font-semibold py-3.5 px-4 rounded-full transition-all duration-300 active:scale-95 min-h-[52px]"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm">Add to Cart</span>
        </button>
      </div>

      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white" />
    </div>
  );
}
