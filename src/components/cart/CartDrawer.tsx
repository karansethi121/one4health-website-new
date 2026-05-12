import { Minus, Plus, X, ShoppingBag, Leaf, Shield, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatPrice } from '@/lib/format';
import type { CartItem } from '@/context/CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice, loading, loadingKey } = useCart();

  const getResolvedImage = (item: CartItem) => {
    const title = (item.product_title || item.title || '').toLowerCase();
    if (title.includes('ashwa') || title.includes('gumm')) {
      return (typeof window !== 'undefined' && window.ShopifyAssetsUrl)
        ? window.ShopifyAssetsUrl + 'img1.png'
        : '/images/img1.png';
    }
    return item.image;
  };

  const handleCheckout = () => {
    window.location.href = '/checkout';
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        className="w-full sm:max-w-[420px] flex flex-col border-none p-0"
        style={{ background: '#F7F1E3' }}
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <SheetHeader
          className="px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1.5px solid #0A0A0A' }}
        >
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: '20px',
                  letterSpacing: '-0.03em',
                  color: '#0A0A0A',
                }}
              >
                Cart
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: '#C7F25C',
                    color: '#0F3D2E',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  {items.length}
                </span>
              </span>
              {loading && <Loader2 className="w-4 h-4 animate-spin text-forest ml-2" />}
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          /* ── Empty State ─────────────────────────────────────── */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div
              className="w-20 h-20 flex items-center justify-center mb-6 rounded-[20px]"
              style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A' }}
            >
              <Leaf className="w-9 h-9 text-forest" />
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: '22px',
                letterSpacing: '-0.03em',
                color: '#0A0A0A',
                marginBottom: '8px',
              }}
            >
              Nothing here yet.
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                color: '#0A0A0A',
                opacity: 0.5,
                marginBottom: '32px',
                maxWidth: '220px',
              }}
            >
              Add the gummies and start your wellness ritual.
            </p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: '#0A0A0A',
                color: '#F7F1E3',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: '1.5px solid #0A0A0A',
                boxShadow: '4px 4px 0 #C7F25C',
              }}
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* ── Cart Items ──────────────────────────────────────── */}
            <div className="flex-1 overflow-auto py-4 px-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 p-4"
                  style={{
                    background: '#FBF7EC',
                    border: '1.5px solid #0A0A0A',
                    borderRadius: '20px',
                  }}
                >
                  <Link
                    to="/product/ashwagandha-gummies-ksm66"
                    onClick={closeCart}
                    className="flex-shrink-0"
                  >
                    <img
                      src={getResolvedImage(item)}
                      alt={item.product_title}
                      className="w-20 h-20 object-contain rounded-xl"
                      style={{ background: '#F7F1E3' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/img1.png'; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="min-w-0 flex-1 pr-2">
                        <h4
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                            fontSize: '15px',
                            color: '#0A0A0A',
                            letterSpacing: '-0.02em',
                          }}
                          className="truncate"
                        >
                          {item.product_title || item.title}
                        </h4>
                        {item.variant_title && item.variant_title !== 'Default Title' && (
                          <p
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '10px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: '#0A0A0A',
                              opacity: 0.4,
                              marginTop: '2px',
                            }}
                          >
                            {item.variant_title}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="p-1.5 rounded-full hover:bg-ink/8 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                        disabled={loadingKey === item.key}
                      >
                        {loadingKey === item.key
                          ? <Loader2 className="w-3.5 h-3.5 text-ink/40 animate-spin" />
                          : <X className="w-3.5 h-3.5 text-ink/40" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Qty stepper */}
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: '#0A0A0A' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-cream hover:text-lime transition-colors disabled:opacity-30"
                          disabled={loadingKey === item.key}
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 700,
                            fontSize: '13px',
                            color: '#F7F1E3',
                            minWidth: '16px',
                            textAlign: 'center',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-cream hover:text-lime transition-colors disabled:opacity-30"
                          disabled={loadingKey === item.key}
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {item.original_line_price > item.final_line_price && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '11px',
                              color: '#0A0A0A',
                              opacity: 0.3,
                              textDecoration: 'line-through',
                            }}
                          >
                            {formatPrice(item.original_line_price)}
                          </p>
                        )}
                        <span
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 800,
                            fontSize: '17px',
                            color: '#0F3D2E',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {formatPrice(item.final_line_price || item.line_price || item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Footer ────────────────────────────────────────────── */}
            <div
              className="flex-shrink-0 px-4 py-6 space-y-4"
              style={{ borderTop: '1.5px solid #0A0A0A' }}
            >
              {/* Trust strip */}
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-forest" />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#0A0A0A',
                      opacity: 0.5,
                    }}
                  >
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-forest" />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#0A0A0A',
                      opacity: 0.5,
                    }}
                  >
                    15-Day Guarantee
                  </span>
                </div>
              </div>

              {/* Subtotal */}
              <div
                className="flex justify-between items-center px-5 py-4 relative overflow-hidden"
                style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '16px' }}
              >
                {loading && (
                  <div className="absolute inset-0 bg-cream/60 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-forest" />
                  </div>
                )}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#0A0A0A',
                    opacity: 0.5,
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: '24px',
                    color: '#0F3D2E',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                style={{
                  background: '#C7F25C',
                  color: '#0F3D2E',
                  border: '1.5px solid #0A0A0A',
                  boxShadow: '4px 4px 0 #0A0A0A',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <>Checkout — {formatPrice(totalPrice)} <ArrowRight className="w-4 h-4" /></>
                }
              </button>

              <p
                className="text-center"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#0A0A0A',
                  opacity: 0.3,
                }}
              >
                Taxes & shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
