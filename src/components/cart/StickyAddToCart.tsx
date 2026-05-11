import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StickyAddToCart() {
  const { addToCart, isOpen } = useCart();
  const { products } = useProducts();
  const [isVisible, setIsVisible] = useState(false);
  
  const mainProduct = products.find(p => p.id === 'ashwagandha-gummies-ksm66');

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 700;
      if (window.scrollY > scrollThreshold && !isOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!mainProduct) return null;

  const handleQuickAdd = () => {
    addToCart(
      mainProduct.shopifyVariantId || mainProduct.id,
      1,
      undefined,
      undefined,
      mainProduct.price,
      mainProduct.name
    );
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] p-4 transform transition-transform duration-500 ease-out sm:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div 
        className="flex items-center justify-between gap-4 max-w-md mx-auto p-4"
        style={{ background: '#0A0A0A', border: '1.5px solid #0A0A0A', borderRadius: '24px', boxShadow: '0 8px 32px rgba(10,10,10,0.15)' }}
      >
        <div className="flex items-center gap-3">
          <img
            src={mainProduct.image}
            alt={mainProduct.name}
            className="w-12 h-12 object-contain bg-paper rounded-xl"
          />
          <div>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '12px', fontWeight: 700, color: '#F7F1E3', lineHeight: 1.1 }}>
              {mainProduct.name}
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 800, color: '#C7F25C' }}>
              ₹{(mainProduct.price / 100).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleQuickAdd}
          className="bg-lime text-forest px-6 py-3 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          <ShoppingBag size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
