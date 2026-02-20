import { Minus, Plus, X, ShoppingBag, Leaf, Sparkles, Shield, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice, loading } = useCart();

  const formatPrice = (price: number) => {
    // Shopify prices are in cents
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  const handleCheckout = () => {
    window.location.href = '/checkout';
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md bg-sage-50 flex flex-col border-none">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-3 text-xl font-heading">
            <ShoppingBag className="w-6 h-6 text-sage-600" />
            Your Cart ({items.length})
            {loading && <Loader2 className="w-4 h-4 animate-spin text-sage-600" />}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mb-6 animate-gentle-bounce">
              <Leaf className="w-12 h-12 text-sage-600" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-charcoal-500 text-sm mb-8 max-w-xs">
              Add some products to get started on your wellness journey.
            </p>
            <Button onClick={closeCart} className="btn-primary" asChild>
              <a href="/shop">Start Shopping</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-soft"
                >
                  <img
                    src={item.image}
                    alt={item.product_title}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-charcoal-900 text-sm truncate">
                          {item.product_title}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-0.5">
                          {item.variant_title !== 'Default Title' ? item.variant_title : ''}
                        </p>
                        {item.properties?.subscription && (
                          <p className="text-[10px] font-bold text-sage-600 uppercase tracking-tight mt-0.5">
                            Subscription ({item.properties.subscription})
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="p-1.5 hover:bg-sage-100 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4 text-charcoal-400" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 bg-sage-50 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        {item.original_line_price > item.final_line_price && (
                          <p className="text-[10px] text-charcoal-400 line-through">
                            {formatPrice(item.original_line_price)}
                          </p>
                        )}
                        <span className="font-semibold text-sage-700">
                          {formatPrice(item.final_line_price)}
                        </span>
                        {item.original_line_price > item.final_line_price && (
                          <p className="text-[8px] font-bold text-coral-600 uppercase tracking-tight">
                            Save {Math.round(((item.original_line_price - item.final_line_price) / item.original_line_price) * 100)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-charcoal-200 pt-6 pb-6 space-y-4 px-2">
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[9px] text-charcoal-500 uppercase tracking-widest font-bold">
                <div className="flex items-center gap-1.5 text-sage-700">
                  <Leaf className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">Free shipping on all orders</span>
                </div>
                <span className="flex items-center gap-1.5 opacity-80">
                  <Shield className="w-2.5 h-2.5 text-sage-600" />
                  30-day guarantee
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center bg-white rounded-2xl p-5 shadow-soft-sm relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-sage-600" />
                  </div>
                )}
                <span className="text-charcoal-600 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-charcoal-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={loading && items.length === 0}
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:shadow-lg text-base"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Sparkles className="w-5 h-5 mr-3" />}
                Proceed to Checkout
              </Button>

              <p className="text-[10px] text-center text-charcoal-400 uppercase tracking-widest font-bold">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
