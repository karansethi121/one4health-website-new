import { useState, useEffect } from 'react';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MobileStickyBarProps {
  productName?: string;
  variantId?: string;
  quantity?: number;
  price?: number;
  title?: string;
}

export function MobileStickyBar({
  productName = 'Ashwagandha Gummies',
  variantId,
  quantity = 1,
  price,
  title
}: MobileStickyBarProps) {
  const { addToCart, loading: cartLoading } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (variantId) {
      addToCart(variantId, quantity, { purchase_type: 'One-time' }, undefined, price, title || productName);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi One4Health™ team! I'm interested in the ${productName}. Can you help me with more information?`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 z-50 lg:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ background: '#F7F1E3', borderTop: '1.5px solid #0A0A0A', boxShadow: '0 -8px 24px rgba(10,10,10,0.08)' }}
    >
      <div className="flex items-center gap-3 p-4">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center p-4 rounded-full transition-all duration-300 active:scale-95 border-1.5 border-ink"
          style={{ background: '#FBF7EC' }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-forest" />
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={cartLoading}
          className="flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-hard-sm"
          style={{ background: '#C7F25C', color: '#0F3D2E', border: '1.5px solid #0A0A0A', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartLoading ? '...' : 'Add to Cart'}
        </button>
      </div>

      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" style={{ background: '#F7F1E3' }} />
    </div>
  );
}
